import { AlgorithmRunner } from './types.ts';
import * as sorting from './sorting.ts';
import * as searching from './searching.ts';
import * as graphs from './graphs.ts';
import * as graphsAdv from './graphs_adv.ts';
import * as graphsAdv2 from './graphs_adv2.ts';
import * as arrays from './arrays.ts';
import * as backtracking from './backtracking.ts';
import * as dp from './dp.ts';
import * as geometry from './geometry.ts';
import * as math from './math_adv.ts';
import * as linkedList from './linked_list.ts';
import * as linkedListAdv from './linked_list_adv.ts';
import * as strings from './strings.ts';
import * as greedy from './greedy.ts';
import * as advancedDs from './advanced_ds.ts';
import * as trees from './trees.ts';
import * as treesAdv from './trees_adv.ts';
import * as hash from './hash.ts';
import * as heap from './heap.ts';
import * as sortingAdv from './sorting_adv.ts';
import * as dataStructuresAdv from './data_structures_adv.ts';

export const ALGO_REGISTRY: Record<string, AlgorithmRunner> = {
  // Linked List
  'reverse-linked-list': linkedList.reverse,
  'detect-cycle': linkedList.detectCycle,
  'find-middle': linkedList.findMiddle,
  'merge-sorted-lists': linkedList.mergeSorted,
  'palindrome-list': linkedList.palindrome,
  'remove-duplicates': linkedListAdv.removeDuplicates,
  'remove-nth-from-end': linkedListAdv.removeNthFromEnd,
  'add-two-numbers': linkedListAdv.addTwoNumbers,
  'swap-nodes-pairs': linkedListAdv.swapNodesPairs,
  'rotate-list': linkedListAdv.rotateList,

  // Sorting
  'bubble-sort': sorting.bubbleSort,
  'selection-sort': sorting.selectionSort,
  'insertion-sort': sorting.insertionSort,
  'merge-sort': sorting.mergeSort,
  'quick-sort': sorting.quickSort,
  'heap-sort': sorting.heapSort,
  'counting-sort': sortingAdv.countingSort,
  'radix-sort': sortingAdv.radixSort,
  'shell-sort': sortingAdv.shellSort,
  'bucket-sort': sortingAdv.bucketSort,
  
  // Searching
  'linear-search': searching.linearSearch,
  'binary-search': searching.binarySearch,
  'jump-search': searching.jumpSearch,
  'exponential-search': sortingAdv.exponentialSearch,
  'interpolation-search': sortingAdv.interpolationSearch,
  
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
  'union-find': graphsAdv2.unionFind,
  'bipartite-check': graphsAdv2.bipartiteCheck,
  'detect-cycle-graph': graphsAdv2.detectCycleGraph,
  'connected-components': graphsAdv2.connectedComponents,
  'shortest-path-bfs': graphsAdv2.shortestPathBFS,
  'boruvka-mst': graphsAdv2.boruvkaMST,
  'articulation-points': graphsAdv2.articulationPoints,
  'bridges-graph': graphsAdv2.bridges,
  'eulerian-path': graphsAdv2.eulerianPath,
  'hamiltonian-cycle': graphsAdv2.hamiltonianCycleGraph,
  'graph-coloring': graphsAdv2.graphColoring,
  
  // Trees
  'tree-preorder': trees.preorder,
  'tree-inorder': trees.inorder,
  'tree-postorder': trees.postorder,
  'tree-levelorder': trees.levelorder,
  'tree-insert': treesAdv.bstInsert,
  'tree-delete': treesAdv.bstDelete,
  'tree-rotation': treesAdv.treeRotation,
  'tree-search': treesAdv.bstSearch,
  'tree-height': treesAdv.treeHeight,
  'tree-diameter': treesAdv.treeDiameter,
  'tree-path-sum': treesAdv.pathSum,
  'tree-lowest-common': treesAdv.lowestCommonAncestor,
  'tree-symmetric': treesAdv.symmetricTree,
  'tree-flatten': treesAdv.flattenToList,

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
  'rod-cutting': dp.rodCutting,
  'palindrome-partitioning': dp.palindromePartitioning,
  'longest-palindromic-subsequence': dp.longestPalindromicSubsequence,
  'unique-paths': dp.uniquePaths,
  
  // Advanced DS
  'fenwick-tree': advancedDs.fenwick,
  'segment-tree': advancedDs.segmentTree,
  'dsu': advancedDs.dsu,
  'avl-tree': advancedDs.avl,

  // Hash Table
  'hash-insert': hash.hashInsert,
  'hash-search': hash.hashSearch,
  'hash-delete': hash.hashDelete,
  'hash-collision': hash.hashCollision,
  'hash-rehash': hash.hashRehash,

  // Heap
  'max-heap-insert': heap.maxHeapInsert,
  'max-heap-extract': heap.maxHeapExtract,
  'min-heap-insert': heap.minHeapInsert,
  'min-heap-extract': heap.minHeapExtract,
  'heap-build': heap.heapBuild,

  // Stack
  'stack-push': dataStructuresAdv.stackPush,
  'stack-pop': dataStructuresAdv.stackPop,
  'stack-peek': dataStructuresAdv.stackPeek,
  'stack-is-empty': dataStructuresAdv.stackIsEmpty,
  'stack-size': dataStructuresAdv.stackSize,

  // Queue
  'queue-enqueue': dataStructuresAdv.queueEnqueue,
  'queue-dequeue': dataStructuresAdv.queueDequeue,
  'queue-peek': dataStructuresAdv.queuePeek,
  'queue-is-empty': dataStructuresAdv.queueIsEmpty,

  // Pointers
  'two-pointers': dataStructuresAdv.twoPointers,
  'slow-fast-pointers': dataStructuresAdv.slowFastPointers,

  // Sub-array
  'max-subarray-sum': dataStructuresAdv.maxSubarraySum,
  'sliding-window': dataStructuresAdv.slidingWindow,

  // Sub-string
  'longest-substring': dataStructuresAdv.longestSubstring,
  'pattern-matching': dataStructuresAdv.patternMatching,

  // Intervals
  'merge-intervals': dataStructuresAdv.mergeIntervals,
  'insert-interval': dataStructuresAdv.insertInterval,
  'interval-intersection': dataStructuresAdv.intervalIntersection,

  // Greedy
  'huffman': greedy.huffman,
  'fractional-knapsack': greedy.fractionalKnapsack,
  'activity-selection': greedy.activitySelection,
  
  // Backtracking
  'n-queens': backtracking.nQueens,
  'sudoku-solver': backtracking.sudokuSolver,
  'subset-sum': backtracking.subsetSum,
  'hamiltonian-path': backtracking.hamiltonianPath,
  'word-search': backtracking.wordSearch,
  
  // Geometry
  'graham-scan': geometry.grahamScan,
  'jarvis-march': geometry.jarvisMarch,
  'closest-pair': geometry.closestPair,
  'line-intersection': geometry.lineIntersection,
  'convex-hull-monotone': geometry.convexHullMonotone,
  
  // Mathematics
  'sieve': math.sieve,
  'extended-euclidean': math.extendedEuclidean,
  'modular-exp': math.modularExp,
  'gcd': math.gcd,
  'lcm': math.lcm,
  'prime-factorization': math.primeFactorization,
  'fibonacci': math.fibonacci,
  'factorial': math.factorial,
  'pascal-triangle': math.pascalTriangle,
  'binary-exponentiation': math.binaryExponentiation,
  
  // Arrays & Techniques
  'kadane': arrays.kadane,
  'fisher-yates': arrays.fisherYates
};