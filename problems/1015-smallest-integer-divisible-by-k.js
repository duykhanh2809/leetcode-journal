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
 * @param {number} k
 * @return {number}
 */
function smallestRepunitDivByK(k) {
  let length = 1;
  let remainder = 1;
  const seenRemainder = new Set();

  while (remainder % k !== 0) {
    length++;
    remainder = (remainder * 10 + 1) % k;

    if (seenRemainder.has(remainder)) return -1;
    seenRemainder.add(remainder);
  }

  return length;
};

// Example usage:
// console.log(smallestRepunitDivByK(1)); // 1
// console.log(smallestRepunitDivByK(2)); // -1
// console.log(smallestRepunitDivByK(3)); // 3
