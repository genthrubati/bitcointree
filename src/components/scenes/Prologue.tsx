"use client";

/**
 * PROLOGUE — Arrival / Threshold
 * A single seed on a paper-white field. No navigation, no logo, no CTA.
 * The visitor's first action is an act of patience: choosing to keep
 * scrolling through a deliberately unhurried opening.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const script = NARRATION.find((a) => a.id === "prologue")!;

export function Prologue() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);
  const reducedMotion = useReducedMotion();
  const seedRef = useRef<SVGSVGElement | null>(null);

  const sectionRef = useScrollScene<HTMLElement>({
    pace: 0.9,
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const seed = root.querySelector<SVGElement>(".prologue-seed");
      const hint = root.querySelector<HTMLElement>(".prologue-hint");
      const wash = root.querySelector<HTMLElement>(".prologue-wash");

      if (hint) {
        tl.fromTo(hint, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.18 }, 0.12);
        tl.to(hint, { opacity: 0, y: -10, duration: 0.12 }, 0.7);
      }

      // The "resistance" — nothing of consequence happens for the first
      // ~38% of this scene's scroll. The visitor must choose to continue.
      if (seed) {
        tl.to(seed, { scale: 1.0, duration: 0.38 }, 0);
        tl.to(
          seed,
          { scale: 2.6, transformOrigin: "50% 50%", duration: 0.62, ease: "power2.in" },
          0.38
        );
      }

      // Paper "iris" closes toward center — the camera pushing through
      // the seed's surface into its cellular structure (match-cut → Act I)
      if (wash) {
        tl.fromTo(
          wash,
          { opacity: 0 },
          { opacity: 1, duration: 0.34, ease: "power1.in" },
          0.66
        );
      }
    },
  });

  // Idle "breathing" loop — independent of scroll, gives the seed life at rest
  useEffect(() => {
    const el = seedRef.current;
    if (!el || reducedMotion) return;
    const tween = gsap.to(el, {
      scale: 1.025,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-paper"
      aria-label="Prologue: Arrival"
    >
      <svg
        ref={seedRef}
        className="prologue-seed relative z-10 h-28 w-28 sm:h-36 sm:w-36"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <defs>
          <radialGradient id="prologue-seed-grad" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#3a3a37" />
            <stop offset="55%" stopColor="#1c1b18" />
            <stop offset="100%" stopColor="#0d0d0c" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="104" rx="58" ry="76" fill="url(#prologue-seed-grad)" />
        <ellipse cx="100" cy="104" rx="58" ry="76" stroke="#0d0d0c" strokeOpacity="0.25" strokeWidth="1" />
      </svg>

      <p className="prologue-hint font-grotesk absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center text-xs tracking-[0.25em] text-ink-faint uppercase opacity-0">
        Scroll, slowly, to begin
      </p>

      {/* Iris wash that carries us into Act I */}
      <div className="prologue-wash pointer-events-none absolute inset-0 z-20 bg-paper opacity-0" />

      <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center px-6 sm:bottom-16">
        <Narration phrases={script.phrases} progress={progress} tone="ash" />
      </div>
    </section>
  );
}
