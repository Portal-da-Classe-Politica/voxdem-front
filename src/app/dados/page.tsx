'use client';

import { EmptyGraph, Section, BarChart, LoadingSpinner } from '../../components';
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
          <LoadingSpinner />
        </div>
      );
    }

    if (chartData && chartData.success) {
      return (
        <BarChart 
          data={chartData.data.chartData}
          title={`${chartData.data.question.code} - ${chartData.data.question.text}`}
          totalResponses={chartData.data.totalResponses}
        />
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
    <>
      <Section backgroundColor='bg-primary'>
        <div className="flex gap-8">
          <Filters 
            onChartDataLoaded={handleChartDataLoaded}
            onLoadingChange={handleLoadingChange}
          />
          <div className="flex-1">
            {renderChart()}
          </div>
        </div>
      </Section>
    </>
  );
}