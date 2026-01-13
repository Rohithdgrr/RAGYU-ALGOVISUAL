export class AlgorithmError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AlgorithmError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public field?: string,
    public value?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class VisualizationError extends Error {
  constructor(
    message: string,
    public visualizationType?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'VisualizationError';
  }
}

export function handleAlgorithmError(error: unknown, algorithmName: string): string {
  if (error instanceof AlgorithmError) {
    console.error(`[${algorithmName}] ${error.code}:`, error.message, error.details);
    return `${error.message}`;
  }
  
  if (error instanceof Error) {
    console.error(`[${algorithmName}] Error:`, error.message, error.stack);
    return `${error.message}`;
  }
  
  console.error(`[${algorithmName}] Unknown error:`, error);
  return 'An unexpected error occurred';
}

export function validateNodeData(data: any[]): ValidationError | null {
  if (!Array.isArray(data)) {
    return new ValidationError('Data must be an array', 'data', data);
  }
  
  if (data.length === 0) {
    return new ValidationError('Data array cannot be empty', 'data');
  }
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item === null || item === undefined) {
      return new ValidationError(`Data item at index ${i} is null or undefined`, `data[${i}]`, item);
    }
    
    if (typeof item !== 'object') {
      return new ValidationError(`Data item at index ${i} must be an object`, `data[${i}]`, item);
    }
    
    if (!('value' in item)) {
      return new ValidationError(`Data item at index ${i} must have a 'value' property`, `data[${i}]`, item);
    }
  }
  
  return null;
}

export function safeParseJSON(jsonString: string, fallback: any = []): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON, using fallback:', error);
    return fallback;
  }
}

export function safeNumber(value: any, fallback: number = 0): number {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }
  
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
}

export function safeString(value: any, fallback: string = ''): string {
  if (typeof value === 'string') {
    return value;
  }
  
  if (value === null || value === undefined) {
    return fallback;
  }
  
  return String(value);
}
