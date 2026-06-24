"use client";

/**
 * ACT IV — Monetary Decay (the dip)
 * The only desaturated scene in the experience. A single abstract column —
 * never a literal banknote or chart — erodes continuously and quietly as
 * the visitor scrolls. No numbers, no panic: just the felt weight of
 * something valuable being diminished, a little, every year.
 *
 * Paced ~40% slower than its neighbors (`pace: 1.4`) — we want the visitor
 * to sit inside this feeling, not pass through it. At its lowest, stillest
 * point, a single pinprick of warm light appears and holds — the hinge
 * into Act V.
 */

import { useState } from "react";
import { useEffect } from "react";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";
import { useSound } from "@/lib/sound/SoundProvider";

const script = NARRATION.find((a) => a.id === "decay")!;

export function SceneDecay() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  // The ambient bed thins and cools as the visitor descends into the dip —
  // sound design mirroring the visual desaturation, never announcing itself.
  const { setAmbientLevel } = useSound();
  useEffect(() => {
    setAmbientLevel(0.35 - progress * 0.22);
  }, [progress, setAmbientLevel]);

  const sectionRef = useScrollScene<HTMLElement>({
    pace: 1.4, // heavier — the visitor moves through this scene more slowly
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const column = root.querySelector<HTMLElement>(".decay-column");
      const wash = root.querySelector<HTMLElement>(".decay-wash");
      const ticks = root.querySelectorAll<HTMLElement>(".decay-tick");
      const ember = root.querySelector<HTMLElement>(".decay-ember");
      const holdCard = root.querySelector<HTMLElement>(".decay-hold");

      // Continuous, slightly-accelerating erosion — like erosion itself
      if (column) {
        tl.fromTo(
          column,
          { scaleY: 1, transformOrigin: "50% 100%" },
          { scaleY: 0.32, duration: 0.86, ease: "power1.in" },
          0
        );
      }

      // Desaturation deepens with scroll — the world loses its color
      if (wash) {
        tl.fromTo(wash, { opacity: 0 }, { opacity: 0.92, duration: 0.86, ease: "power1.in" }, 0);
      }

      // Year-marks dim one by one — quiet, continuous, no drama
      ticks.forEach((tick, i) => {
        tl.to(tick, { opacity: 0.12, duration: 0.05 }, 0.1 + i * 0.11);
      });

      // The held breath — near-total stillness at minimum
      if (holdCard) {
        tl.fromTo(holdCard, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.86);
      }

      // A single pinprick of warmth — the hinge into Act V
      if (ember) {
        tl.fromTo(
          ember,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" },
          0.93
        );
        tl.to(ember, { scale: 1.15, duration: 0.07, ease: "sine.inOut" }, 1.0);
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act IV: Monetary Decay"
    >
      {/* Desaturating wash over the whole frame */}
      <div
        className="decay-wash pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ash) 38%, var(--color-paper)) 0%, color-mix(in srgb, var(--color-ash-dark) 46%, var(--color-paper)) 100%)",
        }}
      />

      <div className="relative z-0 flex h-[58vh] w-[min(70vw,360px)] items-end justify-center gap-10">
        {/* year-marks — quiet measurement, never a "chart" */}
        <div className="absolute inset-y-6 left-0 flex flex-col justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="decay-tick h-px w-5 bg-ink-soft/40"
              style={{ opacity: 0.4 }}
            />
          ))}
        </div>

        {/* the eroding column */}
        <div
          className="decay-column relative h-full w-[34%] rounded-t-[2px]"
          style={{
            background:
              "linear-gradient(180deg, #5b5a55 0%, #3a3a37 60%, #2a2a27 100%)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-paper/40" />
        </div>
      </div>

      {/* The held breath — a single still card at the bottom of the dip */}
      <div className="decay-hold pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-ash-dark/10 opacity-0">
        <span className="decay-ember relative block h-3 w-3 rounded-full opacity-0" style={{ background: "#f7931a", boxShadow: "0 0 38px 14px rgba(247,147,26,0.45)" }} />
      </div>

      <div className="absolute inset-x-0 bottom-[10%] z-30 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} tone="ash" />
      </div>
    </section>
  );
}
