import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const bfs: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const queue: (number | string)[] = [nodes[0].id];
  const visited = new Set();
  setStep("Starting Breadth First Search from root.");
  
  while (queue.length > 0) {
    if (isCancelled()) return;
    const uId = queue.shift()!;
    if (visited.has(uId)) continue;
    visited.add(uId);
    
    const uIdx = nodes.findIndex(n => n.id === uId);
    setStep(`Visiting Node ${nodes[uIdx].value}. Exploring neighbors...`);
    nodes[uIdx].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    for (const edge of nodes[uIdx].neighbors || []) {
      const vIdx = nodes.findIndex(n => n.id === edge.id);
      if (!visited.has(edge.id)) {
        setStep(`Discovered Node ${nodes[vIdx].value}, adding to queue.`);
        nodes[vIdx].color = COLORS.COMPARING;
        if (!queue.includes(edge.id)) queue.push(edge.id);
      }
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[uIdx].color = COLORS.SORTED;
  }
  setStep("BFS traversal complete.");
};

export const dfs: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const visited = new Set();
  setStep("Starting Depth First Search.");

  const explore = async (uId: number | string) => {
    if (visited.has(uId) || isCancelled()) return;
    visited.add(uId);
    const uIdx = nodes.findIndex(n => n.id === uId);
    setStep(`Diving into Node ${nodes[uIdx].value}.`);
    nodes[uIdx].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    for (const edge of nodes[uIdx].neighbors || []) {
      const vIdx = nodes.findIndex(n => n.id === edge.id);
      if (!visited.has(edge.id)) {
        nodes[vIdx].color = COLORS.COMPARING;
        setData([...nodes]);
        await sleep(speed, isCancelled);
        await explore(edge.id);
      }
    }
    nodes[uIdx].color = COLORS.SORTED;
    setStep(`Backtracking from Node ${nodes[uIdx].value}.`);
    setData([...nodes]);
    await sleep(speed, isCancelled);
  };
  await explore(nodes[0].id);
  setStep("DFS traversal complete.");
};

export const dijkstra: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const dists: Record<string | number, number> = {};
  nodes.forEach(n => dists[n.id] = Infinity);
  dists[nodes[0].id] = 0;
  const pq = [nodes[0].id];
  setStep("Initializing Dijkstra shortest path search.");

  while (pq.length > 0) {
    if (isCancelled()) return;
    pq.sort((a, b) => dists[a] - dists[b]);
    const uId = pq.shift()!;
    const uIdx = nodes.findIndex(n => n.id === uId);
    setStep(`Settling Node ${nodes[uIdx].value} with distance ${dists[uId]}`);
    nodes[uIdx].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    for (const edge of nodes[uIdx].neighbors || []) {
      const vIdx = nodes.findIndex(n => n.id === edge.id);
      const weight = edge.weight || 1;
      const alt = dists[uId] + weight;
      
      nodes[vIdx].color = COLORS.COMPARING;
      setData([...nodes]);
      await sleep(speed / 2);

      if (alt < dists[edge.id]) {
        setStep(`Relaxing edge to ${nodes[vIdx].value}: new distance ${alt}`);
        dists[edge.id] = alt;
        nodes[vIdx].value = `${nodes[vIdx].value.toString().split(':')[0]}: ${alt}`;
        if (!pq.includes(edge.id)) pq.push(edge.id);
      }
      nodes[vIdx].color = COLORS.DEFAULT;
    }
    nodes[uIdx].color = COLORS.SORTED;
    setData([...nodes]);
  }
};

export const kruskal: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const edges: any[] = [];
  nodes.forEach(u => { u.neighbors?.forEach(v => { edges.push({ u: u.id, v: v.id, weight: v.weight || 1 }); }); });
  edges.sort((a, b) => a.weight - b.weight);
  
  const parent: Record<string | number, any> = {};
  nodes.forEach(n => parent[n.id] = n.id);
  const find = (i: any): any => (parent[i] === i ? i : find(parent[i]));
  const union = (i: any, j: any) => { parent[find(i)] = find(j); };
  
  setStep(`Sorting ${edges.length} edges by weight for Kruskal's MST.`);
  await sleep(speed);

  for (const edge of edges) {
    if (isCancelled()) return;
    const uIdx = nodes.findIndex(n => n.id === edge.u);
    const vIdx = nodes.findIndex(n => n.id === edge.v);
    setStep(`Considering edge between ${nodes[uIdx].value} and ${nodes[vIdx].value} (weight ${edge.weight}).`);
    nodes[uIdx].color = COLORS.COMPARING;
    nodes[vIdx].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    if (find(edge.u) !== find(edge.v)) {
      setStep("No cycle detected. Adding edge to Minimum Spanning Tree.");
      union(edge.u, edge.v);
      nodes[uIdx].color = COLORS.SORTED;
      nodes[vIdx].color = COLORS.SORTED;
    } else {
      setStep("Adding this edge would cause a cycle. Skipping.");
      nodes[uIdx].color = COLORS.DEFAULT;
      nodes[vIdx].color = COLORS.DEFAULT;
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
};

export const prim: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const visited = new Set();
  visited.add(nodes[0].id);
  nodes[0].color = COLORS.SORTED;
  setStep("Starting Prim's MST from the first node.");
  
  while (visited.size < nodes.length) {
    if (isCancelled()) return;
    let minEdge = { u: null, v: null, weight: Infinity };
    
    visited.forEach(uId => {
      const u = nodes.find(n => n.id === uId)!;
      u.neighbors?.forEach(edge => {
        if (!visited.has(edge.id) && (edge.weight || 1) < minEdge.weight) {
          minEdge = { u: uId, v: edge.id, weight: edge.weight || 1 };
        }
      });
    });
    
    if (minEdge.v) {
      const vIdx = nodes.findIndex(n => n.id === minEdge.v);
      setStep(`Selected cheapest edge to ${nodes[vIdx].value} with weight ${minEdge.weight}.`);
      nodes[vIdx].color = COLORS.ACTIVE;
      setData([...nodes]);
      await sleep(speed, isCancelled);
      visited.add(minEdge.v);
      nodes[vIdx].color = COLORS.SORTED;
      setData([...nodes]);
    } else {
      setStep("Graph might be disconnected.");
      break;
    }
  }
};

// Kahn's Algorithm for Topological Sorting
export const kahns: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const inDegree: Record<string | number, number> = {};
  nodes.forEach(n => inDegree[n.id] = 0);
  
  setStep("Calculating in-degrees for Kahn's Algorithm.");
  nodes.forEach(u => {
    u.neighbors?.forEach(v => {
      inDegree[v.id] = (inDegree[v.id] || 0) + 1;
    });
  });

  const queue: (number | string)[] = [];
  nodes.forEach(n => {
    if (inDegree[n.id] === 0) queue.push(n.id);
  });

  setStep(`Starting with nodes having in-degree 0: ${queue.length} found.`);
  setData([...nodes]);

  while (queue.length > 0) {
    if (isCancelled()) return;
    const uId = queue.shift()!;
    const uIdx = nodes.findIndex(n => n.id === uId);
    
    setStep(`Visiting Node ${nodes[uIdx].value}. Reducing in-degree of its neighbors.`);
    nodes[uIdx].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    for (const edge of nodes[uIdx].neighbors || []) {
      const vIdx = nodes.findIndex(n => n.id === edge.id);
      inDegree[edge.id]--;
      
      nodes[vIdx].color = COLORS.COMPARING;
      setData([...nodes]);
      await sleep(speed / 2);
      
      if (inDegree[edge.id] === 0) {
        setStep(`Node ${nodes[vIdx].value} reached 0 in-degree. Adding to processing queue.`);
        queue.push(edge.id);
      }
      nodes[vIdx].color = COLORS.DEFAULT;
    }
    
    nodes[uIdx].color = COLORS.SORTED;
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
  setStep("Topological Sort complete.");
};