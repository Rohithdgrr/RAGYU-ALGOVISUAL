import React, { useState } from 'react';
import { LEETCODE_PROBLEMS, LeetCodeProblem } from '../leetcodeData.ts';

interface LeetCodePageProps {
  onSelectProblem: (problem: LeetCodeProblem) => void;
  onBack: () => void;
}

export const LeetCodePage: React.FC<LeetCodePageProps> = ({ onSelectProblem, onBack }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const difficulties: ('All' | 'Easy' | 'Medium' | 'Hard')[] = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = ['All', ...Array.from(new Set(LEETCODE_PROBLEMS.map(p => p.category)))];

  const filteredProblems = LEETCODE_PROBLEMS.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory;
    return matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-semibold text-sm"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200">
              <i className="fa-solid fa-code text-2xl"></i>
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                LeetCode Problems
              </h1>
              <p className="text-slate-500 text-lg font-medium mt-1">
                Practice & Visualize DSA Algorithms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="font-semibold">{LEETCODE_PROBLEMS.filter(p => p.difficulty === 'Easy').length} Easy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="font-semibold">{LEETCODE_PROBLEMS.filter(p => p.difficulty === 'Medium').length} Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-semibold">{LEETCODE_PROBLEMS.filter(p => p.difficulty === 'Hard').length} Hard</span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="font-semibold">{LEETCODE_PROBLEMS.length} Total Problems</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {difficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                selectedDifficulty === difficulty
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-300'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProblems.map((problem) => (
            <div
              key={problem.id}
              onClick={() => onSelectProblem(problem)}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-slate-300">#{problem.number}</span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {problem.title}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {problem.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {problem.category}
                </span>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <i className="fa-solid fa-external-link-alt"></i>
                  View on LeetCode
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <i className="fa-solid fa-search text-2xl"></i>
            </div>
            <p className="text-slate-500 font-semibold">No problems found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};
