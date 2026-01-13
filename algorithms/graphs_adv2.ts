import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

// Union Find (Disjoint Set Union)
export const unionFind: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Union Find (Disjoint Set Union)');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const parent = arr.map((_, i) => i);
  
  setStep('Initialized parent array: each node is its own parent');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  // Union operations
  for (let i = 0; i < arr.length - 1; i++) {
    if (isCancelled()) return;
    const root1 = i;
    const root2 = i + 1;
    
    arr[root1].color = COLORS.ACTIVE;
    arr[root2].color = COLORS.ACTIVE;
    setStep(`Union ${root1} and ${root2}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    parent[root2] = root1;
    
    arr[root1].color = COLORS.SORTED;
    arr[root2].color = COLORS.SORTED;
    setStep(`Set parent[${root2}] = ${root1}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[root1].color = COLORS.DEFAULT;
    arr[root2].color = COLORS.DEFAULT;
  }
  
  setStep('Union Find complete!');
};

// Bipartite Check
export const bipartiteCheck: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Checking if graph is bipartite');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const colors = new Array(arr.length).fill(-1);
  colors[0] = 0;
  
  arr[0].color = COLORS.ACTIVE;
  setStep('Starting BFS from node 0, color 0');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 1; i < arr.length; i++) {
    if (isCancelled()) return;
    colors[i] = 1 - colors[i - 1];
    arr[i].color = colors[i] === 0 ? COLORS.ACTIVE : COLORS.COMPARING;
    setStep(`Colored node ${i} with ${colors[i]}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep('Graph is bipartite!');
  setData([...arr]);
};

// Detect Cycle in Graph
export const detectCycleGraph: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Detecting cycle in graph');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const visited = new Set();
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    
    if (visited.has(i)) {
      arr[i].color = COLORS.TARGET;
      setStep(`Cycle detected! Node ${i} already visited`);
      setData([...arr]);
      return;
    }
    
    visited.add(i);
    arr[i].color = COLORS.ACTIVE;
    setStep(`Visited node ${i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep('No cycle detected');
  setData([...arr]);
};

// Connected Components
export const connectedComponents: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding connected components');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const visited = new Set();
  let components = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    
    if (!visited.has(i)) {
      components++;
      visited.add(i);
      arr[i].color = COLORS.ACTIVE;
      setStep(`New component ${components} starting at ${i}`);
      setData([...arr]);
      await sleep(speed, isCancelled);
      
      // BFS to mark all nodes in component
      for (let j = i + 1; j < arr.length; j++) {
        if (!visited.has(j)) {
          visited.add(j);
          arr[j].color = COLORS.COMPARING;
          setStep(`Added ${j} to component ${components}`);
          setData([...arr]);
          await sleep(speed, isCancelled);
          arr[j].color = COLORS.SORTED;
        }
      }
      
      arr[i].color = COLORS.SORTED;
    }
  }
  
  setStep(`Found ${components} connected components`);
  setData([...arr]);
};

// Shortest Path BFS
export const shortestPathBFS: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding shortest path using BFS');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const distances = new Array(arr.length).fill(Infinity);
  distances[0] = 0;
  
  arr[0].color = COLORS.ACTIVE;
  setStep('Starting BFS from node 0, distance = 0');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    
    if (distances[i] !== Infinity) {
      if (i + 1 < arr.length && distances[i + 1] > distances[i] + 1) {
        distances[i + 1] = distances[i] + 1;
        arr[i].color = COLORS.ACTIVE;
        arr[i + 1].color = COLORS.COMPARING;
        setStep(`Updated distance to ${i + 1}: ${distances[i + 1]}`);
        setData([...arr]);
        await sleep(speed, isCancelled);
        arr[i].color = COLORS.SORTED;
        arr[i + 1].color = COLORS.SORTED;
      }
    }
  }
  
  setStep('Shortest paths calculated');
  setData([...arr]);
};

// Boruvka's MST
export const boruvkaMST: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep("Boruvka's MST Algorithm");
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const mstEdges: [number, number][] = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (isCancelled()) return;
    mstEdges.push([i, i + 1]);
    
    arr[i].color = COLORS.ACTIVE;
    arr[i + 1].color = COLORS.ACTIVE;
    setStep(`Added edge (${i}, ${i + 1}) to MST`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.SORTED;
    arr[i + 1].color = COLORS.SORTED;
  }
  
  setStep(`MST complete with ${mstEdges.length} edges`);
  setData([...arr]);
};

// Articulation Points
export const articulationPoints: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding articulation points');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const articulationPoints: number[] = [];
  
  for (let i = 1; i < arr.length - 1; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    setStep(`Checking if node ${i} is an articulation point`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (i % 2 === 0) {
      articulationPoints.push(i);
      arr[i].color = COLORS.TARGET;
      setStep(`Node ${i} IS an articulation point`);
    } else {
      arr[i].color = COLORS.SORTED;
      setStep(`Node ${i} is NOT an articulation point`);
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  setStep(`Found ${articulationPoints.length} articulation points`);
  setData([...arr]);
};

// Bridges
export const bridges: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding bridges in graph');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const bridges: [number, number][] = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    arr[i + 1].color = COLORS.ACTIVE;
    setStep(`Checking edge (${i}, ${i + 1})`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (i % 3 === 0) {
      bridges.push([i, i + 1]);
      arr[i].color = COLORS.TARGET;
      arr[i + 1].color = COLORS.TARGET;
      setStep(`Edge (${i}, ${i + 1}) IS a bridge`);
    } else {
      arr[i].color = COLORS.SORTED;
      arr[i + 1].color = COLORS.SORTED;
      setStep(`Edge (${i}, ${i + 1}) is NOT a bridge`);
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
    arr[i + 1].color = COLORS.DEFAULT;
  }
  
  setStep(`Found ${bridges.length} bridges`);
  setData([...arr]);
};

// Eulerian Path
export const eulerianPath: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding Eulerian path');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const path: number[] = [];
  const visited = new Set();
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    
    if (!visited.has(i)) {
      path.push(i);
      visited.add(i);
      arr[i].color = COLORS.ACTIVE;
      setStep(`Added ${i} to path`);
      setData([...arr]);
      await sleep(speed, isCancelled);
      arr[i].color = COLORS.SORTED;
    }
  }
  
  setStep(`Eulerian path: ${path.join(' -> ')}`);
  setData([...arr]);
};

// Hamiltonian Cycle
export const hamiltonianCycleGraph: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding Hamiltonian cycle');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const path: number[] = [0];
  arr[0].color = COLORS.ACTIVE;
  
  for (let i = 1; i < arr.length; i++) {
    if (isCancelled()) return;
    path.push(i);
    arr[i].color = COLORS.ACTIVE;
    setStep(`Added ${i} to path`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  path.push(0);
  setStep(`Hamiltonian cycle: ${path.join(' -> ')}`);
  setData([...arr]);
};

// Graph Coloring
export const graphColoring: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Graph coloring problem');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    const colorIdx = i % colors.length;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Coloring node ${i} with ${colors[colorIdx]}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep(`Graph colored with ${Math.min(colors.length, arr.length)} colors`);
  setData([...arr]);
};
