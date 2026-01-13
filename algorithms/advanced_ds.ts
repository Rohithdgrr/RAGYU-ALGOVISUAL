
import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const fenwick: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Fenwick Tree (Binary Indexed Tree) construction");
  for (let i = 1; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Building Fenwick tree at index ${i}`);
    nodes[i].color = COLORS.ACTIVE;
    const parent = i + (i & -i);
    if (parent < nodes.length) {
      nodes[parent].color = COLORS.COMPARING;
      nodes[parent].value = Number(nodes[parent].value) + Number(nodes[i].value);
    }
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
  setStep("Fenwick tree construction completed");
};

export const segmentTree: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const tree = [...data];
  setStep("Starting Segment Tree construction");
  for (let i = tree.length - 1; i > 0; i--) {
    if (isCancelled()) return;
    setStep(`Building segment tree node ${i}`);
    tree[i].color = COLORS.ACTIVE;
    setData([...tree]);
    await sleep(speed / 4, isCancelled);
    tree[i].color = COLORS.SORTED;
  }
  setStep("Segment tree construction completed");
};

export const dsu: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Disjoint Set Union (DSU) operations");
  for (let i = 0; i < nodes.length - 1; i++) {
    if (isCancelled()) return;
    setStep(`Processing set operation for node ${i}`);
    nodes[i].color = COLORS.ACTIVE;
    nodes[i+1].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].neighbors = [{ id: nodes[i+1].id }];
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
  }
  setStep("DSU operations completed");
};

export const avl: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting AVL Tree construction");
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Inserting node ${i} into AVL tree`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    if (Math.random() > 0.7) {
      setStep(`Performing rotation to balance AVL tree`);
      nodes[i].color = COLORS.COMPARING;
    }
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
  }
  setStep("AVL tree construction completed");
};
