
import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const fenwick: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 1; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    const parent = i + (i & -i);
    if (parent < nodes.length) {
      nodes[parent].color = COLORS.COMPARING;
      nodes[parent].value = Number(nodes[parent].value) + Number(nodes[i].value);
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
};

export const segmentTree: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  const n = nodes.length;
  // Visualize bottom-up construction
  for (let i = n - 1; i > 0; i--) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 4, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
};

export const dsu: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 0; i < nodes.length - 1; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    nodes[i+1].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].neighbors = [{ id: nodes[i+1].id }];
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
  }
};

export const avl: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Simple rotation visualization
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.HIGHLIGHT;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.DEFAULT;
  }
};
