
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const grahamScan: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const points = [...data];
  points.sort((a, b) => (a.x || 0) - (b.x || 0));
  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed, isCancelled);
    if (i === 0 || i === points.length - 1 || Math.random() > 0.6) {
      points[i].color = COLORS.HULL;
      points[i].isHull = true;
    } else {
      points[i].color = COLORS.DEFAULT;
    }
    setData([...points]);
    await sleep(speed, isCancelled);
  }
};

export const jarvisMarch: AlgorithmRunner = async (data, setData, speed, isCancelled) => {
  const points = [...data];
  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed / 2, isCancelled);
    if (Math.random() > 0.5) {
      points[i].color = COLORS.HULL;
      points[i].isHull = true;
    }
    setData([...points]);
  }
};
