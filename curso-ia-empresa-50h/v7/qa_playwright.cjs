const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('fs');
const url='http://127.0.0.1:8765/curso-ia-empresa-50h/';
(async()=>{
 const browser=await chromium.launch({headless:true});
 const report={cases:[],failures:[]};
 const test=async(name,fn)=>{
  try{await fn();report.cases.push({name,status:'PASS'})}
  catch(e){report.cases.push({name,status:'FAIL',error:String(e).slice(0,400)});report.failures.push(name)}
 };
 const ctx=await browser.newContext({viewport:{width:1280,height:800}});
 const page=await ctx.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'domcontentloaded'});
 await test('Page JS initialization',async()=>assert.deepEqual(errors,[]));
 await test('Instructor identity and visual resources',async()=>{
   assert((await page.locator('header.masthead').innerText()).includes('Rubén Muñoz Valadés'));
   assert.equal(await page.locator('.brand-professional').count(),1);
 });
 await test('Course structure',async()=>{
  assert.equal(await page.locator('section.lesson[id^="unidad-"]').count(),8);
  assert.equal(await page.locator('section.review-summary').count(),8);
  assert.equal(await page.locator('section.lab-v7').count(),8);
  assert.equal(await page.locator('form.quiz-form').count(),8);
  assert.equal(await page.locator('section.game-mission').count(),8);
 });
 await test('Unit 1 score and explained feedback',async()=>{
  await page.locator('[data-open="unidad-1"]').click();
  for(const [i,k] of ['B','A','C','B','B'].entries())
   await page.locator('form[data-quiz="1"] input[name="u1q'+(i+1)+'"][value="'+k+'"]').check();
  await page.locator('form[data-quiz="1"] button[type="submit"]').click();
  assert((await page.locator('#feedback-1').innerText()).includes('5/5'));
  assert.equal(await page.locator('form[data-quiz="1"] .quiz-feedback-details-v7 p').count(),5);
  assert.equal(await page.locator('[data-open="unidad-2"]').isDisabled(),false);
 });
 await test('Progress persists after reload',async()=>{
  await page.reload();
  assert.equal(await page.locator('[data-open="unidad-2"]').isDisabled(),false);
 });
 await test('CLARO prompt tool',async()=>{
  await page.evaluate(()=>{
   const k='rm-ia-empresa-50h-github-2026',p=JSON.parse(localStorage.getItem(k)||'{}');
   p.passed=Object.assign({},p.passed||{},{1:true,2:true});localStorage.setItem(k,JSON.stringify(p));
  });
  await page.reload();await page.locator('[data-open="unidad-3"]').click();
  const form=page.locator('#prompt-claro-v7');
  for(const [name,value] of Object.entries({contexto:'Cafetería ficticia',labor:'Redactar texto',acotaciones:'Sin inventar horarios',referencias:'Ficha autorizada',organizacion:'Tabla'}))
   await form.locator('input[name="'+name+'"]').fill(value);
  await form.locator('button[type="submit"]').click();
  assert((await page.locator('#prompt-result-v7').inputValue()).includes('ACOTACIONES: Sin inventar horarios'));
 });
 await test('Net savings calculator',async()=>{
  await page.evaluate(()=>{
   const k='rm-ia-empresa-50h-github-2026',p=JSON.parse(localStorage.getItem(k)||'{}');
   p.passed=Object.assign({},p.passed||{},{3:true});localStorage.setItem(k,JSON.stringify(p));
  });
  await page.reload();await page.locator('[data-open="unidad-4"]').click();
  await page.locator('#calc-flow-v7 button[type="submit"]').click();
  assert((await page.locator('#calc-result-v7').innerText()).includes('120 min/semana'));
 });
 await test('Sector selector',async()=>{
  await page.evaluate(()=>{
   const k='rm-ia-empresa-50h-github-2026',p=JSON.parse(localStorage.getItem(k)||'{}');
   p.passed=Object.assign({},p.passed||{},{4:true,5:true});localStorage.setItem(k,JSON.stringify(p));
  });
  await page.reload();await page.locator('[data-open="unidad-6"]').click();
  await page.locator('#sector-v7').selectOption('3');
  assert((await page.locator('#sector-result-v7').innerText()).includes('preguntas de repaso'));
 });
 await test('Mobile layout no horizontal document overflow',async()=>{
  await page.setViewportSize({width:390,height:844});
  await page.locator('[data-open="unidad-1"]').click();
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:innerWidth}));
  assert(dimensions.scroll<=dimensions.inner+8,JSON.stringify(dimensions));
 });
 await test('Keyboard focus indication',async()=>{
  await page.locator('[data-open="unidad-1"]').focus();
  const style=await page.locator('[data-open="unidad-1"]').evaluate(x=>getComputedStyle(x).outlineStyle);
  assert.notEqual(style,'none');
 });
 await browser.close();
 fs.writeFileSync('curso-ia-empresa-50h/v7/qa_end_to_end.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(report.failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
