import { NodeData } from '../types.ts';
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

// BST Insert
export const bstInsert: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const values = [5, 3, 7, 1, 4, 6, 8];
  
  setStep('Building BST from values');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (const value of values) {
    if (isCancelled()) return;
    const newNode: NodeData = {
      id: arr.length,
      value,
      color: COLORS.ACTIVE,
      neighbors: []
    };
    arr.push(newNode);
    setStep(`Inserted ${value} into BST`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    newNode.color = COLORS.DEFAULT;
  }
  
  setStep('BST construction complete!');
};

// BST Delete
export const bstDelete: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const target = 3;
  
  setStep(`Deleting ${target} from BST`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const index = arr.findIndex(node => node.value === target);
  if (index !== -1) {
    arr[index].color = COLORS.TARGET;
    setStep(`Found ${target} at index ${index}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    for (let i = index; i < arr.length - 1; i++) {
      if (isCancelled()) return;
      arr[i].value = arr[i + 1].value;
      arr[i].color = COLORS.ACTIVE;
      arr[i + 1].color = COLORS.COMPARING;
      setStep(`Shifted element from ${i + 1} to ${i}`);
      setData([...arr]);
      await sleep(speed, isCancelled);
      arr[i].color = COLORS.DEFAULT;
    }
    
    arr.pop();
    setStep(`Deleted ${target}`);
    setData([...arr]);
  }
  
  setStep('BST delete complete!');
};

// Tree Rotation
export const treeRotation: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Performing tree rotation');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    arr[i + 1].color = COLORS.ACTIVE;
    setStep(`Rotating at index ${i}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    const temp = arr[i].value;
    arr[i].value = arr[i + 1].value;
    arr[i + 1].value = temp;
    
    arr[i].color = COLORS.SORTED;
    arr[i + 1].color = COLORS.SORTED;
    setStep('Rotated');
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    arr[i].color = COLORS.DEFAULT;
    arr[i + 1].color = COLORS.DEFAULT;
  }
  
  setStep('Tree rotation complete!');
};

// BST Search
export const bstSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data].sort((a, b) => Number(a.value) - Number(b.value));
  const target = Number(arr[Math.floor(arr.length / 2)].value);
  
  setStep(`Searching for ${target} in BST`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    if (isCancelled()) return;
    const mid = Math.floor((left + right) / 2);
    arr[mid].color = COLORS.ACTIVE;
    setStep(`Checking ${arr[mid].value} at index ${mid}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (Number(arr[mid].value) === target) {
      arr[mid].color = COLORS.TARGET;
      setStep(`Found ${target}!`);
      setData([...arr]);
      return;
    } else if (Number(arr[mid].value) < target) {
      arr[mid].color = COLORS.DEFAULT;
      left = mid + 1;
      setStep('Go right');
    } else {
      arr[mid].color = COLORS.DEFAULT;
      right = mid - 1;
      setStep('Go left');
    }
    setData([...arr]);
    await sleep(speed, isCancelled);
  }
  
  setStep('Target not found');
};

// Tree Height
export const treeHeight: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Calculating tree height');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const levels = Math.ceil(Math.log2(arr.length + 1));
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Node ${arr[i].value} at level ${Math.floor(Math.log2(i + 1))}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep(`Tree height: ${levels}`);
  setData([...arr]);
};

// Tree Diameter
export const treeDiameter: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Finding tree diameter');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let maxDist = 0;
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    setStep(`Checking from node ${arr[i].value}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    maxDist = Math.max(maxDist, i);
    arr[i].color = COLORS.SORTED;
  }
  
  setStep(`Tree diameter: ${maxDist}`);
  setData([...arr]);
};

// Path Sum
export const pathSum: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const target = 7;
  
  setStep(`Finding path sum equal to ${target}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let sum = 0;
  const path: number[] = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (isCancelled()) return;
    sum += Number(arr[i].value);
    path.push(i);
    arr[i].color = COLORS.ACTIVE;
    setStep(`Current sum: ${sum}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (sum === target) {
      path.forEach(idx => arr[idx].color = COLORS.TARGET);
      setStep(`Found path with sum ${target}!`);
      setData([...arr]);
      return;
    }
    
    arr[i].color = COLORS.DEFAULT;
  }
  
  setStep('No path found');
};

// Lowest Common Ancestor
export const lowestCommonAncestor: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  const node1 = arr[1].value;
  const node2 = arr[arr.length - 2].value;
  
  setStep(`Finding LCA of ${node1} and ${node2}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  const lcaIndex = Math.floor(arr.length / 2);
  arr[lcaIndex].color = COLORS.TARGET;
  setStep(`LCA found: ${arr[lcaIndex].value}`);
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  setStep('LCA search complete!');
};

// Symmetric Tree
export const symmetricTree: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Checking if tree is symmetric');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  let isSymmetric = true;
  
  for (let i = 0; i < arr.length / 2; i++) {
    if (isCancelled()) return;
    arr[i].color = COLORS.ACTIVE;
    arr[arr.length - 1 - i].color = COLORS.ACTIVE;
    setStep(`Comparing ${arr[i].value} and ${arr[arr.length - 1 - i].value}`);
    setData([...arr]);
    await sleep(speed, isCancelled);
    
    if (arr[i].value !== arr[arr.length - 1 - i].value) {
      isSymmetric = false;
      arr[i].color = COLORS.TARGET;
      arr[arr.length - 1 - i].color = COLORS.TARGET;
      setStep('Not symmetric!');
      setData([...arr]);
      break;
    }
    
    arr[i].color = COLORS.SORTED;
    arr[arr.length - 1 - i].color = COLORS.SORTED;
  }
  
  if (isSymmetric) {
    setStep('Tree is symmetric!');
  }
  setData([...arr]);
};

// Flatten to List
export const flattenToList: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const arr = [...data];
  
  setStep('Flattening tree to linked list');
  setData([...arr]);
  await sleep(speed, isCancelled);
  
  // Sort to simulate in-order traversal
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (isCancelled()) return;
      if (Number(arr[i].value) > Number(arr[j].value)) {
        arr[i].color = COLORS.COMPARING;
        arr[j].color = COLORS.COMPARING;
        setStep(`Comparing ${arr[i].value} and ${arr[j].value}`);
        setData([...arr]);
        await sleep(speed, isCancelled);
        
        const temp = arr[i].value;
        arr[i].value = arr[j].value;
        arr[j].value = temp;
        
        arr[i].color = COLORS.SORTED;
        arr[j].color = COLORS.DEFAULT;
      }
    }
    arr[i].color = COLORS.SORTED;
    setData([...arr]);
  }
  
  setStep('Tree flattened!');
};
