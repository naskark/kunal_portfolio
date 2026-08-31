import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves a prerendered bundle from `out/`.
  output: "export",
  // The export target has no image optimisation server.
  images: { unoptimized: true },
};

export default nextConfig;
