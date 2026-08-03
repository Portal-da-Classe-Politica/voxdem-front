# Integração com API de Documentação

> Guia para replicar a integração com o endpoint de listagem de documentação de upload de documentos em outro projeto.

---

## 1. Visão geral

A API de documentação expõe os documentos de um projeto específico. Cada documento contém metadados (título, descrição, MIME type, tamanho) e duas URLs públicas:

- `filePublicUrl`: URL direta do arquivo (PDF, DOC, etc.)
- `imagePublicUrl`: URL de uma imagem/thumbnail (pode ser `null`)

### Endpoint

```http
GET {uploadDocsApiBaseUrl}/projects/{projectId}/documents
```

### Variáveis

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `uploadDocsApiBaseUrl` | URL base da API de upload/documentação | `https://api.exemplo.com/upload-docs-api` |
| `projectId` | Identificador UUID do projeto | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |

### Exemplo de resposta (200 OK)

```json
{
  "data": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "title": "Documento de exemplo",
      "description": "Descrição do documento de exemplo",
      "fileOriginal": "documento-exemplo.pdf",
      "fileMime": "application/pdf",
      "fileSize": 15313,
      "filePublicUrl": "https://api.exemplo.com/upload-docs-api/uploads/documents/00000000-0000-0000-0000-000000000001.pdf",
      "imagePublicUrl": "https://api.exemplo.com/upload-docs-api/uploads/images/00000000-0000-0000-0000-000000000002.png",
      "createdAt": "2026-01-01T00:00:00.000Z",
      "updatedAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

---

## 2. Checklist de implementação

Antes de começar, verifique se o projeto já possui:

- [ ] Client HTTP instalado (ex: `axios`)
- [ ] Framework React/Next.js configurado
- [ ] Suporte a componentes `async` em Server Components (Next.js App Router)
- [ ] Configuração de imagens externas (`next.config.js`/`next.config.ts`) se usar `next/image`

---

## 3. Configurar o client da API

Crie ou estenda o arquivo de configuração do client HTTP. Recomenda-se isolar a base URL da API de documentação em uma instância separada para facilitar manutenção e variáveis de ambiente.

### Exemplo com Axios

```ts
// src/lib/api.ts
import axios, { AxiosInstance } from 'axios';

const createApiClient = (baseURL: string, timeout: number = 10000): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

// APIs existentes do projeto
export const mainApi = createApiClient(
  process.env.NEXT_PUBLIC_MAIN_API_URL || 'https://api.exemplo.com/api'
);

// API de upload/documentação
export const uploadDocsApi = createApiClient(
  process.env.NEXT_PUBLIC_UPLOAD_DOCS_API_URL || 'https://api.exemplo.com/upload-docs-api'
);
```

### Dicas

- Use variáveis de ambiente (`NEXT_PUBLIC_*`) para permitir diferentes ambientes (dev, staging, produção).
- Se a API exigir autenticação no futuro, adicione interceptadores de request para incluir tokens.

---

## 4. Criar os tipos

Separe os tipos da API dos tipos usados pela interface. Isso permite que a API mude sem impactar diretamente os componentes.

```ts
// src/types/document.ts
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
```

---

## 5. Criar o service

Centralize a chamada na camada de `services`. Inclua o `projectId` fixo ou receba-o por parâmetro se o projeto for genérico.

```ts
// src/services/documentService.ts
import { uploadDocsApi } from '../lib/api';
import {
  DocumentationApiItem,
  DocumentationApiResponse,
  Documento,
} from '../types/document';

const PROJECT_ID = '00000000-0000-0000-0000-000000000000'; // Substitua pelo UUID do projeto

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
```

### Pontos de atenção

- O endpoint retorna paginação em `meta`. Se for necessário paginar na UI, adapte o service para aceibir `page` e `limit`.
- Sempre trate erros de rede (try/catch ou error boundary) para evitar que a página quebre.

---

## 6. Componente de download

O link de download não deve apenas abrir o arquivo em uma nova aba. Para garantir que o usuário salve o PDF, use um componente client que faz o fetch do arquivo e dispara o download via `Blob`.

```tsx
// src/components/ui/DownloadLink.tsx
'use client';

import { ReactNode } from 'react';

interface DownloadLinkProps {
  url: string;
  filename: string;
  children: ReactNode;
}

export default function DownloadLink({ url, filename, children }: DownloadLinkProps) {
  async function handleDownload(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Falha ao baixar arquivo: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      // Fallback: abre o arquivo em nova aba
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <a
      href={url}
      onClick={handleDownload}
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#3D58F5] mt-4 hover:underline cursor-pointer"
    >
      {children}
    </a>
  );
}
```

### Por que usar fetch?

- Permite definir o nome do arquivo no atributo `download`.
- Funciona mesmo quando o servidor responde com headers que impedem download direto.
- Oferece fallback controlado em caso de erro.

---

## 7. Integrar na página

A página de documentação pode ser um Server Component que consome o service diretamente.

```tsx
// src/app/documentacao/page.tsx
import Image from 'next/image';
import DownloadLink from '../../components/ui/DownloadLink';
import { documentService } from '../../services/documentService';
import { Documento } from '../../types/document';

async function getDocumentos(): Promise<Documento[]> {
  return documentService.getDocuments();
}

function DocumentCard({ documento }: { documento: Documento }) {
  return (
    <article className="bg-white rounded-xl p-6 flex flex-col h-full border border-gray-300 shadow-md">
      <div className="relative w-full h-32 mb-6 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
        {documento.imagePublicUrl ? (
          <Image
            src={documento.imagePublicUrl}
            alt={documento.title}
            fill
            className="object-cover"
          />
        ) : (
          <span>Ícone de arquivo</span>
        )}
      </div>

      <h3 className="font-semibold text-black mb-2">{documento.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
        {documento.description}
      </p>

      <DownloadLink
        url={documento.filePublicUrl}
        filename={documento.fileOriginal || `${documento.title}.pdf`}
      >
        Download
      </DownloadLink>
    </article>
  );
}

export default async function Documentacao() {
  const documentos = await getDocumentos();

  return (
    <section>
      <h1>Documentação</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentos.map((documento) => (
          <DocumentCard key={documento.id} documento={documento} />
        ))}
      </div>
    </section>
  );
}
```

---

## 8. Configurar imagens externas (Next.js)

Se usar `next/image`, adicione o hostname da API no `next.config.ts`:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.exemplo.com',
      },
    ],
  },
};

export default nextConfig;
```

Sem essa configuração, o Next.js rejeita imagens de domínios não autorizados.

---

## 9. Tratamento de erros recomendado

### Erro na chamada da API

Envolva a chamada em try/catch e retorne um estado vazio ou mensagem amigável:

```ts
try {
  return await documentService.getDocuments();
} catch (error) {
  console.error('Erro ao carregar documentos:', error);
  return [];
}
```

### Erro no download

O componente `DownloadLink` já possui fallback para abrir o arquivo em nova aba. Se o CORS bloquear o `fetch`, considere:

- Forçar o download via backend proxy.
- Usar apenas o link direto com `target="_blank"`.

---

## 10. Testes e validação

1. Verifique se a URL do endpoint está correta e acessível.
2. Confirme que o `projectId` está válido.
3. Execute o build para validar tipos:

```bash
npm run build
```

4. Teste o download de pelo menos um documento.
5. Verifique se thumbnails são carregadas corretamente (quando existirem).


