export type LeetCodeVisualizationType = 
  | 'array-bars'
  | 'array-points'
  | 'array-grid'
  | 'linked-list'
  | 'binary-tree'
  | 'n-ary-tree'
  | 'graph-nodes'
  | 'graph-grid'
  | 'string-chars'
  | 'matrix-cells'
  | 'heap-tree'
  | 'stack-vertical'
  | 'queue-horizontal'
  | 'trie-tree'
  | 'interval-line'
  | 'subarray-highlight'
  | 'pointer-visualization';

export interface LeetCodeVisualizationConfig {
  type: LeetCodeVisualizationType;
  defaultData: any[];
  animationSteps: string[];
  description: string;
}

export const LEETCODE_VISUALIZATIONS: Record<string, LeetCodeVisualizationConfig> = {
  // Arrays
  'two-sum': {
    type: 'array-bars',
    defaultData: [3, 2, 4, 15, 11],
    animationSteps: [
      'Initialize two pointers at start',
      'Calculate sum of elements at pointers',
      'Compare sum with target',
      'Move left pointer if sum > target',
      'Move right pointer if sum < target',
      'Found solution'
    ],
    description: 'Two pointers approach to find two numbers that sum to target'
  },
  'best-time-buy-sell': {
    type: 'array-points',
    defaultData: [7, 1, 5, 3, 6, 4],
    animationSteps: [
      'Initialize min price',
      'Track max profit',
      'Update min price when lower found',
      'Calculate profit at each day'
    ],
    description: 'Track minimum price and maximum profit'
  },
  'contains-duplicate': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 1],
    animationSteps: [
      'Use hash set to track seen numbers',
      'Check if current number exists',
      'Return true if duplicate found'
    ],
    description: 'Check for duplicates using hash set'
  },
  'product-array': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 4],
    animationSteps: [
      'Calculate prefix products',
      'Calculate suffix products',
      'Combine prefix and suffix'
    ],
    description: 'Product of array except self'
  },
  'maximum-subarray': {
    type: 'subarray-highlight',
    defaultData: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    animationSteps: [
      'Initialize max sum and current sum',
      'Extend or start new subarray',
      'Update maximum sum'
    ],
    description: 'Kadane\'s algorithm for maximum subarray'
  },
  'merge-intervals': {
    type: 'interval-line',
    defaultData: [[1, 3], [2, 6], [8, 10], [15, 18]],
    animationSteps: [
      'Sort intervals by start time',
      'Check for overlap',
      'Merge overlapping intervals'
    ],
    description: 'Merge overlapping intervals'
  },
  'rotate-array': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 4, 5, 6, 7],
    animationSteps: [
      'Reverse entire array',
      'Reverse first k elements',
      'Reverse remaining elements'
    ],
    description: 'Rotate array using reversal method'
  },
  'move-zeroes': {
    type: 'array-bars',
    defaultData: [0, 1, 0, 3, 12],
    animationSteps: [
      'Use two pointers',
      'Move non-zero elements to front',
      'Fill remaining with zeros'
    ],
    description: 'Move all zeros to end'
  },
  'sort-colors': {
    type: 'array-bars',
    defaultData: [2, 0, 2, 1, 1, 0],
    animationSteps: [
      'Three pointers: low, mid, high',
      'Sort 0s to left',
      'Sort 2s to right',
      'Keep 1s in middle'
    ],
    description: 'Dutch national flag algorithm'
  },
  'majority-element': {
    type: 'array-bars',
    defaultData: [3, 2, 3],
    animationSteps: [
      'Initialize candidate and count',
      'Count occurrences',
      'Find majority element'
    ],
    description: 'Boyer-Moore voting algorithm'
  },

  // Linked Lists
  'add-two-numbers': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 2, next: 2 },
      { id: 2, value: 4, next: 3 },
      { id: 3, value: 3, next: null }
    ],
    animationSteps: [
      'Initialize carry',
      'Add digits and carry',
      'Create new node',
      'Move to next nodes'
    ],
    description: 'Add two numbers represented by linked lists'
  },
  'linked-list-cycle': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 3, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 0, next: 4 },
      { id: 4, value: -4, next: 2 }
    ],
    animationSteps: [
      'Initialize slow and fast pointers',
      'Move slow by 1, fast by 2',
      'Check if they meet',
      'Detect cycle'
    ],
    description: 'Floyd\'s cycle detection algorithm'
  },
  'reverse-linked-list': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 3, next: 4 },
      { id: 4, value: 4, next: 5 },
      { id: 5, value: 5, next: null }
    ],
    animationSteps: [
      'Initialize prev, curr, next pointers',
      'Reverse links one by one',
      'Update pointers'
    ],
    description: 'Reverse linked list in-place'
  },
  'merge-two-sorted-lists': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 3 },
      { id: 3, value: 4, next: null }
    ],
    animationSteps: [
      'Compare list heads',
      'Add smaller to result',
      'Move pointer forward'
    ],
    description: 'Merge two sorted linked lists'
  },
  'palindrome-linked-list': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 1, next: null }
    ],
    animationSteps: [
      'Find middle using slow/fast pointers',
      'Reverse second half',
      'Compare first and second half'
    ],
    description: 'Check if linked list is palindrome'
  },
  'remove-nth-node': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 3, next: 4 },
      { id: 4, value: 4, next: 5 },
      { id: 5, value: 5, next: null }
    ],
    animationSteps: [
      'Use two pointers with n gap',
      'Move both pointers together',
      'Remove nth node from end'
    ],
    description: 'Remove nth node from end'
  },
  'intersection-linked-lists': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 4, next: 2 },
      { id: 2, value: 1, next: 8 }
    ],
    animationSteps: [
      'Calculate lengths of both lists',
      'Move longer list ahead',
      'Move both lists together',
      'Find intersection'
    ],
    description: 'Find intersection of two linked lists'
  },
  'swap-nodes-pairs': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 3, next: 4 },
      { id: 4, value: 4, next: null }
    ],
    animationSteps: [
      'Swap pairs of nodes',
      'Update next pointers',
      'Maintain connections'
    ],
    description: 'Swap nodes in pairs'
  },
  'rotate-list': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 2, next: 3 },
      { id: 3, value: 3, next: 4 },
      { id: 4, value: 4, next: 5 },
      { id: 5, value: 5, next: null }
    ],
    animationSteps: [
      'Calculate length',
      'Find new tail position',
      'Connect tail to head',
      'Break connection at new tail'
    ],
    description: 'Rotate linked list to the right'
  },
  'remove-duplicates': {
    type: 'linked-list',
    defaultData: [
      { id: 1, value: 1, next: 2 },
      { id: 2, value: 1, next: 3 },
      { id: 3, value: 2, next: 4 },
      { id: 4, value: 3, next: 5 },
      { id: 5, value: 3, next: null }
    ],
    animationSteps: [
      'Skip duplicates',
      'Update next pointer',
      'Remove duplicate nodes'
    ],
    description: 'Remove duplicates from sorted list'
  },

  // Trees
  'binary-tree-inorder': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 3 },
      { id: 2, value: 2, left: 4, right: 5 },
      { id: 3, value: 3, left: null, right: null },
      { id: 4, value: 4, left: null, right: null },
      { id: 5, value: 5, left: null, right: null }
    ],
    animationSteps: [
      'Traverse left subtree',
      'Visit current node',
      'Traverse right subtree'
    ],
    description: 'In-order traversal: left, root, right'
  },
  'validate-bst': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 5, left: 2, right: 7 },
      { id: 2, value: 1, left: null, right: null },
      { id: 7, value: 6, left: null, right: null }
    ],
    animationSteps: [
      'Check min-max bounds',
      'Validate left subtree',
      'Validate right subtree',
      'Check BST property'
    ],
    description: 'Validate binary search tree'
  },
  'same-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 3 },
      { id: 2, value: 2, left: null, right: null },
      { id: 3, value: 3, left: null, right: null }
    ],
    animationSteps: [
      'Compare root values',
      'Compare left subtrees',
      'Compare right subtrees'
    ],
    description: 'Check if two trees are identical'
  },
  'symmetric-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 3 },
      { id: 2, value: 2, left: 4, right: null },
      { id: 3, value: 2, left: null, right: 4 },
      { id: 4, value: 3, left: null, right: null }
    ],
    animationSteps: [
      'Compare left and right subtrees',
      'Check mirror property',
      'Recursively validate'
    ],
    description: 'Check if tree is symmetric'
  },
  'binary-tree-level-order': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 3, left: 2, right: 4 },
      { id: 2, value: 9, left: 5, right: 6 },
      { id: 4, value: 20, left: 7, right: 8 },
      { id: 5, value: 15, left: null, right: null },
      { id: 6, value: 7, left: null, right: null }
    ],
    animationSteps: [
      'Use queue for level order',
      'Process each level',
      'Collect nodes level by level'
    ],
    description: 'Level order traversal using queue'
  },
  'max-depth-binary-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 3, left: 2, right: 4 },
      { id: 2, value: 9, left: 5, right: 6 },
      { id: 4, value: 20, left: null, right: 7 }
    ],
    animationSteps: [
      'Calculate depth recursively',
      'Depth = 1 + max(left, right)',
      'Return maximum depth'
    ],
    description: 'Find maximum depth of binary tree'
  },
  'invert-binary-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 4, left: 2, right: 7 },
      { id: 2, value: 2, left: 1, right: 3 },
      { id: 7, value: 7, left: 6, right: 9 }
    ],
    animationSteps: [
      'Swap left and right children',
      'Recursively invert subtrees',
      'Return inverted tree'
    ],
    description: 'Invert binary tree'
  },
  'tree-diameter': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 3 },
      { id: 2, value: 2, left: 4, right: 5 }
    ],
    animationSteps: [
      'Calculate height of each node',
      'Track maximum path through node',
      'Update diameter'
    ],
    description: 'Find diameter of binary tree'
  },
  'lowest-common-ancestor': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 3, left: 2, right: 4 },
      { id: 2, value: 5, left: 6, right: 7 },
      { id: 4, value: 1, left: 8, right: 9 }
    ],
    animationSteps: [
      'Search for both nodes',
      'Find split point',
      'Return LCA'
    ],
    description: 'Find lowest common ancestor'
  },
  'subtree-another-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 3, left: 2, right: 4 },
      { id: 2, value: 4, left: 5, right: 1 },
      { id: 4, value: 5, left: null, right: null }
    ],
    animationSteps: [
      'Check if roots match',
      'Compare left subtrees',
      'Compare right subtrees'
    ],
    description: 'Check if one tree is subtree of another'
  },
  'flatten-binary-tree': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 5 },
      { id: 2, value: 2, left: 3, right: 4 },
      { id: 5, value: 5, left: 6, right: null }
    ],
    animationSteps: [
      'Flatten left subtree',
      'Flatten right subtree',
      'Connect nodes in linked list'
    ],
    description: 'Flatten binary tree to linked list'
  },

  // Strings
  'longest-substring-without-repeating': {
    type: 'string-chars',
    defaultData: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
    animationSteps: [
      'Use sliding window',
      'Track character positions',
      'Update window start',
      'Calculate max length'
    ],
    description: 'Longest substring without repeating characters'
  },
  'longest-palindromic-substring': {
    type: 'string-chars',
    defaultData: ['b', 'a', 'b', 'a', 'd'],
    animationSteps: [
      'Expand around center',
      'Check odd length palindromes',
      'Check even length palindromes',
      'Track longest palindrome'
    ],
    description: 'Find longest palindromic substring'
  },
  'valid-parentheses': {
    type: 'string-chars',
    defaultData: ['(', ')', '{', '}', '[', ']'],
    animationSteps: [
      'Use stack for brackets',
      'Push opening brackets',
      'Pop and match closing brackets',
      'Check if stack is empty'
    ],
    description: 'Validate parentheses matching'
  },
  'valid-anagram': {
    type: 'string-chars',
    defaultData: ['a', 'n', 'a', 'g', 'r', 'a', 'm'],
    animationSteps: [
      'Count character frequencies',
      'Compare frequencies',
      'Check if anagram'
    ],
    description: 'Check if two strings are anagrams'
  },
  'string-rotation': {
    type: 'string-chars',
    defaultData: ['w', 'a', 't', 'e', 'r', 'b', 'o', 't', 't', 'l', 'e'],
    animationSteps: [
      'Concatenate string with itself',
      'Check if second string exists',
      'Return result'
    ],
    description: 'Check if one string is rotation of another'
  },
  'minimum-window-substring': {
    type: 'string-chars',
    defaultData: ['A', 'D', 'O', 'B', 'E', 'C', 'O', 'D', 'E', 'B', 'A', 'N', 'C'],
    animationSteps: [
      'Use sliding window',
      'Expand window to include all chars',
      'Shrink from left',
      'Track minimum window'
    ],
    description: 'Minimum window containing all characters'
  },
  'group-anagrams': {
    type: 'string-chars',
    defaultData: ['e', 'a', 't', 't', 'e', 'a', 't', 'n', 'a', 'n', 't'],
    animationSteps: [
      'Sort each string',
      'Use hash map to group',
      'Collect anagrams'
    ],
    description: 'Group strings that are anagrams'
  },
  'word-break': {
    type: 'string-chars',
    defaultData: ['l', 'e', 'e', 't', 'c', 'o', 'd', 'e'],
    animationSteps: [
      'Use dynamic programming',
      'Check if prefix is in dictionary',
      'Build solution from subproblems'
    ],
    description: 'Check if string can be segmented'
  },
  'str-str': {
    type: 'string-chars',
    defaultData: ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'],
    animationSteps: [
      'Slide needle through haystack',
      'Compare characters',
      'Return index if found'
    ],
    description: 'Find first occurrence of substring'
  },
  'multiply-strings': {
    type: 'string-chars',
    defaultData: ['2', '3'],
    animationSteps: [
      'Multiply digit by digit',
      'Handle carry',
      'Build result string'
    ],
    description: 'Multiply two numbers as strings'
  },

  // Graphs
  'number-of-islands': {
    type: 'graph-grid',
    defaultData: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ],
    animationSteps: [
      'Use DFS/BFS to explore islands',
      'Mark visited cells',
      'Count islands'
    ],
    description: 'Count islands in 2D grid'
  },
  'clone-graph': {
    type: 'graph-nodes',
    defaultData: [
      { id: 1, value: 1, neighbors: [2, 3] },
      { id: 2, value: 2, neighbors: [1] },
      { id: 3, value: 3, neighbors: [1] }
    ],
    animationSteps: [
      'Use hash map for cloned nodes',
      'DFS to traverse graph',
      'Clone neighbors recursively'
    ],
    description: 'Deep clone of a graph'
  },
  'course-schedule': {
    type: 'graph-nodes',
    defaultData: [
      { id: 1, value: 0, neighbors: [1, 2] },
      { id: 2, value: 1, neighbors: [3] },
      { id: 3, value: 2, neighbors: [1] }
    ],
    animationSteps: [
      'Build adjacency list',
      'Calculate indegrees',
      'Topological sort using BFS'
    ],
    description: 'Check if course schedule is possible'
  },
  'rotting-oranges': {
    type: 'graph-grid',
    defaultData: [
      ['2', '1', '1'],
      ['1', '1', '0'],
      ['0', '1', '1']
    ],
    animationSteps: [
      'BFS from rotten oranges',
      'Spread rotting to fresh oranges',
      'Count minutes to rot all'
    ],
    description: 'Minutes to rot all oranges'
  },
  'flood-fill': {
    type: 'graph-grid',
    defaultData: [
      ['1', '1', '1'],
      ['1', '1', '0'],
      ['1', '0', '1']
    ],
    animationSteps: [
      'DFS/BFS from starting point',
      'Fill connected region',
      'Update pixel values'
    ],
    description: 'Flood fill algorithm'
  },
  'pacific-atlantic': {
    type: 'graph-grid',
    defaultData: [
      ['1', '2', '2', '3', '5'],
      ['3', '2', '3', '4', '4'],
      ['2', '4', '5', '3', '1'],
      ['6', '7', '1', '4', '5'],
      ['5', '1', '1', '2', '4']
    ],
    animationSteps: [
      'DFS from Pacific ocean',
      'DFS from Atlantic ocean',
      'Find cells reachable from both'
    ],
    description: 'Pacific Atlantic water flow'
  },
  'surrounded-regions': {
    type: 'graph-grid',
    defaultData: [
      ['X', 'X', 'X', 'X'],
      ['X', 'O', 'O', 'X'],
      ['X', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'X']
    ],
    animationSteps: [
      'Mark border-connected Os',
      'Flip remaining Os to X',
      'Restore border-connected Os'
    ],
    description: 'Surrounded regions capture'
  },
  'word-search': {
    type: 'graph-grid',
    defaultData: [
      ['A', 'B', 'C', 'E'],
      ['S', 'F', 'C', 'S'],
      ['A', 'D', 'E', 'E']
    ],
    animationSteps: [
      'DFS from each cell',
      'Backtrack if path invalid',
      'Check if word exists'
    ],
    description: 'Word search in grid'
  },
  'num-islands': {
    type: 'graph-grid',
    defaultData: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ],
    animationSteps: [
      'Iterate through grid',
      'DFS/BFS for each island',
      'Mark visited cells'
    ],
    description: 'Count number of islands'
  },
  'max-area-island': {
    type: 'graph-grid',
    defaultData: [
      ['0', '0', '1', '0', '0'],
      ['0', '1', '1', '1', '0'],
      ['0', '1', '0', '0', '0']
    ],
    animationSteps: [
      'DFS to explore island',
      'Count island area',
      'Track maximum area'
    ],
    description: 'Max area of island'
  },

  // Dynamic Programming
  'climbing-stairs': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 5, 8],
    animationSteps: [
      'Base cases: 1 step, 2 steps',
      'DP[i] = DP[i-1] + DP[i-2]',
      'Build solution bottom-up'
    ],
    description: 'Ways to climb stairs'
  },
  'coin-change': {
    type: 'array-bars',
    defaultData: [0, 1, 1, 2, 2, 3],
    animationSteps: [
      'Initialize DP array',
      'Try each coin',
      'Update minimum coins'
    ],
    description: 'Minimum coins to make amount'
  },
  'unique-paths': {
    type: 'array-grid',
    defaultData: [
      [1, 1, 1],
      [1, 2, 3],
      [1, 3, 6]
    ],
    animationSteps: [
      'DP[i][j] = DP[i-1][j] + DP[i][j-1]',
      'Build grid bottom-up',
      'Return DP[m-1][n-1]'
    ],
    description: 'Unique paths in grid'
  },
  'longest-increasing-subsequence': {
    type: 'array-bars',
    defaultData: [1, 3, 5, 4, 7],
    animationSteps: [
      'DP[i] = 1 + max(DP[j])',
      'Find longest increasing',
      'Return maximum length'
    ],
    description: 'Longest increasing subsequence'
  },
  'house-robber': {
    type: 'array-bars',
    defaultData: [2, 7, 9, 3, 1],
    animationSteps: [
      'DP[i] = max(DP[i-1], DP[i-2] + nums[i])',
      'Skip or rob current house',
      'Maximize total'
    ],
    description: 'Maximum money without adjacent houses'
  },
  'edit-distance': {
    type: 'matrix-cells',
    defaultData: [
      ['', 's', 'e', 'i', 't'],
      ['', 0, 1, 2, 3],
      ['k', 1, 1, 2, 3],
      ['i', 2, 2, 1, 2],
      ['t', 3, 3, 2, 2]
    ],
    animationSteps: [
      'Initialize base cases',
      'Compare characters',
      'Take min of insert, delete, replace'
    ],
    description: 'Minimum edit distance between strings'
  },
  'max-subarray-sum': {
    type: 'subarray-highlight',
    defaultData: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    animationSteps: [
      'Kadane\'s algorithm',
      'Track current sum',
      'Update maximum sum'
    ],
    description: 'Maximum subarray sum'
  },
  'partition-equal-subset': {
    type: 'array-bars',
    defaultData: [1, 5, 11, 5],
    animationSteps: [
      'Check if sum is even',
      'Find subset summing to half',
      'Use DP for subset sum'
    ],
    description: 'Partition into equal sum subsets'
  },
  'decode-ways': {
    type: 'array-bars',
    defaultData: [1, 2, 3],
    animationSteps: [
      'DP[i] = DP[i-1] + DP[i-2]',
      'Handle single and two digit numbers',
      'Build solution'
    ],
    description: 'Ways to decode numeric string'
  },
  'burst-balloons': {
    type: 'array-bars',
    defaultData: [3, 1, 5, 8],
    animationSteps: [
      'Consider each balloon as last',
      'DP[left][right] = max coins',
      'Use memoization'
    ],
    description: 'Maximum coins by bursting balloons'
  },

  // Advanced Data Structures
  'implement-trie': {
    type: 'trie-tree',
    defaultData: [
      { char: 'a', children: ['p', 'p'] },
      { char: 'p', children: ['p', 'l'] },
      { char: 'p', children: ['l', 'e'] },
      { char: 'l', children: ['e'] },
      { char: 'e', children: [] }
    ],
    animationSteps: [
      'Insert word character by character',
      'Create nodes as needed',
      'Mark end of word'
    ],
    description: 'Trie prefix tree implementation'
  },
  'lru-cache': {
    type: 'pointer-visualization',
    defaultData: [
      { key: 1, value: 10, prev: null, next: null },
      { key: 2, value: 20, prev: null, next: null }
    ],
    animationSteps: [
      'Get: move to front',
      'Put: add or update',
      'Evict least recently used'
    ],
    description: 'LRU cache implementation'
  },
  'time-based-key-value': {
    type: 'pointer-visualization',
    defaultData: [
      { key: 'foo', value: 'bar', timestamp: 1 },
      { key: 'foo', value: 'bar2', timestamp: 4 }
    ],
    animationSteps: [
      'Store values with timestamps',
      'Binary search for latest value',
      'Return most recent value'
    ],
    description: 'Time-based key-value store'
  },

  // Greedy
  'container-with-most-water': {
    type: 'array-points',
    defaultData: [1, 8, 6, 2, 5, 4, 8, 3, 7],
    animationSteps: [
      'Two pointers at ends',
      'Calculate area',
      'Move shorter pointer inward'
    ],
    description: 'Container with most water'
  },
  'activity-selection': {
    type: 'interval-line',
    defaultData: [[1, 2], [3, 4], [0, 6], [5, 7], [8, 9], [5, 9]],
    animationSteps: [
      'Sort by end time',
      'Select non-overlapping activities',
      'Maximize count'
    ],
    description: 'Activity selection problem'
  },
  'jump-game': {
    type: 'array-bars',
    defaultData: [2, 3, 1, 1, 4],
    animationSteps: [
      'Track farthest reachable',
      'Update max reach',
      'Check if end is reachable'
    ],
    description: 'Jump game to reach end'
  },
  'gas-station': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 4, 5],
    animationSteps: [
      'Calculate total gas and cost',
      'Check if solution exists',
      'Find starting station'
    ],
    description: 'Gas station circuit'
  },
  'candy': {
    type: 'array-bars',
    defaultData: [1, 0, 2],
    animationSteps: [
      'Give each child 1 candy',
      'Give extra to neighbors with higher ratings',
      'Return total candies'
    ],
    description: 'Candy distribution problem'
  },

  // Backtracking
  'subsets': {
    type: 'array-bars',
    defaultData: [1, 2, 3],
    animationSteps: [
      'Include or exclude each element',
      'Build all subsets',
      'Collect results'
    ],
    description: 'Generate all subsets'
  },
  'permutations': {
    type: 'array-bars',
    defaultData: [1, 2, 3],
    animationSteps: [
      'Swap elements',
      'Generate permutations',
      'Backtrack to explore all'
    ],
    description: 'Generate all permutations'
  },
  'combination-sum': {
    type: 'array-bars',
    defaultData: [2, 3, 6, 7],
    animationSteps: [
      'Include or exclude candidates',
      'Decrease target',
      'Find combinations'
    ],
    description: 'Combination sum problem'
  },
  'n-queens': {
    type: 'array-grid',
    defaultData: [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.']
    ],
    animationSteps: [
      'Place queen row by row',
      'Check validity',
      'Backtrack if invalid',
      'Find all solutions'
    ],
    description: 'N-Queens problem solver'
  },
  'word-search-ii': {
    type: 'graph-grid',
    defaultData: [
      ['o', 'a', 'a', 'n'],
      ['e', 't', 'a', 'e'],
      ['i', 'h', 'k', 'r'],
      ['i', 'f', 'l', 'v']
    ],
    animationSteps: [
      'Trie for dictionary words',
      'DFS from each cell',
      'Find all words'
    ],
    description: 'Word search II with dictionary'
  },

  // Searching
  'binary-search': {
    type: 'array-bars',
    defaultData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    animationSteps: [
      'Set low and high pointers',
      'Calculate mid',
      'Compare with target',
      'Narrow search space'
    ],
    description: 'Binary search in sorted array'
  },
  'search-in-rotated-array': {
    type: 'array-bars',
    defaultData: [4, 5, 6, 7, 0, 1, 2],
    animationSteps: [
      'Find pivot point',
      'Binary search in correct half',
      'Return index'
    ],
    description: 'Search in rotated sorted array'
  },
  'find-minimum-in-rotated': {
    type: 'array-bars',
    defaultData: [3, 4, 5, 1, 2],
    animationSteps: [
      'Binary search for minimum',
      'Compare mid with rightmost',
      'Find rotation point'
    ],
    description: 'Find minimum in rotated array'
  },
  'search-insert-position': {
    type: 'array-bars',
    defaultData: [1, 3, 5, 6],
    animationSteps: [
      'Binary search for position',
      'Find insertion point',
      'Return index'
    ],
    description: 'Search insert position'
  },
  'search-a-2d-matrix': {
    type: 'matrix-cells',
    defaultData: [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]
    ],
    animationSteps: [
      'Start from top-right',
      'Move left or down',
      'Find target'
    ],
    description: 'Search in 2D matrix'
  },

  // Heap
  'kth-largest': {
    type: 'heap-tree',
    defaultData: [3, 2, 1, 5, 6, 4],
    animationSteps: [
      'Build min heap',
      'Extract k times',
      'Return kth largest'
    ],
    description: 'Find kth largest element'
  },
  'top-k-frequent': {
    type: 'heap-tree',
    defaultData: [1, 1, 1, 2, 2, 3],
    animationSteps: [
      'Count frequencies',
      'Build max heap',
      'Extract top k elements'
    ],
    description: 'Top k frequent elements'
  },
  'find-median': {
    type: 'heap-tree',
    defaultData: [1, 2, 3],
    animationSteps: [
      'Use two heaps',
      'Maintain balance',
      'Calculate median'
    ],
    description: 'Find median from data stream'
  },
  'merge-k-sorted-lists': {
    type: 'heap-tree',
    defaultData: [1, 4, 5, 1, 3, 4, 2, 6],
    animationSteps: [
      'Use min heap',
      'Extract minimum',
      'Merge lists'
    ],
    description: 'Merge k sorted lists'
  },
  'sliding-window-maximum': {
    type: 'array-bars',
    defaultData: [1, 3, -1, -3, 5, 3, 6, 7],
    animationSteps: [
      'Use deque for window',
      'Maintain decreasing order',
      'Get maximum for each window'
    ],
    description: 'Sliding window maximum'
  },

  // Stack
  'valid-parentheses-stack': {
    type: 'stack-vertical',
    defaultData: ['(', ')', '{', '}', '[', ']'],
    animationSteps: [
      'Push opening brackets',
      'Pop and match closing brackets',
      'Check if stack is empty'
    ],
    description: 'Validate parentheses using stack'
  },
  'min-stack': {
    type: 'stack-vertical',
    defaultData: [2, 1, 5, 0, 4, 6],
    animationSteps: [
      'Push elements',
      'Track minimum',
      'Pop elements'
    ],
    description: 'Stack with minimum retrieval'
  },
  'evaluate-reverse-polish': {
    type: 'stack-vertical',
    defaultData: ['2', '1', '+', '3', '*'],
    animationSteps: [
      'Push numbers',
      'Pop and apply operators',
      'Push result'
    ],
    description: 'Evaluate reverse Polish notation'
  },
  'daily-temperatures': {
    type: 'array-bars',
    defaultData: [73, 74, 75, 71, 69, 72, 76, 73],
    animationSteps: [
      'Use stack for indices',
      'Pop warmer days',
      'Calculate wait days'
    ],
    description: 'Daily temperatures problem'
  },
  'largest-rectangle': {
    type: 'array-bars',
    defaultData: [2, 1, 5, 6, 2, 3],
    animationSteps: [
      'Use stack for indices',
      'Calculate heights',
      'Find maximum area'
    ],
    description: 'Largest rectangle in histogram'
  },

  // Queue
  'implement-queue': {
    type: 'queue-horizontal',
    defaultData: [1, 2, 3, 4, 5],
    animationSteps: [
      'Enqueue at rear',
      'Dequeue from front',
      'Maintain FIFO'
    ],
    description: 'Implement queue using stacks'
  },
  'design-circular-queue': {
    type: 'queue-horizontal',
    defaultData: [1, 2, 3, 4, 5],
    animationSteps: [
      'Use circular array',
      'Track front and rear',
      'Handle wrap-around'
    ],
    description: 'Design circular queue'
  },
  'sliding-window-maximum-queue': {
    type: 'queue-horizontal',
    defaultData: [1, 3, -1, -3, 5, 3, 6, 7],
    animationSteps: [
      'Maintain deque',
      'Remove out of window',
      'Get maximum'
    ],
    description: 'Sliding window maximum'
  },
  'rotting-oranges-bfs': {
    type: 'queue-horizontal',
    defaultData: [
      ['2', '1', '1'],
      ['1', '1', '0'],
      ['0', '1', '1']
    ],
    animationSteps: [
      'Enqueue rotten oranges',
      'Process level by level',
      'Count minutes'
    ],
    description: 'Rotting oranges using BFS'
  },
  'binary-tree-level-order-queue': {
    type: 'queue-horizontal',
    defaultData: [
      { id: 1, value: 3, left: 2, right: 4 },
      { id: 2, value: 9, left: 5, right: 6 },
      { id: 4, value: 20, left: 7, right: 8 }
    ],
    animationSteps: [
      'Enqueue root',
      'Process each level',
      'Enqueue children'
    ],
    description: 'Level order using queue'
  },

  // Matrix
  'set-matrix-zeroes': {
    type: 'matrix-cells',
    defaultData: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],
    animationSteps: [
      'Mark zero rows and columns',
      'Set marked cells to zero'
    ],
    description: 'Set matrix zeroes'
  },
  'spiral-matrix': {
    type: 'matrix-cells',
    defaultData: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    animationSteps: [
      'Traverse spiral order',
      'Update boundaries',
      'Collect elements'
    ],
    description: 'Spiral matrix traversal'
  },
  'rotate-image': {
    type: 'matrix-cells',
    defaultData: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    animationSteps: [
      'Transpose matrix',
      'Reverse each row',
      'Rotate 90 degrees'
    ],
    description: 'Rotate image 90 degrees'
  },
  'search-a-2d-matrix-ii': {
    type: 'matrix-cells',
    defaultData: [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30]
    ],
    animationSteps: [
      'Start from top-right',
      'Move left or down',
      'Find target'
    ],
    description: 'Search in 2D matrix II'
  },
  'game-of-life': {
    type: 'matrix-cells',
    defaultData: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    animationSteps: [
      'Count live neighbors',
      'Apply rules',
      'Update board'
    ],
    description: 'Conway\'s Game of Life'
  },

  // Bit Manipulation
  'single-number': {
    type: 'array-bars',
    defaultData: [2, 2, 1],
    animationSteps: [
      'XOR all numbers',
      'Pairs cancel out',
      'Return single number'
    ],
    description: 'Find single number using XOR'
  },
  'number-of-1-bits': {
    type: 'array-bars',
    defaultData: [11],
    animationSteps: [
      'Count set bits',
      'Use bit manipulation',
      'Return count'
    ],
    description: 'Count number of 1 bits'
  },
  'hamming-distance': {
    type: 'array-bars',
    defaultData: [1, 4],
    animationSteps: [
      'XOR the numbers',
      'Count set bits',
      'Return hamming distance'
    ],
    description: 'Hamming distance between integers'
  },
  'missing-number': {
    type: 'array-bars',
    defaultData: [3, 0, 1],
    animationSteps: [
      'XOR array with indices',
      'XOR with n',
      'Return missing number'
    ],
    description: 'Find missing number'
  },
  'reverse-bits': {
    type: 'array-bars',
    defaultData: [43261596],
    animationSteps: [
      'Shift and build result',
      'Reverse bit order',
      'Return reversed number'
    ],
    description: 'Reverse bits of integer'
  },

  // Design
  'lru-cache-design': {
    type: 'pointer-visualization',
    defaultData: [
      { key: 1, value: 10, prev: null, next: null },
      { key: 2, value: 20, prev: null, next: null }
    ],
    animationSteps: [
      'Get: move to front',
      'Put: add or update',
      'Evict least recently used'
    ],
    description: 'LRU cache design'
  },
  'lfu-cache': {
    type: 'pointer-visualization',
    defaultData: [
      { key: 1, value: 10, freq: 2 },
      { key: 2, value: 20, freq: 1 }
    ],
    animationSteps: [
      'Track frequency',
      'Evict least frequently used',
      'Update cache'
    ],
    description: 'LFU cache design'
  },
  'all-o-one': {
    type: 'pointer-visualization',
    defaultData: [
      { key: 'foo', value: 'bar' },
      { key: 'bar', value: 'baz' }
    ],
    animationSteps: [
      'Use hash map',
      'Store key-value pairs',
      'O(1) operations'
    ],
    description: 'All O(1) data structure'
  },
  'insert-delete-random': {
    type: 'array-bars',
    defaultData: [1, 2, 3],
    animationSteps: [
      'Use array + hash map',
      'Insert at random position',
      'Delete from any position'
    ],
    description: 'Insert delete getRandom O(1)'
  },
  'serialize-deserialize': {
    type: 'binary-tree',
    defaultData: [
      { id: 1, value: 1, left: 2, right: 3 },
      { id: 2, value: 2, left: null, right: null },
      { id: 3, value: 3, left: null, right: null }
    ],
    animationSteps: [
      'Serialize to string',
      'Deserialize from string',
      'Reconstruct tree'
    ],
    description: 'Serialize and deserialize BST'
  }
};
