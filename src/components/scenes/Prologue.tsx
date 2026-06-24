"use client";

/**
 * PROLOGUE — Arrival / The Title Moment
 * A single seed on a paper field — but now the name is WRITTEN by hand above
 * it as a single coal lights inside the word, and the creed appears beneath:
 * "A promise that cannot be broken. Planted in public. Grown for everyone."
 *
 * A stranger's first seconds deliver the NAME and the PROMISE; then the
 * original restraint takes over — the seed swells, the paper iris closes,
 * and we fall into Act I. The title block fades and hands the name off to the
 * quiet plaque that rides the top of every scene from here on.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { Wordmark } from "@/components/ui/Wordmark";
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
      const title = root.querySelector<HTMLElement>(".prologue-title");

      if (hint) {
        tl.fromTo(hint, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.16 }, 0.14);
        tl.to(hint, { opacity: 0, y: -10, duration: 0.12 }, 0.58);
      }

      // The title block holds through the creed, then clears and hands the
      // name off to the persistent plaque at the top of the frame.
      if (title) {
        tl.to(title, { opacity: 0, y: -14, duration: 0.12, ease: "power1.in" }, 0.66);
      }

      // The title moment is given room to breathe — the seed holds still for
      // the first half before its slow swell begins.
      if (seed) {
        tl.to(seed, { scale: 1.0, duration: 0.55 }, 0);
        tl.to(
          seed,
          { scale: 2.6, transformOrigin: "50% 50%", duration: 0.45, ease: "power2.in" },
          0.55
        );
      }

      // Paper "iris" closes toward center — the camera pushing through the
      // seed's surface into its cellular structure (match-cut → Act I)
      if (wash) {
        tl.fromTo(
          wash,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power1.in" },
          0.74
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
      {/* The title moment — the name written by hand, the creed beneath it */}
      <div className="prologue-title pointer-events-none absolute top-[16%] left-1/2 z-20 flex w-full -translate-x-1/2 flex-col items-center px-6 text-center">
        <Wordmark
          variant="display"
          delay={0.9}
          className="letterpress-press text-[clamp(2.4rem,7vw,4.8rem)]"
        />
        <div className="mt-6 flex min-h-[3.5rem] items-start justify-center sm:mt-8">
          <Narration phrases={script.phrases} progress={progress} tone="ash" />
        </div>
      </div>

      <svg
        ref={seedRef}
        className="prologue-seed relative z-10 h-24 w-24 sm:h-28 sm:w-28"
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

      <p className="prologue-hint font-grotesk absolute bottom-[12%] left-1/2 -translate-x-1/2 text-center text-xs tracking-[0.25em] text-ink-faint uppercase opacity-0">
        Scroll, slowly, to begin
      </p>

      {/* Iris wash that carries us into Act I */}
      <div className="prologue-wash pointer-events-none absolute inset-0 z-30 bg-paper opacity-0" />
    </section>
  );
}
