import axios from 'axios';
import { WpPost, WpCategory, WpFeaturedMedia, BlogPost } from '../types/blog';

const BLOG_API_URL = 'https://redem.c3sl.ufpr.br/blog/wp-json/wp/v2';

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

async function fetchCategories(categoryIds: number[]): Promise<Map<number, WpCategory>> {
  const map = new Map<number, WpCategory>();

  if (categoryIds.length === 0) {
    return map;
  }

  try {
    const response = await axios.get<WpCategory[]>(`${BLOG_API_URL}/categories`, {
      params: { include: categoryIds.join(',') },
    });

    response.data.forEach((category) => {
      map.set(category.id, category);
    });
  } catch {
    // Falha silenciosa: posts sem categoria resolvida usam fallback.
  }

  return map;
}

async function fetchFeaturedMedias(mediaIds: number[]): Promise<Map<number, WpFeaturedMedia>> {
  const map = new Map<number, WpFeaturedMedia>();

  if (mediaIds.length === 0) {
    return map;
  }

  const results = await Promise.allSettled(
    mediaIds.map((id) => axios.get<WpFeaturedMedia>(`${BLOG_API_URL}/media/${id}`))
  );

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const media = result.value.data;
      map.set(media.id, media);
    }
  });

  return map;
}

function formatPost(
  post: WpPost,
  categoriesMap: Map<number, WpCategory>,
  mediaMap: Map<number, WpFeaturedMedia>
): BlogPost {
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

export const blogService = {
  async getLatestPosts(limit: number = 4): Promise<BlogPost[]> {
    const response = await axios.get<WpPost[]>(`${BLOG_API_URL}/posts`, {
      params: {
        per_page: limit,
        orderby: 'date',
        order: 'desc',
      },
    });

    const posts = response.data;

    const categoryIds = Array.from(
      new Set(posts.flatMap((post) => post.categories))
    );
    const mediaIds = Array.from(
      new Set(posts.map((post) => post.featured_media).filter((id) => id > 0))
    );

    const [categoriesMap, mediaMap] = await Promise.all([
      fetchCategories(categoryIds),
      fetchFeaturedMedias(mediaIds),
    ]);

    return posts.map((post) => formatPost(post, categoriesMap, mediaMap));
  },
};
