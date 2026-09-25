# Quản lý điểm — TRƯỜNG TIỂU HỌC VĂN KHÊ

Mở `index.html` hoặc `h_th_ng_ch_m_i_m_t_ng_b_ng_ai_agent.html`. Dự án chỉ dùng HTML, CSS và JavaScript; các thư viện cần thiết nằm trong `assets/`. Không cần cài Node, Python, chạy build hay máy chủ ứng dụng để sử dụng.

Để đưa lên GitHub Pages, đưa `index.html`, tệp HTML chính, `.nojekyll` và toàn bộ thư mục `assets/` vào cùng thư mục xuất bản của repository. Không đổi cấu trúc đường dẫn tương đối.

- Tên quản trị hiển thị: **admin**; trường: **TRƯỜNG TIỂU HỌC VĂN KHÊ**.
- Chọn lớp 3 (3A4), lớp 4 (nguồn chưa ghi mã lớp), lớp 5 (5A3), môn và đợt chấm bằng bộ chọn chung.
- Biểu đồ dùng phần tử HTML `meter` / `progress`, có giá trị bằng chữ và bảng đối chiếu. Không dùng Chart.js hoặc Tailwind chạy trong trình duyệt.
- Nguồn có 28 / 28 / 30 tên mỗi môn, 2 đợt; tổng cộng 343 điểm và 1 ô trống. Điểm trống giữ `null` và không tham gia tính trung bình. Phổ điểm cả hai môn đếm **lượt điểm**, không phải số học sinh duy nhất.
- Tên lệch giữa hai môn được giữ riêng và ghi chú: lớp 3 có 30 hồ sơ theo tên, lớp 4 có 28, lớp 5 có 31. Đây chưa phải sĩ số xác nhận. Không ghép người theo số thứ tự. Xem lưu ý đối chiếu trên trang.
- Sửa/duyệt được từng môn và từng đợt; cho phép điểm 0 hoặc để trống. Chỉnh sửa lưu ở trình duyệt hiện tại, không đồng bộ sang máy khác. Xuất Excel để giữ bản bảng điểm sau chỉnh sửa.
- Xuất cả hai môn tạo hai sheet, giữ tên, thứ tự và hai cột điểm của từng môn. Bản nguồn gốc được giữ trong `assets/data.js`.
- Các nút điều hướng, nhập tệp, demo, duyệt điểm, xuất Excel và in phiếu vẫn có mặt. Đã bổ sung luồng OpenAI thật dùng API key do người sử dụng nhập; phần demo không gọi API. Xem hướng dẫn bên dưới.

Tài nguyên bên thứ ba: SheetJS CE 0.20.3 (Apache-2.0) để xuất XLSX; Font Awesome Free 6.5.1 để hiển thị biểu tượng; CSS giao diện được tạo sẵn từ Tailwind CSS 3.4.17. Thông tin bản quyền được giữ trong các tệp thư viện.

## Chấm PDF của cả lớp bằng OpenAI

1. Mở **Upload bài làm viết tay**, nhập API key của bạn và kiểm tra kết nối. Model mặc định `gpt-4.1`; có thể đổi sang model hỗ trợ ảnh/PDF, Responses API và Structured Outputs.
2. Chọn **lớp, môn, đợt**. Một PDF chứa bài của cả lớp trong một môn/đợt; không cần chọn từng học sinh trước khi tải hoặc chấm. Thứ tự học sinh trong PDF có thể lộn xộn, không cần theo danh sách lớp. Phiếu cần ghi rõ họ tên; các trang tiếp nối được nhóm theo bằng chứng trên bài, không theo STT.
3. Chọn chế độ:
   - **AI tự đề xuất từ phiếu bài tập** (mặc định): không cần nhập đáp án hoặc barem. AI đọc đề, tự giải độc lập, đề xuất tiêu chí và thang điểm tổng 10, rồi chấm từng bài. Đáp án/thang điểm đề xuất được lưu cùng kết quả để giáo viên kiểm tra.
   - **Dùng đáp án & thang điểm của giáo viên**: nhập tiêu chí và đáp án, tổng điểm tối đa bằng 10; lưu riêng theo lớp/môn/đợt.
4. Có thể đính kèm một PDF/ảnh đề hoặc đáp án bổ sung. Tải PDF bài làm cả lớp, kiểm tra **Lớp của tệp**, rồi bấm **Bắt đầu chấm**. Ảnh JPG/PNG cũng được hỗ trợ.
5. Hệ thống đọc chỉ mục học sinh/trang, tách PDF cục bộ bằng JavaScript, rồi chấm lần lượt các bài. Một học sinh có thể có nhiều trang. Xem tiến trình, dừng hoặc tiếp tục/thử lại nếu cần. Các bài đã chấm xong không bị gửi lại khi tiếp tục cùng tệp trong phiên.
6. Hệ thống tự đối chiếu họ tên trong đúng lớp và môn, chuẩn hóa chữ hoa/thường, khoảng trắng và Unicode nhưng giữ dấu tiếng Việt. AI đọc tên khi nhận diện trang và đọc lại độc lập khi chấm, không được gợi ý tên từ danh sách. Hai lần đọc phải cùng khớp duy nhất một học sinh. Bài thiếu tên, ngoài danh sách, tên mơ hồ hoặc hai lần đọc không khớp được **tự động bỏ qua**, không yêu cầu ghép thủ công. Trang không xác định cũng được bỏ qua và ghi rõ lý do trong hàng đợi.

   Nếu một học sinh có nhiều bài trong cùng lớp/môn/đợt (kể cả nhiều PDF), hệ thống **tự chọn bài có tổng điểm AI hợp lệ cao nhất**. Các bài còn lại giữ trong lịch sử với trạng thái bị loại, không đưa vào danh sách duyệt. Bằng điểm thì ưu tiên bài từng được duyệt, sau đó bài xuất hiện trước. Không so sánh với điểm nguồn có sẵn hay với môn/đợt khác. Bài chưa chấm xong do lỗi API có thể thử lại; hệ thống tính lại bài cao nhất khi có kết quả mới.
7. Bấm **Xem & duyệt** từng bài để xem trang gốc, tên đọc được, điểm từng tiêu chí và đáp án đã dùng. Học sinh đã được tự động ghép và không phải chọn lại; giáo viên kiểm tra barem do AI đề xuất, chốt điểm rồi xác nhận ghi vào sổ. Chỉ bài được chọn điểm cao nhất mới có thể duyệt; chờ kết thúc lượt chấm để tránh duyệt khi chưa so sánh hết bài. Điểm hiện có chỉ thay sau thao tác duyệt.
8. Điểm đã duyệt cập nhật bảng điểm, biểu đồ, Excel và phiếu rèn luyện. Nguồn ban đầu trong `assets/data.js` được giữ nguyên.

Mỗi tệp tối đa 25 MB; tổng tệp lớp và tham chiếu tối đa 35 MB; mỗi PDF tối đa 120 trang. Với trang chứa nhiều học sinh không tách được bằng ranh giới trang, hoặc đề/ảnh không đọc rõ, hệ thống yêu cầu đối chiếu/tài liệu rõ hơn, không tạo điểm giả. Thang điểm AI tự đề xuất có thể khác giữa các phiếu khác nhau; dùng barem giáo viên nếu cần một barem cố định cho cả lớp.

API chạy theo một yêu cầu nhận diện PDF và một yêu cầu chấm cho mỗi bài có họ tên khớp danh sách; bài trùng tên được chấm riêng để so điểm, bài không khớp bị bỏ qua trước bước chấm; có thể phát sinh phí theo số bài và dung lượng tài liệu. Nút Kiểm tra kết nối cũng gửi một yêu cầu nhỏ. Chỉ các bài thật được gửi OpenAI; bài mẫu demo không gọi API. Không tự gửi lặp khi gặp lỗi mạng/timeout.

Khóa chỉ tồn tại trong trang đang mở, không ghi vào localStorage, mã nguồn hoặc lịch sử. Tải lại trang phải nhập lại khóa; có nút xóa khóa khỏi phiên. Với trang tĩnh, khóa vẫn nằm trong trình duyệt: chỉ dùng trên thiết bị/trang tin cậy, không nhúng khóa chung vào GitHub. Nếu triển khai nhiều người dùng chung một khóa, cần bổ sung máy chủ trung gian theo [khuyến nghị OpenAI](https://developers.openai.com/api/reference/overview).

Khi chấm, ứng dụng gửi bài làm, thông tin lớp/môn/đợt, tên nhận diện, rubric và tệp tham chiếu tới OpenAI Responses API với `store: false`. Đây không phải cam kết không lưu bất kỳ dữ liệu nào tại nhà cung cấp. Cần mạng và hạn mức API để chấm thật; bảng điểm và các chức năng cục bộ vẫn hoạt động khi mất mạng.

Kết quả chờ duyệt/đã duyệt và rubric lưu ở trình duyệt hiện tại. PDF gốc, PDF đã tách và tham chiếu chỉ giữ trong phiên; tải lại trang cần chọn lại tệp để chấm mới. Lịch sử AI giữ đề xuất ban đầu ngay cả khi điểm trong sổ được sửa thủ công sau đó.

Tài liệu triển khai: [ảnh đầu vào](https://developers.openai.com/api/docs/guides/images-vision), [PDF đầu vào](https://developers.openai.com/api/docs/guides/file-inputs), [kết quả có cấu trúc](https://developers.openai.com/api/docs/guides/structured-outputs), [PDF-LIB — tách trang](https://pdf-lib.js.org/docs/api/classes/pdfdocument). PDF-LIB 1.17.1 được phân phối kèm giấy phép MIT trong `assets/vendor/pdf-lib.LICENSE.md`.

## Phiếu bài tập và nhận xét lớp 5A3

Đã nhập hai tài liệu người dùng cung cấp vào `assets/remedial-data.js`: **60 nhận xét theo môn, 153 bài tập cá nhân**, cùng phiếu kiểm tra lại sau 2 tuần gồm 6 bài Toán và 5 bài Tiếng Việt. Bản Markdown gốc được giữ nguyên trong `assets/documents/` và có liên kết tải trong giao diện.

- Chọn **Lớp 5 · 5A3 → Phiếu BT cá nhân hóa → Xem nhận xét & bài tập** ở từng học sinh. Bộ lọc Toán/Tiếng Việt áp dụng cho cả nội dung xem và in.
- Hồ sơ học sinh trong **Kết quả AI & Chi tiết** cũng hiển thị nhận xét, hướng khắc phục và bài tập đã nhập. In từng em hoặc in cả lớp bằng các nút sẵn có; bản in bao gồm nội dung được cung cấp và bài tập OpenAI đã duyệt nếu có.
- Nội dung tài liệu dựa trên khảo sát đợt 1, được ghi rõ nguồn và vẫn xem được khi đang chọn đợt 2. Điểm, lời phê chỉnh tay và trạng thái duyệt hiện có không bị ghi đè khi nhập tài liệu.
- Mục nguồn “Nguyễn Mạnh Dũng / Nguyễn Anh Dũng” được phân theo danh sách từng môn: Toán cho **Nguyễn Mạnh Dũng**, Tiếng Việt cho **Nguyễn Anh Dũng**. Hai hồ sơ hiện có vẫn tách riêng; không suy đoán rằng đây là cùng một người. Vì vậy 30 mục trong tài liệu được gắn vào 31 hồ sơ theo tên của hệ thống.
- Hướng dẫn sử dụng, tổ chức phụ đạo và phiếu kiểm tra sau 2 tuần nằm ở đầu trang Phiếu BT cá nhân hóa khi chọn lớp 5A3.

Menu còn 8 tab. Đã xóa **Đề thi & Rubric KNTT**, **Thống kê & Phân tích**, **Test Panel AI Vision**, **Demo / Fallback** và các trang tương ứng. Đáp án/thang điểm thực tế vẫn ở phần Upload, nhật ký chấm chuyển vào Hàng đợi chấm, liên kết báo cáo ở Tổng quan mở trang Theo dõi tiến độ.
