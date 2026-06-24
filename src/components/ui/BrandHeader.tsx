"use client";

/**
 * BrandHeader — the persistent plaque on the monument's base.
 *
 * Rendered once, above all the pinned scenes, so it survives scene re-mounts.
 * It fades in just after the Prologue hands off the name, rides quietly at the
 * top of every act, and clears as the calm Contribution landing arrives (where
 * the full wordmark returns at scale). Never navigation — nothing to click.
 */

import { Wordmark } from "@/components/ui/Wordmark";
import { useSmoothScroll } from "@/lib/scroll/SmoothScrollProvider";

export function BrandHeader() {
  const { progress } = useSmoothScroll();

  // Visible from just after the Prologue dock through the last act; gone by
  // the time the Contribution section (the final ~8% of the scroll) arrives.
  const opacity =
    progress < 0.05
      ? 0
      : progress < 0.1
        ? (progress - 0.05) / 0.05
        : progress > 0.92
          ? Math.max(0, 1 - (progress - 0.92) / 0.04)
          : 1;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center sm:top-5"
      style={{ opacity }}
      aria-hidden={opacity < 0.5}
    >
      <Wordmark variant="header" />
    </div>
  );
}
