/**
 * LeetCode 1018. Binary Prefix Divisible By 5
 * Link: https://leetcode.com/problems/binary-prefix-divisible-by-5/
 *
 * For each prefix nums[0..i], we build the binary number x_i and check whether
 * it is divisible by 5.
 */

/**
 * ## Key Insights
 *
 * - Binary value grows as `x_new = x_old * 2 + bit`
 * - Instead of storing the full number (which explodes), keep `remainder = (remainder * 2 + bit) % 5`
 * - Because `( (x % 5) * 2 + bit ) % 5 == ( (x * 2 + bit) % 5 )`, the remainder matches the real value mod 5
 */

/**
 * ## Approach
 *
 * 1. Initialize `remainder = 0`
 * 2. For each bit in nums:
 *    - Update `remainder = (remainder * 2 + bit) % 5`
 *    - Push `remainder === 0` onto the answer array
 * 3. Return the boolean array
 */

/**
 * ## Complexity
 *
 * - Time: O(n)
 * - Space: O(1) extra (ignoring output)
 */

/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
function prefixesDivBy5(nums) {
  const answer = new Array(nums.length);
  let remainder = 0;

  for (let i = 0; i < nums.length; i++) {
    remainder = (remainder * 2 + nums[i]) % 5;
    answer[i] = remainder === 0;
  }

  return answer;
}

// Example usage:
// console.log(prefixesDivBy5([0, 1, 1])); // [true, false, false]
// console.log(prefixesDivBy5([1, 1, 1])); // [false, false, false]
