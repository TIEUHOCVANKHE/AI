# Kiểm tra danh sách lớp 3 và STT — 26/09/2026

Nguồn chính thức là bảng **17 học sinh** trong tin nhắn cuối của người dùng, thay thế các bảng 23 học sinh và hai file Excel trước đó.

## Kết quả

- Đối chiếu chính xác 17 tên, STT 1–17 và toàn bộ 68 điểm. Tổng Toán lần 1/lần 2: 109/163; Tiếng Việt lần 1/lần 2: 110/145.
- Dữ liệu nguồn lớp 4 và lớp 5 bằng dữ liệu trước chỉnh sửa. Các chỉnh sửa đã lưu của lớp 4 được giữ khi cập nhật lớp 3.
- Bảng điểm, bộ lọc cả hai môn/từng môn và dữ liệu truyền cho chức năng xuất Excel giữ đúng STT và điểm.
- Khớp STT khi không có tên hoặc tên khó đọc; chấp nhận số 0 đầu như `017`. Thiếu STT được đối chiếu bằng tên chính xác. STT 18, STT 0, số thập phân, tên không khớp và STT/tên mâu thuẫn không gán nhầm học sinh. Lớp 4 chưa áp dụng nhận diện bằng STT.
- Chạy toàn bộ luồng chấm với 6 trang và phản hồi streaming giả lập: trang chỉ có STT, tên khó đọc, STT ngoài danh sách, STT/tên mâu thuẫn, bài trùng và điểm 0. Bài hợp lệ ghi đúng học sinh và đợt; bài trùng chọn điểm cao nhất.
- Tải lại trang giữ điểm mới và STT trong lịch sử. Bản lưu cũ không ghi đè bảng 17 em; có bản sao lưu trước cập nhật và lịch sử AI cũ được lưu riêng.
- **20 kiểm tra đạt**, không có lỗi JavaScript trong trình duyệt Chrome. Đã xem ảnh toàn bộ bảng điểm ở kích thước 1440 px: 17 hàng hiển thị đầy đủ.

Kiểm tra API dùng dữ liệu giả lập, không gửi bài học sinh tới dịch vụ và không phát sinh phí API. Chưa đánh giá khả năng đọc STT viết tay trên bài thật.
