import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // GitHub Pages hosts this project below /upprime; Vercel serves it at the domain root.
  basePath: isGitHubPages ? "/upprime" : undefined,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  poweredByHeader: false
};

export default nextConfig;
