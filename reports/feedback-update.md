# Cập nhật nhận xét — 27/09/2026

- Mẫu mới: Nhận xét, Đánh giá chung, Bài tập đề xuất với Bài 1–3. Nhãn in đậm, xuống dòng, dùng thống nhất khi chấm trực tiếp, xem lại, xem hồ sơ và in phiếu.
- Nhận xét và đánh giá chung tối đa 150 từ; tổng nội dung 3 bài tập tối đa 300 từ. Kiểm tra giới hạn theo khoảng trắng. Không cắt giữa đề bài; kết quả sai mẫu/quá dài báo lỗi và không tự gọi lại AI.
- Yêu cầu AI viết gần gũi, dẫn chứng câu cụ thể, chỉ nêu nguyên nhân có căn cứ; không bịa hạn chế khi bài làm đúng, không quy lỗi kiến thức cho ảnh mờ. Chưa đủ dữ liệu thì ghi “Chưa đủ căn cứ”.
- Bài tập tự soạn bám kiến thức được chấm, đúng lớp/môn, yêu cầu phù hợp bộ Kết nối tri thức với cuộc sống; không tra cứu hay chứng nhận nội dung trùng sách giáo khoa.
- Vẫn một yêu cầu API mỗi trang; nhận xét ưu tiên 60–100 từ, mỗi bài tập 30–60 từ, không thêm lời giải dài. Giới hạn cập nhật giao diện theo luồng khoảng 80 ms/lần; bảo vệ hiển thị dữ liệu chưa được kiểm tra. Không giảm trần token dùng chung cho toàn bộ phần chấm từng câu.

## Kiểm tra

`tests/run-all.cjs`: **137 đạt, 0 lỗi**, chạy Chrome qua Playwright với API mô phỏng. Bao gồm giới hạn đúng 150/300 từ, từ chối phản hồi vượt giới hạn/sai mẫu/thiếu bài tập mà không tự gọi lại, lưu đúng học sinh, phiếu in, lịch sử cũ, streaming, dừng/tiếp tục, lỗi lưu, chống chèn HTML, Excel và giao diện di động. Kiểm tra thêm bố cục 390 px không tràn ngang; nhãn Bài 1–3 không bị lặp số thứ tự.

[Ảnh minh họa định dạng](feedback-preview.png) dùng nội dung mô phỏng, không phải kết quả đánh giá chất lượng AI thật. Chưa chạy lại API thật hoặc đo thời gian đáp ứng và mức độ bám sách của đầu ra thật trong lượt cập nhật này.
