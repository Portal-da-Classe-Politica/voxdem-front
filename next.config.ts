import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: true,
  basePath: '/front',
  assetPrefix: '/front',
  images: {
    // Loader customizado em vez de unoptimized:true — ver src/lib/imageLoader.ts
    // para o motivo (o otimizador embutido do Next quebra com basePath +
    // output:standalone, e unoptimized:true sozinho não aplica o basePath
    // no src das imagens).
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
};

export default nextConfig;
