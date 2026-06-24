"use client";

/**
 * Wordmark — the single source of the BitcoinTree brand mark.
 *
 * One coined word, set in Spectral Light, tracked tight so it reads as a
 * single thing (like "Wikipedia"), not two words bolted together. The "T"
 * of "Tree" is replaced by the three-stroke promise mark from the Act V
 * seal — a vertical stem crossed by two short bars, its stem dropping
 * below the baseline like a taproot. That stem is the ONLY ember element
 * in the whole name: a single coal inside the word.
 *
 * - variant="display": large, editorial, written-on left-to-right (a clip
 *   wipe — "a promise written down"). Used at arrival and at the close.
 * - variant="header": a small engraved plaque that sits at the top of every
 *   act, so anyone arriving mid-scroll learns the name and what it stands for.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The promise glyph standing in for the capital "T" of Tree. Rendered as an
 * inline SVG sized in em units so it scales with the surrounding type. The
 * vertical stem is ember (the single coal); the bars are ink (currentColor).
 */
function PromiseGlyphT({ strokeScale = 1 }: { strokeScale?: number }) {
  return (
    <svg
      viewBox="0 0 56 132"
      fill="none"
      aria-hidden
      style={{
        display: "inline-block",
        height: "0.98em",
        width: "0.5em",
        verticalAlign: "-0.17em",
        margin: "0 0.015em",
        overflow: "visible",
      }}
    >
      {/* taproot stem — the single ember coal in the name */}
      <path
        d="M28 10 V128"
        stroke="var(--color-ember)"
        strokeWidth={9 * strokeScale}
        strokeLinecap="round"
      />
      {/* the T crossbar — wide and at the very top so it reads clearly as a T */}
      <path
        d="M3 12 H53"
        stroke="currentColor"
        strokeWidth={9 * strokeScale}
        strokeLinecap="round"
      />
      {/* a quiet, short second bar — just a hint of a ₿, the seed/promise rhyme */}
      <path
        d="M14 46 H40"
        stroke="currentColor"
        strokeWidth={6 * strokeScale}
        strokeLinecap="round"
        opacity={0.4}
      />
    </svg>
  );
}

interface WordmarkProps {
  variant?: "display" | "header";
  /** Play the written-on reveal (display only). Defaults to true. */
  play?: boolean;
  /** Delay (s) before the reveal begins. */
  delay?: number;
  className?: string;
}

export function Wordmark({
  variant = "display",
  play = true,
  delay = 0,
  className,
}: WordmarkProps) {
  if (variant === "header") {
    // The engraved plaque on the monument's base — never navigation,
    // nothing to click; just the name and the creed, kept quiet.
    return (
      <div
        className={cn(
          "font-grotesk flex items-center gap-2 text-[10px] tracking-[0.3em] text-ink-faint uppercase sm:text-[11px]",
          className
        )}
        aria-label="BitcoinTree — a promise that cannot be broken"
      >
        <span aria-hidden className="inline-block h-2.5 w-px bg-ember" />
        <span className="text-ink-soft">BitcoinTree</span>
        <span aria-hidden className="text-ink-faint/40">·</span>
        <span className="hidden sm:inline">A promise that cannot be broken</span>
      </div>
    );
  }

  return (
    <motion.span
      className={cn(
        "font-serif-display wordmark-track inline-block leading-none font-light whitespace-nowrap text-ink",
        className
      )}
      style={{ display: "inline-block" }}
      initial={play ? { clipPath: "inset(0 100% 0 0)" } : undefined}
      animate={play ? { clipPath: "inset(0 0% 0 0)" } : undefined}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay }}
      aria-label="BitcoinTree"
    >
      <span aria-hidden>Bitcoin</span>
      <PromiseGlyphT />
      <span aria-hidden>ree</span>
    </motion.span>
  );
}
