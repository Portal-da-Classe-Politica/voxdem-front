import { voxdemApi } from '../lib/api';
import { DocumentApiResponse, Documento } from '../types/document';

const mockDocuments: Documento[] = [
  {
    id: '1',
    title: 'Portal da Classe Política',
    description:
      'Processamento, visualização e transparência de bigdata eleitoral no Brasil.',
    linkLabel: 'Apresentação do projeto',
    href: '#',
  },
  {
    id: '2',
    title: 'White Paper para a imprensa',
    description: 'Material de divulgação do projeto.',
    linkLabel: 'Material de divulgação',
    href: '#',
  },
  {
    id: '3',
    title: 'Cruzamentos e Dados Eleitorais',
    description: 'Elabore suas próprias análises cruzando variáveis.',
    linkLabel: 'Acessar Ferramenta',
    href: '/dados',
  },
  {
    id: '4',
    title: 'Metodologia de índices e indicadores',
    description: 'Metodologia do Portal da Classe Política.',
    linkLabel: 'Documento metodológico',
    href: '#',
  },
  {
    id: '5',
    title: 'Banco de Dados - Coletânea Classe Política Brasileira',
    description: 'Codato e Sainz (2026). Acesse o banco de dados e materiais complementares.',
    linkLabel: 'Acessar materiais',
    href: '#',
  },
  {
    id: '6',
    title: 'Cruzamentos e Dados Eleitorais',
    description: 'Elabore suas próprias análises cruzando variáveis.',
    linkLabel: 'Acessar Ferramenta',
    href: '/dados',
  },
];

export const documentService = {
  async getDocuments(): Promise<DocumentApiResponse> {
    // TODO: substituir mock pela chamada real à API
    // const response = await voxdemApi.get<DocumentApiResponse>('/documents');
    // return response.data;

    return { data: mockDocuments };
  },
};
