# 🧠 Notes: Understanding Binary Prefix Generation

## 1. Forming Binary Prefix Numbers

Given `nums = [1, 0, 1]`, prefixes produce:

- `1` -> 1
- `10` -> 2
- `101` -> 5

Each prefix interprets the array from index 0 to i as a binary number.

## 2. Mathematical Relationship

Appending a bit is equivalent to:

```
new_value = old_value * 2 + bit
```

Example:

```
old = 2 (binary 10)
bit = 1
new = 2 * 2 + 1 = 5
```

## 3. Why Modulo Is Enough

When we only care about divisibility (e.g., divisible by 5), we can track:

```
remainder = (remainder * 2 + bit) % 5
```

If `remainder === 0`, the actual number is divisible by 5. This works because modulo distributes over addition and multiplication.

## 4. Common Pitfalls

- Converting every prefix via `parseInt` → O(n²)
- Storing the entire number → overflow for long streams
- Forgetting to apply modulo each step

## 5. Quick Recap

- Shift left = multiply by 2
- Append bit = `+ bit`
- Apply modulo every iteration
- Output `true` when remainder hits 0
