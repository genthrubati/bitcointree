/** Formats a BTC amount for the documentary-grade balance readout — measured, not flashy. */
export function formatBtc(btc: number): string {
  return btc.toLocaleString("en-US", {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8,
  });
}

/** Shortens an address for compact display, preserving the ends a visitor would check. */
export function truncateAddress(address: string, lead = 8, trail = 8): string {
  if (address.length <= lead + trail + 1) return address;
  return `${address.slice(0, lead)}…${address.slice(-trail)}`;
}
