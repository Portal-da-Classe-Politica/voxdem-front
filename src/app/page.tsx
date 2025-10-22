import Image from "next/image";
import {
  HeroSection,
  ContentSection,
  Partners
} from '../components';

export default function Home() {
  return (
    <>
      <HeroSection
        title={<Image src="/images/logo-voxdem.png" alt="VoxDem" width={300} height={90} />}
        subtitle="Transparência e dados para fortalecer a democracia"
        description="Visualize dados que incluem pesquisas sobre satisfação democrática, tolerância política, comportamento eleitoral, cultura política e legitimidade institucional, com abrangência nacional."
        buttonHref="/dados"
      >
        <div className="relative w-100 h-85">
          <div className="absolute top-0 right-0 bg-white rounded-2xl p-6 w-60 h-40 shadow-xl z-1 overflow-hidden">
            <Image src="/images/graph-1.png" alt="Gráfico de dados sobre democracia" fill className="object-contain" />
          </div>
          <div className="absolute top-0 bottom-0 left-0 m-auto bg-white rounded-2xl p-6 w-60 h-40 shadow-xl z-2 overflow-hidden">
            <Image src="/images/graph-2.png" alt="Visualização de dados políticos" fill className="object-contain" />
          </div>
          <div className="absolute bottom-0 right-0 bg-white rounded-2xl p-6 w-60 h-40 shadow-xl z-1 overflow-hidden">
            <Image src="/images/graph-3.png" alt="Análise estatística de comportamento eleitoral" fill className="object-contain" />
          </div>
        </div>
      </HeroSection>

      <Partners />

      <HeroSection
        title="O que é?"
        description="A VoxDem é uma plataforma digital inovadora que democratiza o acesso a dados sobre democracia e legitimidade política no Brasil. Desenvolvida pelo INCT ReDem, a plataforma oferece acesso público e gratuito a análises descritivas e cruzamentos de dados gerados pelo instituto e instituições parceiras, promovendo transparência científica e engajamento cidadão com pesquisas sobre comportamento político."
        buttonHref="/dados"
      >
        <div className="relative w-120 h-150">
          <div className="absolute top-0 right-0 bg-white rounded-2xl p-6 w-80 h-100 shadow-xl z-1 overflow-hidden">
            <Image src="/images/democracia.jpg" alt="Ilustração sobre democracia" fill className="object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 bg-white rounded-2xl p-6 w-80 h-100 shadow-xl z-2 overflow-hidden">
            <Image src="/images/brasil.jpg" alt="Imagem representativa do Brasil" fill className="object-cover" />
          </div>
        </div>
      </HeroSection>

      <ContentSection />
    </>
  );
}
