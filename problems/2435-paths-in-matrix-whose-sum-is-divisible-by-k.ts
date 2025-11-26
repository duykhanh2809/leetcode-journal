// 2435. Paths in Matrix Whose Sum Is Divisible by K
// https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/description/?envType=daily-question&envId=2025-11-26
// Solution: 3D DP (i, j, remainder)
// Time: O(m * n * k), Space: O(m * n * k)

const MOD = 1e9 + 7;

export function numberOfPaths(grid: number[][], k: number): number {
  const m = grid.length;
  const n = grid[0].length;

  // dp[i][j][r] = số cách để đi đến cell (i,j) với tổng % k = r
  const dp: number[][][] = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Array(k).fill(0))
  );

  const firstMod = grid[0][0] % k;
  dp[0][0][firstMod] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;

      const currentMod = grid[i][j] % k;

      // Đi từ trên xuống
      if (i > 0) {
        for (let r = 0; r < k; r++) {
          const newR = (r + currentMod) % k;
          dp[i][j][newR] = (dp[i][j][newR] + dp[i - 1][j][r]) % MOD;
        }
      }

      // Đi từ trái sang
      if (j > 0) {
        for (let r = 0; r < k; r++) {
          const newR = (r + currentMod) % k;
          dp[i][j][newR] = (dp[i][j][newR] + dp[i][j - 1][r]) % MOD;
        }
      }
    }
  }

  return dp[m - 1][n - 1][0];
}
