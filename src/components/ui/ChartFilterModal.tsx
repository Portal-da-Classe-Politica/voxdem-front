'use client';

import React from 'react';
import { LabelsDetailed } from '@/src/types/chart';

interface ChartFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  allLabels: LabelsDetailed[];
  selectedLabels: string[];
  onApplyFilters: (selectedLabels: string[]) => void;
}

export default function ChartFilterModal({
  isOpen,
  onClose,
  allLabels,
  selectedLabels,
  onApplyFilters
}: ChartFilterModalProps) {
  const [tempSelectedLabels, setTempSelectedLabels] = React.useState<string[]>(selectedLabels);

  React.useEffect(() => {
    setTempSelectedLabels(selectedLabels);
  }, [selectedLabels, isOpen]);

  if (!isOpen) return null;

  const handleLabelToggle = (labelCode: string) => {
    setTempSelectedLabels(prev => 
      prev.includes(labelCode)
        ? prev.filter(code => code !== labelCode)
        : [...prev, labelCode]
    );
  };

  const handleSelectAll = () => {
    setTempSelectedLabels(allLabels.map(label => label.code));
  };

  const handleDeselectAll = () => {
    setTempSelectedLabels([]);
  };

  const handleApply = () => {
    onApplyFilters(tempSelectedLabels);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedLabels(selectedLabels);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Filtrar Labels</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              Selecionar Todos
            </button>
            {/* <button
              onClick={handleDeselectAll}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Desmarcar Todos
            </button> */}
          </div>

          {/* Labels list */}
          <div className="max-h-[40vh] overflow-y-auto">
            <div className="space-y-2">
              {allLabels.map((label) => (
                <label
                  key={label.code}
                  className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedLabels.includes(label.code)}
                    onChange={() => handleLabelToggle(label.code)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {label.label}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Aplicar Filtros ({tempSelectedLabels.length})
          </button>
        </div>
        </div>
      </div>
    </>
  );
}