
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  select, 
  line as d3Line, 
  forceSimulation, 
  forceLink, 
  forceManyBody, 
  forceCenter, 
  forceCollide, 
  scaleBand, 
  scaleLinear, 
  max,
  tree as d3Tree,
  hierarchy as d3Hierarchy,
  linkVertical,
  linkRadial
} from 'd3';
import { NodeData, AlgorithmCategory } from '../types.ts';
import { CustomInputModal } from './CustomInputModal.tsx';
import { ShareButton } from './ShareButton.tsx';

interface VisualizerProps {
  data: NodeData[];
  category: AlgorithmCategory;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onCustomData: (numbers: any) => void;
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

type StructureLayout = 'default' | 'alternative';

export const Visualizer: React.FC<VisualizerProps> = ({
  data,
  category,
  onStart,
  onStop,
  onReset,
  onCustomData,
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
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [layout, setLayout] = useState<StructureLayout>('default');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const width = 800;
  const height = 400;
  const padding = 60;

  const links = useMemo(() => {
    const result: any[] = [];
    data.forEach(node => {
      if (node.neighbors) {
        node.neighbors.forEach(neighbor => {
          const target = data.find(n => n.id === neighbor.id);
          if (target) {
            result.push({ source: node.id, target: neighbor.id, weight: neighbor.weight });
          }
        });
      }
    });
    return result;
  }, [data]);

  const toggleLayout = () => {
    setLayout(prev => prev === 'default' ? 'alternative' : 'default');
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('class', 'main-content')
      .attr('transform', `translate(${width / 2}, ${height / 2}) scale(${zoom}) translate(${-width / 2}, ${-height / 2})`);

    // --- TREES SPECIAL HANDLING ---
    if (category === AlgorithmCategory.TREES || (category === AlgorithmCategory.ADVANCED_DS && data.length > 0 && !data[0].x)) {
      const root = d3Hierarchy(data[0], d => {
        return data.filter(n => data.find(parent => parent.id === n.id && parent.neighbors?.some(nb => nb.id === n.id)));
      });

      if (layout === 'alternative') {
        const treeLayout = d3Tree().size([2 * Math.PI, Math.min(width, height) / 2 - padding]);
        treeLayout(root as any);
        const linkGen = linkRadial().angle((d: any) => d.x).radius((d: any) => d.y);
        g.append('g').attr('transform', `translate(${width/2}, ${height/2})`).selectAll('path').data(root.links()).join('path').attr('d', linkGen as any).attr('fill', 'none').attr('stroke', '#e2e8f0').attr('stroke-width', 2);
        const nodes = g.append('g').attr('transform', `translate(${width/2}, ${height/2})`).selectAll('g').data(root.descendants()).join('g').attr('transform', (d: any) => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);
        nodes.append('circle').attr('r', 15).attr('fill', (d: any) => d.data.color).attr('stroke', '#fff').attr('stroke-width', 2);
        nodes.append('text').attr('transform', (d: any) => d.x < Math.PI ? 'rotate(0)' : 'rotate(180)').attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', '10px').attr('font-weight', 'black').attr('fill', (d: any) => (d.data.color === '#e2e8f0' ? '#475569' : '#fff')).text((d: any) => d.data.value);
      } else {
        const treeLayout = d3Tree().size([width - padding * 2, height - padding * 2]);
        treeLayout(root as any);
        const linkGen = linkVertical().x((d: any) => d.x).y((d: any) => d.y);
        const treeG = g.append('g').attr('transform', `translate(${padding}, ${padding})`);
        treeG.selectAll('path').data(root.links()).join('path').attr('d', linkGen as any).attr('fill', 'none').attr('stroke', '#e2e8f0').attr('stroke-width', 2);
        const nodes = treeG.selectAll('g').data(root.descendants()).join('g').attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);
        nodes.append('circle').attr('r', 18).attr('fill', (d: any) => d.data.color).attr('stroke', '#fff').attr('stroke-width', 2);
        nodes.append('text').attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', '10px').attr('font-weight', 'black').attr('fill', (d: any) => (d.data.color === '#e2e8f0' ? '#475569' : '#fff')).text((d: any) => d.data.value);
      }
    } else if ([AlgorithmCategory.GRAPHS, AlgorithmCategory.ADVANCED_DS].includes(category)) {
      if (layout === 'alternative') {
        const radius = Math.min(width, height) / 2 - padding;
        const centerX = width / 2;
        const centerY = height / 2;
        data.forEach((d, i) => {
          const angle = (i / data.length) * 2 * Math.PI;
          d.x = centerX + radius * Math.cos(angle);
          d.y = centerY + radius * Math.sin(angle);
        });
        g.selectAll('line').data(links).join('line').attr('x1', d => data.find(n => n.id === d.source)?.x || 0).attr('y1', d => data.find(n => n.id === d.source)?.y || 0).attr('x2', d => data.find(n => n.id === d.target)?.x || 0).attr('y2', d => data.find(n => n.id === d.target)?.y || 0).attr('stroke', '#e2e8f0').attr('stroke-width', 2);
        const nodes = g.selectAll('g').data(data).join('g').attr('transform', d => `translate(${d.x}, ${d.y})`);
        nodes.append('circle').attr('r', 25).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 2);
        nodes.append('text').attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', '11px').attr('font-weight', 'black').attr('fill', d => (d.color === '#e2e8f0' ? '#475569' : '#fff')).text(d => d.value);
      } else {
        const simulation = forceSimulation(data as any).force('link', forceLink(links).id((d: any) => d.id).distance(120)).force('charge', forceManyBody().strength(-800)).force('center', forceCenter(width / 2, height / 2)).force('collision', forceCollide().radius(35)).stop();
        for (let i = 0; i < 300; ++i) simulation.tick();
        const linkG = g.append('g').selectAll('g').data(links).join('g');
        linkG.append('line').attr('stroke', '#e2e8f0').attr('stroke-width', 3).attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
        const nodeG = g.append('g').selectAll('g').data(data).enter().append('g').attr('transform', d => `translate(${d.x}, ${d.y})`);
        nodeG.append('circle').attr('r', 25).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 3);
        nodeG.append('text').attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', '11px').attr('font-weight', 'black').attr('fill', d => (d.color === '#e2e8f0' ? '#475569' : '#fff')).text(d => d.value);
      }
    } else if (category === AlgorithmCategory.DYNAMIC_PROGRAMMING || category === AlgorithmCategory.MATHEMATICS || category === AlgorithmCategory.BACKTRACKING) {
      const count = data.length;
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const cellSize = Math.min((width - padding * 2) / cols, (height - padding * 2) / rows);
      const startX = (width - cols * cellSize) / 2;
      const startY = (height - rows * cellSize) / 2;
      const cells = g.selectAll('.cell-group').data(data).join('g').attr('transform', (d, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          let tx = startX + c * cellSize;
          let ty = startY + r * cellSize;
          if (layout === 'alternative') {
            const isoX = (c - r) * (cellSize / 2);
            const isoY = (c + r) * (cellSize / 4);
            tx = width / 2 + isoX;
            ty = height / 4 + isoY;
          }
          return `translate(${tx}, ${ty})`;
      });
      if (layout === 'alternative') {
        cells.append('path').attr('d', `M0,${cellSize/4} L${cellSize/2},0 L${cellSize},${cellSize/4} L${cellSize/2},${cellSize/2} Z`).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 1);
      } else {
        cells.append('rect').attr('width', cellSize - 4).attr('height', cellSize - 4).attr('fill', d => d.color).attr('rx', 8).attr('stroke', '#f1f5f9').attr('stroke-width', 1);
      }
      cells.append('text').attr('x', cellSize / 2).attr('y', layout === 'alternative' ? cellSize / 4 : cellSize / 2).attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', Math.max(cellSize * 0.35, 8)).attr('font-weight', 'black').attr('fill', d => (d.color === '#e2e8f0' ? '#475569' : '#fff')).text(d => d.value);
    } else {
      if (layout === 'alternative' || category === AlgorithmCategory.LINKED_LIST) {
        const spacing = (width - padding * 2) / (data.length - 1 || 1);
        const centerY = height / 2;
        g.selectAll('line').data(links).join('line').attr('x1', d => {
          const idx = data.findIndex(n => n.id === d.source);
          return padding + idx * spacing + 20;
        }).attr('y1', centerY).attr('x2', d => {
          const idx = data.findIndex(n => n.id === d.target);
          return padding + idx * spacing - 20;
        }).attr('y2', centerY).attr('stroke', '#e2e8f0').attr('stroke-width', 3).attr('marker-end', 'url(#arrowhead)');
        svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '-0 -5 10 10').attr('refX', 5).attr('refY', 0).attr('orient', 'auto').attr('markerWidth', 5).attr('markerHeight', 5).attr('xoverflow', 'visible').append('svg:path').attr('d', 'M 0,-5 L 10 ,0 L 0,5').attr('fill', '#cbd5e1').style('stroke','none');
        const nodes = g.selectAll('g').data(data).join('g').attr('transform', (d, i) => `translate(${padding + i * spacing}, ${centerY})`);
        nodes.append('rect').attr('x', -20).attr('y', -20).attr('width', 40).attr('height', 40).attr('rx', 8).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 2);
        nodes.append('text').attr('text-anchor', 'middle').attr('dy', '.35em').attr('font-size', '10px').attr('font-weight', 'black').attr('fill', d => (d.color === '#e2e8f0' ? '#475569' : '#fff')).text(d => d.value);
      } else {
        const xScale = scaleBand().domain(data.map(d => d.id.toString())).range([padding, width - padding]).padding(0.2);
        const yScale = scaleLinear().domain([0, max(data, d => isNaN(Number(d.value)) ? 100 : Number(d.value)) || 100]).range([height - padding, padding]);
        const bars = g.selectAll('.bar-group').data(data).join('g').attr('transform', d => `translate(${xScale(d.id.toString()) || 0}, 0)`);
        bars.append('rect').attr('y', d => yScale(isNaN(Number(d.value)) ? 50 : Number(d.value))).attr('width', xScale.bandwidth()).attr('height', d => (height - padding) - yScale(isNaN(Number(d.value)) ? 50 : Number(d.value))).attr('fill', d => d.color).attr('rx', 10);
        bars.append('text').attr('x', xScale.bandwidth() / 2).attr('y', d => yScale(isNaN(Number(d.value)) ? 50 : Number(d.value)) - 10).attr('text-anchor', 'middle').attr('font-size', '12px').attr('font-weight', 'black').attr('fill', '#475569').text(d => d.value);
      }
    }
  }, [data, category, zoom, links, layout]);

  const canChangeShape = [
    AlgorithmCategory.TREES, 
    AlgorithmCategory.GRAPHS, 
    AlgorithmCategory.DYNAMIC_PROGRAMMING, 
    AlgorithmCategory.ARRAYS, 
    AlgorithmCategory.ADVANCED_DS,
    AlgorithmCategory.MATHEMATICS,
    AlgorithmCategory.SORTING,
    AlgorithmCategory.SEARCHING,
    AlgorithmCategory.LINKED_LIST,
    AlgorithmCategory.STRINGS
  ].includes(category);

  return (
    <div className="flex flex-col gap-6">
      <div 
        ref={containerRef} 
        className={`relative group bg-white ${isFullscreen ? 'p-10 flex flex-col items-center justify-center' : ''}`}
      >
        <div className={`w-full ${isFullscreen ? 'h-full flex-1' : 'h-[320px] sm:h-[480px]'} flex items-center justify-center bg-slate-50/20 rounded-[2.5rem] border border-slate-100 p-4 sm:p-8 overflow-hidden shadow-inner`}>
          <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-full" />
        </div>
        
        {/* Fullscreen HUD Controls */}
        <div className="absolute top-6 right-6 flex flex-col bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl p-1 z-30">
          <button 
            onClick={() => setZoom(z => Math.min(z + 0.1, 3))} 
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 rounded-xl transition-colors"
            title="Zoom In"
          >
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
          <button 
            onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} 
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 rounded-xl transition-colors"
            title="Zoom Out"
          >
            <i className="fa-solid fa-minus text-xs"></i>
          </button>
          <button 
            onClick={handleToggleFullscreen} 
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isFullscreen ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:text-blue-600'}`}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
          </button>
        </div>

        {isFullscreen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 shadow-2xl z-40 max-w-[80%]">
             <p className="text-white text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
               {currentStep}
             </p>
          </div>
        )}
      </div>

      {/* Visual Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={isAnimating ? onStop : onStart} className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-100">
            <i className={`fa-solid ${isAnimating ? 'fa-stop' : 'fa-play'}`}></i>{isAnimating ? 'Stop' : 'Visualize'}
          </button>
          
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-2xl">
            <button 
              onClick={onStepBackward} 
              disabled={isAnimating || !canStepBackward} 
              className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
              title="Step Backward"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button 
              onClick={onStepForward} 
              disabled={isAnimating || !canStepForward} 
              className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all"
              title="Step Forward"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>

          <button onClick={() => setIsInputModalOpen(true)} disabled={isAnimating} className="px-5 py-3.5 bg-white border-2 border-slate-50 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"><i className="fa-solid fa-keyboard"></i></button>
          <button onClick={onReset} disabled={isAnimating} className="px-5 py-3.5 bg-slate-50 text-slate-500 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 border border-slate-100 transition-all"><i className="fa-solid fa-rotate-right"></i></button>
          
          <div className="flex items-center gap-2">
            {canChangeShape && (
              <button 
                onClick={toggleLayout}
                disabled={isAnimating}
                className="px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                title="Change Structure Layout"
              >
                <i className="fa-solid fa-layer-group"></i>
                <span className="hidden sm:inline">Change Shape</span>
              </button>
            )}
            <ShareButton />
          </div>
        </div>
        <div className="flex items-center gap-8 w-full sm:w-64 px-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center"><span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Speed</span><span className="text-[10px] font-black text-blue-500 uppercase">{speed}ms</span></div>
            <input type="range" min="50" max="2000" step="50" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} disabled={isAnimating} className="w-full h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600" />
          </div>
        </div>
      </div>

      {/* Algorithm Step Explainer */}
      <div className="p-8 bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 animate-message">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
              <i className="fa-solid fa-list-check text-xs"></i>
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Algorithm Execution Log</h3>
          </div>
          <div className="px-3 py-1 bg-slate-800 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-700">
            {isAnimating ? 'In Progress' : 'Standby'}
          </div>
        </div>
        
        <div className="space-y-3">
          {stepHistory.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-slate-500 text-xs font-medium italic">Start the visualization to see real-time step explanations.</p>
            </div>
          ) : (
            stepHistory.map((step, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl transition-all duration-300 flex items-start gap-4 border ${
                  idx === 0 
                    ? 'bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-500/5' 
                    : 'bg-slate-800/20 border-slate-700/50 opacity-40 grayscale'
                }`}
              >
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  idx === 0 ? 'bg-blue-500 animate-pulse' : 'bg-slate-600'
                }`}></div>
                <div className="flex-1">
                  <p className={`text-xs leading-relaxed font-bold ${
                    idx === 0 ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {step}
                  </p>
                </div>
                {idx === 0 && (
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-tighter">Current</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <CustomInputModal 
        isOpen={isInputModalOpen} 
        onClose={() => setIsInputModalOpen(false)} 
        onSubmit={onCustomData} 
        category={category} 
      />
    </div>
  );
};
