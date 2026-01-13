import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const huffman: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Huffman Coding algorithm");
  while (nodes.length > 1) {
    if (isCancelled()) return;
    setStep(`Building Huffman tree with ${nodes.length} nodes`);
    nodes.sort((a, b) => Number(a.value) - Number(b.value));
    setData([...nodes]);
    await sleep(speed, isCancelled);

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
  setStep("Huffman coding completed");
};

export const fractionalKnapsack: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const items = [...data];
  setStep("Starting Fractional Knapsack problem");
  // items have value/weight ratio
  items.sort((a, b) => Number(b.value) - Number(a.value));
  setData([...items]);
  
  for (let i = 0; i < items.length; i++) {
    if (isCancelled()) return;
    setStep(`Adding item ${i} with value ${items[i].value}`);
    items[i].color = COLORS.ACTIVE;
    setData([...items]);
    await sleep(speed, isCancelled);
    
    items[i].color = COLORS.SORTED;
    setData([...items]);
  }
  setStep("Fractional knapsack completed");
};

export const activitySelection: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const activities = [...data];
  setStep("Starting Activity Selection problem");
  // Assume values are finish times
  activities.sort((a, b) => Number(a.value) - Number(b.value));
  setData([...activities]);
  
  let lastFinish = -1;
  for (let i = 0; i < activities.length; i++) {
    if (isCancelled()) return;
    setStep(`Checking activity ${i}`);
    activities[i].color = COLORS.COMPARING;
    setData([...activities]);
    await sleep(speed, isCancelled);
    
    if (Number(activities[i].value) > lastFinish) {
      setStep(`Activity ${i} selected`);
      activities[i].color = COLORS.SORTED;
      lastFinish = Number(activities[i].value);
    } else {
      activities[i].color = COLORS.TARGET;
    }
    setData([...activities]);
    await sleep(speed / 2, isCancelled);
  }
  setStep(`Activity selection completed: ${activities.filter(activity => activity.color === COLORS.SORTED).length} activities selected`);
};
