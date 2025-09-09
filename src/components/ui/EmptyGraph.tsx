import Image from 'next/image';

interface EmptyGraphProps {
    title?: string;
    description?: string;
}

export default function EmptyGraph({
    title = "Personalize os filtros e veja o gráfico atualizado aqui.",
    description = "Selecione uma pesquisa, variável e aplique os filtros para visualizar os dados de transparência democrática."
}: EmptyGraphProps) {
    return (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <div className="text-center p-12">
                <div className="mb-6">
                    <Image src="/svg/icons/area_chart.svg" alt="Gráfico vazio" width={80} height={80} className="mx-auto text-[#3D58F5]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {title}
                </h3>
                <p className="text-gray-600">
                    {description}
                </p>
            </div>
        </div>
    );
}