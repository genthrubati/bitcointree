import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Photographic/textural assets, when added, may be served from a CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
