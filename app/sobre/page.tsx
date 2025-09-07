import { HeroSection } from '../../components';

export default function Sobre() {
  return (
    <HeroSection
      title="Sobre a VoxDem"
      subtitle="Conheça nossa missão e valores"
      description="A VoxDem é uma iniciativa pioneira que busca democratizar o acesso a dados sobre democracia e legitimidade política no Brasil. Desenvolvida por pesquisadores do INCT ReDem, nossa plataforma oferece análises rigorosas e dados confiáveis para fortalecer a pesquisa acadêmica e o engajamento cidadão."
      buttonText="Ver Metodologia"
      buttonHref="/metodologia"
    >
      <div className="bg-white/20 rounded-lg p-8">
        <h3 className="text-xl font-bold mb-4">Nossa Missão</h3>
        <ul className="space-y-2">
          <li>📊 Democratizar dados sobre democracia</li>
          <li>🔬 Promover pesquisa científica</li>
          <li>🤝 Fomentar engajamento cidadão</li>
          <li>📈 Fortalecer a legitimidade institucional</li>
        </ul>
      </div>
    </HeroSection>
  );
}
