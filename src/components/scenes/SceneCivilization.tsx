"use client";

/**
 * ACT III — Civilization
 * An engraved-line skyline overlaid with a constellation of trust:
 * nodes connect, brighten, and persist as the visitor scrolls forward —
 * and visibly *disconnect* if they scroll back, letting them "rewind
 * history" and watch trust un-form. At its brightest point, a single
 * connection near center frame flickers and breaks — the frame begins
 * to desaturate like ink spreading through water — match-cut → Act IV.
 */

import { useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";

const script = NARRATION.find((a) => a.id === "civilization")!;

const BUILDINGS = [
  "M40 260 V160 H64 V260", "M76 260 V120 H100 V260", "M112 260 V190 H132 V260",
  "M144 260 V100 H172 V260", "M184 260 V150 H206 V260", "M218 260 V210 H236 V260",
  "M248 260 V70  H276 V260", "M288 260 V175 H312 V260", "M324 260 V200 H346 V260",
  "M358 260 V130 H384 V260", "M396 260 V225 H418 V260", "M430 260 V145 H460 V260",
];

// Each node: a point of trust. Each link: a promise between two points.
const NODES = [
  { x: 80, y: 150 }, { x: 150, y: 110 }, { x: 230, y: 90 }, { x: 300, y: 130 },
  { x: 370, y: 95 }, { x: 120, y: 200 }, { x: 270, y: 175 }, { x: 410, y: 160 },
  { x: 60, y: 220 }, { x: 200, y: 215 }, { x: 340, y: 205 }, { x: 440, y: 195 },
];

const LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [3, 7],
  [5, 9], [6, 9], [7, 10], [4, 7], [9, 10], [10, 11], [5, 8], [8, 9],
  [1, 5], [6, 10], [2, 4],
];

// The link that breaks — index into LINKS — chosen near visual center.
const BREAK_LINK_INDEX = 12;

export function SceneCivilization() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  const sectionRef = useScrollScene<HTMLElement>({
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const skyline = root.querySelectorAll<SVGPathElement>(".civ-building");
      const nodes = root.querySelectorAll<SVGCircleElement>(".civ-node");
      const links = root.querySelectorAll<SVGLineElement>(".civ-link");
      const wash = root.querySelector<HTMLElement>(".civ-desaturate");
      const figures = root.querySelectorAll<SVGElement>(".civ-figure");
      const label = root.querySelector<HTMLElement>(".civ-label");

      if (label) {
        tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0);
        tl.to(label, { opacity: 0, duration: 0.1 }, 0.9);
      }

      skyline.forEach((b, i) => {
        tl.fromTo(b, { opacity: 0, y: 14 }, { opacity: 0.5, y: 0, duration: 0.18, ease: "power1.out" }, 0.02 * i);
      });

      figures.forEach((f, i) => {
        tl.fromTo(f, { opacity: 0, x: i % 2 === 0 ? -16 : 16 }, { opacity: 0.85, x: 0, duration: 0.3 }, 0.05);
        tl.to(f, { x: i % 2 === 0 ? 10 : -10, duration: 0.55, ease: "none" }, 0.1);
      });

      // Network grows: each link draws in, each endpoint node brightens —
      // staggered across most of the scene's runtime so it can be "rewound"
      const total = links.length;
      links.forEach((link, i) => {
        const length = (() => {
          const x1 = parseFloat(link.getAttribute("x1") || "0");
          const y1 = parseFloat(link.getAttribute("y1") || "0");
          const x2 = parseFloat(link.getAttribute("x2") || "0");
          const y2 = parseFloat(link.getAttribute("y2") || "0");
          return Math.hypot(x2 - x1, y2 - y1);
        })();
        gsap.set(link, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        const t = 0.08 + (i / total) * 0.62;
        tl.to(link, { strokeDashoffset: 0, opacity: 0.55, duration: 0.07 }, t);
      });

      nodes.forEach((node, i) => {
        tl.fromTo(
          node,
          { scale: 0, opacity: 0, transformOrigin: "center" },
          { scale: 1, opacity: 0.9, duration: 0.08, ease: "back.out(2)" },
          0.06 + (i / nodes.length) * 0.6
        );
      });

      // The break — one promise fails, right at the experience's brightest point
      const breakLink = links[BREAK_LINK_INDEX];
      if (breakLink) {
        tl.to(breakLink, { opacity: 0.9, duration: 0.02 }, 0.78);
        tl.to(breakLink, { opacity: 0.05, duration: 0.02 }, 0.8);
        tl.to(breakLink, { opacity: 0.7, duration: 0.015 }, 0.815);
        tl.to(breakLink, { opacity: 0, strokeDashoffset: -20, duration: 0.05 }, 0.83);
      }

      // Ink-spreading desaturation wash — carries us into Act IV
      if (wash) {
        tl.fromTo(wash, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power1.in" }, 0.8);
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act III: Civilization"
    >
      <span className="civ-label font-grotesk absolute top-[10%] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-ink-faint uppercase opacity-0">
        Act III — Civilization
      </span>

      <svg className="h-[min(80vh,620px)] w-auto" viewBox="0 40 480 280" fill="none" aria-hidden>
        {/* skyline — engraved line-art, restrained and universal */}
        {BUILDINGS.map((d, i) => (
          <path key={`b-${i}`} className="civ-building" d={d} stroke="#0d0d0c" strokeOpacity="0.32" strokeWidth="1.4" fill="none" />
        ))}

        {/* anonymous foreground figures — universal, not culturally specific */}
        <g className="civ-figure" opacity="0">
          <circle cx="70" cy="244" r="6" fill="#0d0d0c" fillOpacity="0.5" />
          <path d="M70 250 v18 M62 280 l8 -12 l8 12 M62 262 h16" stroke="#0d0d0c" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="civ-figure" opacity="0">
          <circle cx="410" cy="248" r="6" fill="#0d0d0c" fillOpacity="0.4" />
          <path d="M410 254 v16 M403 282 l7 -12 l7 12 M403 266 h14" stroke="#0d0d0c" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* the constellation of trust */}
        <g>
          {LINKS.map(([a, b], i) => (
            <line
              key={`link-${i}`}
              className="civ-link"
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="#f7931a" strokeWidth="1"
            />
          ))}
          {NODES.map((n, i) => (
            <circle key={`node-${i}`} className="civ-node" cx={n.x} cy={n.y} r="3" fill="#0d0d0c" />
          ))}
        </g>
      </svg>

      {/* Ink-spreading desaturation — the hinge into Act IV */}
      <div
        className="civ-desaturate pointer-events-none absolute inset-0 z-20 opacity-0"
        style={{
          background:
            "radial-gradient(circle at 52% 56%, color-mix(in srgb, var(--color-ash) 55%, transparent) 0%, color-mix(in srgb, var(--color-paper) 92%, var(--color-ash)) 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-[10%] z-10 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>
    </section>
  );
}
