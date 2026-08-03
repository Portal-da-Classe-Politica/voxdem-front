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
