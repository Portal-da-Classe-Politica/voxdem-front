'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from '@/src/types/chart';
import ChartFilterModal from './ChartFilterModal';
import Image from 'next/image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Data {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }>;
}

interface BarChartProps {
  chartData: ChartData;
  title: string;
  totalResponses: number;
}

export default function BarChart({ chartData, title, totalResponses }: BarChartProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = React.useState(false);
  const [selectedDatasetIndices, setSelectedDatasetIndices] = React.useState<number[]>([]);

  // Função para obter os top 6 datasets por volume de dados
  const getTopDatasets = React.useCallback((data: ChartData, maxDatasets: number = 6) => {
    const datasetDataPairs = data.datasets.map((dataset, index) => ({
      dataset,
      totalData: dataset.data.reduce((sum, value) => sum + value, 0),
      index
    }));

    // Ordena por volume de dados (decrescente) e pega os top N
    return datasetDataPairs
      .sort((a, b) => b.totalData - a.totalData)
      .slice(0, maxDatasets)
      .map(item => item.index);
  }, []);

  // Inicializa os filtros na primeira renderização
  React.useEffect(() => {
    if (selectedDatasetIndices.length === 0) {
      if (chartData.datasets.length > 6) {
        // Aplica filtro automático para mostrar apenas os top 6
        const topDatasets = getTopDatasets(chartData, 6);
        setSelectedDatasetIndices(topDatasets);
      } else {
        // Mostra todos os datasets
        setSelectedDatasetIndices(chartData.datasets.map((_, index) => index));
      }
    }
  }, [chartData, selectedDatasetIndices.length, getTopDatasets]);

  // Filtra os dados baseado nos datasets selecionados
  const filteredData = React.useMemo(() => {
    if (selectedDatasetIndices.length === 0) {
      return chartData;
    }

    return {
      ...chartData,
      datasets: selectedDatasetIndices.map(index => chartData.datasets[index])
    };
  }, [chartData, selectedDatasetIndices]);

  const handleApplyFilters = (newSelectedIndices: number[]) => {
    setSelectedDatasetIndices(newSelectedIndices);
  };

  const getFilterButtonText = () => {
    const totalDatasets = chartData.datasets.length;
    const selectedCount = selectedDatasetIndices.length;
    
    if (selectedCount === totalDatasets) {
      return 'Filtrar';
    }
    
    return `Filtrar (${selectedCount}/${totalDatasets})`;
  };

  const getFilterButtonClass = () => {
    const totalDatasets = chartData.datasets.length;
    const selectedCount = selectedDatasetIndices.length;
    
    if (selectedCount === totalDatasets) {
      return 'text-gray-600 hover:text-gray-800';
    }
    
    return 'text-blue-600 hover:text-blue-800';
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
         display: chartData.datasets.length > 1,
        labels: {
          color: '#333',
          font: {
            size: 12,
            family: 'Montserrat, sans-serif',
          },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: function(context: any) {
            console.log(context);
            return chartData.labelsDetailed[context[0].dataIndex]?.label + (context[0].dataset.label ? ` (${context[0].dataset.label})` : "");
          },
          label: function(context: any) {
            const percentage = ((context.parsed.y / totalResponses) * 100).toFixed(1);
            return `${context.parsed.y} respostas (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 0
        },
        border: {
          display: false
        }
      },
      y: {
        ticks: {
          // stepSize: Math.ceil(Math.max(...chartData.datasets.flatMap(d => d.data)) / 10),
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e5e7eb',
          lineWidth: 1,
          
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 5,
          topRight: 5,
          bottomLeft: 0,
          bottomRight: 0
        },
        borderSkipped: false,
      }
    },
  };

  const data = {
    labels: chartData.labelsDetailed.map((label) => parseInt(label.code) > 100 ? label.label : label.code),
    datasets: filteredData.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      borderWidth: dataset.borderWidth
    }))
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Cabeçalho com título e botão de filtro */}
      <div className={`mb-4 ${chartData.datasets.length > 1 ? 'flex items-start justify-between gap-4' : 'text-center'}`}>
        {/* Título */}
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{title}</h3>
        
        {/* Botão de filtro */}
        {chartData.datasets.length > 1 && (
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex-shrink-0 cursor-pointer ${getFilterButtonClass()}`}
            title="Filtrar labels do gráfico"
          >
            <Image
              src="/svg/icons/filter_mix.svg"
              alt="Filtro"
              width={16}
              height={16}
              className="text-blue-600"
              style={{ filter: 'brightness(0) saturate(100%) invert(25%) sepia(85%) saturate(3151%) hue-rotate(211deg) brightness(96%) contrast(101%)' }}
            />
            {getFilterButtonText()}
          </button>
        )}
      </div>

      {/* Gráfico */}
      <div className="h-120">
        <Bar data={data} options={options} />
      </div>

      {/* Modal de filtro */}
      <ChartFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        allLabels={chartData.datasets.map((dataset, index) => ({ code: index.toString(), label: dataset.label }))}
        selectedLabels={selectedDatasetIndices.map(index => index.toString())}
        onApplyFilters={(selectedLabels) => handleApplyFilters(selectedLabels.map(label => parseInt(label)))}
      />
    </div>
  );
}
