'use strict';
const SCHOOL = 'TRƯỜNG TIỂU HỌC VĂN KHÊ';
const SUBJECTS = { TOAN: 'Toán', TIENG_VIET: 'Tiếng Việt' };
const STORAGE_KEY = 'van-khe-grades-v1';
const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = n => Number.isFinite(n) ? n.toLocaleString('vi-VN', {maximumFractionDigits: 2}) : '—';
const mean = values => values.length ? values.reduce((a,b) => a+b,0)/values.length : null;
const delta = scores => scores.every(Number.isFinite) ? scores[1]-scores[0] : null;
const signed = n => Number.isFinite(n) ? (n>0?'+':'')+fmt(n) : '—';
let currentClass = '3A4', currentFilterSubject = 'ALL', currentRound = 1, currentSelectedStudentId;
let chartStudentId, toastTimer, uploadedFiles = [], demoFiles = [], lastFocus;
const studentsDatabase = [];
for (const [classId, data] of Object.entries(SOURCE_DATA)) {
  const byName = new Map();
  for (const [subject, rows] of Object.entries(data.subjects)) {
    rows.forEach(row => {
      let student = byName.get(row.name);
      if (!student) {
        student = {id: `${classId}-${String(byName.size+1).padStart(3,'0')}`, classId, name: row.name, subjects: {}, comments: {}, approved: {}};
        byName.set(row.name, student);
      }
      student.subjects[subject] = [...row.scores];
    });
  }
  studentsDatabase.push(...byName.values());
}
// Only exact names within one class share a profile. Blank scores stay null.
function classStudents(classId = currentClass) { return studentsDatabase.filter(s => s.classId === classId); }
function subjectStudents(subject, classId = currentClass) { return SOURCE_DATA[classId].subjects[subject].map(row => classStudents(classId).find(s => s.name === row.name)); }
function visibleStudents() { return currentFilterSubject === 'ALL' ? classStudents() : subjectStudents(currentFilterSubject); }
function chosenSubjects() { return currentFilterSubject === 'ALL' ? Object.keys(SUBJECTS) : [currentFilterSubject]; }
function classLabel(classId = currentClass) { return classId === '4' ? 'Lớp 4' : `Lớp ${SOURCE_DATA[classId].grade} · ${classId}`; }
function scoreValues(subject, round, classId = currentClass) { return subjectStudents(subject, classId).map(s => s.subjects[subject][round]).filter(Number.isFinite); }
function selectedValues(round = currentRound) { return chosenSubjects().flatMap(subject => scoreValues(subject,round)); }
function originalScores(student, subject) { return SOURCE_DATA[student.classId].subjects[subject].find(s => s.name === student.name)?.scores ?? [null,null]; }
function note(student) { return Object.keys(student.subjects).length === 1 ? 'Tên chưa khớp giữa hai môn — cần đối chiếu' : Object.values(student.subjects).some(scores => scores.includes(null)) ? 'Có ô điểm trống trong nguồn' : 'Khớp tên giữa hai môn'; }
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(studentsDatabase)); return true; }
  catch { showToast('Không lưu được vào trình duyệt. Hãy xuất Excel để giữ các chỉnh sửa.'); return false; }
}
function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return;
    for (const student of studentsDatabase) {
      const row = saved.find(r => r.id === student.id && r.name === student.name);
      if (!row) continue;
      for (const subject of Object.keys(student.subjects)) {
        const scores = row.subjects?.[subject];
        if (Array.isArray(scores) && scores.length === 2 && scores.every(n => n === null || (Number.isFinite(n) && n >= 0 && n <= 10))) student.subjects[subject] = scores;
      }
      for (const subject of Object.keys(student.subjects)) for (const round of [0,1]) {
        const key = `${subject}-${round}`;
        if (typeof row.comments?.[key] === 'string') student.comments[key] = row.comments[key];
        if (row.approved?.[key] === true) student.approved[key] = true;
      }
    }
  } catch { showToast('Không đọc được bản lưu cục bộ; đang dùng bảng điểm nguồn.'); }
}
function switchTab(tabId) {
  if (!$(`tab-${tabId}`)) return;
  document.querySelectorAll('.tab-content').forEach(el => el.classList.toggle('hidden', el.id !== `tab-${tabId}`));
  document.querySelectorAll('.nav-btn').forEach(el => {
    const active = el.id === `nav-${tabId}`;
    el.classList.toggle('bg-rose-50', active); el.classList.toggle('text-brand-red', active);
    el.classList.toggle('font-bold', active); el.setAttribute('aria-current', active ? 'page' : 'false');
  });
  if (tabId === 'results') navigateStudentDetail(0);
  if(window.AI) { AI.renderPending(); AI.renderStudentReports(); }
}
function toggleOverviewClassTab(tab) {
  $('overview-classes-view').classList.toggle('hidden', tab !== 'class');
  $('overview-students-view').classList.toggle('hidden', tab !== 'student');
  for (const type of ['class','student']) $(`btn-tab-${type}`).classList.toggle('bg-rose-100', tab === type);
}
function changeActiveGlobalClass(value) {
  if (!SOURCE_DATA[value]) return;
  currentClass = value; currentSelectedStudentId = classStudents()[0].id; chartStudentId = currentSelectedStudentId;
  refreshAll();
}
function selectClassForOverview(value) { changeActiveGlobalClass(value); toggleOverviewClassTab('student'); }
function setFilterSubject(value) {
  if (value !== 'ALL' && !SUBJECTS[value]) return;
  currentFilterSubject = value; if(value !== 'ALL') $('upload-subject-select').value=value; refreshAll();
}
function filterGradebookTable(value) { setFilterSubject(value); }
function setRound(value) { if (value === '0' || value === '1') {currentRound = Number(value); refreshAll();} }
function rowCells(student) {
  return ['TOAN','TIENG_VIET'].map(subject => {
    const scores = student.subjects[subject] || [null,null];
    return [fmt(scores[0]),fmt(scores[1]),signed(delta(scores))].map(value => `<td data-subject="${subject}">${value}</td>`).join('');
  }).join('');
}
function renderGradebookTable() {
  $('student-count-badge').textContent = visibleStudents().length;
  $('student-table-body').innerHTML = visibleStudents().map((student,i) => `<tr><td>${i+1}</td><td>${student.id}</td><td><button class="student-link" onclick="openStudentModal('${student.id}')">${escapeHTML(student.name)}</button></td>${rowCells(student)}<td>${note(student)}</td><td><div class="row-actions"><button title="Sửa & Duyệt điểm" aria-label="Sửa điểm ${escapeHTML(student.name)}" onclick="openApprovalModal('${student.id}')">✎</button><button title="In phiếu bài tập" aria-label="In phiếu ${escapeHTML(student.name)}" onclick="printSingleRemedialSheet('${student.id}')">In</button></div></td></tr>`).join('');
  const headers = $('student-table-body').closest('table').querySelectorAll('thead th');
  ['TOAN','TIENG_VIET'].forEach((subject,i) => {
    const hidden = currentFilterSubject !== 'ALL' && currentFilterSubject !== subject;
    [3,4,5].forEach(offset => headers[offset+i*3].hidden = hidden);
    document.querySelectorAll(`#student-table-body [data-subject="${subject}"]`).forEach(el => el.hidden = hidden);
  });
}
function bar(label, value, max = 10, color = 'red', suffix = '', extra = '') {
  return `<div class="bar-row"><span>${escapeHTML(label)}</span><meter class="${color}" min="0" max="${max || 1}" value="${value ?? 0}" aria-label="${escapeHTML(label)}: ${fmt(value)}${suffix}"></meter><strong>${fmt(value)}${suffix}</strong>${extra ? `<small>${escapeHTML(extra)}</small>` : ''}</div>`;
}
function averageBars() {
  return chosenSubjects().map(subject => `<div class="chart-group"><h4>${SUBJECTS[subject]}</h4>${[0,1].map(round => {const values = scoreValues(subject,round);return bar(`Đợt ${round+1}`,mean(values),10,round?'blue':'red','',`n = ${values.length} điểm`);}).join('')}</div>`).join('');
}
function bins(values) {return [values.filter(n=>n>=9).length,values.filter(n=>n>=7&&n<9).length,values.filter(n=>n>=5&&n<7).length,values.filter(n=>n<5).length];}
const BIN_LABELS = ['9–10 điểm','7 đến dưới 9','5 đến dưới 7','Dưới 5'];
function initAllCharts() {
  $('chart-class-avg').innerHTML = averageBars();
  const values = selectedValues(), counts = bins(values);
  $('chart-distribution').innerHTML = counts.map((count,i) => bar(BIN_LABELS[i],count,values.length,'red',' lượt')).join('');
  $('chart-trends').innerHTML = [0,1].map(round => {const a=selectedValues(round), pass=a.filter(n=>n>=5).length; return bar(`Đợt ${round+1}`, a.length ? pass/a.length*100:null,100,round?'blue':'red','%',`${pass}/${a.length} lượt điểm`);}).join('');
  const all = [...selectedValues(0),...selectedValues(1)];
  const expected = chosenSubjects().reduce((sum,subject)=>sum+SOURCE_DATA[currentClass].subjects[subject].length*2,0);
  $('chart-gauge').innerHTML = `<p><strong>${all.length}/${expected}</strong> ô có điểm</p><progress max="${expected}" value="${all.length}"></progress><p>${expected-all.length} ô trống · Cả hai đợt</p>`;
  $('metric-classes').textContent = '3';
  $('metric-students').textContent = chosenSubjects().map(sub=>`${SUBJECTS[sub]}: ${SOURCE_DATA[currentClass].subjects[sub].length}`).join(' · ');
  $('metric-scores').textContent = all.length;
  $('metric-pass').textContent = values.length ? fmt(values.filter(n=>n>=5).length/values.length*100)+'%' : '—';
}
function initSubjectProgressChart() {
  $('chart-subject-comparison').innerHTML = averageBars();
  let pairedTotal=0, improvedTotal=0;
  $('paired-summary').innerHTML = chosenSubjects().map(subject => {
    const changes = classStudents().filter(s=>s.subjects[subject]).map(s=>delta(s.subjects[subject])).filter(Number.isFinite);
    const improved = changes.filter(n=>n>0).length;
    pairedTotal += changes.length; improvedTotal += improved;
    return `<p><strong>${SUBJECTS[subject]}</strong>: ${improved} tăng · ${changes.filter(n=>n===0).length} giữ nguyên · ${changes.filter(n=>n<0).length} giảm.</p><p>${changes.length} cặp đủ điểm · Thay đổi TB: ${signed(mean(changes))} điểm.</p>`;
  }).join('');
  $('progress-summary').textContent = `${improvedTotal}/${pairedTotal} cặp điểm tăng (${pairedTotal?fmt(improvedTotal/pairedTotal*100):'—'}%)`;
  $('progress-data-table').innerHTML = `<table class="data-table"><caption>${classLabel()} — Trung bình và số điểm hợp lệ</caption><thead><tr><th>Môn</th><th>Đợt 1</th><th>Số điểm Đ1</th><th>Đợt 2</th><th>Số điểm Đ2</th></tr></thead><tbody>${chosenSubjects().map(sub=>`<tr><td>${SUBJECTS[sub]}</td><td>${fmt(mean(scoreValues(sub,0)))}</td><td>${scoreValues(sub,0).length}</td><td>${fmt(mean(scoreValues(sub,1)))}</td><td>${scoreValues(sub,1).length}</td></tr>`).join('')}</tbody></table>`;
  const students = visibleStudents();
  if (!students.some(s=>s.id===chartStudentId)) chartStudentId=students[0]?.id;
  $('student-chart-select').innerHTML = students.map(s=>`<option value="${s.id}">${escapeHTML(s.name)}</option>`).join('');
  $('student-chart-select').value=chartStudentId;
  selectChartStudent(chartStudentId);
}
function studentBars(student) {
  return chosenSubjects().map(subject => `<div class="chart-group"><h4>${SUBJECTS[subject]}</h4>${[0,1].map(round=>bar(`Đợt ${round+1}`, student.subjects[subject]?.[round],10,round?'blue':'red')).join('')}<p>Thay đổi: ${signed(delta(student.subjects[subject] || [null,null]))} điểm</p></div>`).join('');
}
function selectChartStudent(id) {
  const student=visibleStudents().find(s=>s.id===id); if(!student) return;
  chartStudentId=id; $('chart-student').innerHTML = `<p><strong>${escapeHTML(student.name)}</strong> · ${note(student)}</p>${studentBars(student)}`;
}
function refreshAll() {
  $('global-class-select').value=currentClass; $('upload-class-select').value=currentClass; $('round-select').value=currentRound;
  document.querySelectorAll('[data-class]').forEach(button=>button.setAttribute('aria-pressed', String(button.dataset.class===currentClass)));
  document.querySelectorAll('.active-class-label').forEach(el=>el.textContent=classLabel());
  $('data-scope').textContent=`${classLabel()} • ${currentFilterSubject==='ALL'?'Cả hai môn':SUBJECTS[currentFilterSubject]} • Phổ điểm đợt ${currentRound+1} • Đơn vị: lượt điểm. Biểu đồ tiến bộ luôn so sánh 2 đợt.`;
  for (const [type,id] of Object.entries({ALL:'all',TOAN:'math',TIENG_VIET:'viet'})) {
    $(`btn-subject-${id}`).classList.toggle('bg-brand-red',type===currentFilterSubject);
    $(`btn-subject-${id}`).classList.toggle('text-white',type===currentFilterSubject);
    $(`btn-subject-${id}`).setAttribute('aria-pressed',type===currentFilterSubject);
  }
  document.querySelectorAll('[onclick^="filterGradebookTable"]').forEach(b=>{
    const active=b.getAttribute('onclick').includes(`'${currentFilterSubject}'`);
    b.classList.toggle('bg-brand-red',active); b.classList.toggle('text-white',active); b.classList.toggle('bg-white',!active); b.setAttribute('aria-pressed',active);
  });
  $('overview-students-view').innerHTML=visibleStudents().map(s=>`<div class="student-summary"><span>${escapeHTML(s.name)}</span><button onclick="openStudentModal('${s.id}')">Hồ sơ</button></div>`).join('');
  $('overview-score-body').innerHTML=visibleStudents().slice(0,5).map(s=>`<tr><td><button class="student-link" onclick="openApprovalModal('${s.id}')">${escapeHTML(s.name)}</button></td>${['TOAN','TIENG_VIET'].flatMap(sub=>[0,1].map(r=>`<td>${fmt(s.subjects[sub]?.[r])}</td>`)).join('')}</tr>`).join('');
  renderGradebookTable(); initAllCharts(); initSubjectProgressChart();
  renderApprovalCards(); renderRemedialCards(); renderUploads(); navigateStudentDetail(0);
  if(window.AI) AI.scopeChanged();
}
function exportGradebookExcel(classId, subject) {
  if(!SOURCE_DATA[classId] || (subject!=='ALL'&&!SUBJECTS[subject])) return;
  if(typeof XLSX==='undefined') {showToast('Không tải được thư viện Excel cục bộ. Kiểm tra thư mục assets/vendor.'); return;}
  const workbook=XLSX.utils.book_new();
  (subject==='ALL'?Object.keys(SUBJECTS):[subject]).forEach(sub=>{
    const students=subjectStudents(sub,classId);
    const rows=[[SCHOOL],[classLabel(classId), SUBJECTS[sub], 'admin'],['Điểm trống được giữ trống; Δ = Đợt 2 − Đợt 1'],['STT','Mã HS','Họ và tên','Đợt 1','Đợt 2','Thay đổi','Đối chiếu','Lời phê Đ1','Lời phê Đ2']];
    students.forEach((s,i)=>rows.push([i+1,s.id,s.name,...s.subjects[sub],delta(s.subjects[sub]),note(s),s.comments[`${sub}-0`]||'',s.comments[`${sub}-1`]||'']));
    const sheet=XLSX.utils.aoa_to_sheet(rows); sheet['!cols']=[{wch:6},{wch:12},{wch:28},{wch:10},{wch:10},{wch:12},{wch:50},{wch:35},{wch:35}];
    XLSX.utils.book_append_sheet(workbook,sheet,sub==='TOAN'?'Toan':'Tieng_Viet');
  });
  XLSX.writeFile(workbook,`Bang_Diem_${classId}_${subject}_2_dot.xlsx`);
  showToast(`Đã xuất ${classLabel(classId)} — hai đợt chấm.`);
}
function openStudentModal(id) {const student=studentsDatabase.find(s=>s.id===id); if(!student)return;currentSelectedStudentId=id; switchTab('results');}
function navigateStudentDetail(direction) {
  const students=visibleStudents(); if(!students.length)return;
  let index=students.findIndex(s=>s.id===currentSelectedStudentId); if(index<0)index=0;
  index=(index+direction+students.length)%students.length;
  const student=students[index]; currentSelectedStudentId=student.id;
  $('detail-student-name').textContent=`${student.name} — ${classLabel()}`;
  $('detail-counter').textContent=`${index+1} / ${students.length}`;
  $('detail-badge-score').textContent=`Đợt ${currentRound+1} · ${chosenSubjects().map(sub=>`${SUBJECTS[sub]}: ${fmt(student.subjects[sub]?.[currentRound])}`).join(' · ')}`;
  $('student-detail-data').innerHTML=studentBars(student)+`<p>${note(student)}</p>`;
  $('detail-ai-comment').textContent=chosenSubjects().map(sub=>`${SUBJECTS[sub]}: ${student.comments[`${sub}-${currentRound}`] || 'Chưa có lời phê.'}`).join(' ');
  const imported=importedRemedialHTML(student);
  $('detail-remedial-material').hidden=!imported;$('detail-remedial-material').innerHTML=imported;
  if(window.AI) AI.renderStudentReports();
}
function openApprovalModal(id) {
  const student=studentsDatabase.find(s=>s.id===id); if(!student)return;
  currentSelectedStudentId=id; lastFocus=document.activeElement;
  $('modal-student-name').textContent=`Duyệt điểm: ${student.name}`;
  $('modal-student-id').textContent=`${classLabel(student.classId)} • ${student.id} • admin`;
  $('approval-subject').innerHTML=Object.keys(student.subjects).map(sub=>`<option value="${sub}">${SUBJECTS[sub]}</option>`).join('');
  $('approval-subject').value=student.subjects[currentFilterSubject]?currentFilterSubject:Object.keys(student.subjects)[0];
  $('approval-round').value=currentRound; refreshApprovalScore();
  $('modal-approval').classList.remove('hidden'); $('modal-teacher-score-input').focus();
}
function refreshApprovalScore() {
  const student=studentsDatabase.find(s=>s.id===currentSelectedStudentId), subject=$('approval-subject').value, round=Number($('approval-round').value);
  $('modal-ai-score').textContent=fmt(originalScores(student,subject)[round]);
  $('modal-teacher-score-input').value=student.subjects[subject][round]??'';
  $('modal-final-score').textContent=fmt(student.subjects[subject][round]);
  $('modal-comment-input').value=student.comments[`${subject}-${round}`]||'';
}
function closeApprovalModal() {$('modal-approval').classList.add('hidden'); lastFocus?.focus();}
function saveStudentApproval(isApproved) {
  const input=$('modal-teacher-score-input'), raw=input.value.trim();
  const score=raw===''?null:Number(raw);
  if(raw!==''&&(!Number.isFinite(score)||score<0||score>10)) {showToast('Điểm phải nằm trong khoảng 0–10; để trống nếu chưa có điểm.');input.focus();return;}
  const student=studentsDatabase.find(s=>s.id===currentSelectedStudentId), subject=$('approval-subject').value, round=Number($('approval-round').value), key=`${subject}-${round}`;
  student.subjects[subject][round]=score; student.comments[key]=$('modal-comment-input').value; student.approved[key]=Boolean(isApproved && score!==null);
  const saved=persist(); closeApprovalModal(); refreshAll(); if(saved)showToast(`Đã lưu ${SUBJECTS[subject]} đợt ${round+1} cho ${student.name}.`);
}
function renderApprovalCards() {
  $('nav-approval-count').textContent = visibleStudents().reduce((n,s) => n+chosenSubjects().filter(sub=>Number.isFinite(s.subjects[sub]?.[currentRound])&&!s.approved[`${sub}-${currentRound}`]).length,0);
  $('approval-cards-container').innerHTML=visibleStudents().map(s=>`<article class="approval-card"><div><strong>${escapeHTML(s.name)}</strong><p>${chosenSubjects().map(sub=>`${SUBJECTS[sub]}: ${fmt(s.subjects[sub]?.[currentRound])}${s.approved[`${sub}-${currentRound}`]?' · Đã duyệt':''}`).join(' | ')}</p><small>Đợt ${currentRound+1} · ${note(s)}</small></div><button class="action-button" onclick="openApprovalModal('${s.id}')">Chỉnh sửa điểm & Lời phê</button></article>`).join('');
}
function batchApproveAll() {
  visibleStudents().forEach(s=>chosenSubjects().forEach(sub=>{if(Number.isFinite(s.subjects[sub]?.[currentRound]))s.approved[`${sub}-${currentRound}`]=true;}));
  const saved=persist(); renderApprovalCards(); if(saved)showToast(`Đã duyệt các điểm có dữ liệu của ${classLabel()} · Đợt ${currentRound+1}.`);
}
function renderRemedialCards() {
  renderRemedialLibrary();
  $('remedial-cards-container').innerHTML=visibleStudents().map(s=>{
    const entries=remedialEntries(s), content=importedRemedialHTML(s);
    const aiPractice=window.AI && AI.practiceHTML(s,chosenSubjects(),currentRound);
    return `<article class="approval-card remedial-card" data-student-id="${s.id}"><div><strong>${escapeHTML(s.name)}</strong><p>${classLabel()} · ${entries.length ? entries.map(entry=>`${SUBJECTS[entry.subject]}: ${entry.exercises.length} bài`).join(' · ') : 'Phiếu để admin bổ sung bài tập.'}</p><small>${entries.length ? 'Đã có nhận xét và bài tập từ khảo sát đợt 1.' : aiPractice ? 'Phiếu in có bài tập từ bài OpenAI đã duyệt.' : 'Chưa có bài tập được cung cấp cho môn đang chọn.'}</small></div>${content ? `<details class="remedial-preview"><summary>Xem nhận xét & bài tập</summary>${content}</details>` : ''}<button class="action-button" onclick="printSingleRemedialSheet('${s.id}')">In phiếu bài tập</button></article>`;
  }).join('');
}
function printSheets(students) {
  $('print-area').innerHTML=students.map(s=>`<article class="print-sheet"><h2>${SCHOOL}</h2><h3>PHIẾU THEO DÕI & RÈN LUYỆN CÁ NHÂN</h3><p>Học sinh: ${escapeHTML(s.name)} · ${classLabel(s.classId)} · ${s.id}</p><table class="data-table"><tr><th>Môn</th><th>Đợt 1</th><th>Đợt 2</th><th>Thay đổi</th></tr>${chosenSubjects().map(sub=>`<tr><td>${SUBJECTS[sub]}</td><td>${fmt(s.subjects[sub]?.[0])}</td><td>${fmt(s.subjects[sub]?.[1])}</td><td>${signed(delta(s.subjects[sub]||[null,null]))}</td></tr>`).join('')}</table><p>${note(s)}</p><p>Lời phê: ${chosenSubjects().map(sub=>escapeHTML(s.comments[`${sub}-${currentRound}`]||'')).filter(Boolean).join('; ')||'...................................................'}</p>${importedRemedialHTML(s)}${window.AI ? AI.practiceHTML(s,chosenSubjects(),currentRound) : ''}<h4>Bài tập do giáo viên bổ sung</h4><div class="writing-space"></div><p>Ngày in: ${new Date().toLocaleDateString('vi-VN')} · Giáo viên: admin</p></article>`).join('');
  $('print-area').classList.remove('hidden'); window.print(); $('print-area').classList.add('hidden');
}
function printSingleRemedialSheet(id) {const student=studentsDatabase.find(s=>s.id===id);if(student)printSheets([student]);}
function printAllRemedialSheets() {printSheets(visibleStudents());}
function renderQueueTable() { if (window.AI) { return AI.renderQueue(); }
  const files=[...uploadedFiles,...demoFiles].filter(f=>f.classId===currentClass);
  $('queue-table-body').innerHTML=files.length?files.map((f,i)=>`<tr><td>${i+1}</td><td>${escapeHTML(f.name)}</td><td>${SUBJECTS[f.subject]}</td><td colspan="3">${f.demo?'Bài mẫu mô phỏng':'Tệp đã chọn cục bộ'} · Chưa chấm AI</td></tr>`).join(''):'<tr><td colspan="6">Chưa có bài làm mới trong hàng đợi của lớp đang chọn.</td></tr>';
  const badge=$('nav-queue-count');if(badge)badge.textContent=files.length;
}
function renderUploads() { if (window.AI) { return AI.renderUploads(); }
  const files=[...uploadedFiles,...demoFiles].filter(f=>f.classId===currentClass);
  $('upload-count-badge').textContent=files.length;
  if($('overview-upload-count')) $('overview-upload-count').textContent = `${files.length} tệp đã chọn`;
  document.querySelectorAll('[data-queue-stat]').forEach((el,i)=>el.textContent=i===0?files.length:0);
  $('upload-thumbnails-grid').innerHTML=files.map(f=>`<div class="upload-file"><strong>${escapeHTML(f.name)}</strong><p>${f.demo?'Mẫu mô phỏng':'Tệp cục bộ'} · ${classLabel(f.classId)}</p></div>`).join('')||'<p>Chưa có tệp nào được chọn.</p>';
  renderQueueTable();
}
function handleFileSelection(event) { if (window.AI) { return AI.addFiles(event); }
  const accepted=Array.from(event.target.files||[]).filter(f=>/\.(pdf|png|jpe?g)$/i.test(f.name));
  uploadedFiles.push(...accepted.map(f=>({name:f.name,file:f,classId:currentClass,subject:$('upload-subject-select').value,demo:false})));
  renderUploads(); showToast(`Đã nhận ${accepted.length} tệp cục bộ; chưa chấm AI.`); event.target.value='';
}
function loadSamplePapersBatch() {
  demoFiles=demoFiles.filter(f=>f.classId!==currentClass);
  demoFiles.push(...Array.from({length:8},(_,i)=>({name:`Bai_mau_${currentClass}_${i+1}.jpg`,classId:currentClass,subject:$('upload-subject-select').value,demo:true})));
  renderUploads();showToast('Đã nạp 8 mục mô phỏng; điểm nguồn không thay đổi.');
}
function clearUploadQueue() { if (window.AI) { return AI.clearQueue(); }uploadedFiles=uploadedFiles.filter(f=>f.classId!==currentClass);demoFiles=demoFiles.filter(f=>f.classId!==currentClass);renderUploads();}
function startAIGradingFlow() { if (window.AI) { return AI.start(); }switchTab('queue');showToast('Đây là quy trình mô phỏng. Chưa có dịch vụ AI để chấm tệp mới.');}
function startBatchGrading() { if (window.AI) { return AI.openSettings(); }switchTab('upload');showToast('Chọn bài làm để xem quy trình mô phỏng.');}
function activateDemoMode() {loadSamplePapersBatch();refreshAll();showToast('Đã nạp bài mẫu mô phỏng; giữ nguyên bảng điểm của 3 lớp.');}
function useFallbackData() {refreshAll();showToast('Đang dùng dữ liệu nguồn và các chỉnh sửa đã lưu trên trình duyệt.');}
function clearSystemCache() {clearUploadQueue();showToast('Đã dọn hàng đợi tệp của lớp đang chọn; điểm đã lưu được giữ nguyên.');}
function testAIConnection() { if (window.AI) { return AI.testConnection(); }showToast('Chế độ cục bộ: chưa cấu hình dịch vụ AI.');}
function showToast(message) {clearTimeout(toastTimer);$('toast-message').textContent=message;$('toast').classList.remove('translate-y-20','opacity-0','pointer-events-none');toastTimer=setTimeout(()=>$('toast').classList.add('translate-y-20','opacity-0','pointer-events-none'),4500);}
restore();currentSelectedStudentId=classStudents()[0].id;chartStudentId=currentSelectedStudentId;refreshAll();renderUploads();
$('modal-teacher-score-input').addEventListener('input',e=>$('modal-final-score').textContent=e.target.value===''?'—':fmt(Number(e.target.value)));
$('modal-approval').setAttribute('role','dialog');$('modal-approval').setAttribute('aria-modal','true');$('modal-approval').setAttribute('aria-labelledby','modal-student-name');
document.addEventListener('keydown',event=>{
  if($('modal-approval').classList.contains('hidden'))return;
  if(event.key==='Escape')closeApprovalModal();
  if(event.key==='Tab') {const controls=[...$('modal-approval').querySelectorAll('button,input,select,textarea')]; const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
});

for (const zone of [$('drop-area'), $('hidden-file-input')?.parentElement].filter(Boolean)) {
 zone.addEventListener('dragover', e=>e.preventDefault());
 zone.addEventListener('drop', e=>{e.preventDefault();handleFileSelection({target:{files:e.dataTransfer.files,value:''}});});
}
