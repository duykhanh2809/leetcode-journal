---
# Dynamic Programing Pattern – Grid Path With Modulo Tracking

## 🧠 Ý tưởng tổng quát
Dạng bài “đi từ (0,0) → (m-1,n-1) chỉ đi xuống hoặc sang phải” thường có điểm chung:

- Có **m × n** ô
- Mỗi ô có một giá trị cần cộng dồn (sum)
- Cần đếm số đường đi thỏa mãn điều kiện modulo k
- Kết quả có thể rất lớn → phải dùng modulo 1e9+7

Vấn đề là **không thể lưu trực tiếp tổng (sum)** vì tổng có thể lên đến:

```
5 * 10^4 cells × 100 = 5,000,000
```

→ Quá lớn để dùng DP trực tiếp theo sum.

## 🎯 Giải pháp chuẩn
**Theo dõi tổng theo modulo (remainder)** thay vì tổng thật.

### Công thức DP:
```
dp[i][j][r] = số cách đi đến (i, j) với tổng % k = r
```

### Transition:
Từ trên xuống:
```
newR = (r + grid[i][j] % k) % k
dp[i][j][newR] += dp[i-1][j][r]
```

Từ trái sang:
```
newR = (r + grid[i][j] % k) % k
dp[i][j][newR] += dp[i][j-1][r]
```

### Khởi tạo:
```
dp[0][0][grid[0][0] % k] = 1
```

### Kết quả:
```
dp[m-1][n-1][0]
```

## 💡 Kỹ thuật quan trọng
- Dùng **3D DP**: (row, col, remainder)
- Luôn mod 1e9+7 khi cộng dồn
- Remainder chạy từ 0 → k-1
- Không bao giờ lưu full sum → chỉ lưu remainder

## 🧩 Pattern áp dụng cho:
- Tổng path chia hết cho k
- Total XOR = k (thay sum → xor)
- Total sum trong khoảng (dùng bitmask DP)
- Count paths với constraint theo sum

---
