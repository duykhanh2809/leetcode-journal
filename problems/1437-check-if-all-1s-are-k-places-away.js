/**
 * LeetCode 1437. Check If All 1's Are at Least Length K Places Away
 * Link: https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/
 *
 * Given a binary array nums and an integer k, return true if all 1's are
 * at least k places away from each other, otherwise return false.
 */

/**
 * ## Intuition
 *
 * - Track the minimum allowed index for the next occurrence of 1
 * - When we encounter a 1, check if it appears too early (before nextAllowed)
 * - If valid, update nextAllowed to be i + k + 1 (the next position allowed)
 * - Skip all zeros as they don't affect the constraint
 */

/**
 * ## Approach
 *
 * 1. Initialize `nextAllowed = 0` (first 1 can appear at any position)
 * 2. Iterate through the array:
 *    - Skip zeros (continue)
 *    - When we find a 1:
 *      - If `nextAllowed > 0` and current index `i < nextAllowed`, return false
 *      - Update `nextAllowed = i + k + 1` for the next allowed position
 * 3. If we complete the iteration without violation, return true
 */

/**
 * ## Complexity
 *
 * - Time: O(n) - single pass through the array
 * - Space: O(1) - only using a few variables
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
function kLengthApart(nums, k) {
  let nextAllowed = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) continue;

    // Check if current 1 appears too early (before the allowed position)
    if (nextAllowed > 0 && nextAllowed > i) return false;

    // Update the next allowed position: current position + k + 1
    nextAllowed = i + k + 1;
  }

  return true;
}

// Example usage:
// console.log(kLengthApart([1,0,0,0,1,0,0,1], 2)); // true
// console.log(kLengthApart([1,0,0,1,0,1], 2)); // false
