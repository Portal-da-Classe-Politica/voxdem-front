interface EmptyGraphProps {
    title?: string;
    description?: string;
}

export default function EmptyGraph({
    title = "Personalize os filtros e veja o gráfico atualizado aqui.",
    description = "Selecione uma pesquisa, variável e aplique os filtros para visualizar os dados de transparência democrática."
}: EmptyGraphProps) {
    return (
        <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <div className="text-center p-12">
                <div className="mb-6">
                    <svg className="w-20 h-20 mx-auto text-[#3D58F5]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 12h2V9H7v8zm4 0h2V7h-2v10zm4 0h2V11h-2v6z" />
                    </svg>
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