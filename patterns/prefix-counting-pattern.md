# Prefix Counting / Accumulated Contribution Pattern

## 🧠 Khái niệm

Pattern này xuất hiện khi:

> Mỗi phần tử trong dãy **đóng góp vào kết quả** dựa trên số phần tử đã gặp trước đó.

Thay vì duyệt hai vòng lặp hoặc mô phỏng toàn bộ quá trình, ta chỉ cần:

- Duy trì một **biến đếm trung gian (prefix)**.
- Cập nhật **kết quả dồn tích (accumulated result)** mỗi khi điều kiện xảy ra.

---

## ⚙️ Khi nào dùng

- Khi kết quả phụ thuộc vào **số phần tử trước đó** thỏa điều kiện nào đó.
- Khi bài toán có dạng:
  > “Mỗi phần tử tạo thêm bao nhiêu kết quả dựa vào trạng thái trước đó?”

Ví dụ điển hình:

- Đếm cặp, đếm chuỗi con, đếm phép biến đổi,...
- Không cần biết toàn bộ lịch sử, chỉ cần **số lượng** (hoặc tổng) trước đó.

---

## 🧩 Template (TypeScript)

```ts
function patternExample(arr: any[]): number {
  let prefix = 0;
  let ans = 0;

  for (let i = 0; i < arr.length; i++) {
    if (isPrefixTrigger(arr[i])) prefix++;
    if (isContributionTrigger(arr[i], arr[i - 1])) ans += prefix;
  }

  return ans;
}
```
