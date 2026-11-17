const pptxgen=require('pptxgenjs');
const fs=require('fs'),path=require('path');
const base=__dirname,raw=fs.readFileSync(path.join(base,'index.html'),'utf8');
const dest=path.join(base,'presentaciones_explicativas');fs.mkdirSync(dest,{recursive:true});
const C={bg:'F7F9F8',ink:'183842',teal:'12747A',coral:'D47D60',blue:'587EA3',soft:'EAF5F2',white:'FFFFFF',border:'D8E7E4',muted:'526B71',cream:'FFF3E7',dark:'123D49'};
const shp={rect:'rect',round:'roundRect',line:'line',ellipse:'ellipse'};
function strip(s){return(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/\s+/g,' ').trim()}
function shorten(s,n){s=strip(s);if(s.length<=n)return s;let z=s.slice(0,n);let p=z.lastIndexOf('. ');if(p>n*.58)return z.slice(0,p+1);return z.slice(0,Math.max(0,z.lastIndexOf(' ')))+'…'}
function match(s,r){return strip((s.match(r)||[])[1]||'')}
function getUnit(n){
 const start=raw.indexOf('<section class="lesson" id="unidad-'+n+'"');
 const next=raw.indexOf('<section class="lesson" id="unidad-'+(n+1)+'"',start+30);
 if(start<0)throw Error('Unidad no encontrada: '+n);
 const u=raw.slice(start,next<0?raw.length:next);
 const title=match(u,/<div class="lesson-heading"[^>]*>[\s\S]*?<h2>([\s\S]*?)<\/h2>/);
 const objective=match(u,/<h3>Objetivo específico<\/h3><p>([\s\S]*?)<\/p>/);
 const context=match(u,/<h3>Situación profesional de referencia<\/h3><p>([\s\S]*?)<\/p>/);
 const theory=(u.match(/<details class="visual-theory">([\s\S]*?)<\/details>/)||[])[1]||'';
 if(!title||!theory)throw Error('Faltan título o teoría U'+n);
 const hs=[...theory.matchAll(/<h3>(\d+\.\d+\.\s*[^<]+)<\/h3>/g)];
 const topics=hs.map((m,i)=>{
  let end=i+1<hs.length?hs[i+1].index:theory.length;
  let content=theory.slice(m.index+m[0].length,end);
  return{name:strip(m[1]),paras:[...content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x=>strip(x[1])).filter(Boolean)}
 });
 const fst=u.indexOf('<h3 class="activity-title">Actividad '+n+'.1');
 let act='';
 if(fst>=0){let nx=u.indexOf('<h3 class="activity-title">Actividad '+n+'.2',fst+10);act=u.slice(fst,nx>fst?nx:u.length);}
 const highlight=[...act.matchAll(/<p class="highlight">([\s\S]*?)<\/p>/g)].map(x=>strip(x[1]));
 const steps=[...act.matchAll(/<p class="step">([\s\S]*?)<\/p>/g)].map(x=>strip(x[1]));
 const solution=match(act,/<p>Desarrollo resuelto y solución específica<\/p><p>([\s\S]*?)<\/p>/);
 const second=u.indexOf('<h3 class="activity-title">Actividad '+n+'.2');
 let task2='';
 if(second>0){const nx=u.indexOf('<h3 class="activity-title">Actividad '+n+'.3',second+20);task2=u.slice(second,nx>second?nx:u.length);}
 const practice=match(task2,/<p class="highlight">ENUNCIADO\.\s*([\s\S]*?)<\/p>/);
 const practiceSteps=[...task2.matchAll(/<p class="step">([\s\S]*?)<\/p>/g)].map(x=>strip(x[1]));
 if(topics.length<4||!steps.length||!solution)throw Error('Unidad sin contenido suficiente: '+n+' topics '+topics.length+' steps '+steps.length);
 return{n,title,objective,context,topics,activity:{enunciado:highlight[0]||'',consignas:highlight[1]||'',steps,solution},practice,practiceSteps};
}
const data=Array.from({length:8},(_,i)=>getUnit(i+1));
function txt(s,t,x,y,w,h,z=17,col=C.ink,bold=false,extra={}){s.addText(t,{x,y,w,h,fontFace:'Aptos',fontSize:z,color:col,bold,margin:0,fit:'shrink',valign:'mid',...extra})}
function box(s,x,y,w,h,fill=C.white){s.addShape(shp.round,{x,y,w,h,rectRadius:.14,fill:{color:fill},line:{color:C.border,width:.8}})}
function notes(s,t){if(s.addNotes)s.addNotes(shorten(t,3500))}
function header(s,u,title,subtitle){s.background={color:C.bg};s.addShape(shp.rect,{x:0,y:0,w:13.33,h:.13,fill:{color:C.teal},line:{color:C.teal}});
 txt(s,'IA Y PRODUCTIVIDAD EMPRESARIAL · U'+u.n,.63,.35,12,.28,11,C.teal,true);
 txt(s,shorten(title,105),.63,.78,12,.71,27,C.dark,true);txt(s,subtitle,.63,1.51,11.9,.38,12.5,C.muted);
 s.addShape(shp.line,{x:.63,y:7.03,w:12.04,h:0,line:{color:C.border,width:1}});
 txt(s,'50 horas · Explicación, ejemplos y ejercicios resueltos',.63,7.12,10,.18,9,C.muted)}
function panel(s,x,y,w,h,title,body,fill=C.white){box(s,x,y,w,h,fill);txt(s,title,x+.2,y+.13,w-.4,.35,16,C.teal,true);txt(s,shorten(body,490),x+.2,y+.57,w-.4,h-.68,16,C.ink,false,{valign:'top'})}
function cover(p,u){let s=p.addSlide();s.background={color:C.dark};s.addShape(shp.rect,{x:0,y:0,w:.21,h:7.5,fill:{color:C.coral},line:{color:C.coral}});
 s.addShape(shp.ellipse,{x:9.1,y:-1.45,w:6.6,h:6.6,fill:{color:'1C626A'},line:{color:'1C626A'}});
 txt(s,'PRESENTACIÓN FORMATIVA EXPLICATIVA',.78,.76,9,.36,14,'BFE2DE',true);
 txt(s,'UNIDAD '+u.n,.78,1.51,7,.51,23,'F8AD89',true);txt(s,u.title,.78,2.27,9.5,1.44,32,C.white,true);
 box(s,.79,4.83,8.79,.82,'2B6E76');txt(s,'Conceptos explicados · Ejemplos · Ejercicio resuelto',1.04,5.03,8.2,.4,17,C.white,true);
 txt(s,'Formación propia · Docente por confirmar',.78,6.85,10,.32,11,'C7DAD9');notes(s,u.objective+' Contexto: '+u.context)}
function objectives(p,u){let s=p.addSlide();header(s,u,'Qué aprenderás y para qué','Objetivo y situación profesional de referencia');
 panel(s,.65,2.06,7.2,1.53,'Objetivo específico',u.objective,C.soft);
 panel(s,.65,3.79,7.2,2.31,'Situación profesional',u.context);
 box(s,8.11,2.06,4.56,4.04);txt(s,'Temas desarrollados',8.36,2.36,3.97,.5,18,C.teal,true);
 u.topics.forEach((t,i)=>{txt(s,String(i+1).padStart(2,'0'),8.37,3.04+i*.61,.42,.35,14,C.coral,true);txt(s,shorten(t.name.replace(/^\d+\.\d+\.\s*/,''),80),8.91,2.98+i*.61,3.38,.49,13.5,C.ink,true)});
 notes(s,'Explicar la utilidad del objetivo en '+u.context)}
function theory(p,u,t,k){let s=p.addSlide();let title=t.name.replace(/^\d+\.\d+\.\s*/,'');
 header(s,u,(u.n)+'.'+(k+1)+' · '+title,'Concepto, explicación y ejemplo profesional');
 panel(s,.65,2.09,7.18,2.35,'Explicación',t.paras[0],C.soft);
 panel(s,.65,4.63,7.18,1.65,'¿Por qué es importante?',t.paras[1]||t.paras[0]);
 panel(s,8.03,2.09,4.6,2.36,'Aplicación al negocio',t.paras[2]||t.paras[1]||t.paras[0]);
 panel(s,8.03,4.62,4.6,1.65,'Comprueba', '¿De dónde procede el dato? ¿Qué error sería posible? ¿Quién autoriza su uso?',C.cream);
 notes(s,t.paras.join(' ')+' Solicitar un ejemplo oral y un riesgo práctico.')}
function application(p,u,t){let s=p.addSlide();let title=t.name.replace(/^\d+\.\d+\.\s*/,'');
 header(s,u,'Aplicación práctica: '+title,'De la explicación a un procedimiento controlado');
 panel(s,.65,2.12,5.84,2.2,'1. Situación de trabajo',t.paras[1]||t.paras[0]);
 panel(s,6.76,2.12,5.86,2.2,'2. Decisión profesional',t.paras[2]||t.paras[0],C.soft);
 box(s,.65,4.63,11.97,1.43);txt(s,'Secuencia recomendada',.89,4.81,8,.39,18,C.teal,true);
 ['Definir la tarea','Preparar datos','Proponer resultado','Verificar y decidir'].forEach((x,i)=>{
 let a=.89+i*2.95;box(s,a,5.34,2.65,.48,i===3?C.cream:C.soft);txt(s,x,a+.07,5.42,2.5,.27,13,C.ink,true,{align:'center'});
 });
 txt(s,'La IA propone; la persona comprueba hechos, permisos y condiciones antes de actuar.',.79,6.31,11.65,.4,15,C.muted);
 notes(s,t.paras.join(' '))}
function caseSlide(p,u){let s=p.addSlide();header(s,u,'Caso profesional: del problema al piloto','Conectar la teoría con una necesidad empresarial');
 panel(s,.67,2.12,11.91,1.68,'El problema planteado',u.context,C.soft);
 panel(s,.67,4.08,5.78,1.85,'Qué decidir','Delimita una tarea repetitiva, reúne datos ficticios y define un resultado verificable.');
 panel(s,6.75,4.08,5.78,1.85,'Qué controlar','Establece un indicador de partida, una revisión humana y una condición de parada.');
 notes(s,u.context+' Elaborar un ejemplo en pizarra y discutir riesgos.')}
function guided(p,u,part){let s=p.addSlide();let a=u.activity;
 header(s,u,part===1?'Ejercicio guiado: comprender el encargo':'Ejercicio guiado: resolución explicada','Actividad del manual · desarrollo paso a paso');
 if(part===1){
 panel(s,.67,2.1,11.92,1.63,'Enunciado y datos',shorten(a.enunciado,300)+' '+shorten(a.consignas,210),C.soft);
 a.steps.slice(0,3).forEach((v,i)=>panel(s,.67+i*4.03,3.98,3.74,1.91,'Paso '+(i+1),v));
 notes(s,a.enunciado+' '+a.consignas+' '+a.steps.join(' '));
 }else{
 a.steps.slice(3,5).forEach((v,i)=>panel(s,.67+i*6.05,2.11,5.78,1.76,'Paso '+(i+4),v));
 panel(s,.67,4.17,11.91,1.84,'Solución y comprobación',a.solution,C.soft);
 txt(s,'Justifica la decisión y comprueba que el resultado no inventa hechos.',.82,6.27,11.39,.35,15,C.muted,true);
 notes(s,a.steps.join(' ')+' Solución completa: '+a.solution);
 }}
function practice(p,u){let s=p.addSlide();header(s,u,'Ahora practica tú','Ejercicio individual y posterior contraste por parejas');
 panel(s,.68,2.17,11.89,1.62,'Enunciado',u.practice||u.activity.enunciado,C.soft);
 u.practiceSteps.slice(0,4).forEach((v,i)=>{let x=.68+(i%2)*6.04,y=4.04+Math.floor(i/2)*1.0;box(s,x,y,5.75,.82);txt(s,shorten(v,176),x+.17,y+.12,5.38,.57,14.4)});
 notes(s,'Trabajo individual con datos ficticios. No dar la solución antes de que el grupo complete el ejercicio. '+u.practiceSteps.join(' '))}
function checklist(p,u){let s=p.addSlide();header(s,u,'Lista de comprobación','Cuatro condiciones para utilizar un resultado de IA');
 const qs=[['Objetivo','¿Resuelve un problema concreto y medible?'],['Calidad','¿Se han comprobado hechos, cifras y fuentes?'],['Seguridad','¿Solo se usan datos autorizados y mínimos?'],['Supervisión','¿Una persona puede corregir o detener el proceso?']];
 qs.forEach((q,i)=>panel(s,.68+(i%2)*6.04,2.16+Math.floor(i/2)*1.93,5.77,1.68,q[0],q[1],i%2?C.soft:C.white));
 notes(s,'Pedir al alumnado que identifique qué control falta en un caso inventado.')}
function summary(p,u){let s=p.addSlide();header(s,u,'Resumen explicado','Qué debes comprender antes de la autoevaluación');
 u.topics.forEach((t,i)=>{let x=.67+(i%2)*6.03,y=2.05+Math.floor(i/2)*1.15;box(s,x,y,5.78,1.03,i%2?C.soft:C.white);txt(s,(i+1)+'. '+shorten(t.name.replace(/^\d+\.\d+\.\s*/,''),60),x+.18,y+.08,5.4,.34,14.1,C.teal,true);txt(s,shorten(t.paras[0],155),x+.18,y+.48,5.39,.39,11.6,C.ink,false,{valign:'top'})});
 txt(s,'Recuerda: una salida convincente requiere verificación y responsable.',.76,6.43,11.71,.4,15,C.coral,true);
 notes(s,'Repasar los conceptos mediante ejemplos, no memorización.')}
function reflection(p,u){let s=p.addSlide();header(s,u,'Comprueba tu comprensión','Preparación para la autoevaluación de la plataforma');
 ['¿Qué concepto aplicarías primero en tu trabajo y por qué?','¿Cómo comprobarías una respuesta antes de enviarla?','¿Qué dato nunca introducirías sin autorización?'].forEach((q,i)=>panel(s,.68,2.09+i*1.31,11.89,1.06,'Pregunta '+(i+1),q,i%2?C.soft:C.white));
 box(s,.69,6.18,11.9,.58,C.cream);txt(s,'Continúa con la autoevaluación: 5 preguntas; debes acertar al menos 4.',.85,6.32,11.59,.28,14.8,C.ink,true);
 notes(s,'Las cuestiones son de reflexión. El test de la plataforma mantiene sus criterios originales.')}
(async()=>{
 for(const u of data){
 const p=new pptxgen();p.layout='LAYOUT_WIDE';p.author='Diseño instruccional de FPE';p.lang='es-ES';p.title='IA empresa · Unidad '+u.n+' · Presentación explicativa';
 cover(p,u);objectives(p,u);for(let k=0;k<u.topics.length;k++){theory(p,u,u.topics[k],k);application(p,u,u.topics[k])}
 caseSlide(p,u);guided(p,u,1);guided(p,u,2);practice(p,u);checklist(p,u);summary(p,u);reflection(p,u);
 const n=p._slides.length;
 if(n!==(u.n===6?19:17))throw Error('Número de diapositivas incorrecto U'+u.n+': '+n);
 for(let i=1;i<n;i++)txt(p._slides[i],String(i+1).padStart(2,'0')+'/'+n,11.94,7.1,.75,.2,9,C.muted,false,{align:'right'});
 const file='U'+u.n+'_Presentacion_Explicativa_IA_Empresa.pptx';
 await p.writeFile({fileName:path.join(dest,file)});
 console.log('OK',u.n,n,file);
 }
})();
