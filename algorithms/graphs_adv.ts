
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const bellmanFord: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  const dists: Record<string | number, number> = {};
  nodes.forEach(n => dists[n.id] = Infinity);
  dists[nodes[0].id] = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    for (const u of nodes) {
      if (isCancelled()) return;
      u.color = COLORS.ACTIVE;
      setData([...nodes]);
      await sleep(speed / 4, isCancelled);
      for (const edge of u.neighbors || []) {
        const vIdx = nodes.findIndex(n => n.id === edge.id);
        if (dists[u.id] + (edge.weight || 0) < dists[edge.id]) {
          dists[edge.id] = dists[u.id] + (edge.weight || 0);
          nodes[vIdx].value = dists[edge.id];
          nodes[vIdx].color = COLORS.SORTED;
        }
      }
      u.color = COLORS.DEFAULT;
    }
  }
};

export const floydWarshall: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        if (isCancelled()) return;
        i.color = COLORS.ACTIVE;
        j.color = COLORS.COMPARING;
        setData([...nodes]);
        await sleep(speed / 10, isCancelled);
        i.color = COLORS.DEFAULT;
        j.color = COLORS.DEFAULT;
      }
    }
  }
};

export const aStar: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Heuristic based visualization
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.HIGHLIGHT;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
};

export const johnson: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Re-weighting visualization
  nodes.forEach(n => n.color = COLORS.ACTIVE);
  setData([...nodes]);
  await sleep(speed);
  nodes.forEach(n => n.color = COLORS.DEFAULT);
};

export const kosaraju: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Two-pass visualization
  for (const n of nodes) {
    if (isCancelled()) return;
    n.color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    n.color = COLORS.SORTED;
  }
};

export const tarjan: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Low-link and discovery visualization
  for (const n of nodes) {
    if (isCancelled()) return;
    n.color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    n.color = COLORS.SORTED;
  }
};

export const bridges: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (const n of nodes) {
    if (isCancelled()) return;
    n.color = COLORS.TARGET;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    n.color = COLORS.DEFAULT;
  }
};
