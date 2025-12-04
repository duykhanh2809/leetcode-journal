# collision-of-robots

## 1. Tóm tắt bài toán

Bài toán **Collision of Robots** (LeetCode) mô phỏng các robot di chuyển trên một trục số.

Input gồm:
- **`positions: number[]`** – vị trí ban đầu của từng robot trên trục số (không trùng nhau).
- **`healths: number[]`** – lượng máu (health) ban đầu của từng robot.
- **`directions: string`** – chuỗi ký tự chỉ hướng di chuyển của robot, mỗi ký tự là:
  - `'L'`: robot đi sang trái.
  - `'R'`: robot đi sang phải.

Các robot di chuyển đến khi có va chạm xảy ra:
- **Khi một robot đi sang phải (`R`) gặp một robot đi sang trái (`L`) phía trước nó → xảy ra va chạm.**
- Robot nào có **health lớn hơn** sẽ **sống**, với `health -= 1`.
- Nếu **health bằng nhau** → **cả hai cùng chết**.

Mục tiêu: **trả về mảng health cuối cùng của các robot còn sống, theo đúng thứ tự ban đầu ban đầu của input.**

---

## 2. Phân tích quan trọng

### (a) Vì sao dùng stack?

- Robot đi sang phải (`R`) chỉ có thể va chạm với robot đi sang trái (`L`) đứng **bên phải nó** trên trục số.
- Khi ta sort các robot theo `positions` từ trái sang phải và duyệt lần lượt:
  - Robot đi sang **phải** (`R`) có thể **gặp các robot đi sang trái (`L`) xuất hiện sau nó**.
  - Ngược lại, robot `L` sẽ **quét ngược lại** các robot `R` đang chờ phía bên trái.

Do đó, ta dùng **stack** để lưu các robot **đi sang phải (`R`) đang “chờ” va chạm**:
- Khi gặp một robot đi sang trái (`L`):
  - Ta **lấy dần robot `R` từ stack ra** (theo thứ tự gần nhất bên trái → va chạm trước).
  - Mỗi lần va chạm, ta so sánh health và cập nhật theo luật:
    - Nếu `healthR > healthL` → robot `R` sống, `healthR--`, robot `L` chết.
    - Nếu `healthR < healthL` → robot `L` sống, `healthL--`, robot `R` chết (pop khỏi stack), tiếp tục so với robot `R` tiếp theo (nếu còn).
    - Nếu `healthR == healthL` → cả hai chết, dừng xử lý cho robot `L`.

**Tóm lại:**
- Stack lưu các robot `R` **chưa va chạm**.
- Mỗi robot `L` đến sẽ “đụng dần” các robot `R` trong stack.
- Thứ tự xử lý va chạm đúng với thứ tự không gian (gần nhất va chạm trước).

### (b) Vì sao mỗi cặp chỉ có 1 lần va chạm?

Trong đề bài, đôi khi người đọc dễ hiểu nhầm theo kiểu “va chạm giữa hai robot thì tính như 2 lần giảm health”, nhưng **thực tế không phải vậy**.

Quy tắc chuẩn khi `R` gặp `L` là:
- **Nếu `hR > hL`** → robot `R` sống, `hR = hR - 1`, robot `L` chết.
- **Nếu `hR < hL`** → robot `L` sống, `hL = hL - 1`, robot `R` chết.
- **Nếu `hR == hL`** → **cả hai chết**, không còn robot nào.

Ở đây **mỗi lần hai robot va chạm chỉ có đúng 1 lần giảm health cho robot sống sót (nếu có)**:
- Không có chuyện `-2` health hay cộng/trừ hai lần.
- Một va chạm = một lần đối đầu giữa 2 robot. Kết quả là:
  - Hoặc **1 robot sống với health giảm đúng 1**.
  - Hoặc **2 robot cùng chết**.

Vì vậy, khi cài đặt:
- Mỗi vòng xử lý va chạm chỉ cần **áp dụng đúng 1 lần cập nhật health** theo luật trên.
- Không được “nhân đôi” hiệu ứng hay tưởng rằng có 2 va chạm liên tiếp giữa cùng một cặp.

### (c) Tại sao phải sort theo `positions`?

Ban đầu, các robot được cho theo **thứ tự index trong mảng**, không đảm bảo là sắp xếp theo vị trí trên trục số.

Nhưng chuyển động và va chạm diễn ra trên **trục không gian (theo `positions`)**, nên ta cần:
- **Sort robot theo `positions` tăng dần** để mô phỏng việc các robot di chuyển từ trái sang phải một cách đúng vật lý.
- Sau khi sort, ta có thể duyệt từ trái sang phải:
  - Gặp robot `R` → đưa vào stack (chờ robot `L` phía trước nó).
  - Gặp robot `L` → xử lý va chạm với các robot `R` bên trái (trong stack).

Nếu không sort:
- Thứ tự va chạm sẽ **sai hoàn toàn**, vì có thể robot đứng **bên phải** lại được xử lý trước robot **bên trái**.
- Điều này phá vỡ logic “R gặp L phía trước” và làm sai toàn bộ simulation.

---

## 3. Sketch thuật toán (tóm tắt ý tưởng)

1. Tạo mảng `robots` chứa các object `{ pos, health, dir, index }`.
2. Sort `robots` theo `pos` tăng dần.
3. Duyệt từ trái sang phải:
   - Nếu robot đi sang phải (`R`) → push vào stack.
   - Nếu robot đi sang trái (`L`) →
     - Trong khi stack còn robot `R` và robot hiện tại còn sống:
       - So sánh health giữa robot `R` (trên đỉnh stack) và robot `L` hiện tại.
       - Áp dụng luật va chạm (hơn máu thì sống và `health--`, kém máu thì chết, bằng nhau thì cả hai chết).
4. Sau khi duyệt xong, các robot còn sống (cả trong stack lẫn các robot `L` không va chạm) sẽ có health cuối cùng.
5. Trả về mảng `health` cuối cùng **theo đúng thứ tự index ban đầu**.

Pattern này giúp giải nhanh các bài toán **mô phỏng va chạm 1D giữa các thực thể di chuyển hai hướng**, đặc biệt khi chỉ có va chạm kiểu `R` gặp `L`.
