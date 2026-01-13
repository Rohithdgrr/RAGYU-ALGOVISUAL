
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ALGORITHMS, COLORS } from './constants.ts';
import { Algorithm, NodeData, AlgorithmCategory, ViewState } from './types.ts';
import { Visualizer } from './components/Visualizer.tsx';
import { LeetCodeVisualizer } from './components/LeetCodeVisualizer.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { HomePage } from './components/HomePage.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { LeetCodePage } from './components/LeetCodePage.tsx';
import { OnlineCompiler } from './components/OnlineCompiler.tsx';
import { LeetCodeProblem } from './leetcodeData.ts';
import { getAlgorithmDeepDive, chatWithAIStream, AIError } from './services/geminiService.ts';
import { ALGO_REGISTRY } from './algorithms/registry.ts';
import { Snackbar, SnackbarType } from './components/Snackbar.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface HistoryState {
  data: NodeData[];
  step: string;
}

const CodeBlock = ({ children, className }: { children: any; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace('language-', '') : 'code';
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 flex flex-col group">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'} text-[10px]`}></i>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="relative">
        <pre className="p-4 overflow-x-auto custom-scroll text-[13px] leading-relaxed font-mono text-slate-300 selection:bg-blue-500/30">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-slate prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm as any]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            return !inline ? (
              <CodeBlock className={className}>{children}</CodeBlock>
            ) : (
              <code className={className} {...props}>{children}</code>
            );
          },
          li: ({ children }) => <li className="mb-2 leading-relaxed">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-black mb-4 mt-6 text-slate-900">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-black mb-3 mt-5 text-slate-800">{children}</h2>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>(ALGORITHMS[0]);
  const [selectedLeetCodeProblem, setSelectedLeetCodeProblem] = useState<LeetCodeProblem | null>(null);
  const [data, setData] = useState<NodeData[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const isCancelledRef = useRef<boolean>(false);
  const [speed, setSpeed] = useState(400);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('Ready to visualize');
  const [stepHistory, setStepHistory] = useState<string[]>([]);
  
  // Navigation History
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{message: string, type: SnackbarType, visible: boolean}>({
    message: '',
    type: 'info',
    visible: false
  });

  const triggerSnackbar = (message: string, type: SnackbarType = 'info') => {
    setSnackbar({ message, type, visible: true });
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  const resetData = useCallback(() => {
    isCancelledRef.current = true;
    setIsAnimating(false);
    setCurrentStep('Visualization reset');
    setStepHistory([]);
    setHistory([]);
    setHistoryIndex(-1);
    
    const cat = selectedAlgo.category;
    const id = selectedAlgo.id;

    let initialData: NodeData[] = [];

    if (cat === AlgorithmCategory.GEOMETRY) {
      initialData = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        value: i,
        color: COLORS.DEFAULT,
        x: Math.random() * 600 + 100,
        y: Math.random() * 250 + 75
      }));
    } else if (cat === AlgorithmCategory.MATHEMATICS) {
      const count = 50;
      initialData = Array.from({ length: count }, (_, i) => ({
        id: i,
        value: i + 1,
        color: COLORS.DEFAULT
      }));
    } else if (cat === AlgorithmCategory.GRAPHS || cat === AlgorithmCategory.ADVANCED_DS) {
      initialData = [
        { id: 0, value: 'A', color: COLORS.DEFAULT, neighbors: [{ id: 1, weight: 4 }, { id: 2, weight: 2 }] },
        { id: 1, value: 'B', color: COLORS.DEFAULT, neighbors: [{ id: 2, weight: 5 }, { id: 3, weight: 10 }] },
        { id: 2, value: 'C', color: COLORS.DEFAULT, neighbors: [{ id: 4, weight: 3 }] },
        { id: 3, value: 'D', color: COLORS.DEFAULT, neighbors: [{ id: 4, weight: 4 }] },
        { id: 4, value: 'E', color: COLORS.DEFAULT, neighbors: [] },
      ];
    } else if (cat === AlgorithmCategory.DYNAMIC_PROGRAMMING || id === 'n-queens') {
      const size = id === 'n-queens' ? 4 : 5;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          initialData.push({ id: `${r}-${c}`, value: 0, color: COLORS.DEFAULT, row: r, col: c });
        }
      }
    } else if (cat === AlgorithmCategory.LINKED_LIST) {
      const count = 7;
      initialData = Array.from({ length: count }, (_, i) => ({
        id: i,
        value: Math.floor(Math.random() * 90) + 10,
        color: COLORS.DEFAULT,
        neighbors: i < count - 1 ? [{ id: i + 1 }] : []
      }));
      
      if (id === 'detect-cycle') {
        initialData[initialData.length - 1].neighbors = [{ id: 2 }];
      } else if (id === 'merge-sorted-lists') {
        const list1 = [10, 30, 50, 70].map((v, i) => ({ id: `L1-${i}`, value: v, color: COLORS.DEFAULT, neighbors: i < 3 ? [{ id: `L1-${i+1}` }] : [] }));
        const list2 = [20, 40, 60].map((v, i) => ({ id: `L2-${i}`, value: v, color: COLORS.DEFAULT, neighbors: i < 2 ? [{ id: `L2-${i+1}` }] : [] }));
        initialData = [...list1, ...list2];
      } else if (id === 'palindrome-list') {
        const values = [1, 2, 3, 2, 1];
        initialData = values.map((v, i) => ({ id: i, value: v, color: COLORS.DEFAULT, neighbors: i < values.length - 1 ? [{ id: i + 1 }] : [] }));
      }
    } else if (cat === AlgorithmCategory.STRINGS) {
      const text = "ALGORITHMS";
      initialData = text.split('').map((char, i) => ({
        id: i,
        value: char,
        color: COLORS.DEFAULT
      }));
    } else if (cat === AlgorithmCategory.TREES) {
      const treeValues = [50, 30, 70, 20, 40, 60, 80];
      initialData = treeValues.map((v, i) => ({
        id: i,
        value: v,
        color: COLORS.DEFAULT,
        neighbors: []
      }));

      // Build binary tree structure: parent at index i has children at 2i+1 and 2i+2
      for (let i = 0; i < initialData.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < initialData.length) {
          initialData[i].neighbors!.push({ id: initialData[left].id });
        }
        if (right < initialData.length) {
          initialData[i].neighbors!.push({ id: initialData[right].id });
        }
      }
    } else {
      const count = window.innerWidth < 640 ? 8 : 12;
      const isSorted = id === 'binary-search';
      initialData = Array.from({ length: count }, (_, i) => ({
        id: i,
        value: Math.floor(Math.random() * 80) + 10,
        color: COLORS.DEFAULT
      }));
      if (isSorted) initialData.sort((a, b) => Number(a.value) - Number(b.value));
    }
    
    setData(initialData);
    setHistory([{ data: JSON.parse(JSON.stringify(initialData)), step: 'Initial state' }]);
    setHistoryIndex(0);
    
    setTimeout(() => { isCancelledRef.current = false; }, 50);
  }, [selectedAlgo]);

  useEffect(() => {
    if (view !== 'home' && view !== 'about') {
      resetData();
      setChatHistory([]);
      setIsGenerating(false);
    }
  }, [selectedAlgo, resetData, view]);

  useEffect(() => {
    if (selectedLeetCodeProblem) {
      resetData();
      setChatHistory([]);
      setIsGenerating(false);
      triggerSnackbar(`Loaded LeetCode problem: ${selectedLeetCodeProblem.title}`, 'info');
    }
  }, [selectedLeetCodeProblem]);

  const updateStep = (step: string) => {
    setCurrentStep(step);
    setStepHistory(prev => [step, ...prev].slice(0, 5));
  };

  const recordState = useCallback((newData: NodeData[], currentStepStr: string) => {
    setHistory(prev => {
      const newHistory = [...prev, { data: JSON.parse(JSON.stringify(newData)), step: currentStepStr }];
      setHistoryIndex(newHistory.length - 1);
      return newHistory;
    });
  }, []);

  const startAnimation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStepHistory([]);
    setHistory([]);
    setHistoryIndex(-1);
    isCancelledRef.current = false;
    triggerSnackbar(`${selectedAlgo.name} started`, 'info');

    // Initial record
    const initialSnapshot = JSON.parse(JSON.stringify(data));
    setHistory([{ data: initialSnapshot, step: 'Starting algorithm...' }]);
    setHistoryIndex(0);

    const runner = ALGO_REGISTRY[selectedAlgo.id];

    const wrappedSetData = (newData: NodeData[]) => {
      setData(newData);
      setHistory(prev => {
        const lastStep = prev.length > 0 ? prev[prev.length - 1].step : 'Processing...';
        return [...prev, { data: JSON.parse(JSON.stringify(newData)), step: lastStep }];
      });
      setHistoryIndex(prev => prev + 1);
    };

    const wrappedSetStep = (step: string) => {
      updateStep(step);
      setHistory(prev => {
        if (prev.length === 0) return [{ data: JSON.parse(JSON.stringify(data)), step }];
        const last = prev[prev.length - 1];
        return [...prev, { data: last.data, step }];
      });
      setHistoryIndex(prev => prev + 1);
    };

    if (runner) {
      try {
        await runner(data, wrappedSetData, speed, () => isCancelledRef.current, wrappedSetStep);
        if (!isCancelledRef.current) {
          wrappedSetStep('Algorithm completed');
          triggerSnackbar(`${selectedAlgo.name} completed successfully`, 'success');
        }
      } catch (error) {
        console.error('Algorithm execution error:', error);
        isCancelledRef.current = true;
        setIsAnimating(false);
        
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unknown error occurred during algorithm execution';
        
        wrappedSetStep(`Error: ${errorMessage}`);
        triggerSnackbar(`${selectedAlgo.name} failed: ${errorMessage}`, 'error');
        
        setStepHistory(prev => [...prev, `Error: ${errorMessage}`]);
      } finally {
        if (!isCancelledRef.current) {
          setIsAnimating(false);
        }
      }
    } else {
      triggerSnackbar(`Algorithm '${selectedAlgo.id}' not found`, 'error');
    }
  };

  const stopAnimation = () => {
    if (!isAnimating) return;
    isCancelledRef.current = true;
    setIsAnimating(false);
    triggerSnackbar(`${selectedAlgo.name} stopped`, 'info');
  };

  const handleCustomData = (input: any) => {
    try {
      const cat = selectedAlgo.category;
      const id = selectedAlgo.id;
      let customData: NodeData[] = [];

      // Validate input
      if (input === null || input === undefined) {
        throw new Error('Input cannot be null or undefined');
      }

      if (cat === AlgorithmCategory.STRINGS) {
        const text = String(input);
        if (text.length === 0) {
          throw new Error('String cannot be empty');
        }
        if (text.length > 100) {
          throw new Error('String too long (max 100 characters)');
        }
        customData = text.split('').map((char, i) => ({
          id: i,
          value: char,
          color: COLORS.DEFAULT
        }));
        triggerSnackbar(`Injected string: "${text.substring(0, 10)}..."`, 'success');
      } else if (cat === AlgorithmCategory.GRAPHS) {
        const edgesRaw = String(input).split(',').map(s => s.trim()).filter(s => s.length > 0);
        if (edgesRaw.length === 0) {
          throw new Error('No edges provided. Format: "A-B:1, B-C:2"');
        }
        const nodeSet = new Set<string>();
        const parsedEdges: { from: string, to: string, weight: number }[] = [];

        edgesRaw.forEach(edgeStr => {
          const [nodes, weight] = edgeStr.split(':');
          if (!nodes) return;
          const [from, to] = nodes.split('-');
          if (!from || !to) return;
          nodeSet.add(from);
          nodeSet.add(to);
          parsedEdges.push({ from, to, weight: weight ? parseInt(weight) : 1 });
        });

        if (nodeSet.size === 0) {
          throw new Error('No valid nodes found in input');
        }

        customData = Array.from(nodeSet).map(val => ({
          id: val,
          value: val,
          color: COLORS.DEFAULT,
          neighbors: parsedEdges
            .filter(e => e.from === val)
            .map(e => ({ id: e.to, weight: e.weight }))
        }));
        triggerSnackbar(`Constructed graph with ${customData.length} nodes`, 'success');
      } else if (cat === AlgorithmCategory.TREES) {
        if (!Array.isArray(input)) {
          throw new Error('Input must be an array for tree algorithms');
        }
        if (input.length === 0) {
          throw new Error('Array cannot be empty');
        }
        if (input.length > 31) {
          throw new Error('Tree too large (max 31 nodes)');
        }
        customData = input.map((v, i) => ({
          id: i,
          value: v,
          color: COLORS.DEFAULT,
          neighbors: []
        }));

      for (let i = 0; i < customData.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < customData.length) customData[i].neighbors!.push({ id: customData[left].id });
        if (right < customData.length) customData[i].neighbors!.push({ id: customData[right].id });
      }
      triggerSnackbar(`Built binary tree from ${customData.length} values`, 'success');
    } else if (cat === AlgorithmCategory.LINKED_LIST) {
      if (!Array.isArray(input)) {
        throw new Error('Input must be an array for linked list algorithms');
      }
      if (input.length === 0) {
        throw new Error('Array cannot be empty');
      }
      if (input.length > 20) {
        throw new Error('Linked list too large (max 20 nodes)');
      }
      const nums = input as number[];
      customData = nums.map((v, i) => ({
        id: i,
        value: v,
        color: COLORS.DEFAULT,
        neighbors: i < nums.length - 1 ? [{ id: i + 1 }] : []
      }));
      triggerSnackbar(`Created Linked List with ${nums.length} nodes`, 'success');
    } else {
      if (!Array.isArray(input)) {
        throw new Error('Input must be an array');
      }
      if (input.length === 0) {
        throw new Error('Array cannot be empty');
      }
      if (input.length > 50) {
        throw new Error('Array too large (max 50 elements)');
      }
      const nums = input as number[];
      customData = nums.map((v, i) => ({
        id: i,
        value: v,
        color: COLORS.DEFAULT
      }));
      if (id === 'binary-search') customData.sort((a, b) => Number(a.value) - Number(b.value));
      triggerSnackbar(`Loaded ${nums.length} items into workspace`, 'success');
    }

    setData(customData);
    setHistory([{ data: JSON.parse(JSON.stringify(customData)), step: 'Custom data injected' }]);
    setHistoryIndex(0);
    } catch (error) {
      console.error('Custom data error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to process custom data';
      triggerSnackbar(errorMessage, 'error');
    }
  };

  const handleStepForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setData(history[nextIdx].data);
      setCurrentStep(history[nextIdx].step);
    }
  };

  const handleStepBackward = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setData(history[prevIdx].data);
      setCurrentStep(history[prevIdx].step);
    }
  };

  const handleFetchInsights = async () => {
    setLoadingInsights(true);
    setAiError(null);
    setChatHistory([{ role: 'model', text: '' }]);
    try {
      const stream = await getAlgorithmDeepDive(selectedAlgo.name, data);
      let fullResponseText = '';
      for await (const chunk of stream) {
        fullResponseText += chunk;
        setChatHistory([{ role: 'model', text: fullResponseText }]);
      }
    } catch (error: any) {
      setAiError(error.message);
      setChatHistory(prev => {
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[0].role === 'model') {
           newHistory[0].text = `Error: ${error.message}`;
        } else {
           newHistory.push({ role: 'model', text: `Error: ${error.message}` });
        }
        return newHistory;
      });
    } finally {
      setLoadingInsights(false);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isGenerating) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setAiError(null);
    setIsGenerating(true);

    const newUserMessage: ChatMessage = { role: 'user', text: userMsg };
    setChatHistory(prev => [...prev, newUserMessage]);

    try {
      const apiHistory = chatHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await chatWithAIStream(selectedAlgo.name, data, userMsg, apiHistory);
      setChatHistory(prev => [...prev, { role: 'model', text: '' }]);

      let fullResponseText = '';
      for await (const chunk of stream) {
        fullResponseText += chunk;
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: 'model', text: fullResponseText };
          return newHistory;
        });
      }
    } catch (error: any) {
      setAiError(error.message);
      setChatHistory(prev => [...prev, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAlgo = (algo: Algorithm) => {
    setSelectedAlgo(algo);
    if (view === 'home' || view === 'about') setView('visual');
  };

  const handleSelectLeetCodeProblem = (problem: LeetCodeProblem) => {
    setSelectedLeetCodeProblem(problem);
    const algorithm = ALGORITHMS.find(a => a.id === problem.algorithmId);
    if (algorithm) {
      setSelectedAlgo(algorithm);
      setView('visual');
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomePage onGetStarted={() => setView('visual')} />;
      case 'about':
        return <AboutPage />;
      case 'leetcode':
        return <LeetCodePage onSelectProblem={handleSelectLeetCodeProblem} onBack={() => setView('home')} />;
      case 'compiler':
        return <OnlineCompiler />;
      default:
        return (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            {selectedLeetCodeProblem && (
              <div className="p-6 sm:p-10 border-b border-slate-50 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-orange-400">#{selectedLeetCodeProblem.number}</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selectedLeetCodeProblem.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      selectedLeetCodeProblem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                      selectedLeetCodeProblem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedLeetCodeProblem.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">{selectedLeetCodeProblem.description}</p>
                  <div className="flex items-center gap-4">
                    <a
                      href={selectedLeetCodeProblem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-orange-700 transition-colors"
                    >
                      <i className="fa-solid fa-external-link-alt"></i>
                      View on LeetCode
                    </a>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Algorithm: {selectedAlgo.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className={`p-6 sm:p-10 border-b border-slate-50 ${selectedLeetCodeProblem ? 'pt-4' : ''}`}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedAlgo.category}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{selectedAlgo.complexity.time} Time</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{selectedAlgo.name}</h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">{selectedAlgo.description}</p>
              </div>
            </div>
            <div className="flex px-6 sm:px-10 border-b border-slate-100 bg-white sticky top-0 z-20">
              <button onClick={() => setView('visual')} className={`px-6 py-5 text-xs font-black uppercase tracking-widest transition-all relative ${view === 'visual' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>Visualization {view === 'visual' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full shadow-lg shadow-blue-400"></div>}</button>
              <button onClick={() => setView('complexity')} className={`px-6 py-5 text-xs font-black uppercase tracking-widest transition-all relative ${view === 'complexity' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>Deep Analysis {view === 'complexity' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full shadow-lg shadow-blue-400"></div>}</button>
            </div>
            <div className="p-4 sm:p-10">
              {selectedLeetCodeProblem ? (
                <LeetCodeVisualizer
                  data={data}
                  category={selectedAlgo.category}
                  algorithm={selectedAlgo}
                  problemId={selectedLeetCodeProblem.id}
                  problemNumber={selectedLeetCodeProblem.number}
                  problemTitle={selectedLeetCodeProblem.title}
                  difficulty={selectedLeetCodeProblem.difficulty}
                  onStart={startAnimation}
                  onStop={stopAnimation}
                  onReset={resetData}
                  isAnimating={isAnimating}
                  speed={speed}
                  setSpeed={setSpeed}
                  currentStep={currentStep}
                  stepHistory={stepHistory}
                  onStepForward={handleStepForward}
                  onStepBackward={handleStepBackward}
                  canStepForward={!isAnimating && historyIndex < history.length - 1}
                  canStepBackward={!isAnimating && historyIndex > 0}
                />
              ) : view === 'visual' ? (
                <Visualizer
                  data={data}
                  category={selectedAlgo.category}
                  onStart={startAnimation}
                  onStop={stopAnimation}
                  onReset={resetData}
                  onCustomData={handleCustomData}
                  isAnimating={isAnimating}
                  speed={speed}
                  setSpeed={setSpeed}
                  currentStep={currentStep}
                  stepHistory={stepHistory}
                  onStepForward={handleStepForward}
                  onStepBackward={handleStepBackward}
                  canStepForward={!isAnimating && historyIndex < history.length - 1}
                  canStepBackward={!isAnimating && historyIndex > 0}
                />
              ) : (
                <div className="space-y-8 animate-message">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Performance</h4><div className="space-y-4"><div className="flex justify-between items-center text-sm"><span className="text-slate-500 font-bold">Complexity</span><span className="font-bold text-blue-600 font-mono bg-blue-50 px-3 py-1 rounded-lg">{selectedAlgo.complexity.time}</span></div></div></div>
                     <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between"><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Memory</h4><div className="flex flex-col items-center justify-center flex-1"><span className="text-6xl font-black text-slate-900 font-mono tracking-tighter">{selectedAlgo.complexity.space}</span></div></div>
                  </div>
                  {aiError && (
                    <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {aiError}
                    </div>
                  )}
                  <div className="bg-slate-50/50 p-6 sm:p-8 rounded-[2rem] border border-slate-100">
                      {chatHistory.length === 0 && !loadingInsights ? (
                          <div className="py-12 flex flex-col items-center justify-center text-center"><div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-600 mb-6 shadow-xl shadow-blue-100"><i className="fa-solid fa-brain text-2xl"></i></div><h5 className="font-black text-slate-900 mb-2">Technical Deep Dive</h5><p className="text-sm text-slate-400 mb-8 max-w-xs font-medium">Request a full analysis including pros, cons, and optimization techniques.</p><button onClick={handleFetchInsights} className="px-10 py-4 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">Analyze Algorithm</button></div>
                      ) : (
                        <div className="flex flex-col gap-8 h-[600px]">
                          <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scroll pb-10">
                            {chatHistory.map((m, i) => (
                              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-message`} style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className={`
                                  max-w-full sm:max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed
                                  ${m.role === 'user' 
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 rounded-tr-none ml-6' 
                                    : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none mr-6'}
                                `}>
                                  <MarkdownRenderer content={m.text || 'Thinking...'} />
                                </div>
                              </div>
                            ))}
                            {(loadingInsights || isGenerating) && (
                              <div className="flex justify-start animate-message">
                                <div className="bg-white px-6 py-4 rounded-full border border-slate-100 shadow-sm flex items-center gap-3">
                                  <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                                  </div>
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generating Insights...</span>
                                </div>
                              </div>
                            )}
                            <div ref={chatEndRef}></div>
                          </div>
                          <form onSubmit={e => { e.preventDefault(); handleSendChatMessage(); }} className="relative mt-auto">
                            <input 
                              type="text" 
                              value={chatInput} 
                              onChange={e => setChatInput(e.target.value)} 
                              placeholder="Ask about specific steps or optimizations..." 
                              className="w-full pl-8 pr-32 py-5 bg-white border-2 border-slate-50 rounded-full text-sm font-bold shadow-2xl shadow-slate-200/40 focus:outline-none focus:border-blue-600 transition-all"
                            />
                            <button 
                              type="submit" 
                              className={`absolute right-2 top-2 bottom-2 px-8 rounded-full text-[10px] font-black uppercase tracking-widest ${isGenerating || loadingInsights ? 'bg-rose-600 shadow-rose-100' : 'bg-blue-600 shadow-blue-100'} text-white transition-all shadow-xl hover:scale-105 active:scale-95`}
                            >
                              {isGenerating || loadingInsights ? 'Stop' : 'Send'}
                            </button>
                          </form>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary onError={(error) => {
      console.error('Application error:', error);
      setSnackbar({
        message: `Application error: ${error.message}`,
        type: 'error',
        visible: true
      });
    }}>
      <div className="flex h-screen bg-white text-slate-900 overflow-hidden font-sans">
        <Sidebar 
          selectedAlgo={selectedAlgo} 
          setSelectedAlgo={handleSelectAlgo}
          selectedLeetCodeProblem={selectedLeetCodeProblem}
          setSelectedLeetCodeProblem={setSelectedLeetCodeProblem}
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          currentView={view}
          setView={setView}
        />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <header className="h-16 flex lg:hidden items-center justify-between px-4 border-b border-slate-100 bg-white z-10 shrink-0">
            <button onClick={() => setIsSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-xl transition-all"><i className="fa-solid fa-bars-staggered text-lg"></i></button>
            <div onClick={() => setView('home')} className="flex items-center gap-2 font-black tracking-tight text-blue-600 italic cursor-pointer">AlgoVisual</div>
            <div className="w-10"></div>
          </header>
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            <div className="max-w-5xl mx-auto px-4 py-6 lg:px-10">
              {renderContent()}
            </div>
          </main>
        </div>

        <Snackbar 
          message={snackbar.message} 
          type={snackbar.type} 
          isVisible={snackbar.visible} 
          onClose={() => setSnackbar(prev => ({ ...prev, visible: false }))} 
        />
      </div>
    </ErrorBoundary>
  );
};
