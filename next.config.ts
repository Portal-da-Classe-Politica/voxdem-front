import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  basePath: '/voxdem',
  assetPrefix: '/voxdem',
  trailingSlash: true,
};

export default nextConfig;
