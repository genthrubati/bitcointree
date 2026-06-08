"use client";

/**
 * ACT V — Bitcoin (the turn)
 * From the single point of light left burning at the end of Act IV, the
 * frame slowly warms into the first composition where Bitcoin-orange is
 * allowed to lead. A precise, geometric seal resolves via exact line-
 * drawing — deliberate and almost mathematical, in deliberate contrast
 * to the organic growth of Acts I–III. That contrast *is* the message:
 * nature grows by adaptation; this grows by unchanging rule.
 *
 * The seal's outer ring then extends past the frame and becomes the
 * silhouette of a tree canopy — the metaphor folding back on itself,
 * felt in the cut rather than explained in the copy.
 */

import { useEffect, useState } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/lib/scroll/useScrollScene";
import { Narration } from "@/components/ui/Narration";
import { NARRATION } from "@/content/narration";
import { useActAudio } from "@/hooks/useActAudio";
import { useSound } from "@/lib/sound/SoundProvider";

const script = NARRATION.find((a) => a.id === "bitcoin")!;

export function SceneBitcoin() {
  const [progress, setProgress] = useState(0);
  useActAudio(script.id, script.audio, progress);

  // A single warm tone re-enters the ambient bed — the turn, felt in sound too
  const { setAmbientLevel } = useSound();
  useEffect(() => {
    setAmbientLevel(0.13 + progress * 0.3);
  }, [progress, setAmbientLevel]);

  const sectionRef = useScrollScene<HTMLElement>({
    onProgress: setProgress,
    build: (tl, trigger) => {
      const root = trigger.trigger as HTMLElement;
      const wash = root.querySelector<HTMLElement>(".btc-warm-wash");
      const ring = root.querySelector<SVGCircleElement>(".btc-ring");
      const facets = root.querySelectorAll<SVGLineElement>(".btc-facet");
      const glyph = root.querySelectorAll<SVGPathElement>(".btc-glyph");
      const canopyArc = root.querySelector<SVGPathElement>(".btc-canopy-arc");
      const label = root.querySelector<HTMLElement>(".btc-label");

      if (label) {
        tl.fromTo(label, { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.08);
        tl.to(label, { opacity: 0, duration: 0.1 }, 0.88);
      }

      // The frame exhales — cool grey gives way to warm paper and a glow
      if (wash) {
        tl.fromTo(wash, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power1.out" }, 0);
      }

      // The ring resolves — exact, unhurried, deliberate
      if (ring) {
        const length = ring.getTotalLength();
        gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(ring, { strokeDashoffset: 0, duration: 0.4, ease: "power1.inOut" }, 0.12);
      }

      // Facets click into place, evenly, like a mechanism finding rest
      facets.forEach((facet, i) => {
        gsap.set(facet, { opacity: 0, scale: 0.4, transformOrigin: "100px 100px" });
        tl.to(facet, { opacity: 0.4, scale: 1, duration: 0.05 }, 0.5 + i * 0.028);
      });

      // The central mark draws in — measured, geometric, certain
      glyph.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.16, ease: "power1.inOut" }, 0.66 + i * 0.05);
      });

      // The ring becomes a canopy — match cut into Act VI
      if (ring && canopyArc) {
        tl.to(ring, { opacity: 0, duration: 0.12 }, 0.88);
        const length = canopyArc.getTotalLength();
        gsap.set(canopyArc, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        tl.to(canopyArc, { opacity: 0.5, strokeDashoffset: 0, duration: 0.16, ease: "power1.out" }, 0.86);
      }
    },
  });

  return (
    <section
      ref={sectionRef}
      className="film-grain relative flex h-screen w-full items-center justify-center overflow-hidden bg-paper"
      aria-label="Act V: Bitcoin"
    >
      <span className="btc-label font-grotesk absolute top-[10%] left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-ink-faint uppercase opacity-0">
        Act V — Bitcoin
      </span>

      {/* residual cool wash from Act IV, fading as warmth returns */}
      <div
        className="btc-warm-wash pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-ash) 30%, var(--color-paper)) 0%, var(--color-paper) 70%)",
        }}
      />

      <div className="relative z-0 flex items-center justify-center">
        <div
          aria-hidden
          className="absolute h-[clamp(220px,34vw,420px)] w-[clamp(220px,34vw,420px)] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(247,147,26,0.16) 0%, rgba(247,147,26,0) 70%)" }}
        />
        <svg className="relative h-[clamp(200px,30vw,380px)] w-[clamp(200px,30vw,380px)]" viewBox="0 0 200 200" fill="none" aria-hidden>
          {/* the seal — an exact, engraved medallion; never a literal logo */}
          <circle className="btc-ring" cx="100" cy="100" r="74" stroke="#f7931a" strokeWidth="2" fill="none" />

          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const x1 = 100 + Math.cos(angle) * 62;
            const y1 = 100 + Math.sin(angle) * 62;
            const x2 = 100 + Math.cos(angle) * 68;
            const y2 = 100 + Math.sin(angle) * 68;
            return (
              <line
                key={i}
                className="btc-facet"
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#f7931a" strokeWidth="1.6" strokeLinecap="round"
              />
            );
          })}

          {/* abstract central mark — a measured, vertical promise crossed by two bars */}
          <path className="btc-glyph" d="M100 64 V136" stroke="#0d0d0c" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path className="btc-glyph" d="M82 84 H118" stroke="#0d0d0c" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path className="btc-glyph" d="M82 116 H118" stroke="#0d0d0c" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* canopy arc — the ring's continuation into Act VI's tree */}
          <path className="btc-canopy-arc" d="M40 120 C 60 60, 140 60, 160 120" stroke="#0d0d0c" strokeWidth="2" fill="none" opacity="0" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-[10%] z-20 flex justify-center px-6">
        <Narration phrases={script.phrases} progress={progress} />
      </div>
    </section>
  );
}
