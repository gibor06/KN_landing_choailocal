# 🛒 Chợ AI Local — Đi chợ thông minh, ăn ngon đúng ngân sách

**Chợ AI Local** là nền tảng thương mại điện tử địa phương ứng dụng trí tuệ nhân tạo (AI) để gợi ý thực đơn thực phẩm theo ngân sách từ sản phẩm thật của tiểu thương địa phương, đồng thời hỗ trợ các hộ kinh doanh nhỏ lẻ quản lý sản phẩm, tồn kho và đơn đặt trước một cách dễ dàng và hiệu quả.

* **Website giới thiệu dự án:** [www.choailocal.site](https://www.choailocal.site/)
* **Đơn vị phát triển:** HUIT EMART LOCAL (Trường Đại học Công Thương TP.HCM)

---

## 📌 Mục lục
1. [Giới thiệu dự án](#1-giới-thiệu-dự-án)
2. [Vấn đề giải quyết](#2-vấn-đề-giải-quyết)
3. [Giải pháp của Chợ AI Local](#3-giải-pháp-của-chợ-ai-local)
4. [Công nghệ cốt lõi](#4-công-nghệ-cốt-lõi)
5. [Quy trình xử lý gợi ý thực đơn](#5-quy-trình-xử-lý-gợi-ý-thực-đơn)
6. [Công thức chấm điểm gợi ý](#6-công-thức-chấm-điểm-gợi-ý)
7. [Chức năng chính trên bản Demo](#7-chức-năng-chính-trên-bản-demo)
8. [Các cập nhật mới nhất (Chất lượng cao)](#8-các-cập-nhật-mới-nhất-chất-lượng-cao)
9. [Đội ngũ phát triển](#9-đội-ngũ-phát-triển)
10. [Lộ trình phát triển & Mô hình kinh doanh](#10-lộ-trình-phát-triển--mô-hình-kinh-doanh)
11. [Hướng dẫn chạy thử nghiệm cục bộ](#11-hướng-dẫn-chạy-thử-nghiệm-cục-bộ)
12. [Thông điệp & Kết luận](#12-thông-điệp--kết-luận)

---

## 1. Giới thiệu dự án

Trong đời sống hằng ngày, câu hỏi **“Hôm nay ăn gì?”** luôn là một bài toán đau đầu đối với sinh viên, người đi làm và các hộ gia đình. Không chỉ là chọn món ăn, họ còn phải cân đối nhiều yếu tố thực tế:
* Ngân sách hiện có là bao nhiêu?
* Nấu cho bao nhiêu người ăn để vừa đủ, tránh lãng phí?
* Nên mua những nguyên liệu nào và mua ở đâu gần nhất?
* Các mặt hàng tại sạp chợ truyền thống có còn hàng không?

Ở phía đối lập, các **tiểu thương chợ truyền thống** và hộ kinh doanh nhỏ lẻ gặp rất nhiều khó khăn trong cuộc đua chuyển đổi số. Họ thiếu công cụ đơn giản để cập nhật tồn kho, giá bán nhanh chóng, cũng như chưa có cơ sở dữ liệu để đưa ra các đề xuất bán kèm thông minh (cross-selling) nhằm tối ưu doanh thu và xử lý hàng tồn trong ngày.

**Chợ AI Local** ra đời nhằm kết nối người mua và người bán tại các chợ địa phương thông qua giải pháp công nghệ thông minh, dễ tiếp cận và thực tiễn nhất.

---

## 2. Vấn đề giải quyết

### Đối với người mua (Khách hàng)
* Loại bỏ thời gian suy nghĩ món ăn và tính toán định lượng nguyên liệu thủ công.
* Kiểm soát chặt chẽ chi phí đi chợ, đảm bảo bữa ăn dinh dưỡng đầy đủ trong tầm ngân sách đề ra.
* Đặt trước thực phẩm nhanh chóng, nhận hàng tiện lợi tại sạp chợ trên đường đi làm/đi học về mà không cần xếp hàng hay chen chúc.

### Đối với người bán (Tiểu thương)
* Cung cấp công cụ số hóa sạp hàng cực kỳ đơn giản để quản lý sản phẩm, giá cả và tồn kho theo thời gian thực.
* Tạo kênh tiếp cận khách hàng online hiệu quả để cạnh tranh với các siêu thị tiện lợi và chuỗi bán lẻ lớn.
* Thuật toán AI gợi ý các chiến lược kinh doanh (như tạo combo bán kèm, đẩy mạnh hàng tươi sống sắp hết ngày) để gia tăng giá trị đơn hàng và giảm thiểu thất thoát do hàng tồn.

---

## 3. Giải pháp của Chợ AI Local

Hệ thống đề xuất một luồng trải nghiệm tối giản nhưng hiệu quả:

1. **Nhập nhu cầu tự nhiên:** Người mua chỉ cần nhập yêu cầu đi chợ bằng tiếng Việt (ví dụ: *"100k ăn tối 3 người"*).
2. **AI phân tích nhu cầu:** Hệ thống phân tích cú pháp để trích xuất: Ngân sách tối đa, Số lượng người ăn, Loại bữa ăn (sáng/trưa/tối/tiết kiệm/healthy).
3. **Khai thác dữ liệu thực tế:** Hệ thống truy xuất bảng giá thật và mức tồn kho từ các gian hàng liên kết gần nhất.
4. **Áp dụng Rule-based Filter:** Loại bỏ các nguyên liệu hết hàng, kiểm tra các ràng buộc về khẩu phần dinh dưỡng và đảm bảo tổng tiền không vượt quá ngân sách đề ra.
5. **Gợi ý thực đơn tối ưu:** Trả về thực đơn hoàn chỉnh kèm danh sách nguyên liệu chi tiết. Người dùng có thể tùy ý điều chỉnh số lượng hoặc thêm món mới trước khi tạo đơn đặt trước.

---

## 4. Công nghệ cốt lõi

### 4.1. AI Layer (Hiểu ngôn ngữ tự nhiên)
Đóng vai trò phân tích nhu cầu đầu vào của người dùng, chuyển đổi văn bản không cấu trúc thành cấu trúc JSON chuẩn:
```json
{
  "budget": 100000,
  "numPeople": 3,
  "mealType": "dinner"
}
```
*Lưu ý:* AI không tự ý quyết định giá cả hay tồn kho. AI chỉ đóng vai trò phân tích ý định và sinh ra lời giải thích món ăn thân thiện với người dùng.

### 4.2. CLHUN Layer (Khai thác tập mục hữu ích liên cấp)
Thuật toán **CLHUN (Cross-Level High Utility Itemset Mining)** phân tích dữ liệu đơn hàng lịch sử của tiểu thương để tìm ra mối liên hệ mua sắm của khách hàng (ví dụ: khách mua thịt bằm thường mua thêm cà chua và hành lá). Từ đó:
* Đề xuất các combo nguyên liệu nấu ăn ngon và tiện lợi.
* Gợi ý người bán tạo ưu đãi hợp lý nhằm đẩy mạnh doanh số các mặt hàng liên quan.

### 4.3. Rule-based Filter (Bộ lọc quy tắc nghiệp vụ)
Là lá chắn bảo vệ tính thực tế của hệ thống, thực hiện các nhiệm vụ:
* Kiểm tra tính sẵn có của hàng tồn kho.
* Đối chiếu giá bán thực tế của tiểu thương.
* Đảm bảo tổng giá trị thực đơn nghiêm ngặt dưới hoặc bằng ngân sách người dùng nhập vào.
* Đảm bảo cấu trúc dinh dưỡng cơ bản (phải có đủ đạm, chất xơ và gia vị cần thiết).

---

## 5. Quy trình xử lý gợi ý thực đơn

```text
Người mua nhập nhu cầu tự nhiên (Ví dụ: "100k ăn tối 3 người")
        │
        ▼
[ AI Parser Layer ] trích xuất cấu trúc: ngân sách, số người, loại bữa
        │
        ▼
[ Real Stall Data Fetch ] truy xuất giá & tồn kho thực tế của sạp hàng
        │
        ▼
[ CLHUN Engine ] gợi ý các nhóm nguyên liệu mua kèm có giá trị cao
        │
        ▼
[ Rule-based Filter ] loại bỏ hàng hết, lọc khẩu phần & giới hạn ngân sách
        │
        ▼
[ Scoring Algorithm ] chấm điểm, sắp xếp và chọn thực đơn tối ưu nhất
        │
        ▼
[ Interactive Cart UI ] người dùng xem, tăng giảm số lượng, thêm/bớt nguyên liệu
        │
        ▼
[ Programmatic Validation ] kiểm tra thời gian nhận hàng ở tương lai
        │
        ▼
[ Pre-order Confirmation ] tạo mã đơn đặt trước gửi trực tiếp đến sạp chợ
```

---

## 6. Công thức chấm điểm gợi ý

Để cân bằng lợi ích giữa người mua (muốn ngon, rẻ, đủ ăn) và người bán (muốn tăng doanh thu, giải phóng tồn kho), hệ thống sử dụng công thức chấm điểm đa tiêu chí:

$$\text{FinalScore} = 0.30 \times U_{\text{CLHUN}} + 0.25 \times B_{\text{fit}} + 0.25 \times Q_{\text{portion}} + 0.10 \times S_{\text{stock}} + 0.10 \times P_{\text{pop}}$$

Trong đó:
* **$U_{\text{CLHUN}}$:** Điểm giá trị kinh doanh từ thuật toán CLHUN (mức độ hiệu quả khi bán kèm).
* **$B_{\text{fit}}$:** Mức độ khớp với ngân sách của người mua (tổng tiền càng gần và không vượt ngân sách càng được điểm cao).
* **$Q_{\text{portion}}$:** Điểm đáp ứng khẩu phần ăn (đủ calo, đạm, xơ cho số người ăn).
* **$S_{\text{stock}}$:** Điểm ưu tiên đẩy hàng tồn kho (sản phẩm tồn nhiều hoặc cận ngày được ưu tiên đẩy lên).
* **$P_{\text{pop}}$:** Độ phổ biến/yêu thích của sản phẩm theo đánh giá lịch sử.

---

## 7. Chức năng chính trên bản Demo

### 7.1. Gợi ý thực đơn tùy chỉnh
Người dùng có thể nhập các nhu cầu đi chợ đa dạng như:
* *"100k ăn tối 3 người"*
* *"55k ăn sáng 2 người"*
* *"200k ăn healthy 4 người"*
Hệ thống tự động trích xuất các thông số để đưa ra gợi ý thực đơn tức thì phù hợp với ngân sách và số người.

### 7.2. Giỏ hàng tương tác & Tùy biến nguyên liệu
* **Tăng/giảm số lượng:** Thay đổi trực quan khối lượng nguyên liệu (ví dụ: từ 0.65 kg sang 0.8 kg) bằng các nút bấm cộng/trừ.
* **Xóa nguyên liệu:** Giảm số lượng về 0, nút trừ tự động chuyển thành biểu tượng Thùng rác để xóa mặt hàng ra khỏi thực đơn.
* **Thêm nguyên liệu mới:** Dropdown tự động lọc ra các nguyên liệu có sẵn tại sạp nhưng chưa được thêm vào giỏ hàng để người dùng tùy ý chọn thêm.
* **Tính toán Real-time:** Mọi thay đổi đều ngay lập tức cập nhật tổng chi phí, tỷ lệ sử dụng ngân sách, thanh tiến độ trực quan và phân tích lý do của AI.

### 7.3. Thiết lập & Xác thực thời gian nhận hàng
* Cho phép chọn ngày nhận hàng (từ hôm nay đến 7 ngày tới).
* Chọn giờ nhận hàng cụ thể (từ 06:00 đến 20:00).
* Hệ thống hiển thị trực quan thông tin ngày giờ đã chọn trong hóa đơn đặt trước.

### 7.4. Giao diện đa ngôn ngữ (Bilingual)
* Hỗ trợ chuyển đổi toàn bộ giao diện sang tiếng Việt (VI) hoặc tiếng Anh (EN).
* Lưu trạng thái ngôn ngữ qua `localStorage` để tự động kích hoạt cho các lần truy cập sau.

### 7.5. Chế độ giao diện Sáng/Tối (Light/Dark Mode)
* Chuyển đổi giao diện bằng một cú click chuột với hiệu ứng chuyển đổi mượt mà.
* Tối ưu màu sắc hiển thị cho các thành phần đặc thù như Hóa đơn thanh toán, Dashboard người bán, và bảng giỏ hàng.

### 7.6. Dashboard quản lý dành cho Tiểu thương
* Thống kê trực quan: Tổng số sản phẩm, Số đơn hàng hôm nay, Doanh thu hôm nay, Số mặt hàng sắp hết.
* Hiển thị danh sách đơn hàng đặt trước gần đây kèm trạng thái chi tiết.
* Đưa ra các gợi ý chiến lược kinh doanh (Ví dụ: *"Thuật toán phân tích thấy có 70% khách mua Thịt ba chỉ sẽ chọn mua thêm Sườn sụn. Hãy đóng gói sẵn 'Combo Ba Chỉ & Sườn Sụn'..."*).

---

## 8. Các cập nhật mới nhất (Chất lượng cao)

Hệ thống vừa được nâng cấp các tính năng và sửa lỗi hiển thị quan trọng để mang lại trải nghiệm tối ưu nhất:

* **Bỏ giới hạn đặt trước 2 giờ:** Người dùng có thể đặt đơn hàng linh hoạt cho bất kỳ thời điểm nào ở tương lai. Hệ thống tự động thiết lập thời gian gợi ý mặc định thông minh là **15 phút sau thời điểm hiện tại** (thay vì 2 giờ như trước đây).
* **Kiểm soát đặt đơn lập trình:** Xóa bỏ cơ chế kích hoạt tự động của Bootstrap modal trên nút bấm HTML. Chuyển sang kích hoạt Modal đặt đơn bằng JavaScript sau khi đã xác thực ngày giờ nhận hàng thành công. Nếu thời gian nhận hàng ở quá khứ, hệ thống sẽ cảnh báo đỏ và ngăn chặn việc đặt đơn.
* **Sửa lỗi tương phản bảng giỏ hàng ở chế độ tối (Dark Mode Hover):** Thêm quy tắc CSS cụ thể cho dòng bảng khi được di chuột qua trong chế độ tối. Màu nền đổi sang màu xám đen (`#334155`) thay vì màu xám sáng, giúp chữ trắng và các nút bấm giữ nguyên độ tương phản cao, không bị chìm.
* **Sửa lỗi lặp và ghi đè thông tin Card thành viên:** Xóa bỏ các selector dịch tĩnh bị trùng lặp trong tệp `js/main.js` gây ra lỗi ghi đè toàn bộ tên, vai trò và mô tả của tất cả thành viên thành thông tin của trưởng nhóm.
* **Tối ưu chuyển động mượt mà:** Xóa các định nghĩa CSS `.team-card-new` bị trùng lặp gây xung đột thuộc tính. Sử dụng hàm transition chuẩn `ease-out 0.3s` cho hiệu ứng nâng nhẹ và đổ bóng khi di chuột qua, giúp giao diện trực quan và chuyên nghiệp.

---

## 9. Đội ngũ phát triển

Dự án được thực hiện bởi đội ngũ sinh viên **HUIT EMART LOCAL** đến từ Trường Đại học Công Thương TP.HCM:

* **Nguyễn Thị Phương Nhung:** Project Leader & Business Analyst (Lập kế hoạch phát triển, phân tích nghiệp vụ thực tế tại các chợ và kết nối giải pháp với tiểu thương).
* **Trần Gia Bảo:** Team Lead & AI Engineer (Kiến trúc sư hệ thống, chịu trách nhiệm tích hợp mô hình ngôn ngữ lớn LLM, xử lý ngôn ngữ tự nhiên tiếng Việt và phân tích cấu trúc nhu cầu).
* **Phạm Triệu Tấn Phúc:** Backend Developer (Lập trình server-side, thiết kế cơ sở dữ liệu sản phẩm, quản trị kho hàng và phát triển bộ lọc ràng buộc giá thật).
* **Võ Hồng Bích Phượng:** Frontend & UI/UX Designer (Thiết kế trải nghiệm người dùng trực quan, xây dựng giao diện tương tác trực tiếp trên thiết bị di động).
* **Huỳnh Thị Kim Phụng:** Data Analyst & Marketing (Khai thác dữ liệu, phân tích hành vi mua sắm và lập kế hoạch tiếp cận tiểu thương địa phương).

---

## 10. Lộ trình phát triển & Mô hình kinh doanh

### Mô hình kinh doanh đề xuất
* **Người mua:** Hoàn toàn miễn phí dịch vụ tìm kiếm thực đơn và đặt trước.
* **Tiểu thương:**
  * **Gói FREE (Khởi đầu):** Cho phép đăng sản phẩm cơ bản, nhận đơn đặt trước và xem dashboard tổng quan.
  * **Gói PRO (Tăng trưởng):** 99.000đ/tháng. Xem sản phẩm bán chạy, nhận gợi ý nhóm sản phẩm mua kèm và phân tích Insight AI nâng cao.
  * **Gói PREMIUM (Mở rộng):** 199.000đ/tháng. Ưu tiên hiển thị gian hàng nổi bật, nhận gợi ý khuyến mãi dựa trên hàng tồn kho cận ngày.

### Lộ trình phát triển
1. **Quý 3/2026 (Ra mắt MVP):** Thử nghiệm thực tế tại 3 chợ truyền thống tại TP.HCM, số hóa thông tin cho 50 sạp hàng đầu tiên.
2. **Quý 4/2026 (Seed Round):** Gọi vốn vòng hạt giống nhằm hoàn thiện dịch vụ AI Parser tiếng Việt chuyên sâu và chuẩn bị ứng dụng di động.
3. **Quý 1/2027 (Ví điện tử):** Tích hợp thanh toán QR không tiền mặt trực tiếp khi khách hàng tạo đơn đặt trước.
4. **Quý 2/2027 (Nhân rộng):** Mở rộng quy mô hoạt động đến 20 chợ truyền thống lớn tại TP.HCM, Hà Nội và Đà Nẵng, số hóa hơn 1.000 sạp hàng.

---

## 11. Hướng dẫn chạy thử nghiệm cục bộ

Trang web giới thiệu dự án được xây dựng dưới dạng Single Page Application thuần túy bằng HTML5, CSS3 và Javascript (ES6), sử dụng thư viện giao diện Bootstrap 5 và hệ thống biểu tượng Phosphor Icons. Không yêu cầu cài đặt môi trường phức tạp hay máy chủ cơ sở dữ liệu cồng kềnh cho việc chạy thử nghiệm.

### Các bước chạy cục bộ:

1. **Tải mã nguồn dự án về máy tính.**
2. **Mở tệp tin `index.html`:**
   * Bạn có thể mở trực tiếp tệp [index.html](file:///d:/NCKH/DECIC_HN/landing_choailocal/index.html) bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).
   * Khuyên dùng: Sử dụng tiện ích mở rộng **Live Server** trong VS Code hoặc máy chủ HTTP đơn giản (như chạy lệnh `npx serve` tại thư mục dự án) để đảm bảo các tính năng lưu trạng thái bằng `localStorage` và chuyển đổi ngôn ngữ hoạt động ổn định nhất.
3. **Mở bảng điều khiển (Developer Console - F12)** để theo dõi các log mô phỏng quá trình hoạt động của AI và các bộ lọc nghiệp vụ nếu cần.

---

## 12. Thông điệp & Kết luận

> *"Đi chợ thông minh, ăn ngon đúng ngân sách."*

**Chợ AI Local** không chỉ dừng lại ở một trang landing page giới thiệu công nghệ, mà là một nỗ lực thực tiễn nhằm mang sức mạnh của trí tuệ nhân tạo và khai thác dữ liệu lớn giúp đỡ các tiểu thương chợ truyền thống — những người thường bị bỏ lại phía sau trong cuộc cách mạng số. Giải pháp giúp người tiêu dùng tiết kiệm chi phí, ăn uống lành mạnh hơn, đồng thời giữ gìn và phát triển nét văn hóa giao thương chợ truyền thống Việt Nam trong thời đại số.
