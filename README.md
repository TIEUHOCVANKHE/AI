# Quản lý điểm — TRƯỜNG TIỂU HỌC VĂN KHÊ

Cập nhật phiếu ba lớp ngày 27/09/2026: **138 kiểm tra tự động đạt**, dùng API mô phỏng; đã kiểm tra thêm 62 phiếu/62 trang A4. Xem [báo cáo cập nhật phiếu](reports/worksheets-update.md) và [báo cáo mẫu nhận xét AI](reports/feedback-update.md). Lượt kiểm thử API thật trước thay đổi này chấm đúng hai bài mẫu 10/10 và 5/10; xem [báo cáo trước cập nhật](reports/system-test/REPORT.md).

Mở `index.html` hoặc `h_th_ng_ch_m_i_m_t_ng_b_ng_ai_agent.html`. Dự án chỉ dùng HTML, CSS và JavaScript; các thư viện cần thiết nằm trong `assets/`. Không cần cài Node, Python, chạy build hay máy chủ ứng dụng để sử dụng.

Để đưa lên GitHub Pages, đưa `index.html`, tệp HTML chính, `.nojekyll` và toàn bộ thư mục `assets/` vào cùng thư mục xuất bản của repository. Không đổi cấu trúc đường dẫn tương đối.

- Tên quản trị hiển thị: **admin**; trường: **TRƯỜNG TIỂU HỌC VĂN KHÊ**.
- Chọn lớp 3 (3A4), lớp 4 (4A6), lớp 5 (5A3), môn và đợt chấm bằng bộ chọn chung.
- Biểu đồ dùng phần tử HTML `meter` / `progress`, có giá trị bằng chữ và bảng đối chiếu. Không dùng Chart.js hoặc Tailwind chạy trong trình duyệt.
- Lớp 3A4 có **17 học sinh**, STT cố định **1–17** cho cả hai môn, theo bảng tổng hợp mới nhất người dùng xác nhận ngày 26/09/2026. Giữ đủ 68 điểm lần 1/lần 2; không dùng bảng 23 em hoặc danh sách cũ nữa. Tổng bốn cột Toán lần 1/lần 2 và Tiếng Việt lần 1/lần 2 lần lượt là **109 / 163 / 110 / 145**.
- Lớp 4 có **22 học sinh**, STT cố định **1–22**, theo bảng người dùng cung cấp ngày 27/09/2026. Có đủ **88 điểm**, gồm điểm Toán lần 1 của Nguyễn Gia Linh là **7**. Tổng Toán lần 1/lần 2: **147 / 202**; Tiếng Việt lần 1/lần 2: **144 / 186**.
- Lớp 5A3 có **23 học sinh**, STT cố định **1–23**, theo bảng người dùng cung cấp ngày 27/09/2026. Có đủ **92 điểm**. Tổng Toán lần 1/lần 2: **153 / 205**; Tiếng Việt lần 1/lần 2: **163 / 203**.
- Ba lớp có **17 / 22 / 23 học sinh**, tổng **62 học sinh và 248 điểm**, không có ô trống. Điểm trống giữ `null` và không tham gia tính trung bình. Phổ điểm cả hai môn đếm **lượt điểm**, không phải số học sinh duy nhất.
- Cả ba lớp dùng khóa **lớp + STT**, không đổi STT khi lọc môn, xem hồ sơ, in phiếu hoặc xuất Excel.
- Sửa/duyệt được từng môn và từng đợt; cho phép điểm 0 hoặc để trống. Chỉnh sửa lưu ở trình duyệt hiện tại, không đồng bộ sang máy khác. Xuất Excel để giữ bản bảng điểm sau chỉnh sửa.
- Xuất cả hai môn tạo hai sheet, giữ tên, thứ tự và hai cột điểm của từng môn. Bản nguồn gốc được giữ trong `assets/data.js`.
- Các nút điều hướng, nhập tệp, demo, duyệt điểm, xuất Excel và in phiếu vẫn có mặt. Đã bổ sung luồng OpenAI thật dùng API key do người sử dụng nhập; phần demo không gọi API. Xem hướng dẫn bên dưới.

Tài nguyên bên thứ ba: SheetJS CE 0.20.3 (Apache-2.0) để xuất XLSX; Font Awesome Free 6.5.1 để hiển thị biểu tượng; CSS giao diện được tạo sẵn từ Tailwind CSS 3.4.17. Thông tin bản quyền được giữ trong các tệp thư viện.

## Chấm nguyên trang PDF, streaming và tự lưu

1. Mở **Upload bài làm viết tay**, nhập API key và kiểm tra kết nối. Model mặc định `gpt-4.1`; API key chỉ nằm trong phiên, không nhúng vào mã nguồn hay lưu lâu dài.
2. Chọn **lớp, môn, đợt 1 hoặc 2** rồi tải PDF cả lớp. **Mỗi trang là toàn bộ bài của một học sinh**; thứ tự tên có thể lộn xộn. Ảnh JPG/PNG được coi là một trang.
3. Chọn **AI tự đề xuất từ phiếu bài tập** hoặc **Dùng đáp án & thang điểm giáo viên** (tổng 10 điểm). Tệp đề/đáp án tham chiếu vẫn tùy chọn.
4. Bấm **Bắt đầu chấm**. Hệ thống hiển thị ba ô: nguyên trang với khung xanh vùng nhận diện; chấm từng mục; nhận xét và bài bổ sung. Nội dung được hiển thị từ các phần phản hồi OpenAI đang trả về thật, không đợi toàn bộ câu trả lời rồi tạo hiệu ứng gõ. Khung xanh chỉ đánh dấu vùng nhận diện, không xác nhận bài đúng; vùng không xác định hoặc tọa độ sai không được vẽ.
5. Sau khi nhận đủ kết quả và kiểm tra thang điểm, hệ thống đối chiếu trong đúng lớp và môn đã chọn. **Cả ba lớp ưu tiên STT học sinh ghi trên bài**, kể cả khi thiếu tên hoặc tên khó đọc; số trang PDF không phải STT. STT có thể ghi `1` hoặc `01`. Khi thiếu/không đọc rõ STT, hệ thống dùng họ tên khớp chính xác (chuẩn hóa Unicode, hoa/thường và khoảng trắng, giữ dấu). STT ngoài danh sách, sai định dạng hoặc STT và họ tên khớp hai em khác nhau được giữ trong lịch sử nhưng **không ghi sổ**.
6. Trang hợp lệ tự lưu **điểm, nhận xét và bài bổ sung** vào đúng đợt đã chọn, thay giá trị đang có. Đổi bộ lọc lúc chấm không đổi đích lưu. Hệ thống tự chuyển cả ba ô sang trang tiếp theo, không cần bấm chuyển tay.
7. Bài trùng cùng học sinh/lớp/môn/đợt được chấm riêng rồi lấy tổng điểm AI hợp lệ cao nhất; nhận xét và bài tập đi cùng bài được chọn. Bằng điểm giữ bài được chọn trước. Không so sánh với điểm nguồn hoặc môn/đợt khác.
8. **AI tự động lưu** khác **Giáo viên đã duyệt**. Giáo viên vẫn có thể mở kết quả, chỉnh sửa điểm và lời phê, rồi xác nhận duyệt. Bảng điểm, biểu đồ, Excel, hồ sơ và phiếu in dùng kết quả đã lưu; nhận xét/bài tập từ hai tài liệu mới của ba lớp được giữ riêng, ưu tiên dùng trên phiếu in.

**Dừng và tiếp tục:** nút Dừng hủy trang đang xử lý, giữ các trang đã hoàn tất. Tiếp tục chỉ chấm trang chưa xong. Sau khi tải lại trình duyệt, nhập lại khóa rồi tải đúng PDF gốc; hệ thống kiểm tra dấu vân tay nội dung để nối lại hàng đợi mà không gửi lại các trang đã xử lý. Nếu có tham chiếu, phải chọn lại đúng tệp tham chiếu. Lỗi khóa/hạn mức dừng cả lượt; lỗi một trang được ghi rõ và không tạo điểm giả.

**Lưu an toàn:** điểm và báo cáo AI được ghi cùng một lần vào `van-khe-state-v2`. Bản lưu cũ vẫn được đọc và chuyển sang định dạng mới khi lưu; không tự duyệt hoặc chấm lại lịch sử cũ. Khi lưu thất bại, điểm cũ được giữ; nút **Thử lưu lại** dùng kết quả đã nhận, không gọi API lại. PDF, ảnh trang và API key không nằm trong bản lưu. Lịch sử giữ kết quả AI ban đầu dù giáo viên sửa điểm sau đó.

**Cập nhật danh sách lớp 3:** mỗi hồ sơ có phiên bản danh sách `2026-09-26-17`. Khi mở bản mới, điểm lớp 3 thuộc phiên bản cũ không ghi đè bảng 17 em. Dữ liệu trước cập nhật được sao lưu tại `van-khe-state-v2-backup-3A4-2026-09-26-17`; lịch sử chấm cũ hiển thị riêng, không tham gia chọn bài cao điểm hoặc tự lưu vào danh sách mới. Các chỉnh sửa thực hiện trên danh sách mới tiếp tục được lưu và khôi phục theo STT.

**Cập nhật danh sách lớp 4:** phiên bản `2026-09-27-22` áp dụng cùng cơ chế lưu theo STT. Điểm cũ không ghi đè bảng 22 em; lịch sử chấm cũ không tham gia chọn bài cao điểm cho danh sách mới. Bản sao lưu trước cập nhật nằm tại `van-khe-state-v2-backup-4-2026-09-27-22`.

**Cập nhật danh sách lớp 5:** phiên bản `2026-09-27-23` dùng cùng cơ chế lưu theo STT. Điểm cũ không ghi đè bảng 23 em; lịch sử chấm cũ không tham gia chọn bài cao điểm cho danh sách mới. Bản sao lưu trước cập nhật nằm tại `van-khe-state-v2-backup-5A3-2026-09-27-23`. Dữ liệu và các chỉnh sửa đã lưu của lớp 3, lớp 4 được giữ nguyên.

Mỗi tệp tối đa 25 MB, tổng PDF và tham chiếu tối đa 35 MB, tối đa 120 trang. PDF.js hiển thị ảnh nguyên trang (cạnh dài tối đa 2.400 px), không cắt riêng tên/câu. Mỗi trang gửi một yêu cầu chấm streaming, kể cả trang tên không khớp; không có yêu cầu chỉ mục nhận diện trước. Có thể phát sinh phí theo số trang và tài liệu. Kiểm tra kết nối gửi một yêu cầu nhỏ; demo không gọi API. Không tự gửi lặp yêu cầu lỗi/timeout (giới hạn 180 giây mỗi trang).

Nhận xét mới gồm **Nhận xét** (điểm làm tốt, hạn chế và dẫn chứng ở câu cụ thể) và **Đánh giá chung** (Hoàn thành tốt / Hoàn thành / Cần hỗ trợ), tổng tối đa **150 từ**. Nếu chưa đọc đủ bài, hiển thị “Chưa đủ căn cứ”. **Bài tập đề xuất** có đúng **Bài 1, Bài 2, Bài 3**, tổng tối đa **300 từ**; yêu cầu AI tự soạn theo kiến thức đang chấm, đúng lớp/môn, phù hợp bộ **Kết nối tri thức với cuộc sống**, không kèm lời giải dài. Đây là bài AI tự soạn, không phải nội dung sách đã được tra cứu hoặc trích nguyên văn.

Để giảm thời gian chờ, yêu cầu nhận xét khoảng 60–100 từ và mỗi bài tập khoảng 30–60 từ, dùng lại kết quả chấm trong **cùng một yêu cầu API mỗi trang**. Giao diện cập nhật luồng tối đa khoảng mỗi 80 ms để giảm việc vẽ lại. Không tự gọi thêm AI để viết lại nhận xét. Kết quả mới sai mẫu/quá giới hạn được báo lỗi, không tự lưu; lịch sử cũ vẫn đọc được. Giới hạn từ được kiểm tra theo khoảng trắng. Trần token toàn trang vẫn dành đủ chỗ cho phần chấm từng câu; tốc độ thực tế phụ thuộc model, ảnh và mạng.

Luồng chấm luôn tạo nhận xét và bài bổ sung. Bài chưa đọc đủ/thiếu đề không được biến thành điểm 0. Độ chính xác nhận diện chữ viết tay, vùng khoanh và barem tự đề xuất cần được đối chiếu trên tài liệu thực tế.

Thư viện PDF.js 6.3.289 (Apache-2.0) và tài nguyên hỗ trợ được phân phối trong `assets/vendor/`, gồm worker cho GitHub Pages và bản chạy trong trang khi mở `file://`. Không cần máy chủ ứng dụng hay bước build khi sử dụng. PDF-LIB vẫn được giữ để tương thích tài nguyên cũ. Không nhúng khóa chung vào GitHub; mỗi phiên người dùng nhập khóa của mình.

Tài liệu: [OpenAI streaming](https://developers.openai.com/api/docs/guides/streaming-responses), [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [PDF.js](https://mozilla.github.io/pdf.js/examples/).

## Phiếu bài tập và nhận xét ba lớp

Đã cập nhật từ `nhan_xet_3_lop_ca_nhan.md` và `bai_tap_ca_nhan_3_lop.md`: **62 học sinh, 124 nhận xét theo môn, 330 bài tập**. Lớp 3A4 có 17 em / 82 bài; lớp 4A6 có 22 em / 116 bài; lớp 5A3 có 23 em / 132 bài. Hai bản nguồn được giữ nguyên trong `assets/documents/`; `scripts/import-remedial.py` kiểm tra đủ STT và tên theo từng lớp trước khi tạo dữ liệu. Mã lớp 4A6 được cập nhật từ tài liệu mới, khóa lưu trữ lớp 4 và bảng điểm vẫn giữ nguyên.

- Chọn lớp → **Phiếu BT cá nhân hóa → Xem nhận xét & bài tập**. Hồ sơ trong **Kết quả AI & Chi tiết** cũng hiển thị đầy đủ nội dung mới, mức đánh giá chung và trọng tâm bồi dưỡng.
- Nội dung từ hai tệp được giữ nguyên, kể cả bài có hơn 3 câu và nhận xét dài hơn 150 từ. Các giới hạn tạo nhận xét bằng AI ở trên không áp dụng hồi tố cho tài liệu giáo viên cung cấp.
- Ghép bằng lớp + STT và kiểm tra họ tên; không ghép nhầm học sinh trùng tên khác lớp. Nhận xét dựa trên khảo sát lần 1, vẫn dùng để rèn luyện khi chọn đợt 2. Không thay điểm, lời phê đã chỉnh tay hoặc trạng thái duyệt.
- In một em hoặc cả lớp: **mỗi học sinh một trang A4 dọc**, lề 12 mm, chữ 11 pt, giữ đủ cả hai môn khi chọn “Tất cả”. Đã bỏ mục **Bài tập do giáo viên bổ sung**, khung trống, bảng điểm và phần thông tin lặp trên phiếu. In ở tỉ lệ 100%, tắt đầu/chân trang trình duyệt.
- Phiếu ưu tiên nhận xét/bài tập trong tài liệu mới, không nối thêm bài tập AI cũ của cùng môn. Lịch sử chấm AI vẫn xem lại được; khi không có tài liệu cho môn đã chọn mới dùng nội dung AI đã lưu.
- Chữ in đậm trong đề Tiếng Việt được giữ đúng vì là một phần yêu cầu bài tập. Phiếu kiểm tra sau 2 tuần lớp 5A3 từ tài liệu trước vẫn ở phần riêng.

Bộ kiểm thử chung: **138 kiểm tra đạt**. `tests/worksheets.cjs` xuất 3 bản PDF qua đúng luồng in của web; `tests/verify-worksheet-pdfs.py` xác nhận **17 / 22 / 23 trang**, đúng thứ tự học sinh và đủ từng nhận xét, trọng tâm, câu bài tập trên mỗi trang. Xem [báo cáo cập nhật phiếu](reports/worksheets-update.md).

Menu còn 8 tab. Đã xóa **Đề thi & Rubric KNTT**, **Thống kê & Phân tích**, **Test Panel AI Vision**, **Demo / Fallback** và các trang tương ứng. Đáp án/thang điểm thực tế vẫn ở phần Upload, nhật ký chấm chuyển vào Hàng đợi chấm, liên kết báo cáo ở Tổng quan mở trang Theo dõi tiến độ.
