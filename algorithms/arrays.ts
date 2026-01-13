
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const kadane: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  let maxSoFar = -Infinity, currentMax = 0;
  setStep("Starting Kadane's algorithm for max subarray sum");
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    setStep(`Processing element ${i}: value = ${arr[i].value}`);
    arr[i].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);
    currentMax += Number(arr[i].value);
    if (currentMax > maxSoFar) { 
      setStep(`New max found: ${currentMax}`);
      maxSoFar = currentMax; arr[i].color = COLORS.TARGET; 
    } else if (currentMax < 0) { 
      setStep(`Resetting current max to 0`);
      arr[i].color = COLORS.COMPARING; 
    } else { 
      arr[i].color = COLORS.SORTED; 
    }
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
  setStep(`Max subarray sum: ${maxSoFar}`);
};

export const slidingWindow: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const k = 3;
  setStep(`Starting Sliding Window with window size ${k}`);
  for (let i = 0; i <= arr.length - k; i++) {
    if (isCancelled()) return;
    setStep(`Sliding window to position [${i}, ${i + k - 1}]`);
    arr.forEach(a => a.color = COLORS.DEFAULT);
    for (let j = i; j < i + k; j++) arr[j].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed * 2, isCancelled);
  }
  setStep("Sliding window completed");
};

export const twoPointers: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  let i = 0, j = arr.length - 1;
  setStep("Starting Two Pointers technique");
  while (i <= j) {
    if (isCancelled()) return;
    setStep(`Comparing pointers at positions ${i} and ${j}`);
    arr.forEach(a => a.color = COLORS.DEFAULT);
    arr[i].color = COLORS.ACTIVE;
    arr[j].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed * 2, isCancelled);
    i++; j--;
  }
  setStep("Two pointers technique completed");
};

export const fisherYates: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  setStep("Starting Fisher-Yates shuffle algorithm");
  for (let i = arr.length - 1; i > 0; i--) {
    if (isCancelled()) return;
    setStep(`Shuffling element at position ${i}`);
    const j = Math.floor(Math.random() * (i + 1));
    arr[i].color = COLORS.ACTIVE;
    arr[j].color = COLORS.COMPARING;
    setData([...arr]);
    await sleep(speed, isCancelled);
    [arr[i], arr[j]] = [arr[j], arr[i]];
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
  }
  setStep("Fisher-Yates shuffle completed");
};
