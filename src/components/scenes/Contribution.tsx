"use client";

/**
 * Contribution
 * ------------
 * Where the film hands off to a place the visitor can simply stay.
 * No "Donate Now," no urgency, no scarcity — just an open hand and an
 * address, set with the same restraint as everything before it. This is
 * the only section that scrolls normally rather than as a pinned scene:
 * the experience has arrived, and is no longer asking anything of the
 * visitor's attention — only offering them a place to act, if they wish.
 */

import { motion } from "framer-motion";
import { BalanceReadout } from "@/components/bitcoin/BalanceReadout";
import { BitcoinAddress } from "@/components/bitcoin/BitcoinAddress";
import { QRCode } from "@/components/bitcoin/QRCode";
import { SITE } from "@/content/site";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export function Contribution() {
  return (
    <section
      className="relative w-full bg-paper-dim/50 px-6 py-28 sm:py-36"
      aria-label="Where the tree is growing"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={reveal}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <p className="font-grotesk text-[11px] tracking-[0.25em] text-ink-faint uppercase">
            BitcoinTree
          </p>
          <h2 className="font-serif-display text-balance mt-4 text-3xl leading-[1.25] font-light text-ink sm:text-4xl">
            This isn&apos;t a fundraiser. It&apos;s a place this is actually growing — in public, on a ledger anyone can read, for as long as it takes.
          </h2>
          <p className="font-serif-display measure-prose mt-6 text-base leading-relaxed text-ink-soft italic">
            If you&apos;d like to add water, here is exactly where. Nothing is asked of you beyond what you already chose by reading this far.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={reveal}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-md flex-col gap-8 rounded-xl border border-ink/8 bg-paper p-7 shadow-[0_30px_80px_-40px_rgba(13,13,12,0.25)] sm:p-9"
        >
          <BalanceReadout />
          <div className="h-px w-full bg-ink/8" />
          <BitcoinAddress address={SITE.bitcoinAddress} />
          <div className="flex items-center gap-6">
            <QRCode value={`bitcoin:${SITE.bitcoinAddress}`} />
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="font-serif-display mx-auto mt-24 max-w-xl text-center text-sm leading-relaxed text-ink-faint italic"
      >
        Every figure above is read live from the public Bitcoin ledger. Nothing here is performance — it is simply visible, the way a tree is visible to anyone who walks past it.
      </motion.p>

      <footer className="font-grotesk mx-auto mt-20 flex max-w-5xl flex-col items-center gap-2 border-t border-ink/8 pt-10 text-center text-xs text-ink-faint">
        <p>BitcoinTree — a public monument to long-term thinking.</p>
        <p>bitcointree.org</p>
      </footer>
    </section>
  );
}
