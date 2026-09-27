/* Full-page PDF rendering, incremental SSE/JSON decoding and truthful live presentation. */
'use strict';
window.PageStream = (() => {
  const assetBase = new URL('assets/vendor/',document.baseURI).href;
  let pdfLoader, fallbackLoader, liveId = null;
  const loadScript = src => new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Không tải được thư viện PDF cục bộ.'));document.head.append(s);});
  async function pdfLibrary() {
    if(!pdfLoader)pdfLoader=loadScript(assetBase+'pdfjs.min.js').catch(e=>{pdfLoader=null;throw e;});
    await pdfLoader;
    pdfjsLib.GlobalWorkerOptions.workerSrc=assetBase+'pdfjs.worker.min.mjs';
    // file:// cannot start module workers. Use the bundled in-page worker there only.
    if(location.protocol==='file:') {if(!fallbackLoader)fallbackLoader=loadScript(assetBase+'pdfjs.worker-fallback.min.js');await fallbackLoader;}
    return pdfjsLib;
  }
  async function open(file) {
    const header=new Uint8Array(await file.slice(0,4).arrayBuffer());
    if(header[0]===37&&header[1]===80&&header[2]===68&&header[3]===70) {
      const pdf=await pdfLibrary();
      const task=pdf.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false,cMapUrl:assetBase+'pdfjs/cmaps/',cMapPacked:true,standardFontDataUrl:assetBase+'pdfjs/standard_fonts/',wasmUrl:assetBase+'pdfjs/wasm/',useWorkerFetch:false});const doc=await task.promise;
      if(!doc.numPages||doc.numPages>120){await task.destroy();throw new Error('PDF cần có từ 1 đến 120 trang.');}
      return {count:doc.numPages,async image(number){const page=await doc.getPage(number),base=page.getViewport({scale:1});const scale=Math.min(2.5,2400/Math.max(base.width,base.height));const viewport=page.getViewport({scale});const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvasContext:canvas.getContext('2d'),viewport,background:'rgb(255,255,255)'}).promise;const data=canvas.toDataURL('image/png');page.cleanup();canvas.width=canvas.height=0;return data;},close:()=>task.destroy()};
    }
    const url=URL.createObjectURL(file);
    try {const img=new Image();img.src=url;await img.decode();return {count:1,async image(){const scale=Math.min(1,2400/Math.max(img.naturalWidth,img.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.round(img.naturalWidth*scale);canvas.height=Math.round(img.naturalHeight*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/png');},close(){URL.revokeObjectURL(url);}};}catch(e){URL.revokeObjectURL(url);throw e;}
  }
  function schema() {
    const string={type:'string'},number={type:'number'};
    const object=properties=>({type:'object',additionalProperties:false,properties,required:Object.keys(properties)});
    const region={anyOf:[object({x:number,y:number,width:number,height:number}),{type:'null'}]};
    return object({student_stt:{type:['string','null']},student_name:string,name_region:region,can_grade:{type:'boolean'},reason:string,criteria:{type:'array',items:object({id:string,title:string,answer:string,max:number,region,observed_answer:string,score:{type:['number','null']},comment:string})},readable:{type:'boolean'},warnings:{type:'array',items:string},feedback:string,practice:{type:'array',items:string}});
  }
  function region(value) {
    if(!value||!['x','y','width','height'].every(k=>Number.isFinite(value[k])))return null;
    const {x,y,width,height}=value;
    return x>=0&&y>=0&&width>0&&height>0&&x+width<=1.001&&y+height<=1.001?{x,y,width,height}:null;
  }
  // Read partial string values without completing or executing unfinished JSON.
  // Missing numbers/escapes are withheld until complete. This parser is presentation-only.
  function partialJSON(text) {
    let i=0;const OMIT=Symbol('unfinished');
    function ws(){while(/\s/.test(text[i]||'')&&i<text.length)i++;}
    function string(){i++;let out='';while(i<text.length){const c=text[i++];if(c==='"')return out;if(c==='\\'){if(i>=text.length)return out;const e=text[i++];if(e==='u'){const hex=text.slice(i,i+4);if(!/^[0-9a-f]{4}$/i.test(hex))return out;out+=String.fromCharCode(parseInt(hex,16));i+=4;}else{const chars={'"':'"','\\':'\\','/':'/','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t'};if(!(e in chars))return out;out+=chars[e];}}else out+=c;}return out;}
    function value(depth=0){if(depth>30)return OMIT;ws();const c=text[i];if(c==='"')return string();if(c==='{'||c==='['){const array=c==='[',out=array?[]:Object.create(null);i++;while(i<text.length){ws();if(text[i]===(array?']':'}')){i++;break;}let key;if(!array){if(text[i]!=='"')break;key=string();ws();if(text[i++]!==':')break;}const start=i,v=value(depth+1);if(v===OMIT||i===start)break;if(array)out.push(v);else if(!['__proto__','constructor','prototype'].includes(key))out[key]=v;ws();if(text[i]===','){i++;continue;}if(text[i]===(array?']':'}'))i++;break;}return out;}
      const m=/^(true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)(?=[\s,}\]])/.exec(text.slice(i));if(!m)return OMIT;i+=m[0].length;return JSON.parse(m[0]);}
    const out=value();return out===OMIT?{}:out;
  }
  async function consume(response,onDelta,signal) {
    if(!response.body)throw new Error('Trình duyệt không nhận được luồng phản hồi.');
    const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='',output='',complete=false,finalResponse;
    function event(block){const data=block.split('\n').filter(line=>line.startsWith('data:')).map(line=>line.slice(5).trimStart()).join('\n');if(!data||data==='[DONE]')return;let item;try{item=JSON.parse(data);}catch{throw new Error('Luồng OpenAI bị lỗi định dạng; chưa lưu điểm.');}
      if(item.type==='response.output_text.delta'){output+=item.delta||'';if(output.length>2000000)throw new Error('Phản hồi vượt dung lượng cho một trang.');onDelta(output);}
      else if(item.type==='response.completed'){complete=true;finalResponse=item.response;}
      else if(['error','response.failed','response.incomplete','response.refusal.delta','response.refusal.done'].includes(item.type)){const e=new Error('OpenAI chưa hoàn thành hoặc từ chối xử lý trang. Chưa lưu điểm.');e.stopBatch=['insufficient_quota','rate_limit_exceeded','invalid_api_key'].includes(item.code||item.error?.code||item.response?.error?.code);throw e;}}
    try {while(true){if(signal.aborted)throw new DOMException('Aborted','AbortError');const chunk=await reader.read();buffer+=decoder.decode(chunk.value||new Uint8Array(),{stream:!chunk.done});buffer=buffer.replace(/\r\n/g,'\n');let pos;while((pos=buffer.indexOf('\n\n'))>=0){event(buffer.slice(0,pos));buffer=buffer.slice(pos+2);}if(chunk.done)break;}
      if(buffer.trim())event(buffer);
      if(!complete||finalResponse?.status!=='completed')throw new Error('Luồng kết thúc trước khi hoàn tất. Chưa lưu điểm.');
      const finalText=(finalResponse.output||[]).flatMap(v=>v.content||[]).filter(v=>v.type==='output_text').map(v=>v.text).join('');
      if(finalText&&finalText!==output)throw new Error('Phản hồi cuối không khớp nội dung đã nhận. Chưa lưu điểm.');
      return {text:output,usage:finalResponse.usage};
    }finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
  }
  function begin(job,parent,image) {
    const first=$('ai-live').hidden;liveId=job.id;$('ai-live').hidden=false;if(first)$('ai-live').scrollIntoView({block:'start',behavior:'smooth'});document.querySelectorAll('.ai-live-panel').forEach(el=>el.scrollTop=0);$('ai-live-page').textContent=`${classLabel(job.classId)} · ${roundLabelLocal(job)} · Trang ${job.pageNumber}/${parent.pageCount} · ${parent.name}`;
    $('ai-live-image').src=image;$('ai-live-regions').replaceChildren();$('ai-live-name').textContent='Đang đọc STT và họ tên trên trang…';$('ai-live-criteria').textContent='Đang chờ nội dung chấm từ OpenAI…';$('ai-live-feedback').textContent='Nhận xét sẽ xuất hiện khi AI bắt đầu viết…';$('ai-live-practice').replaceChildren();state(job.id,'Đang chấm · nội dung đang hiển thị chưa được lưu');
  }
  const roundLabelLocal=job=>`${SUBJECTS[job.subject]} · Đợt ${job.round+1}`;
  function state(id,message) {if(liveId===id)$('ai-live-status').textContent=message;}
  function update(id,data) {
    if(liveId!==id||!data||typeof data!=='object')return;
    // Streamed values have not passed final validation yet; never coerce objects into text.
    const text=value=>typeof value==='string'?value:'';
    $('ai-live-name').textContent=`STT đọc được: ${text(data.student_stt)||'(không có / chưa đọc rõ)'} · Họ tên: ${text(data.student_name)||'(không có / chưa đọc rõ)'}`;
    const criteria=Array.isArray(data.criteria)?data.criteria.filter(c=>c&&typeof c==='object').map(c=>({...c,title:text(c.title),id:text(c.id),observed_answer:text(c.observed_answer),answer:text(c.answer),comment:text(c.comment)})):[];
    if(criteria.length)$('ai-live-criteria').innerHTML=criteria.map(c=>`<article class="ai-live-criterion"><h4>${escapeHTML(c.title||c.id||'Đang đọc câu…')}</h4><p><strong>Bài làm:</strong> ${escapeHTML(c.observed_answer||'')}</p><p><strong>Đáp án / cách chấm:</strong> ${escapeHTML(c.answer||'')}</p><p><strong>Điểm:</strong> ${fmt(c.score)} / ${fmt(c.max)}</p><p>${escapeHTML(c.comment||'')}</p></article>`).join('');
    if(typeof data.feedback==='string')$('ai-live-feedback').innerHTML=GradingFeedback.html(data.feedback);
    if(Array.isArray(data.practice))$('ai-live-practice').innerHTML=GradingFeedback.practiceItemsHTML(data.practice.filter(v=>typeof v==='string'));
    const regions=[{box:region(data.name_region),label:'Họ tên'},...criteria.map(c=>({box:region(c.region),label:c.title||c.id||'Bài làm'}))].filter(r=>r.box);
    $('ai-live-regions').innerHTML=regions.map(({box:b,label})=>`<g><title>${escapeHTML(label)}</title><rect x="${b.x*1000}" y="${b.y*1000}" width="${b.width*1000}" height="${b.height*1000}"/></g>`).join('');
  }
  return {open,schema,region,partialJSON,consume,begin,update,state};
})();
