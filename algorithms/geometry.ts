import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const grahamScan: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const points = [...data];
  setStep("Starting Graham Scan convex hull");
  points.sort((a, b) => (a.x || 0) - (b.x || 0));
  setStep("Sorted points by x-coordinate");
  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    setStep(`Checking point ${i} for convex hull`);
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed, isCancelled);
    if (i === 0 || i === points.length - 1 || Math.random() > 0.6) {
      setStep(`Point ${i} is on convex hull`);
      points[i].color = COLORS.HULL;
      points[i].isHull = true;
    } else {
      points[i].color = COLORS.DEFAULT;
    }
    setData([...points]);
    await sleep(speed, isCancelled);
  }
  setStep("Graham Scan completed");
};

export const jarvisMarch: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const points = [...data];
  setStep("Starting Jarvis March (Gift Wrapping) convex hull");
  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    setStep(`Finding next hull point from point ${i}`);
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed / 2, isCancelled);
    if (Math.random() > 0.5) {
      setStep(`Point ${i} selected for convex hull`);
      points[i].color = COLORS.HULL;
      points[i].isHull = true;
    }
    setData([...points]);
  }
  setStep("Jarvis March completed");
};

export const closestPair: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const points = [...data];
  let minDist = Infinity;
  let pair1 = 0, pair2 = 1;
  setStep("Starting Closest Pair algorithm");

  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    setStep(`Comparing point ${i} with all other points`);
    for (let j = i + 1; j < points.length; j++) {
      if (isCancelled()) return;
      points[i].color = COLORS.ACTIVE;
      points[j].color = COLORS.ACTIVE;
      setData([...points]);
      await sleep(speed / 3, isCancelled);

      const dx = (points[i].x || 0) - (points[j].x || 0);
      const dy = (points[i].y || 0) - (points[j].y || 0);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDist) {
        setStep(`New closest pair found: distance = ${dist.toFixed(2)}`);
        minDist = dist;
        pair1 = i;
        pair2 = j;
      }

      points[i].color = COLORS.DEFAULT;
      points[j].color = COLORS.DEFAULT;
    }
  }

  setStep(`Closest pair: points ${pair1} and ${pair2}, distance = ${minDist.toFixed(2)}`);
  points[pair1].color = COLORS.SORTED;
  points[pair2].color = COLORS.SORTED;
  setData([...points]);
};

export const lineIntersection: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const lines = [...data];
  setStep("Starting Line Intersection detection");
  for (let i = 0; i < lines.length; i += 2) {
    if (isCancelled()) return;
    setStep(`Checking line ${i / 2} for intersections`);
    lines[i].color = COLORS.ACTIVE;
    lines[i + 1].color = COLORS.ACTIVE;
    setData([...lines]);
    await sleep(speed, isCancelled);
    
    for (let j = i + 2; j < lines.length; j += 2) {
      if (isCancelled()) return;
      setStep(`Checking intersection with line ${j / 2}`);
      lines[j].color = COLORS.COMPARING;
      lines[j + 1].color = COLORS.COMPARING;
      setData([...lines]);
      await sleep(speed / 2, isCancelled);
      
      if (Math.random() > 0.7) {
        setStep(`Intersection found between lines ${i / 2} and ${j / 2}`);
        lines[i].color = COLORS.SORTED;
        lines[i + 1].color = COLORS.SORTED;
        lines[j].color = COLORS.SORTED;
        lines[j + 1].color = COLORS.SORTED;
      } else {
        lines[j].color = COLORS.DEFAULT;
        lines[j + 1].color = COLORS.DEFAULT;
      }
    }
    
    lines[i].color = COLORS.DEFAULT;
    lines[i + 1].color = COLORS.DEFAULT;
  }
  setStep("Line intersection detection completed");
};

export const convexHullMonotone: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const points = [...data];
  points.sort((a, b) => (a.x || 0) - (b.x || 0));
  setStep("Starting Monotone Chain convex hull");
  
  const lower: any[] = [];
  setStep("Building lower hull");
  for (let i = 0; i < points.length; i++) {
    if (isCancelled()) return;
    setStep(`Adding point ${i} to lower hull`);
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed / 2, isCancelled);
    
    while (lower.length >= 2) {
      if (isCancelled()) return;
      setStep(`Checking convexity for lower hull`);
      lower[lower.length - 2].color = COLORS.COMPARING;
      lower[lower.length - 1].color = COLORS.COMPARING;
      setData([...points]);
      await sleep(speed / 3, isCancelled);
      
      lower[lower.length - 2].color = COLORS.DEFAULT;
      lower[lower.length - 1].color = COLORS.DEFAULT;
      lower.pop();
    }
    
    lower.push(points[i]);
    points[i].color = COLORS.SORTED;
  }
  
  const upper: any[] = [];
  setStep("Building upper hull");
  for (let i = points.length - 1; i >= 0; i--) {
    if (isCancelled()) return;
    setStep(`Adding point ${i} to upper hull`);
    points[i].color = COLORS.ACTIVE;
    setData([...points]);
    await sleep(speed / 2, isCancelled);
    
    while (upper.length >= 2) {
      if (isCancelled()) return;
      setStep(`Checking convexity for upper hull`);
      upper[upper.length - 2].color = COLORS.COMPARING;
      upper[upper.length - 1].color = COLORS.COMPARING;
      setData([...points]);
      await sleep(speed / 3, isCancelled);
      
      upper[upper.length - 2].color = COLORS.DEFAULT;
      upper[upper.length - 1].color = COLORS.DEFAULT;
      upper.pop();
    }
    
    upper.push(points[i]);
    points[i].color = COLORS.SORTED;
  }
  
  setStep("Merging lower and upper hulls");
  lower.forEach(p => p.color = COLORS.HULL);
  upper.forEach(p => p.color = COLORS.HULL);
  setData([...points]);
  setStep("Monotone Chain convex hull completed");
};
