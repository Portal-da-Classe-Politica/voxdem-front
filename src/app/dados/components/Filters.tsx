
'use client';

import { Button, Select, SearchableSelect } from "@/src/components";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { graphService } from "@/src/services/graphService";
import { Question } from "@/src/types/question";
import { ProfileAttribute } from "@/src/types/porfileAttributes";
import { ChartApiResponse } from "@/src/types/chart";

interface FiltersProps {
    onChartDataLoaded: (data: ChartApiResponse) => void;
    onLoadingChange: (loading: boolean) => void;
}

export default function Filters({ onChartDataLoaded, onLoadingChange }: FiltersProps) {
    const [selectedSurvey, setSelectedSurvey] = useState('');
    const [selectedVariable, setSelectedVariable] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [profileAttributes, setProfileAttributes] = useState<ProfileAttribute[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingChart, setLoadingChart] = useState(false);

    const handleApplyFilters = async () => {
        if (!selectedSurvey) {
            alert('Por favor, selecione uma pesquisa survey.');
            return;
        }

        try {
            setLoadingChart(true);
            onLoadingChange(true);

            let chartResponse: ChartApiResponse;
            
            if (selectedVariable) {
                // Se uma variável foi selecionada, busca dados por atributo de perfil
                chartResponse = await graphService.getChartDataByProfileAttribute(selectedSurvey, selectedVariable);
            } else {
                // Se não, busca dados gerais da pergunta
                chartResponse = await graphService.getChartData(selectedSurvey);
            }

            onChartDataLoaded(chartResponse);
        } catch (error) {
            console.error('Erro ao carregar dados do gráfico:', error);
            alert('Erro ao carregar dados do gráfico. Tente novamente.');
        } finally {
            setLoadingChart(false);
            onLoadingChange(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [questionsResponse, profileAttributesResponse] = await Promise.all([
                    graphService.getQuestions(),
                    graphService.getProfileAttributes()
                ]);
                
                if (questionsResponse.success) {
                    setQuestions(questionsResponse.data);
                }
                
                if (profileAttributesResponse.success) {
                    setProfileAttributes(profileAttributesResponse.data);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full bg-gray-100 rounded-lg">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-[#3D58F5] rounded flex items-center justify-center">
                        <Image src="/svg/icons/filter_mix.svg" alt="Filtro" width={24} height={24}/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pergunta survey
                        </label>
                        <SearchableSelect
                            options={questions.map((question) => ({
                                value: question.code,
                                label: `${question.code} - ${question.text}`
                            }))}
                            value={selectedSurvey}
                            onChange={setSelectedSurvey}
                            placeholder={loading ? "Carregando..." : "Selecione uma pesquisa"}
                            loading={loading}
                            maxDisplayLength={70}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cruzar com
                        </label>
                        <Select
                            value={selectedVariable}
                            onChange={setSelectedVariable}
                            placeholder={loading ? "Carregando..." : "Selecione uma opção"}
                        >
                            {profileAttributes.map((attribute) => (
                                <option key={attribute.key} value={attribute.key}>
                                    {attribute.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Button
                            variant="blue"
                            className="w-full"
                            onClick={handleApplyFilters}
                            disabled={loadingChart || !selectedSurvey}
                        >
                            {loadingChart ? 'Carregando...' : 'Aplicar'}
                        </Button>
                    </div>
                </div>

                {selectedSurvey && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-xs font-medium text-blue-800 mb-1">Pesquisa selecionada:</p>
                        <p className="text-sm text-blue-700">
                            {selectedSurvey} - {questions.find(q => q.code === selectedSurvey)?.text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}