const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),out=path.join(root,'output/pdf');
const base=process.env.TEST_URL||'http://127.0.0.1:8765';
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  try {
    const page=await browser.newPage({viewport:{width:1200,height:1000}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base);await page.waitForFunction(()=>window.AI);
    await page.evaluate(()=>window.print=()=>{});
    const before=await page.evaluate(()=>JSON.stringify(studentsDatabase));
    const report=[];
    for(const [classId,label,count,exerciseCount] of [['3A4','3A4',17,82],['4','4A6',22,116],['5A3','5A3',23,132]]) {
      await page.evaluate(c=>{changeActiveGlobalClass(c);setFilterSubject('ALL');printAllRemedialSheets()},classId);
      const result=await page.evaluate(()=>{
        const sheets=[...document.querySelectorAll('.student-worksheet')];
        return {count:sheets.length,exercises:document.querySelectorAll('.student-worksheet .remedial-exercises li').length,extra:document.querySelectorAll('.student-worksheet .writing-space').length,
          intact:classStudents().every((student,i)=>{const r=remedialRecord(student),el=sheets[i],text=el.textContent;return r&&el.dataset.studentId===student.id&&text.includes(r.assessment)&&text.includes(r.focus)&&Object.values(r.subjects).every(s=>text.includes(s.comment)&&s.exercises.every(e=>text.includes(e.text.replace(/\*\*/g,''))))}),
          noTeacherSection:!document.querySelector('#print-area').textContent.includes('Bài tập do giáo viên bổ sung')};
      });
      assert.deepEqual(result,{count,exercises:exerciseCount,extra:0,intact:true,noTeacherSection:true});
      await page.setViewportSize({width:703,height:1032});
      await page.emulateMedia({media:'print'});
      await page.evaluate(()=>document.fonts.ready);
      const heights=await page.locator('.student-worksheet').evaluateAll(els=>els.map(e=>e.getBoundingClientRect().height));
      // A4 minus two 12 mm margins, at the browser's 96 px/in CSS resolution.
      assert(heights.every(h=>h<=273*96/25.4),`${label}: content exceeds one page: ${Math.max(...heights)}`);
      const pdf=await page.pdf({path:path.join(out,`Phieu_bai_tap_${label}.pdf`),preferCSSPageSize:true,printBackground:true,displayHeaderFooter:false});
      const pages=await page.evaluate(async bytes=>(await PDFLib.PDFDocument.load(new Uint8Array(bytes))).getPageCount(),Array.from(pdf));
      assert.equal(pages,count,`${label}: exactly one PDF page per student`);
      report.push({class:label,students:count,pages,exercises:exerciseCount,maxHeightPx:Math.max(...heights),contentIntact:true});
      await page.emulateMedia({media:'screen'});
      await page.setViewportSize({width:1200,height:1000});
      for(const subject of ['TOAN','TIENG_VIET']) {
        await page.evaluate(s=>{setFilterSubject(s);printAllRemedialSheets()},subject);
        assert.equal(await page.locator('.student-worksheet').count(),count);
        assert.deepEqual(await page.locator('.student-worksheet [data-remedial-subject]').evaluateAll(els=>[...new Set(els.map(e=>e.dataset.remedialSubject))]),[subject]);
      }
    }
    assert.equal(await page.evaluate(()=>JSON.stringify(studentsDatabase)),before,'Import/print must not change grades, approvals or teacher comments');
    assert.deepEqual(await page.evaluate(()=>{const s=classStudents('3A4')[2];return [remedialRecord({...s,classId:'5A3'}).name,remedialRecord({...s,name:'Sai tên'})]}),['Nguyễn Gia Bảo',null]);
    await page.evaluate(()=>{changeActiveGlobalClass('3A4');setFilterSubject('ALL');switchTab('personalized')});
    assert.equal(await page.locator('.remedial-preview .remedial-exercises strong').filter({hasText:'Sáng chủ nhật'}).count()>0,true,'Keep bold wording required by the Vietnamese exercises');
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(root,'reports/worksheets-results.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
