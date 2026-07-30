import Image from 'next/image';
import { Section } from '../../components';
import { documentService } from '../../services/documentService';
import { Documento } from '../../types/document';

async function getDocumentos(): Promise<Documento[]> {
  const response = await documentService.getDocuments();
  return response.data;
}

function FileIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3D58F5"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 12V4m0 8-4-4m4 4 4-4"
      />
    </svg>
  );
}

function DocumentCard({ documento }: { documento: Documento }) {
  return (
    <article className="bg-white rounded-xl p-6 flex flex-col h-full border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-32 mb-6 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
        {documento.imageUrl ? (
          <Image
            src={documento.imageUrl}
            alt={documento.imageAlt || documento.title}
            fill
            className="object-cover"
          />
        ) : (
          <FileIcon />
        )}
      </div>

      <h3 className="font-semibold text-black mb-2">{documento.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-grow">
        {documento.description}
      </p>

      <a
        href={documento.href}
        target={documento.external ? '_blank' : undefined}
        rel={documento.external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#3D58F5] mt-4 hover:underline"
      >
        Download
        <DownloadIcon />
      </a>
    </article>
  );
}

export default async function Documentacao() {
  const documentos = await getDocumentos();

  return (
    <>
      <section className="bg-[#3D58F5] text-white py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Documentação</h1>
          <p className="text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Tenha acesso ao material metodológico do VoxDem. Acesse a documentação de surveys e materiais complementares.
          </p>
        </div>
      </section>

      <Section backgroundColor="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map((documento) => (
            <DocumentCard key={documento.id} documento={documento} />
          ))}
        </div>
      </Section>
    </>
  );
}
