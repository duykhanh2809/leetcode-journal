/**
 * LeetCode 2654. Minimum Number of Operations to Make All Array Elements Equal to 1
 * Link: https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1/?envType=daily-question&envId=2025-11-12
 *
 * We are allowed to replace either nums[i] or nums[i + 1] with gcd(nums[i], nums[i + 1]).
 * The goal is to turn the entire array into ones using the minimum number of operations.
 */

/**
 * ## Intuition
 *
 * - If the gcd of the entire array is greater than 1, we can never create a 1; answer is -1.
 * - If ones already exist, each one helps `clean up` its neighbors.
 * - Otherwise, we need to find the shortest subarray whose gcd is 1 so we can create our first 1.
 */

/**
 * ## Approach
 *
 * 1. Compute the gcd of the whole array. If it is greater than 1, return -1.
 * 2. Count the number of existing ones. If there are any, we can turn the rest into ones in `n - countOnes` operations.
 * 3. If there are no ones, scan for the shortest subarray with gcd 1. Turning that subarray into a single 1 costs `length - 1` operations.
 * 4. After creating the first 1, propagate it across the rest of the array, costing `n - 1` more operations.
 */

/**
 * ## Complexity
 *
 * - Time: O(n^2 log V) in the worst case (`n <= 50`).
 * - Space: O(1) auxiliary.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function minOperations(nums) {
  const findGCD = (a, b) => (b === 0 ? a : findGCD(b, a % b));

  const gcdOfList = (arr) => {
    let g = 0;
    for (const num of arr) {
      g = findGCD(num, g);
    }
    return g;
  };

  // Key 1: Nếu UCLN của cả list > 1 => Ko làm được.
  // Key 2: Nếu có bất kỳ 1 số 1 nào trong list => Số lần cần chuyển = Độ dài - Số lần xuất hiện số 1
  // Key 3: Nếu không có số 1, tìm subarray ngắn nhất có UCLN là 1 và tính số bước để biến đổi tất cả thành 1.

  const totalGCD = gcdOfList(nums);
  if (totalGCD > 1) return -1;

  const ones = nums.filter((num) => num === 1).length;
  if (ones > 0) return nums.length - ones;

  // K: subarray length
  let loop = true;
  let k = 2;

  while (loop) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (gcdOfList(nums.slice(i, i + k)) === 1) {
        loop = false;
        k--;
        break;
      }
    }
    k++;
  }

  // Số bước để tạo được số 1 là: k - 1 bước
  // Số bước để biến đổi tất cả thành 1 là: nums.length - 1 + (k - 1) bước
  return nums.length - 1 + (k - 1);
}

// Example usage:
// console.log(minOperations([2, 6, 3, 4])); // 4
