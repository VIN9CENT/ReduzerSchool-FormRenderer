import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
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
