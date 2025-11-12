# 🔄 GCD Pattern

## Intuition

Many number-theory problems boil down to whether we can drive the gcd of a set down to 1. Once a single 1 appears, it often acts as an anchor that propagates through adjacent operations.

## Key Observations (LeetCode 2654)

- **Key 1 — Global GCD Gatekeeper**: If `gcd(nums) > 1`, no sequence of adjacent gcd operations can create a 1. The array is stuck ➜ return `-1`.
- **Key 2 — Ones Spread Quickly**: Each existing `1` can convert a neighbor to `1` in one operation. If there are `c` ones, we need `n - c` operations to finish.
- **Key 3 — Shortest GCD-1 Window**: Without ones, find the shortest subarray whose gcd is 1. Turning that window into a single `1` costs `length - 1` operations and unlocks the propagation phase.

## Pattern Template

```javascript
function minOperations(nums) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const gcdList = (arr) => arr.reduce((acc, num) => gcd(acc, num), 0);

  const totalGCD = gcdList(nums);
  if (totalGCD > 1) return -1; // Key 1

  const ones = nums.filter((num) => num === 1).length;
  if (ones > 0) return nums.length - ones; // Key 2

  let loop = true;
  let k = 2; // Key 3

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

  return nums.length - 1 + (k - 1);
}
```

## Where It Appears

- **Adjacent Reduction Problems**: Replacing neighbors with gcd/ lcm / sum until a target value appears.
- **Array Simplification**: Determining if all numbers can be reduced to a specific value (often 1).
- **Subarray GCD Queries**: Finding shortest/longest subarray with gcd constraints.

## Tips

- Precompute gcds incrementally; reuse the previous gcd when expanding a window.
- Early break when the running gcd drops below the target.
- Combine counting tricks (like number of ones) with gcd windows for tighter bounds.
