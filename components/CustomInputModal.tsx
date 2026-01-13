
import React, { useState, useEffect } from 'react';
import { AlgorithmCategory } from '../types.ts';

interface CustomInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  category: AlgorithmCategory;
}

export const CustomInputModal: React.FC<CustomInputModalProps> = ({ isOpen, onClose, onSubmit, category }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getPlaceholder = () => {
    switch (category) {
      case AlgorithmCategory.STRINGS:
        return "Type your word or sentence here...";
      case AlgorithmCategory.GRAPHS:
        return "Example: 0-1:5, 1-2:10, 2-0:3\n(source-target:weight)";
      case AlgorithmCategory.TREES:
        return "Example: 10, 5, 15, 2, 7\n(Level-order insertion)";
      default:
        return "Example: 12, 45, 7, 23, 56";
    }
  };

  const getHelpText = () => {
    switch (category) {
      case AlgorithmCategory.STRINGS:
        return "Enter any characters you want to process.";
      case AlgorithmCategory.GRAPHS:
        return "Define edges using 'from-to:weight' format separated by commas.";
      case AlgorithmCategory.TREES:
        return "Enter values in level-order. We'll build a binary tree for you.";
      case AlgorithmCategory.DYNAMIC_PROGRAMMING:
        return "Enter values to populate the DP visualization nodes.";
      default:
        return "Enter numbers separated by commas. Max 20 items suggested.";
    }
  };

  const handleApply = () => {
    const rawValue = inputValue.trim();
    if (!rawValue) {
      setError('Input cannot be empty.');
      return;
    }

    if (category === AlgorithmCategory.STRINGS) {
      onSubmit(rawValue);
    } else if (category === AlgorithmCategory.GRAPHS) {
      // Basic validation for graph format: 0-1:5
      const edgeRegex = /^(\w+)-(\w+)(:\d+)?$/;
      const parts = rawValue.split(',').map(s => s.trim());
      const isValid = parts.every(p => edgeRegex.test(p));
      if (!isValid) {
        setError("Invalid graph format. Use 'A-B:5, B-C:10'");
        return;
      }
      onSubmit(rawValue);
    } else {
      const numbers = rawValue
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(Number);

      if (numbers.some(isNaN)) {
        setError('Please enter valid numbers separated by commas.');
        return;
      }

      if (numbers.length > 50) {
        setError('Max 50 items for stable visualization.');
        return;
      }
      onSubmit(numbers);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-10 animate-message">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Custom Data Input</h3>
            <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-widest">{category}</span>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-all">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <p className="text-sm text-slate-500 mb-6 font-medium">
          {getHelpText()}
        </p>

        <textarea
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={getPlaceholder()}
          className="w-full h-40 p-6 bg-slate-50/50 border-2 border-slate-50 rounded-[1.5rem] text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all resize-none placeholder:text-slate-300"
        />

        {error && (
          <p className="text-xs text-rose-500 font-bold mt-4 flex items-center gap-2 animate-pulse">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={onClose}
            className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all"
          >
            Discard
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            Inject Data
          </button>
        </div>
      </div>
    </div>
  );
};
