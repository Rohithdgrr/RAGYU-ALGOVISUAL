
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const sieve: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const cells = [...data];
  const n = cells.length;
  const isPrime = new Array(n + 1).fill(true);
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      cells[p-1].color = COLORS.ACTIVE;
      setData([...cells]);
      await sleep(speed, isCancelled);
      for (let i = p * p; i <= n; i += p) {
        if (isCancelled()) return;
        isPrime[i] = false;
        cells[i-1].color = COLORS.TARGET;
        cells[i-1].value = 'X';
        setData([...cells]);
        await sleep(speed / 4, isCancelled);
      }
      cells[p-1].color = COLORS.SORTED;
    }
  }
  cells.forEach((cell, idx) => { if (isPrime[idx + 1] && idx > 0) cell.color = COLORS.SORTED; });
  setData([...cells]);
};

export const extendedEuclidean: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
};

export const modularExp: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.HIGHLIGHT;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    nodes[i].value = "mod";
  }
};
