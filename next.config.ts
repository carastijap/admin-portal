import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/admin-portal',
  assetPrefix: '/admin-portal/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
