# 🛒 Chợ AI Local

**Chợ AI Local** là nền tảng thương mại điện tử địa phương ứng dụng AI để gợi ý thực đơn thực phẩm theo ngân sách, đồng thời hỗ trợ các hộ kinh doanh nhỏ lẻ quản lý sản phẩm, tồn kho và đơn đặt trước.

Website giới thiệu dự án:  
https://www.choailocal.site/

---

## 1. Giới thiệu dự án

Trong cuộc sống hằng ngày, rất nhiều người thường gặp câu hỏi quen thuộc: **“Hôm nay ăn gì?”**.  
Vấn đề không chỉ nằm ở việc chọn món, mà còn phải cân đối nhiều yếu tố như:

- Có bao nhiêu tiền?
- Nấu cho mấy người ăn?
- Cần mua những nguyên liệu nào?
- Mua ở đâu gần nhất?
- Sản phẩm có còn hàng không?
- Tổng tiền có vượt ngân sách không?

Ở chiều ngược lại, các tiểu thương và hộ kinh doanh nhỏ lẻ tại chợ địa phương cũng gặp nhiều khó khăn trong việc chuyển đổi số. Nhiều người bán vẫn quản lý sản phẩm, tồn kho và đơn hàng bằng phương pháp thủ công, chưa có công cụ đơn giản để bán hàng online hoặc ra quyết định dựa trên dữ liệu.

Từ thực tế đó, **Chợ AI Local** được xây dựng với mục tiêu kết nối người mua và người bán địa phương thông qua một nền tảng thông minh, dễ dùng và phù hợp với nhu cầu mua thực phẩm hằng ngày.

---

## 2. Mục tiêu dự án

Dự án hướng đến việc xây dựng một hệ thống có thể:

- Giúp người mua tìm thực đơn tự nấu theo đúng ngân sách.
- Cho phép người mua nhập nhu cầu bằng tiếng Việt tự nhiên.
- Gợi ý nguyên liệu dựa trên dữ liệu sản phẩm thật của gian hàng.
- Đảm bảo thực đơn không vượt ngân sách, còn hàng và phù hợp khẩu phần.
- Hỗ trợ tiểu thương quản lý sản phẩm, giá bán, tồn kho và đơn đặt trước.
- Ứng dụng AI và thuật toán CLHUN để tối ưu đề xuất cho cả người mua và người bán.

---

## 3. Đối tượng sử dụng

### Người mua

Bao gồm:

- Sinh viên.
- Nhân viên văn phòng.
- Người nội trợ.
- Người có nhu cầu mua thực phẩm theo ngân sách.
- Người muốn tiết kiệm thời gian khi lên thực đơn.

Nhu cầu chính:

- Không muốn mất nhiều thời gian suy nghĩ món ăn.
- Muốn biết nên mua gì với số tiền hiện có.
- Muốn có thực đơn đủ món, đủ khẩu phần và dễ nấu.
- Muốn đặt trước thực phẩm tại gian hàng gần mình.

### Người bán

Bao gồm:

- Tiểu thương chợ truyền thống.
- Hộ kinh doanh nhỏ lẻ.
- Cửa hàng thực phẩm địa phương.
- Quầy rau, thịt, cá, trứng, đậu hũ, gia vị.

Nhu cầu chính:

- Quản lý sản phẩm dễ dàng.
- Cập nhật giá và tồn kho nhanh.
- Nhận đơn đặt trước từ người mua.
- Biết sản phẩm nào bán chạy.
- Nhận gợi ý bán kèm hoặc xử lý hàng tồn kho.

---

## 4. Vấn đề dự án giải quyết

### Đối với người mua

Người mua thường mất thời gian để:

- Nghĩ món ăn.
- Tính khẩu phần.
- Tính tổng tiền.
- Chọn nguyên liệu.
- Kiểm tra sản phẩm có phù hợp ngân sách không.

Các nền tảng hiện nay chủ yếu tập trung vào món ăn chế biến sẵn hoặc giao đồ ăn, chưa tối ưu cho nhu cầu **mua nguyên liệu tự nấu theo ngân sách**.

### Đối với người bán

Tiểu thương địa phương thường gặp các vấn đề:

- Khó tiếp cận khách hàng online.
- Thiếu công cụ quản lý sản phẩm.
- Tồn kho thay đổi nhanh nhưng khó kiểm soát.
- Không có dữ liệu để biết mặt hàng nào nên bán kèm.
- Khó cạnh tranh với chuỗi bán lẻ lớn và các nền tảng thương mại điện tử lớn.

---

## 5. Giải pháp của Chợ AI Local

Chợ AI Local đề xuất một quy trình đơn giản:

1. Người mua nhập nhu cầu bằng tiếng Việt tự nhiên.  
   Ví dụ:  
   > 100k cho bữa tối 3 người

2. AI phân tích câu nhập và trích xuất thông tin:
   - Ngân sách: 100.000đ
   - Số người ăn: 3
   - Loại bữa: Bữa tối

3. Hệ thống lấy dữ liệu sản phẩm thật từ gian hàng:
   - Giá bán.
   - Số lượng tồn kho.
   - Danh mục sản phẩm.
   - Trạng thái còn hàng.

4. Thuật toán CLHUN khai thác các nhóm sản phẩm có giá trị kinh doanh cao.

5. Rule Filter kiểm tra các ràng buộc thực tế:
   - Không vượt ngân sách.
   - Sản phẩm còn hàng.
   - Phù hợp khẩu phần.
   - Phù hợp loại bữa ăn.

6. Hệ thống trả về thực đơn đề xuất.

7. Người mua có thể đặt trước để người bán chuẩn bị hàng.

---

## 6. Công nghệ cốt lõi

### 6.1. AI Layer

AI được sử dụng để hiểu nhu cầu tiếng Việt tự nhiên của người mua.

Ví dụ:

```txt
"100k cho bữa tối 3 người"
```

Được chuyển thành dữ liệu có cấu trúc:

```json
{
  "budget": 100000,
  "numPeople": 3,
  "mealType": "dinner"
}
```

AI không tự quyết định giá, tồn kho hoặc sản phẩm cuối cùng. AI chỉ đóng vai trò phân tích nhu cầu và sinh giải thích dễ hiểu cho người dùng.

---

### 6.2. CLHUN Layer

CLHUN là viết tắt của **Cross-Level High Utility Itemset Mining**.

Trong dự án, CLHUN được dùng để khai thác các nhóm sản phẩm có giá trị kinh doanh cao từ dữ liệu đơn hàng.

Ví dụ hệ thống có thể phát hiện:

```txt
Trứng gà thường được mua cùng cà chua và hành lá.
```

Từ đó, người bán có thể được gợi ý tạo combo như:

```txt
Combo Canh Trứng Cà Chua
```

CLHUN không chỉ xét sản phẩm nào hay được mua chung, mà còn xét đến giá trị kinh doanh như:

- Doanh thu.
- Lợi nhuận.
- Khả năng bán kèm.
- Khả năng xử lý hàng tồn kho.

---

### 6.3. Rule-based Filter

Rule-based Filter là lớp kiểm soát thực tế của hệ thống.

Lớp này đảm bảo rằng kết quả đề xuất:

- Không vượt ngân sách.
- Không chứa sản phẩm hết hàng.
- Không dùng giá ảo.
- Không gợi ý sản phẩm không tồn tại.
- Có đủ nhóm thực phẩm cần thiết.
- Phù hợp với số người ăn.

Nhờ đó, hệ thống hạn chế tình trạng AI tạo ra kết quả không đúng dữ liệu thật.

---

## 7. Pipeline xử lý gợi ý thực đơn

Quy trình xử lý tổng thể:

```txt
Người mua nhập nhu cầu
        ↓
AI phân tích tiếng Việt tự nhiên
        ↓
Chuyển nhu cầu thành dữ liệu có cấu trúc
        ↓
Truy xuất dữ liệu sản phẩm thật
        ↓
CLHUN đề xuất nhóm sản phẩm tiềm năng
        ↓
Rule Filter kiểm tra ngân sách, tồn kho, khẩu phần
        ↓
Tính điểm và chọn thực đơn phù hợp
        ↓
Hiển thị thực đơn đề xuất
        ↓
Người mua đặt trước tại gian hàng
```

---

## 8. Công thức chấm điểm gợi ý

Hệ thống sử dụng công thức chấm điểm tổng hợp:

```txt
FinalScore = 0.30 * UCLHUN
           + 0.25 * Bfit
           + 0.25 * Qportion
           + 0.10 * Sstock
           + 0.10 * Ppop
```

Trong đó:

| Thành phần | Ý nghĩa |
|---|---|
| UCLHUN | Điểm giá trị kinh doanh từ thuật toán CLHUN |
| Bfit | Mức độ phù hợp với ngân sách |
| Qportion | Mức độ phù hợp với khẩu phần |
| Sstock | Mức độ ưu tiên theo tồn kho |
| Ppop | Độ phổ biến của sản phẩm |

Công thức này giúp cân bằng lợi ích giữa:

- Người mua: cần món ăn đúng ngân sách, đủ khẩu phần.
- Người bán: cần tăng đơn hàng, bán kèm, xử lý hàng tồn.
- Hệ thống: cần đưa ra gợi ý hợp lý và đáng tin cậy.

---

## 9. Chức năng chính

### 9.1. Gợi ý thực đơn theo ngân sách

Người mua có thể nhập nhu cầu như:

```txt
100k cho bữa tối 3 người
150k cho bữa tối 4 người
Có 200k muốn ăn lẩu 4 người
```

Hệ thống trả về:

- Tên thực đơn.
- Danh sách nguyên liệu.
- Số lượng từng sản phẩm.
- Đơn giá.
- Thành tiền.
- Tổng tiền.
- Mức sử dụng ngân sách.
- Lý do đề xuất.
- Gian hàng cung cấp.
- Nút đặt trước.

Ví dụ kết quả:

```txt
Thực đơn bữa tối 3 người: Thịt bằm sốt cà

Món gợi ý:
- Thịt bằm sốt cà chua
- Rau muống xào tỏi
- Đậu hũ chiên

Tổng tiền: 93.500đ / 100.000đ
```

---

### 9.2. Đặt trước tại gian hàng

Sau khi chọn thực đơn, người mua có thể tạo đơn đặt trước.

Thông tin đơn gồm:

- Mã đơn.
- Tên thực đơn.
- Tổng tiền.
- Gian hàng nhận đơn.
- Thời gian nhận hàng.
- Trạng thái đơn.

Ví dụ:

```txt
Mã đơn: ORD-DEMO-0001
Thực đơn: Thực đơn bữa tối 3 người: Thịt bằm sốt cà
Tổng tiền: 93.500đ
Nhận tại: Gian hàng Thực Phẩm Cô Lan
Thời gian nhận: 17:30 hôm nay
Trạng thái: Chờ người bán xác nhận
```

---

### 9.3. Quản lý sản phẩm cho người bán

Người bán có thể:

- Thêm sản phẩm.
- Cập nhật sản phẩm.
- Quản lý giá bán.
- Quản lý tồn kho.
- Theo dõi trạng thái còn hàng hoặc hết hàng.
- Quản lý danh mục sản phẩm.

Dữ liệu sản phẩm là nền tảng quan trọng để hệ thống gợi ý thực đơn chính xác.

---

### 9.4. Dashboard người bán

Dashboard giúp người bán theo dõi:

- Tổng số sản phẩm.
- Số đơn hôm nay.
- Doanh thu hôm nay.
- Sản phẩm sắp hết hàng.
- Sản phẩm bán chạy.
- Hoạt động đơn hàng gần đây.
- Gợi ý chiến lược kinh doanh.

Ví dụ dashboard có thể hiển thị:

```txt
Tổng sản phẩm: 32
Đơn hôm nay: 7
Doanh thu hôm nay: 682.000đ
Sản phẩm sắp hết: 4
```

---

### 9.5. Gợi ý chiến lược cho người bán

Hệ thống có thể đưa ra các gợi ý như:

- Gợi ý tạo combo bán kèm.
- Gợi ý xử lý hàng tồn kho.
- Gợi ý tăng lượng nhập sản phẩm có lợi nhuận cao.
- Gợi ý sản phẩm thường được mua cùng nhau.

Ví dụ:

```txt
Thuật toán phân tích thấy có 65% khách hàng mua Trứng gà sẽ chọn mua thêm Cà chua chín và Hành lá. 
Hãy đóng gói sẵn "Combo Canh Trứng Cà Chua" trị giá 18.000đ.
```

---

## 10. Giá trị khác biệt

Chợ AI Local khác với các nền tảng giao đồ ăn truyền thống ở điểm:

| Tiêu chí | App giao đồ ăn | Chợ AI Local |
|---|---|---|
| Gợi ý theo ngân sách | Không tập trung | Có |
| Gợi ý thực đơn tự nấu | Không | Có |
| Dựa trên dữ liệu sản phẩm thật | Một phần | Có |
| Kiểm tra tồn kho | Hạn chế | Có |
| Hỗ trợ tiểu thương địa phương | Hạn chế | Tập trung |
| Ứng dụng CLHUN | Không | Có |
| Đặt trước tại gian hàng | Không phổ biến | Có |
| Tối ưu xử lý hàng tồn | Không | Có |

---

## 11. Giá trị mang lại

### Đối với người mua

- Tiết kiệm thời gian chọn món.
- Tiết kiệm chi phí.
- Có thực đơn phù hợp ngân sách.
- Không phải tự tính từng món.
- Biết rõ tổng tiền trước khi mua.
- Có thể đặt trước để người bán chuẩn bị.

### Đối với người bán

- Dễ dàng chuyển đổi số.
- Quản lý sản phẩm và tồn kho tốt hơn.
- Có thêm kênh tiếp cận khách hàng.
- Nhận đơn đặt trước.
- Biết sản phẩm nào bán chạy.
- Có gợi ý bán kèm và xử lý hàng tồn.

### Đối với thị trường địa phương

- Tăng khả năng số hóa cho chợ truyền thống.
- Giúp tiểu thương cạnh tranh tốt hơn.
- Kết nối nhu cầu thật của người mua với nguồn hàng thật của người bán.
- Phù hợp với mô hình thương mại địa phương.

---

## 12. Mô hình kinh doanh

Chợ AI Local hướng đến mô hình trong đó:

- Người mua là bên tạo nhu cầu.
- Người bán là nhóm khách hàng trả tiền chính.
- Nền tảng hỗ trợ người bán tăng đơn hàng từ nhu cầu thật của người mua.

Các nguồn doanh thu có thể phát triển:

### Gói miễn phí

Dành cho tiểu thương mới tham gia.

Chức năng:

- Tạo gian hàng cơ bản.
- Đăng số lượng sản phẩm giới hạn.
- Nhận đơn đặt trước cơ bản.

### Gói bán hàng tiêu chuẩn

Dành cho người bán muốn quản lý sản phẩm chuyên nghiệp hơn.

Chức năng:

- Đăng nhiều sản phẩm hơn.
- Quản lý tồn kho.
- Theo dõi đơn hàng.
- Xem thống kê cơ bản.

### Gói AI Seller

Dành cho người bán muốn dùng dữ liệu để bán tốt hơn.

Chức năng:

- Gợi ý combo bán kèm.
- Gợi ý xử lý hàng tồn.
- Dashboard phân tích.
- Gợi ý sản phẩm bán chạy.

### Gói mở rộng địa phương

Dành cho ban quản lý chợ, hợp tác xã hoặc cụm gian hàng.

Chức năng:

- Quản lý nhiều gian hàng.
- Thống kê toàn khu vực.
- Hỗ trợ triển khai số hóa cho nhiều tiểu thương.
- Báo cáo dữ liệu tổng hợp.

---

## 13. Kiến trúc hệ thống đề xuất

Kiến trúc tổng thể gồm các thành phần:

```txt
Frontend
   ↓
Backend API
   ↓
Database
   ↓
AI Service
   ↓
CLHUN Module
   ↓
Rule-based Recommendation Engine
```

### Frontend

Phụ trách giao diện người dùng:

- Trang giới thiệu dự án.
- Trang nhập nhu cầu gợi ý thực đơn.
- Trang hiển thị kết quả.
- Trang quản lý sản phẩm cho người bán.
- Dashboard người bán.

### Backend API

Phụ trách xử lý nghiệp vụ:

- Quản lý người dùng.
- Quản lý sản phẩm.
- Quản lý tồn kho.
- Quản lý đơn hàng.
- Xử lý yêu cầu gợi ý.
- Kết nối AI Service và CLHUN Module.

### Database

Lưu trữ dữ liệu chính:

- Người dùng.
- Gian hàng.
- Sản phẩm.
- Danh mục.
- Đơn hàng.
- Chi tiết đơn hàng.
- Kết quả gợi ý.
- Kết quả CLHUN.
- Gợi ý chiến lược cho người bán.

### AI Service

Phụ trách:

- Phân tích nhu cầu tiếng Việt.
- Trích xuất ngân sách, số người ăn, loại bữa.
- Sinh lời giải thích cho thực đơn.
- Hỗ trợ tạo mô tả sản phẩm.

### CLHUN Module

Phụ trách:

- Phân tích lịch sử đơn hàng.
- Tìm nhóm sản phẩm có giá trị kinh doanh cao.
- Hỗ trợ đề xuất combo.
- Hỗ trợ tối ưu tồn kho cho người bán.

---

## 14. Cấu trúc dữ liệu chính

Một số bảng dữ liệu đề xuất:

```txt
Users
Shops
Categories
Products
Orders
OrderItems
CartItems
AIComboSuggestions
AIComboItems
CLHUNItemsets
CLHUNItemsetItems
SellerAIInsights
```

### Products

Lưu thông tin sản phẩm:

```json
{
  "id": 1,
  "name": "Thịt heo xay",
  "category": "Thịt",
  "price": 95000,
  "unit": "kg",
  "stock": 12,
  "shopId": 1,
  "status": "available"
}
```

### AIComboSuggestions

Lưu thực đơn được AI đề xuất:

```json
{
  "id": 1,
  "title": "Thực đơn bữa tối 3 người: Thịt bằm sốt cà",
  "budget": 100000,
  "totalPrice": 93500,
  "numPeople": 3,
  "mealType": "dinner",
  "reason": "Thực đơn có đạm, rau xanh, phù hợp bữa tối 3 người và không vượt ngân sách."
}
```

### CLHUNItemsets

Lưu nhóm sản phẩm tiềm năng từ thuật toán CLHUN:

```json
{
  "id": 1,
  "name": "Combo Canh Trứng Cà Chua",
  "utilityScore": 0.86,
  "items": ["Trứng gà", "Cà chua", "Hành lá"]
}
```

---

## 15. Demo hiện tại

Phiên bản demo hiện tại tập trung vào các chức năng chính:

- Landing page giới thiệu dự án.
- Mô phỏng nhập nhu cầu bằng tiếng Việt.
- **Cho phép người dùng tự nhập nhu cầu tùy chỉnh** (mới cập nhật).
- Mô phỏng quá trình xử lý qua 3 lớp:
  - AI Parse.
  - CLHUN Suggest.
  - Rule Filter.
- Hiển thị thực đơn gợi ý.
- Hiển thị danh sách sản phẩm, đơn giá và tổng tiền.
- Mô phỏng đặt trước thực đơn.
- Mô phỏng dashboard người bán.
- Hiển thị gợi ý chiến lược kinh doanh cho người bán.

### Tính năng nhập liệu tùy chỉnh

Người dùng có thể tự do nhập nhu cầu của mình trong ô text, ví dụ:
- "100k cho bữa tối 3 người"
- "55k ăn sáng 2 người"
- "200k ăn healthy 4 người"
- "Còn 45k ăn tiết kiệm 2 người"

Hệ thống sẽ tự động phân tích:
- Số tiền (ngân sách)
- Số người ăn
- Loại bữa (sáng/trưa/tối/tiết kiệm/healthy)

Và hiển thị thực đơn phù hợp tức thì.

### Tính năng chọn thời gian nhận hàng

Người dùng có thể:
- **Chọn ngày nhận hàng** (từ hôm nay đến 7 ngày tới)
- **Chọn giờ nhận hàng** (từ 6:00 sáng đến 20:00 tối)
- Hệ thống tự động kiểm tra thời gian hợp lệ (phải đặt trước ít nhất 2 giờ)
- Validation với thông báo rõ ràng nếu chưa chọn hoặc thời gian không hợp lệ
- Hiển thị thời gian nhận hàng rõ ràng trong modal xác nhận đơn hàng

Các tính năng UX:
- Tự động đặt giá trị mặc định thông minh (2 giờ sau thời điểm hiện tại)
- Hiệu ứng highlight khi chọn thời gian
- Scroll tự động và shake animation nếu thiếu thông tin
- Format hiển thị thân thiện: "17:00 hôm nay", "10:00 ngày mai", "15:00 25/06"

### Tính năng Giỏ hàng tương tác & Tùy biến nguyên liệu (Mới hoàn thành)

Người dùng có thể trực tiếp tinh chỉnh thực đơn đề xuất:
- **Tăng/giảm số lượng** từng nguyên liệu bằng nút bấm cộng/trừ trực quan.
- **Xóa nguyên liệu** khỏi thực đơn bằng cách giảm số lượng về 0 (nút trừ tự chuyển thành biểu tượng Thùng rác).
- **Cảnh báo vượt hạn mức**: Nếu người dùng tăng số lượng khiến tổng chi phí vượt quá ngân sách đề ra ban đầu, hệ thống sẽ hiển thị thẻ cảnh báo màu đỏ và cập nhật thanh tiến độ tương ứng.
- **Thêm nguyên liệu mới**: Hộp lựa chọn dropdown tự động lọc ra các nguyên liệu có trong cơ sở dữ liệu của tiểu thương nhưng chưa có trong giỏ hàng hiện tại, cho phép người dùng tự do thêm vào thực đơn.
- **Tính toán thời gian thực**: Mọi thay đổi về số lượng hoặc thành phần nguyên liệu đều lập tức cập nhật tổng tiền, số tiền tiết kiệm/vượt hạn mức, thanh tiến độ ngân sách và lý do đề xuất của AI.

### Tính năng Đa ngôn ngữ (Song ngữ Việt/Anh) (Mới hoàn thành)

Hệ thống hỗ trợ chuyển đổi giao diện hoàn chỉnh:
- **Nút chuyển đổi ngôn ngữ**: Tích hợp trên thanh điều hướng, tự động lưu lựa chọn của người dùng vào `localStorage`.
- **Dịch tĩnh**: Hầu hết các phần giới thiệu, tiêu đề, tính năng, đội ngũ, lộ trình và modal xác nhận được dịch chính xác thông qua tệp từ điển.
- **Dịch động**: Các dữ liệu mô phỏng như tên thực đơn, thành phần nguyên liệu, đơn vị tính, lý do đề xuất của AI và feed đơn hàng tự động hiển thị theo ngôn ngữ đã chọn.

### Tính năng Giao diện Sáng/Tối (Light/Dark Mode) (Mới hoàn thành)

- Nút chuyển đổi giao diện trực quan với hiệu ứng transition mượt mà.
- Lưu trạng thái giao diện đã chọn để tự động kích hoạt trong lần truy cập sau.
- Tối ưu hóa độ tương phản cho Seller Dashboard và Hóa đơn trong chế độ tối.

Website demo:

```txt
https://www.choailocal.site/
```

---

## 16. Đội ngũ phát triển

| Thành viên | Vai trò |
|---|---|
| Nguyễn Thị Phương Nhung | Project Leader & Business Analyst |
| Trần Gia Bảo | AI Engineer & Developer |
| Phạm Triệu Tấn Phúc | Backend Developer |
| Võ Hồng Bích Phượng | Frontend & UI/UX Designer |
| Huỳnh Thị Kim Phụng | Data Analyst & Marketing |

---

## 17. Lộ trình phát triển

### Giai đoạn 1: MVP

Thời gian: 0–6 tháng

Mục tiêu:

- Hoàn thiện MVP.
- Mô phỏng quanh khu vực HUIT.
- Kiểm chứng nhu cầu người mua.
- Đo khả năng cập nhật tồn kho của người bán.
- Hoàn thiện luồng gợi ý thực đơn theo ngân sách.

### Giai đoạn 2: Pilot

Thời gian: 6–12 tháng

Mục tiêu:

- Kết nối gian hàng thật.
- Thu thập dữ liệu người dùng thật.
- Cải thiện dashboard người bán.
- Tối ưu thuật toán gợi ý.
- Bổ sung đánh giá sản phẩm và phản hồi người dùng.
- Cải thiện cơ chế xử lý cold-start cho gian hàng mới.

### Giai đoạn 3: Scale

Thời gian: 12–24 tháng

Mục tiêu:

- Phát triển mobile app.
- Tích hợp bản đồ gian hàng gần nhất.
- Tích hợp thanh toán điện tử.
- Kết nối giao hàng bên thứ ba.
- Phát triển tính năng lên kế hoạch bữa ăn theo tuần.
- Mở rộng sang nhiều khu vực địa phương khác.

---

## 18. Hướng phát triển tương lai

Một số tính năng có thể bổ sung:

- Feedback loop: người mua có thể thích, không thích hoặc thay thế món.
- Cá nhân hóa gợi ý theo lịch sử mua hàng.
- So sánh giá giữa nhiều gian hàng.
- Đánh giá và nhận xét sản phẩm.
- Quản lý khuyến mãi cho người bán.
- Flash sale cho hàng tươi sống cuối ngày.
- Dự báo nhu cầu theo ngày trong tuần.
- Cảnh báo tồn kho thông minh.
- Tích hợp bản đồ và định vị.
- Tích hợp ví điện tử như MoMo, ZaloPay, VNPay.
- Tích hợp giao hàng bên thứ ba như Ahamove hoặc GHN.
- Nhận diện sản phẩm bằng hình ảnh để hỗ trợ tiểu thương đăng hàng nhanh hơn.

---

## 19. Bảo mật đề xuất

Hệ thống có thể áp dụng các cơ chế bảo mật sau:

- JWT Authentication.
- Refresh Token Rotation.
- Role-based Access Control với các vai trò:
  - Buyer.
  - Seller.
  - Admin.
- Mã hóa dữ liệu nhạy cảm.
- Rate Limiting cho API.
- Audit Log cho thao tác đổi giá, xóa đơn, cập nhật tồn kho.
- Kiểm tra đầu vào để hạn chế Prompt Injection.
- Schema Validation cho kết quả trả về từ AI.
- Không để AI trực tiếp thay đổi dữ liệu vật lý như giá, tồn kho hoặc đơn hàng.

---

## 20. Ý nghĩa của dự án

Chợ AI Local không chỉ là một website thương mại điện tử, mà là một giải pháp hỗ trợ chuyển đổi số cho thương mại địa phương.

Dự án giúp:

- Người mua ăn ngon hơn trong đúng ngân sách.
- Tiểu thương bán hàng thông minh hơn.
- Dữ liệu thật được dùng để tạo ra gợi ý thực tế.
- AI được kiểm soát bằng luật nghiệp vụ rõ ràng.
- Chợ truyền thống có thêm cơ hội tiếp cận khách hàng online.

---

## 21. Thông điệp dự án

> Chợ AI Local biến một câu hỏi “hôm nay ăn gì?” thành thực đơn đúng ngân sách từ sản phẩm thật của gian hàng địa phương.

Hoặc ngắn gọn hơn:

> Đi chợ thông minh, ăn ngon đúng ngân sách.

---

## 22. Kết luận

Chợ AI Local là dự án hướng đến việc giải quyết một nhu cầu rất gần gũi trong đời sống: mua thực phẩm hằng ngày sao cho nhanh, đủ món và đúng ngân sách.

Bằng cách kết hợp AI, thuật toán CLHUN và bộ lọc ràng buộc thực tế, hệ thống có thể đưa ra thực đơn phù hợp cho người mua, đồng thời giúp người bán địa phương quản lý sản phẩm, tối ưu tồn kho và tăng khả năng bán hàng.

Dự án có tiềm năng phát triển thành một nền tảng thương mại điện tử địa phương thực tiễn, phù hợp với sinh viên, người đi làm, hộ gia đình và các tiểu thương nhỏ lẻ trong quá trình chuyển đổi số.
