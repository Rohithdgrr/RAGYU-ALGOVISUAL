import React, { useEffect, useRef, useState } from 'react';
import { NodeData, AlgorithmCategory, Algorithm } from '../types.ts';
import { COLORS } from '../constants.ts';
import { LEETCODE_VISUALIZATIONS, LeetCodeVisualizationType } from '../leetcodeVisualizations.ts';
import { LeetCodeProblemVisualizer } from './LeetCodeProblemVisualizer.tsx';

interface LeetCodeVisualizerProps {
  data: NodeData[];
  category: AlgorithmCategory;
  algorithm: Algorithm;
  problemId: string;
  problemNumber: number;
  problemTitle: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  isAnimating: boolean;
  speed: number;
  setSpeed: (speed: number) => void;
  currentStep: string;
  stepHistory: string[];
  onStepForward: () => void;
  onStepBackward: () => void;
  canStepForward: boolean;
  canStepBackward: boolean;
}

export const LeetCodeVisualizer: React.FC<LeetCodeVisualizerProps> = ({
  data,
  category,
  algorithm,
  problemId,
  problemNumber,
  problemTitle,
  difficulty,
  onStart,
  onStop,
  onReset,
  isAnimating,
  speed,
  setSpeed,
  currentStep,
  stepHistory,
  onStepForward,
  onStepBackward,
  canStepForward,
  canStepBackward
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'analysis'>('visual');
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isUsingCustomInput, setIsUsingCustomInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get problem-specific visualization configuration
  const problemConfig = LEETCODE_VISUALIZATIONS[problemId];
  const visualizationType = problemConfig?.type || 'array-bars';
  const visualizationData = isUsingCustomInput && customInput 
    ? JSON.parse(customInput) 
    : (problemConfig?.defaultData || data.map(d => d.value));
  const animationSteps = problemConfig?.animationSteps || [];
  const currentStepIndex = stepHistory.length > 0 ? stepHistory.length - 1 : 0;

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      {/* Problem Header */}
      <div className="px-8 py-6 border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
              <i className="fa-solid fa-code text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl font-black text-slate-900">#{problemNumber}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getDifficultyColor()}`}>
                  {difficulty}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-700">{problemTitle}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Category</div>
            <div className="text-sm font-bold text-slate-600">{category}</div>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="p-8 bg-white">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'visual'
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Visualization
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'analysis'
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-200'
                : 'bg-slate-50 text-slate-600 hover:bg-orange-50'
            }`}
          >
            Deep Analysis
          </button>
        </div>

        {activeTab === 'visual' ? (
          <>
            <div className="relative w-full h-[480px] bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner overflow-hidden mb-6">
              {/* Zoom and Full Screen Controls */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md transition-all shadow-sm"
                  title="Zoom Out"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <button
                  onClick={() => setZoom(1)}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md transition-all shadow-sm"
                  title="Reset Zoom"
                >
                  <span className="text-xs font-bold">{Math.round(zoom * 100)}%</span>
                </button>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md transition-all shadow-sm"
                  title="Zoom In"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md transition-all shadow-sm"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  <i className={`fa-solid ${isFullScreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
                </button>
              </div>
              
              {/* Visualization Container with Zoom */}
              <div 
                ref={containerRef}
                className={`w-full h-full flex items-center justify-center transition-transform duration-200 ${isFullScreen ? 'fixed inset-0 z-[100] bg-white' : ''}`}
                style={{ transform: `scale(${zoom})` }}
              >
                <LeetCodeProblemVisualizer
                  type={visualizationType}
                  data={visualizationData}
                  isAnimating={isAnimating}
                  currentStep={currentStepIndex}
                />
              </div>
            </div>

            {/* Visual Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={isAnimating ? onStop : onStart} className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-slate-200">
                  <i className={`fa-solid ${isAnimating ? 'fa-stop' : 'fa-play'}`}></i>{isAnimating ? 'Stop' : 'Visualize'}
                </button>
                
                <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-2xl">
                  <button 
                    onClick={onStepBackward} 
                    disabled={isAnimating || !canStepBackward} 
                    className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
                    title="Step Backward"
                  >
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </button>
                  <button 
                    onClick={onStepForward} 
                    disabled={isAnimating || !canStepForward} 
                    className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
                    title="Step Forward"
                  >
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                  </button>
                </div>

                <button onClick={onReset} disabled={isAnimating} className="px-5 py-3.5 bg-slate-50 text-slate-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 border border-slate-100 transition-all"><i className="fa-solid fa-rotate-right"></i></button>
                
                <button 
                  onClick={() => setIsUsingCustomInput(!isUsingCustomInput)}
                  className={`px-5 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                    isUsingCustomInput 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl shadow-purple-200' 
                      : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200'
                  }`}
                  title="Custom Input"
                >
                  <i className="fa-solid fa-sliders"></i>
                  {isUsingCustomInput ? 'Custom' : 'Input'}
                </button>
              </div>
              <div className="flex items-center gap-8 w-full sm:w-64 px-2">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-center"><span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Speed</span><span className="text-[10px] font-black text-slate-900 uppercase">{speed}ms</span></div>
                  <input type="range" min="50" max="2000" step="50" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} disabled={isAnimating} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-slate-900" />
                </div>
              </div>
            </div>

            {/* Custom Input Panel */}
            {isUsingCustomInput && (
              <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-[2rem] border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                    <i className="fa-solid fa-sliders text-sm"></i>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-purple-700 font-black">Custom Input</p>
                    <p className="text-purple-600 text-xs font-semibold">Enter your own data for visualization</p>
                  </div>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder={`Enter data as JSON array. Example: [1, 2, 3, 4, 5]`}
                  className="w-full px-4 py-3 bg-white border border-purple-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 placeholder-purple-300 resize-none"
                  rows={3}
                />
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      try {
                        JSON.parse(customInput);
                        setIsUsingCustomInput(true);
                      } catch (e) {
                        alert('Invalid JSON format. Please enter a valid JSON array.');
                      }
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-200"
                  >
                    Apply Input
                  </button>
                  <button
                    onClick={() => {
                      setIsUsingCustomInput(false);
                      setCustomInput('');
                    }}
                    className="px-6 py-2.5 bg-white text-purple-600 border border-purple-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-50 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Algorithm Execution Log */}
            <div className="relative p-6 bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                  <i className="fa-solid fa-list-check text-xs"></i>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-black">Execution Log</p>
                  <p className="text-slate-700 text-xs font-semibold">Step-by-step operations</p>
                </div>
              </div>
              
              {stepHistory.length === 0 ? (
                <div className="py-8 text-center bg-white border border-slate-100 rounded-xl">
                  <p className="text-slate-400 text-xs font-medium">Start visualization to see execution steps</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 rounded-xl px-4 py-3">
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-400 to-transparent"></div>
                    {stepHistory.map((step, idx) => (
                      <div 
                        key={`${step}-${idx}`} 
                        className={`relative flex gap-3 py-3 group transition-all ${
                          idx === 0 ? 'text-slate-900' : 'text-slate-400/70'
                        }`}
                      >
                        <div className={`absolute left-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-black ${
                          idx === 0 
                            ? 'bg-orange-500 border-orange-300 text-white shadow-lg shadow-orange-200' 
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}>
                          {Math.max(stepHistory.length - idx, 1)}
                        </div>
                        <div className="flex-1 ml-5">
                          <p className={`text-xs leading-relaxed font-semibold ${
                            idx === 0 ? 'text-slate-900' : 'text-slate-400'
                          }`}>
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-[2rem] border border-orange-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200">
                <i className="fa-solid fa-brain text-2xl"></i>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Deep Analysis</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">Get AI-powered insights into this LeetCode problem including time complexity, space complexity, and optimization strategies.</p>
            </div>
            
            {/* Complexity Visualizations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Time Complexity Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-clock text-blue-600"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Complexity</div>
                    <div className="text-2xl font-black text-slate-900">{algorithm.complexity.time}</div>
                  </div>
                </div>
                
                {/* Time Complexity Visual */}
                <div className="relative h-32 bg-slate-50 rounded-xl overflow-hidden">
                  <svg viewBox="0 0 300 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="timeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={i * 25 + 10} x2="300" y2={i * 25 + 10} stroke="#e2e8f0" strokeWidth="1"/>
                    ))}
                    
                    {/* Complexity bars */}
                    <rect x="20" y="80" width="40" height="30" fill="url(#timeGradient)" rx="4">
                      <animate attributeName="height" from="0" to="30" dur="0.5s" fill="freeze"/>
                    </rect>
                    <rect x="80" y="55" width="40" height="55" fill="url(#timeGradient)" rx="4">
                      <animate attributeName="height" from="0" to="55" dur="0.7s" fill="freeze"/>
                    </rect>
                    <rect x="140" y="30" width="40" height="80" fill="url(#timeGradient)" rx="4">
                      <animate attributeName="height" from="0" to="80" dur="0.9s" fill="freeze"/>
                    </rect>
                    <rect x="200" y="55" width="40" height="55" fill="url(#timeGradient)" rx="4">
                      <animate attributeName="height" from="0" to="55" dur="0.7s" fill="freeze"/>
                    </rect>
                    <rect x="260" y="80" width="40" height="30" fill="url(#timeGradient)" rx="4">
                      <animate attributeName="height" from="0" to="30" dur="0.5s" fill="freeze"/>
                    </rect>
                    
                    {/* Labels */}
                    <text x="40" y="125" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">n</text>
                    <text x="100" y="125" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">n²</text>
                    <text x="160" y="125" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">n³</text>
                    <text x="220" y="125" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">log n</text>
                    <text x="280" y="125" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">1</text>
                  </svg>
                </div>
              </div>

              {/* Space Complexity Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-memory text-emerald-600"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Space Complexity</div>
                    <div className="text-2xl font-black text-slate-900">{algorithm.complexity.space}</div>
                  </div>
                </div>
                
                {/* Space Complexity Visual */}
                <div className="relative h-32 bg-slate-50 rounded-xl overflow-hidden">
                  <svg viewBox="0 0 300 120" className="w-full h-full">
                    <defs>
                      <linearGradient id="spaceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line key={i} x1="0" y1={i * 25 + 10} x2="300" y2={i * 25 + 10} stroke="#e2e8f0" strokeWidth="1"/>
                    ))}
                    
                    {/* Memory blocks */}
                    <rect x="30" y="70" width="50" height="40" fill="url(#spaceGradient)" rx="4" stroke="#10b981" strokeWidth="2">
                      <animate attributeName="opacity" values="0;1" dur="0.3s" fill="freeze"/>
                    </rect>
                    <rect x="95" y="50" width="50" height="60" fill="url(#spaceGradient)" rx="4" stroke="#10b981" strokeWidth="2">
                      <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
                    </rect>
                    <rect x="160" y="30" width="50" height="80" fill="url(#spaceGradient)" rx="4" stroke="#10b981" strokeWidth="2">
                      <animate attributeName="opacity" values="0;1" dur="0.7s" fill="freeze"/>
                    </rect>
                    <rect x="225" y="55" width="50" height="55" fill="url(#spaceGradient)" rx="4" stroke="#10b981" strokeWidth="2">
                      <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze"/>
                    </rect>
                    
                    {/* Memory labels */}
                    <text x="55" y="95" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">Stack</text>
                    <text x="120" y="85" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">Heap</text>
                    <text x="185" y="75" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">Array</text>
                    <text x="250" y="88" textAnchor="middle" className="text-[8px]" fill="#64748b" fontWeight="600">Tree</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Problem Info and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Problem</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-semibold">Number</span>
                    <span className="text-xs font-bold text-slate-900">#{problemNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-semibold">Difficulty</span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${getDifficultyColor()}`}>
                      {difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Algorithm</div>
                <div className="text-center py-2">
                  <div className="text-sm font-bold text-slate-900">{algorithm.name}</div>
                  <div className="text-[10px] text-slate-500">{algorithm.category}</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Status</div>
                <div className="flex flex-col items-center justify-center py-2">
                  <div className={`w-3 h-3 rounded-full mb-2 ${isAnimating ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                  <span className="text-xs font-bold text-slate-700">{isAnimating ? 'Running' : 'Idle'}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:from-orange-600 hover:to-yellow-600 transition-all">
                Request AI Analysis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-8 py-6 border-t border-slate-50 bg-white">
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs font-bold text-slate-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-bold text-slate-600">Sorted/Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-xs font-bold text-slate-600">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-200"></div>
            <span className="text-xs font-bold text-slate-600">Default</span>
          </div>
        </div>
      </div>
    </div>
  );
};
