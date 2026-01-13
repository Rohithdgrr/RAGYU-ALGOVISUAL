import React from 'react';
import { LeetCodeVisualizationType } from '../leetcodeVisualizations.ts';

interface LeetCodeProblemVisualizerProps {
  type: LeetCodeVisualizationType;
  data: any[];
  isAnimating: boolean;
  currentStep: number;
}

export const LeetCodeProblemVisualizer: React.FC<LeetCodeProblemVisualizerProps> = ({
  type,
  data,
  isAnimating,
  currentStep
}) => {
  const renderVisualization = () => {
    switch (type) {
      case 'array-bars':
        return <ArrayBarsVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'array-points':
        return <ArrayPointsVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'array-grid':
        return <ArrayGridVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'linked-list':
        return <LinkedListVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'binary-tree':
        return <BinaryTreeVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'n-ary-tree':
        return <NAryTreeVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'graph-nodes':
        return <GraphNodesVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'graph-grid':
        return <GraphGridVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'string-chars':
        return <StringCharsVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'matrix-cells':
        return <MatrixCellsVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'heap-tree':
        return <HeapTreeVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'stack-vertical':
        return <StackVerticalVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'queue-horizontal':
        return <QueueHorizontalVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'trie-tree':
        return <TrieTreeVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'interval-line':
        return <IntervalLineVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'subarray-highlight':
        return <SubarrayHighlightVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      case 'pointer-visualization':
        return <PointerVisualization data={data} isAnimating={isAnimating} currentStep={currentStep} />;
      default:
        return <div className="text-slate-500 text-center py-10">Visualization type not implemented</div>;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8">
      {renderVisualization()}
    </div>
  );
};

// Array Bars Visualization
const ArrayBarsVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const maxValue = Math.max(...data.map(d => typeof d === 'number' ? d : 0), 1);
  
  return (
    <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-3 h-48 sm:h-56 md:h-64 w-full px-2 sm:px-4 overflow-x-auto">
      {data.map((value, index) => {
        const height = typeof value === 'number' ? Math.max((value / maxValue) * 100, 10) : 50;
        const isActive = index === currentStep % data.length;
        
        return (
          <div
            key={index}
            className={`relative flex-1 max-w-12 sm:max-w-16 md:max-w-20 min-w-4 sm:min-w-6 md:min-w-8 rounded-t-lg transition-all duration-300 flex flex-col items-end ${
              isActive ? 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-lg shadow-blue-500/30' : 'bg-gradient-to-t from-slate-300 to-slate-200'
            } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            style={{ height: `${height}%` }}
          >
            <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-xs font-bold text-slate-700 whitespace-nowrap">
              {value}
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] text-slate-500">
              {index}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Array Points Visualization
const ArrayPointsVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const maxValue = Math.max(...data.map(d => typeof d === 'number' ? d : 0), 1);
  const svgWidth = Math.max(data.length * 60 + 40, 400);
  const svgHeight = 250;
  const points = data.map((value, index) => ({ 
    x: (index * (svgWidth - 80) / (data.length - 1 || 1)) + 40, 
    y: svgHeight - 50 - (value / maxValue) * (svgHeight - 100), 
    value 
  }));
  
  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-64">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={i} x1="0" y1={i * (svgHeight - 50) / 4 + 25} x2={svgWidth} y2={i * (svgHeight - 50) / 4 + 25} stroke="#e2e8f0" strokeWidth="1"/>
      ))}
      
      {/* Line connecting points */}
      <polyline
        points={points.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Points */}
      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r={index === currentStep % points.length ? 10 : 6}
            fill={index === currentStep % points.length ? '#3b82f6' : '#94a3b8'}
            className={isAnimating && index === currentStep % points.length ? 'animate-pulse' : ''}
          />
          <text x={point.x} y={point.y - 15} textAnchor="middle" className="text-[10px]" fill="#64748b" fontWeight="600">
            {point.value}
          </text>
        </g>
      ))}
    </svg>
  );
};

// Array Grid Visualization
const ArrayGridVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const gridSize = Math.ceil(Math.sqrt(data.length));
  const maxCells = Math.min(data.length, 16);
  
  return (
    <div className="grid gap-3" style={{ 
      gridTemplateColumns: `repeat(${Math.min(gridSize, 4)}, minmax(0, 1fr))`,
      maxWidth: '400px'
    }}>
      {data.slice(0, maxCells).map((value, index) => {
        const isActive = index === currentStep % data.length;
        return (
          <div
            key={index}
            className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
            } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
          >
            {value}
          </div>
        );
      })}
      {data.length > maxCells && (
        <div className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-50 border-2 border-slate-200">
          +{data.length - maxCells}
        </div>
      )}
    </div>
  );
};

// Linked List Visualization
const LinkedListVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 10);
  
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-4 px-2">
      {displayData.map((node, index) => {
        const isActive = index === currentStep % data.length;
        const value = typeof node === 'object' ? node.value : node;
        const id = typeof node === 'object' ? node.id : index;
        
        return (
          <React.Fragment key={index}>
            <div
              className={`relative px-5 py-3 rounded-xl font-bold text-lg transition-all duration-300 shrink-0 ${
                isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            >
              {value}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-slate-400 rounded-full text-white text-xs flex items-center justify-center">
                {id}
              </div>
            </div>
            {index < displayData.length - 1 && (
              <div className="flex items-center shrink-0">
                <div className="w-6 h-0.5 bg-slate-300"></div>
                <div className="w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
      {data.length > 10 && (
        <div className="px-3 py-3 bg-slate-100 rounded-xl text-slate-500 text-sm font-bold shrink-0">
          +{data.length - 10} more
        </div>
      )}
    </div>
  );
};

// Binary Tree Visualization
const BinaryTreeVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const treeData = data.map((item, idx) => ({
    id: idx + 1,
    value: typeof item === 'object' ? item.value : item,
    left: typeof item === 'object' ? item.left : null,
    right: typeof item === 'object' ? item.right : null
  }));

  const renderTreeNode = (nodeId: number | null, depth: number = 0, position: number = 50) => {
    if (nodeId === null) return null;

    const node = treeData.find(n => n.id === nodeId);
    if (!node) return null;

    const isActive = nodeId === (currentStep % treeData.length) + 1;
    const offset = 100 / Math.pow(2, depth + 1);

    return (
      <g key={nodeId}>
        {/* Left child connection */}
        {node.left !== null && (
          <line
            x1={`${position}%`}
            y1={`${depth * 50 + 30}px`}
            x2={`${position - offset}%`}
            y2={`${(depth + 1) * 50 + 30}px`}
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}
        {/* Right child connection */}
        {node.right !== null && (
          <line
            x1={`${position}%`}
            y1={`${depth * 50 + 30}px`}
            x2={`${position + offset}%`}
            y2={`${(depth + 1) * 50 + 30}px`}
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}
        {/* Node */}
        <g>
          <circle
            cx={`${position}%`}
            cy={`${depth * 50 + 30}px`}
            r="18"
            fill={isActive ? '#3b82f6' : 'white'}
            stroke={isActive ? '#2563eb' : '#cbd5e1'}
            strokeWidth="2"
            className={isAnimating && isActive ? 'animate-pulse' : ''}
          />
          <text
            x={`${position}%`}
            y={`${depth * 50 + 30}px`}
            textAnchor="middle"
            dy=".35em"
            className="text-[10px] font-bold"
            fill={isActive ? 'white' : '#1e293b'}
          >
            {node.value}
          </text>
        </g>
        {renderTreeNode(node.left, depth + 1, position - offset)}
        {renderTreeNode(node.right, depth + 1, position + offset)}
      </g>
    );
  };

  const maxDepth = Math.ceil(Math.log2(Math.min(treeData.length, 31) + 1));
  const svgHeight = Math.max(maxDepth * 50 + 60, 150);

  return (
    <svg viewBox="0 0 400 300" className="w-full h-64">
      {renderTreeNode(1)}
    </svg>
  );
};

// N-ary Tree Visualization
const NAryTreeVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  return (
    <div className="text-center py-10">
      <div className="text-slate-500 text-sm">N-ary Tree Visualization</div>
      <div className="text-slate-400 text-xs mt-2">Similar to binary tree with multiple children</div>
    </div>
  );
};

// Graph Nodes Visualization
const GraphNodesVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 10);
  const positions = displayData.map((_, i) => ({
    x: 150 + Math.cos((i / displayData.length) * 2 * Math.PI) * 100,
    y: 125 + Math.sin((i / displayData.length) * 2 * Math.PI) * 100
  }));
  
  return (
    <svg viewBox="0 0 300 250" className="w-full h-64">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
        </marker>
      </defs>
      
      {/* Edges */}
      {displayData.map((node, i) =>
        (node.neighbors || []).map((neighborId: number) => {
          const neighborIndex = displayData.findIndex(n => n.id === neighborId);
          if (neighborIndex === -1) return null;
          return (
            <line
              key={`${i}-${neighborId}`}
              x1={positions[i].x}
              y1={positions[i].y}
              x2={positions[neighborIndex].x}
              y2={positions[neighborIndex].y}
              stroke="#cbd5e1"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })
      )}
      
      {/* Nodes */}
      {displayData.map((node, index) => {
        const isActive = index === currentStep % data.length;
        return (
          <g key={node.id}>
            <circle
              cx={positions[index].x}
              cy={positions[index].y}
              r="18"
              fill={isActive ? '#3b82f6' : 'white'}
              stroke={isActive ? '#2563eb' : '#cbd5e1'}
              strokeWidth="2"
              className={isAnimating && isActive ? 'animate-pulse' : ''}
            />
            <text
              x={positions[index].x}
              y={positions[index].y + 4}
              textAnchor="middle"
              className="text-[10px] font-bold"
              fill={isActive ? 'white' : '#334155'}
            >
              {node.value}
            </text>
          </g>
        );
      })}
      {data.length > 10 && (
        <text x="150" y="240" textAnchor="middle" className="text-[10px] text-slate-400">
          +{data.length - 10} more nodes
        </text>
      )}
    </svg>
  );
};

// Graph Grid Visualization
const GraphGridVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const cols = data[0]?.length || 5;
  const maxCells = Math.min(data.length * cols, 25);
  
  return (
    <div className="grid gap-1" style={{ 
      gridTemplateColumns: `repeat(${Math.min(cols, 5)}, minmax(0, 1fr))`,
      maxWidth: '400px'
    }}>
      {data.slice(0, Math.ceil(maxCells / cols)).map((row, rowIndex) =>
        row.slice(0, cols).map((cell: string, colIndex: number) => {
          const globalIndex = rowIndex * cols + colIndex;
          const isActive = globalIndex === currentStep % (data.length * cols);
          const isLand = cell === '1';
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square rounded transition-all duration-300 ${
                isLand
                  ? isActive
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                    : 'bg-blue-400'
                  : isActive
                    ? 'bg-slate-300'
                    : 'bg-slate-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            />
          );
        })
      )}
      {data.length * cols > maxCells && (
        <div className="aspect-square rounded flex items-center justify-center text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200">
          +{data.length * cols - maxCells}
        </div>
      )}
    </div>
  );
};

// String Chars Visualization
const StringCharsVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 15);
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {displayData.map((char, index) => {
        const isActive = index === currentStep % data.length;
        return (
          <div
            key={index}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 shrink-0 ${
              isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
            } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
          >
            {char}
          </div>
        );
      })}
      {data.length > 15 && (
        <div className="px-3 py-3 bg-slate-100 rounded-xl text-slate-500 text-sm font-bold">
          +{data.length - 15} more
        </div>
      )}
    </div>
  );
};

// Matrix Cells Visualization
const MatrixCellsVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const cols = data[0]?.length || 5;
  const maxCells = Math.min(data.length * cols, 25);
  
  return (
    <div className="grid gap-2" style={{ 
      gridTemplateColumns: `repeat(${Math.min(cols, 5)}, minmax(0, 1fr))`,
      maxWidth: '400px'
    }}>
      {data.slice(0, Math.ceil(maxCells / cols)).map((row, rowIndex) =>
        row.slice(0, cols).map((cell: any, colIndex: number) => {
          const globalIndex = rowIndex * cols + colIndex;
          const isActive = globalIndex === currentStep % (data.length * cols);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            >
              {cell}
            </div>
          );
        })
      )}
      {data.length * cols > maxCells && (
        <div className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-50 border-2 border-slate-200">
          +{data.length * cols - maxCells}
        </div>
      )}
    </div>
  );
};

// Heap Tree Visualization
const HeapTreeVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 15);
  
  const renderHeapNode = (index: number, depth: number = 0, position: number = 50) => {
    if (index >= displayData.length) return null;
    
    const value = displayData[index];
    const isActive = index === currentStep % data.length;
    const offset = 100 / Math.pow(2, depth + 1);
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    
    return (
      <g key={index}>
        {/* Left child connection */}
        {leftChild < displayData.length && (
          <line
            x1={`${position}%`}
            y1={`${depth * 50 + 30}px`}
            x2={`${position - offset}%`}
            y2={`${(depth + 1) * 50 + 30}px`}
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}
        {/* Right child connection */}
        {rightChild < displayData.length && (
          <line
            x1={`${position}%`}
            y1={`${depth * 50 + 30}px`}
            x2={`${position + offset}%`}
            y2={`${(depth + 1) * 50 + 30}px`}
            stroke="#cbd5e1"
            strokeWidth="2"
          />
        )}
        {/* Node */}
        <g>
          <circle
            cx={`${position}%`}
            cy={`${depth * 50 + 30}px`}
            r="16"
            fill={isActive ? '#10b981' : 'white'}
            stroke={isActive ? '#059669' : '#cbd5e1'}
            strokeWidth="2"
            className={isAnimating && isActive ? 'animate-pulse' : ''}
          />
          <text
            x={`${position}%`}
            y={`${depth * 50 + 30}px`}
            textAnchor="middle"
            dy=".35em"
            className="text-[10px] font-bold"
            fill={isActive ? 'white' : '#334155'}
          >
            {value}
          </text>
        </g>
        {renderHeapNode(leftChild, depth + 1, position - offset)}
        {renderHeapNode(rightChild, depth + 1, position + offset)}
      </g>
    );
  };
  
  const maxDepth = Math.ceil(Math.log2(Math.min(displayData.length, 31) + 1));
  const svgHeight = Math.max(maxDepth * 50 + 60, 150);

  return (
    <svg viewBox="0 0 400 300" className="w-full h-64">
      {renderHeapNode(0)}
      {data.length > 15 && (
        <text x="200" y="280" textAnchor="middle" className="text-[10px] text-slate-400">
          +{data.length - 15} more elements
        </text>
      )}
    </svg>
  );
};

// Stack Vertical Visualization
const StackVerticalVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 8);
  
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col-reverse gap-2 p-4 bg-slate-100 rounded-xl border-2 border-slate-200 max-h-64 overflow-hidden">
        {displayData.map((item, index) => {
          const isActive = index === currentStep % data.length;
          return (
            <div
              key={index}
              className={`w-16 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0 ${
                isActive ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            >
              {item}
            </div>
          );
        })}
        {data.length > 8 && (
          <div className="w-16 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-200 border border-slate-300">
            +{data.length - 8}
          </div>
        )}
      </div>
      <div className="text-slate-500 text-sm">
        <div className="font-bold">Stack</div>
        <div className="text-xs mt-1">LIFO</div>
      </div>
    </div>
  );
};

// Queue Horizontal Visualization
const QueueHorizontalVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 8);
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2 p-4 bg-slate-100 rounded-xl border-2 border-slate-200 overflow-x-auto">
        {displayData.map((item, index) => {
          const isActive = index === currentStep % data.length;
          return (
            <div
              key={index}
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 shrink-0 ${
                isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            >
              {item}
            </div>
          );
        })}
        {data.length > 8 && (
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-200 border border-slate-300 shrink-0">
            +{data.length - 8}
          </div>
        )}
      </div>
      <div className="text-slate-500 text-sm shrink-0">
        <div className="font-bold">Queue</div>
        <div className="text-xs mt-1">FIFO</div>
      </div>
    </div>
  );
};

// Trie Tree Visualization
const TrieTreeVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  return (
    <div className="text-center py-10">
      <div className="text-slate-500 text-sm">Trie Tree Visualization</div>
      <div className="text-slate-400 text-xs mt-2">Prefix tree for efficient string search</div>
    </div>
  );
};

// Interval Line Visualization
const IntervalLineVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 10);
  const maxEnd = Math.max(...displayData.map(interval => interval[1]));
  
  return (
    <div className="w-full py-4">
      <div className="relative h-20">
        {/* Timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-300"></div>
        
        {/* Intervals */}
        {displayData.map((interval, index) => {
          const [start, end] = interval;
          const isActive = index === currentStep % data.length;
          const left = (start / maxEnd) * 100;
          const width = ((end - start) / maxEnd) * 100;
          
          return (
            <div
              key={index}
              className={`absolute top-4 h-8 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg shadow-blue-500/30' : 'bg-blue-200'
              } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
              style={{ left: `${left}%`, width: `${Math.max(width, 5)}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700 whitespace-nowrap">
                [{start}, {end}]
              </div>
            </div>
          );
        })}
        {data.length > 10 && (
          <div className="absolute bottom-2 right-0 text-[10px] text-slate-400">
            +{data.length - 10} more intervals
          </div>
        )}
      </div>
    </div>
  );
};

// Subarray Highlight Visualization
const SubarrayHighlightVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 12);
  const maxValue = Math.max(...displayData.map(d => typeof d === 'number' ? d : 0), 1);
  
  return (
    <div className="flex items-end justify-center gap-2 h-64 w-full px-4">
      {displayData.map((value, index) => {
        const height = typeof value === 'number' ? Math.max((value / maxValue) * 100, 10) : 50;
        const isActive = index <= currentStep % data.length;
        
        return (
          <div
            key={index}
            className={`relative flex-1 max-w-16 min-w-6 rounded-t-lg transition-all duration-300 ${
              isActive ? 'bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30' : 'bg-gradient-to-t from-slate-300 to-slate-200'
            } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
            style={{ height: `${height}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 whitespace-nowrap">
              {value}
            </div>
          </div>
        );
      })}
      {data.length > 12 && (
        <div className="absolute bottom-0 right-0 text-[10px] text-slate-400">
          +{data.length - 12} more
        </div>
      )}
    </div>
  );
};

// Pointer Visualization
const PointerVisualization: React.FC<{ data: any[]; isAnimating: boolean; currentStep: number }> = ({ data, isAnimating, currentStep }) => {
  const displayData = data.slice(0, 8);
  
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-2">
      {displayData.map((item, index) => {
        const isActive = index === currentStep % data.length;
        return (
          <div
            key={index}
            className={`relative px-4 py-3 rounded-lg transition-all duration-300 shrink-0 ${
              isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white text-slate-700 border-2 border-slate-200'
            } ${isAnimating && isActive ? 'animate-pulse' : ''}`}
          >
            <div className="text-sm font-bold">
              {item.key || item.value}
            </div>
            {item.value && typeof item.value !== 'string' && (
              <div className="text-xs opacity-80">{item.value}</div>
            )}
            {item.next !== undefined && index < displayData.length - 1 && (
              <div className="absolute -right-2 top-1/2 w-4 h-0.5 bg-slate-400"></div>
            )}
          </div>
        );
      })}
      {data.length > 8 && (
        <div className="px-3 py-3 bg-slate-100 rounded-lg text-slate-500 text-sm font-bold shrink-0">
          +{data.length - 8} more
        </div>
      )}
    </div>
  );
};
