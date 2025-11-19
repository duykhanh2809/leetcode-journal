/**
 * LeetCode 1930. Unique Length-3 Palindromic Subsequences
 * Link: https://leetcode.com/problems/unique-length-3-palindromic-subsequences/
 *
 * Given a string s, return the number of unique palindromes of length three
 * that are a subsequence of s.
 */

/**
 * ## Intuition
 *
 * A palindrome of length 3 has the form `aXa` where:
 * - `a` is the same character on both ends (boundaries)
 * - `X` is any character in the middle
 *
 * Key insight: For each unique character `a`, find its first and last occurrence.
 * Count the unique characters between these two positions - each unique middle
 * character creates one distinct palindrome `aXa`.
 */

/**
 * ## Approach
 *
 * 1. Get all unique characters in the string
 * 2. For each unique character:
 *    - Find its first occurrence (indexOf)
 *    - Find its last occurrence (lastIndexOf)
 *    - Count unique characters between first and last (using a Set)
 *    - Add this count to the answer
 * 3. Return the total count
 */

/**
 * ## Complexity
 *
 * - Time: O(n * k) where n is string length and k is number of unique characters
 *   - For each unique char: O(n) to find indices + O(n) to count middle chars
 * - Space: O(k) for unique chars set + O(26) max for middle chars set = O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
function countPalindromicSubsequence(s) {
  const letters = new Set(s);
  let ans = 0;

  for (const letter of letters) {
    const first = s.indexOf(letter);
    const last = s.lastIndexOf(letter);

    // Count unique characters between first and last occurrence
    const between = new Set();
    for (let k = first + 1; k < last; k++) {
      between.add(s[k]);
    }

    ans += between.size;
  }

  return ans;
}

// Example usage:
// console.log(countPalindromicSubsequence("aabca")); // 3
// console.log(countPalindromicSubsequence("adc")); // 0
// console.log(countPalindromicSubsequence("bbcbaba")); // 4
