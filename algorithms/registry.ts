import { AlgorithmRunner } from './types.ts';
import * as sorting from './sorting.ts';
import * as searching from './searching.ts';
import * as graphs from './graphs.ts';
import * as graphsAdv from './graphs_adv.ts';
import * as arrays from './arrays.ts';
import * as backtracking from './backtracking.ts';
import * as dp from './dp.ts';
import * as geometry from './geometry.ts';
import * as math from './math_adv.ts';
import * as linkedList from './linked_list.ts';
import * as strings from './strings.ts';
import * as greedy from './greedy.ts';
import * as advancedDs from './advanced_ds.ts';
import * as trees from './trees.ts';

export const ALGO_REGISTRY: Record<string, AlgorithmRunner> = {
  // Linked List
  'reverse-linked-list': linkedList.reverse,
  'detect-cycle': linkedList.detectCycle,
  'find-middle': linkedList.findMiddle,
  'merge-sorted-lists': linkedList.mergeSorted,
  'palindrome-list': linkedList.palindrome,

  // Sorting
  'bubble-sort': sorting.bubbleSort,
  'selection-sort': sorting.selectionSort,
  'insertion-sort': sorting.insertionSort,
  'merge-sort': sorting.mergeSort,
  'quick-sort': sorting.quickSort,
  'heap-sort': sorting.heapSort,
  
  // Searching
  'linear-search': searching.linearSearch,
  'binary-search': searching.binarySearch,
  'jump-search': searching.jumpSearch,
  
  // Graphs Basic
  'bfs': graphs.bfs,
  'dfs': graphs.dfs,
  'dijkstra': graphs.dijkstra,
  'kruskal': graphs.kruskal,
  'prim': graphs.prim,
  'kahns': graphs.kahns,

  // Graphs Advanced
  'bellman-ford': graphsAdv.bellmanFord,
  'floyd-warshall': graphsAdv.floydWarshall,
  'a-star': graphsAdv.aStar,
  'johnson': graphsAdv.johnson,
  'kosaraju': graphsAdv.kosaraju,
  'tarjan': graphsAdv.tarjan,
  'bridges': graphsAdv.bridges,
  
  // Trees
  'tree-preorder': trees.preorder,
  'tree-inorder': trees.inorder,
  'tree-postorder': trees.postorder,
  'tree-levelorder': trees.levelorder,

  // Strings
  'kmp': strings.kmp,
  'rabin-karp': strings.rabinKarp,
  'z-algorithm': strings.zAlgorithm,
  'boyer-moore': strings.boyerMoore,
  'manacher': strings.manacher,
  'trie': strings.trieSearch,

  // DP
  'knapsack': dp.knapsack,
  'lcs': dp.lcs,
  'lis': dp.lis,
  'edit-distance': dp.editDistance,
  'matrix-chain': dp.matrixChain,
  'coin-change': dp.coinChange,
  'egg-dropping': dp.eggDropping,
  
  // Advanced DS
  'fenwick-tree': advancedDs.fenwick,
  'segment-tree': advancedDs.segmentTree,
  'dsu': advancedDs.dsu,
  'avl-tree': advancedDs.avl,

  // Greedy
  'huffman': greedy.huffman,
  'fractional-knapsack': greedy.fractionalKnapsack,
  'activity-selection': greedy.activitySelection,
  
  // Backtracking
  'n-queens': backtracking.nQueens,
  
  // Geometry
  'graham-scan': geometry.grahamScan,
  'jarvis-march': geometry.jarvisMarch,
  
  // Mathematics
  'sieve': math.sieve,
  'extended-euclidean': math.extendedEuclidean,
  'modular-exp': math.modularExp,
  
  // Arrays & Techniques
  'kadane': arrays.kadane,
  'sliding-window': arrays.slidingWindow,
  'two-pointers': arrays.twoPointers,
  'fisher-yates': arrays.fisherYates
};