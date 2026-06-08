"use client";

/**
 * useScrollScene
 * --------------
 * Wraps a full-viewport <section> in a scrub-linked GSAP timeline.
 *
 * The scroll position becomes the timeline's playhead — the visitor
 * controls the speed at which "time" passes inside a scene, can reverse
 * it at will, and never sees an animation "trigger" out of nowhere.
 *
 * `pace` lets individual scenes feel heavier or lighter than 1:1 scroll
 * (e.g. Act IV — Monetary Decay — intentionally runs at ~0.7 so the
 * visitor sits in that feeling rather than passing through it).
 */

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export interface ScrollSceneOptions {
  /** Multiplier on the scrollable distance — >1 slows the scrub (heavier), <1 speeds it (lighter) */
  pace?: number;
  /** Called once with the GSAP timeline + ScrollTrigger so the scene can populate it */
  build: (timeline: gsap.core.Timeline, trigger: ScrollTrigger) => void;
  /** Optional live progress callback, 0–1, for narration sync etc. */
  onProgress?: (progress: number) => void;
  /** Pin the section in place while the scene plays (default true) */
  pin?: boolean;
  deps?: unknown[];
}

export function useScrollScene<T extends HTMLElement>(
  options: ScrollSceneOptions
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { pace = 1, build, onProgress, pin = true, deps = [] } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${el.offsetHeight * pace}`,
        scrub: 0.6,
        pin,
        anticipatePin: 1,
        onUpdate: (self) => {
          tl.progress(self.progress);
          onProgress?.(self.progress);
        },
      });

      build(tl, trigger);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
