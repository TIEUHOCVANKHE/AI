/* Supplied survey notes and worksheets. Kept separate from editable grades and AI reports. */
'use strict';
function remedialEntries(student, subjects = chosenSubjects()) {
  if (student.classId !== REMEDIAL_DATA.classId) return [];
  const record = REMEDIAL_DATA.students[student.name];
  return subjects.filter(sub => student.subjects[sub] && record?.[sub]).map(sub => ({subject: sub, ...record[sub]}));
}
function importedRemedialHTML(student, subjects = chosenSubjects()) {
  const entries = remedialEntries(student, subjects);
  if (!entries.length) return '';
  return `<div class="remedial-material"><p class="remedial-origin">Nhận xét & bài tập từ tài liệu khảo sát đợt 1 do giáo viên cung cấp.</p>${entries.map(entry => `<section class="remedial-subject" data-remedial-subject="${entry.subject}"><h4>${SUBJECTS[entry.subject]} · Điểm khảo sát: ${fmt(entry.score)}/10</h4>${entry.nameNote ? `<p class="source-notice">${escapeHTML(entry.nameNote)} Tên trong tài liệu: ${escapeHTML(entry.sourceName)}.</p>` : ''}<h5>Nhận xét & hướng khắc phục</h5><p class="remedial-comment">${escapeHTML(entry.comment)}</p><h5>Bài tập cá nhân</h5><ol class="remedial-exercises">${entry.exercises.map(item => `<li><strong>${escapeHTML(item.label)}:</strong> ${escapeHTML(item.text)}</li>`).join('')}</ol></section>`).join('')}</div>`;
}
function followupHTML() {
  return chosenSubjects().map(sub => `<section class="remedial-subject"><h4>${SUBJECTS[sub]}</h4><ol>${REMEDIAL_DATA.followup[sub].map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ol></section>`).join('');
}
function renderRemedialLibrary() {
  const el = $('remedial-source-info');
  el.hidden = currentClass !== REMEDIAL_DATA.classId;
  if (el.hidden) { el.innerHTML = ''; return; }
  const entries = visibleStudents().flatMap(student => remedialEntries(student));
  el.innerHTML = `<p><strong>Đã có ${entries.length} nhận xét môn học và ${entries.reduce((n,entry) => n + entry.exercises.length,0)} bài tập theo bộ lọc.</strong> Nội dung dựa trên khảo sát đợt 1, dùng để rèn luyện ở cả hai đợt. Mở từng phiếu để xem hoặc in.</p><details><summary>Hướng dẫn sử dụng & tài liệu gốc</summary><p>${escapeHTML(REMEDIAL_DATA.usage)}</p><p class="remedial-context">${escapeHTML(REMEDIAL_DATA.context)}</p><p>${escapeHTML(REMEDIAL_DATA.notice)}</p><h4>Gợi ý tổ chức phụ đạo theo nhóm</h4><ul>${REMEDIAL_DATA.guidance.map(text => `<li>${escapeHTML(text)}</li>`).join('')}</ul><p><a href="assets/documents/Bai_tap_bu_lo_hong_kien_thuc_Lop_5A3.md" download>Tải tài liệu bài tập gốc</a> · <a href="assets/documents/Nhan_xet_lo_hong_kien_thuc_Lop_5A3.md" download>Tải tài liệu nhận xét gốc</a></p></details><details><summary>Phiếu kiểm tra lại sau 2 tuần</summary>${followupHTML()}<button class="action-button" onclick="printFollowupSheet()">In phiếu kiểm tra lại</button></details>`;
}
function printFollowupSheet() {
  if (currentClass !== REMEDIAL_DATA.classId) return;
  $('print-area').innerHTML = `<article class="print-sheet"><h2>${SCHOOL}</h2><h3>PHIẾU KIỂM TRA LẠI SAU 2 TUẦN — LỚP 5A3</h3><p>Họ và tên: ..........................................................................</p><div class="remedial-material">${followupHTML()}</div><h4>Bài làm</h4><div class="writing-space"></div></article>`;
  $('print-area').classList.remove('hidden'); window.print(); $('print-area').classList.add('hidden');
}
