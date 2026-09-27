/* Short, evidence-based feedback shared by grading, review and print views. */
'use strict';
window.GradingFeedback = (() => {
  const instructions = `Sau khi chấm xong, dùng ngay các tiêu chí đã chấm để viết nhận xét riêng cho học sinh, không phân tích lại toàn bài.
feedback gồm đúng hai dòng văn bản thuần:
Nhận xét: Em làm tốt ..., còn hạn chế ở ...; ở Câu ..., em ... nên cần ...
Đánh giá chung: Hoàn thành tốt / Hoàn thành / Cần hỗ trợ
Chỉ chọn MỘT mức đánh giá phù hợp với kiến thức thể hiện trong bài; đây là đánh giá bài làm này. Nếu chưa đủ căn cứ chấm, ghi Đánh giá chung: Chưa đủ căn cứ, không gán mức hoàn thành.
Toàn bộ feedback tối đa 150 từ (tính theo khoảng trắng, kể cả nhãn); ưu tiên 60–100 từ. Viết tự nhiên, gần gũi như giáo viên tiểu học, câu ngắn, dễ hiểu với học sinh và phụ huynh. Nêu điểm làm tốt, 1–2 hạn chế chính và biểu hiện cụ thể ở câu/ý đã chấm. Chỉ giải thích nguyên nhân có căn cứ từ bài làm, không suy đoán em lười, cẩu thả, mất tập trung hay năng lực chung. Không bịa lỗi hoặc số câu; nếu làm đúng hết, nói chưa thấy hạn chế trong bài và gợi ý củng cố. Ảnh mờ không được coi là lỗi kiến thức. Không lặp lại bảng chấm, không dùng thuật ngữ hàn lâm, không chia nhận xét theo môn, không thêm mục khác.
practice: nếu can_grade=true, trả đúng 3 chuỗi đề bài, theo thứ tự Bài 1, Bài 2, Bài 3; không viết lại số bài hay tiêu đề trong chuỗi vì giao diện tự đánh số. Tổng cả 3 đề tối đa 300 từ (tính theo khoảng trắng); ưu tiên mỗi đề 30–60 từ. Mỗi bài là một nhiệm vụ ngắn, đủ dữ kiện để học sinh làm ngay, không chỉ ghi tên dạng bài. Bài 1 củng cố kỹ năng còn hạn chế nổi bật; Bài 2 luyện kỹ năng đó ở tình huống khác; Bài 3 vận dụng vừa sức. Nếu làm đúng hết, cho bài củng cố và vận dụng trong cùng phạm vi lớp, không vượt chương trình.
Bài tập phải phù hợp chương trình tiểu học bộ Kết nối tri thức với cuộc sống, đúng grade và subject được cung cấp, bám dạng kiến thức và mức độ trong đề/đáp án tham chiếu. Tự soạn bài tương tự, không bịa số trang, tên bài học hoặc tuyên bố trích nguyên văn sách. Không dùng kiến thức lớp trên. Bài Tiếng Việt cần ngữ liệu thì kèm đoạn ngắn đủ dùng, không yêu cầu đọc văn bản không được cung cấp. Không kèm đáp án, lời giải, kế hoạch nhiều ngày hay giải thích dài về mục đích bài tập. Nếu không đọc đủ để xác định kỹ năng, chỉ cho bài ôn tập cơ bản theo phần đọc chắc chắn; nếu can_grade=false, practice=[] và feedback giải thích ngắn phần còn thiếu. Không khẳng định đã lưu sổ điểm.`;
  const wordCount = text => text.trim().split(/\s+/u).filter(Boolean).length;
  function validate(data) {
    if (wordCount(data.feedback) > 150 || wordCount(data.practice.join(' ')) > 300)
      throw new Error('Nhận xét vượt 150 từ hoặc bài tập vượt tổng 300 từ. Chưa lưu điểm; hệ thống không tự gọi AI lại.');
    if (data.can_grade && data.practice.length !== 3)
      throw new Error('Kết quả cần đúng 3 bài tập đề xuất. Chưa lưu điểm.');
    const plain = data.feedback.replace(/\*\*/g, '').trim();
    const complete = data.can_grade && data.readable && data.criteria.every(c => c.score !== null);
    const assessment = complete ? '(?:Hoàn thành tốt|Hoàn thành|Cần hỗ trợ)' : 'Chưa đủ căn cứ';
    if (!new RegExp('^Nhận xét: ?[^\\n]+\\r?\\nĐánh giá chung: ?' + assessment + '$', 'u').test(plain))
      throw new Error('Nhận xét chưa đúng mẫu hoặc mức đánh giá chưa phù hợp tình trạng đọc bài. Chưa lưu điểm.');
  }
  function html(text) {
    // Escape first; only these two fixed labels can become markup, including old saved comments.
    return escapeHTML(text || '').replace(/^(?:\*\*)?(Nhận xét:|Đánh giá chung:)(?:\*\*)?/gm, '<strong>$1</strong>').replace(/\r?\n/g, '<br>');
  }
  function practiceItemsHTML(items) {
    return items.map((text, i) => `<li><strong>Bài ${i + 1}:</strong> ${escapeHTML(text.replace(/^\s*(?:\*\*)?Bài\s+\d+\s*[:.]\s*(?:\*\*)?\s*/iu, ''))}</li>`).join('');
  }
  return {instructions, validate, html, practiceItemsHTML};
})();
