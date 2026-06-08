"use client";

/**
 * ProgressRail
 * ------------
 * A thin, quiet line at the frame's edge that fills as the visitor moves
 * through the film. Not a navigation device — there is nothing to click.
 * Just a quiet acknowledgment that this is a journey with a beginning,
 * a middle, and an end, and the visitor is somewhere within it.
 */

import { useSmoothScroll } from "@/lib/scroll/SmoothScrollProvider";

const ACT_COUNT = 7;

export function ProgressRail() {
  const { progress } = useSmoothScroll();

  return (
    <div
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex md:right-8"
      aria-hidden
    >
      <div className="relative h-40 w-px overflow-hidden bg-ink/10">
        <div
          className="absolute inset-x-0 top-0 bg-ember/70"
          style={{ height: `${Math.min(progress, 1) * 100}%` }}
        />
      </div>
      <span className="font-grotesk num-tabular text-[10px] tracking-[0.2em] text-ink-faint">
        {String(Math.min(Math.round(progress * ACT_COUNT) , ACT_COUNT)).padStart(2, "0")}
        <span className="mx-px text-ink-faint/50">/</span>
        {String(ACT_COUNT).padStart(2, "0")}
      </span>
    </div>
  );
}
