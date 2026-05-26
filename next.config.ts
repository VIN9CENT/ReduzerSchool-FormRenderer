import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brand-assets.reduzer.tech',
      },
    ],
  },
};

export default nextConfig;
