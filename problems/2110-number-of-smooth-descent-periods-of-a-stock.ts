// 2110. Number of Smooth Descent Periods of a Stock

// C1: Low level
// function getDescentPeriods(prices: number[]): number {
//     let s = [prices[0]];
//     let r = 1;

//     for (let i = 1; i < prices.length; i++) {
//         r++;

//         if (prices[i] === s[s.length - 1] - 1) {
//             r += s.length;
//             s.push(prices[i]);
//         } else {
//             s = [prices[i]];
//         }
//     }

//     return r;
// };

// C1 cũng là mình tự code, từ C1 mới tối ưu thành cách 2 như này:
function getDescentPeriods(prices: number[]): number {
  let s = 1;
  let r = 1;

  for (let i = 1; i < prices.length; i++) {
    r++;

    if (prices[i] === prices[i - 1] - 1) {
      r = r + s;
      s++;
    } else {
      s = 1;
    }
  }

  return r;
}
