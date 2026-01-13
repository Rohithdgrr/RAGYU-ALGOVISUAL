
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const knapsack: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    grid[i].color = COLORS.ACTIVE;
    setData([...grid]);
    await sleep(speed / 4, isCancelled);
    grid[i].value = Math.floor(Math.random() * 50);
    grid[i].color = COLORS.SORTED;
  }
};

export const lcs: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    grid[i].color = COLORS.ACTIVE;
    setData([...grid]);
    await sleep(speed / 4, isCancelled);
    if (Math.random() > 0.5) grid[i].color = COLORS.SORTED;
  }
};

export const lis: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
};

export const editDistance: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    grid[i].color = COLORS.COMPARING;
    setData([...grid]);
    await sleep(speed / 8, isCancelled);
    grid[i].color = COLORS.DEFAULT;
  }
};

export const matrixChain: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  for (let len = 2; len < 5; len++) {
    for (let i = 0; i < grid.length - len; i++) {
       if (isCancelled()) return;
       grid[i].color = COLORS.HIGHLIGHT;
       setData([...grid]);
       await sleep(speed / 4, isCancelled);
    }
  }
};

export const coinChange: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (const n of nodes) {
    if (isCancelled()) return;
    n.color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 4, isCancelled);
    n.value = Number(n.value) + 1;
    n.color = COLORS.SORTED;
  }
};

export const eggDropping: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  for (let i = 0; i < grid.length; i += 5) {
    if (isCancelled()) return;
    grid[i].color = COLORS.TARGET;
    setData([...grid]);
    await sleep(speed, isCancelled);
    grid[i].color = COLORS.SORTED;
  }
};
