"use client";

/**
 * ACT II — Growth
 * A vertical split: sky above, soil cross-section below. A single
 * originating point sends a canopy upward and a root system downward —
 * visual rhyme that returns, completed, in Act VII. Leaves "settle" onto
 * branches like falling marks finding rest, not sprouting from them.
 * Root tips brighten into points of light — match-cutting into the
 * lit skyline windows of Act III.
 */

import { useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";

const script = NARRATION.find((a) => a.id === "growth")!;

const CANOPY_PATHS = [
  "M150 220 C 150 190, 150 170, 150 150",
  "M150 190 C 130 175, 112 168, 92 158",
  "M150 190 C 170 175, 188 168, 208 158",
  "M150 165 C 138 150, 128 140, 112 128",
  "M150 165 C 162 150, 172 140, 188 128",
  "M150 150 C 150 130, 150 116, 150 96",
];

const ROOT_PATHS = [
  "M150 220 C 150 244, 150 258, 150 274",
  "M150 248 C 132 260, 116 266, 98 276",
  "M150 248 C 168 260, 184 266, 202 276",
  "M150 268 C 140 280, 132 288, 118 298",
  "M150 268 C 160 280, 168 288, 182 298",
];

const LEAVES = [
  { x: 92, y: 158, r: 3.4, delay: 0.0 },
  { x: 112, y: 128, r: 3, delay: 0.05 },
  { x: 150, y: 96, r: 3.6, delay: 0.1 },
  { x: 188, y: 128, r: 3, delay: 0.07 },
  { x: 208, y: 158, r: 3.2, delay: 0.03 },
  { x: 130, y: 142, r: 2.4, delay: 0.12 },
  { x: 172, y: 142, r: 2.4, delay: 0.09 },
];

const ROOT_TIPS = [
  { x: 98, y: 276 },
  { x: 202, y: 276 },
  { x: 118, y: 298 },
  { x: 182, y: 298 },
  { x: 150, y: 274 },
];

export function SceneGrowth() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  const sectionRef = useScrollScene<HTMLElement>({
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const canopy = root.querySelectorAll<SVGPathElement>(".growth-canopy-path");
      const roots = root.querySelectorAll<SVGPathElement>(".growth-root-path");
      const leaves = root.querySelectorAll<SVGCircleElement>(".growth-leaf");
      const tips = root.querySelectorAll<SVGCircleElement>(".growth-root-tip");
      const horizon = root.querySelector<HTMLElement>(".growth-horizon");
      const label = root.querySelector<HTMLElement>(".growth-label");

      if (label) {
        tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0);
        tl.to(label, { opacity: 0, duration: 0.1 }, 0.88);
      }
      if (horizon) {
        tl.fromTo(horizon, { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: "power1.out" }, 0);
      }

      // Canopy draws upward
      canopy.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.16, ease: "power1.out" }, 0.08 + i * 0.075);
      });

      // Roots draw downward — ~150ms "felt" lag behind the canopy
      roots.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.16, ease: "power1.out" }, 0.16 + i * 0.09);
      });

      // Leaves settle
      leaves.forEach((leaf, i) => {
        gsap.set(leaf, { opacity: 0, scale: 0, transformOrigin: "center" });
        tl.to(leaf, { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(1.6)" }, 0.5 + i * 0.045);
      });

      // Root tips brighten — becoming, in the cut, distant lit windows
      tips.forEach((tip, i) => {
        tl.to(
          tip,
          { fill: "#f7931a", opacity: 1, r: 4.2, duration: 0.14, ease: "power2.out" },
          0.78 + i * 0.03
        );
      });
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act II: Growth"
    >
      <span className="growth-label font-grotesk absolute top-[10%] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-ink-faint uppercase opacity-0">
        Act II — Growth
      </span>

      <svg
        className="h-[min(86vh,640px)] w-auto"
        viewBox="0 40 300 320"
        fill="none"
        aria-hidden
      >
        <line className="growth-horizon" x1="20" y1="220" x2="280" y2="220" stroke="#0d0d0c" strokeOpacity="0.12" strokeWidth="1" style={{ transformOrigin: "150px 220px" }} />

        {CANOPY_PATHS.map((d, i) => (
          <path key={`c-${i}`} className="growth-canopy-path" d={d} stroke="#0d0d0c" strokeOpacity="0.78" strokeWidth="2" strokeLinecap="round" fill="none" />
        ))}
        {LEAVES.map((leaf, i) => (
          <circle key={`l-${i}`} className="growth-leaf" cx={leaf.x} cy={leaf.y} r={leaf.r} fill="#d97f12" fillOpacity="0.7" />
        ))}

        {ROOT_PATHS.map((d, i) => (
          <path key={`r-${i}`} className="growth-root-path" d={d} stroke="#3a3a37" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        ))}
        {ROOT_TIPS.map((tip, i) => (
          <circle key={`t-${i}`} className="growth-root-tip" cx={tip.x} cy={tip.y} r="2" fill="#3a3a37" fillOpacity="0.5" />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-[10%] z-10 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>
    </section>
  );
}
