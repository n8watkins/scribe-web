import type { NextConfig } from "next";

// A fully static export: `next build` writes the site to out/, which Cloudflare
// Workers static assets serves (see DEPLOY.md). Security and cache headers live
// in public/_headers, because a static export has no server to send them.
const nextConfig: NextConfig = {
  output: "export",
  // There is no image optimizer at runtime, so images ship as committed.
  images: { unoptimized: true },
};

export default nextConfig;
