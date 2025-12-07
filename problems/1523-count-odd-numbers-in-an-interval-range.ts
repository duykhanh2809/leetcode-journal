// 1523. Count Odd Numbers in an Interval Range

function countOdds(low: number, high: number): number {
  let result = 0;
  if (low % 2 === 1) {
    result++;
    low++;
  }
  if (high % 2 === 1) {
    result++;
    high--;
  }

  return result + (high - low) / 2;
}
