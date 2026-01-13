export enum AlgorithmCategory {
  SORTING = 'Sorting',
  SEARCHING = 'Searching',
  ARRAYS = 'Arrays',
  LINKED_LIST = 'Linked List',
  STRINGS = 'Strings',
  TREES = 'Trees',
  GRAPHS = 'Graphs',
  DYNAMIC_PROGRAMMING = 'Dynamic Programming',
  BACKTRACKING = 'Backtracking',
  ADVANCED_DS = 'Advanced Data Structures',
  GEOMETRY = 'Geometry',
  MATHEMATICS = 'Mathematics',
  GREEDY = 'Greedy'
}

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  complexity: {
    time: string;
    space: string;
  };
  description: string;
}

export type ViewState = 'home' | 'visual' | 'complexity' | 'about';

export interface Neighbor {
  id: number | string;
  weight?: number;
}

export interface NodeData {
  id: number | string;
  value: number | string;
  color: string;
  x?: number;
  y?: number;
  neighbors?: Neighbor[];
  row?: number;
  col?: number;
  isHull?: boolean;
}