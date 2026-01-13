import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const bubbleSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  setStep(`Starting Bubble Sort on ${arr.length} elements.`);
  for (let i = 0; i < arr.length; i++) {
    setStep(`Pass ${i + 1}: Floating the largest unsorted element to the end.`);
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (isCancelled()) return;
      setStep(`Comparing indices ${j} and ${j + 1}: Values ${arr[j].value} and ${arr[j + 1].value}`);
      arr[j].color = COLORS.COMPARING;
      arr[j + 1].color = COLORS.COMPARING;
      setData([...arr]);
      await sleep(speed, isCancelled);
      if (isCancelled()) return;
      if (Number(arr[j].value) > Number(arr[j + 1].value)) {
        setStep(`Swap! ${arr[j].value} is larger than ${arr[j + 1].value}`);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      arr[j].color = COLORS.DEFAULT;
      arr[j + 1].color = COLORS.DEFAULT;
    }
    arr[arr.length - i - 1].color = COLORS.SORTED;
    setStep(`Element at index ${arr.length - i - 1} is now in its correct sorted position.`);
    setData([...arr]);
  }
};

export const selectionSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  setStep(`Starting Selection Sort on ${arr.length} elements.`);
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Assuming index ${i} is the minimum.`);
    setData([...arr]);
    await sleep(speed, isCancelled);

    for (let j = i + 1; j < arr.length; j++) {
      if (isCancelled()) return;
      arr[j].color = COLORS.COMPARING;
      setData([...arr]);
      await sleep(speed, isCancelled);

      if (Number(arr[j].value) < Number(arr[minIdx].value)) {
        if (minIdx !== i) arr[minIdx].color = COLORS.DEFAULT;
        minIdx = j;
        arr[minIdx].color = COLORS.TARGET;
        setStep(`New minimum found at index ${j}: ${arr[j].value}`);
        setData([...arr]);
        await sleep(speed, isCancelled);
      } else {
        arr[j].color = COLORS.DEFAULT;
      }
    }

    if (minIdx !== i) {
      setStep(`Swapping current index ${i} with found minimum ${arr[minIdx].value}`);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    arr[minIdx].color = COLORS.DEFAULT;
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
  }
};

export const insertionSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  setStep("Starting Insertion Sort.");
  arr[0].color = COLORS.SORTED;
  setData([...arr]);

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    setStep(`Picking element ${key.value} to insert into sorted sub-array.`);
    key.color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);

    while (j >= 0 && Number(arr[j].value) > Number(key.value)) {
      if (isCancelled()) return;
      setStep(`Shifting ${arr[j].value} to the right.`);
      arr[j].color = COLORS.COMPARING;
      setData([...arr]);
      await sleep(speed, isCancelled);
      arr[j + 1] = { ...arr[j], color: COLORS.SORTED };
      j--;
      setData([...arr]);
    }
    arr[j + 1] = { ...key, color: COLORS.SORTED };
    setStep(`Inserted ${key.value} at position ${j + 1}.`);
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
};

export const mergeSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const recursiveMerge = async (l: number, r: number) => {
    if (l >= r || isCancelled()) return;
    const mid = Math.floor((l + r) / 2);
    setStep(`Dividing range [${l}, ${r}] into [${l}, ${mid}] and [${mid + 1}, ${r}]`);
    await recursiveMerge(l, mid);
    await recursiveMerge(mid + 1, r);
    
    setStep(`Merging sorted halves for range [${l}, ${r}]`);
    for (let i = l; i <= r; i++) arr[i].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed, isCancelled);

    let i = l, j = mid + 1;
    const sorted = [];
    while (i <= mid && j <= r) {
      if (Number(arr[i].value) <= Number(arr[j].value)) {
        setStep(`Selecting ${arr[i].value} from left subarray`);
        sorted.push(arr[i++]);
      } else {
        setStep(`Selecting ${arr[j].value} from right subarray`);
        sorted.push(arr[j++]);
      }
    }
    while (i <= mid) sorted.push(arr[i++]);
    while (j <= r) sorted.push(arr[j++]);

    for (let k = 0; k < sorted.length; k++) {
      arr[l + k] = { ...sorted[k], color: COLORS.SORTED };
      setData([...arr]);
      await sleep(speed / 2);
    }
  };
  await recursiveMerge(0, arr.length - 1);
};

export const quickSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const partition = async (l: number, r: number) => {
    const pivotValue = Number(arr[r].value);
    setStep(`Selected pivot: ${pivotValue} at index ${r}`);
    arr[r].color = COLORS.TARGET;
    setData([...arr]);
    let i = l - 1;
    for (let j = l; j < r; j++) {
      if (isCancelled()) return i + 1;
      arr[j].color = COLORS.COMPARING;
      setData([...arr]);
      await sleep(speed, isCancelled);
      if (Number(arr[j].value) < pivotValue) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr[i].color = COLORS.ACTIVE;
        setStep(`Swapped ${arr[i].value} to index ${i}`);
      } else {
        arr[j].color = COLORS.DEFAULT;
      }
      setData([...arr]);
    }
    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
    arr[i + 1].color = COLORS.SORTED;
    setStep(`Pivot moved to correct position index ${i + 1}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    return i + 1;
  };

  const recursiveQuick = async (l: number, r: number) => {
    if (l < r && !isCancelled()) {
      const pi = await partition(l, r);
      await recursiveQuick(l, pi - 1);
      await recursiveQuick(pi + 1, r);
    } else if (l === r) {
      arr[l].color = COLORS.SORTED;
      setData([...arr]);
    }
  };
  await recursiveQuick(0, arr.length - 1);
};

export const heapSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const n = arr.length;

  const heapify = async (n: number, i: number) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && Number(arr[l].value) > Number(arr[largest].value)) largest = l;
    if (r < n && Number(arr[r].value) > Number(arr[largest].value)) largest = r;

    if (largest !== i) {
      if (isCancelled()) return;
      arr[i].color = COLORS.COMPARING;
      arr[largest].color = COLORS.COMPARING;
      setData([...arr]);
      await sleep(speed, isCancelled);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setData([...arr]);
      await heapify(n, largest);
    }
  };

  setStep("Building Max Heap.");
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);

  setStep("Extracting elements from heap.");
  for (let i = n - 1; i > 0; i--) {
    if (isCancelled()) return;
    setStep(`Swapping root with index ${i} and re-heapifying.`);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
    await heapify(i, 0);
  }
  arr[0].color = COLORS.SORTED;
  setData([...arr]);
};