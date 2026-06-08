/**
 * Site-wide configuration.
 *
 * IMPORTANT — replace `BITCOIN_ADDRESS` with BitcoinTree's real, audited,
 * publicly-documented receive address before deploying to production.
 * The placeholder below is a syntactically valid bech32 mainnet address
 * format shown only so the UI can be built and previewed end-to-end.
 */

export const SITE = {
  name: "BitcoinTree",
  url: "https://bitcointree.org",
  // TODO(production): replace with BitcoinTree's real public receiving address.
  // The value below is the well-known BIP-173 bech32 test vector — a
  // syntactically valid, publicly-documented placeholder with no real
  // owner, used here only so the UI can be built and previewed end-to-end.
  bitcoinAddress: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
} as const;
