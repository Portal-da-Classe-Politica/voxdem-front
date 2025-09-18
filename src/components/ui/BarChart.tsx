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
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
          family: 'Montserrat, sans-serif',
        },
        padding: {
          top: 10,
          bottom: 30
        },
        color: '#1f2937'
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
            return chartData.labelsDetailed[context[0].dataIndex]?.label || '';
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
          stepSize: Math.ceil(Math.max(...chartData.datasets.flatMap(d => d.data)) / 10),
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
    datasets: chartData.datasets.map((dataset, index) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      borderWidth: dataset.borderWidth
    }))
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="h-120">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
