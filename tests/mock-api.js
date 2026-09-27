// Browser-only fixture: intercept API calls only in the automated test context.
(() => {
 const realFetch=window.fetch;window.apiCalls=[];window.pageCases=[];
 window.fetch=async function(url,opts){
  if(String(url)!=='https://api.openai.com/v1/responses')return realFetch(url,opts);
  const body=JSON.parse(opts.body);window.apiCalls.push(body);
  if(!body.stream)return new Response(JSON.stringify({status:'completed',output:[{type:'message',content:[{type:'output_text',text:'OK'}]}]}),{status:window.connectionHTTP||200});
  const context=JSON.parse(body.input[0].content[0].text),test=window.pageCases[context.page_number-1]||{};
  if(test.network)throw new TypeError('Network fixture');
  if(test.http)return new Response(JSON.stringify({error:{code:test.http===429?'rate_limit_exceeded':'test_error'}}),{status:test.http});
  const rubric=context.rubric_mode==='manual'?context.rubric:[{id:'C1',title:'Câu 1',answer:'2 + 2 = 4',max:10}];
  const output={student_stt:test.stt??null,student_name:test.name||'',name_region:{x:.05,y:.03,width:.8,height:.08},can_grade:test.can_grade!==false,reason:'Dữ liệu kiểm thử',criteria:rubric.map(c=>({...c,region:{x:.05,y:.2,width:.8,height:.4},observed_answer:'Học sinh viết 4, có chữ "đúng".',score:test.score===undefined?7:test.score,comment:'Giải thích từng mục.'})),readable:test.readable!==false,warnings:[],feedback:test.raw_feedback??`Nhận xét: ${test.feedback||'Em làm tốt phép cộng ở Câu 1; cần tiếp tục luyện tính chính xác.'}\nĐánh giá chung: ${test.can_grade===false||test.readable===false||test.score===null?'Chưa đủ căn cứ':'Hoàn thành'}`,practice:test.practices||[test.practice||'Tính 3 + 5.', 'Tính 6 + 2.', 'Lan có 4 bút, được tặng 3 bút. Hỏi Lan có tất cả bao nhiêu bút?']};
  if(test.can_grade===false)output.criteria=[];
  if(test.bad_max)output.criteria[0].max=11;
  if(test.bad_region)output.name_region.x=3;
  if(test.bad_stt)output.student_stt={value:1};
  if(test.no_practice)output.practice=[];
  const text=test.bad_json?'{bad-json':JSON.stringify(output),encoder=new TextEncoder();let cancelled=false;
  return new Response(new ReadableStream({start(controller){
   opts.signal.addEventListener('abort',()=>{cancelled=true;try{controller.error(new DOMException('Aborted','AbortError'))}catch{}},{once:true});
   const emit=event=>{const bytes=encoder.encode('data: '+JSON.stringify(event)+'\r\n\r\n');for(let i=0;i<bytes.length;i+=7)controller.enqueue(bytes.slice(i,i+7));};
   (async()=>{try{
    for(let i=0;i<text.length;i+=23){if(cancelled)return;emit({type:'response.output_text.delta',delta:text.slice(i,i+23)});if(test.hold&&i>text.indexOf('feedback')+30){await new Promise(resolve=>window.releaseStream=resolve);test.hold=false;}await new Promise(r=>setTimeout(r,test.delay??4));}
    if(cancelled)return;
    if(test.refusal)emit({type:'response.refusal.done'});
    else if(!test.incomplete)emit({type:'response.completed',response:{status:'completed',output:[{type:'message',content:[{type:'output_text',text:test.mismatch?'different':text}]}]}});
    controller.close();
   }catch(e){if(!cancelled)controller.error(e)}})();
  },cancel(){cancelled=true}}),{status:200,headers:{'Content-Type':'text/event-stream'}});
 };
})();
