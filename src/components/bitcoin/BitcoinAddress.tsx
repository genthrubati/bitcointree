"use client";

/**
 * BitcoinAddress
 * --------------
 * Presented as an elegant typographic object — like a line engraved into
 * a plaque — not a form field. A single, quiet "copy" affordance is the
 * only interactive element, and it confirms itself wordlessly (a brief
 * checkmark, no toast, no sound effect).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { truncateAddress } from "@/lib/bitcoin/format";
import { cn } from "@/lib/utils";

export function BitcoinAddress({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable — the address remains selectable text */
    }
  }

  return (
    <div className={cn("font-grotesk", className)}>
      <p className="text-[11px] tracking-[0.25em] text-ink-faint uppercase">
        The address — here is where
      </p>

      <button
        type="button"
        onClick={handleCopy}
        className="group mt-2 flex w-full items-center justify-between gap-4 rounded-md border border-ink/10 bg-paper-dim/60 px-4 py-3 text-left transition-colors duration-300 hover:border-ember/40"
        aria-label="Copy the BitcoinTree address to your clipboard"
      >
        <span className="num-tabular truncate text-sm text-ink sm:text-base">
          <span className="hidden sm:inline">{address}</span>
          <span className="sm:hidden">{truncateAddress(address)}</span>
        </span>

        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-ink-faint transition-colors duration-300 group-hover:text-ember">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.svg
                key="check"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden
              >
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25 }}
                width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden
              >
                <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.6" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
      </button>

      <p className="mt-2 text-xs text-ink-faint" aria-live="polite">
        {copied ? "Copied — quietly, like everything else here." : "A tap copies it. Nothing else happens."}
      </p>
    </div>
  );
}
