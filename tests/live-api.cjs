// Run with Node and PLAYWRIGHT_MODULE pointing at an installed Playwright package.
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.TEST_URL||'http://127.0.0.1:8765';
const output=path.join(__dirname,'../reports/system-test/live-api.json');
function status(value){fs.writeFileSync(output,JSON.stringify({...value,updated:new Date().toISOString()},null,2));console.log(value.status);}
(async()=>{
 const browser=await chromium.launch({headless:false,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(base+'/');await page.waitForFunction(()=>window.AI);
 await page.evaluate(async()=>{
  document.title='KIỂM THỬ API THẬT — nhập khóa tại đây';AI.openSettings();changeActiveGlobalClass('3A4');setRound('0');setFilterSubject('TOAN');
  const banner=document.createElement('p');banner.textContent='PHIÊN KIỂM THỬ RIÊNG: Nhập API key rồi bấm Kiểm tra kết nối. Sau khi kết nối thành công, hai bài mẫu chỉ ghi STT sẽ tự chạy.';banner.style='background:#fff1cc;padding:18px;font-weight:bold';$('ai-settings').prepend(banner);
  const pdf=await PDFLib.PDFDocument.create();
  for(const [stt,a,b] of [[1,'5','8'],[2,'5','7']]){const p=pdf.addPage([595,842]);for(const [i,line]of ['BAI MAU KIEM THU - TOAN LOP 3',`STT: ${stt}`,'Moi cau 5 diem. Tong 10 diem.',`Cau 1: 2 + 3 = ${a}`,`Cau 2: 4 + 4 = ${b}`].entries())p.drawText(line,{x:50,y:770-i*70,size:20});}
  const file=new File([await pdf.save()],'bai-mau-api-2-trang.pdf',{type:'application/pdf'});
  await AI.addFiles({target:{files:[file],value:''}});
  AI.setMode('manual');const first=$('ai-rubric-rows').querySelector('tr');first.querySelector('[data-field=title]').value='Câu 1';first.querySelector('[data-field=answer]').value='2 + 3 = 5. Đúng 5 điểm, sai 0 điểm.';first.querySelector('[data-field=max]').value='5';AI.addCriterion();
  const last=$('ai-rubric-rows').querySelector('tr:last-child');last.querySelector('[data-field=title]').value='Câu 2';last.querySelector('[data-field=answer]').value='4 + 4 = 8. Đúng 5 điểm, sai 0 điểm.';last.querySelector('[data-field=max]').value='5';AI.saveRubric();
  $('openai-api-key').focus();
 });
 status({status:'waiting_for_key',message:'Nhập khóa trong cửa sổ Chrome KIỂM THỬ API THẬT và bấm Kiểm tra kết nối.'});
 await page.waitForFunction(()=>$('ai-connection-status').textContent.startsWith('Đã kết nối'),{},{timeout:1800000});
 status({status:'running',message:'Đã kết nối; chấm hai trang thật.'});
 await page.evaluate(()=>AI.start());
 const result=await page.evaluate(()=>({jobs:GradeStorage.read().jobs.filter(j=>j.kind==='student').map(j=>({page:j.pageNumber,status:j.status,stt:j.result?.student_stt,score:j.result?.total,error:j.error||'',criteria:j.result?.criteria,model:j.model})),scores:classStudents().slice(0,2).map(s=>s.subjects.TOAN[0])}));
 const ok=result.jobs.length===2&&result.jobs.every(j=>j.status==='auto_saved')&&result.scores[0]===10&&result.scores[1]===5;
 await page.evaluate(()=>AI.forgetKey());
 status({status:ok?'passed':'failed',...result,expected:[10,5],message:'Khóa đã được xóa khỏi ô nhập. Phiên kiểm thử vẫn mở để xem.'});
 // Keep this isolated browser visible for the user's review without persisting credentials.
 await page.waitForEvent('close',{timeout:1800000}).catch(()=>{});await browser.close();
})().catch(e=>{status({status:'blocked',message:e.name==='TimeoutError'?'Chưa nhận kết nối API hợp lệ trong phiên kiểm thử.':'Phiên kiểm thử API đã dừng; kiểm tra cửa sổ Chrome.'});process.exitCode=1});
