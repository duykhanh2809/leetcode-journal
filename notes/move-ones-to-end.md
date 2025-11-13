# 3228. Maximum Number of Operations to Move Ones to the End

## 🧩 Tóm tắt bài toán

Cho một chuỗi nhị phân `s`, ta có thể thực hiện nhiều lần thao tác sau:

- Chọn một vị trí `i` sao cho `s[i] == '1'` và `s[i + 1] == '0'`.
- Di chuyển ký tự `'1'` đó sang phải cho đến khi nó gặp `'1'` khác hoặc đến cuối chuỗi.

Yêu cầu: trả về **số lượng tối đa phép di chuyển (operations)** có thể thực hiện.

---

## 💡 Ý tưởng chính

- Mỗi ký tự `'1'` **có thể “đóng góp”** vào số lượng phép di chuyển khi gặp `'0'` ở phía sau.
- Khi gặp một cặp `'10'`, toàn bộ các `'1'` **xuất hiện trước vị trí đó** đều có thể tham gia → cộng thêm số `'1'` hiện có (`cnt1`).

---

## 🔍 Pattern nhận dạng

Bài này thuộc nhóm **Prefix Counting / Accumulated Contribution Pattern**  
➡️ Nghĩa là: ta **duyệt từ trái sang phải**, và mỗi phần tử sẽ **đóng góp** vào kết quả dựa trên số phần tử đã gặp trước đó.

---

## 🧠 Cốt lõi thuật toán

1. Duyệt chuỗi từ trái sang phải.
2. Duy trì biến `cnt1` = số lượng `'1'` đã gặp.
3. Mỗi khi gặp `'0'` mà ký tự trước nó là `'1'`, cộng `cnt1` vào `ans`.
4. Kết quả cuối cùng là `ans`.

---

## ⚙️ Độ phức tạp

- **Thời gian:** O(n)
- **Không gian:** O(1)

---

## 🧮 Ví dụ minh họa

| i   | s[i] | s[i-1] | cnt1 | cnt | Giải thích         |
| --- | ---- | ------ | ---- | --- | ------------------ |
| 0   | 1    | -      | 1    | 0   | Gặp `'1'` đầu tiên |
| 1   | 0    | 1      | 1    | 1   | `'10'` → cộng 1    |
| 2   | 0    | 0      | 1    | 1   | Không thay đổi     |
| 3   | 1    | 0      | 2    | 1   | Thêm `'1'`         |
| 4   | 1    | 1      | 3    | 1   | Thêm `'1'`         |
| 5   | 0    | 1      | 3    | 4   | `'10'` → cộng 3    |
| 6   | 1    | 0      | 4    | 4   | Kết thúc           |

✅ Kết quả: **4**

---

## 🧾 Kết luận

- Không cần mô phỏng toàn bộ chuỗi.
- Chỉ cần đếm **đóng góp của từng `'1'`** khi gặp `'0'` phù hợp.
- Đây là một pattern thường gặp, áp dụng được cho các bài **“đếm cặp phụ thuộc vào prefix”**.
