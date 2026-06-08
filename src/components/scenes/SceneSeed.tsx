"use client";

/**
 * ACT I — Seed
 * A macro cross-section of a single seed: warm earth tones, and at its
 * center, the first and most restrained appearance of the Bitcoin-orange
 * accent — a coal, not a flame. As the visitor scrolls, the cross-section
 * slowly rotates to reveal the vein at its core, which brightens and
 * extends upward into the first shoot — match-cutting into Act II.
 */

import { useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";

const script = NARRATION.find((a) => a.id === "seed")!;

export function SceneSeed() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  const sectionRef = useScrollScene<HTMLElement>({
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const stage = root.querySelector<HTMLElement>(".seed-stage");
      const husk = root.querySelector<SVGElement>(".seed-husk");
      const rings = root.querySelectorAll<SVGElement>(".seed-ring");
      const vein = root.querySelector<SVGPathElement>(".seed-vein");
      const glow = root.querySelector<SVGElement>(".seed-glow");
      const shoot = root.querySelector<SVGPathElement>(".seed-shoot");
      const label = root.querySelector<HTMLElement>(".seed-label");

      if (label) {
        tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0);
        tl.to(label, { opacity: 0, duration: 0.12 }, 0.85);
      }

      // Slow 3D rotation — the camera turning the seed over in its hand
      if (stage) {
        tl.fromTo(
          stage,
          { rotateY: -34, rotateX: 6 },
          { rotateY: 22, rotateX: -3, duration: 1, ease: "none" },
          0
        );
      }

      if (husk) {
        tl.fromTo(husk, { opacity: 0.35 }, { opacity: 1, duration: 0.4 }, 0);
      }

      rings.forEach((ring, i) => {
        tl.fromTo(
          ring,
          { opacity: 0, scale: 0.92, transformOrigin: "100px 104px" },
          { opacity: 0.5, scale: 1, duration: 0.3, ease: "power1.out" },
          0.05 + i * 0.07
        );
      });

      // The vein draws in, then warms — the "coal"
      if (vein) {
        const length = vein.getTotalLength();
        gsap.set(vein, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(vein, { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }, 0.1);
        tl.to(vein, { stroke: "#f7931a", duration: 0.25 }, 0.62);
      }

      if (glow) {
        tl.fromTo(glow, { opacity: 0, scale: 0.6 }, { opacity: 0.55, scale: 1.5, duration: 0.4, ease: "power2.out" }, 0.6);
        tl.to(glow, { opacity: 0.9, scale: 2.1, duration: 0.18, ease: "power2.in" }, 0.86);
      }

      // The shoot breaks the silhouette — match cut seed → sprout
      if (shoot) {
        const length = shoot.getTotalLength();
        gsap.set(shoot, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        tl.to(shoot, { opacity: 1, duration: 0.06 }, 0.84);
        tl.to(shoot, { strokeDashoffset: 0, duration: 0.18, ease: "power1.out" }, 0.84);
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain vignette relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act I: Seed"
    >
      <span className="seed-label font-grotesk absolute top-[12%] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-ink-faint uppercase opacity-0">
        Act I — Seed
      </span>

      <div className="seed-stage" style={{ perspective: "900px", transformStyle: "preserve-3d" }}>
        <svg
          className="h-[clamp(220px,38vw,420px)] w-[clamp(220px,38vw,420px)]"
          viewBox="0 0 200 220"
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="seed-husk-grad" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#4a463d" />
              <stop offset="60%" stopColor="#241f19" />
              <stop offset="100%" stopColor="#0d0d0c" />
            </radialGradient>
            <radialGradient id="seed-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f7931a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f7931a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse className="seed-husk" cx="100" cy="112" rx="64" ry="84" fill="url(#seed-husk-grad)" />

          {/* concentric embryonic rings — echo the tree rings of later acts */}
          <ellipse className="seed-ring" cx="100" cy="112" rx="48" ry="64" stroke="#faf9f6" strokeOpacity="0.18" strokeWidth="1" fill="none" />
          <ellipse className="seed-ring" cx="100" cy="112" rx="34" ry="46" stroke="#faf9f6" strokeOpacity="0.16" strokeWidth="1" fill="none" />
          <ellipse className="seed-ring" cx="100" cy="112" rx="20" ry="28" stroke="#faf9f6" strokeOpacity="0.14" strokeWidth="1" fill="none" />

          <circle className="seed-glow" cx="100" cy="112" r="14" fill="url(#seed-glow-grad)" opacity="0" />

          {/* the vein / coal at the seed's core */}
          <path
            className="seed-vein"
            d="M100 158 C 96 140, 104 122, 100 104 C 96 90, 104 78, 100 66"
            stroke="#6b6a64"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* the first shoot — breaks the husk's silhouette at scene's end */}
          <path
            className="seed-shoot"
            d="M100 66 C 97 48, 103 34, 100 16"
            stroke="#f7931a"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-[12%] z-10 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>
    </section>
  );
}
