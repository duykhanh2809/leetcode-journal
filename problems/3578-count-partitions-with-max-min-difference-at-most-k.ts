/**
 * LeetCode 3578. Count Partitions With Max-Min Difference at Most K
 * Link: https://leetcode.com/problems/count-partitions-with-max-min-difference-at-most-k/
 *
 * You are given an integer array nums and an integer k. Your task is to partition nums into
 * one or more non-empty contiguous segments such that in each segment, the difference between
 * its maximum and minimum elements is at most k.
 *
 * Return the total number of ways to partition nums under this condition.
 * Since the answer may be too large, return it modulo 10^9 + 7.
 */

import { AvlTree } from "@datastructures-js/binary-search-tree";

/**
 * ## Intuition
 *
 * Bài toán yêu cầu đếm số cách chia mảng thành các đoạn liên tiếp, sao cho mỗi đoạn có
 * (max - min) <= k.
 *
 * Ý tưởng chính:
 * - Sử dụng **Dynamic Programming**: `dp[i]` = số cách partition đến vị trí `i-1`.
 * - Với mỗi vị trí `i`, ta cần tìm tất cả các vị trí `j` sao cho đoạn `[j, i]` thỏa điều kiện
 *   (max - min <= k). Khi đó, `dp[i+1] += dp[j]` (partition tại `i`, đoạn cuối là `[j, i]`).
 * - Để tối ưu, ta dùng **sliding window** với AVL Tree để track min/max trong O(log n).
 * - Dùng **prefix sum** của dp để tính nhanh tổng `dp[j] + dp[j+1] + ... + dp[i]` trong O(1).
 *
 * Cụ thể:
 * - Khi window `[j, i]` thỏa điều kiện → tất cả các cách partition đến `j-1` đều có thể
 *   mở rộng thêm đoạn `[j, i]` → `dp[i+1] += prefix[i] - prefix[j-1]`.
 * - Khi window không thỏa → dịch `j` sang phải cho đến khi thỏa.
 */

/**
 * ## Approach
 *
 * 1. Khởi tạo:
 *    - `dp[0] = 1` (có 1 cách partition mảng rỗng)
 *    - `prefix[0] = 1` (prefix sum của dp)
 *    - AVL Tree `cnt` để lưu các giá trị distinct trong window hiện tại
 *    - Map `freq` để đếm frequency của mỗi giá trị
 *
 * 2. Duyệt từ trái sang phải với sliding window `[j, i]`:
 *    - Thêm `nums[i]` vào window (cập nhật AVL Tree và freq)
 *    - Dịch `j` sang phải cho đến khi `max - min <= k`
 *    - Khi window thỏa điều kiện:
 *      - `dp[i+1] = prefix[i] - prefix[j-1]` (tất cả cách partition từ `j` đến `i`)
 *      - `prefix[i+1] = prefix[i] + dp[i+1]`
 *
 * 3. Trả về `dp[n]` (số cách partition toàn bộ mảng).
 */

/**
 * ## Complexity
 *
 * - Time: O(n log n) - mỗi phần tử được insert/remove vào AVL Tree tối đa 1 lần, mỗi thao tác O(log n)
 * - Space: O(n) - cho dp, prefix arrays, và AVL Tree
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function countPartitions(nums: number[], k: number): number {
  const n = nums.length;
  const mod = 1e9 + 7;
  const dp = new Array<number>(n + 1).fill(0);
  const prefix = new Array<number>(n + 1).fill(0);
  const cnt = new AvlTree<number>();
  const freq = new Map<number, number>();

  dp[0] = 1;
  prefix[0] = 1;

  for (let i = 0, j = 0; i < nums.length; i++) {
    // Thêm nums[i] vào window
    const currentFreq: number = freq.get(nums[i]) || 0;
    freq.set(nums[i], currentFreq + 1);
    if (currentFreq === 0) {
      cnt.insert(nums[i]);
    }

    // Dịch j sang phải cho đến khi window [j, i] thỏa điều kiện (max - min <= k)
    while (j <= i && cnt.max().getValue() - cnt.min().getValue() > k) {
      const leftFreq: number = freq.get(nums[j]) || 0;
      freq.set(nums[j], leftFreq - 1);
      if (leftFreq === 1) {
        cnt.remove(nums[j]);
      }
      j++;
    }

    // Tính dp[i+1]: số cách partition đến vị trí i
    // = tổng tất cả các cách partition từ j đến i (vì đoạn [j, i] thỏa điều kiện)
    dp[i + 1] = (prefix[i] - (j > 0 ? prefix[j - 1] : 0) + mod) % mod;
    prefix[i + 1] = (prefix[i] + dp[i + 1]) % mod;
  }

  return dp[n];
}

// Example usage:
// console.log(countPartitions([1, 2, 3, 4], 2)); // Expected output depends on test cases
