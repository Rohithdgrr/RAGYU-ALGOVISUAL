
import { COLORS } from '../constants.ts';
import { AlgorithmRunner, sleep } from './types.ts';

export const sieve: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const cells = [...data];
  const n = cells.length;
  const isPrime = new Array(n + 1).fill(true);
  setStep(`Starting Sieve of Eratosthenes for n=${n}`);
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      setStep(`Marking multiples of prime ${p}`);
      cells[p-1].color = COLORS.ACTIVE;
      setData([...cells]);
      await sleep(speed, isCancelled);
      for (let i = p * p; i <= n; i += p) {
        if (isCancelled()) return;
        isPrime[i] = false;
        cells[i-1].color = COLORS.TARGET;
        cells[i-1].value = 'X';
        setData([...cells]);
        await sleep(speed / 4, isCancelled);
      }
      cells[p-1].color = COLORS.SORTED;
    }
  }
  cells.forEach((cell, idx) => { if (isPrime[idx + 1] && idx > 0) cell.color = COLORS.SORTED; });
  setData([...cells]);
  setStep("Sieve completed. All primes marked.");
};

export const extendedEuclidean: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Extended Euclidean Algorithm");
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Processing element ${i}`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[i].color = COLORS.SORTED;
  }
  setStep("Extended Euclidean completed");
};

export const modularExp: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  setStep("Starting Modular Exponentiation");
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Computing modular power for index ${i}`);
    nodes[i].color = COLORS.HIGHLIGHT;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    nodes[i].value = "mod";
  }
  setStep("Modular exponentiation completed");
};

export const gcd: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let a = Number(nodes[0].value);
  let b = Number(nodes[1].value);
  setStep(`Starting GCD computation for ${a} and ${b}`);
  nodes[0].color = COLORS.ACTIVE;
  nodes[1].color = COLORS.ACTIVE;
  setData([...nodes]);
  await sleep(speed, isCancelled);

  while (b !== 0) {
    if (isCancelled()) return;
    setStep(`Computing ${a} % ${b}`);
    const temp = b;
    b = a % b;
    a = temp;
    
    nodes[0].value = a;
    nodes[1].value = b;
    nodes[1].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[1].color = COLORS.ACTIVE;
  }
  
  setStep(`GCD found: ${a}`);
  nodes[0].color = COLORS.SORTED;
  nodes[1].color = COLORS.SORTED;
  nodes[1].value = "GCD";
  setData([...nodes]);
};

export const lcm: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const a = Number(nodes[0].value);
  const b = Number(nodes[1].value);
  setStep(`Starting LCM computation for ${a} and ${b}`);
  
  nodes[0].color = COLORS.ACTIVE;
  nodes[1].color = COLORS.ACTIVE;
  setData([...nodes]);
  await sleep(speed, isCancelled);
  
  setStep("Computing GCD first");
  let gcd = a;
  let temp = b;
  while (temp !== 0) {
    if (isCancelled()) return;
    const t = temp;
    temp = gcd % temp;
    gcd = t;
    nodes[1].color = COLORS.COMPARING;
    setData([...nodes]);
    await sleep(speed / 2, isCancelled);
    nodes[1].color = COLORS.ACTIVE;
  }
  
  setStep(`LCM = (a × b) / GCD = (${a} × ${b}) / ${gcd}`);
  const lcmResult = (a * b) / gcd;
  nodes[2].color = COLORS.SORTED;
  nodes[2].value = lcmResult;
  setData([...nodes]);
  setStep(`LCM computed: ${lcmResult}`);
};

export const primeFactorization: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const n = Number(nodes[0].value);
  let num = n;
  const factors: number[] = [];
  setStep(`Starting prime factorization of ${n}`);
  
  nodes[0].color = COLORS.ACTIVE;
  setData([...nodes]);
  await sleep(speed, isCancelled);
  
  let idx = 1;
  for (let i = 2; i * i <= num; i++) {
    if (isCancelled()) return;
    setStep(`Checking divisibility by ${i}`);
    while (num % i === 0) {
      factors.push(i);
      setStep(`Found prime factor: ${i}`);
      if (idx < nodes.length) {
        nodes[idx].color = COLORS.ACTIVE;
        nodes[idx].value = i;
        setData([...nodes]);
        await sleep(speed, isCancelled);
        nodes[idx].color = COLORS.SORTED;
        idx++;
      }
      num = Math.floor(num / i);
    }
  }
  
  if (num > 1 && idx < nodes.length) {
    factors.push(num);
    setStep(`Found remaining prime factor: ${num}`);
    nodes[idx].color = COLORS.ACTIVE;
    nodes[idx].value = num;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[idx].color = COLORS.SORTED;
  }
  
  setStep(`Prime factors: ${factors.join(' × ')}`);
  nodes[0].color = COLORS.SORTED;
  setData([...nodes]);
};

export const fibonacci: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const n = nodes.length;
  setStep(`Generating Fibonacci sequence of ${n} numbers`);
  
  if (n >= 1) {
    setStep("F[0] = 0");
    nodes[0].color = COLORS.ACTIVE;
    nodes[0].value = 0;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[0].color = COLORS.SORTED;
  }
  
  if (n >= 2) {
    setStep("F[1] = 1");
    nodes[1].color = COLORS.ACTIVE;
    nodes[1].value = 1;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    nodes[1].color = COLORS.SORTED;
  }
  
  for (let i = 2; i < n; i++) {
    if (isCancelled()) return;
    setStep(`F[${i}] = F[${i-1}] + F[${i-2}]`);
    nodes[i].color = COLORS.COMPARING;
    nodes[i-1].color = COLORS.ACTIVE;
    nodes[i-2].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    nodes[i].value = Number(nodes[i-1].value) + Number(nodes[i-2].value);
    nodes[i].color = COLORS.SORTED;
    nodes[i-1].color = COLORS.SORTED;
    nodes[i-2].color = COLORS.SORTED;
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
  setStep("Fibonacci sequence completed");
};

export const factorial: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  let result = 1;
  setStep("Starting factorial computation");
  
  for (let i = 0; i < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`${i + 1}! = ${i + 1} × ${i}!`);
    nodes[i].color = COLORS.ACTIVE;
    setData([...nodes]);
    await sleep(speed, isCancelled);
    
    result *= (i + 1);
    nodes[i].value = result;
    nodes[i].color = COLORS.SORTED;
    setData([...nodes]);
    await sleep(speed, isCancelled);
  }
  setStep(`Factorial completed: ${nodes.length}! = ${result}`);
};

export const pascalTriangle: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const rows = Math.floor(Math.sqrt(nodes.length));
  setStep(`Generating Pascal triangle with ${rows} rows`);
  
  let idx = 0;
  for (let i = 0; i < rows && idx < nodes.length; i++) {
    if (isCancelled()) return;
    setStep(`Generating row ${i}`);
    let c = 1;
    for (let j = 0; j <= i && idx < nodes.length; j++) {
      nodes[idx].color = COLORS.ACTIVE;
      nodes[idx].value = c;
      setData([...nodes]);
      await sleep(speed / 2, isCancelled);
      nodes[idx].color = COLORS.SORTED;
      idx++;
      c = Math.floor(c * (i - j) / (j + 1));
    }
  }
  setStep("Pascal triangle completed");
};

export const binaryExponentiation: AlgorithmRunner = async (data, setData, speed, isCancelled, setStep) => {
  const nodes = [...data];
  const base = Number(nodes[0].value);
  const exp = Number(nodes[1].value);
  setStep(`Computing ${base}^${exp} using binary exponentiation`);
  let result = 1;
  let power = base;
  let exponent = exp;
  
  nodes[0].color = COLORS.ACTIVE;
  nodes[1].color = COLORS.ACTIVE;
  setData([...nodes]);
  await sleep(speed, isCancelled);
  
  let idx = 2;
  while (exponent > 0 && idx < nodes.length) {
    if (isCancelled()) return;
    setStep(`Checking bit: exponent = ${exponent}`);
    
    if (exponent % 2 === 1) {
      setStep(`Bit is 1, multiplying result by ${power}`);
      result *= power;
      if (idx < nodes.length) {
        nodes[idx].color = COLORS.SORTED;
        nodes[idx].value = result;
        setData([...nodes]);
        await sleep(speed, isCancelled);
        idx++;
      }
    }
    
    setStep(`Squaring power: ${power} × ${power}`);
    power *= power;
    exponent = Math.floor(exponent / 2);
    
    if (idx < nodes.length) {
      nodes[idx].color = COLORS.COMPARING;
      nodes[idx].value = power;
      setData([...nodes]);
      await sleep(speed / 2, isCancelled);
      nodes[idx].color = COLORS.DEFAULT;
      idx++;
    }
  }
  
  setStep(`Result: ${base}^${exp} = ${result}`);
  nodes[0].color = COLORS.SORTED;
  nodes[1].color = COLORS.SORTED;
  setData([...nodes]);
};
