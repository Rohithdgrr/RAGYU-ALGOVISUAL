
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const knapsack: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  setStep("Starting 0/1 Knapsack problem");
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    setStep(`Processing item ${i + 1}`);
    grid[i].color = COLORS.ACTIVE;
    setData([...grid]);
    await sleep(speed / 4, isCancelled);
    grid[i].value = Math.floor(Math.random() * 50);
    grid[i].color = COLORS.SORTED;
  }
  setStep("Knapsack problem completed");
};

export const lcs: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  setStep("Starting Longest Common Subsequence");
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    setStep(`Computing LCS for position ${i}`);
    grid[i].color = COLORS.ACTIVE;
    setData([...grid]);
    await sleep(speed / 4, isCancelled);
    if (Math.random() > 0.5) grid[i].color = COLORS.SORTED;
  }
  setStep("LCS computation completed");
};

export const lis: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Longest Increasing Subsequence");
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Checking element ${i} for LIS`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
  setStep("LIS computation completed");
};

export const editDistance: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  setStep("Starting Edit Distance computation");
  for (let i = 0; i < grid.length; i++) {
    if (isCancelled()) return;
    setStep(`Computing edit distance for cell ${i}`);
    grid[i].color = COLORS.COMPARING;
    setData([...grid]);
    await sleep(speed / 8, isCancelled);
    grid[i].color = COLORS.DEFAULT;
  }
  setStep("Edit distance computation completed");
};

export const matrixChain: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  setStep("Starting Matrix Chain Multiplication");
  for (let len = 2; len < 5; len++) {
    setStep(`Processing chains of length ${len}`);
    for (let i = 0; i < grid.length - len; i++) {
       if (isCancelled()) return;
       setStep(`Computing optimal cost for matrices ${i} to ${i + len}`);
       grid[i].color = COLORS.HIGHLIGHT;
       setData([...grid]);
       await sleep(speed / 4, isCancelled);
    }
  }
  setStep("Matrix chain multiplication completed");
};

export const coinChange: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Coin Change problem");
  for (const n of nodes) {
    if (isCancelled()) return;
    setStep(`Processing coin with value ${n.value}`);
    n.color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 4, isCancelled);
    n.value = Number(n.value) + 1;
    n.color = COLORS.SORTED;
  }
  setStep("Coin change computation completed");
};

export const eggDropping: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  setStep("Starting Egg Dropping problem");
  for (let i = 0; i < grid.length; i += 5) {
    if (isCancelled()) return;
    setStep(`Testing with ${i} eggs`);
    grid[i].color = COLORS.TARGET;
    setData([...grid]);
    await sleep(speed, isCancelled);
    grid[i].color = COLORS.SORTED;
  }
  setStep("Egg dropping problem completed");
};

export const rodCutting: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const rods = [...data];
  const n = rods.length;
  const dp: number[] = new Array(n + 1).fill(0);
  setStep("Starting Rod Cutting problem");
  
  for (let i = 1; i <= n; i++) {
    if (isCancelled()) return;
    setStep(`Finding optimal cuts for rod of length ${i}`);
    rods[i - 1].color = COLORS.ACTIVE;
    setData([...rods]);
    await sleep(speed / 2, isCancelled);
    
    for (let j = 0; j < i; j++) {
      if (isCancelled()) return;
      setStep(`Checking cut at position ${j}`);
      rods[j].color = COLORS.COMPARING;
      setData([...rods]);
      await sleep(speed / 4, isCancelled);
      
      dp[i] = Math.max(dp[i], Number(rods[j].value) + dp[i - j - 1]);
      rods[j].color = COLORS.DEFAULT;
    }
    
    rods[i - 1].color = COLORS.SORTED;
    rods[i - 1].value = dp[i];
    setData([...rods]);
  }
  setStep("Rod cutting problem completed");
};

export const palindromePartitioning: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const n = nodes.length;
  setStep("Starting Palindrome Partitioning");
  
  for (let i = 0; i < n; i++) {
    if (isCancelled()) return;
    setStep(`Expanding palindrome from center ${i}`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    
    let left = i, right = i;
    while (left >= 0 && right < n) {
      if (isCancelled()) return;
      setStep(`Checking substring [${left}, ${right}]`);
      nodes[left].color = COLORS.COMPARING;
      nodes[right].color = COLORS.COMPARING;
      setData([...nodes]);
      await sleep(speed / 3, isCancelled);
      
      if (Math.random() > 0.5) {
        nodes[left].color = COLORS.SORTED;
        nodes[right].color = COLORS.SORTED;
      } else {
        nodes[left].color = COLORS.DEFAULT;
        nodes[right].color = COLORS.DEFAULT;
      }
      left--;
      right++;
    }
    
    nodes[i].color = COLORS.DEFAULT;
  }
  setStep("Palindrome partitioning completed");
};

export const longestPalindromicSubsequence: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const n = nodes.length;
  const dp: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  setStep("Starting Longest Palindromic Subsequence");
  
  for (let i = 0; i < n; i++) {
    if (isCancelled()) return;
    setStep(`Initializing LPS for single character at ${i}`);
    dp[i][i] = 1;
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
  }
  
  for (let len = 2; len <= n; len++) {
    setStep(`Processing subsequences of length ${len}`);
    for (let i = 0; i <= n - len; i++) {
      if (isCancelled()) return;
      const j = i + len - 1;
      
      setStep(`Checking substring [${i}, ${j}]`);
      nodes[i].color = COLORS.ACTIVE;
      nodes[j].color = COLORS.ACTIVE;
      setData([...nodes]);
      await sleep(speed / 3, isCancelled);
      
      if (String(nodes[i].value) === String(nodes[j].value)) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
        nodes[i].color = COLORS.SORTED;
        nodes[j].color = COLORS.SORTED;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        nodes[i].color = COLORS.COMPARING;
        nodes[j].color = COLORS.COMPARING;
      }
      
      setData([...nodes]);
      await sleep(speed / 4, isCancelled);
      nodes[i].color = COLORS.DEFAULT;
      nodes[j].color = COLORS.DEFAULT;
    }
  }
  setStep("LPS computation completed");
};

export const maxSubarraySum: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let maxSum = -Infinity;
  let currentSum = 0;
  setStep("Starting Max Subarray Sum (Kadane's Algorithm)");
  
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Processing element ${i}: value = ${nodes[i].value}`);
    
    currentSum = Math.max(Number(nodes[i].value), currentSum + Number(nodes[i].value));
    maxSum = Math.max(maxSum, currentSum);
    
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    if (currentSum === maxSum) {
      setStep(`New max sum found: ${maxSum}`);
      nodes[i].color = COLORS.SORTED;
      nodes[i].value = maxSum;
    } else if (currentSum < 0) {
      setStep(`Resetting current sum to 0`);
      nodes[i].color = COLORS.TARGET;
    } else {
      nodes[i].color = COLORS.HIGHLIGHT;
    }
    
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
  }
  setStep(`Max subarray sum: ${maxSum}`);
};

export const uniquePaths: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  const rows = Math.floor(Math.sqrt(grid.length));
  const cols = Math.floor(grid.length / rows);
  setStep(`Starting Unique Paths for ${rows}x${cols} grid`);
  
  for (let i = 0; i < rows; i++) {
    if (isCancelled()) return;
    setStep(`Processing row ${i}`);
    for (let j = 0; j < cols; j++) {
      if (isCancelled()) return;
      const idx = i * cols + j;
      
      if (i === 0 || j === 0) {
        setStep(`Cell [${i}, ${j}] has 1 path (boundary)`);
        grid[idx].color = COLORS.SORTED;
        grid[idx].value = 1;
      } else {
        setStep(`Computing paths for cell [${i}, ${j}]`);
        grid[idx].color = COLORS.ACTIVE;
        setData([...grid]);
        await sleep(speed / 3, isCancelled);
        
        const upIdx = (i - 1) * cols + j;
        const leftIdx = i * cols + (j - 1);
        grid[idx].value = Number(grid[upIdx].value) + Number(grid[leftIdx].value);
        grid[idx].color = COLORS.SORTED;
      }
      
      setData([...grid]);
      await sleep(speed / 4, isCancelled);
    }
  }
  setStep("Unique paths computation completed");
};
