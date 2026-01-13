import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const nQueens: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  const size = Math.sqrt(grid.length);
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  setStep(`Starting N-Queens solver for ${size}x${size} board`);

  const isSafe = (row: number, col: number) => {
    for (let i = 0; i < col; i++) if (board[row][i]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (let i = row, j = col; j >= 0 && i < size; i++, j--) if (board[i][j]) return false;
    return true;
  };

  const solve = async (col: number): Promise<boolean> => {
    if (col >= size) return true;
    for (let i = 0; i < size; i++) {
      if (isCancelled()) return false;
      setStep(`Trying queen at row ${i}, column ${col}`);
      const idx = grid.findIndex(n => n.row === i && n.col === col);
      grid[idx].color = COLORS.ACTIVE;
      setData([...grid]);
      await sleep(speed, isCancelled);

      if (isSafe(i, col)) {
        setStep(`Queen placed safely at (${i}, ${col})`);
        board[i][col] = 1;
        grid[idx].value = 'Q';
        grid[idx].color = COLORS.SORTED;
        setData([...grid]);
        await sleep(speed, isCancelled);
        if (await solve(col + 1)) return true;
        setStep(`Backtracking from (${i}, ${col})`);
        board[i][col] = 0;
        grid[idx].value = 0;
        grid[idx].color = COLORS.TARGET;
        setData([...grid]);
        await sleep(speed, isCancelled);
      }
      grid[idx].color = COLORS.DEFAULT;
    }
    return false;
  };

  await solve(0);
  setStep("N-Queens solver completed");
};

export const sudokuSolver: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  const size = Math.sqrt(grid.length);
  setStep(`Starting Sudoku solver for ${size}x${size} grid`);
  
  const isValid = (idx: number, num: number) => {
    const row = Math.floor(idx / size);
    const col = idx % size;
    
    for (let i = 0; i < size; i++) {
      const rowIdx = row * size + i;
      const colIdx = i * size + col;
      const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
      const boxCol = Math.floor(col / 3) * 3 + (i % 3);
      const boxIdx = boxRow * size + boxCol;
      
      if (grid[rowIdx].value === num || grid[colIdx].value === num || grid[boxIdx].value === num) {
        return false;
      }
    }
    return true;
  };

  const solve = async (idx: number): Promise<boolean> => {
    if (idx >= grid.length) return true;
    
    if (grid[idx].value !== 0) {
      return await solve(idx + 1);
    }
    
    for (let num = 1; num <= size; num++) {
      if (isCancelled()) return false;
      setStep(`Trying ${num} at cell ${idx}`);
      
      grid[idx].color = COLORS.ACTIVE;
      grid[idx].value = num;
      setData([...grid]);
      await sleep(speed, isCancelled);
      
      if (isValid(idx, num)) {
        setStep(`${num} is valid at cell ${idx}`);
        grid[idx].color = COLORS.SORTED;
        if (await solve(idx + 1)) return true;
      }
      
      setStep(`Backtracking from cell ${idx}`);
      grid[idx].color = COLORS.TARGET;
      grid[idx].value = 0;
      setData([...grid]);
      await sleep(speed / 2, isCancelled);
    }
    
    grid[idx].color = COLORS.DEFAULT;
    return false;
  };

  await solve(0);
  setStep("Sudoku solver completed");
};

export const subsetSum: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nums = [...data];
  const target = nums.reduce((sum, n) => sum + Number(n.value), 0) / 2;
  const n = nums.length;
  setStep(`Starting Subset Sum problem with target ${target}`);
  
  const solve = async (idx: number, currentSum: number, selected: number[]): Promise<boolean> => {
    if (currentSum === target) {
      setStep(`Found subset with sum ${target}`);
      selected.forEach(i => nums[i].color = COLORS.SORTED);
      setData([...nums]);
      return true;
    }
    
    if (idx >= n || currentSum > target) {
      return false;
    }
    
    if (isCancelled()) return false;
    
    setStep(`Considering element ${nums[idx].value} (current sum: ${currentSum})`);
    nums[idx].color = COLORS.ACTIVE;
    setData([...nums]);
    await sleep(speed, isCancelled);
    
    if (await solve(idx + 1, currentSum + Number(nums[idx].value), [...selected, idx])) {
      return true;
    }
    
    setStep(`Skipping element ${nums[idx].value}`);
    nums[idx].color = COLORS.COMPARING;
    setData([...nums]);
    await sleep(speed / 2, isCancelled);
    
    if (await solve(idx + 1, currentSum, selected)) {
      return true;
    }
    
    nums[idx].color = COLORS.DEFAULT;
    return false;
  };

  const found = await solve(0, 0, []);
  setStep(found ? "Subset Sum solution found" : "No subset sum solution");
};

export const hamiltonianPath: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const visited = new Set();
  const path: number[] = [];
  setStep("Starting Hamiltonian Path search");
  
  const findPath = async (currentIdx: number): Promise<boolean> => {
    visited.add(currentIdx);
    path.push(currentIdx);
    setStep(`Visiting node ${currentIdx} (path length: ${path.length})`);
    nodes[currentIdx].color = COLORS.SORTED;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    if (path.length === nodes.length) {
      setStep("Hamiltonian path found!");
      return true;
    }
    
    const neighbors = nodes[currentIdx].neighbors || [];
    for (const edge of neighbors) {
      if (isCancelled()) return false;
      const nextIdx = nodes.findIndex(n => n.id === edge.id);
      
      if (!visited.has(nextIdx)) {
        setStep(`Moving to neighbor ${nextIdx}`);
        nodes[nextIdx].color = COLORS.ACTIVE;
        setData([...nodes]);
        await sleep(speed / 2, isCancelled);
        
        if (await findPath(nextIdx)) {
          return true;
        }
        
        setStep(`Backtracking from node ${nextIdx}`);
        nodes[nextIdx].color = COLORS.TARGET;
        setData([...nodes]);
        await sleep(speed / 3, isCancelled);
      }
    }
    
    visited.delete(currentIdx);
    path.pop();
    nodes[currentIdx].color = COLORS.DEFAULT;
    setData([...nodes]);
    return false;
  };

  const found = await findPath(0);
  setStep(found ? "Hamiltonian path found" : "No Hamiltonian path exists");
};

export const wordSearch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const grid = [...data];
  const size = Math.sqrt(grid.length);
  const word = "ALGO";
  setStep(`Starting Word Search for "${word}"`);
  
  const search = async (row: number, col: number, idx: number, dr: number, dc: number): Promise<boolean> => {
    if (idx >= word.length) return true;
    if (row < 0 || row >= size || col < 0 || col >= size) return false;
    
    const gridIdx = row * size + col;
    if (isCancelled()) return false;
    
    setStep(`Checking [${row}, ${col}] for '${word[idx]}'`);
    grid[gridIdx].color = COLORS.ACTIVE;
    setData([...grid]);
    await sleep(speed / 3, isCancelled);
    
    if (String(grid[gridIdx].value) !== word[idx]) {
      grid[gridIdx].color = COLORS.DEFAULT;
      return false;
    }
    
    if (await search(row + dr, col + dc, idx + 1, dr, dc)) {
      grid[gridIdx].color = COLORS.SORTED;
      return true;
    }
    
    grid[gridIdx].color = COLORS.DEFAULT;
    return false;
  };

  const directions = [[0,1], [1,0], [1,1], [1,-1], [0,-1], [-1,0], [-1,-1], [-1,1]];
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (isCancelled()) return;
      setStep(`Searching from position [${row}, ${col}]`);
      
      for (const [dr, dc] of directions) {
        if (await search(row, col, 0, dr, dc)) {
          setStep(`Word "${word}" found!`);
          setData([...grid]);
          return;
        }
      }
    }
  }
  setStep(`Word "${word}" not found`);
};
