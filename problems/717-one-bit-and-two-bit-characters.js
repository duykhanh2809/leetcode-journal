/**
 * LeetCode 717. 1-bit and 2-bit Characters
 * Link: https://leetcode.com/problems/1-bit-and-2-bit-characters/description/?envType=daily-question&envId=2025-11-18
 *
 * We have two special characters:
 * - 0    -> one-bit character
 * - 10/11 -> two-bit character
 * The input always ends with 0. Check if the last decoded character must be one-bit.
 */

/**
 * ## Intuition
 *
 * Walk through the bits from left to right. Whenever we see a 0, it forms a
 * one-bit character; when we see a 1, it must pair with the next bit to form
 * a two-bit character, so we skip the next index.
 * The last character is one-bit iff we land exactly on the final index.
 */

/**
 * ## Approach
 *
 * 1. Start from index 0.
 * 2. While `i < bits.length - 1`:
 *    - If `bits[i] === 0`, move one step (`i += 1`).
 *    - If `bits[i] === 1`, skip the next bit (`i += 2`).
 * 3. After the loop, we succeed only when `i === bits.length - 1`.
 *
 * Alternative views:
 * - Use a queue (shift) to pop characters until one element remains.
 * - Maintain a `nextAllowed` pointer similar to distance-check problems.
 */

/**
 * ## Complexity
 *
 * - Time: O(n)
 * - Space: O(1)
 */

/**
 * @param {number[]} bits
 * @return {boolean}
 */
function isOneBitCharacter(bits) {
  let i = 0;

  while (i < bits.length - 1) {
    if (bits[i] === 1) {
      i += 2; // consume 10 or 11
    } else {
      i += 1; // consume 0
    }
  }

  return i === bits.length - 1;
}

// Example usage:
// console.log(isOneBitCharacter([1, 0, 0])); // true
// console.log(isOneBitCharacter([1, 1, 1, 0])); // false

/*
function isOneBitCharacter(bits: number[]): boolean {
    for(let i = 0; i < bits.length; i++){
        if(i == bits.length-1) return true;
        if(bits[i] == 1) i++;
    }
    return false
}
*/

/*
function isOneBitCharacter(bits: number[]): boolean {
    while(bits.length > 1) {
        const character = bits.shift()
        if (character === 1)
        bits.shift()
    }

    return bits.length === 1
};
*/
