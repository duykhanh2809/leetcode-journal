// 3432. Count Partitions with Even Sum Difference

//  C1:
function countPartitions(nums: number[]): number {
  const ps = new Array(nums.length);

  for (let i = 0; i < nums.length; i++) {
    ps[i] = (ps[i - 1] || 0) + nums[i];
  }

  let r = 0;

  for (let j = 0; j < nums.length - 1; j++) {
    if ((2 * ps[j] - ps[nums.length - 1]) % 2 === 0) r++;
  }

  return r;
}

// C2: Recommended
function countPartitions2(nums: number[]): number {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    leftSum += nums[i];
    const rightSum = totalSum - leftSum;
    const diff = Math.abs(leftSum - rightSum);
    if (diff % 2 === 0) {
      count++;
    }
  }
  return count++;
}
