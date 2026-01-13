
import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const reverse: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let prev = null;
  let curr: any = nodes[0];
  setStep("Starting iterative Linked List reversal.");
  
  while (curr) {
    if (isCancelled()) return;
    const currIdx = nodes.findIndex(n => n.id === curr.id);
    setStep(`Currently at node: ${curr.value}. Holding reference to previous: ${prev?.value || 'null'}`);
    nodes[currIdx].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    const nextId = curr.neighbors?.[0]?.id;
    const next = nextId !== undefined ? nodes.find(n => n.id === nextId) : null;

    setStep(`Reversing pointer of node ${curr.value} to point back to ${prev?.value || 'null'}`);
    nodes[currIdx].neighbors = prev ? [{ id: prev.id }] : [];
    nodes[currIdx].color = COLORS.SORTED;
    
    prev = curr;
    curr = next;
    
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
  setStep("Linked List has been fully reversed.");
};

export const detectCycle: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let slow: any = nodes[0];
  let fast: any = nodes[0];
  setStep("Starting Floyd's Cycle Detection (Tortoise and Hare).");

  while (fast && fast.neighbors?.[0]) {
    if (isCancelled()) return;
    
    const slowIdx = nodes.findIndex(n => n.id === slow.id);
    const fastIdx = nodes.findIndex(n => n.id === fast.id);
    setStep(`Slow moving to ${slow.value}, Fast jumping ahead.`);
    
    nodes[slowIdx].color = COLORS.ACTIVE;
    nodes[fastIdx].color = COLORS.TARGET;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    nodes[slowIdx].color = COLORS.DEFAULT;
    nodes[fastIdx].color = COLORS.DEFAULT;

    const nextSlowId = slow.neighbors?.[0]?.id;
    slow = nodes.find(n => n.id === nextSlowId);
    
    const nextFastId = fast.neighbors[0].id;
    const nextFast = nodes.find(n => n.id === nextFastId);
    const jumpId = nextFast?.neighbors?.[0]?.id;
    fast = jumpId !== undefined ? nodes.find(n => n.id === jumpId) : null;

    if (slow && fast && slow.id === fast.id) {
      setStep("Cycle Detected! Slow and Fast pointers have met.");
      const idx = nodes.findIndex(n => n.id === slow.id);
      nodes[idx].color = COLORS.SORTED;
      nodes[idx].value = "CYCLE!";
      setData([...nodes]);
      return;
    }
  }
  setStep("No cycle detected. Fast pointer reached the end of the list.");
};

export const findMiddle: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let slow: any = nodes[0];
  let fast: any = nodes[0];
  setStep("Finding the middle node using Slow/Fast pointers.");

  while (fast && fast.neighbors?.[0]) {
    if (isCancelled()) return;
    const slowIdx = nodes.findIndex(n => n.id === slow.id);
    const fastIdx = nodes.findIndex(n => n.id === fast.id);
    setStep(`Fast pointer at ${fast.value}, Slow pointer at ${slow.value}.`);
    
    nodes[slowIdx].color = COLORS.ACTIVE;
    nodes[fastIdx].color = COLORS.TARGET;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    nodes[slowIdx].color = COLORS.DEFAULT;
    nodes[fastIdx].color = COLORS.DEFAULT;

    slow = nodes.find(n => n.id === slow.neighbors[0].id);
    const nextFast = nodes.find(n => n.id === fast.neighbors[0].id);
    fast = nextFast?.neighbors?.[0] ? nodes.find(n => n.id === nextFast.neighbors[0].id) : null;
  }
  
  const midIdx = nodes.findIndex(n => n.id === slow.id);
  setStep(`Success! The middle node is ${slow.value}.`);
  nodes[midIdx].color = COLORS.SORTED;
  nodes[midIdx].value = "MID";
  setData([...nodes]);
};

export const mergeSorted: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const list1 = nodes.filter(n => n.id.toString().startsWith('L1'));
  const list2 = nodes.filter(n => n.id.toString().startsWith('L2'));
  setStep("Merging two sorted Linked Lists.");
  
  let i = 0, j = 0;
  while (i < list1.length || j < list2.length) {
    if (isCancelled()) return;
    
    if (i < list1.length) list1[i].color = COLORS.ACTIVE;
    if (j < list2.length) list2[j].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    if (j >= list2.length || (i < list1.length && Number(list1[i].value) <= Number(list2[j].value))) {
      setStep(`List 1 value ${list1[i].value} is smaller/equal. Merging into result.`);
      list1[i].color = COLORS.SORTED;
      i++;
    } else {
      setStep(`List 2 value ${list2[j].value} is smaller. Merging into result.`);
      list2[j].color = COLORS.SORTED;
      j++;
    }
    setData([...nodes]);
    await sleep(speed / 2);
  }
};

export const palindrome: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const n = nodes.length;
  setStep("Checking if Linked List is a palindrome using two pointers.");
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (isCancelled()) return;
    setStep(`Comparing values at symmetric positions: ${nodes[i].value} and ${nodes[n - 1 - i].value}`);
    nodes[i].color = COLORS.COMPARING;
    nodes[n - 1 - i].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed, isCancelled);

    if (nodes[i].value === nodes[n - 1 - i].value) {
      setStep("Values match. Proceeding...");
      nodes[i].color = COLORS.SORTED;
      nodes[n - 1 - i].color = COLORS.SORTED;
    } else {
      setStep("Mismatch found! Not a palindrome.");
      nodes[i].color = COLORS.TARGET;
      nodes[n - 1 - i].color = COLORS.TARGET;
      setData([...nodes]);
      return;
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
  setStep("Full match! The list is a palindrome.");
};
