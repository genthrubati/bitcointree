"use client";

/**
 * ACT VI — Hope
 * A wide, golden-hour field of saplings — each slightly different, none
 * identical — growing together rather than one hero tree growing alone.
 * As the visitor scrolls, the field grows; near the end, the camera
 * settles on one sapling near center and pushes in — match-cutting into
 * the single, fully-grown tree of Act VII.
 */

import { useState } from "react";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";

const script = NARRATION.find((a) => a.id === "hope")!;

interface Sapling {
  x: number;
  baseY: number;
  scale: number;
  depth: "back" | "mid" | "front";
  delay: number;
}

const DEPTH_STYLE: Record<Sapling["depth"], { opacity: number; blur: string; color: string }> = {
  back: { opacity: 0.32, blur: "blur-[1.5px]", color: "#b9b6ad" },
  mid: { opacity: 0.55, blur: "blur-[0.5px]", color: "#8a8a84" },
  front: { opacity: 0.92, blur: "", color: "#0d0d0c" },
};

const SAPLINGS: Sapling[] = [
  { x: 8, baseY: 70, scale: 0.55, depth: "back", delay: 0.04 },
  { x: 18, baseY: 75, scale: 0.5, depth: "back", delay: 0.1 },
  { x: 30, baseY: 68, scale: 0.62, depth: "mid", delay: 0.0 },
  { x: 42, baseY: 78, scale: 0.7, depth: "mid", delay: 0.16 },
  { x: 58, baseY: 74, scale: 0.66, depth: "mid", delay: 0.06 },
  { x: 70, baseY: 80, scale: 0.6, depth: "back", delay: 0.2 },
  { x: 84, baseY: 72, scale: 0.52, depth: "back", delay: 0.12 },
  { x: 50, baseY: 86, scale: 1.0, depth: "front", delay: 0.0 }, // the chosen one — center
  { x: 24, baseY: 90, scale: 0.85, depth: "front", delay: 0.22 },
  { x: 76, baseY: 92, scale: 0.8, depth: "front", delay: 0.28 },
];

const CHOSEN_INDEX = 7;

function SaplingGlyph({ color, ember = false }: { color: string; ember?: boolean }) {
  // Only the chosen sapling carries the ember bud — the single coal in this
  // field. Every other tip is ink, so the one warmth stays precious.
  return (
    <svg viewBox="0 0 60 90" className="h-full w-full overflow-visible" fill="none" aria-hidden>
      <path d="M30 90 V52" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 64 C 18 58, 12 50, 8 38" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M30 60 C 42 54, 48 46, 52 34" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M30 52 C 30 38, 30 26, 30 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="14" r="4.5" fill={ember ? "#f7931a" : color} fillOpacity={ember ? 0.7 : 0.5} />
      <circle cx="8" cy="38" r="3" fill={color} fillOpacity="0.35" />
      <circle cx="52" cy="34" r="3" fill={color} fillOpacity="0.35" />
    </svg>
  );
}

export function SceneHope() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  const sectionRef = useScrollScene<HTMLElement>({
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const field = root.querySelector<HTMLElement>(".hope-field");
      const saplings = root.querySelectorAll<HTMLElement>(".hope-sapling");
      const wash = root.querySelector<HTMLElement>(".hope-warm-wash");
      const chosen = root.querySelector<HTMLElement>(`[data-sapling="${CHOSEN_INDEX}"]`);
      const others = root.querySelectorAll<HTMLElement>(`.hope-sapling:not([data-sapling="${CHOSEN_INDEX}"])`);

      if (wash) {
        tl.fromTo(wash, { opacity: 0 }, { opacity: 0.5, duration: 0.5, ease: "power1.out" }, 0);
      }

      // The field grows — staggered, varied, alive
      saplings.forEach((s, i) => {
        const sapling = SAPLINGS[i];
        tl.fromTo(
          s,
          { scaleY: 0.18, transformOrigin: "50% 100%", opacity: 0 },
          { scaleY: 1, opacity: DEPTH_STYLE[sapling.depth].opacity, duration: 0.34, ease: "power2.out" },
          0.06 + sapling.delay
        );
      });

      // Gentle parallax — depth layers drift at different rates
      saplings.forEach((s, i) => {
        const sapling = SAPLINGS[i];
        const drift = sapling.depth === "front" ? -22 : sapling.depth === "mid" ? -12 : -5;
        tl.fromTo(s, { y: 0 }, { y: drift, duration: 1, ease: "none" }, 0);
      });

      // The camera selects one — others fall into soft bokeh, it remains
      if (chosen && field) {
        tl.to(others, { opacity: 0.08, filter: "blur(6px)", duration: 0.2, ease: "power1.in" }, 0.78);
        tl.to(chosen, { scale: 1.7, y: -40, duration: 0.22, ease: "power2.inOut" }, 0.78);
        tl.to(field, { backgroundColor: "rgba(250,249,246,1)", duration: 0.2 }, 0.82);
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act VI: Hope"
    >
      <div
        className="hope-warm-wash pointer-events-none absolute inset-0 z-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 78%, rgba(247,147,26,0.16) 0%, rgba(247,147,26,0) 60%)",
        }}
      />

      <div className="hope-field relative z-10 h-[64vh] w-full max-w-5xl">
        {SAPLINGS.map((s, i) => (
          <div
            key={i}
            data-sapling={i}
            className={`hope-sapling absolute bottom-0 ${DEPTH_STYLE[s.depth].blur}`}
            style={{
              left: `${s.x}%`,
              width: `${64 * s.scale}px`,
              height: `${96 * s.scale}px`,
              transform: `translateX(-50%)`,
            }}
          >
            <SaplingGlyph color={DEPTH_STYLE[s.depth].color} ember={i === CHOSEN_INDEX} />
          </div>
        ))}

        {/* horizon */}
        <div className="absolute right-0 bottom-0 left-0 h-px bg-ink/10" />
      </div>

      <div className="absolute inset-x-0 bottom-[8%] z-20 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>
    </section>
  );
}
