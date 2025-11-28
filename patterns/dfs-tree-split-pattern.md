# 🌳 DFS Tree Split Pattern

## 🧠 Khái niệm

Pattern này xuất hiện khi:

> Cần **chia tách cây** thành các component thỏa mãn điều kiện nào đó bằng cách xóa các cạnh, và ta muốn tối đa hóa số lượng component.

Thay vì thử tất cả các cách xóa cạnh, ta sử dụng DFS để:

- Duyệt cây từ **lá lên gốc** (bottom-up)
- Tính toán **tổng giá trị** của mỗi subtree
- Quyết định **cắt** subtree tại node nào dựa trên điều kiện (thường là chia hết cho một số)
- **Lan truyền phần dư** lên node cha nếu subtree chưa thể tạo thành component

---

## ⚙️ Khi nào dùng

- Bài toán yêu cầu **chia cây** thành các component với điều kiện về tổng/giá trị
- Cần **tối đa hóa** hoặc **tối thiểu hóa** số lượng component
- Điều kiện liên quan đến **tính chia hết** hoặc **ngưỡng giá trị**
- Có thể chọn bất kỳ node nào làm gốc (cây undirected)

Ví dụ điển hình:

- Chia cây thành các component có tổng chia hết cho k
- Chia cây thành các component có tổng >= threshold
- Tối đa hóa số lượng component thỏa điều kiện

---

## 🧩 Template (TypeScript)

```ts
function treeSplitPattern(
  n: number,
  edges: number[][],
  values: number[],
  k: number
): number {
  // 1. Xây dựng đồ thị
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  let result = 0;

  // 2. DFS từ gốc (có thể chọn bất kỳ node nào)
  function dfs(node: number, parent: number): number {
    // Tính tổng giá trị của node hiện tại
    let sum = values[node];

    // Duyệt qua tất cả các node con
    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue; // Tránh quay lại node cha

      const childSum = dfs(neighbor, node);
      sum += childSum; // Cộng dồn tổng từ các subtree con
    }

    // 3. Kiểm tra điều kiện để tạo component
    if (sum % k === 0) {
      result++; // Đếm component mới
      return 0; // Cắt subtree này ra (trả về 0 thay vì sum)
    }

    // 4. Nếu chưa thỏa điều kiện, mang phần dư lên node cha
    return sum;
  }

  dfs(0, -1); // Bắt đầu từ node 0, parent = -1
  return result;
}
```

---

## 🔍 Phân tích chi tiết

### Tại sao DFS từ lá lên gốc?

Cây có cấu trúc phân cấp: mỗi node có thể có nhiều node con, và mỗi edge kết nối một node cha với một node con. Khi chọn một node làm gốc, ta có thể phân tích cây thành các subtree nhỏ hơn dựa trên quan hệ cha-con.

DFS từ lá lên gốc cho phép:

- Bắt đầu từ các **subtree nhỏ nhất** (lá)
- Tính toán tổng giá trị của chúng
- **Lan truyền kết quả lên** các node cha
- Node cha có thể kết hợp phần dư từ nhiều subtree con để kiểm tra xem có thể tạo component không

### Tại sao trả về 0 khi cắt subtree?

Khi một subtree có tổng chia hết cho k, ta quyết định "cắt" nó ra thành một component riêng. Bằng cách trả về 0 thay vì tổng:

- Node cha sẽ không cộng thêm giá trị từ subtree đã bị cắt
- Subtree đó trở thành một component độc lập
- Các subtree khác vẫn có thể tiếp tục được xử lý bình thường

### Tại sao mang phần dư lên node cha?

Nếu tổng của một subtree không chia hết cho k, ta không thể cắt nó ra ngay. Thay vào đó:

- Ta "mang theo" phần dư (tổng % k) lên node cha
- Node cha có thể kết hợp phần dư này với các subtree khác
- Khi tổng của node cha (bao gồm cả phần dư từ các con) chia hết cho k, ta có thể tạo component lớn hơn

---

## 📝 Ví dụ minh họa

Xét cây với `n = 5`, `values = [1,8,1,4,4]`, `k = 6`:

```
    2
   / \
  0   4
 / \
1   3
```

DFS từ node 2 (chọn làm gốc):

1. Node 0: sum = 1 + dfs(1) + dfs(3) = 1 + 8 + 4 = 13 → không chia hết cho 6 → trả về 13
2. Node 1: sum = 8 → không chia hết cho 6 → trả về 8
3. Node 3: sum = 4 → không chia hết cho 6 → trả về 4
4. Node 4: sum = 4 → không chia hết cho 6 → trả về 4
5. Node 2: sum = 1 + 13 + 4 = 18 → chia hết cho 6! → cắt, result = 1

Nhưng nếu ta cắt edge giữa node 1 và 2:

- Component [1,3]: sum = 8 + 4 = 12 → chia hết cho 6 ✓
- Component [0,2,4]: sum = 1 + 1 + 4 = 6 → chia hết cho 6 ✓
- Result = 2

Thuật toán DFS tự động tìm được cách chia tối ưu này!

---

## 🎯 Lưu ý quan trọng

1. **Chọn gốc tùy ý**: Vì cây là undirected, ta có thể chọn bất kỳ node nào làm gốc mà không ảnh hưởng kết quả.

2. **Tránh quay lại node cha**: Luôn kiểm tra `neighbor !== parent` để tránh vòng lặp vô hạn.

3. **Điều kiện cắt**: Điều kiện có thể là `sum % k === 0`, `sum >= threshold`, hoặc bất kỳ điều kiện nào khác.

4. **Tối đa hóa vs tối thiểu hóa**: Pattern này tự nhiên tối đa hóa số component. Để tối thiểu hóa, ta cần thay đổi logic (ví dụ: chỉ cắt khi bắt buộc).

---

## 🔗 Bài toán liên quan

- **LeetCode 2872**: Maximum Number of K-Divisible Components (bài toán này)
- Các bài toán chia cây thành component với điều kiện về tổng/giá trị
- Bài toán tối ưu hóa trên cây sử dụng DFS

---

## 💡 Tips

- Luôn bắt đầu từ việc xây dựng adjacency list
- Sử dụng biến global hoặc closure để đếm số component
- DFS tự nhiên xử lý cấu trúc cây một cách hiệu quả
- Nếu cần hiểu sâu hơn về DFS, tham khảo [DFS Explore Card](https://leetcode.com/explore/learn/card/graph/)
