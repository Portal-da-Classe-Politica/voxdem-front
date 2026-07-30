export interface Documento {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  external?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export interface DocumentApiResponse {
  data: Documento[];
}
