/**
 * LeetCode 2154. Keep Multiplying Found Values by Two
 * Link: https://leetcode.com/problems/keep-multiplying-found-values-by-two/
 *
 * Given an array nums and a starting value original, repeatedly double
 * original while it exists in nums. Once it is missing, return the value.
 */

/**
 * ## Intuition
 *
 * Treat nums as a lookup set. Starting from original, keep checking if
 * the current value exists; if yes, double it and repeat. As soon as the
 * value is absent, we are done.
 */

/**
 * ## Approach
 *
 * 1. Convert nums into a hash set for O(1) membership checks (or use includes
 *    directly when constraints are small).
 * 2. Initialize result = original.
 * 3. While result is in the set, set result *= 2.
 * 4. Return result once it is missing.
 */

/**
 * ## Complexity
 *
 * - Time: O(n) to build the set + O(k) lookups, where k is number of doublings
 * - Space: O(n) for the set (or O(1) if using array includes)
 */

/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
function findFinalValue(nums, original) {
  const seen = new Set(nums);
  let result = original;

  while (seen.has(result)) {
    result *= 2;
  }

  return result;
}

// Or:
// function findFinalValue(nums: number[], original: number): number {
//   let result = original;

//   while (nums.includes(result)) {
//     result = result * 2;
//   }

//   return result;
// }

// Example usage:
// console.log(findFinalValue([5,3,6,1,12], 3)); // 24
// console.log(findFinalValue([2,7,9], 4)); // 4
