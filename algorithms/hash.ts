import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const hashInsert: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const table = [...data];
  const size = table.length;
  setStep(`Starting Hash Table insertion with ${size} slots`);
  
  const values = [15, 22, 33, 44, 55, 66, 77, 88];
  for (const val of values) {
    if (isCancelled()) return;
    const hash = val % size;
    setStep(`Inserting value ${val} at hash index ${hash}`);
    
    table[hash].color = COLORS.ACTIVE;
    table[hash].value = val;
    setData([...table]);
    await sleep(speed, isCancelled);
    table[hash].color = COLORS.SORTED;
    setData([...table]);
  }
  setStep("Hash table insertion completed");
};

export const hashSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const table = [...data];
  const size = table.length;
  const target = 33;
  setStep(`Starting Hash Table search for value ${target}`);
  
  const hash = target % size;
  setStep(`Computing hash: ${target} % ${size} = ${hash}`);
  
  table[hash].color = COLORS.ACTIVE;
  setData([...table]);
  await sleep(speed, isCancelled);
  
  if (Number(table[hash].value) === target) {
    setStep(`Found ${target} at index ${hash}`);
    table[hash].color = COLORS.SORTED;
  } else {
    setStep(`Value ${target} not found at index ${hash}`);
    table[hash].color = COLORS.TARGET;
  }
  setData([...table]);
  setStep("Hash table search completed");
};

export const hashDelete: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const table = [...data];
  const toDelete = 44;
  setStep(`Starting Hash Table delete for value ${toDelete}`);
  
  const size = table.length;
  const hash = toDelete % size;
  setStep(`Computing hash: ${toDelete} % ${size} = ${hash}`);
  
  table[hash].color = COLORS.ACTIVE;
  setData([...table]);
  await sleep(speed, isCancelled);
  
  if (Number(table[hash].value) === toDelete) {
    setStep(`Deleting ${toDelete} from index ${hash}`);
    table[hash].value = "DELETED";
    table[hash].color = COLORS.TARGET;
  } else {
    setStep(`Value ${toDelete} not found`);
  }
  setData([...table]);
  setStep("Hash table delete completed");
};

export const hashCollision: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const table = [...data];
  const size = table.length;
  setStep("Starting Hash Table collision handling (Linear Probing)");
  
  const values = [15, 25, 35, 45];
  for (const val of values) {
    if (isCancelled()) return;
    let hash = val % size;
    setStep(`Inserting ${val}, initial hash: ${hash}`);
    
    while (table[hash].value !== 0 && table[hash].value !== "DELETED") {
      setStep(`Collision at ${hash}, trying next slot`);
      table[hash].color = COLORS.COMPARING;
      setData([...table]);
      await sleep(speed / 2, isCancelled);
      table[hash].color = COLORS.DEFAULT;
      hash = (hash + 1) % size;
    }
    
    setStep(`Found empty slot at ${hash}`);
    table[hash].color = COLORS.ACTIVE;
    table[hash].value = val;
    setData([...table]);
    await sleep(speed, isCancelled);
    table[hash].color = COLORS.SORTED;
  }
  setStep("Hash table collision handling completed");
};

export const hashRehash: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const table = [...data];
  const oldSize = table.length;
  const newSize = oldSize * 2;
  setStep(`Starting Hash Table rehashing: ${oldSize} -> ${newSize}`);
  
  for (let i = 0; i < table.length; i++) {
    if (isCancelled()) return;
    setStep(`Processing element at index ${i}`);
    table[i].color = COLORS.ACTIVE;
    setData([...table]);
    await sleep(speed / 2, isCancelled);
    table[i].color = COLORS.SORTED;
  }
  
  setStep(`Rehashing complete. New table size: ${newSize}`);
};
