# 🔍 First-Last Index Pattern

## Intuition

When a problem asks about counting or finding subsequences/substrings with specific boundary constraints, we can use the **first-last index pattern**. Instead of checking all possible pairs or combinations, we identify the boundaries (first and last occurrence) and count elements between them.

## Key Insight

For problems involving **symmetric structures** (like palindromes) or **boundary-based counting**:
- Find the first and last occurrence of a boundary element
- Count or process elements between these boundaries
- This avoids checking all possible pairs

## When to Use

- **Palindrome counting**: Count palindromic subsequences/substrings
- **Boundary problems**: Elements must appear at specific positions
- **Range queries**: Count unique elements in a range defined by boundaries
- **Symmetric structures**: Problems where structure depends on matching endpoints

## Pattern Template

```javascript
function countWithBoundaries(s) {
  const uniqueElements = new Set(s);
  let result = 0;

  for (const element of uniqueElements) {
    const first = s.indexOf(element);
    const last = s.lastIndexOf(element);

    // Process elements between first and last
    const between = new Set();
    for (let k = first + 1; k < last; k++) {
      between.add(s[k]);
    }

    result += between.size; // or process based on problem
  }

  return result;
}
```

## Example: LeetCode 1930

**Problem**: Count unique palindromic subsequences of length 3.

**Solution**: 
- For palindrome `aXa`, `a` must appear at both ends
- For each unique character `a`, find first and last occurrence
- Count unique middle characters between these positions
- Each unique middle character creates one distinct palindrome

```javascript
function countPalindromicSubsequence(s) {
  const letters = new Set(s);
  let ans = 0;

  for (const letter of letters) {
    const first = s.indexOf(letter);
    const last = s.lastIndexOf(letter);
    
    const between = new Set();
    for (let k = first + 1; k < last; k++) {
      between.add(s[k]);
    }
    
    ans += between.size;
  }

  return ans;
}
```

## Optimizations

1. **Early termination**: If first === last, skip (no middle elements)
2. **Precomputation**: Precompute first/last indices for all characters in one pass
3. **Space optimization**: Use bitmask instead of Set when counting small alphabets

## Related Patterns

- **Two-pointer technique**: For symmetric problems
- **Prefix/Suffix arrays**: When boundaries depend on prefix/suffix properties
- **Sliding window**: For contiguous subarrays with boundary constraints

