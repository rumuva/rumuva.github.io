import {normalizeGuide,missionStage} from './journey.js?v=1.1.1';
export const norm = s => String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export function number(s) {
 let v=String(s??'').replace(/[€\s]/g,'');
 if(v.includes(','))v=v.replace(/\./g,'').replace(',','.');
 return v!==''&&Number.isFinite(Number(v))?Number(v):NaN;
}
export const near=(a,b)=>Math.abs(number(a)-b)<0.005;
export const money=n=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n);
export function evaluate(kind,a) {
 const text=norm(a.body), reason=norm(a.reason);
 let checks=[];
 if(kind==='welcome')checks=[['Revisas la documentación antes de responder',a.priority==='revisar'],['Usas un nombre de archivo identificable',a.archive==='claro']];
 if(kind==='client')checks=[['Nombre y negocio correctos',norm(a.name)==='sara medina'&&norm(a.business)==='taller creativo'],['Municipio correcto',norm(a.city)==='san juan de aznalfarache'],['Correo comprobado',norm(a.email)==='sara@tallercreativo.example'],['Nota con cantidad, producto y plazo',/\b12\b/.test(norm(a.notes))&&norm(a.notes).includes('carpet')&&norm(a.notes).includes('viernes')]];
 if(kind==='invoice')checks=[['Base imponible: suma de las tres líneas',near(a.base,201)],['IVA: 21 % sobre la base',near(a.tax,42.21)],['Total: base más IVA',near(a.total,243.21)],['Diferencia respecto al total original',near(a.diff,13.31)]];
 if(kind==='email')checks=[['Asunto que identifica la factura',norm(a.subject).includes('f-026')],['Saludo y trato personalizado',text.includes('lucia')],['Reconocimiento del error con una disculpa',/lament|disculp|sentimos/.test(text)],['Importe correcto y diferencia',/243[,.]21/.test(text)&&/13[,.]31/.test(text)],['Propuesta de solución y despedida',/devol|reembols/.test(text)&&/saludo|atentamente|gracias/.test(text)],['Desarrollo suficiente para revisar',text.length>=180]];
 if(kind==='purchase')checks=[['Proveedor que cumple ambos requisitos',a.supplier==='norte'],['Coste final, IVA incluido',near(a.cost,423.5)],['Justificación que menciona coste y plazo',reason.length>=45&&/plazo|dia|entreg/.test(reason)&&/presupuesto|cost|precio|450|423/.test(reason)]];
 if(kind==='data')checks=[['Número de ventas únicas',near(a.rows,5)],['Total neto de ventas',near(a.net,240)],['Unidades totales',near(a.units,38)]];
 if(kind==='schedule')checks=[['Hueco sin solapamientos',a.slot==='10:30'],['Confirmación con persona y hora',text.includes('mario')&&text.includes('10:30')&&text.includes('11:15')],['Confirmación con día de la simulación',text.includes('martes')]];
 if(kind==='report')checks=[['Informe con desarrollo suficiente',text.length>=350],['Factura y diferencia identificadas',text.includes('f-026')&&/243[,.]21/.test(text)&&/13[,.]31/.test(text)],['Proveedor y coste justificados',text.includes('norte')&&/423[,.]50/.test(text)],['Resumen de ventas correcto',/\b5\b/.test(text)&&/\b240\b/.test(text)],['Pendientes diferenciados',/pendiente|confirmacion|autoriza/.test(text)]];
 return {checks,score:Math.round(checks.filter(c=>c[1]).length/checks.length*100),passed:checks.every(c=>c[1]),indicative:['email','report','purchase','schedule'].includes(kind)};
}
export function validateBackup(o){
 if(!o||o.app!=='aljarafe-conecta'||o.version!==1||typeof o.name!=='string'||o.name.length>60||!o.work||typeof o.work!=='object'||Array.isArray(o.work))throw Error('Esta copia no corresponde a Aljarafe Conecta.');
 const work={};const allowed=['bienvenida','clientes','factura','correo','compras','datos','agenda','informe'];
 for(const [id,v]of Object.entries(o.work)){
  if(!allowed.includes(id)||!v||typeof v!=='object')continue;
  const answers={};for(const [k,val]of Object.entries(v.answers||{})){if(['__proto__','constructor','prototype'].includes(k))continue;if(typeof val==='string'&&val.length<=20000)answers[k]=val;}
  const kinds={bienvenida:'welcome',clientes:'client',factura:'invoice',correo:'email',compras:'purchase',datos:'data',agenda:'schedule',informe:'report'};
  const result=v.result?evaluate(kinds[id],answers):null;
  work[id]={answers,attempts:Math.max(0,Math.min(10000,Math.floor(Number(v.attempts)||0))),hints:Math.max(0,Math.min(2,Math.floor(Number(v.hints)||0))),result,date:typeof v.date==='string'?v.date.slice(0,40):''};
  work[id].stage=missionStage({...work[id],stage:v.stage});
 }
 return {app:'aljarafe-conecta',version:1,name:o.name,work,guide:normalizeGuide(o.guide)};
}
