// 1590. Make Sum Divisible by P


function minSubarray(nums: number[], p: number): number {
  const n = nums.length;
  const total = nums.reduce((a, b) => a + b, 0);
  const need = total % p;

  if (need === 0) return 0;

  // Map prefixMod → index
  const map = new Map<number, number>();
  map.set(0, -1);

  let prefix = 0;
  let ans = n;

  for (let i = 0; i < n; i++) {
      prefix = (prefix + nums[i]) % p;

      // Target prefix value that makes the removed subarray modulo = need
      const target = (prefix - need + p) % p;

      if (map.has(target)) {
          ans = Math.min(ans, i - map.get(target)!);
      }

      // Store/update prefix modulo index
      map.set(prefix, i);
  }

  return ans === n ? -1 : ans;
}
