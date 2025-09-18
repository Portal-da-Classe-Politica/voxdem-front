'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';

interface SelectProps {
  label?: string;
  children: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface OptionData {
  value: string;
  label: string;
  disabled?: boolean;
}

export default function Select({ 
  label, 
  children, 
  value, 
  onChange, 
  placeholder = "Selecione uma opção",
  className = '' 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: OptionData[] = [];
  
  const extractOptions = (children: ReactNode): void => {
    if (Array.isArray(children)) {
      children.forEach(child => extractOptions(child));
    } else if (children && typeof children === 'object' && 'props' in children) {
      const child = children as any;
      if (child.type === 'option') {
        options.push({
          value: child.props.value || '',
          label: child.props.children || '',
          disabled: child.props.disabled || false
        });
      }
    }
  };

  extractOptions(children);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const availableOptions = options.filter(option => !option.disabled);

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < availableOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < availableOptions.length) {
          handleSelect(availableOptions[highlightedIndex].value);
        }
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [isOpen]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className={`w-full px-4 py-3 border border-gray-300 rounded-md text-left bg-white focus:outline-none focus:ring-2 focus:ring-[#3D58F5] focus:border-transparent cursor-pointer ${className}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center justify-between gap-3">
            <span className={`block truncate text-sm ${!selectedOption ? 'text-gray-500' : 'text-gray-700'}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className="flex items-center gap-1">
              {selectedOption && (
                <div
                  className="flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={handleClear}
                  role="button"
                  tabIndex={0}
                  aria-label="Limpar seleção"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClear(e as any);
                    }
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <svg 
                className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  Nenhuma opção disponível
                </div>
              ) : (
                options.map((option, index) => {
                  if (option.disabled && option.value === '') {
                    // Skip placeholder options
                    return null;
                  }
                  
                  const availableOptions = options.filter(opt => !opt.disabled);
                  const adjustedIndex = availableOptions.findIndex(opt => opt.value === option.value);
                  
                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                        adjustedIndex === highlightedIndex ? 'bg-gray-100' : ''
                      } ${option.value === value ? 'bg-blue-50 text-[#3D58F5]' : 'text-gray-700'} ${
                        index < options.length - 1 ? 'border-b border-gray-100' : ''
                      } ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                    >
                      <div>
                        {option.label}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
