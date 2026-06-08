"use client";

/**
 * SoundProvider
 * -------------
 * Sound is optional, ambient, and respectful — never autoplay-with-volume.
 *
 * Rather than ship and stream audio files (which would 404 if missing and
 * add weight), the ambient bed is *synthesized* live with the Web Audio API:
 * a warm, slow-breathing chord-drone passed through a gentle low-pass filter,
 * with two slow LFOs giving it a "living" quality that suits a growing tree.
 *
 * - Muted by default (remembered via localStorage). The experience is 100%
 *   complete in silence — the on-screen subtitles always carry the narration.
 * - The AudioContext is created only after the visitor's first opt-in click,
 *   satisfying browser autoplay policies.
 * - Individual scenes nudge the bed's intensity via `setAmbientLevel`
 *   (e.g. Act IV thins it to near-silence; Act V lets it bloom back).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  setAmbientLevel: (level: number) => void;
  /** Kept for scene API compatibility; subtitles carry the narration. */
  playNarration: (id: string, src?: string) => void;
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  setAmbientLevel: () => {},
  playNarration: () => {},
});

export const useSound = () => useContext(SoundContext);

const STORAGE_KEY = "bitcointree:sound-enabled";
const BASE_LEVEL = 0.32;

/** A warm, open voicing (A major-ish) in a low, calm register, in Hz. */
const VOICES: { freq: number; type: OscillatorType; gain: number; detune: number }[] = [
  { freq: 55.0, type: "sine", gain: 0.16, detune: 0 }, // A1 — sub foundation
  { freq: 110.0, type: "sine", gain: 0.13, detune: -4 }, // A2 — root
  { freq: 164.81, type: "triangle", gain: 0.075, detune: 3 }, // E3 — fifth
  { freq: 220.0, type: "triangle", gain: 0.06, detune: -2 }, // A3 — octave
  { freq: 277.18, type: "sine", gain: 0.045, detune: 5 }, // C#4 — third (warmth)
];

interface Engine {
  ctx: AudioContext;
  master: GainNode;
  tremolo: GainNode;
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  lfos: OscillatorNode[];
}

function readStoredPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  // Restore preference lazily (default: muted) — avoids a setState-in-effect
  // render cascade on mount while still respecting SSR (window is absent there).
  const [enabled, setEnabled] = useState(readStoredPreference);
  const engineRef = useRef<Engine | null>(null);
  const targetLevelRef = useRef(BASE_LEVEL);

  // Build (once) the synthesized ambient graph. Called only after a user
  // gesture, so the AudioContext is allowed to produce sound.
  const ensureEngine = useCallback((): Engine | null => {
    if (engineRef.current) return engineRef.current;
    if (typeof window === "undefined") return null;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;

    const ctx = new Ctor();

    const master = ctx.createGain();
    master.gain.value = 0; // we ramp up on enable
    master.connect(ctx.destination);

    // Tremolo gain (slowly modulated for a "breathing" amplitude)
    const tremolo = ctx.createGain();
    tremolo.gain.value = 1;
    tremolo.connect(master);

    // Soft low-pass so the drone is felt more than heard
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 0.7;
    filter.connect(tremolo);

    const oscillators: OscillatorNode[] = [];
    for (const v of VOICES) {
      const osc = ctx.createOscillator();
      osc.type = v.type;
      osc.frequency.value = v.freq;
      osc.detune.value = v.detune;

      const vGain = ctx.createGain();
      vGain.gain.value = v.gain;

      osc.connect(vGain);
      vGain.connect(filter);
      osc.start();
      oscillators.push(osc);
    }

    const lfos: OscillatorNode[] = [];

    // LFO 1 — slow sweep of the filter cutoff (timbral breathing)
    const lfo1 = ctx.createOscillator();
    lfo1.frequency.value = 0.06;
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.value = 190;
    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(filter.frequency);
    lfo1.start();
    lfos.push(lfo1);

    // LFO 2 — gentle tremolo on amplitude
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.value = 0.09;
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 0.14;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(tremolo.gain);
    lfo2.start();
    lfos.push(lfo2);

    const engine: Engine = { ctx, master, tremolo, filter, oscillators, lfos };
    engineRef.current = engine;
    return engine;
  }, []);

  // React to enabled/disabled with smooth gain ramps (never hard cuts)
  useEffect(() => {
    if (enabled) {
      const engine = ensureEngine();
      if (engine) {
        const { ctx, master } = engine;
        void ctx.resume().catch(() => {
          /* still suspended — visitor may need to interact again */
        });
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
        master.gain.linearRampToValueAtTime(targetLevelRef.current, now + 1.6);
      }
    } else {
      const engine = engineRef.current;
      if (engine) {
        const { ctx, master } = engine;
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(0, now + 0.9);
        // Suspend after the fade to free the audio thread
        window.setTimeout(() => {
          if (!engineRef.current) return;
          void engineRef.current.ctx.suspend().catch(() => {});
        }, 1100);
      }
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      /* ignore */
    }
  }, [enabled, ensureEngine]);

  // Tear down entirely on unmount
  useEffect(() => {
    return () => {
      const engine = engineRef.current;
      if (!engine) return;
      engine.oscillators.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      engine.lfos.forEach((o) => {
        try {
          o.stop();
        } catch {}
      });
      void engine.ctx.close().catch(() => {});
      engineRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const setAmbientLevel = useCallback(
    (level: number) => {
      const clamped = Math.max(0, Math.min(0.6, level));
      targetLevelRef.current = clamped;
      const engine = engineRef.current;
      if (engine && enabled) {
        const { ctx, master } = engine;
        const now = ctx.currentTime;
        // Glide toward the new target rather than a hard cut
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(clamped, now + 1.2);
      }
    },
    [enabled]
  );

  // Narration is delivered as on-screen subtitles; this is a safe no-op kept
  // so scenes can call a stable API without caring whether audio is wired.
  const playNarration = useCallback((id: string, src?: string) => {
    void id;
    void src;
  }, []);

  return (
    <SoundContext.Provider
      value={{ enabled, toggle, setAmbientLevel, playNarration }}
    >
      {children}
    </SoundContext.Provider>
  );
}
