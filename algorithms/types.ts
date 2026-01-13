
import { NodeData } from '../types.ts';

export type AlgorithmRunner = (
  data: NodeData[],
  setData: (data: NodeData[]) => void,
  speed: number,
  isCancelled: () => boolean,
  setStep: (step: string) => void
) => Promise<void>;

export const sleep = (ms: number, isCancelled?: () => boolean) => new Promise<void>(resolve => {
  const startTime = Date.now();
  const checkInterval = 50;

  const interval = setInterval(() => {
    if (isCancelled && isCancelled()) {
      clearInterval(interval);
      resolve();
    } else if (Date.now() - startTime >= ms) {
      clearInterval(interval);
      resolve();
    }
  }, checkInterval);
});
