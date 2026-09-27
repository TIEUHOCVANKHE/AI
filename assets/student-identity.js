/* Match within the selected class and subject, never by PDF page order. */
'use strict';
window.StudentIdentity = (() => {
  const normalizeName = name => String(name || '').normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('vi');
  function match(result, job) {
    const roster = subjectStudents(job.subject, job.classId);
    const byName = roster.filter(s => normalizeName(s.name) === normalizeName(result.student_name));
    const sttEnabled = SOURCE_DATA[job.classId].identityKey === 'stt';
    const supplied = result.student_stt !== undefined && result.student_stt !== null && result.student_stt !== '';
    if (sttEnabled && supplied) {
      const raw = String(result.student_stt).trim();
      if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) < 1)
        return {id:'', reason:'STT không hợp lệ; cần đối chiếu bài gốc.'};
      const matches = roster.filter(s => s.stt === Number(raw));
      if (matches.length !== 1) return {id:'', reason:'STT không có hoặc bị trùng trong lớp và môn đã chọn; không ghi sổ.'};
      if (byName.some(s => s.id !== matches[0].id))
        return {id:'', reason:'STT và họ tên khớp hai học sinh khác nhau; cần đối chiếu bài gốc.'};
      return {id:matches[0].id, method:'stt', reason:`Đã khớp STT ${matches[0].stt}`};
    }
    if (normalizeName(result.student_name) && byName.length === 1)
      return {id:byName[0].id, method:'name', reason:'Đã khớp họ tên chính xác'};
    return {id:'', reason:sttEnabled ? 'Không đọc được STT và họ tên không khớp duy nhất; không ghi sổ.' : 'Họ tên không khớp duy nhất trong lớp và môn đã chọn; không ghi sổ.'};
  }
  return {match};
})();
