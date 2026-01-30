
'use client';

import { Button, Select, SearchableSelect } from "@/src/components";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { graphService } from "@/src/services/graphService";
import { Question } from "@/src/types/question";
import { ProfileAttribute } from "@/src/types/porfileAttributes";
import { Survey } from "@/src/types/survey";
import { ChartApiResponse } from "@/src/types/chart";

interface FiltersProps {
    onChartDataLoaded: (data: ChartApiResponse) => void;
    onLoadingChange: (loading: boolean) => void;
}

export default function Filters({ onChartDataLoaded, onLoadingChange }: FiltersProps) {
    const [selectedSurvey, setSelectedSurvey] = useState<string>('');
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [profileAttributes, setProfileAttributes] = useState<ProfileAttribute[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingChart, setLoadingChart] = useState(false);

    const handleApplyFilters = async () => {
        if (!selectedQuestion) {
            alert('Por favor, selecione uma pergunta.');
            return;
        }

        try {
            setLoadingChart(true);
            onLoadingChange(true);

            const surveyId = selectedSurvey ? parseInt(selectedSurvey) : undefined;
            let chartResponse: ChartApiResponse;
            
            if (selectedFilter) {
                // Se um filtro foi selecionado, busca dados por atributo de perfil
                chartResponse = await graphService.getChartDataByProfileAttribute(selectedQuestion, selectedFilter, surveyId);
            } else {
                // Se não, busca dados gerais da pergunta
                chartResponse = await graphService.getChartData(selectedQuestion, surveyId);
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

    // Carrega surveys e profile attributes uma vez
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [surveysResponse, profileAttributesResponse] = await Promise.all([
                    graphService.getSurveys(),
                    graphService.getProfileAttributes()
                ]);
                
                if (surveysResponse.success) {
                    setSurveys(surveysResponse.data);
                }
                
                if (profileAttributesResponse.success) {
                    setProfileAttributes(profileAttributesResponse.data);
                }
            } catch (error) {
                console.error('Erro ao carregar dados iniciais:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Carrega questions quando survey muda
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                setSelectedQuestion(''); // Reseta a pergunta selecionada
                
                const surveyId = selectedSurvey ? parseInt(selectedSurvey) : undefined;
                const questionsResponse = await graphService.getQuestions(surveyId);
                
                if (questionsResponse.success) {
                    setQuestions(questionsResponse.data);
                }
            } catch (error) {
                console.error('Erro ao carregar perguntas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [selectedSurvey]);

    return (
        <div className="w-full bg-gray-100 rounded-lg">
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-[#3D58F5] rounded flex items-center justify-center">
                        <Image src="/svg/icons/filter_mix.svg" alt="Filtro" width={24} height={24}/>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pesquisa
                        </label>
                        <Select
                            value={selectedSurvey}
                            onChange={setSelectedSurvey}
                            placeholder={loading ? "Carregando..." : "Todas as pesquisas"}
                        >
                            {surveys.map((survey) => (
                                <option key={survey.id} value={survey.id.toString()}>
                                    {survey.description}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pergunta
                        </label>
                        <SearchableSelect
                            options={questions.map((question) => ({
                                value: question.code,
                                label: `${question.code} - ${question.text}`
                            }))}
                            value={selectedQuestion}
                            onChange={setSelectedQuestion}
                            placeholder={loading ? "Carregando..." : "Selecione uma pergunta"}
                            loading={loading}
                            maxDisplayLength={70}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cruzar com
                        </label>
                        <Select
                            value={selectedFilter}
                            onChange={setSelectedFilter}
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
                            disabled={loadingChart || !selectedQuestion}
                        >
                            {loadingChart ? 'Carregando...' : 'Aplicar'}
                        </Button>
                    </div>
                </div>

                {selectedQuestion && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-xs font-medium text-blue-800 mb-1">
                            {selectedSurvey ? 'Pesquisa e pergunta selecionadas:' : 'Pergunta selecionada (todas as pesquisas):'}
                        </p>
                        <p className="text-sm text-blue-700">
                            {selectedSurvey && `${surveys.find(s => s.id.toString() === selectedSurvey)?.name} - `}
                            {selectedQuestion} - {questions.find(q => q.code === selectedQuestion)?.text}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}