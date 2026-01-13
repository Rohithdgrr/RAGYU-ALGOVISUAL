import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

// Stack Push
export const stackPush: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const value = arr[arr.length - 1]?.value || 10;
  
  setStep(`Pushing ${value} onto stack`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const newNode: NodeData = {
    id: arr.length,
    value,
    color: COLORS.ACTIVE,
    neighbors: []
  };
  
  arr.push(newNode);
  setStep(`Pushed ${value} - Stack size: ${arr.length}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  newNode.color = COLORS.DEFAULT;
  setData([...arr]);
  setStep('Push complete!');
};

// Stack Pop
export const stackPop: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  if (arr.length === 0) {
    setStep('Stack is empty - cannot pop');
    return;
  }
  
  setStep('Popping from stack');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const popped = arr[arr.length - 1];
  popped.color = COLORS.TARGET;
  setStep(`Popped ${popped.value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  arr.pop();
  setStep(`Stack size: ${arr.length}`);
  setData([...arr]);
  setStep('Pop complete!');
};

// Stack Peek
export const stackPeek: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  if (arr.length === 0) {
    setStep('Stack is empty');
    return;
  }
  
  setStep('Peeking at top of stack');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const top = arr[arr.length - 1];
  top.color = COLORS.ACTIVE;
  setStep(`Top element: ${top.value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  top.color = COLORS.DEFAULT;
  setData([...arr]);
  setStep('Peek complete!');
};

// Stack IsEmpty
export const stackIsEmpty: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Checking if stack is empty');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const isEmpty = arr.length === 0;
  setStep(`Stack is ${isEmpty ? 'empty' : 'not empty'}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  if (isEmpty) {
    arr.forEach(node => node.color = COLORS.SORTED);
  }
  setData([...arr]);
};

// Stack Size
export const stackSize: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Getting stack size');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Counting element ${i + 1}: ${arr[i].value}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep(`Stack size: ${arr.length}`);
  setData([...arr]);
};

// Queue Enqueue
export const queueEnqueue: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const value = arr[arr.length - 1]?.value || 10;
  
  setStep(`Enqueueing ${value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const newNode: NodeData = {
    id: arr.length,
    value,
    color: COLORS.ACTIVE,
    neighbors: []
  };
  
  arr.push(newNode);
  setStep(`Enqueued ${value} - Queue size: ${arr.length}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  newNode.color = COLORS.DEFAULT;
  setData([...arr]);
  setStep('Enqueue complete!');
};

// Queue Dequeue
export const queueDequeue: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  if (arr.length === 0) {
    setStep('Queue is empty - cannot dequeue');
    return;
  }
  
  setStep('Dequeueing from front');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const front = arr[0];
  front.color = COLORS.TARGET;
  setStep(`Dequeued ${front.value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  arr.shift();
  setStep(`Queue size: ${arr.length}`);
  setData([...arr]);
  setStep('Dequeue complete!');
};

// Queue Peek
export const queuePeek: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  if (arr.length === 0) {
    setStep('Queue is empty');
    return;
  }
  
  setStep('Peeking at front of queue');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const front = arr[0];
  front.color = COLORS.ACTIVE;
  setStep(`Front element: ${front.value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  front.color = COLORS.DEFAULT;
  setData([...arr]);
  setStep('Peek complete!');
};

// Queue IsEmpty
export const queueIsEmpty: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Checking if queue is empty');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const isEmpty = arr.length === 0;
  setStep(`Queue is ${isEmpty ? 'empty' : 'not empty'}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  if (isEmpty) {
    arr.forEach(node => node.color = COLORS.SORTED);
  }
  setData([...arr]);
};

// Two Pointers - Two Sum
export const twoPointers: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const values = arr.map(d => Number(d.value));
  const target = values[values.length - 1] || 10;
  
  setStep(`Two Pointers: Finding pair that sums to ${target}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let left = 0;
  let right = values.length - 2;
  
  while (left < right) {
    if (isCancelled()) return;
    
    arr[left].color = COLORS.ACTIVE;
    arr[right].color = COLORS.ACTIVE;
    setStep(`Checking ${values[left]} + ${values[right]} = ${values[left] + values[right]}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const sum = values[left] + values[right];
    if (sum === target) {
      arr[left].color = COLORS.TARGET;
      arr[right].color = COLORS.TARGET;
      setStep(`Found! ${values[left]} + ${values[right]} = ${target}`);
      setData([...arr]);
      return;
    } else if (sum < target) {
      arr[left].color = COLORS.DEFAULT;
      left++;
      setStep('Sum too small, move left pointer right');
    } else {
      arr[right].color = COLORS.DEFAULT;
      right--;
      setStep('Sum too large, move right pointer left');
    }
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
  
  setStep('No pair found');
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};

// Slow Fast Pointers - Cycle Detection
export const slowFastPointers: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Slow Fast Pointers: Detecting cycle');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let slow = 0;
  let fast = 0;
  let hasCycle = false;
  
  for (let i = 0; i < arr.length * 2; i++) {
    if (isCancelled()) return;
    
    slow = (slow + 1) % arr.length;
    fast = (fast + 2) % arr.length;
    
    arr[slow].color = COLORS.ACTIVE;
    arr[fast].color = COLORS.COMPARING;
    setStep(`Slow at ${slow}, Fast at ${fast}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (slow === fast) {
      hasCycle = true;
      arr[slow].color = COLORS.TARGET;
      setStep('Cycle detected! Slow and Fast pointers met');
      setData([...arr]);
      return;
    }
    
    arr[slow].color = COLORS.DEFAULT;
    arr[fast].color = COLORS.DEFAULT;
  }
  
  setStep('No cycle detected');
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};

// Subarray - Maximum Subarray Sum (Kadane's Algorithm)
export const maxSubarraySum: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const values = arr.map(d => Number(d.value));
  
  setStep('Maximum Subarray Sum (Kadane\'s Algorithm)');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let maxSum = values[0];
  let currentSum = values[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;
  
  arr[0].color = COLORS.ACTIVE;
  setStep(`Initial max sum: ${maxSum}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 1; i < values.length; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    setStep(`Processing ${values[i]}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (currentSum + values[i] > values[i]) {
      currentSum += values[i];
      setStep(`Extended subarray: current sum = ${currentSum}`);
    } else {
      currentSum = values[i];
      tempStart = i;
      setStep(`Started new subarray at ${i}: current sum = ${currentSum}`);
    }
    
    if (currentSum > maxSum) {
      maxSum = currentSum;
      start = tempStart;
      end = i;
      setStep(`New max sum: ${maxSum} from index ${start} to ${end}`);
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  for (let i = start; i <= end; i++) {
    arr[i].color = COLORS.TARGET;
  }
  setStep(`Maximum subarray sum: ${maxSum}`);
  setData([...arr]);
};

// Sliding Window - Fixed Size
export const slidingWindow: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const values = arr.map(d => Number(d.value));
  const k = Math.min(3, values.length);
  
  setStep(`Sliding Window: Finding max in window of size ${k}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let maxSum = 0;
  
  for (let i = 0; i < k; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    maxSum += values[i];
    setStep(`Initial window sum: ${maxSum}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
  
  let windowSum = maxSum;
  
  for (let i = k; i < values.length; i++) {
    if (isCancelled()) return;
    
    arr[i - k].color = COLORS.DEFAULT;
    arr[i].color = COLORS.ACTIVE;
    
    windowSum += values[i] - values[i - k];
    setStep(`Sliding window: removed ${values[i - k]}, added ${values[i]}, sum = ${windowSum}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (windowSum > maxSum) {
      maxSum = windowSum;
      setStep(`New max sum: ${maxSum}`);
    }
  }
  
  setStep(`Maximum window sum: ${maxSum}`);
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};

// Substring - Longest Substring Without Repeating Characters
export const longestSubstring: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const chars = arr.map(d => String(d.value));
  
  setStep('Longest Substring Without Repeating Characters');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let maxLength = 0;
  let start = 0;
  const charIndex: Record<string, number> = {};
  
  for (let i = 0; i < chars.length; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    setStep(`Processing character '${chars[i]}' at index ${i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (chars[i] in charIndex && charIndex[chars[i]] >= start) {
      start = charIndex[chars[i]] + 1;
      setStep(`Found duplicate '${chars[i]}', moving start to ${start}`);
    }
    
    charIndex[chars[i]] = i;
    const currentLength = i - start + 1;
    
    if (currentLength > maxLength) {
      maxLength = currentLength;
      setStep(`New longest substring length: ${maxLength}`);
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  setStep(`Longest substring without repeating characters: ${maxLength}`);
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};

// Substring - Pattern Matching (Naive)
export const patternMatching: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const text = arr.map(d => String(d.value)).join('');
  const pattern = arr.slice(0, 3).map(d => String(d.value)).join('');
  
  setStep(`Pattern Matching: Finding "${pattern}" in text`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const n = text.length;
  const m = pattern.length;
  
  for (let i = 0; i <= n - m; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    setStep(`Checking starting at index ${i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      arr[i + j].color = COLORS.COMPARING;
      setStep(`Matched '${text[i + j]}' at position ${j}`);
      setData([...arr]);
      await sleep(speed, isCancelled);
      j++;
    }
    
    if (j === m) {
      for (let k = i; k < i + m; k++) {
        arr[k].color = COLORS.TARGET;
      }
      setStep(`Pattern found at index ${i}!`);
      setData([...arr]);
      return;
    }
    
    for (let k = i; k <= i + j; k++) {
      arr[k].color = COLORS.DEFAULT;
    }
  }
  
  setStep('Pattern not found');
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};

// Interval - Merge Intervals
export const mergeIntervals: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const intervals = arr.map(d => {
    const val = Number(d.value);
    return { start: val, end: val + 1 };
  });
  
  setStep('Merge Intervals');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  intervals.sort((a, b) => a.start - b.start);
  setStep('Sorted intervals by start time');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const merged: { start: number; end: number }[] = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    setStep(`Checking interval [${intervals[i].start}, ${intervals[i].end}]`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const last = merged[merged.length - 1];
    
    if (intervals[i].start <= last.end) {
      last.end = Math.max(last.end, intervals[i].end);
      setStep(`Merged with [${last.start}, ${last.end}]`);
    } else {
      merged.push(intervals[i]);
      setStep(`Added new interval`);
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.DEFAULT;
  }
  
  setStep(`Merged ${intervals.length} intervals into ${merged.length}`);
  arr.forEach(node => node.color = COLORS.SORTED);
  setData([...arr]);
};

// Interval - Insert Interval
export const insertInterval: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const intervals = arr.slice(0, -1).map(d => {
    const val = Number(d.value);
    return { start: val, end: val + 1 };
  });
  const newInterval = { start: 2, end: 5 };
  
  setStep(`Insert Interval: [${newInterval.start}, ${newInterval.end}]`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const result: { start: number; end: number }[] = [];
  let i = 0;
  
  while (i < intervals.length && intervals[i].end < newInterval.start) {
    if (isCancelled()) return;
    result.push(intervals[i]);
    arr[i].color = COLORS.SORTED;
    setStep(`Added [${intervals[i].start}, ${intervals[i].end}]`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    i++;
  }
  
  while (i < intervals.length && intervals[i].start <= newInterval.end) {
    if (isCancelled()) return;
    newInterval.start = Math.min(newInterval.start, intervals[i].start);
    newInterval.end = Math.max(newInterval.end, intervals[i].end);
    arr[i].color = COLORS.ACTIVE;
    setStep(`Merging with [${intervals[i].start}, ${intervals[i].end}]`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    i++;
  }
  
  result.push(newInterval);
  setStep(`Inserted [${newInterval.start}, ${newInterval.end}]`);
  
  while (i < intervals.length) {
    if (isCancelled()) return;
    result.push(intervals[i]);
    arr[i].color = COLORS.SORTED;
    i++;
  }
  
  setStep(`Inserted interval, total: ${result.length}`);
  arr.forEach(node => node.color = COLORS.SORTED);
  setData([...arr]);
};

// Interval - Interval Intersection
export const intervalIntersection: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const mid = Math.floor(arr.length / 2);
  const list1 = arr.slice(0, mid).map(d => {
    const val = Number(d.value);
    return { start: val, end: val + 1 };
  });
  const list2 = arr.slice(mid).map(d => {
    const val = Number(d.value);
    return { start: val, end: val + 1 };
  });
  
  setStep('Interval Intersection');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const result: { start: number; end: number }[] = [];
  let i = 0, j = 0;
  
  while (i < list1.length && j < list2.length) {
    if (isCancelled()) return;
    
    arr[i].color = COLORS.ACTIVE;
    arr[mid + j].color = COLORS.ACTIVE;
    setStep(`Checking [${list1[i].start}, ${list1[i].end}] and [${list2[j].start}, ${list2[j].end}]`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const start = Math.max(list1[i].start, list2[j].start);
    const end = Math.min(list1[i].end, list2[j].end);
    
    if (start <= end) {
      result.push({ start, end });
      setStep(`Intersection: [${start}, ${end}]`);
    }
    
    if (list1[i].end < list2[j].end) {
      i++;
    } else {
      j++;
    }
    
    setData([...arr]);
    await sleep(speed, isCancelled);
    if (i < arr.length) arr[i].color = COLORS.DEFAULT;
    if (mid + j < arr.length) arr[mid + j].color = COLORS.DEFAULT;
  }
  
  setStep(`Found ${result.length} intersections`);
  arr.forEach(node => node.color = COLORS.DEFAULT);
  setData([...arr]);
};
