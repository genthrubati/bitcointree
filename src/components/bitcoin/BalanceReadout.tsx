"use client";

/**
 * BalanceReadout
 * --------------
 * The living number at the foot of the tree. Set in tabular grotesk
 * numerals — it should look *measured*, not narrated. Updates are shown
 * as a soft digit-roll, never a flashy counter animation; this is a
 * monument's plaque, not a stock ticker.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getAddressSummary, satsToBtc } from "@/lib/bitcoin/api";
import { formatBtc } from "@/lib/bitcoin/format";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "loading" | "ready" | "unavailable";

export function BalanceReadout({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [btc, setBtc] = useState<number | null>(null);
  const [txCount, setTxCount] = useState<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const summary = await getAddressSummary(SITE.bitcoinAddress);
      if (cancelled) return;
      if (summary) {
        setBtc(satsToBtc(summary.balanceSats));
        setTxCount(summary.txCount);
        setStatus("ready");
      } else {
        setStatus((prev) => (prev === "ready" ? prev : "unavailable"));
      }
    }

    load();
    // Re-check periodically — gently, like checking on something growing
    pollRef.current = setInterval(load, 90_000);

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return (
    <div className={cn("font-grotesk", className)}>
      <p className="text-[11px] tracking-[0.25em] text-ink-faint uppercase">
        Currently held, in public
      </p>

      <div className="mt-2 flex items-baseline gap-2">
        {status === "ready" && btc !== null ? (
          <motion.span
            key={btc.toFixed(8)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="num-tabular text-3xl font-medium text-ink sm:text-4xl"
          >
            {formatBtc(btc)}
          </motion.span>
        ) : status === "loading" ? (
          <span className="num-tabular text-3xl font-medium text-ink-faint sm:text-4xl" aria-live="polite">
            ··········
          </span>
        ) : (
          <span className="num-tabular text-2xl font-medium text-ink-faint sm:text-3xl">
            still counting
          </span>
        )}
        <span className="text-sm text-ink-faint">BTC</span>
      </div>

      {status === "ready" && txCount !== null && (
        <p className="num-tabular mt-1 text-xs text-ink-faint">
          {txCount.toLocaleString("en-US")} contributions received, on-chain, since the planting
        </p>
      )}
      {status === "unavailable" && (
        <p className="mt-1 text-xs text-ink-faint">
          The ledger is public even when our display of it isn&apos;t — you can always check directly, address in hand.
        </p>
      )}
    </div>
  );
}
