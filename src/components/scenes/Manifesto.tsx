"use client";

/**
 * Manifesto — The Thesis Card (the earned conclusion)
 *
 * One held frame, placed AFTER the Bitcoin turn, where the film pauses to
 * state its point — so the thesis lands as a conclusion the visitor arrives
 * at, never a claim they're sold. This is the single sentence a stranger
 * leaves able to repeat, backed by three plain clauses with zero jargon.
 *
 * Not a pinned scene: it scrolls normally, in near-empty paper, so the pause
 * reads as breath. One ember promise-dot above the line — the recurring coal.
 */

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Manifesto() {
  return (
    <section
      className="film-grain relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper px-6"
      aria-label="The promise, held"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20%" }}
        variants={reveal}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-3xl -translate-y-[4%] flex-col items-center text-center"
      >
        {/* the single ember coal */}
        <span aria-hidden className="mb-10 inline-block h-2 w-2 rounded-full bg-ember" />

        <p className="font-serif-display text-balance text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.32] font-light text-ink">
          A promise no one can change. Plus time no one can rush. That is the
          only honest way a civilization has ever stored trust — and the only
          thing <span className="whitespace-nowrap">BitcoinTree</span> is built
          to protect.
        </p>

        <p className="font-grotesk mt-12 text-[11px] leading-relaxed tracking-[0.22em] text-ink-soft uppercase sm:text-xs">
          The supply is fixed
          <span className="mx-2 text-ink-faint/50">·</span>
          The ledger is public
          <span className="mx-2 text-ink-faint/50">·</span>
          The rule outlives the ruler
        </p>
      </motion.div>
    </section>
  );
}
