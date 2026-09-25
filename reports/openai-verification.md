# Kiểm tra tích hợp chấm bài OpenAI

Đợt kiểm tra ban đầu dùng Chrome với API được chặn và trả phản hồi giả lập. Đợt này không dùng API key thật hoặc gửi bài học sinh tới OpenAI; kiểm thử thật bằng bài mẫu được ghi riêng bên dưới.

- 32 tình huống tích hợp chính: các bước chuẩn bị bắt buộc; gửi ảnh/PDF và tham chiếu đúng cấu trúc Responses API; rubric riêng theo lớp/môn/đợt; kết quả từng tiêu chí; duyệt đúng ô điểm; giữ nguyên điểm trước duyệt; điểm 0; dữ liệu không đọc được để trống; lưu/tải lại; in bài tập; mobile.
- Đã giả lập 14 yêu cầu API để kiểm tra các phản hồi thành công, 401, 429, 500, lỗi mạng, kết quả thiếu, từ chối xử lý, JSON lỗi, điểm vượt thang và thiếu tiêu chí. Thông báo lỗi không lộ nội dung lỗi thô có thể chứa thông tin nhạy cảm.
- Kiểm tra bổ sung: chặn hai tệp cùng học sinh/môn/đợt trong một lượt; 429 dừng các bài chưa gửi; cộng đúng hai tiêu chí; hiển thị tên đọc từ bài; phiếu rèn luyện sau duyệt; quá 120 giây chờ thì báo lỗi và không tự gửi lại; xóa khóa khỏi phiên; hộp duyệt trên máy tính/điện thoại.
- Không lưu API key hoặc nội dung tệp dạng base64 trong localStorage. Kết quả AI có chứa thẻ HTML được hiển thị như văn bản, không thực thi.
- 107 kiểm tra hồi quy dữ liệu gốc tiếp tục đạt: 343 điểm nguồn, lọc lớp/môn/đợt, Excel, in phiếu, lưu điểm, 12 mục điều hướng, mở tệp cục bộ và không tràn ngang.

Không có lỗi JavaScript trình duyệt trong các kiểm tra. Đã xem ảnh giao diện cấu hình và hộp kiểm duyệt.

Các kiểm tra ban đầu ở trên dùng API giả lập. Kết quả kiểm thử API thật và luồng PDF cả lớp được bổ sung bên dưới.

## Kiểm thử thật bằng khóa người dùng — hoàn thành

Đã gọi OpenAI thật trong trình duyệt với model `gpt-4.1`, dùng bài mẫu tự tạo và tên học sinh giả trong phiên riêng. Không gửi bài hoặc tên học sinh thật. Khóa nhập qua bộ nhớ, không ghi vào mã hay báo cáo; dữ liệu kiểm thử trong trình duyệt được dọn sau khi chạy.

- Luồng một bài: ảnh và PDF đều cho điểm đúng **5/10** theo barem, chưa sửa sổ trước duyệt và ghi đúng ô sau duyệt.
- Luồng mới PDF cả lớp: một PDF hai học sinh, hai trang, **không nhập đáp án và không chọn học sinh trước**. OpenAI nhận diện đúng hai bài, tự đề xuất đáp án/thang điểm và chấm lần lượt **5/10**, **10/10**, đúng kết quả mong đợi.
- Cả 3 yêu cầu trong luồng PDF cả lớp trả HTTP 200, trạng thái `completed`, model thực tế `gpt-4.1-2025-04-14`. Tổng 3.142 token (2.481 đầu vào, 661 đầu ra). Không có lỗi JavaScript trình duyệt.
- Đối chiếu tên tự động đúng hai học sinh kiểm thử; điểm giữ nguyên đến khi duyệt, sau đó cập nhật đúng học sinh/môn/đợt. Không lưu khóa vào localStorage.

Phạm vi kiểm thử thật là tài liệu chữ in đơn giản. Chất lượng chấm chữ viết tay, scan mờ, bài tự luận và thang điểm AI đề xuất vẫn cần giáo viên đối chiếu trên tài liệu thực tế.

## Kiểm thử bổ sung PDF cả lớp và chế độ tự đề xuất

18 tình huống đạt trong phiên bản PDF cả lớp ban đầu với API giả lập, gồm (quy tắc ghép tay và chặn bài trùng sau đó được thay bằng quy tắc tự động ở mục tiếp theo):

- Tải PDF chọn lớp, chế độ mặc định tự đề xuất và không yêu cầu barem.
- Tách đúng các trang của học sinh có nhiều trang; mỗi yêu cầu chấm chỉ nhận đúng phần PDF tương ứng.
- Tạo 30 kết quả riêng từ PDF 30 học sinh (31 yêu cầu giả lập gồm chỉ mục và 30 bài).
- Khớp tên chính xác; tên lạ để trống liên kết; giáo viên đối chiếu sau chấm; chặn duyệt hai bài trong cùng PDF vào một học sinh.
- Lưu/tải lại kết quả và điểm; khóa không được lưu.
- Tiếp tục sau giới hạn API không nhận diện lại PDF hoặc gửi lại bài đã chấm xong.
- Chặn chỉ mục thiếu trang, trùng trang; liệt kê rõ trang chưa xác định cùng lý do.
- Chặn thang điểm AI sai tổng, thiếu đề hoặc phản hồi không hoàn chỉnh; không tạo điểm giả.
- Chế độ barem giáo viên vẫn kiểm tra tổng /10 và dùng đúng rubric đã nhập.
- Bố cục trên điện thoại không tràn ngang toàn trang; bảng kết quả cuộn trong vùng riêng.

## Tự động ghép họ tên và chọn bài điểm cao nhất — 2026-09-26

Quy tắc mới thay bước ghép học sinh thủ công: không phụ thuộc thứ tự bài trong PDF; bỏ qua tên thiếu/ngoài danh sách/không khớp chắc chắn; chọn tổng điểm AI hợp lệ cao nhất trong cùng học sinh, lớp, môn, đợt. Duyệt điểm vẫn là bước riêng, danh tính học sinh đã được tự ghép và không chỉnh tay.

Đã đạt **22 tình huống kiểm tra trình duyệt với Responses API giả lập**, dùng PDF thực được tạo và tách tại trình duyệt:

- PDF đảo thứ tự, tên viết hoa/thường, thừa khoảng trắng, Unicode tổ hợp; ghép chính xác mà không dùng STT, không bỏ dấu để đoán tên gần giống.
- Đọc tên độc lập lần thứ hai khi chấm, không đưa tên dự kiến hoặc danh sách lớp vào yêu cầu này; tên khác/thiếu/ngoài danh sách ở bước này đều bị bỏ qua.
- Bài không có tên hoặc tên ngoài danh sách bị bỏ qua ngay sau nhận diện; không gửi thêm yêu cầu chấm, không ghi điểm, có lý do và số lượng trong hàng đợi.
- Trùng tên chọn điểm cao nhất, bằng điểm giữ bài đã duyệt hoặc bài đầu tiên; loại bài thấp khỏi danh sách duyệt. Không cho ghi điểm bài bị loại kể cả gọi hành động trực tiếp hoặc mở hộp duyệt từ trước.
- So sánh qua nhiều PDF, kể cả đã duyệt bài thấp trước đó; tách biệt lớp, môn và đợt. Điểm nguồn không tham gia so sánh bài trùng.
- Bài nhiều trang không liền nhau được tách đúng; phiếu hoàn chỉnh khác của cùng tên được chấm riêng.
- Điểm 0 hợp lệ; điểm chưa xác định không được biến thành 0 hoặc chọn làm bài thắng. Danh sách lớp có tên không phân biệt duy nhất thì bỏ qua, không gán nhầm.
- Tiếp tục sau lỗi 429 chỉ gửi bài chưa chấm; cập nhật lựa chọn cao nhất khi nhận thêm kết quả. Chặn duyệt khi lượt chấm còn đang chạy.
- PDF 30 bài đảo thứ tự có tên trùng: 31 yêu cầu giả lập; chọn đúng hai bài cao nhất cho hai học sinh, loại 28 bài còn lại.
- Lưu/tải lại giữ bài bị bỏ qua, bài trùng, kết quả đã duyệt và điểm; không lưu khóa. Chế độ barem giáo viên dùng cùng quy tắc ghép tên và chọn điểm.
- Giao diện điện thoại không tràn ngang toàn trang; ô học sinh tự ghép chỉ đọc. Không lỗi JavaScript.

Đã chạy lại **107 kiểm tra hồi quy**: 343 điểm nguồn, 18 tổ hợp bộ lọc, biểu đồ, Excel, sửa/lưu điểm, in, phạm vi tải tệp, 12 mục điều hướng, điện thoại và mở tệp cục bộ mất mạng — đều đạt. Kiểm tra cú pháp JavaScript đạt.

Đợt này không gọi API thật; các kiểm thử API thật ở mục trước thuộc phiên bản trước thay đổi quy tắc họ tên. Kiểm thử giả lập xác nhận logic xử lý và các nhánh lỗi, không đo độ chính xác nhận diện chữ viết tay thực tế.
