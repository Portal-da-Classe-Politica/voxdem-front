const leftParagraphs = [
  'O VoxDem foi criado no âmbito do INCT ReDem, projeto financiado pelo CNPq para analisar as causas e consequências da crise democrática no Brasil. O instituto reúne pesquisadores de universidades brasileiras e instituições internacionais que estudam as relações entre os valores dos eleitores, as regras institucionais e o perfil da classe política.',
  'A plataforma reúne dados de surveys conduzidos periodicamente pelo instituto sobre visões da democracia. Os levantamentos cobrem diferentes públicos, com amostras representativas de cidadãos e de elites políticas, e aplicam instrumentos comparáveis para permitir o acompanhamento das tendências ao longo do tempo.',
];

const rightParagraphs = [
  'Os surveys mapeiam satisfação com o funcionamento da democracia, percepções sobre a importância de diferentes aspectos democráticos, posicionamento ideológico e avaliação das instituições políticas. Os instrumentos de coleta e as bases de dados de cada levantamento estão disponíveis na seção Documentação.',
  'O VoxDem permite cruzar variáveis e comparar as respostas de diferentes grupos sobre os mesmos temas. A ferramenta oferece análises descritivas e tipologias de visões democráticas, construídas a partir de escalas validadas pela literatura internacional sobre comportamento político.',
];

export default function SobreOProjeto() {
  return (
    <section className="bg-white text-black py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-[#3D58F5] mb-12 lg:mb-16">
          O Projeto VoxDem
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          <div className="space-y-8">
            {leftParagraphs.map((text, index) => (
              <p key={index} className="text-base lg:text-lg leading-relaxed text-black">
                {text}
              </p>
            ))}
          </div>
          <div className="space-y-8">
            {rightParagraphs.map((text, index) => (
              <p key={index} className="text-base lg:text-lg leading-relaxed text-black">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
