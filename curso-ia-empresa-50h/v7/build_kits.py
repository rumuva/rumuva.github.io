#!/usr/bin/env python3
"""Paquetes de práctica: source of truth is the live course HTML in this repository.
No personal data, answer keys, or teacher grades are ever published.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from docx import Document
from docx.shared import Pt, Inches, RGBColor
import csv, zipfile, hashlib, json, re, shutil, subprocess

BASE=Path(__file__).resolve().parents[1]
SRC=BASE/"index.html"
OUT=BASE/"kits-alumnado"
OUT.mkdir(exist_ok=True)
soup=BeautifulSoup(SRC.read_text(encoding="utf-8"),"html.parser")
logo=BASE/"assets"/"logo-ruben.png"
def setup_doc():
    d=Document()
    s=d.sections[0];s.top_margin=Inches(.7);s.bottom_margin=Inches(.7)
    st=d.styles["Normal"];st.font.name="Aptos";st.font.size=Pt(10);st.font.color.rgb=RGBColor(25,65,74)
    s.footer.paragraphs[0].text="Rubén Muñoz Valadés | Material formativo | Datos ficticios"
    return d
cases={
1:(["ticket_ficticio","asunto","minutos_previos","estado"],[[f"SIM-{i:03d}",["pedido","devolucion","horario","catalogo"][i%4],12,"Ficticio"] for i in range(1,21)]),
2:(["herramienta_ficticia","exactitud_1_5","formato_1_5","facilidad_1_5","seguridad_pendiente"],[["A",5,4,5,"Verificar"],["B",4,5,3,"Verificar"]]),
3:(["version","contexto","tarea","limites","formato"],[["Vaga","Cafeteria ficticia","Redactar","",""],["CLARO","Cafeteria ficticia","Redactar 3 respuestas","Sin inventar hechos; max. 40 palabras","Tabla"]]),
4:(["caso","antes_min","generacion_min","revision_min","correccion_min"],[[f"SIM-{i:02d}",12,2,3,1] for i in range(1,21)]),
5:(["semana","canal","objetivo","mensaje","dato_a_verificar","estado"],[[i,["Web","Red social","Correo","Folleto"][i-1],"Informar","Por redactar","Precio y disponibilidad","Sin publicar"] for i in range(1,5)]),
6:(["sector","tarea","riesgo","control","indicador"],[["Hosteleria","Reservas","Disponibilidad","Confirmar agenda","Consultas verificadas"],["Comercio","Catalogo","Precios errados","Revisar ficha","Errores por ficha"],["Administracion","Extractos de prueba","Datos","Usar ejemplos sinteticos","Exactitud"],["Docencia","Preguntas","Errores pedagogicos","Validacion docente","Validez"],["Servicios","Presupuesto","Compromisos","Aprobacion","Tiempo neto"]]),
7:(["dato_ejemplo","semaforo","utilizacion","medida"],[["Direccion ficticia","verde","Prueba","Verificar que sea inventada"],["Documento interno","ambar","Autorizacion","Comprobar permisos"],["Contrasena","rojo","No utilizar","Proteger"],["Datos de salud reales","rojo","No utilizar","Proteccion especial"]]),
8:(["caso","resultado_esperado","salida_ia","error","minutos_antes","minutos_despues"],[[f"SIM-{i:02d}","Definir","Pendiente","Por comprobar",12,0] for i in range(1,11)])
}
manifest={}
for i in range(1,9):
    unit=soup.find("section",id=f"unidad-{i}")
    if unit is None:raise RuntimeError(f"Missing unit U{i}")
    title=unit.find("h2").get_text(" ",strip=True)
    activities=unit.select("h3.activity-title")
    if len(activities)!=7:raise RuntimeError(f"U{i}: {len(activities)} activities, expected 7")
    d=setup_doc()
    if logo.exists():d.add_picture(str(logo),width=Inches(.85))
    d.add_heading("IA aplicada a la productividad empresarial",0)
    d.add_paragraph(f"Docente: Rubén Muñoz Valadés | 50 horas | Unidad {i}")
    d.add_heading(f"Cuaderno de prácticas · Unidad {i}",1)
    d.add_heading(title,2)
    d.add_paragraph("Sigue las instrucciones, utiliza únicamente datos sintéticos y anota quién debe revisar el resultado.")
    for num,h in enumerate(activities,1):
        d.add_heading(h.get_text(" ",strip=True),2)
        sib=h.find_next_sibling()
        selected=[]
        while sib is not None and sib.name not in ("h3","h2"):
            if sib.name=="p":
                t=sib.get_text(" ",strip=True)
                if t and not ("Desarrollo resuelto y solución específica" in t):
                    selected.append(t)
            elif sib.name=="ol":
                selected.extend(["Paso "+str(k)+". "+v.get_text(" ",strip=True) for k,v in enumerate(sib.find_all("li",recursive=False),1)])
            sib=sib.find_next_sibling()
        # Limit to instructions, deliverables and checks; model answers stay on teacher materials.
        for t in selected:
            if "Solución específica" in t or "Respuesta modelo" in t:continue
            d.add_paragraph(t)
        d.add_heading("Evidencia a entregar",3)
        table=d.add_table(rows=3,cols=2)
        table.style="Light Shading Accent 1"
        table.cell(0,0).text="Resultado / cálculo"
        table.cell(0,1).text="Comprobación / fuente"
        d.add_paragraph("Responsable de la revisión: ______________________________")
    d.add_heading("Repaso de la unidad",2)
    rec=unit.find("section",id=f"resumen-unidad-{i}")
    if rec:
        for li in rec.select("li"):d.add_paragraph(li.get_text(" ",strip=True),style="List Bullet")
    pdf=OUT/f"U{i:02d}_Cuaderno_Alumnado.docx"
    d.save(pdf)
    header,rows=cases[i]
    dataset=OUT/f"U{i:02d}_Datos_Ficticios.csv"
    with dataset.open("w",encoding="utf-8-sig",newline="") as f:
        c=csv.writer(f,delimiter=";");c.writerow(header);c.writerows(rows)
    manifest[f"U{i}"]={"activities":len(activities),"dataset_rows":len(rows),"title":title}
# Public information only; criteria do not reveal answer keys.
doc=setup_doc()
doc.add_heading("Proyecto final: rúbrica de evaluación",0)
doc.add_paragraph("Docente: Rubén Muñoz Valadés. Este archivo describe criterios, no contiene notas de alumnos.")
for label,pts in [("Problema y alcance",15),("Diseño y reproducibilidad",15),("Protección de datos y riesgos",20),("Pruebas y verificación",20),("Indicadores y viabilidad",15),("Comunicación y transferencia",15)]:
    doc.add_paragraph(f"{label}: {pts} puntos",style="List Bullet")
doc.add_paragraph("Requisitos para superar el curso: test final ≥24/32 y proyecto ≥60/100. La evaluación del proyecto pertenece al docente. Nota global de los aprobados = 40% test normalizado + 60% proyecto.")
doc.save(OUT/"Rubrica_Proyecto_Alumnado.docx")
with (OUT/"LEEME.txt").open("w",encoding="utf-8") as f:
    f.write("Kit de 8 unidades · Alfabetización en IA para empresas (50 h)\nDocente: Rubén Muñoz Valadés\nDatos íntegramente ficticios. Los CSV se abren con Excel o LibreOffice Calc, separador punto y coma.\nNingún documento de esta carpeta contiene soluciones reservadas o notas de personas reales.\n")
# make sure every unit document is readable and exactly eight sets exist
assert len(list(OUT.glob("U??_Cuaderno_Alumnado.docx")))==8
assert len(list(OUT.glob("U??_Datos_Ficticios.csv")))==8
with zipfile.ZipFile(BASE/"Kit_Practicas_8_Unidades_ALUMNADO.zip","w",zipfile.ZIP_DEFLATED) as z:
    for p in sorted(OUT.iterdir()):
        if p.is_file():z.write(p,p.name)
(BASE/"kits_alumnado_manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
print("OK",manifest)
