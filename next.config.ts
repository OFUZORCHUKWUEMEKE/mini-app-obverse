import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net", // Farcaster PFPs
      },
      {
        protocol: "https",
        hostname: "**.farcaster.xyz",
      },
      {
        protocol: "https",
        hostname: "**.warpcast.com",
      },
    ],
  },
};

export default nextConfig;
