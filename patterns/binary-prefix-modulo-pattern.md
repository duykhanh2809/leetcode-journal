# #️⃣ Binary Prefix + Rolling Mod Pattern

## Core Idea

When processing a binary stream (or any base-b stream), the numeric value evolves as:

```
x_new = x_old * base + current_digit
```

Instead of storing `x_new`, keep only the remainder modulo `M`:

```
remainder = (remainder * base + current_digit) % M
```

Because `( (x % M) * base + digit ) % M == ( (x * base + digit) % M )`, the remainder mirrors the true value modulo `M`.

## When to Use

- Binary prefix divisibility checks (e.g., divisible by 3/5/7…)
- Rolling hash over streaming bits
- Problems like:
  - LeetCode 1018 — Binary Prefix Divisible By 5
  - LeetCode 1680 — Concatenation of Consecutive Binary Numbers
  - Any “is prefix % M == 0?” question

## Template

```javascript
function rollingBinaryMod(bits, M) {
  let remainder = 0;
  const results = [];

  for (const bit of bits) {
    remainder = (remainder * 2 + bit) % M;
    results.push(remainder);
  }

  return results;
}
```

## Tips

- Apply modulo every step to avoid overflow.
- Works for any base: replace `2` by `base`.
- Only the remainder is needed, never the full number.

## Example (LeetCode 1018)

```javascript
function prefixesDivBy5(nums) {
  const answer = new Array(nums.length);
  let remainder = 0;

  for (let i = 0; i < nums.length; i++) {
    remainder = (remainder * 2 + nums[i]) % 5;
    answer[i] = remainder === 0;
  }

  return answer;
}
```

## Example (LeetCode 1015 — base 10 repunit)

```javascript
function smallestRepunitDivByK(k) {
  let length = 1;
  let remainder = 1 % k;
  const seen = new Set();

  while (remainder % k !== 0) {
    if (seen.has(remainder)) return -1;
    seen.add(remainder);

    length++;
    remainder = (remainder * 10 + 1) % k;
  }

  return length;
}
```

## Common Pitfalls

- Building full numbers (will overflow / O(n²) if using parseInt repeatedly)
- Forgetting to take modulo each iteration
- Mixing bases (ensure multiplier matches the base of the stream)
