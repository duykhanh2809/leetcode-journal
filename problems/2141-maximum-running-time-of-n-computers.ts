// 2141. Maximum Running Time of N Computers

// Thật sự bài toán này mình thấy rất hay, kiểu nó thực tế làm nhớ lâu á.

// Approach 1: Sorting and Prefix Sum
function maxRunTime(n: number, batteries: number[]): number {
  batteries.sort((a, b) => a - b);
  const live = batteries.splice(-n);
  let remain = batteries.reduce((pre, cur) => pre + cur, 0);

  for (let i = 0; i < live.length - 1; i++) {
    const diff = live[i + 1] - live[i];
    const need = diff * (i + 1);
    if (remain >= need) {
      remain -= need;
      continue;
    }

    return live[i] + Math.trunc(remain / (i + 1));
  }

  return live[live.length - 1] + Math.trunc(remain / live.length);
}

// Approach 2: Binary Search
// Tham khảo Editorial
