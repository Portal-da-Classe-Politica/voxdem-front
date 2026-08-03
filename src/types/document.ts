export interface Documento {
  id: string;
  title: string;
  description: string;
  filePublicUrl: string;
  imagePublicUrl?: string | null;
  fileOriginal?: string;
  fileMime?: string;
  fileSize?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentationApiMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DocumentationApiItem {
  id: string;
  title: string;
  description: string;
  fileOriginal: string;
  fileMime: string;
  fileSize: number;
  filePublicUrl: string;
  imagePublicUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentationApiResponse {
  data: DocumentationApiItem[];
  meta: DocumentationApiMeta;
}
