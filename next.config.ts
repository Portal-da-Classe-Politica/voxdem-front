import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: true,
  basePath: '/front',
  assetPrefix: '/front',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'redem.c3sl.ufpr.br',
      },
    ],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
};

export default nextConfig;
