
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const kadane: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const arr = [...data];
  let maxSoFar = -Infinity, currentMax = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);
    currentMax += Number(arr[i].value);
    if (currentMax > maxSoFar) { maxSoFar = currentMax; arr[i].color = COLORS.TARGET; } 
    else if (currentMax < 0) { currentMax = 0; arr[i].color = COLORS.COMPARING; } 
    else { arr[i].color = COLORS.SORTED; }
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
};

export const slidingWindow: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const arr = [...data];
  const k = 3;
  for (let i = 0; i <= arr.length - k; i++) {
    if (isCancelled()) return;
    arr.forEach(a => a.color = COLORS.DEFAULT);
    for (let j = i; j < i + k; j++) arr[j].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed * 2, isCancelled);
  }
};

export const twoPointers: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const arr = [...data];
  let i = 0, j = arr.length - 1;
  while (i <= j) {
    if (isCancelled()) return;
    arr.forEach(a => a.color = COLORS.DEFAULT);
    arr[i].color = COLORS.ACTIVE;
    arr[j].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed * 2, isCancelled);
    i++; j--;
  }
};

export const fisherYates: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const arr = [...data];
  for (let i = arr.length - 1; i > 0; i--) {
    if (isCancelled()) return;
    const j = Math.floor(Math.random() * (i + 1));
    arr[i].color = COLORS.ACTIVE;
    arr[j].color = COLORS.COMPARING;
    setData([...arr]);
    await sleep(speed, isCancelled);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
  }
};
