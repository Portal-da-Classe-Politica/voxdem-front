import { uploadDocsApi } from '../lib/api';
import { DocumentationApiItem, DocumentationApiResponse, Documento } from '../types/document';

const PROJECT_ID = '545e08c5-1fee-43c0-b2cc-96a67b5d95dc';

function mapApiItemToDocumento(item: DocumentationApiItem): Documento {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    filePublicUrl: item.filePublicUrl,
    imagePublicUrl: item.imagePublicUrl,
    fileOriginal: item.fileOriginal,
    fileMime: item.fileMime,
    fileSize: item.fileSize,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export const documentService = {
  async getDocuments(): Promise<Documento[]> {
    const response = await uploadDocsApi.get<DocumentationApiResponse>(
      `/projects/${PROJECT_ID}/documents`
    );

    return response.data.data.map(mapApiItemToDocumento);
  },
};
