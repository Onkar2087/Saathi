import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
