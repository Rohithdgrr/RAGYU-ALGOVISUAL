
import React from 'react';
import { ALGORITHMS } from '../constants.ts';
import { Algorithm, AlgorithmCategory, ViewState } from '../types.ts';

interface SidebarProps {
  selectedAlgo: Algorithm;
  setSelectedAlgo: (algo: Algorithm) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedAlgo,
  setSelectedAlgo,
  isOpen,
  setIsOpen,
  currentView,
  setView
}) => {
  const categories = Object.values(AlgorithmCategory);

  const getIcon = (cat: AlgorithmCategory) => {
    switch (cat) {
      case AlgorithmCategory.SORTING: return 'fa-arrow-down-wide-short';
      case AlgorithmCategory.SEARCHING: return 'fa-magnifying-glass';
      case AlgorithmCategory.GRAPHS: return 'fa-diagram-project';
      case AlgorithmCategory.DYNAMIC_PROGRAMMING: return 'fa-table-cells';
      case AlgorithmCategory.BACKTRACKING: return 'fa-chess-board';
      case AlgorithmCategory.STRINGS: return 'fa-quote-left';
      case AlgorithmCategory.ADVANCED_DS: return 'fa-tree';
      case AlgorithmCategory.GEOMETRY: return 'fa-shapes';
      case AlgorithmCategory.MATHEMATICS: return 'fa-calculator';
      case AlgorithmCategory.GREEDY: return 'fa-coins';
      default: return 'fa-code';
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-[70]
        w-72 bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); if (window.innerWidth < 1024) setIsOpen(false); }}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">A</div>
            <h1 className="text-xl font-black tracking-tight">AlgoVisual</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 no-scrollbar">
          {/* Navigation Links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setView('home');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-3 ${
                currentView === 'home' 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-house w-4"></i>
              Platform Overview
            </button>
            <button
              onClick={() => {
                setView('about');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-3 rounded-xl text-sm font-black transition-all flex items-center gap-3 ${
                currentView === 'about' 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-user-astronaut w-4"></i>
              About & Feedback
            </button>
          </div>

          {categories.map(category => (
            <div key={category}>
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">
                {category}
              </h2>
              <div className="space-y-1">
                {ALGORITHMS.filter(a => a.category === category).map(algo => (
                  <button
                    key={algo.id}
                    onClick={() => {
                      setSelectedAlgo(algo);
                      if (window.innerWidth < 1024) setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${
                      selectedAlgo.id === algo.id && currentView !== 'home' && currentView !== 'about'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                  >
                    <i className={`fa-solid ${getIcon(algo.category)} w-4 opacity-70`}></i>
                    {algo.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100 shrink-0">
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest text-center">Engineered for Mastery</p>
        </div>
      </aside>
    </>
  );
};
