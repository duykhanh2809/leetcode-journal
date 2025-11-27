// C1: Pass all case, but time limit exceed - TLE
function maxSubarraySum(nums: number[], k: number) {
  // Tạo mảng prefix sum
  //   const ps = Array.from(
  //     { length: nums.length },
  //     (_, index) => ps[index - 1] + nums[index]
  //   );
  const ps = new Array(nums.length);

  for (let i = 0; i < ps.length; i++) {
    // Trời ơi cẩn thận các logic như này, dùng dấu ngoặc ko là sai chả hiểu sao sai á.
    ps[i] = (ps[i - 1] ?? 0) + nums[i];
  }

  // return ps;

  // while (subArrayLength Divisble by K < nums.length) {
  // for loop nums, length = subArrayLength, append sum to sumArr
  // end loop
  // add subArrayLength+=K
  // }

  // return Math in list
  const allSums = new Set<number>();
  let subArrLength = k;

  while (subArrLength <= nums.length) {
    for (let j = 0; j <= nums.length - subArrLength; j++) {
      // Sum(l,r) = S(r) - S(l-1) (index l, r include l and r)
      const sumSubArr = ps[j + subArrLength - 1] - (j === 0 ? 0 : ps[j - 1]);
      allSums.add(sumSubArr);
    }
    subArrLength += k;
  }

  return Math.max(...allSums);
}

maxSubarraySum([1, 2], 1);

// C2:

function maxSubarraySum2(nums: number[], k: number) {
  let n = nums.length;
  let prefixSum = 0;
  let maxSum = -Number.MAX_SAFE_INTEGER;
  let kSum: number[] = Array(k).fill(Number.MAX_SAFE_INTEGER / 2);

  kSum[k - 1] = 0;
  for (let i = 0; i < n; i++) {
    prefixSum += nums[i];
    maxSum = Math.max(maxSum, prefixSum - kSum[i % k]);
    kSum[i % k] = Math.min(kSum[i % k], prefixSum);
  }
  return maxSum;
}
