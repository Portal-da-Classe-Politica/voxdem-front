export interface WpRendered {
  rendered: string;
}

export interface WpFeaturedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes?: {
      medium?: { source_url: string };
      full?: { source_url: string };
      [key: string]: { source_url: string } | undefined;
    };
  };
}

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  description: string;
  link: string;
  count: number;
  parent: number;
}

export interface WpPost {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WpRendered;
  content: WpRendered;
  excerpt: WpRendered;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  href: string;
}
