import { Algorithm, AlgorithmCategory } from './types';

export const ALGORITHMS: Algorithm[] = [
  // --- Sorting ---
  { id: 'bubble-sort', name: 'Bubble Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n²)', space: 'O(1)' }, description: 'Repeatedly swaps adjacent elements if they are in the wrong order.' },
  { id: 'selection-sort', name: 'Selection Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n²)', space: 'O(1)' }, description: 'Finds the minimum element and moves it to the beginning.' },
  { id: 'insertion-sort', name: 'Insertion Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n²)', space: 'O(1)' }, description: 'Builds the final sorted array one item at a time.' },
  { id: 'merge-sort', name: 'Merge Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n log n)', space: 'O(n)' }, description: 'Divide and conquer algorithm that splits and merges subarrays.' },
  { id: 'quick-sort', name: 'Quick Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n log n)', space: 'O(log n)' }, description: 'Partitions array around a pivot and sorts segments recursively.' },
  { id: 'heap-sort', name: 'Heap Sort', category: AlgorithmCategory.SORTING, complexity: { time: 'O(n log n)', space: 'O(1)' }, description: 'Uses a binary heap data structure to sort elements.' },

  // --- Searching ---
  { id: 'linear-search', name: 'Linear Search', category: AlgorithmCategory.SEARCHING, complexity: { time: 'O(n)', space: 'O(1)' }, description: 'Checks every element until the target is found.' },
  { id: 'binary-search', name: 'Binary Search', category: AlgorithmCategory.SEARCHING, complexity: { time: 'O(log n)', space: 'O(1)' }, description: 'Search in a sorted array by repeatedly dividing search interval in half.' },
  { id: 'jump-search', name: 'Jump Search', category: AlgorithmCategory.SEARCHING, complexity: { time: 'O(√n)', space: 'O(1)' }, description: 'Search in sorted array by jumping fixed steps ahead.' },

  // --- Linked List ---
  { id: 'reverse-linked-list', name: 'Reverse Linked List', category: AlgorithmCategory.LINKED_LIST, complexity: { time: 'O(n)', space: 'O(1)' }, description: 'Reverses the direction of pointers in a linked list.' },
  { id: 'detect-cycle', name: 'Detect Cycle (Floyd’s)', category: AlgorithmCategory.LINKED_LIST, complexity: { time: 'O(n)', space: 'O(1)' }, description: 'Uses two pointers at different speeds to find loops.' },
  { id: 'find-middle', name: 'Find Middle', category: AlgorithmCategory.LINKED_LIST, complexity: { time: 'O(n)', space: 'O(1)' }, description: 'Uses tortoise and hare approach to find the center node.' },

  // --- Graphs ---
  { id: 'bfs', name: 'Breadth First Search (BFS)', category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(V+E)', space: 'O(V)' }, description: 'Explores nodes layer by layer from a starting point.' },
  { id: 'dfs', name: 'Depth First Search (DFS)', category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(V+E)', space: 'O(V)' }, description: 'Explores as far as possible along each branch before backtracking.' },
  { id: 'dijkstra', name: "Dijkstra's Algorithm", category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(E log V)', space: 'O(V)' }, description: 'Finds the shortest paths from a source to all nodes in a weighted graph.' },
  { id: 'bellman-ford', name: 'Bellman-Ford', category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(VE)', space: 'O(V)' }, description: 'Computes shortest paths, even with negative edge weights.' },
  { id: 'floyd-warshall', name: 'Floyd-Warshall', category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(V³)', space: 'O(V²)' }, description: 'Finds shortest paths between all pairs of vertices.' },
  { id: 'prim', name: "Prim's Algorithm", category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(E log V)', space: 'O(V)' }, description: 'Finds a minimum spanning tree for a weighted undirected graph.' },
  { id: 'kruskal', name: "Kruskal's Algorithm", category: AlgorithmCategory.GRAPHS, complexity: { time: 'O(E log E)', space: 'O(V)' }, description: 'Finds a minimum spanning tree using a greedy approach.' },

  // --- Trees ---
  { id: 'tree-preorder', name: 'Pre-order Traversal', category: AlgorithmCategory.TREES, complexity: { time: 'O(n)', space: 'O(h)' }, description: 'Visit root, then left subtree, then right subtree.' },
  { id: 'tree-inorder', name: 'In-order Traversal', category: AlgorithmCategory.TREES, complexity: { time: 'O(n)', space: 'O(h)' }, description: 'Visit left subtree, root, then right subtree.' },
  { id: 'tree-postorder', name: 'Post-order Traversal', category: AlgorithmCategory.TREES, complexity: { time: 'O(n)', space: 'O(h)' }, description: 'Visit left subtree, right subtree, then root.' },
  { id: 'tree-levelorder', name: 'Level-order Traversal', category: AlgorithmCategory.TREES, complexity: { time: 'O(n)', space: 'O(w)' }, description: 'Visit nodes level by level using a queue.' },

  // --- Dynamic Programming ---
  { id: 'knapsack', name: '0/1 Knapsack', category: AlgorithmCategory.DYNAMIC_PROGRAMMING, complexity: { time: 'O(nW)', space: 'O(nW)' }, description: 'Maximizes total value of items without exceeding weight capacity.' },
  { id: 'lcs', name: 'Longest Common Subsequence', category: AlgorithmCategory.DYNAMIC_PROGRAMMING, complexity: { time: 'O(nm)', space: 'O(nm)' }, description: 'Finds the longest subsequence common to two sequences.' },
  { id: 'edit-distance', name: 'Edit Distance', category: AlgorithmCategory.DYNAMIC_PROGRAMMING, complexity: { time: 'O(nm)', space: 'O(nm)' }, description: 'Minimum number of operations to transform one string into another.' },

  // --- Backtracking ---
  { id: 'n-queens', name: 'N-Queens Solver', category: AlgorithmCategory.BACKTRACKING, complexity: { time: 'O(N!)', space: 'O(N)' }, description: 'Places N queens on an NxN board so none can attack another.' },
  
  // --- Strings ---
  { id: 'kmp', name: 'KMP Pattern Search', category: AlgorithmCategory.STRINGS, complexity: { time: 'O(n+m)', space: 'O(m)' }, description: 'Efficient pattern matching using a prefix function.' },
  { id: 'rabin-karp', name: 'Rabin-Karp', category: AlgorithmCategory.STRINGS, complexity: { time: 'O(n+m)', space: 'O(1)' }, description: 'Pattern matching using rolling hash functions.' }
];

export const COLORS = {
  DEFAULT: '#e2e8f0',
  ACTIVE: '#3b82f6',
  COMPARING: '#f59e0b',
  SORTED: '#10b981',
  TARGET: '#ef4444',
  HIGHLIGHT: '#8b5cf6',
  PATH: '#6366f1',
  HULL: '#ec4899'
};