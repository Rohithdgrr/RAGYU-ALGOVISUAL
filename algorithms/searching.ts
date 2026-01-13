import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const linearSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const targetIdx = Math.floor(Math.random() * arr.length);
  const targetValue = Number(arr[targetIdx].value);
  setStep(`Searching for target: ${targetValue} using Linear Search.`);

  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    setStep(`Checking index ${i}: value ${arr[i].value}`);
    arr[i].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);

    if (Number(arr[i].value) === targetValue) {
      setStep(`Success! Found ${targetValue} at index ${i}.`);
      arr[i].color = COLORS.SORTED;
      setData([...arr]);
      return;
    }
    arr[i].color = COLORS.COMPARING;
    setData([...arr]);
  }
};

export const binarySearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const targetIdx = Math.floor(Math.random() * arr.length);
  const targetValue = Number(arr[targetIdx].value);
  setStep(`Searching for target value: ${targetValue} in sorted array.`);
  
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    if (isCancelled()) return;
    const mid = Math.floor((l + r) / 2);
    setStep(`Middle: Index ${mid}, Value ${arr[mid].value}. Current range: [${l}, ${r}]`);
    arr[mid].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);

    if (Number(arr[mid].value) === targetValue) {
      setStep(`Found target ${targetValue} at index ${mid}.`);
      arr[mid].color = COLORS.SORTED;
      setData([...arr]);
      return;
    }

    if (Number(arr[mid].value) < targetValue) {
      setStep(`${arr[mid].value} < ${targetValue}. Searching right.`);
      for (let i = l; i <= mid; i++) arr[i].color = COLORS.COMPARING;
      l = mid + 1;
    } else {
      setStep(`${arr[mid].value} > ${targetValue}. Searching left.`);
      for (let i = mid; i <= r; i++) arr[i].color = COLORS.COMPARING;
      r = mid - 1;
    }
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
  setStep("Target not found.");
};

export const jumpSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  const targetIdx = Math.floor(Math.random() * n);
  const targetValue = Number(arr[targetIdx].value);
  setStep(`Searching for ${targetValue} with Jump Search (step size ${step}).`);

  let prev = 0;
  while (Number(arr[Math.min(step, n) - 1].value) < targetValue) {
    if (isCancelled()) return;
    setStep(`Jumping from ${prev} to ${Math.min(step, n) - 1}`);
    for (let i = prev; i < Math.min(step, n); i++) arr[i].color = COLORS.COMPARING;
    prev = step;
    setData([...arr]);
    await sleep(speed, isCancelled);
    if (prev >= n) {
      setStep("End of array reached. Not found.");
      return;
    }
  }

  setStep("Linear searching within the jump block.");
  while (Number(arr[prev].value) < targetValue) {
    if (isCancelled()) return;
    arr[prev].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed / 2);
    prev++;
    if (prev === Math.min(step, n)) return;
  }

  if (Number(arr[prev].value) === targetValue) {
    arr[prev].color = COLORS.SORTED;
    setStep(`Target found at index ${prev}.`);
  } else {
    setStep("Target not found in range.");
  }
  setData([...arr]);
};