# Kết quả kiểm tra

Đã chạy 107 kiểm tra tự động trên Chrome bằng một phiên trình duyệt riêng; không phát hiện lỗi JavaScript hoặc tài nguyên tải thất bại.

- Đối chiếu chính xác mọi tên và điểm với bảng Markdown nguồn: 343 điểm hợp lệ, 1 ô trống.
- 18 tổ hợp lớp / môn / đợt: danh sách, trung bình, số điểm hợp lệ và phổ điểm.
- Giữ riêng tên chưa khớp giữa hai môn; không ghép người dựa trên STT.
- Sửa điểm 0, để trống, chặn điểm trên 10, lưu qua tải lại; chỉnh một điểm không làm đổi môn hoặc đợt khác.
- 9 lựa chọn xuất Excel; đối chiếu nội dung 12 sheet với nguồn và tải tệp XLSX thực tế.
- In một học sinh / cả lớp đúng phạm vi; kiểm tra lệnh in và nội dung được chuẩn bị, không in ra máy in vật lý.
- 12 mục điều hướng; tệp nhập và hàng đợi tách riêng theo lớp; duyệt hàng loạt theo bộ lọc.
- Các trang tổng quan, danh sách, tiến bộ, thống kê và hồ sơ không tràn ngang ở chiều rộng 390px; bảng điểm có vùng cuộn riêng.
- Mở `index.html` qua đường dẫn tệp cục bộ trong chế độ mất mạng thành công.
- Đã xem ảnh giao diện tổng quan, biểu đồ tiến bộ và hồ sơ trên điện thoại.

Trung bình nguồn để đối chiếu (làm tròn 2 chữ số):

| Lớp | Toán Đ1 | Toán Đ2 | Tiếng Việt Đ1 | Tiếng Việt Đ2 |
|---|---:|---:|---:|---:|
| 3A4 | 6,11 | 9,64 | 6,68 | 8,64 |
| 4 | 6,63 | 9,18 | 6,64 | 8,46 |
| 5A3 | 6,77 | 8,93 | 7,00 | 8,77 |

Toán lớp 4 đợt 1 có 27 điểm; các tập còn lại có 28 điểm (lớp 3 và lớp 4) hoặc 30 điểm (lớp 5).

Chưa triển khai lên repository GitHub. Luồng chấm OpenAI đã kiểm thử thật bằng bài mẫu; xem `openai-verification.md` để biết phạm vi và kết quả. Chỉnh sửa điểm vẫn lưu trên trình duyệt đang dùng.
