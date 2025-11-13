/**
 * LeetCode 3228. Maximum Number of Operations to Move Ones to the End
 * Link: https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end/
 *
 * You are given a binary string s.
 * You can perform the following operation on the string any number of times:
 * - Choose any index i from the string where i + 1 < s.length such that s[i] == '1' and s[i + 1] == '0'.
 * - Move the character s[i] to the right until it reaches the end of the string or another '1'.
 *
 * Return the maximum number of operations that you can perform.
 */

/**
 * ## Intuition
 *
 * The key insight is that we want to maximize the number of operations by moving '1's as far right as possible.
 * When we encounter a '0' after a sequence of '1's, we can move all those accumulated '1's past this '0'.
 * Each '1' that we move past a '0' counts as one operation.
 *
 * The greedy approach: count how many '1's we've seen so far, and whenever we see a '0' that comes after
 * at least one '1', we can perform operations equal to the number of '1's we've accumulated.
 */

/**
 * ## Approach
 *
 * 1. Initialize a counter for operations and a counter for the number of '1's seen so far.
 * 2. Start counting '1's from the beginning.
 * 3. When we encounter a '0' and we have seen at least one '1' before it (i.e., s[i-1] == '1'),
 *    we can move all accumulated '1's past this '0', which gives us `cnt1` operations.
 * 4. Continue until the end of the string.
 *
 * Why this works: Each '1' can be moved past each '0' that appears after it. By counting '1's
 * and adding them to the total whenever we see a '0' after a '1', we count all possible moves.
 */

/**
 * ## Complexity
 *
 * - Time: O(n) where n is the length of the string
 * - Space: O(1) auxiliary space
 */

/**
 * @param {string} s
 * @return {number}
 */
function maxOperations(s: string): number {
  let cnt = 0;
  const n = s.length;
  let cnt1 = s[0] === "1" ? 1 : 0;

  for (let i = 1; i < n; i++) {
    if (s[i] === "1") {
      cnt1++;
    } else if (s[i - 1] === "1") {
      cnt += cnt1;
    }
  }

  return cnt;
}

// Example usage:
// console.log(maxOperations("1001101")); // 4
// console.log(maxOperations("00111"));   // 0
