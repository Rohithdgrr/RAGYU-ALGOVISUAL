
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const nQueens: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const grid = [...data];
  const size = Math.sqrt(grid.length);
  const board = Array.from({ length: size }, () => Array(size).fill(0));

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
      const idx = grid.findIndex(n => n.row === i && n.col === col);
      grid[idx].color = COLORS.ACTIVE;
      setData([...grid]);
      await sleep(speed, isCancelled);

      if (isSafe(i, col)) {
        board[i][col] = 1;
        grid[idx].value = 'Q';
        grid[idx].color = COLORS.SORTED;
        setData([...grid]);
        await sleep(speed, isCancelled);
        if (await solve(col + 1)) return true;
        board[i][col] = 0;
        grid[idx].value = 0;
        grid[idx].color = COLORS.TARGET;
        setData([...grid]);
        await sleep(speed, isCancelled);
      }
      grid[idx].color = COLORS.DEFAULT;
      setData([...grid]);
    }
    return false;
  };

  await solve(0);
};
