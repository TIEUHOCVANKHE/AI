# Cập nhật nhận xét và phiếu ba lớp

Ngày 27/09/2026. Nguồn: `nhan_xet_3_lop_ca_nhan.md` và `bai_tap_ca_nhan_3_lop.md` do người dùng cung cấp, giữ nguyên bản trong `assets/documents/`.

| Lớp | Học sinh | Nhận xét theo môn | Bài tập | Trang PDF |
|---|---:|---:|---:|---:|
| 3A4 | 17 | 34 | 82 | 17 |
| 4A6 | 22 | 44 | 116 | 22 |
| 5A3 | 23 | 46 | 132 | 23 |
| Tổng | 62 | 124 | 330 | 62 |

Ghép chính xác lớp + STT + tên chuẩn hóa Unicode; giữ trọn nội dung nhận xét, mức đánh giá, trọng tâm và tất cả câu bài tập. Cập nhật nhãn lớp 4A6 từ nguồn mới, giữ khóa lớp 4 để không ảnh hưởng dữ liệu đã lưu. Không đổi điểm, lời phê chỉnh tay hoặc trạng thái duyệt.

Phiếu mới dùng giấy A4 dọc, lề 12 mm, chữ 11 pt, nền trắng. Bỏ mục “Bài tập do giáo viên bổ sung” và khung trống; lược bỏ bảng điểm và thông tin lặp để dành chỗ cho nội dung hai môn. Không nối thêm bài tập AI cũ của môn đã có trong nguồn mới. Các từ được in đậm trong đề Tiếng Việt được giữ nguyên. Tài liệu mới vẫn có mặt trong hồ sơ học sinh và phần Phiếu BT cá nhân hóa; lời phê đã lưu được ghi rõ nguồn riêng.

## Kiểm tra

- Bộ kiểm thử hiện có: 138 đạt, 0 lỗi, với API mô phỏng.
- `tests/worksheets.cjs`: kiểm tra 62 bản in giữ đủ nội dung, không còn mục giáo viên bổ sung, bộ lọc từng môn đúng, điểm/lời phê/duyệt không đổi, chữ in đậm được giữ, không tràn ngang ở 390 px. Xuất qua chính luồng in của web và kiểm tra số trang bằng PDFLib.
- `tests/verify-worksheet-pdfs.py`: đối chiếu từng tên, nhận xét, đánh giá chung, trọng tâm, tất cả câu bài tập với văn bản trích từ đúng trang PDF của từng học sinh; xác nhận kích thước A4.
- Kiểm tra hồ sơ cả 62 em đều có nhận xét mới, ẩn thông báo lời phê trống và vẫn hiển thị lời phê giáo viên đã chỉnh riêng.
- Xem ảnh dựng từ PDF ở các trang nhiều nội dung của ba lớp; đủ nội dung, rõ chữ, không chồng lấn/cắt chữ. Bản cuối đã bỏ nền xám để tiết kiệm mực.

Các PDF sẵn in nằm trong `output/pdf/Phieu_bai_tap_3A4.pdf`, `Phieu_bai_tap_4A6.pdf`, `Phieu_bai_tap_5A3.pdf`. Khi in trực tiếp từ web, chọn A4 dọc, tỉ lệ 100%, tắt đầu/chân trang trình duyệt.
