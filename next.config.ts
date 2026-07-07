import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: true,
  basePath: '/front',
  assetPrefix: '/front',
};

export default nextConfig;
