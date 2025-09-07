import { HeroSection } from '../../components';

export default function Contato() {
  return (
    <>
      <HeroSection
        title="Contato"
        subtitle="Entre em contato conosco"
        description="Tem dúvidas sobre nossos dados? Precisa de suporte técnico? Quer propor uma parceria de pesquisa? Nossa equipe está pronta para ajudar. Entre em contato através dos canais abaixo."
        buttonText="Enviar Mensagem"
        buttonHref="mailto:contato@voxdem.org"
      >
        <div className="bg-white/20 rounded-lg p-8 space-y-4">
          <div>
            <h4 className="font-bold mb-2">📧 Email</h4>
            <p>contato@voxdem.org</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">📞 Telefone</h4>
            <p>(11) 3456-7890</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">📍 Endereço</h4>
            <p>Instituto Nacional de C&T<br />
            São Paulo, SP</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">🕒 Horário</h4>
            <p>Segunda a Sexta<br />
            9h às 17h</p>
          </div>
        </div>
      </HeroSection>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">Dr. Pesquisador Principal</h3>
                <p className="text-gray-600 mb-2">Coordenador Geral</p>
                <p className="text-sm">pesquisador@voxdem.org</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">Dra. Analista de Dados</h3>
                <p className="text-gray-600 mb-2">Coordenadora Técnica</p>
                <p className="text-sm">dados@voxdem.org</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">Prof. Metodologia</h3>
                <p className="text-gray-600 mb-2">Supervisor Metodológico</p>
                <p className="text-sm">metodologia@voxdem.org</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold mb-2">Suporte Técnico</h3>
                <p className="text-gray-600 mb-2">Equipe de TI</p>
                <p className="text-sm">suporte@voxdem.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
