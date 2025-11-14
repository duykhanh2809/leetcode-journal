/**
 * LeetCode 2536. Increment Submatrices by One
 * Link: https://leetcode.com/problems/increment-submatrices-by-one/
 *
 * You are given an n x n matrix initially filled with zeros.
 * For each query, increment all elements in a rectangular submatrix by 1.
 */

/**
 * ## Intuition
 *
 * - Start with a matrix of zeros
 * - For each query, we need to add 1 to all cells in the specified rectangle
 * - The rectangle is defined by top-left (row1, col1) and bottom-right (row2, col2)
 * - Process each query by iterating through all affected cells and incrementing them
 */

/**
 * ## Approach
 *
 * 1. Initialize an n x n matrix filled with zeros
 * 2. For each query [row1, col1, row2, col2]:
 *    - Iterate through all rows from row1 to row2 (inclusive)
 *    - For each row, iterate through all columns from col1 to col2 (inclusive)
 *    - Increment each cell by 1
 * 3. Return the final matrix
 */

/**
 * ## Complexity
 *
 * - Time: O(q * (row2 - row1 + 1) * (col2 - col1 + 1)) where q is the number of queries
 * - Space: O(n^2) for the result matrix
 *
 * Note: For better performance with many queries, consider using 2D prefix sum / difference array
 * which would be O(q + n^2) time complexity.
 */

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
function rangeAddQueries(n, queries) {
  const mat = Array.from({ length: n }, () => new Array(n).fill(0));

  for (const query of queries) {
    const [row1, col1, row2, col2] = query;

    // Iterate through all rows in the submatrix
    for (let i = row1; i <= row2; i++) {
      const currentRow = mat[i];
      // Iterate through all columns in the submatrix
      for (let j = col1; j <= col2; j++) {
        currentRow[j]++;
      }
    }
  }

  return mat;
}

// Example usage:
// console.log(rangeAddQueries(3, [[1,1,2,2],[0,0,1,1]]));
// Output: [[1,1,0],[1,2,1],[0,1,1]]
