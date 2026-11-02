import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deploy at the Vercel project root (https://upprime.vercel.app/)
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  poweredByHeader: false
};

export default nextConfig;
