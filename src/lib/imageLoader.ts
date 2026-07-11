// Loader customizado para o next/image.
//
// Motivo: com `basePath: '/front'` + `output: 'standalone'`, o otimizador
// embutido do Next (/_next/image) falha ao buscar a imagem de origem
// internamente ("The requested resource isn't a valid image" / 400) — é uma
// limitação conhecida do Next nesse combo de configuração. Setar apenas
// `images.unoptimized: true` resolve o 400, mas troca de bug: sem loader,
// o <Image> usa o src cru sem prefixar o basePath, então a imagem é pedida
// em "/images/x.png" (raiz do domínio) em vez de "/front/images/x.png".
//
// Este loader substitui o otimizador por completo: não passa mais por
// /_next/image, só devolve a URL final já com o basePath aplicado.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  const basePath = '/front';
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;

  return `${basePath}${normalizedSrc}`;
}
