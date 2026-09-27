const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:8765',out=path.join(__dirname,'../reports/system-test');let page,browser;const checks=[];
function eq(name,a,b){assert.deepEqual(a,b,name);checks.push({name,ok:true})}
async function group(name,fn){try{await fn()}catch(e){checks.push({name,ok:false,error:e.message})}fs.writeFileSync(out+'/extra-results.json',JSON.stringify(checks,null,2))}
async function fresh(){await page.goto(base+'/');await page.waitForFunction(()=>window.AI);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForFunction(()=>window.AI)}
(async()=>{
 browser=await chromium.launch({headless:true,channel:'chrome'});const context=await browser.newContext();await context.addInitScript({path:path.join(__dirname,'mock-api.js')});page=await context.newPage();
 await group('Lưu sửa điểm thất bại phải giữ nguyên trạng thái',async()=>{
  await fresh();const old=await page.evaluate(()=>JSON.stringify(classStudents()[0]));
  await page.evaluate(()=>{openApprovalModal(classStudents()[0].id);$('modal-teacher-score-input').value='1';$('modal-comment-input').value='Thử lỗi ghi bộ nhớ';Storage.prototype.setItem=function(){throw new DOMException('full','QuotaExceededError')};saveStudentApproval(true)});
  eq('Sửa tay hoàn tác điểm/lời phê/duyệt khi không lưu được',await page.evaluate(()=>JSON.stringify(classStudents()[0])),old);
 });
 await group('Duyệt hàng loạt thất bại phải giữ nguyên trạng thái',async()=>{
  await fresh();const old=await page.evaluate(()=>JSON.stringify(classStudents()));await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new DOMException('full','QuotaExceededError')};batchApproveAll()});eq('Duyệt hàng loạt hoàn tác khi không lưu được',await page.evaluate(()=>JSON.stringify(classStudents())),old);
 });
 await group('Cấu hình kết nối và barem từng phạm vi',async()=>{
  await fresh();await page.evaluate(()=>AI.testConnection());eq('Khóa trống không gửi API',await page.evaluate(()=>apiCalls.length),0);
  await page.evaluate(()=>{$('openai-api-key').value='bad key';AI.testConnection()});eq('Khóa chứa khoảng trắng bị chặn',await page.evaluate(()=>apiCalls.length),0);
  await page.evaluate(async()=>{$('openai-api-key').value='fixture';await AI.testConnection()});eq('Nút kiểm tra kết nối',await page.locator('#ai-connection-status').textContent().then(t=>t.startsWith('Đã kết nối')),true);
  await page.evaluate(()=>AI.forgetKey());eq('Xóa khóa khỏi phiên',await page.locator('#openai-api-key').inputValue(),'');
  await page.evaluate(()=>{AI.setMode('manual');$('ai-rubric-rows').querySelector('[data-field=title]').value='Câu mẫu';$('ai-rubric-rows').querySelector('[data-field=answer]').value='Đáp án mẫu';AI.saveRubric();changeActiveGlobalClass('4')});
  eq('Barem lớp khác độc lập',await page.locator('[data-field=title]').inputValue(),'');await page.evaluate(()=>changeActiveGlobalClass('3A4'));eq('Trở lại đúng barem',await page.locator('[data-field=title]').inputValue(),'Câu mẫu');await page.reload();await page.waitForFunction(()=>window.AI);eq('Barem lưu qua tải lại',await page.locator('[data-field=title]').inputValue(),'Câu mẫu');
 });
 await group('Ảnh PNG/JPEG, PDF quá trang và kéo thả',async()=>{
  await fresh();
  eq('Đọc nguyên ảnh PNG và JPEG',await page.evaluate(async()=>{const c=document.createElement('canvas');c.width=600;c.height=800;c.getContext('2d').fillText('STT: 1',30,40);const sizes=[];for(const type of ['image/png','image/jpeg']){const blob=await new Promise(r=>c.toBlob(r,type));const file=new File([blob],'image.'+(type==='image/png'?'png':'jpg'),{type});const d=await PageStream.open(file);sizes.push([d.count,(await d.image(1)).startsWith('data:image/png')]);await d.close()}return sizes}),[[1,true],[1,true]]);
  eq('Chặn PDF quá 120 trang',await page.evaluate(async()=>{const d=await PDFLib.PDFDocument.create();for(let i=0;i<121;i++)d.addPage([100,100]);try{await PageStream.open(new File([await d.save()],'large.pdf'));return false}catch(e){return e.message.includes('120')}}),true);
  await page.evaluate(async()=>{const d=await PDFLib.PDFDocument.create();d.addPage();const file=new File([await d.save()],'drag.pdf',{type:'application/pdf'});const dt=new DataTransfer();dt.items.add(file);$('drop-area').dispatchEvent(new DragEvent('drop',{dataTransfer:dt,bubbles:true}))});await page.waitForFunction(()=>document.querySelectorAll('.ai-upload-item').length===1);eq('Kéo thả nhận tệp',await page.locator('.ai-upload-item').count(),1);
  await page.evaluate(()=>{const select=document.querySelector('.ai-upload-item select');select.value='4';select.dispatchEvent(new Event('change',{bubbles:true}));changeActiveGlobalClass('4')});eq('Đổi lớp của tệp trước khi chấm',await page.locator('.ai-upload-item').count(),1);
 });
 await group('Chuyển bản lưu cũ của cả ba lớp',async()=>{
  await fresh();await page.evaluate(()=>{GradeStorage.commit(studentsDatabase.map(s=>({...s,rosterRevision:'old',subjects:{TOAN:[0,0],TIENG_VIET:[0,0]}})),[])});await page.reload();await page.waitForFunction(()=>window.AI);
  eq('Không dùng lại điểm của phiên bản danh sách cũ',await page.evaluate(()=>['3A4','4','5A3'].map(c=>classStudents(c)[0].subjects.TOAN)),[[7,10],[7,9],[7,9]]);
  eq('Sao lưu riêng cả ba lớp',await page.evaluate(()=>Object.keys(SOURCE_DATA).every(c=>localStorage.getItem('van-khe-state-v2-backup-'+c+'-'+SOURCE_DATA[c].rosterRevision)!==null)),true);
 });
 await browser.close();console.log(JSON.stringify(checks,null,2));process.exitCode=checks.some(x=>!x.ok)?1:0;
})().catch(async e=>{console.error(e);await browser?.close();process.exitCode=1});
