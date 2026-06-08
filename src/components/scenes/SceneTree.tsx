"use client";

/**
 * ACT VII — The Tree (arrival)
 * The cinematic half of the final act: a single, fully-grown tree
 * resolves from the sapling Act VI pushed in on — canopy and roots both
 * visible at last, completing the vertical-split image that opened in
 * Act II. Once resolved, it settles into a slow, looping sway: the
 * experience's resting state, not its climax.
 *
 * The contribution content (balance, address, QR) lives in the calmer
 * <Contribution> section immediately below — the film handing off to a
 * place the visitor can simply stay.
 */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const script = NARRATION.find((a) => a.id === "tree")!;

const CANOPY_PATHS = [
  "M150 210 C 150 175, 150 150, 150 122",
  "M150 175 C 122 158, 100 150, 72 138",
  "M150 175 C 178 158, 200 150, 228 138",
  "M150 150 C 132 130, 118 118, 96 102",
  "M150 150 C 168 130, 182 118, 204 102",
  "M150 122 C 150 96, 150 78, 150 50",
  "M150 96 C 134 82, 122 74, 104 64",
  "M150 96 C 166 82, 178 74, 196 64",
];

const ROOT_PATHS = [
  "M150 210 C 150 238, 150 256, 150 280",
  "M150 240 C 128 254, 112 262, 88 274",
  "M150 240 C 172 254, 188 262, 212 274",
  "M150 264 C 138 278, 128 286, 110 298",
  "M150 264 C 162 278, 172 286, 190 298",
];

const CANOPY_LEAVES = [
  { x: 72, y: 138 }, { x: 96, y: 102 }, { x: 150, y: 50 }, { x: 204, y: 102 },
  { x: 228, y: 138 }, { x: 104, y: 64 }, { x: 196, y: 64 }, { x: 130, y: 88 },
  { x: 170, y: 88 }, { x: 150, y: 70 },
];

const ROOT_LIGHTS = [
  { x: 88, y: 274 }, { x: 212, y: 274 }, { x: 110, y: 298 }, { x: 190, y: 298 }, { x: 150, y: 280 },
];

export function SceneTree() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);
  const reducedMotion = useReducedMotion();
  const treeWrapRef = useRef<HTMLDivElement | null>(null);

  const sectionRef = useScrollScene<HTMLElement>({
    pace: 1.1,
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const canopy = root.querySelectorAll<SVGPathElement>(".tree-canopy-path");
      const roots = root.querySelectorAll<SVGPathElement>(".tree-root-path");
      const leaves = root.querySelectorAll<SVGCircleElement>(".tree-leaf");
      const lights = root.querySelectorAll<SVGCircleElement>(".tree-root-light");
      const label = root.querySelector<HTMLElement>(".tree-label");
      const ground = root.querySelector<HTMLElement>(".tree-ground");

      if (label) {
        tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0);
        tl.to(label, { opacity: 0, duration: 0.12 }, 0.92);
      }
      if (ground) {
        tl.fromTo(ground, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power1.out" }, 0);
      }

      canopy.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.12, ease: "power1.out" }, 0.05 + i * 0.05);
      });

      roots.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.12, ease: "power1.out" }, 0.12 + i * 0.06);
      });

      leaves.forEach((leaf, i) => {
        gsap.set(leaf, { opacity: 0, scale: 0, transformOrigin: "center" });
        tl.to(leaf, { opacity: 0.85, scale: 1, duration: 0.1, ease: "back.out(1.6)" }, 0.4 + i * 0.04);
      });

      lights.forEach((light, i) => {
        tl.fromTo(
          light,
          { fill: "#3a3a37", opacity: 0.4, r: 2 },
          { fill: "#f7931a", opacity: 1, r: 3.6, duration: 0.14, ease: "power2.out" },
          0.74 + i * 0.04
        );
      });
    },
  });

  // The resting sway — the page's living, looping idle state
  useEffect(() => {
    const el = treeWrapRef.current;
    if (!el || reducedMotion) return;
    const sway = gsap.to(el, {
      rotate: 1.1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 100%",
    });
    return () => {
      sway.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act VII: The Tree"
    >
      <span className="tree-label font-grotesk absolute top-[10%] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-ink-faint uppercase opacity-0">
        Act VII — The Tree
      </span>

      <div ref={treeWrapRef} className="relative">
        <svg className="h-[min(82vh,680px)] w-auto" viewBox="0 30 300 330" fill="none" aria-hidden>
          <line className="tree-ground" x1="30" y1="210" x2="270" y2="210" stroke="#0d0d0c" strokeOpacity="0.12" strokeWidth="1" style={{ transformOrigin: "150px 210px" }} />

          {CANOPY_PATHS.map((d, i) => (
            <path key={`c-${i}`} className="tree-canopy-path" d={d} stroke="#0d0d0c" strokeOpacity="0.82" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          ))}
          {CANOPY_LEAVES.map((leaf, i) => (
            <circle key={`l-${i}`} className="tree-leaf" cx={leaf.x} cy={leaf.y} r="3.6" fill="#d97f12" fillOpacity="0.7" />
          ))}

          {ROOT_PATHS.map((d, i) => (
            <path key={`r-${i}`} className="tree-root-path" d={d} stroke="#3a3a37" strokeOpacity="0.6" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          ))}
          {ROOT_LIGHTS.map((light, i) => (
            <circle key={`t-${i}`} className="tree-root-light" cx={light.x} cy={light.y} r="2" fill="#3a3a37" fillOpacity="0.4" />
          ))}
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-[9%] z-10 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>

      {/* Quiet cue that the film has ended and a place to stay begins */}
      <div className="font-grotesk absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-[10px] tracking-[0.3em] text-ink-faint/70 uppercase">
        keep scrolling — the tree stays here
      </div>
    </section>
  );
}
