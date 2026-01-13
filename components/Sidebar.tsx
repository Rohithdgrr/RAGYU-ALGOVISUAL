
import React, { useState } from 'react';
import { ALGORITHMS } from '../constants.ts';
import { Algorithm, AlgorithmCategory, ViewState } from '../types.ts';
import { LEETCODE_PROBLEMS, LeetCodeProblem } from '../leetcodeData.ts';

interface SidebarProps {
  selectedAlgo: Algorithm;
  setSelectedAlgo: (algo: Algorithm) => void;
  selectedLeetCodeProblem: LeetCodeProblem | null;
  setSelectedLeetCodeProblem: (problem: LeetCodeProblem | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedAlgo,
  setSelectedAlgo,
  selectedLeetCodeProblem,
  setSelectedLeetCodeProblem,
  isOpen,
  setIsOpen,
  currentView,
  setView
}) => {
  const [searchQuery, setSearchQuery] = useState('');
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
      case AlgorithmCategory.HASH_TABLE: return 'fa-hashtag';
      case AlgorithmCategory.HEAP: return 'fa-layer-group';
      default: return 'fa-code';
    }
  };

  const handleSelectAlgo = (algo: Algorithm) => {
    setSelectedAlgo(algo);
    setSelectedLeetCodeProblem(null);
    setView('visual');
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const handleSelectLeetCodeProblem = (problem: LeetCodeProblem) => {
    setSelectedLeetCodeProblem(problem);
    const algorithm = ALGORITHMS.find(a => a.id === problem.algorithmId);
    if (algorithm) {
      setSelectedAlgo(algorithm);
    }
    setView('visual');
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  // Filter algorithms based on search
  const filteredAlgorithms = searchQuery 
    ? ALGORITHMS.filter(algo => 
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ALGORITHMS;

  // Filter LeetCode problems based on search
  const filteredLeetCodeProblems = searchQuery
    ? LEETCODE_PROBLEMS.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.number.toString().includes(searchQuery) ||
        problem.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : LEETCODE_PROBLEMS;

  // Get unique categories from filtered algorithms
  const filteredCategories = searchQuery
    ? [...new Set(filteredAlgorithms.map(a => a.category))]
    : categories;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-[70]
        w-72 bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        h-screen lg:h-[calc(100vh-0px)]
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0 bg-white">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('home'); if (window.innerWidth < 1024) setIsOpen(false); }}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">A</div>
            <h1 className="text-xl font-black tracking-tight">AlgoVisual</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-gray-100 bg-white shrink-0">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs group-hover:text-blue-500 transition-colors duration-200"></i>
            </div>
            <input
              type="text"
              placeholder="Search algorithms & problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400 transition-all duration-200 shadow-sm hover:shadow-md hover:border-gray-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            )}
            <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-inset ring-gray-200 group-hover:ring-blue-200 transition-all duration-200"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4 space-y-6 sm:space-y-8 no-scrollbar">
          {/* Navigation Links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setView('home');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-2 sm:gap-3 group ${
                currentView === 'home' 
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-200 ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:shadow-md'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                currentView === 'home' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
              }`}>
                <i className="fa-solid fa-house text-[10px] sm:text-xs"></i>
              </div>
              <span className="text-[11px] sm:text-sm">Platform Overview</span>
            </button>
            <button
              onClick={() => {
                setView('leetcode');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-2 sm:gap-3 group ${
                currentView === 'leetcode' 
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl shadow-orange-200 ring-1 ring-orange-200' 
                  : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:shadow-md'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                currentView === 'leetcode' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-orange-100 text-orange-500 group-hover:bg-orange-200 group-hover:text-orange-600'
              }`}>
                <i className="fa-solid fa-code text-[10px] sm:text-xs"></i>
              </div>
              <span className="text-[11px] sm:text-sm">LeetCode Problems</span>
            </button>
            <button
              onClick={() => {
                setView('about');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-2 sm:gap-3 group ${
                currentView === 'about' 
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-200 ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:shadow-md'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                currentView === 'about' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
              }`}>
                <i className="fa-solid fa-circle-info text-[10px] sm:text-xs"></i>
              </div>
              <span className="text-[11px] sm:text-sm">About</span>
            </button>
            <button
              onClick={() => {
                setView('compiler');
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-2 sm:gap-3 group ${
                currentView === 'compiler' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl shadow-green-200 ring-1 ring-green-200' 
                  : 'text-slate-500 hover:bg-green-50 hover:text-green-600 border border-transparent hover:shadow-md'
              }`}
            >
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                currentView === 'compiler' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-green-100 text-green-500 group-hover:bg-green-200 group-hover:text-green-600'
              }`}>
                <i className="fa-solid fa-code text-[10px] sm:text-xs"></i>
              </div>
              <span className="text-[11px] sm:text-sm">Online Compiler</span>
            </button>
          </div>

          {/* DSA Categories Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <i className="fa-solid fa-layer-group text-white text-xs"></i>
              </div>
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                DSA Algorithms
              </h2>
              {searchQuery && (
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  {filteredAlgorithms.length}
                </span>
              )}
            </div>
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => {
                const categoryAlgorithms = filteredAlgorithms.filter(a => a.category === category);
                if (categoryAlgorithms.length === 0) return null;
                
                return (
                  <div key={category} className="mb-3 sm:mb-4">
                    <h3 className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2 px-2 sm:px-3">
                      {category}
                    </h3>
                    <div className="space-y-1">
                      {categoryAlgorithms.map(algo => (
                        <button
                          key={algo.id}
                          onClick={() => handleSelectAlgo(algo)}
                          className={`w-full text-left px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 sm:gap-3 group ${
                            selectedAlgo.id === algo.id && currentView === 'visual' && !selectedLeetCodeProblem
                              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-md shadow-blue-100' 
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
                            selectedAlgo.id === algo.id && currentView === 'visual' && !selectedLeetCodeProblem
                              ? 'bg-blue-500 text-white shadow-md' 
                              : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                          }`}>
                            <i className={`fa-solid ${getIcon(algo.category)} text-[10px] sm:text-xs`}></i>
                          </div>
                          <span className="flex-1 truncate text-[11px] sm:text-sm">{algo.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-gray-400 text-xs">
                No algorithms found
              </div>
            )}
          </div>

          {/* LeetCode Problems Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                <i className="fa-solid fa-code text-white text-xs"></i>
              </div>
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                LeetCode Problems
              </h2>
              {searchQuery && (
                <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                  {filteredLeetCodeProblems.length}
                </span>
              )}
            </div>
            {filteredLeetCodeProblems.length > 0 ? (
              <div className="space-y-1">
                {filteredLeetCodeProblems.map(problem => (
                  <button
                    key={problem.id}
                    onClick={() => handleSelectLeetCodeProblem(problem)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-3 group ${
                      selectedLeetCodeProblem?.id === problem.id && currentView === 'visual'
                        ? 'bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 border border-orange-200 shadow-md shadow-orange-100' 
                        : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600 border border-transparent hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0 ${
                      selectedLeetCodeProblem?.id === problem.id && currentView === 'visual'
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600'
                    }`}>
                      <span className="text-[9px] font-black">{problem.number}</span>
                    </div>
                    <span className="truncate flex-1">{problem.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider shrink-0 transition-all duration-200 ${
                      problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                      problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                      'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}>
                      {problem.difficulty.substring(0, 1)}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-search text-gray-400 text-lg"></i>
                </div>
                <p className="text-gray-400 text-xs font-medium">No problems found</p>
                <p className="text-gray-300 text-[10px] mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 shrink-0">
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest text-center">Engineered for Mastery</p>
        </div>
      </aside>
    </>
  );
};
