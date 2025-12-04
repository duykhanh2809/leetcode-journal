/**
 * LeetCode 2211. Count Collisions on a Road
 * Link: https://leetcode.com/problems/count-collisions-on-a-road/
 *
 * There are n cars on an infinitely long road. The cars are numbered from 0 to n - 1 from left to right
 * and each car is present at a unique point.
 *
 * You are given a 0-indexed string `directions` of length n. `directions[i]` can be either:
 * - 'L' (moving left)
 * - 'R' (moving right)
 * - 'S' (staying still)
 *
 * All moving cars have the same speed. When cars collide:
 * - When two cars moving in opposite directions collide, collisions += 2.
 * - When a moving car collides with a stationary car, collisions += 1.
 * After a collision, the cars involved stop and remain at that position.
 *
 * Return the total number of collisions that will happen on the road.
 */

/**
 * ## Intuition
 *
 * Các xe ở ngoài cùng biên nếu đi **ra ngoài** thì sẽ không bao giờ va chạm:
 * - Tất cả các 'L' liên tiếp ở **đầu** chuỗi sẽ đi mãi sang trái, không gặp ai.
 * - Tất cả các 'R' liên tiếp ở **cuối** chuỗi sẽ đi mãi sang phải, không gặp ai.
 *
 * Sau khi bỏ hai đoạn này, ở giữa chỉ còn:
 * - 'R', 'L', hoặc 'S' nhưng **mọi xe còn lại chắc chắn sẽ bị va chạm**.
 *
 * Lý do: nếu còn xe đang di chuyển trong đoạn giữa, phía trước nó sẽ có
 * một xe khác (moving hoặc stationary) khiến nó dừng lại.
 * Do đó, trong đoạn giữa, cứ mỗi ký tự khác 'S' sẽ đóng góp 1 collision.
 */

/**
 * ## Approach
 *
 * 1. Bỏ toàn bộ 'L' ở đầu chuỗi vì chúng đi ra ngoài bên trái, không va chạm.
 * 2. Bỏ toàn bộ 'R' ở cuối chuỗi vì chúng đi ra ngoài bên phải, không va chạm.
 * 3. Xét đoạn còn lại từ i đến j:
 *    - Bất kỳ ký tự nào là 'L' hoặc 'R' đều sẽ gây ra va chạm đúng 1 lần.
 *    - Ký tự 'S' là xe đứng yên, không trực tiếp cộng thêm collision.
 * 4. Đếm số lượng ký tự khác 'S' trong đoạn [i, j] và trả về.
 */

/**
 * ## Complexity
 *
 * - Time: O(n), duyệt chuỗi tối đa 2-3 lần tuyến tính.
 * - Space: O(1), chỉ dùng biến đếm và hai con trỏ.
 */

/**
 * @param {string} directions
 * @return {number}
 */
function countCollisions(directions: string): number {
  const s = directions;

  // Bỏ hết 'L' ở đầu
  let i = 0;
  while (i < s.length && s[i] === "L") i++;

  // Bỏ hết 'R' ở cuối
  let j = s.length - 1;
  while (j >= 0 && s[j] === "R") j--;

  let collisions = 0;

  // Trong đoạn [i, j], mọi 'L' hoặc 'R' đều sẽ va chạm
  for (let k = i; k <= j; k++) {
    if (s[k] !== "S") collisions++;
  }

  return collisions;
}

// Example usage:
// console.log(countCollisions("RLRSLL")); // 5
// console.log(countCollisions("SSRSSRLLRSLLRSRSSRLRRRRLLRRLSSRR"));
