import { HeroSection, ContentSection } from '../../components';

export default function Dados() {
  const dadosItems = [
    {
      title: "Pesquisa de Satisfação Democrática",
      description: "Dados sobre a percepção dos cidadãos em relação ao funcionamento das instituições democráticas no Brasil."
    },
    {
      title: "Tolerância Política",
      description: "Análises sobre o nível de tolerância política e respeito à diversidade de opiniões na sociedade brasileira."
    },
    {
      title: "Comportamento Eleitoral",
      description: "Estudos sobre padrões de votação, preferências partidárias e fatores que influenciam as decisões eleitorais."
    },
    {
      title: "Cultura Política",
      description: "Pesquisas sobre valores políticos, participação cívica e conhecimento sobre o sistema democrático."
    }
  ];

  return (
    <>
      <HeroSection
        title="Base de Dados"
        subtitle="Acesse nossa coleção de dados sobre democracia"
        description="Nossa base de dados conta com milhares de entrevistas e pesquisas realizadas em todo o território nacional. Todos os dados estão disponíveis para download e uso acadêmico, seguindo os mais rigorosos padrões de qualidade e transparência metodológica."
        buttonText="Baixar Dados"
        buttonHref="/download"
      >
        <div className="bg-white/20 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Estatísticas</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total de entrevistas:</span>
              <strong>50.000+</strong>
            </div>
            <div className="flex justify-between">
              <span>Estados cobertos:</span>
              <strong>27</strong>
            </div>
            <div className="flex justify-between">
              <span>Período:</span>
              <strong>2018-2024</strong>
            </div>
            <div className="flex justify-between">
              <span>Atualizações:</span>
              <strong>Mensais</strong>
            </div>
          </div>
        </div>
      </HeroSection>

      <ContentSection
        title="Conjuntos de Dados Disponíveis"
        items={dadosItems}
      />
    </>
  );
}
