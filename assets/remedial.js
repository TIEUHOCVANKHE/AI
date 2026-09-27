/* Supplied survey notes and worksheets; independent of editable grades and AI history. */
'use strict';
function remedialRecord(student) {
  const record = REMEDIAL_DATA.classes[student.classId]?.students[student.stt];
  return record && record.name.normalize('NFC') === student.name.normalize('NFC') ? record : null;
}
function remedialEntries(student, subjects = chosenSubjects()) {
  const record = remedialRecord(student);
  return subjects.filter(sub => student.subjects[sub] && record?.subjects[sub]).map(sub => ({subject: sub, ...record.subjects[sub]}));
}
function remedialTextHTML(text) {
  // Preserve the source's bold spans: these mark words students must ask about.
  return escapeHTML(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
function importedRemedialHTML(student, subjects = chosenSubjects()) {
  const record = remedialRecord(student), entries = remedialEntries(student, subjects);
  if (!entries.length) return '';
  return `<div class="remedial-material"><p class="remedial-origin">Nhận xét và bài tập cá nhân từ khảo sát lần 1.</p><section class="remedial-notes"><h4>Nhận xét</h4>${entries.map(entry => `<p class="remedial-comment"><strong>${SUBJECTS[entry.subject]}:</strong> ${remedialTextHTML(entry.comment)}</p>`).join('')}<p><strong>Đánh giá chung:</strong> ${escapeHTML(record.assessment)}</p><p><strong>Trọng tâm cần bồi dưỡng:</strong> ${remedialTextHTML(record.focus)}</p></section><h4 class="remedial-exercises-heading">Bài tập cá nhân</h4>${entries.map(entry => `<section class="remedial-subject" data-remedial-subject="${entry.subject}"><h5>${SUBJECTS[entry.subject]}</h5><ol class="remedial-exercises">${entry.exercises.map(item => `<li><strong>${escapeHTML(item.label)}:</strong> ${remedialTextHTML(item.text)}</li>`).join('')}</ol></section>`).join('')}</div>`;
}
function followupHTML() {
  return chosenSubjects().map(sub => `<section class="remedial-subject"><h4>${SUBJECTS[sub]}</h4><ol>${REMEDIAL_DATA.followup[sub].map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ol></section>`).join('');
}
function renderRemedialLibrary() {
  const el = $('remedial-source-info');
  el.hidden = !REMEDIAL_DATA.classes[currentClass];
  if (el.hidden) { el.innerHTML = ''; return; }
  const entries = visibleStudents().flatMap(student => remedialEntries(student));
  el.innerHTML = `<p><strong>Đã có ${entries.length} nhận xét môn học và ${entries.reduce((n,entry) => n + entry.exercises.length,0)} bài tập theo bộ lọc.</strong> Nội dung khảo sát lần 1 từ hai tài liệu mới, dùng để rèn luyện ở cả hai đợt. Mỗi học sinh in trên một trang A4.</p><details><summary>Tài liệu gốc &amp; hướng dẫn in</summary><p>${escapeHTML(REMEDIAL_DATA.notice)}</p><p>Chọn học sinh hoặc in cả lớp. Dùng giấy A4, chiều dọc, tỉ lệ 100% và tắt đầu/chân trang của trình duyệt. Phiếu dùng nhận xét và bài tập trong hai tệp đã cung cấp; không in kèm bài tập AI cũ của cùng môn.</p><p><a href="assets/documents/bai_tap_ca_nhan_3_lop.md" download>Tải tài liệu bài tập gốc</a> · <a href="assets/documents/nhan_xet_3_lop_ca_nhan.md" download>Tải tài liệu nhận xét gốc</a></p></details>${currentClass === REMEDIAL_DATA.followupClassId ? `<details><summary>Phiếu kiểm tra lại sau 2 tuần (tài liệu trước)</summary>${followupHTML()}<button class="action-button" onclick="printFollowupSheet()">In phiếu kiểm tra lại</button></details>` : ''}`;
}
function printFollowupSheet() {
  if (currentClass !== REMEDIAL_DATA.followupClassId) return;
  $('print-area').innerHTML = `<article class="print-sheet"><h2>${SCHOOL}</h2><h3>PHIẾU KIỂM TRA LẠI SAU 2 TUẦN — LỚP 5A3</h3><p>STT: ............ (theo danh sách lớp 5A3)</p><p>Họ và tên: ..........................................................................</p><div class="remedial-material">${followupHTML()}</div><h4>Bài làm</h4><div class="writing-space"></div></article>`;
  $('print-area').classList.remove('hidden'); window.print(); $('print-area').classList.add('hidden');
}
