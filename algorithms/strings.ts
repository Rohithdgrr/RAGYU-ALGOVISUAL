
import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const kmp: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  const pattern = "ALGO";
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    if (pattern.includes(nodes[i].value.toString())) nodes[i].color = COLORS.SORTED;
    else nodes[i].color = COLORS.DEFAULT;
  }
};

export const rabinKarp: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  const pattern = "RITH"; 
  const n = nodes.length;
  const m = pattern.length;
  for (let i = 0; i <= n - m; i++) {
    if (isCancelled()) return;
    for (let k = 0; k < n; k++) {
       if (k >= i && k < i + m) nodes[k].color = COLORS.COMPARING;
       else if (nodes[k].color !== COLORS.SORTED) nodes[k].color = COLORS.DEFAULT;
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
    let match = true;
    for (let j = 0; j < m; j++) { if (nodes[i + j].value !== pattern[j]) { match = false; break; } }
    if (match) { for (let j = 0; j < m; j++) nodes[i + j].color = COLORS.SORTED; setData([...nodes]); await sleep(speed * 2); }
  }
};

export const boyerMoore: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Heuristic skip visualization
  for (let i = nodes.length - 1; i >= 0; i -= 2) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.DEFAULT;
  }
};

export const trieSearch: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (const n of nodes) {
    if (isCancelled()) return;
    n.color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 2);
    n.color = COLORS.SORTED;
  }
};

export const zAlgorithm: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 2);
    nodes[i].color = COLORS.DEFAULT;
  }
  nodes.forEach((n, i) => { if (i % 3 === 0) n.color = COLORS.HIGHLIGHT; });
  setData([...nodes]);
};

export const manacher: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let center = 0; center < nodes.length; center++) {
    if (isCancelled()) return;
    nodes[center].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 2);
    let l = center - 1, r = center + 1;
    while (l >= 0 && r < nodes.length && nodes[l].value === nodes[r].value) {
      nodes[l].color = COLORS.COMPARING;
      nodes[r].color = COLORS.COMPARING;
      setData([...nodes]);
      await sleep(speed, isCancelled);
      l--; r++;
    }
    nodes.forEach(n => n.color = COLORS.DEFAULT);
  }
};
