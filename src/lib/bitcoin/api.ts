/**
 * Minimal Bitcoin chain-data client.
 *
 * BitcoinTree shows a single, real, public address — its balance is part
 * of the monument, not a marketing widget. We query mempool.space's public
 * REST API (no key required, generous CORS) and fall back to
 * blockchain.info if the primary is unreachable. Both are read-only,
 * privacy-respecting, and require no credentials.
 */

export interface AddressSummary {
  address: string;
  fundedSats: number;
  spentSats: number;
  balanceSats: number;
  txCount: number;
}

const SATS_PER_BTC = 100_000_000;

interface MempoolAddressResponse {
  address: string;
  chain_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
    tx_count: number;
  };
  mempool_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
    tx_count: number;
  };
}

interface BlockchainInfoBalanceResponse {
  [address: string]: {
    final_balance: number;
    n_tx: number;
    total_received: number;
    total_sent: number;
  };
}

async function fetchFromMempoolSpace(address: string): Promise<AddressSummary> {
  const res = await fetch(`https://mempool.space/api/address/${address}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`mempool.space responded ${res.status}`);
  const data = (await res.json()) as MempoolAddressResponse;

  const fundedSats =
    data.chain_stats.funded_txo_sum + data.mempool_stats.funded_txo_sum;
  const spentSats =
    data.chain_stats.spent_txo_sum + data.mempool_stats.spent_txo_sum;

  return {
    address: data.address,
    fundedSats,
    spentSats,
    balanceSats: fundedSats - spentSats,
    txCount: data.chain_stats.tx_count + data.mempool_stats.tx_count,
  };
}

async function fetchFromBlockchainInfo(address: string): Promise<AddressSummary> {
  const res = await fetch(
    `https://blockchain.info/balance?active=${address}&cors=true`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`blockchain.info responded ${res.status}`);
  const data = (await res.json()) as BlockchainInfoBalanceResponse;
  const entry = data[address];
  if (!entry) throw new Error("Address not found in blockchain.info response");

  return {
    address,
    fundedSats: entry.total_received,
    spentSats: entry.total_sent,
    balanceSats: entry.final_balance,
    txCount: entry.n_tx,
  };
}

/**
 * Resolves the live summary for a public Bitcoin address, trying the
 * primary provider first and falling back gracefully. Never throws —
 * returns `null` on total failure so the UI can show a calm,
 * documentary-appropriate "still counting" state rather than an error.
 */
export async function getAddressSummary(
  address: string
): Promise<AddressSummary | null> {
  try {
    return await fetchFromMempoolSpace(address);
  } catch {
    try {
      return await fetchFromBlockchainInfo(address);
    } catch {
      return null;
    }
  }
}

export function satsToBtc(sats: number): number {
  return sats / SATS_PER_BTC;
}
