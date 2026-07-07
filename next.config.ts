import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  trailingSlash: true,
  basePath: '/front',
  assetPrefix: '/front',
  images: {
    // O otimizador embutido (/_next/image) exige o pacote "sharp" em produção
    // self-hosted, que não está instalado (ver package.json). Sem ele, todo
    // pedido de otimização volta 400 "The requested resource isn't a valid
    // image" — foi o que quebrou as imagens depois da migração. Desativando
    // a otimização, o <Image> vira uma <img> direto pro arquivo em /public
    // (que já funciona, confirmado em /front/svg/partners/cnpq.png).
    unoptimized: true,
  },
};

export default nextConfig;
