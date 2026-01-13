
import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const huffman: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const nodes = [...data];
  // Sort by value (frequency)
  nodes.sort((a, b) => Number(a.value) - Number(b.value));
  setData([...nodes]);
  await sleep(speed, isCancelled);

  while (nodes.length > 1) {
    if (isCancelled()) return;
    
    // Pick two smallest
    const n1 = nodes.shift()!;
    const n2 = nodes.shift()!;
    n1.color = COLORS.ACTIVE;
    n2.color = COLORS.ACTIVE;
    setData([...nodes, n1, n2]);
    await sleep(speed, isCancelled);

    // Create internal node
    const newNode: NodeData = {
      id: `H-${Date.now()}-${Math.random()}`,
      value: Number(n1.value) + Number(n2.value),
      color: COLORS.SORTED,
      neighbors: [{ id: n1.id }, { id: n2.id }]
    };
    
    nodes.push(newNode);
    nodes.sort((a, b) => Number(a.value) - Number(b.value));
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
};

export const fractionalKnapsack: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const items = [...data];
  // items have value/weight ratio
  items.sort((a, b) => Number(b.value) - Number(a.value));
  setData([...items]);
  
  for (let i = 0; i < items.length; i++) {
    if (isCancelled()) return;
    items[i].color = COLORS.ACTIVE;
    setData([...items]);
    await sleep(speed, isCancelled);
    
    items[i].color = COLORS.SORTED;
    setData([...items]);
  }
};

export const activitySelection: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const activities = [...data];
  // Assume values are finish times
  activities.sort((a, b) => Number(a.value) - Number(b.value));
  setData([...activities]);
  
  let lastFinish = -1;
  for (let i = 0; i < activities.length; i++) {
    if (isCancelled()) return;
    activities[i].color = COLORS.COMPARING;
    setData([...activities]);
    await sleep(speed, isCancelled);
    
    if (Number(activities[i].value) > lastFinish) {
      activities[i].color = COLORS.SORTED;
      lastFinish = Number(activities[i].value);
    } else {
      activities[i].color = COLORS.TARGET;
    }
    setData([...activities]);
    await sleep(speed / 2, isCancelled);
  }
};
