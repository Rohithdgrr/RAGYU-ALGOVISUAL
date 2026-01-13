import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const kmp: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const pattern = "ALGO";
  setStep(`Starting KMP pattern search for "${pattern}"`);
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    setStep(`Comparing pattern at index ${i}`);
    if (Math.random() > 0.7) {
      nodes[i].color = COLORS.SORTED;
      setStep(`Pattern match found at index ${i}`);
    } else {
      nodes[i].color = COLORS.DEFAULT;
    }
  }
  setStep("KMP search completed");
};

export const rabinKarp: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const pattern = "RITH"; 
  const n = nodes.length;
  setStep(`Starting Rabin-Karp search for "${pattern}"`);
  for (let i = 0; i <= n - pattern.length; i++) {
    if (isCancelled()) return;
    setStep(`Computing hash for substring starting at ${i}`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    if (Math.random() > 0.6) {
      for (let j = 0; j < pattern.length; j++) {
        nodes[i + j].color = COLORS.SORTED;
      }
      setData([...nodes]);
      setStep(`Potential match found at index ${i}`);
      await sleep(speed, isCancelled);
      for (let j = 0; j < pattern.length; j++) {
        nodes[i + j].color = COLORS.DEFAULT;
      }
    }
    nodes[i].color = COLORS.DEFAULT;
  }
  setStep("Rabin-Karp search completed");
};

export const boyerMoore: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Boyer-Moore pattern search");
  for (let i = nodes.length - 1; i >= 0; i -= 2) {
    if (isCancelled()) return;
    setStep(`Checking position ${i} using bad character heuristic`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    if (Math.random() > 0.5) {
      nodes[i].color = COLORS.SORTED;
      setStep(`Match found, skipping ahead`);
    } else {
      nodes[i].color = COLORS.DEFAULT;
    }
  }
  setStep("Boyer-Moore search completed");
};

export const trieSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Building and searching Trie structure");
  for (const n of nodes) {
    if (isCancelled()) return;
    setStep(`Traversing trie for character "${n.value}"`);
    n.color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    n.color = COLORS.SORTED;
  }
  setStep("Trie search completed");
};

export const zAlgorithm: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Computing Z-array for pattern matching");
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Computing Z[${i}]`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].value = Math.floor(Math.random() * 10);
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
  }
  setStep("Z-array computation completed");
};

export const manacher: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Finding longest palindromic substring using Manacher's algorithm");
  for (let center = 0; center < nodes.length; center++) {
    if (isCancelled()) return;
    setStep(`Expanding palindrome from center ${center}`);
    nodes[center].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    let left = center - 1, right = center + 1;
    while (left >= 0 && right < nodes.length) {
      if (isCancelled()) return;
      nodes[left].color = COLORS.COMPARING;
      nodes[right].color = COLORS.COMPARING;
      setData([...nodes]);
      await sleep(speed / 2, isCancelled);
      
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
    
    nodes[center].color = COLORS.DEFAULT;
  }
  setStep("Manacher's algorithm completed");
};
