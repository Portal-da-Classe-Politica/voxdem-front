# Integração com Blog WordPress

Guia para integrar a listagem de posts de um blog WordPress via REST API em um projeto Next.js (ou similar).

## 1. Contexto

O blog utiliza WordPress com a API REST nativa (`wp-json/wp/v2`). A listagem de posts é consumida para exibir os últimos artigos em uma seção da aplicação.

## 2. Endpoints utilizados

### 2.1 Listar posts

```
GET https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/posts
```

Parâmetros recomendados:

| Parâmetro | Valor | Descrição |
|-----------|-------|-----------|
| `per_page` | `4` | Quantidade de posts retornados |
| `orderby` | `date` | Ordenação por data |
| `order` | `desc` | Do mais recente para o mais antigo |

> **Importante:** a listagem de posts retorna apenas **IDs de referência** para categorias (`categories`) e mídia destacada (`featured_media`). Esses IDs precisam ser resolvidos em chamadas separadas.

### 2.2 Resolver categorias

```
GET https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/categories
```

Parâmetro:

| Parâmetro | Valor | Descrição |
|-----------|-------|-----------|
| `include` | `id1,id2,id3` | IDs das categorias separados por vírgula |

Resposta relevante:

```json
{
  "id": 9,
  "name": "Eleições 2024",
  "slug": "eleicoes-2024",
  "taxonomy": "category"
}
```

### 2.3 Resolver imagem destacada

```
GET https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/media/{id}
```

Resposta relevante:

```json
{
  "id": 299,
  "source_url": "https://redem.c3sl.ufpr.br/blog/wp-content/uploads/2026/06/imagem.webp",
  "alt_text": "Descrição da imagem"
}
```

## 3. Campos importantes de um post

```ts
interface WpPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
}
```

## 4. Passo a passo da integração

### Passo 1: Buscar os posts

```ts
const response = await axios.get<WpPost[]>(
  'https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/posts',
  {
    params: {
      per_page: 4,
      orderby: 'date',
      order: 'desc',
    },
  }
);

const posts = response.data;
```

### Passo 2: Coletar IDs únicos

```ts
const categoryIds = Array.from(
  new Set(posts.flatMap((post) => post.categories))
);

const mediaIds = Array.from(
  new Set(posts.map((post) => post.featured_media).filter((id) => id > 0))
);
```

### Passo 3: Buscar categorias e mídias em paralelo

```ts
const [categoriesResponse, ...mediaResponses] = await Promise.all([
  axios.get<WpCategory[]>('https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/categories', {
    params: { include: categoryIds.join(',') },
  }),
  ...mediaIds.map((id) =>
    axios.get<WpFeaturedMedia>(`https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2/media/${id}`)
  ),
]);
```

> Alternativa: use `Promise.allSettled` para buscar mídias individualmente, assim uma falha isolada não quebra os outros cards.

### Passo 4: Criar mapas de resolução

```ts
const categoriesMap = new Map<number, WpCategory>();
categoriesResponse.data.forEach((category) => {
  categoriesMap.set(category.id, category);
});

const mediaMap = new Map<number, WpFeaturedMedia>();
mediaResponses.forEach((response) => {
  if (response.status === 'fulfilled') {
    const media = response.value.data;
    mediaMap.set(media.id, media);
  }
});
```

### Passo 5: Formatar cada post

```ts
function formatPost(post: WpPost): BlogPost {
  const featuredMedia = mediaMap.get(post.featured_media);
  const imageUrl = featuredMedia?.source_url || '/file.svg';
  const imageAlt = featuredMedia?.alt_text || post.title.rendered;

  const category = post.categories
    .map((id) => categoriesMap.get(id)?.name)
    .filter(Boolean)
    .join(', ') || 'Geral';

  return {
    id: post.id,
    title: post.title.rendered,
    description: stripHtml(post.excerpt.rendered),
    imageUrl,
    imageAlt,
    category,
    href: `https://redem.c3sl.ufpr.br/blog/?p=${post.id}`,
  };
}
```

## 5. Limpeza de HTML

A descrição vem do campo `excerpt.rendered`, que contém HTML. Deve-se remover as tags e decodificar entidades:

```ts
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}
```

## 6. Exibição

### Regras de exibição

- Exibir apenas os **4 últimos posts**.
- Truncar a descrição em **4 linhas**, com reticências no final (`...`).
- Exibir a **categoria** do post.
- Abrir o link em **nova aba**: `https://redem.c3sl.ufpr.br/blog/?p=${id}`.

### Exemplo de componente

```tsx
// Server Component (Next.js App Router)
export default async function ContentSection() {
  const posts = (await blogService.getLatestPosts(4)).slice(0, 4);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Últimos conteúdos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            description={post.description}
            category={post.category}
            imageUrl={post.imageUrl}
            imageAlt={post.imageAlt}
            href={post.href}
          />
        ))}
      </div>
    </section>
  );
}
```

## 7. Configuração de imagens no Next.js

Se estiver usando `next/image`, adicione o domínio do WordPress em `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'redem.c3sl.ufpr.br',
      },
    ],
  },
};
```

## 8. Pontos de atenção

- **Não confie no `_embed`:** a API do WordPress permite `_embed=true`, mas neste projeto optamos por resolver IDs manualmente para maior controle e clareza.
- **Falhas parciais:** ao buscar mídias, prefira `Promise.allSettled` para que a ausência de uma imagem não impeça a renderização dos outros posts.
- **Fallbacks:** caso a categoria não seja resolvida, usar `"Geral"`; caso a imagem não seja resolvida, usar uma imagem padrão local (ex: `/file.svg`).
- **Build estático:** se a página for gerada estaticamente, os posts serão buscados no momento do build. Para atualizações periódicas sem novo deploy, considere usar revalidação (`revalidate`) no Next.js.
