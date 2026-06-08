"use client";

/**
 * QRCode
 * ------
 * Rendered as if engraved into bark — textured, organic, intentional —
 * rather than a generic black-on-white scanner graphic. It "grows into"
 * visibility via the same line-revealing logic as the Act V seal: a
 * visual rhyme that closes the loop between "exact rule" and "living thing."
 */

import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

export function QRCode({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  // useId is stable across server and client renders — Math.random() is not,
  // and would otherwise cause a hydration mismatch on this SVG filter id.
  const textureId = `bark-${useId().replace(/[:]/g, "")}`;

  return (
    <div ref={ref} className={cn("relative inline-flex", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="film-grain relative overflow-hidden rounded-[6px] border border-ink/12 bg-paper-dim p-4"
      >
        {/* Bark-grain texture, multiplied over the code so it reads as "engraved" */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] mix-blend-multiply" aria-hidden>
          <filter id={textureId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="3" seed="7" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.04  0 0 0 0.55 0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${textureId})`} />
        </svg>

        <QRCodeSVG
          value={value}
          size={148}
          bgColor="transparent"
          fgColor="#0d0d0c"
          level="M"
          marginSize={0}
          className="relative z-10"
        />
      </motion.div>

      <p className="font-grotesk absolute -bottom-7 left-0 text-[11px] tracking-[0.2em] text-ink-faint uppercase">
        Scan to find the tree
      </p>
    </div>
  );
}
