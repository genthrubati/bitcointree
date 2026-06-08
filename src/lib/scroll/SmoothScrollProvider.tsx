"use client";

/**
 * SmoothScrollProvider
 * --------------------
 * The single source of truth for "scroll = time" in BitcoinTree.
 *
 * We use Lenis for buttery, eased scroll interpolation (so the experience
 * never feels like a default browser scrollbar), and drive GSAP's
 * ScrollTrigger from Lenis's ticks so every scene's scrub timelines stay
 * perfectly in sync with the smoothed scroll position.
 *
 * Respects prefers-reduced-motion: when set, Lenis is not engaged and the
 * browser's native (instant) scroll is used — scenes still play via
 * ScrollTrigger, just without the eased interpolation layer on top.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextValue {
  /** Imperative escape hatch for the rare case a scene needs to drive scroll directly. */
  getLenis: () => Lenis | null;
  /** Overall scroll progress through the entire experience, 0–1 */
  progress: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  getLenis: () => null,
  progress: 0,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // Lenis is an imperative engine, not render state — a ref is the correct
  // home for it; exposing it via a stable getter avoids any render coupling.
  const lenisRef = useRef<Lenis | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return undefined;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic — "settling," never bouncing
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track whole-experience progress for the ambient "progress rail"
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{ getLenis: () => lenisRef.current, progress }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
