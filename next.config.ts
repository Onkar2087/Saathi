import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mastra, its exporters and the MongoDB driver are Node-only; load them at runtime instead of bundling.
  serverExternalPackages: [
    "@mastra/core",
    "@mastra/memory",
    "@mastra/mongodb",
    "@mastra/observability",
    "@mastra/sentry",
    "mongodb",
  ],
};

export default nextConfig;
