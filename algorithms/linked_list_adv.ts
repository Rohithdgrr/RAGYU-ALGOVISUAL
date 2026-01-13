import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

// Remove Duplicates from Linked List
export const removeDuplicates: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Removing duplicates from linked list');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let writeIndex = 1;
  for (let i = 1; i < arr.length; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Checking ${arr[i].value}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (arr[i].value !== arr[i - 1].value) {
      arr[writeIndex].value = arr[i].value;
      arr[writeIndex].color = COLORS.SORTED;
      writeIndex++;
      setStep(`Kept ${arr[i].value}`);
      setData([...arr]);
      await sleep(speed, isCancelled);
    } else {
      arr[i].color = COLORS.TARGET;
      setStep(`Duplicate ${arr[i].value} removed`);
      setData([...arr]);
      await sleep(speed, isCancelled);
    }
    arr[i].color = COLORS.DEFAULT;
  }
  
  // Remove remaining elements
  for (let i = writeIndex; i < arr.length; i++) {
    arr[i].color = COLORS.DEFAULT;
  }
  
  setData([...arr]);
  setStep('Duplicates removed!');
};

// Remove Nth From End
export const removeNthFromEnd: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const n = 2;
  
  setStep(`Removing ${n}th node from end`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const targetIndex = arr.length - n;
  setStep(`Target index: ${targetIndex}`);
  arr[targetIndex].color = COLORS.TARGET;
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = targetIndex; i < arr.length - 1; i++) {
    if (isCancelled()) return;
    arr[i].value = arr[i + 1].value;
    arr[i].color = COLORS.ACTIVE;
    arr[i + 1].color = COLORS.COMPARING;
    setStep(`Moved ${arr[i + 1].value} to position ${i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  arr[arr.length - 1].color = COLORS.DEFAULT;
  setData([...arr]);
  setStep('Node removed!');
};

// Add Two Numbers (Linked List)
export const addTwoNumbers: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const mid = Math.ceil(arr.length / 2);
  const arr1 = arr.slice(0, mid);
  const arr2 = arr.slice(mid);
  
  setStep('Adding two numbers represented by linked lists');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const result: NodeData[] = [];
  let carry = 0;
  
  let i = 0;
  while (i < arr1.length || i < arr2.length || carry > 0) {
    if (isCancelled()) return;
    
    const val1 = Number(arr1[i]?.value || 0);
    const val2 = Number(arr2[i]?.value || 0);
    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    
    result.push({
      id: i,
      value: sum % 10,
      color: COLORS.ACTIVE,
      neighbors: []
    });
    
    setStep(`Sum: ${val1} + ${val2} + ${carry} = ${sum}, Carry: ${carry}, Result: ${sum % 10}`);
    setData([...result]);
    await sleep(speed, isCancelled);
    
    result[i].color = COLORS.DEFAULT;
    i++;
  }
  
  setStep('Addition complete!');
};

// Swap Nodes in Pairs
export const swapNodesPairs: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Swapping nodes in pairs');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    arr[i + 1].color = COLORS.ACTIVE;
    setStep(`Swapping positions ${i} and ${i + 1}: ${arr[i].value} <-> ${arr[i + 1].value}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const temp = arr[i].value;
    arr[i].value = arr[i + 1].value;
    arr[i + 1].value = temp;
    
    arr[i].color = COLORS.SORTED;
    arr[i + 1].color = COLORS.SORTED;
    setStep('Swapped');
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.DEFAULT;
    arr[i + 1].color = COLORS.DEFAULT;
  }
  
  setStep('Swap complete!');
};

// Rotate List
export const rotateList: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const k = 2;
  
  setStep(`Rotating list by ${k} positions`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const n = arr.length;
  const effectiveK = k % n;
  
  setStep(`Effective rotation: ${effectiveK}`);
  await sleep(speed, isCancelled);
  
  // Reverse entire array
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    arr[n - 1 - i].color = COLORS.ACTIVE;
    setStep(`Reversing positions ${i} and ${n - 1 - i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const temp = arr[i].value;
    arr[i].value = arr[n - 1 - i].value;
    arr[n - 1 - i].value = temp;
    
    arr[i].color = COLORS.SORTED;
    arr[n - 1 - i].color = COLORS.SORTED;
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.DEFAULT;
    arr[n - 1 - i].color = COLORS.DEFAULT;
  }
  
  // Reverse first k elements
  for (let i = 0; i < Math.floor(effectiveK / 2); i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    arr[effectiveK - 1 - i].color = COLORS.ACTIVE;
    setStep(`Reversing first ${effectiveK} elements`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const temp = arr[i].value;
    arr[i].value = arr[effectiveK - 1 - i].value;
    arr[effectiveK - 1 - i].value = temp;
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.DEFAULT;
    arr[effectiveK - 1 - i].color = COLORS.DEFAULT;
  }
  
  // Reverse remaining elements
  for (let i = effectiveK; i < Math.floor((n + effectiveK) / 2); i++) {
    if (isCancelled()) return;
    const j = n - 1 - (i - effectiveK);
    arr[i].color = COLORS.ACTIVE;
    arr[j].color = COLORS.ACTIVE;
    setStep(`Reversing remaining elements`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const temp = arr[i].value;
    arr[i].value = arr[j].value;
    arr[j].value = temp;
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.DEFAULT;
    arr[j].color = COLORS.DEFAULT;
  }
  
  setStep('Rotation complete!');
};
