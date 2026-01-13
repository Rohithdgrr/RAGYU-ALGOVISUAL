import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const preorder: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Pre-order Traversal: Root -> Left -> Right");

  const traverse = async (idx: number) => {
    if (idx >= nodes.length || isCancelled()) return;
    
    nodes[idx].color = COLORS.ACTIVE;
    setStep(`Visiting Node ${nodes[idx].value}`);
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    nodes[idx].color = COLORS.SORTED;
    setData([...nodes]);

    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    
    await traverse(left);
    await traverse(right);
  };
  await traverse(0);
};

export const inorder: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting In-order Traversal: Left -> Root -> Right");

  const traverse = async (idx: number) => {
    if (idx >= nodes.length || isCancelled()) return;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    
    await traverse(left);
    
    nodes[idx].color = COLORS.ACTIVE;
    setStep(`Visiting Node ${nodes[idx].value}`);
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[idx].color = COLORS.SORTED;
    setData([...nodes]);

    await traverse(right);
  };
  await traverse(0);
};

export const postorder: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Post-order Traversal: Left -> Right -> Root");

  const traverse = async (idx: number) => {
    if (idx >= nodes.length || isCancelled()) return;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    
    await traverse(left);
    await traverse(right);
    
    nodes[idx].color = COLORS.ACTIVE;
    setStep(`Visiting Node ${nodes[idx].value}`);
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[idx].color = COLORS.SORTED;
    setData([...nodes]);
  };
  await traverse(0);
};

export const levelorder: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Level-order Traversal using a Queue.");
  const queue = [0];
  
  while (queue.length > 0) {
    if (isCancelled()) return;
    const curr = queue.shift()!;
    if (curr >= nodes.length) continue;
    
    nodes[curr].color = COLORS.ACTIVE;
    setStep(`Visiting Node ${nodes[curr].value} at current level.`);
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    nodes[curr].color = COLORS.SORTED;
    
    const left = 2 * curr + 1;
    const right = 2 * curr + 2;
    if (left < nodes.length) queue.push(left);
    if (right < nodes.length) queue.push(right);
    
    setData([...nodes]);
  }
};