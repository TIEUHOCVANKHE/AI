# Kiểm tra chấm nguyên trang và streaming — 2026-09-26

## Đã đạt

- **20 tình huống trình duyệt** (14 luồng chính + 6 kiểm tra bổ sung) với API giả lập bằng ReadableStream. Sự kiện SSE được chia nhỏ tới từng nhóm 7 byte, có chữ tiếng Việt và chuỗi JSON bị chia giữa nhiều đoạn.
- Nội dung chấm và nhận xét xuất hiện khi phản hồi chưa kết thúc; khung xanh xuất hiện theo dữ liệu vùng; sổ điểm chưa thay đổi trước sự kiện hoàn tất.
- Mỗi trang gửi đúng một ảnh nguyên trang và một yêu cầu streaming. PDF sáu trang tự chạy hết, gồm tên đảo thứ tự, tên không có trong lớp, thiếu tên, bài trùng và bằng điểm. Không có bước nhận diện/lọc tên trước chấm.
- Đổi lớp, môn và đợt giữa lúc nhận phản hồi vẫn ghi đúng phạm vi đã chốt.
- Tự lưu điểm/nhận xét/bài tập cùng một lần. Bài cao hơn trong PDF khác thay cả ba phần; bài bằng điểm giữ bài đã chọn. Điểm 0 hợp lệ; kết quả chưa đọc đủ hoặc thang sai không ghi sổ.
- Phản hồi thiếu sự kiện hoàn tất không ghi điểm. Dừng trong lúc stream giữ trang đã xong. Sau tải lại, chọn đúng PDF (kiểm tra SHA-256 nội dung) chỉ gửi trang chưa hoàn tất. Lỗi 429 ngừng gửi các trang tiếp.
- Giả lập hết dung lượng localStorage: điểm/lời phê/trạng thái duyệt cũ được phục hồi; thử lưu lại không gọi API thêm.
- Giáo viên sửa và duyệt được kết quả tự lưu; phân biệt trạng thái AI tự lưu và giáo viên duyệt. Đọc bản lưu cũ và chuyển sang bản lưu chung không mất lời phê.
- Bài tập AI xuất hiện trong hồ sơ và bản in. Giao diện ba cột trên máy tính, xếp dọc trên điện thoại; không tràn ngang trang.
- PDF.js hiển thị nguyên trang qua HTTP và khi mở file:// bằng worker dự phòng cục bộ. Vùng sai tọa độ bị bỏ qua, không vẽ khung đoán.
- **103 kiểm tra hồi quy** đạt: 343 điểm nguồn, bộ lọc, biểu đồ, Excel, sửa/lưu điểm, in, hàng đợi, tám tab và mở tệp cục bộ.
- **14 kiểm tra tài liệu lớp 5A3** đạt: 60 nhận xét và 153 bài tập khớp nguồn, 11 câu kiểm tra lại, xem/in đúng học sinh và môn, giữ dữ liệu giáo viên sửa.

Đã xem ảnh giao diện ba ô và bản in. Kiểm tra cú pháp JavaScript đạt. Không có API key trong tệp dự án.

## Kiểm thử OpenAI thật: chưa xác nhận thành công

Đã thử bằng PDF hai trang tự tạo, tên học sinh giả, trong trình duyệt riêng. Các yêu cầu streaming không nhận được phản hồi do trình duyệt báo CORS/ERR_FAILED; kiểm tra xác thực với `/v1/models` bằng cùng khóa trả **HTTP 401**. Không có kết quả chấm thật được lưu, không gửi bài hoặc tên học sinh thật. Khóa chỉ nhập vào bộ nhớ qua getpass; phiên và dữ liệu thử nghiệm được dọn sau thử.

Cần khóa API hợp lệ để kiểm thử thực tế tiếp. Các kết quả OpenAI thật trong báo cáo cũ thuộc phiên bản trước, không phải bằng chứng xác nhận luồng streaming mới. Các kiểm thử giả lập ở trên xác nhận logic, không xác nhận chất lượng nhận diện chữ viết tay hoặc độ chính xác vùng khoanh do model dự đoán.
