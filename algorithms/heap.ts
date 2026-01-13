import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const maxHeapInsert: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const heap = [...data];
  setStep("Starting Max Heap insertion");
  
  const values = [15, 10, 20, 8, 12, 17, 25];
  for (const val of values) {
    if (isCancelled()) return;
    setStep(`Inserting value ${val} into max heap`);
    heap.push({ id: heap.length, value: val, color: COLORS.ACTIVE } as any);
    setData([...heap]);
    await sleep(speed, isCancelled);
    
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setStep(`Comparing heap[${i}] (${heap[i].value}) with parent heap[${parent}] (${heap[parent].value})`);
      heap[i].color = COLORS.ACTIVE;
      heap[parent].color = COLORS.COMPARING;
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
      
      if (Number(heap[i].value) > Number(heap[parent].value)) {
        setStep(`Swapping: ${heap[i].value} > ${heap[parent].value}`);
        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        i = parent;
      } else {
        break;
      }
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
    }
    
    heap.forEach(h => h.color = COLORS.SORTED);
    setData([...heap]);
  }
  setStep("Max heap insertion completed");
};

export const maxHeapExtract: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const heap = [...data];
  setStep("Starting Max Heap extract max");
  
  if (heap.length === 0) {
    setStep("Heap is empty");
    return;
  }
  
  setStep(`Extracting max value: ${heap[0].value}`);
  heap[0].color = COLORS.TARGET;
  setData([...heap]);
  await sleep(speed, isCancelled);
  
  const max = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  
  setStep("Heapifying down from root");
  let i = 0;
  while (true) {
    if (isCancelled()) return;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    
    if (left < heap.length && Number(heap[left].value) > Number(heap[largest].value)) {
      largest = left;
    }
    if (right < heap.length && Number(heap[right].value) > Number(heap[largest].value)) {
      largest = right;
    }
    
    if (largest !== i) {
      setStep(`Swapping heap[${i}] (${heap[i].value}) with heap[${largest}] (${heap[largest].value})`);
      heap[i].color = COLORS.ACTIVE;
      heap[largest].color = COLORS.COMPARING;
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
      
      [heap[i], heap[largest]] = [heap[largest], heap[i]];
      i = largest;
    } else {
      break;
    }
  }
  
  heap.forEach(h => h.color = COLORS.SORTED);
  setData([...heap]);
  setStep(`Extracted max value: ${max.value}`);
};

export const minHeapInsert: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const heap = [...data];
  setStep("Starting Min Heap insertion");
  
  const values = [15, 10, 20, 8, 12, 5, 3];
  for (const val of values) {
    if (isCancelled()) return;
    setStep(`Inserting value ${val} into min heap`);
    heap.push({ id: heap.length, value: val, color: COLORS.ACTIVE } as any);
    setData([...heap]);
    await sleep(speed, isCancelled);
    
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      setStep(`Comparing heap[${i}] (${heap[i].value}) with parent heap[${parent}] (${heap[parent].value})`);
      heap[i].color = COLORS.ACTIVE;
      heap[parent].color = COLORS.COMPARING;
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
      
      if (Number(heap[i].value) < Number(heap[parent].value)) {
        setStep(`Swapping: ${heap[i].value} < ${heap[parent].value}`);
        [heap[i], heap[parent]] = [heap[parent], heap[i]];
        i = parent;
      } else {
        break;
      }
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
    }
    
    heap.forEach(h => h.color = COLORS.SORTED);
    setData([...heap]);
  }
  setStep("Min heap insertion completed");
};

export const minHeapExtract: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const heap = [...data];
  setStep("Starting Min Heap extract min");
  
  if (heap.length === 0) {
    setStep("Heap is empty");
    return;
  }
  
  setStep(`Extracting min value: ${heap[0].value}`);
  heap[0].color = COLORS.TARGET;
  setData([...heap]);
  await sleep(speed, isCancelled);
  
  const min = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();
  
  setStep("Heapifying down from root");
  let i = 0;
  while (true) {
    if (isCancelled()) return;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let smallest = i;
    
    if (left < heap.length && Number(heap[left].value) < Number(heap[smallest].value)) {
      smallest = left;
    }
    if (right < heap.length && Number(heap[right].value) < Number(heap[smallest].value)) {
      smallest = right;
    }
    
    if (smallest !== i) {
      setStep(`Swapping heap[${i}] (${heap[i].value}) with heap[${smallest}] (${heap[smallest].value})`);
      heap[i].color = COLORS.ACTIVE;
      heap[smallest].color = COLORS.COMPARING;
      setData([...heap]);
      await sleep(speed / 2, isCancelled);
      
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    } else {
      break;
    }
  }
  
  heap.forEach(h => h.color = COLORS.SORTED);
  setData([...heap]);
  setStep(`Extracted min value: ${min.value}`);
};

export const heapBuild: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const n = arr.length;
  setStep(`Building Max Heap from array of ${n} elements`);
  
  for (let i = 0; i < n; i++) {
    setStep(`Processing element ${i}: value = ${arr[i].value}`);
    arr[i].color = COLORS.ACTIVE;
    setData([...arr]);
    await sleep(speed / 2, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  setStep("Heapifying from bottom up");
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (isCancelled()) return;
    setStep(`Heapifying subtree rooted at index ${i}`);
    
    let j = i;
    while (true) {
      const left = 2 * j + 1;
      const right = 2 * j + 2;
      let largest = j;
      
      if (left < n && Number(arr[left].value) > Number(arr[largest].value)) {
        largest = left;
      }
      if (right < n && Number(arr[right].value) > Number(arr[largest].value)) {
        largest = right;
      }
      
      if (largest !== j) {
        arr[j].color = COLORS.ACTIVE;
        arr[largest].color = COLORS.COMPARING;
        setData([...arr]);
        await sleep(speed / 2, isCancelled);
        
        [arr[j], arr[largest]] = [arr[largest], arr[j]];
        j = largest;
      } else {
        break;
      }
    }
  }
  
  arr.forEach(a => a.color = COLORS.SORTED);
  setData([...arr]);
  setStep("Max heap build completed");
};

export const heapSort: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const n = arr.length;
  setStep(`Starting Heap Sort on ${n} elements`);
  
  setStep("Building max heap");
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (isCancelled()) return;
    let j = i;
    while (true) {
      const left = 2 * j + 1;
      const right = 2 * j + 2;
      let largest = j;
      
      if (left < n && Number(arr[left].value) > Number(arr[largest].value)) {
        largest = left;
      }
      if (right < n && Number(arr[right].value) > Number(arr[largest].value)) {
        largest = right;
      }
      
      if (largest !== j) {
        [arr[j], arr[largest]] = [arr[largest], arr[j]];
        j = largest;
      } else {
        break;
      }
    }
  }
  
  setStep("Extracting elements from heap");
  for (let i = n - 1; i > 0; i--) {
    if (isCancelled()) return;
    setStep(`Moving max element to position ${i}`);
    
    arr[0].color = COLORS.ACTIVE;
    arr[i].color = COLORS.TARGET;
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    [arr[0], arr[i]] = [arr[i], arr[0]];
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
    
    let j = 0;
    while (true) {
      const left = 2 * j + 1;
      const right = 2 * j + 2;
      let largest = j;
      
      if (left < i && Number(arr[left].value) > Number(arr[largest].value)) {
        largest = left;
      }
      if (right < i && Number(arr[right].value) > Number(arr[largest].value)) {
        largest = right;
      }
      
      if (largest !== j) {
        arr[j].color = COLORS.ACTIVE;
        arr[largest].color = COLORS.COMPARING;
        setData([...arr]);
        await sleep(speed / 2, isCancelled);
        
        [arr[j], arr[largest]] = [arr[largest], arr[j]];
        j = largest;
      } else {
        break;
      }
    }
  }
  
  arr[0].color = COLORS.SORTED;
  setData([...arr]);
  setStep("Heap Sort completed");
};
