/**
 * LeetCode 1015. Smallest Integer Divisible by K
 * Link: https://leetcode.com/problems/smallest-integer-divisible-by-k/
 *
 * Find the length of the smallest positive integer n consisting only of digit '1'
 * such that n is divisible by k. If no such n exists, return -1.
 *
 * Note: n can be extremely large, so we never build it explicitly.
 */

/**
 * ## Key Insights
 *
 * - The value of a repunit grows as: `value_new = value_old * 10 + 1`
 * - We only care about divisibility by k, so we track:
 *   `remainder = (remainder * 10 + 1) % k`
 * - If a remainder repeats, we are in a cycle and will never hit 0 ⇒ return -1
 * - At most k different remainders (0..k-1), so after k steps we either find 0 or prove impossible
 */

/**
 * ## Approach
 *
 * 1. Initialize `length = 1`, `remainder = 1 % k`
 * 2. Maintain a `Set` of seen remainders
 * 3. While `remainder % k !== 0`:
 *    - Update `remainder = (remainder * 10 + 1) % k`
 *    - Increase `length`
 *    - If this `remainder` is already in `seen`, return -1 (cycle detected)
 * 4. When `remainder === 0`, return `length`
 */

/**
 * ## Complexity
 *
 * - Time: O(k) — we see at most k distinct remainders
 * - Space: O(k) for the hash set of remainders
 */

/**
 * @param {number} k
 * @return {number}
 */
function smallestRepunitDivByK(k) {
  let length = 1;
  let remainder = 1 % k;
  const seenRemainder = new Set();

  while (remainder % k !== 0) {
    if (seenRemainder.has(remainder)) return -1; // cycle
    seenRemainder.add(remainder);

    length++;
    remainder = (remainder * 10 + 1) % k;
  }

  return length;
}

// Example usage:
// console.log(smallestRepunitDivByK(1)); // 1
// console.log(smallestRepunitDivByK(2)); // -1
// console.log(smallestRepunitDivByK(3)); // 3
