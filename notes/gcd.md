# 📐 Greatest Common Divisor (GCD)

## Intuition

The **Greatest Common Divisor (GCD)** of two integers is the largest positive integer dividing both numbers without a remainder. GCD lets us reason about when it is possible to reduce values to 1, simplify ratios, or merge values via pairwise operations.

## Euclidean Algorithm

The Euclidean algorithm is the fastest way to compute gcd(a, b):

```javascript
function findGCD = (a, b) => {
  return b === 0 ? a : findGCD(b, a % b)
};
```

### Why It Works

Repeatedly replacing `(a, b)` with `(b, a % b)` drops the larger number while preserving the set of common divisors. The process stops when the remainder is 0, leaving the gcd.

## Complexity

- **Time**: O(log min(a, b)) operations
- **Space**: O(1) iterative, O(log min(a, b)) recursive

## Properties

- `gcd(a, 0) = |a|`
- `gcd(a, b) = gcd(b, a)` (commutative)
- `gcd(a, b) = gcd(a - b, b)` (subtractive form)
- If `d = gcd(a, b)`, then `gcd(a/d, b/d) = 1`
- `lcm(a, b) = |a * b| / gcd(a, b)`

## Example: Transforming an Array to Ones

LeetCode 2654 asks for the minimum operations to turn all array elements into 1, given we can replace adjacent numbers with their gcd. The key observations:

- If `gcd(nums) > 1`, there is no path to a 1 ➜ answer `-1`.
- Existing ones are anchors: each non-one next to a 1 becomes 1 in a single step.
- Without ones, we scan for the shortest subarray with gcd 1, because that subarray lets us create the first 1; afterwards we propagate it.

```javascript
// helper for array gcd
function gcdList(nums) {
  let g = 0;
  for (const num of nums) {
    g = gcd(num, g);
  }
  return g;
}
```

This pattern combines number theory with sliding windows to detect when gcd collapses to 1.
