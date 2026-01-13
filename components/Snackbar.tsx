
import React, { useEffect, useState } from 'react';

export type SnackbarType = 'success' | 'info' | 'error';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  isVisible: boolean;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, type, isVisible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender && !isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success': return 'bg-emerald-600 text-white shadow-emerald-200';
      case 'error': return 'bg-rose-600 text-white shadow-rose-200';
      default: return 'bg-slate-900 text-white shadow-slate-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return 'fa-circle-check';
      case 'error': return 'fa-circle-xmark';
      default: return 'fa-circle-info';
    }
  };

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}
      onTransitionEnd={() => !isVisible && setShouldRender(false)}
    >
      <div className={`px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/10 backdrop-blur-md ${getTypeStyles()}`}>
        <i className={`fa-solid ${getIcon()} text-lg`}></i>
        <p className="text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
          {message}
        </p>
        <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};
