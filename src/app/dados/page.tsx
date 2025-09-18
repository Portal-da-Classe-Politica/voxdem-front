'use client';

import { EmptyGraph, Section, BarChart, DataTable } from '../../components';
import Filters from './components/Filters';
import { useState } from 'react';
import { ChartApiResponse } from '../../types/chart';

export default function Dados() {
  const [chartData, setChartData] = useState<ChartApiResponse | null>(null);
  const [loadingChart, setLoadingChart] = useState(false);

  const handleChartDataLoaded = (data: ChartApiResponse) => {
    setChartData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setLoadingChart(loading);
  };

  const renderChart = () => {
    if (loadingChart) {
      return (
        <div className="flex items-center justify-center h-96">
          Carregando...
        </div>
      );
    }

    if (chartData && chartData.success) {
      return (
        <div className="space-y-6">
          <BarChart 
            chartData={chartData.data.chartData}
            title={`${chartData.data.question.code} - ${chartData.data.question.text}`}
            totalResponses={chartData.data.totalResponses}
          />
          <DataTable
            data={chartData.data.chartData}
            totalResponses={chartData.data.totalResponses}
            questionCode={chartData.data.question.code}
          />
        </div>
      );
    }

    if (chartData && !chartData.success) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Erro ao carregar dados</h3>
            <p className="text-gray-600">{chartData.message}</p>
          </div>
        </div>
      );
    }

    return <EmptyGraph />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Section backgroundColor='bg-primary' fullHeight>
        <div className="space-y-8 min-h-[calc(100vh-200px)] flex flex-col">
          <Filters 
            onChartDataLoaded={handleChartDataLoaded}
            onLoadingChange={handleLoadingChange}
          />
          <div className="w-full flex-1 flex flex-col">
            {renderChart()}
          </div>
        </div>
      </Section>
    </div>
  );
}