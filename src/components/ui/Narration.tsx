"use client";

/**
 * Narration
 * ---------
 * Renders the active subtitle phrase for a scene's current local progress.
 * Cross-fades between phrases — never stacks, never scrolls as a block of
 * text. Reads like captions in a film: brief, centered in the visitor's
 * attention, surrounded by silence.
 */

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NarrationPhrase } from "@/content/narration";
import { cn } from "@/lib/utils";

interface NarrationProps {
  phrases: NarrationPhrase[];
  progress: number;
  className?: string;
  align?: "left" | "center" | "right";
  tone?: "ink" | "paper" | "ash";
}

export function Narration({
  phrases,
  progress,
  className,
  align = "center",
  tone = "ink",
}: NarrationProps) {
  const active = useMemo(
    () => phrases.find((p) => progress >= p.start && progress < p.end) ?? null,
    [phrases, progress]
  );

  const toneClass = {
    ink: "text-ink",
    paper: "text-paper",
    ash: "text-ash-dark",
  }[tone];

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div
      className={cn(
        "pointer-events-none relative flex flex-col justify-end",
        alignClass,
        className
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.text}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Feathered paper "clearing" — gently recedes the artwork behind
                the words so the line never crowds the illustration. */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(250,249,246,0.92) 0%, rgba(250,249,246,0.72) 38%, rgba(250,249,246,0) 72%)",
              }}
            />
            <p
              className={cn(
                "font-serif-display text-balance measure-prose text-[1.35rem] leading-snug font-light italic sm:text-2xl md:text-[1.85rem]",
                toneClass
              )}
            >
              {active.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
