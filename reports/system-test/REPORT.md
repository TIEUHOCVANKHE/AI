# Kiểm thử toàn hệ thống — 27/09/2026

Kết quả cuối: **126/126 kiểm tra tự động đạt** (111 kiểm tra chính và 15 bổ sung). **API OpenAI thật chấm đúng 2/2 bài mẫu**, điểm 10/10 và 5/10. Không ghi kết quả thử vào phiên dữ liệu đang dùng của giáo viên.

## Phạm vi đã kiểm tra

- Đối chiếu tất cả 62 học sinh và 248 điểm với ba bảng người dùng đã xác nhận; đủ 8 trang điều hướng.
- 18 tổ hợp lớp/môn/đợt: số học sinh, STT, trung bình, phổ điểm, số ô điểm. Khóa STT đúng trong từng lớp; hỗ trợ tên khó đọc, số 0 đầu, Unicode và tên chính xác dự phòng; chặn STT ngoài danh sách hoặc mâu thuẫn.
- Chín lựa chọn xuất Excel, tải file XLSX thật và đọc lại đủ 12 sheet để đối chiếu tên/STT/điểm.
- Sửa điểm, điểm 0, ô trống, chặn ngoài thang, lời phê, duyệt một em/cả lớp, lưu và khôi phục. Kiểm tra hết dung lượng bộ nhớ ở cả sửa tay, duyệt hàng loạt và AI tự lưu.
- In một em/cả lớp, 46 mục nhận xét lớp 5, phiếu kiểm tra lại 11 câu có ô STT. Kiểm tra nội dung/lệnh in, không in giấy ra máy in vật lý.
- Tải/kéo thả và đổi lớp tệp; PNG/JPEG, PDF thật; tệp rỗng, sai định dạng, quá 25 MB, PDF quá 120 trang, tệp trùng, demo và dọn hàng đợi.
- PDF nguyên trang, streaming JSON/SSE chia nhỏ, nội dung xuất hiện trước khi kết thúc nhưng chưa ghi điểm; chuyển trang tự động và giữ đích lớp/môn/đợt khi người dùng đổi bộ lọc.
- Bài trùng chọn điểm cao nhất, bằng điểm giữ bài trước; duyệt lại bài AI; dừng, tải lại PDF theo dấu vân tay và chỉ chấm trang chưa hoàn tất.
- Barem giáo viên, tham chiếu riêng, lưu barem theo phạm vi; ảnh mờ, thiếu đề, điểm không xác định, điểm vượt thang, barem sai, thiếu bài tập, STT sai kiểu, JSON lỗi, từ chối, stream thiếu kết thúc hoặc phản hồi cuối không khớp.
- Lỗi 401/429/500/mạng; 429 dừng lượt; thử lưu AI lại không gửi thêm yêu cầu. Nội dung HTML trong phản hồi AI được hiển thị như văn bản; khóa không lưu trong trạng thái dữ liệu.
- Tám trang không tràn ngang ở chiều rộng 390px; mở file cục bộ offline và render PDF bằng worker dự phòng. Không lỗi JavaScript hoặc tài nguyên HTTP bị thiếu trong bộ kiểm thử chính.
- Bản lưu theo danh sách cũ của cả ba lớp được sao lưu và không ghi đè dữ liệu mới.

## Lỗi đã sửa và kiểm tra lại

1. **Tệp trùng trước khi chấm:** cùng nội dung PDF tải lại có thể khác thời gian sửa và lọt vào hàng đợi hai lần. Hiện chặn theo dấu vân tay nội dung trong cùng lớp/môn/đợt.
2. **Sửa điểm khi lưu thất bại:** trước đây bộ nhớ đang mở vẫn giữ điểm/lời phê/trạng thái mới. Hiện hoàn tác hồ sơ về giá trị cũ và giữ hộp nhập để thử lưu lại.
3. **Duyệt hàng loạt khi lưu thất bại:** hiện hoàn tác trạng thái duyệt cho tất cả học sinh bị ảnh hưởng.

Một lỗi thao tác trong kịch bản kiểm thử (bấm xóa tiêu chí khi đang ở tab Hàng đợi) cũng đã được sửa bằng cách chuyển về tab Upload trước khi bấm. Đây không phải lỗi ứng dụng.

## API thật

Người dùng nhập khóa trực tiếp trong cửa sổ Chrome riêng. Dùng `gpt-4.1`, PDF hai trang bài Toán chữ in tự tạo, chỉ ghi STT 1/2, không gửi tên hoặc bài học sinh thật. Barem giáo viên gồm hai phép tính, mỗi câu 5 điểm.

Hệ thống đọc đúng STT, chấm từng tiêu chí, trả tổng 10 và 5, tự lưu đúng hai hồ sơ/đợt trong phiên thử. Khóa đã được xóa khỏi ô nhập sau khi chạy; không ghi khóa vào mã, tệp kết quả hoặc localStorage. Kết quả chi tiết tại `live-api.json`.

Kiểm thử thật này xác nhận kết nối và luồng chấm/lưu trên bài chữ in đơn giản. Chưa dùng bài viết tay thực tế hoặc khảo sát chất lượng chấm nhiều dạng bài. Các nhánh lỗi và chế độ AI tự đề xuất đã được kiểm tra bằng phản hồi giả lập.

## Xem và chạy lại

- Ứng dụng thử trên máy: http://127.0.0.1:8765/
- Màn hình theo dõi và kết quả: http://127.0.0.1:8765/reports/system-test/
- Máy chủ chỉ lắng nghe trên máy hiện tại. Đây không phải bản triển khai công khai.
- Kết quả máy đọc: `results.json`; kết quả trước sửa: `initial-results.json`; API thật: `live-api.json`.

Để chạy lại, tại thư mục dự án, khởi động `python3 -m http.server 8765 --bind 127.0.0.1`, rồi chạy `node tests/run-all.cjs` trong môi trường có Playwright và Chrome. Nếu Playwright không nằm trong đường dẫn module mặc định, đặt `PLAYWRIGHT_MODULE` trỏ tới thư mục gói Playwright. Bộ chạy này không gọi API thật.

`node tests/live-api.cjs` mở phiên riêng để kiểm thử API thật, chờ người dùng nhập khóa và bấm Kiểm tra kết nối. Không đưa khóa vào biến môi trường, dòng lệnh hay tệp.
