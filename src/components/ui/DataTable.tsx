'use client';

import React from 'react';
import { ChartData } from '@/src/types/chart';

interface DataTableProps {
  data: ChartData;
  totalResponses: number;
  questionCode: string;
}

export default function DataTable({ data, totalResponses, questionCode }: DataTableProps) {
  // Preparar os dados da tabela combinando labels com valores do primeiro dataset
  const tableData = data.labels.map((label, index) => {
    const value = data.datasets[0]?.data[index] || 0;
    const percentage = totalResponses > 0 ? ((value / totalResponses) * 100).toFixed(1) : '0.0';
    
    return {
      label,
      value,
      percentage: parseFloat(percentage),
      backgroundColor: data.datasets[0]?.backgroundColor[index] || '#3B82F6'
    };
  });

  // Ordenar por valor decrescente
  const sortedData = [...tableData].sort((a, b) => b.value - a.value);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Dados Detalhados - {questionCode}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Total de respostas: <span className="font-medium">{totalResponses.toLocaleString('pt-BR')}</span>
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opção de Resposta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Percentual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Representação Visual
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.label}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-semibold">
                    {item.value.toLocaleString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-semibold">
                    {item.percentage}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="h-4 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: item.backgroundColor,
                        width: `${Math.max(item.percentage * 2, 5)}px`,
                        minWidth: '5px',
                        maxWidth: '200px'
                      }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full ml-2 border-2 border-white shadow-sm"
                      style={{ backgroundColor: item.backgroundColor }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Resumo estatístico */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Maior valor:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {Math.max(...tableData.map(item => item.value)).toLocaleString('pt-BR')} 
              ({Math.max(...tableData.map(item => item.percentage)).toFixed(1)}%)
            </span>
          </div>
          <div>
            <span className="text-gray-600">Menor valor:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {Math.min(...tableData.map(item => item.value)).toLocaleString('pt-BR')} 
              ({Math.min(...tableData.map(item => item.percentage)).toFixed(1)}%)
            </span>
          </div>
          <div>
            <span className="text-gray-600">Opções disponíveis:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {tableData.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
