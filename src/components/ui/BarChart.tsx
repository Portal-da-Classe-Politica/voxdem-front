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

interface BarChartProps {
  data: ChartData;
  title: string;
  totalResponses: number;
}

export default function BarChart({ data, title, totalResponses }: BarChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const percentage = ((context.parsed.y / totalResponses) * 100).toFixed(1);
            return `${percentage}% do total`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      }
    }
  };

  return (
    <div className="w-full h-96">
      <Bar data={data} options={options} />
    </div>
  );
}
