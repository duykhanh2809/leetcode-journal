# Notes – 2435. Paths in Matrix Whose Sum Is Divisible by K

## 🎯 Mục tiêu bài toán

Tính số đường đi từ (0,0) đến (m-1,n-1), chỉ đi xuống hoặc sang phải, sao cho:

```
(sum % k === 0)
```

Path tổng hợp grid[i][j] tại mỗi bước.

## 🔑 Ý tưởng lõi đã rút ra

- Không thể lưu tổng thật vì số ô có thể lên đến 50,000.
- Dùng DP theo **remainder** để tối ưu.

## 🧩 Định nghĩa DP

```
dp[i][j][r] = số cách đi đến vị trí (i, j)
              sao cho tổng các ô % k = r
```

## 📌 Khởi tạo

```
dp[0][0][grid[0][0] % k] = 1
```

## 🔁 Chuyển trạng thái

Tại mỗi ô (i, j), tính remainder mới:

```
newR = (oldR + grid[i][j] % k) % k
```

Nhận giá trị từ:

- trên: dp[i-1][j][oldR]
- trái: dp[i][j-1][oldR]

Cộng dồn:

```
dp[i][j][newR] += dp_prev
```

## 🧮 Đáp án cuối

```
dp[m-1][n-1][0]
```

## 🚀 Điều quan trọng cần nhớ

- Mọi bài dạng: “tổng path thỏa điều kiện modulo” → **luôn dùng 3D DP remainder**
- Không bao giờ dùng sum trực tiếp
- Mini-optimization: Có thể tối ưu memory về 2 hàng (but unnecessary)

## ✔ Ghi chú cá nhân giúp lần sau làm lại nhanh

- Nhìn thấy từ khóa “sum divisible”, “paths in matrix” → lập tức bật pattern này.
- Cốt lõi bài không khó, chỉ dài vì m,n lớn (5e4 cells).
- Transition là phần dễ sai nhất → luôn viết hàm newR.
