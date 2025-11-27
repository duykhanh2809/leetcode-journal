## Kỹ thuật Prefix Sum

Dạng bài prefix sum (cộng dồn) là một kỹ thuật dùng để tính tổng một mảng con (subarray) trong mảng ban đầu một cách hiệu quả. Kỹ thuật này hoạt động bằng cách tạo ra một mảng mới (mảng prefix sum) lưu trữ tổng tích lũy của các phần tử từ đầu mảng gốc đến mỗi vị trí. Nhờ đó, tổng của bất kỳ mảng con nào có thể được tính nhanh chóng trong thời gian hằng số (\(O(1)\)) sau khi đã xây dựng xong mảng prefix sum, với độ phức tạp tổng thể là \(O(n)\).

## Cách hoạt động

### 1. Xây dựng mảng prefix sum

- Cho mảng gốc \(A = [a_{0}, a_{1}, a_{2}, ..., a_{n}]\).
- Tạo mảng prefix sum \(S\) với \(S[i] = a*{0} + a*{1} + ... + a\_{i}\).
- Công thức đệ quy: \(S[i] = S[i-1] + a\_{i}\) (với \(S[-1] = 0\) hoặc một phần tử khởi tạo khác bằng \(0\)).

Ví dụ: Nếu \(A = [5, 2, 1, 6, 3, 8]\) thì \(S = [5, 7, 8, 14, 17, 25]\).

### 2. Tính tổng mảng con

Để tính tổng mảng con từ chỉ số \(l\) đến \(r\) (bao gồm cả \(l\) và \(r\)), sử dụng công thức:

\[
\text{Tổng}(l, r) = S[r] - S[l-1]
\]

Ví dụ: Tính tổng từ chỉ số \(2\) đến \(5\) (tương ứng \([1, 6, 3, 8]\)) của mảng gốc phía trên:

\[
S[5] - S[2-1] = S[5] - S[1] = 25 - 7 = 18
\]

## Ưu điểm

- **Hiệu quả**: Thời gian xây dựng mảng prefix sum là \(O(n)\); sau khi xây xong, mỗi truy vấn tổng mảng con chỉ tốn \(O(1)\).
- **Ứng dụng đa dạng**: Prefix sum là kỹ thuật nền tảng cho nhiều bài toán liên quan đến mảng, như tìm mảng con có tổng lớn nhất, đếm số mảng con thỏa điều kiện…
