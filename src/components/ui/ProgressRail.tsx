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

      {/* Growth rings — one quarter-arc completes as each act passes, so the
          rail reads as "a thing accruing slowly" rather than "slide N of 7". */}
      <svg viewBox="0 0 40 40" className="h-9 w-9 overflow-visible" aria-hidden>
        {Array.from({ length: ACT_COUNT }).map((_, i) => {
          const r = 4 + i * 2.5;
          const cx = 6;
          const cy = 34;
          const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
          const reached = progress * ACT_COUNT >= i + 1;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={reached ? "var(--color-ember)" : "rgba(13,13,12,0.16)"}
              strokeOpacity={reached ? 0.7 : 1}
              strokeWidth={1}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}
