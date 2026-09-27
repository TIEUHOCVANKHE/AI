const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const out=path.resolve(__dirname,'../reports/system-test');
let failed=false;
for(const script of ['system-test.cjs','extra-tests.cjs']){
 const run=spawnSync(process.execPath,[path.join(__dirname,script)],{stdio:'inherit',env:process.env});
 if(run.status!==0)failed=true;
}
const result=JSON.parse(fs.readFileSync(out+'/results.json'));
result.checks.push(...JSON.parse(fs.readFileSync(out+'/extra-results.json')));
const pass=result.checks.filter(x=>x.ok).length,fail=result.checks.length-pass;
result.current=`Hoàn tất: ${pass} đạt, ${fail} chưa đạt`;
result.updated=new Date().toISOString();fs.writeFileSync(out+'/results.json',JSON.stringify(result,null,2));
console.log(result.current);process.exitCode=failed||fail?1:0;
