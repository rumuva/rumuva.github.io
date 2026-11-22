/**
 * Validación estática del curso Git y GitHub de 50 horas.
 * Ejecutar desde la raíz del repositorio:
 * node curso-github-50h/verificar-autoevaluaciones.mjs
 * No modifica archivos ni usa servicios de red.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const folder = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
const errors = [];

function readArray(name) {
  const marker = 'const ' + name + '=';
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*');
  const match = re.exec(html);
  if (!match) throw new Error('No se encuentra ' + name);
  const at = match.index + match[0].length;
  if (html[at] !== '[') throw new Error(name + ' no contiene un array JSON');
  let depth = 0, quoted = false, escape = false;
  for (let i = at; i < html.length; i++) {
    const c = html[i];
    if (quoted) {
      if (escape) escape = false;
      else if (c === '\\\\') escape = true;
      else if (c === '"') quoted = false;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === '[') depth++;
    else if (c === ']' && --depth === 0) return JSON.parse(html.slice(at, i + 1));
  }
  throw new Error('Array sin cerrar: ' + name);
}
function check(condition, message) { if (!condition) errors.push(message); }

const units = readArray('U');
const labs = readArray('LABS');
const visuals = readArray('VISUAL_GUIDES');
const distribution = [0,0,0];
const seen = new Set();
check(units.length === 10, 'Se esperaban exactamente 10 unidades');
check(labs.length === 10, 'Se esperaban exactamente 10 talleres');
check(visuals.length === 10, 'Se esperaban 10 grupos de capturas');

for (const [i, unit] of units.entries()) {
  check(unit.quiz.length === 5, 'Unidad ' + (i+1) + ': faltan preguntas');
  for (const [j, q] of unit.quiz.entries()) {
    check(typeof q.q === 'string' && q.q.trim().length > 0, 'Pregunta vacía ' + i + '.' + j);
    check(!seen.has(q.q), 'Pregunta duplicada: ' + q.q);
    seen.add(q.q);
    check(q.opts.length === 3 && new Set(q.opts).size === 3, 'Opciones invalidas: ' + q.q);
    check(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 2, 'Clave inválida: ' + q.q);
    if (Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 2) distribution[q.answer]++;
  }
}
check(seen.size === 50, 'Se esperaban 50 preguntas diferentes');
check(distribution.join(',') === '17,17,16', 'Distribución esperada A=17, B=17, C=16');
const paths = new Set();
let references = 0;
for (const unitVisuals of visuals) for (const item of unitVisuals) {
  references++;
  const file = 'capturas/' + item.id + '.webp';
  paths.add(file);
  check(fs.existsSync(path.join(folder, file)), 'Imagen ausente: ' + file);
}
check(references === 36, 'Se esperaban 36 referencias a capturas');
check(paths.size === 27, 'Se esperaban 27 imágenes únicas');

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
check(scripts.length === 2, 'Se esperaban dos bloques JavaScript');
for (const [i, script] of scripts.entries()) {
  try { new vm.Script(script[1], { filename: 'script-' + (i+1) + '.js' }); }
  catch (err) { errors.push('Error de sintaxis JS ' + (i+1) + ': ' + err.message); }
}
console.log('Unidades: ' + units.length + ' | Talleres: ' + labs.length +
  ' | Preguntas: ' + seen.size + ' | Claves: A=' + distribution[0] +
  ', B=' + distribution[1] + ', C=' + distribution[2]);
console.log('Capturas: ' + paths.size + ' archivos y ' + references + ' referencias.');
if (errors.length) {
  for (const error of errors) console.error('ERROR: ' + error);
  process.exitCode = 1;
} else {
  console.log('OK: validación estática satisfactoria. No sustituye pruebas en navegador.');
}
