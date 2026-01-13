export interface LeetCodeProblem {
  id: string;
  title: string;
  number: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  link: string;
  category: string;
  algorithmId: string;
}

export const LEETCODE_PROBLEMS: LeetCodeProblem[] = [
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    link: 'https://leetcode.com/problems/two-sum/',
    category: 'Arrays & Hashing',
    algorithmId: 'two-pointers'
  },
  {
    id: 'add-two-numbers',
    number: 2,
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    link: 'https://leetcode.com/problems/add-two-numbers/',
    category: 'Linked List',
    algorithmId: 'merge-sorted-lists'
  },
  {
    id: 'longest-substring-without-repeating',
    number: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'longest-palindromic-substring',
    number: 5,
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    description: 'Given a string s, return the longest palindromic substring in s.',
    link: 'https://leetcode.com/problems/longest-palindromic-substring/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'container-with-most-water',
    number: 11,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    description: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container that can hold the most water.',
    link: 'https://leetcode.com/problems/container-with-most-water/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: '3sum',
    number: 15,
    title: '3Sum',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    link: 'https://leetcode.com/problems/3sum/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'letter-combinations',
    number: 17,
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'Medium',
    description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.',
    link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'remove-nth-node',
    number: 19,
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    category: 'Linked List',
    algorithmId: 'find-middle'
  },
  {
    id: 'valid-parentheses',
    number: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    link: 'https://leetcode.com/problems/valid-parentheses/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'merge-two-sorted-lists',
    number: 21,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.',
    link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    category: 'Linked List',
    algorithmId: 'merge-sorted-lists'
  },
  {
    id: 'merge-k-sorted-lists',
    number: 23,
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.',
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    category: 'Linked List',
    algorithmId: 'merge-sorted-lists'
  },
  {
    id: 'search-in-rotated-array',
    number: 33,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k.',
    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    category: 'Arrays',
    algorithmId: 'binary-search'
  },
  {
    id: 'combination-sum',
    number: 39,
    title: 'Combination Sum',
    difficulty: 'Medium',
    description: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.',
    link: 'https://leetcode.com/problems/combination-sum/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'trapping-rain-water',
    number: 42,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    link: 'https://leetcode.com/problems/trapping-rain-water/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'permutations',
    number: 46,
    title: 'Permutations',
    difficulty: 'Medium',
    description: 'Given an array nums of distinct integers, return all the possible permutations.',
    link: 'https://leetcode.com/problems/permutations/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'rotate-image',
    number: 48,
    title: 'Rotate Image',
    difficulty: 'Medium',
    description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).',
    link: 'https://leetcode.com/problems/rotate-image/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'group-anagrams',
    number: 49,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    link: 'https://leetcode.com/problems/group-anagrams/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'maximum-subarray',
    number: 53,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
    link: 'https://leetcode.com/problems/maximum-subarray/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'spiral-matrix',
    number: 54,
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    link: 'https://leetcode.com/problems/spiral-matrix/',
    category: 'Arrays',
    algorithmId: 'sliding-window'
  },
  {
    id: 'merge-intervals',
    number: 56,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.',
    link: 'https://leetcode.com/problems/merge-intervals/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'unique-paths',
    number: 62,
    title: 'Unique Paths',
    difficulty: 'Medium',
    description: 'There is a robot on an m x n grid. The robot is initially located at the top-left corner. The robot tries to move to the bottom-right corner.',
    link: 'https://leetcode.com/problems/unique-paths/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'minimum-path-sum',
    number: 64,
    title: 'Minimum Path Sum',
    difficulty: 'Medium',
    description: 'Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.',
    link: 'https://leetcode.com/problems/minimum-path-sum/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'climbing-stairs',
    number: 70,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    link: 'https://leetcode.com/problems/climbing-stairs/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'edit-distance',
    number: 72,
    title: 'Edit Distance',
    difficulty: 'Medium',
    description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
    link: 'https://leetcode.com/problems/edit-distance/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'set-matrix-zeroes',
    number: 73,
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    description: 'Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0\'s.',
    link: 'https://leetcode.com/problems/set-matrix-zeroes/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'sort-colors',
    number: 75,
    title: 'Sort Colors',
    difficulty: 'Medium',
    description: 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent.',
    link: 'https://leetcode.com/problems/sort-colors/',
    category: 'Arrays',
    algorithmId: 'quick-sort'
  },
  {
    id: 'minimum-window-substring',
    number: 76,
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t is included in the window.',
    link: 'https://leetcode.com/problems/minimum-window-substring/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'subsets',
    number: 78,
    title: 'Subsets',
    difficulty: 'Medium',
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set).',
    link: 'https://leetcode.com/problems/subsets/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'word-search',
    number: 79,
    title: 'Word Search',
    difficulty: 'Medium',
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid.',
    link: 'https://leetcode.com/problems/word-search/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'largest-rectangle',
    number: 84,
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    description: 'Given an array of integers heights representing the histogram\'s bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.',
    link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'binary-tree-inorder',
    number: 94,
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'validate-bst',
    number: 98,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    link: 'https://leetcode.com/problems/validate-binary-search-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'same-tree',
    number: 100,
    title: 'Same Tree',
    difficulty: 'Easy',
    description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not.',
    link: 'https://leetcode.com/problems/same-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'symmetric-tree',
    number: 101,
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, check whether it is a mirror of itself.',
    link: 'https://leetcode.com/problems/symmetric-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'binary-tree-level-order',
    number: 102,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
    link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    category: 'Trees',
    algorithmId: 'tree-preorder'
  },
  {
    id: 'max-depth-binary-tree',
    number: 104,
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return its maximum depth.',
    link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'construct-binary-tree',
    number: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'Medium',
    description: 'Given two integer arrays preorder and inorder, construct and return the binary tree.',
    link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    category: 'Trees',
    algorithmId: 'tree-preorder'
  },
  {
    id: 'best-time-buy-sell',
    number: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit.',
    link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'max-path-sum',
    number: 124,
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. Find the maximum path sum.',
    link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'longest-consecutive',
    number: 128,
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.',
    link: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'clone-graph',
    number: 133,
    title: 'Clone Graph',
    difficulty: 'Medium',
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    link: 'https://leetcode.com/problems/clone-graph/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'single-number',
    number: 136,
    title: 'Single Number',
    difficulty: 'Easy',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    link: 'https://leetcode.com/problems/single-number/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'word-break',
    number: 139,
    title: 'Word Break',
    difficulty: 'Medium',
    description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.',
    link: 'https://leetcode.com/problems/word-break/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'linked-list-cycle',
    number: 141,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
    link: 'https://leetcode.com/problems/linked-list-cycle/',
    category: 'Linked List',
    algorithmId: 'detect-cycle'
  },
  {
    id: 'lru-cache',
    number: 146,
    title: 'LRU Cache',
    difficulty: 'Medium',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    link: 'https://leetcode.com/problems/lru-cache/',
    category: 'Advanced Data Structures',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'max-product-subarray',
    number: 152,
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    description: 'Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.',
    link: 'https://leetcode.com/problems/maximum-product-subarray/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'min-stack',
    number: 155,
    title: 'Min Stack',
    difficulty: 'Medium',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    link: 'https://leetcode.com/problems/min-stack/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'intersection-linked-lists',
    number: 160,
    title: 'Intersection of Two Linked Lists',
    difficulty: 'Easy',
    description: 'Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.',
    link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/',
    category: 'Linked List',
    algorithmId: 'find-middle'
  },
  {
    id: 'two-sum-ii',
    number: 167,
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'majority-element',
    number: 169,
    title: 'Majority Element',
    difficulty: 'Easy',
    description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times.',
    link: 'https://leetcode.com/problems/majority-element/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'house-robber',
    number: 198,
    title: 'House Robber',
    difficulty: 'Medium',
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.',
    link: 'https://leetcode.com/problems/house-robber/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'number-of-islands',
    number: 200,
    title: 'Number of Islands',
    difficulty: 'Medium',
    description: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    link: 'https://leetcode.com/problems/number-of-islands/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'reverse-linked-list',
    number: 206,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    link: 'https://leetcode.com/problems/reverse-linked-list/',
    category: 'Linked List',
    algorithmId: 'find-middle'
  },
  {
    id: 'course-schedule',
    number: 207,
    title: 'Course Schedule',
    difficulty: 'Medium',
    description: 'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi].',
    link: 'https://leetcode.com/problems/course-schedule/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'implement-trie',
    number: 208,
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'Medium',
    description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
    link: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    category: 'Advanced Data Structures',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'kth-largest',
    number: 215,
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    category: 'Arrays',
    algorithmId: 'quick-sort'
  },
  {
    id: 'contains-duplicate',
    number: 217,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    link: 'https://leetcode.com/problems/contains-duplicate/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'invert-binary-tree',
    number: 226,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, invert the tree, and return its root.',
    link: 'https://leetcode.com/problems/invert-binary-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'kth-smallest-bst',
    number: 230,
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) in the tree.',
    link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'palindrome-linked-list',
    number: 234,
    title: 'Palindrome Linked List',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, return true if it is a palindrome or false otherwise.',
    link: 'https://leetcode.com/problems/palindrome-linked-list/',
    category: 'Linked List',
    algorithmId: 'palindrome-list'
  },
  {
    id: 'lowest-common-ancestor',
    number: 235,
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.',
    link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'product-except-self',
    number: 238,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].',
    link: 'https://leetcode.com/problems/product-of-array-except-self/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'sliding-window-maximum',
    number: 239,
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    description: 'You are given an array of integers nums, there is a sliding window of size k moving from the very left of the array to the very right.',
    link: 'https://leetcode.com/problems/sliding-window-maximum/',
    category: 'Arrays',
    algorithmId: 'sliding-window'
  },
  {
    id: 'valid-anagram',
    number: 242,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    link: 'https://leetcode.com/problems/valid-anagram/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'missing-number',
    number: 268,
    title: 'Missing Number',
    difficulty: 'Easy',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    link: 'https://leetcode.com/problems/missing-number/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'find-duplicate',
    number: 287,
    title: 'Find the Duplicate Number',
    difficulty: 'Medium',
    description: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.',
    link: 'https://leetcode.com/problems/find-the-duplicate-number/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'find-median',
    number: 295,
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    description: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.',
    link: 'https://leetcode.com/problems/find-median-from-data-stream/',
    category: 'Heap',
    algorithmId: 'max-heap-insert'
  },
  {
    id: 'serialize-deserialize',
    number: 297,
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    description: 'Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.',
    link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    category: 'Trees',
    algorithmId: 'tree-preorder'
  },
  {
    id: 'longest-increasing-subsequence',
    number: 300,
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'coin-change',
    number: 322,
    title: 'Coin Change',
    difficulty: 'Medium',
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.',
    link: 'https://leetcode.com/problems/coin-change/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'connected-components',
    number: 323,
    title: 'Number of Connected Components in an Undirected Graph',
    difficulty: 'Medium',
    description: 'You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.',
    link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'counting-bits',
    number: 338,
    title: 'Counting Bits',
    difficulty: 'Easy',
    description: 'Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1\'s in the binary representation of i.',
    link: 'https://leetcode.com/problems/counting-bits/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'top-k-frequent',
    number: 347,
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    link: 'https://leetcode.com/problems/top-k-frequent-elements/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'sum-of-two-integers',
    number: 371,
    title: 'Sum of Two Integers',
    difficulty: 'Medium',
    description: 'Given two integers a and b, return the sum of the two integers without using the operators + and -.',
    link: 'https://leetcode.com/problems/sum-of-two-integers/',
    category: 'Mathematics',
    algorithmId: 'gcd'
  },
  {
    id: 'ransom-note',
    number: 383,
    title: 'Ransom Note',
    difficulty: 'Easy',
    description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.',
    link: 'https://leetcode.com/problems/ransom-note/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'decode-string',
    number: 394,
    title: 'Decode String',
    difficulty: 'Medium',
    description: 'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.',
    link: 'https://leetcode.com/problems/decode-string/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'partition-equal-subset',
    number: 416,
    title: 'Partition Equal Subset Sum',
    difficulty: 'Medium',
    description: 'Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.',
    link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'pacific-atlantic',
    number: 417,
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'Medium',
    description: 'There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island\'s left and top edges.',
    link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'longest-repeating-char',
    number: 424,
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character.',
    link: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'find-all-anagrams',
    number: 438,
    title: 'Find All Anagrams in a String',
    difficulty: 'Medium',
    description: 'Given two strings s and p, return an array of all the start indices of p\'s anagrams in s.',
    link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'target-sum',
    number: 494,
    title: 'Target Sum',
    difficulty: 'Medium',
    description: 'You are given an integer array nums and an integer target. You want to build an expression out of nums by adding one of the symbols \'+\' and \'-\' before each integer in nums.',
    link: 'https://leetcode.com/problems/target-sum/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'diameter-binary-tree',
    number: 543,
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    description: 'Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree.',
    link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'subarray-sum-equals-k',
    number: 560,
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    description: 'Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.',
    link: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    category: 'Arrays',
    algorithmId: 'two-pointers'
  },
  {
    id: 'subtree-another-tree',
    number: 572,
    title: 'Subtree of Another Tree',
    difficulty: 'Easy',
    description: 'Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.',
    link: 'https://leetcode.com/problems/subtree-of-another-tree/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'merge-two-binary-trees',
    number: 617,
    title: 'Merge Two Binary Trees',
    difficulty: 'Easy',
    description: 'You are given two binary trees root1 and root2. Merge them into a new binary tree.',
    link: 'https://leetcode.com/problems/merge-two-binary-trees/',
    category: 'Trees',
    algorithmId: 'tree-inorder'
  },
  {
    id: 'task-scheduler',
    number: 621,
    title: 'Task Scheduler',
    difficulty: 'Medium',
    description: 'You are given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task.',
    link: 'https://leetcode.com/problems/task-scheduler/',
    category: 'Greedy',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'palindromic-substrings',
    number: 647,
    title: 'Palindromic Substrings',
    difficulty: 'Medium',
    description: 'Given a string s, return the number of palindromic substrings in s.',
    link: 'https://leetcode.com/problems/palindromic-substrings/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'valid-parenthesis-string',
    number: 678,
    title: 'Valid Parenthesis String',
    difficulty: 'Medium',
    description: 'Given a string s containing only three types of characters: \'(\', \')\' and \'*\', return true if s is valid.',
    link: 'https://leetcode.com/problems/valid-parenthesis-string/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'binary-search',
    number: 704,
    title: 'Binary Search',
    difficulty: 'Easy',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
    link: 'https://leetcode.com/problems/binary-search/',
    category: 'Searching',
    algorithmId: 'binary-search'
  },
  {
    id: 'flood-fill',
    number: 733,
    title: 'Flood Fill',
    difficulty: 'Easy',
    description: 'An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image. Perform a flood fill on the image.',
    link: 'https://leetcode.com/problems/flood-fill/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'daily-temperatures',
    number: 739,
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    description: 'Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.',
    link: 'https://leetcode.com/problems/daily-temperatures/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'min-cost-climbing-stairs',
    number: 746,
    title: 'Min Cost Climbing Stairs',
    difficulty: 'Easy',
    description: 'You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.',
    link: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  },
  {
    id: 'partition-labels',
    number: 763,
    title: 'Partition Labels',
    difficulty: 'Medium',
    description: 'You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.',
    link: 'https://leetcode.com/problems/partition-labels/',
    category: 'Strings',
    algorithmId: 'two-pointers'
  },
  {
    id: 'swim-in-rising-water',
    number: 778,
    title: 'Swim in Rising Water',
    difficulty: 'Medium',
    description: 'You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point.',
    link: 'https://leetcode.com/problems/swim-in-rising-water/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'letter-case-permutation',
    number: 784,
    title: 'Letter Case Permutation',
    difficulty: 'Medium',
    description: 'Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.',
    link: 'https://leetcode.com/problems/letter-case-permutation/',
    category: 'Backtracking',
    algorithmId: 'n-queens'
  },
  {
    id: 'car-fleet',
    number: 853,
    title: 'Car Fleet',
    difficulty: 'Medium',
    description: 'There are n cars going to the same destination along a one-lane road. The destination is target miles away.',
    link: 'https://leetcode.com/problems/car-fleet/',
    category: 'Stack',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'koko-eating-bananas',
    number: 875,
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    description: 'Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.',
    link: 'https://leetcode.com/problems/koko-eating-bananas/',
    category: 'Binary Search',
    algorithmId: 'binary-search'
  },
  {
    id: 'time-based-key-value',
    number: 981,
    title: 'Time Based Key-Value Store',
    difficulty: 'Medium',
    description: 'Design a time-based key-value data structure that can store multiple values for the same key at different time stamps.',
    link: 'https://leetcode.com/problems/time-based-key-value-store/',
    category: 'Advanced Data Structures',
    algorithmId: 'fisher-yates'
  },
  {
    id: 'rotting-oranges',
    number: 994,
    title: 'Rotting Oranges',
    difficulty: 'Medium',
    description: 'You are given an m x n grid where each cell can have one of three values. Return the minimum number of minutes that must elapse until no cell has a fresh orange.',
    link: 'https://leetcode.com/problems/rotting-oranges/',
    category: 'Graphs',
    algorithmId: 'bfs'
  },
  {
    id: 'longest-common-subsequence',
    number: 1143,
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence.',
    link: 'https://leetcode.com/problems/longest-common-subsequence/',
    category: 'Dynamic Programming',
    algorithmId: 'edit-distance'
  }
];
