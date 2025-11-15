/**
 * LeetCode 3234. Count the Number of Substrings With Dominant Ones
 * Link: https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/
 *
 * You are given a binary string s.
 * Return the number of substrings with dominant ones.
 *
 * A string has dominant ones if the number of ones in the string is greater than
 * or equal to the square of the number of zeros in the string.
 * (i.e., count1 >= count0 * count0)
 */

/**
 * ## Intuition
 *
 * We need to count all substrings where the number of '1's >= (number of '0's)^2.
 *
 * The solution uses a prefix array `pre` to track the start of consecutive '1's.
 * For each ending position `i`, we iterate backwards to find valid substrings.
 *
 * Key insight: We only need to consider substrings ending at position `i` and
 * count how many of them satisfy the dominant ones condition.
 */

/**
 * ## Approach
 *
 * 1. Build prefix array `pre`:
 *    - `pre[i+1]` stores the start index of the consecutive '1's segment that ends at position `i`
 *    - If `s[i]` is '0' or follows a '0', `pre[i+1] = i` (new segment starts)
 *    - Otherwise, `pre[i+1] = pre[i]` (continues previous segment)
 *
 * 2. For each ending position `i` (1-indexed):
 *    - Start with `cnt0 = 1` if `s[i-1] == '0'`, else `0`
 *    - Iterate backwards using `j = pre[j]` to find previous '0' positions
 *    - For each segment, calculate `cnt1 = i - pre[j] - cnt0`
 *    - If `cnt0 * cnt0 <= cnt1`, this substring is valid
 *    - Add the minimum of (segment length, valid range) to result
 *
 * 3. The condition `cnt0 * cnt0 <= n` is an optimization to avoid unnecessary iterations
 */

/**
 * ## Complexity
 *
 * - Time: O(n^2) in worst case, but optimized with early termination
 * - Space: O(n) for the prefix array
 */

/**
 * @param {string} s
 * @return {number}
 */
function numberOfSubstringss(s: string): number {
  const n = s.length;
  const pre: number[] = new Array(n + 1);
  pre[0] = -1;

  // Build prefix array: pre[i+1] points to the start of consecutive '1's ending at i
  for (let i = 0; i < n; i++) {
    if (i === 0 || (i > 0 && s[i - 1] === "0")) {
      pre[i + 1] = i; // New segment starts here
    } else {
      pre[i + 1] = pre[i]; // Continue previous segment
    }
  }

  let res = 0;

  // For each ending position i (1-indexed)
  for (let i = 1; i <= n; i++) {
    let cnt0 = s[i - 1] === "0" ? 1 : 0; // Count zeros starting from position i-1
    let j = i; // Current position in the string (1-indexed)

    // Iterate backwards through segments
    while (j > 0 && cnt0 * cnt0 <= n) {
      // Count of '1's in substring from pre[j] to i-1, excluding zeros
      const cnt1 = i - pre[j] - cnt0;

      // Check if this substring has dominant ones
      if (cnt0 * cnt0 <= cnt1) {
        // Add valid substrings in this segment
        res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1);
      }

      // Move to previous segment (jump to previous '0' position)
      j = pre[j];
      cnt0++;
    }
  }

  return res;
}

// Example usage:
// console.log(numberOfSubstrings("00011")); // 5
// console.log(numberOfSubstrings("101101")); // 16
