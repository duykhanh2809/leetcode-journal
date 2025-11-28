/**
 * LeetCode 2872. Maximum Number of K-Divisible Components
 * Link: https://leetcode.com/problems/maximum-number-of-k-divisible-components/
 *
 * There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n
 * and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there
 * is an edge between nodes ai and bi in the tree.
 *
 * You are also given a 0-indexed integer array values of length n, where values[i] is the value
 * associated with the ith node, and an integer k.
 *
 * A valid split of the tree is obtained by removing any set of edges, possibly empty, from the
 * tree such that the resulting components all have values that are divisible by k, where the
 * value of a connected component is the sum of the values of its nodes.
 *
 * Return the maximum number of components in any valid split.
 */

/**
 * ## Intuition
 *
 * Bài toán yêu cầu tìm số lượng component tối đa có thể tạo ra bằng cách xóa các cạnh trong cây,
 * sao cho mỗi component có tổng giá trị chia hết cho k.
 *
 * Ý tưởng chính: Sử dụng DFS để duyệt cây từ lá lên gốc. Với mỗi subtree, ta tính tổng giá trị
 * của nó. Nếu tổng này chia hết cho k, ta có thể "cắt" subtree đó ra thành một component riêng
 * (bằng cách trả về 0 thay vì tổng). Nếu không chia hết, ta "mang theo" phần dư lên node cha để
 * kết hợp với các subtree khác.
 *
 * Quá trình này tự nhiên phù hợp với DFS vì:
 * - Bắt đầu từ các lá (subtree nhỏ nhất) và tính tổng
 * - Lan truyền kết quả lên các node cha, cộng dồn các phần dư modulo k
 * - Mỗi khi tổng của một subtree chia hết cho k, đếm nó như một component hợp lệ
 */

/**
 * ## Approach
 *
 * 1. Xây dựng đồ thị (adjacency list) từ danh sách cạnh
 * 2. Sử dụng DFS để duyệt cây, chọn node 0 làm gốc
 * 3. Với mỗi node:
 *    - Tính tổng giá trị của node và tất cả các subtree con
 *    - Nếu tổng chia hết cho k:
 *      - Tăng biến đếm result
 *      - Trả về 0 (cắt subtree này ra)
 *    - Nếu không chia hết:
 *      - Trả về tổng (mang phần dư lên node cha)
 * 4. Trả về số lượng component đã đếm được
 *
 * Lưu ý: Vì cây là undirected, ta có thể chọn bất kỳ node nào làm gốc mà không ảnh hưởng kết quả.
 */

/**
 * ## Complexity
 *
 * - Time: O(n) - duyệt qua tất cả n nodes một lần
 * - Space: O(n) - cho adjacency list và call stack của DFS
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} values
 * @param {number} k
 * @return {number}
 */
function maxKDivisibleComponents(
  n: number,
  edges: number[][],
  values: number[],
  k: number
): number {
  const graph: number[][] = Array.from({ length: n }, () => []);
  // Build adjacency list
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  let result = 0;

  function dfs(node: number, parent: number): number {
    let sum = values[node];

    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue;

      const childSum = dfs(neighbor, node);
      sum += childSum;
    }

    // If this subtree sum is divisible by k -> form a component
    if (sum % k === 0) {
      result++;
      return 0; // cut this subtree here
    }

    return sum;
  }

  dfs(0, -1);
  return result;
}

// Example usage:
// console.log(maxKDivisibleComponents(
//   5,
//   [[0,2],[1,2],[1,3],[2,4]],
//   [1,8,1,4,4],
//   6
// )); // 2
// console.log(maxKDivisibleComponents(
//   7,
//   [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]],
//   [3,0,6,1,5,2,1],
//   3
// )); // 3

