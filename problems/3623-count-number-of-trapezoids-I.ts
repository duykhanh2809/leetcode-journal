// 3623. Count Number of Trapezoids I
//Link: https://leetcode.com/problems/count-number-of-trapezoids-i/?envType=daily-question&envId=2025-12-02
function countTrapezoids(points: number[][]): number {
  const pointNum: Map<number, number> = new Map();
  const mod: bigint = 1000000007n;
  let ans: bigint = 0n,
    sum: bigint = 0n;

  for (const point of points) {
    const y: number = point[1];
    pointNum.set(y, (pointNum.get(y) || 0) + 1);
  }

  for (const pNum of pointNum.values()) {
    const edge: bigint = (BigInt(pNum) * BigInt(pNum - 1)) / 2n;
    ans = (ans + edge * sum) % mod;
    sum = (sum + edge) % mod;
  }

  return Number(ans);
}
