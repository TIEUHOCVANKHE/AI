const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'reports/system-test'),base=process.env.TEST_URL||'http://127.0.0.1:8765';
const source=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/rosters.json')));
const state={current:'Chuẩn bị trình duyệt',checks:[],updated:'',frame:0};let page,browser,timer,busy=false;
function publish(){state.updated=new Date().toISOString();fs.writeFileSync(out+'/results.tmp',JSON.stringify(state,null,2));fs.renameSync(out+'/results.tmp',out+'/results.json')}
function eq(name,actual,expected){try{assert.deepEqual(actual,expected);state.checks.push({name,ok:true})}catch(e){state.checks.push({name,ok:false,error:e.message});throw e}finally{publish()}}
async function capture(){if(busy||!page||page.isClosed())return;busy=true;try{await page.screenshot({path:out+'/screen.tmp.jpg',type:'jpeg',quality:72,timeout:4000});fs.renameSync(out+'/screen.tmp.jpg',out+'/screen.jpg');state.frame=Date.now();publish()}catch{}finally{busy=false}}
async function group(name,fn){state.current=name;publish();console.log(name);try{await fn()}catch(e){if(state.checks.at(-1)?.ok!==false)state.checks.push({name,ok:false,error:e.message});publish()}await capture()}
async function fresh(cases=[]){await page.goto(base+'/');await page.waitForFunction(()=>window.AI);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForFunction(()=>window.AI);await page.evaluate(c=>{window.pageCases=c;$('openai-api-key').value='fixture-not-a-real-key';switchTab('upload')},cases)}
async function upload(n=1,name='sample.pdf',bytes){
 if(!bytes)bytes=Buffer.from(await page.evaluate(async n=>{const d=await PDFLib.PDFDocument.create();for(let i=1;i<=n;i++){const p=d.addPage([595,842]);p.drawText('STT: '+i,{x:35,y:780,size:22});p.drawText('2 + 2 = 4',{x:35,y:680,size:24});p.drawText('FULL PAGE BOTTOM',{x:35,y:25,size:14})}return d.saveAsBase64()},n),'base64');
 await page.locator('#file-upload-input').setInputFiles({name,mimeType:'application/pdf',buffer:bytes});await page.waitForFunction(()=>document.querySelectorAll('.ai-upload-item').length>0);return bytes;
}
async function run(){await page.evaluate(()=>AI.start())}
async function jobs(){return page.evaluate(()=>GradeStorage.read().jobs.filter(j=>j.kind==='student'))}
async function score(i=0,sub='TOAN',r=1,c='3A4'){return page.evaluate(({i,sub,r,c})=>classStudents(c)[i].subjects[sub][r],{i,sub,r,c})}
(async()=>{
 fs.mkdirSync(out,{recursive:true});publish();browser=await chromium.launch({headless:true,channel:'chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});page=await context.newPage();
 const errors=[],missing=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)missing.push(r.url())});
 await context.addInitScript({path:path.join(__dirname,'mock-api.js')});timer=setInterval(capture,1000);
 await group('Nhận xét ngắn, 3 bài tập và giữ lịch sử cũ',async()=>{
  await fresh([{stt:'1',score:7}]);await upload();await run();
  const result=(await jobs())[0].result;
  eq('Lưu đủ mẫu nhận xét và 3 bài tập', [result.feedback.startsWith('Nhận xét:'),result.feedback.includes('\nĐánh giá chung: Hoàn thành'),result.practice.length],[true,true,3]);
  eq('Một yêu cầu chấm gồm nhận xét và bài tập đúng lớp/môn',await page.evaluate(()=>{const b=apiCalls[0],c=JSON.parse(b.input[0].content[0].text);return [apiCalls.length,c.grade,c.subject,b.instructions.includes('Kết nối tri thức'),b.instructions.includes('150 từ'),b.instructions.includes('300 từ')]}),[1,3,'Toán',true,true,true]);
  eq('Hiển thị nhãn đậm và Bài 1–3',await page.evaluate(()=>[...document.querySelectorAll('#ai-live-feedback strong, #ai-live-practice strong')].map(e=>e.textContent)),['Nhận xét:','Đánh giá chung:','Bài 1:','Bài 2:','Bài 3:']);
  await page.evaluate(()=>{const j=GradeStorage.read().jobs.find(j=>j.kind==='student');AI.review(j.id)});
  eq('Phiếu xem lại có đủ 3 bài tập',await page.locator('#ai-review-content .ai-practice-list li').count(),3);
  await page.evaluate(()=>{AI.closeReview();window.print=()=>{};setFilterSubject('TOAN');printSingleRemedialSheet(classStudents()[0].id)});
  eq('Phiếu in ưu tiên bài tập mới, không chèn bài AI cũ',await page.locator('#print-area .print-sheet').first().evaluate(el=>[el.textContent.includes('Đánh giá chung:'),el.querySelectorAll('.remedial-exercises li').length,el.querySelectorAll('.ai-practice-list li').length]),[true,3,0]);
  await page.evaluate(()=>{const r=REMEDIAL_DATA.classes['3A4'].students['1'];delete REMEDIAL_DATA.classes['3A4'].students['1'];printSingleRemedialSheet(classStudents()[0].id);REMEDIAL_DATA.classes['3A4'].students['1']=r});
  eq('Phiếu thiếu tài liệu dùng nhận xét và bài tập AI đã lưu',await page.locator('#print-area .print-sheet').first().evaluate(el=>[el.textContent.includes('Đánh giá chung:'),el.querySelectorAll('.ai-practice-list li').length]),[true,3]);
  eq('Chấp nhận đúng giới hạn 150/300 từ, không cắt đề bài',await page.evaluate(()=>{const data={can_grade:true,readable:true,criteria:[{score:7}],feedback:'Nhận xét: '+Array(143).fill('từ').join(' ')+'\nĐánh giá chung: Hoàn thành',practice:Array(3).fill(Array(100).fill('từ').join(' '))};GradingFeedback.validate(data);return [data.feedback.split(/\s+/).length,data.practice.join(' ').split(/\s+/).length]}),[150,300]);
  await page.evaluate(()=>{AI.closeReview();const state=GradeStorage.read(),j=state.jobs.find(j=>j.kind==='student');j.pageData.feedback='Lời phê cũ chưa có mẫu';j.pageData.practice=['Bài cũ'];GradeStorage.saveJobs(state.jobs)});
  await page.reload();await page.waitForFunction(()=>window.AI);
  await page.evaluate(()=>AI.review(GradeStorage.read().jobs.find(j=>j.kind==='student').id));
  eq('Lịch sử trước cập nhật vẫn mở được',await page.locator('#ai-review-content').textContent().then(t=>t.includes('Lời phê cũ chưa có mẫu')),true);
  await page.evaluate(()=>AI.closeReview());
  for(const [label,extra] of [
   ['nhận xét quá 150 từ',{raw_feedback:'Nhận xét: '+Array(151).fill('từ').join(' ')+'\nĐánh giá chung: Hoàn thành'}],
   ['bài tập quá tổng 300 từ',{practices:[Array(301).fill('từ').join(' '),'Bài ngắn.','Bài ngắn.']}],
   ['chỉ có 2 bài tập',{practices:['Tính 1 + 2.','Tính 2 + 3.']}],
   ['đánh giá sai mẫu',{raw_feedback:'Nhận xét: Em làm tốt.\nĐánh giá chung: Giỏi'}]
  ]){await fresh([{stt:'1',...extra,delay:0}]);await upload();const before=await score();await run();eq('Chặn '+label+' và không tự gọi lại',[(await jobs())[0].status,await score(),await page.evaluate(()=>apiCalls.length)],['error',before,1])}
 });
 await group('Danh sách, điểm và điều hướng 8 trang',async()=>{
  await fresh();await page.evaluate(()=>switchTab('overview'));
  eq('Nguồn 62 học sinh, 248 điểm',await page.evaluate(()=>[studentsDatabase.length,studentsDatabase.flatMap(s=>Object.values(s.subjects).flat()).length]),[62,248]);
  for(const c of ['3A4','4','5A3'])eq('Toàn bộ tên/STT/điểm '+c,await page.evaluate(c=>classStudents(c).map(s=>({stt:s.stt,name:s.name,...s.subjects})),c),source[c]);
  eq('Đủ 8 mục điều hướng',await page.locator('.nav-btn').count(),8);
  for(const id of ['overview','classes','progress','upload','queue','results','approval','personalized']){await page.locator('#nav-'+id).click();eq('Mở trang '+id,await page.locator('#tab-'+id).isVisible(),true);await page.waitForTimeout(200)}
  eq('Không có nút gọi hàm thiếu',await page.evaluate(()=>[...document.querySelectorAll('[onclick]')].map(e=>e.getAttribute('onclick').match(/^(\w+)\(/)?.[1]).filter(n=>n&&typeof window[n]!=='function')),[]);
 });
 await group('18 tổ hợp bộ lọc và tính biểu đồ',async()=>{
  for(const c of ['3A4','4','5A3'])for(const sub of ['ALL','TOAN','TIENG_VIET'])for(const r of [0,1]){
   await page.evaluate(({c,sub,r})=>{changeActiveGlobalClass(c);setFilterSubject(sub);setRound(String(r));switchTab('progress')},{c,sub,r});
   const subjects=sub==='ALL'?['TOAN','TIENG_VIET']:[sub],values=source[c].flatMap(s=>subjects.map(t=>s[t][r]));
   const actual=await page.evaluate(()=>({count:visibleStudents().length,stt:visibleStudents().map(s=>s.stt),meters:[...document.querySelectorAll('#chart-distribution meter')].map(e=>e.value),avg:[...document.querySelectorAll('#chart-class-avg meter')].map(e=>e.value),total:Number($('metric-scores').textContent)}));
   const expected={count:source[c].length,stt:source[c].map(s=>s.stt),meters:[values.filter(x=>x>=9).length,values.filter(x=>x>=7&&x<9).length,values.filter(x=>x>=5&&x<7).length,values.filter(x=>x<5).length],avg:subjects.flatMap(t=>[0,1].map(k=>source[c].reduce((a,s)=>a+s[t][k],0)/source[c].length)),total:source[c].length*subjects.length*2};
   eq(`${c} / ${sub} / lần ${r+1}`,actual,expected);
  }
 });
 await group('Xuất Excel thực tế: 9 lựa chọn, đọc lại file tải xuống',async()=>{
  for(const c of ['3A4','4','5A3'])for(const sub of ['ALL','TOAN','TIENG_VIET']){
   const downloadPromise=page.waitForEvent('download');await page.evaluate(({c,sub})=>exportGradebookExcel(c,sub),{c,sub});const download=await downloadPromise;const target=out+'/'+download.suggestedFilename();await download.saveAs(target);
   const bytes=[...fs.readFileSync(target)];const rows=await page.evaluate(bytes=>{const w=XLSX.read(new Uint8Array(bytes),{type:'array'});return w.SheetNames.map(n=>XLSX.utils.sheet_to_json(w.Sheets[n],{header:1}).slice(4).map(r=>[r[0],r[2],r[3],r[4]]))},bytes);
   eq('Excel '+c+' '+sub,rows,(sub==='ALL'?['TOAN','TIENG_VIET']:[sub]).map(t=>source[c].map(s=>[s.stt,s.name,...s[t]])));
  }
 });
 await group('Chỉnh sửa, duyệt điểm, ô trống và khôi phục bản lưu',async()=>{
  await fresh();await page.evaluate(()=>{setFilterSubject('TOAN');setRound('0');openApprovalModal(classStudents()[0].id)});
  for(const value of ['11','-1']){await page.locator('#modal-teacher-score-input').fill(value);await page.evaluate(()=>saveStudentApproval(true));eq('Chặn điểm '+value,await score(0,'TOAN',0),7)}
  await page.locator('#modal-teacher-score-input').fill('0');await page.locator('#modal-comment-input').fill('Lời phê thử nghiệm');await page.evaluate(()=>saveStudentApproval(true));eq('Lưu điểm 0',await score(0,'TOAN',0),0);
  await page.reload();await page.waitForFunction(()=>window.AI);eq('Khôi phục điểm/lời phê/duyệt',await page.evaluate(()=>[classStudents()[0].subjects.TOAN,classStudents()[0].comments['TOAN-0'],classStudents()[0].approved['TOAN-0']]),[[0,10],'Lời phê thử nghiệm',true]);
  await page.evaluate(()=>{setFilterSubject('TOAN');setRound('0');openApprovalModal(classStudents()[0].id)});await page.locator('#modal-teacher-score-input').fill('');await page.evaluate(()=>saveStudentApproval(true));eq('Ô trống không thành 0',await score(0,'TOAN',0),null);
  eq('Trung bình bỏ qua ô trống',await page.evaluate(()=>scoreValues('TOAN',0).length),16);
  await page.evaluate(()=>{setFilterSubject('TIENG_VIET');setRound('1');batchApproveAll()});eq('Duyệt cả lớp đúng môn/đợt',await page.evaluate(()=>[classStudents().every(s=>s.approved['TIENG_VIET-1']),classStudents()[1].approved['TOAN-1']===true]),[true,false]);
 });
 await group('Phiếu in và nhận xét/bài tập cá nhân',async()=>{
  await fresh();await page.evaluate(()=>window.print=()=>{});
  for(const c of ['3A4','4','5A3']){await page.evaluate(c=>{changeActiveGlobalClass(c);setFilterSubject('ALL');printAllRemedialSheets()},c);eq('In đủ phiếu '+c,await page.locator('#print-area .print-sheet').count(),source[c].length);await page.evaluate(()=>printSingleRemedialSheet(classStudents()[0].id));eq('In riêng 1 em '+c,await page.locator('#print-area .print-sheet').count(),1)}
  eq('46 nhận xét lớp 5',await page.evaluate(()=>classStudents().flatMap(s=>remedialEntries(s)).length),46);
  await page.evaluate(()=>{printFollowupSheet();switchTab('personalized')});eq('Phiếu kiểm tra lại có STT và 11 câu',await page.evaluate(()=>[$('print-area').textContent.includes('STT:'),$('print-area').querySelectorAll('li').length]),[true,11]);
 });
 await group('STT: đủ lớp, dấu tên, khóa sai và trùng khóa',async()=>{
  for(const c of ['3A4','4','5A3']){const n=source[c].length;eq('STT và dự phòng tên '+c,await page.evaluate(({c,n})=>{const j={classId:c,subject:'TOAN'};return [{student_stt:'01',student_name:''},{student_stt:String(n),student_name:'khó đọc'},{student_stt:String(n+1),student_name:''},{student_stt:'1',student_name:classStudents(c)[1].name},{student_stt:null,student_name:classStudents(c)[0].name.normalize('NFD').toUpperCase()}].map(r=>StudentIdentity.match(r,j).id)},{c,n}),[`${c}-stt-001`,`${c}-stt-${String(n).padStart(3,'0')}`,'','',`${c}-stt-001`])}
  eq('STT không hợp lệ',await page.evaluate(()=>['0','-1','1.5','1x','999999999999999999'].map(student_stt=>StudentIdentity.match({student_stt,student_name:''},{classId:'3A4',subject:'TOAN'}).id)),['','','','','']);
 });
 await group('Tải tệp, kiểm tra giới hạn, demo và hàng đợi',async()=>{
  await fresh();await page.evaluate(async()=>{for(const file of [new File([],'empty.pdf'),new File(['not a pdf'],'fake.pdf'),new File([new Uint8Array(26*1024*1024)],'large.pdf')])await AI.addFiles({target:{files:[file],value:''}})});eq('Từ chối tệp rỗng/sai định dạng/quá lớn',await page.locator('.ai-upload-item').count(),0);
  const bytes=await upload();await upload(1,'sample.pdf',bytes);eq('Chặn tệp trùng',await page.locator('.ai-upload-item').count(),1);
  await page.evaluate(()=>activateDemoMode());eq('Demo không sửa điểm',await page.evaluate(()=>[demoFiles.length,classStudents()[0].subjects.TOAN]),[8,[7,10]]);
  await page.evaluate(()=>clearSystemCache());eq('Dọn hàng đợi giữ điểm',await page.evaluate(()=>[document.querySelectorAll('.ai-upload-item').length,demoFiles.length,classStudents()[0].subjects.TOAN]),[0,0,[7,10]]);
 });
 await group('PDF thật và streaming từng phần: chưa hoàn tất chưa lưu',async()=>{
  await fresh([{stt:'2',score:6,hold:true},{stt:'1',score:4},{stt:'99',score:9},{name:'',score:8},{stt:'1',score:9},{stt:'1',score:9}]);await upload(6);const old=await score(1);
  await page.evaluate(()=>{window.runningTest=AI.start()});await page.waitForFunction(()=>typeof releaseStream==='function');
  eq('Nội dung chấm xuất hiện trong stream',await page.locator('#ai-live-criteria').textContent().then(t=>t.includes('Giải thích')),true);eq('Chưa ghi điểm trước hoàn tất',await score(1),old);eq('Hai vùng nhận diện',await page.locator('#ai-live-regions rect').count(),2);
  await capture();await page.waitForTimeout(2500);
  await page.evaluate(()=>{changeActiveGlobalClass('4');setRound('0');setFilterSubject('TIENG_VIET');releaseStream()});await page.evaluate(()=>runningTest);
  eq('Đảo trang, ngoài lớp, trùng và bằng điểm',(await jobs()).map(j=>j.status),['auto_saved','duplicate','skipped','skipped','auto_saved','duplicate']);
  eq('Phạm vi chấm không đổi khi đổi bộ lọc',await page.evaluate(()=>[classStudents('3A4')[0].subjects.TOAN[1],classStudents('3A4')[1].subjects.TOAN[1],classStudents('4')[0].subjects.TIENG_VIET[0]]),[9,6,5]);
  eq('Một ảnh nguyên trang và một request mỗi trang',await page.evaluate(()=>[apiCalls.length,apiCalls.every(c=>c.stream&&c.input[0].content.at(-1).type==='input_image')]),[6,true]);
  await page.evaluate(()=>{changeActiveGlobalClass('3A4');setRound('1');setFilterSubject('TOAN')});
  const winner=(await jobs()).find(j=>j.status==='auto_saved'&&j.studentId==='3A4-stt-001');await page.evaluate(id=>AI.review(id),winner.id);
  await page.locator('#ai-final-score').fill('8');await page.locator('#ai-overwrite-confirm').check();await page.evaluate(()=>AI.approveReview());eq('Giáo viên sửa và duyệt AI',await score(),8);
  await page.reload();await page.waitForFunction(()=>window.AI);eq('Lưu AI/duyệt và khóa không lưu',await page.evaluate(()=>[classStudents()[0].subjects.TOAN[1],$('openai-api-key').value,JSON.stringify(GradeStorage.read()).includes('fixture-not-a-real-key')]),[8,'',false]);
 });
 await group('Dừng và tiếp tục đúng trang sau tải lại PDF',async()=>{
  await fresh([{stt:'1',score:3},{stt:'2',score:7,hold:true}]);const bytes=await upload(2,'resume.pdf');await page.evaluate(()=>{window.runningTest=AI.start()});await page.waitForFunction(()=>typeof releaseStream==='function');await page.evaluate(()=>AI.stop());await page.evaluate(()=>runningTest);eq('Dừng giữ trang đã xong',(await jobs()).map(j=>j.status),['auto_saved','cancelled']);
  await page.reload();await page.waitForFunction(()=>window.AI);await page.evaluate(()=>{pageCases=[{stt:'1',score:3},{stt:'2',score:7}];$('openai-api-key').value='fixture-not-a-real-key'});await upload(2,'renamed.pdf',bytes);await run();eq('Nhận lại file theo nội dung, chỉ chấm trang 2',await page.evaluate(()=>[apiCalls.length,JSON.parse(apiCalls[0].input[0].content[0].text).page_number]),[1,2]);eq('Tiếp tục hoàn tất',(await jobs()).map(j=>j.status),['auto_saved','auto_saved']);
 });
 await group('Lỗi API và dữ liệu AI không hợp lệ',async()=>{
  for(const [label,extra,wanted]of [['401',{http:401},'error'],['429',{http:429},'error'],['500',{http:500},'error'],['mạng',{network:true},'error'],['stream thiếu kết thúc',{incomplete:true},'error'],['JSON lỗi',{bad_json:true},'error'],['barem sai',{bad_max:true},'error'],['điểm vượt thang',{score:11},'error'],['thiếu bài tập',{no_practice:true},'error'],['STT sai kiểu',{bad_stt:true},'error'],['từ chối',{refusal:true},'error'],['phản hồi cuối lệch',{mismatch:true},'error'],['không đọc được',{score:null,readable:false},'skipped'],['không đủ đề',{can_grade:false},'skipped']]){
   await fresh([{stt:'1',score:2,...extra}]);await upload();await run();eq('Xử lý '+label,[(await jobs())[0]?.status,await score()],[wanted,10]);
  }
  await fresh([{stt:'1',http:429},{stt:'2',score:2}]);await upload(2);await run();eq('429 dừng cả lượt',await page.evaluate(()=>apiCalls.length),1);await page.evaluate(()=>{delete pageCases[0].http});await run();eq('Tiếp tục sau 429',await page.evaluate(()=>apiCalls.length),3);
 });
 await group('Barem giáo viên, tham chiếu và điểm 0',async()=>{
  await fresh([{stt:'1',score:0,bad_region:true}]);await page.evaluate(()=>AI.setMode('manual'));await page.locator('[data-field=title]').fill('Câu 1');await page.locator('[data-field=answer]').fill('2 + 2 = 4');
  await page.evaluate(async()=>{await AI.setReference({files:[new File(['%PDF-1.7 reference'],'reference.pdf',{type:'application/pdf'})],value:''})});await upload();await run();eq('Barem manual và điểm 0',[(await jobs())[0]?.status,await score()],['auto_saved',0]);eq('Vùng sai không được vẽ',await page.locator('#ai-live-regions rect').count(),1);eq('Gửi tài liệu tham chiếu riêng',await page.evaluate(()=>apiCalls[0].input[0].content.some(x=>x.type==='input_file')),true);
  await page.evaluate(()=>{AI.clearReference();AI.addCriterion();switchTab('upload')});eq('Thêm/bỏ tiêu chí barem',await page.locator('#ai-rubric-rows tr').count(),2);await page.locator('[data-remove-criterion]').last().click();eq('Bỏ tiêu chí',await page.locator('#ai-rubric-rows tr').count(),1);
 });
 await group('Lỗi lưu AI: hoàn tác và thử lưu lại không gọi API',async()=>{
  await fresh([{stt:'1',score:2,hold:true}]);await upload();const before=await page.evaluate(()=>JSON.stringify(classStudents()[0]));await page.evaluate(()=>{window.runningTest=AI.start()});await page.waitForFunction(()=>typeof releaseStream==='function');
  await page.evaluate(()=>{window.originalSet=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('full','QuotaExceededError')};releaseStream()});await page.evaluate(()=>runningTest);eq('Hoàn tác khi bộ nhớ đầy',await page.evaluate(()=>JSON.stringify(classStudents()[0])),before);
  await page.evaluate(()=>{Storage.prototype.setItem=originalSet});await run();eq('Thử lưu lại không gọi AI',await page.evaluate(()=>[apiCalls.length,classStudents()[0].subjects.TOAN[1]]),[1,2]);
 });
 await group('An toàn hiển thị: nội dung AI là văn bản',async()=>{
  await fresh([{stt:'1',score:5,feedback:'<img src=x onerror="window.injected=true">',practice:'<script>window.injected=true</script>'}]);await upload();await run();eq('Không thực thi HTML từ AI',await page.evaluate(()=>[window.injected===true,$('ai-live-feedback').querySelector('img')!==null]),[false,false]);
 });
 await group('Di động: toàn bộ 8 trang ở chiều rộng 390px',async()=>{
  await fresh();await page.setViewportSize({width:390,height:844});for(const id of ['overview','classes','progress','upload','queue','results','approval','personalized']){await page.evaluate(id=>switchTab(id),id);eq('Không tràn ngang '+id,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await capture()}
  await page.setViewportSize({width:1440,height:1000});
 });
 await group('Mở file cục bộ, PDF và chế độ mất mạng',async()=>{
  await page.goto(pathToFileURL(path.join(root,'index.html')).href);await page.waitForFunction(()=>window.AI);await context.setOffline(true);eq('Mở offline đủ 62 em',await page.evaluate(()=>studentsDatabase.length),62);
  const result=await page.evaluate(async()=>{const d=await PDFLib.PDFDocument.create();d.addPage([595,842]).drawText('STT: 1');const f=new File([await d.save()],'offline.pdf',{type:'application/pdf'});const doc=await PageStream.open(f);const image=await doc.image(1);await doc.close();return image.startsWith('data:image/png')});eq('PDF file:// render offline',result,true);await context.setOffline(false);
 });
 await group('Tổng hợp lỗi trình duyệt và tài nguyên',async()=>{eq('Không lỗi JavaScript',errors,[]);eq('Không tài nguyên HTTP bị thiếu',missing,[])});
 await page.goto(base+'/');await page.waitForFunction(()=>window.AI);await page.evaluate(()=>{switchTab('classes');window.scrollTo(0,0)});await page.waitForTimeout(300);
 clearInterval(timer);await capture();state.current=`Hoàn tất: ${state.checks.filter(x=>x.ok).length} đạt, ${state.checks.filter(x=>!x.ok).length} chưa đạt`;publish();console.log(state.current);
 await browser.close();process.exitCode=state.checks.some(x=>!x.ok)?1:0;
})().catch(async e=>{clearInterval(timer);state.current='Dừng do lỗi kiểm thử';state.checks.push({name:'Bộ chạy kiểm thử',ok:false,error:e.message});publish();console.error(e);await browser?.close();process.exitCode=1});
