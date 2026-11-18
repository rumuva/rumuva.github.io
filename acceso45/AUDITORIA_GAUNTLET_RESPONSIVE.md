# Auditoría Gauntlet — Aula Isabel +45 — edición visual y responsive

Fecha de revisión: 18 de noviembre de 2026.

## Alcance

Aplicación web del curso de preparación de acceso a la Universidad para mayores de 45 años (convocatoria 2027). Revisadas portada, 12 unidades, plan de estudio, simulacros, glosario, recursos oficiales, imágenes y manuales imprimibles.

## Resultados

- **Auditoría de estructura y contenido:** 21/21 verificaciones conformes.
- **Auditoría funcional automatizada:** 25/25 verificaciones conformes, sin excepciones JavaScript en las pruebas locales.
- **Responsive:** 204 combinaciones de pantalla y sección (17 secciones × 12 anchos: 320, 360, 390, 430, 600, 768, 800, 801, 1024, 1280, 1440 y 1920 píxeles). **0 desbordamientos horizontales**, **0 errores JavaScript** en las pruebas.
- **Ilustraciones:** 6 infografías isométricas en formato JPEG, además de 12 esquemas de aprendizaje explicados (uno en cada unidad). Las imágenes están enlazadas para permitir ampliarlas desde el móvil.
- **Contenido académico:** 12 unidades / 100 horas según programación, preguntas de autocorrección, simulacros, glosario y seguimiento local.
- **PDF del alumnado:** 89 páginas, A4, válido, archivo no vacío.
- **PDF docente:** 97 páginas, A4, válido. **No se incluye en el sitio público**, solo en el paquete privado.
- **Impresión:** el botón abre el PDF ya generado, evitando generar un documento vacío durante la impresión.

## Mejoras responsive realizadas

1. Se ha recuperado la infografía de portada en los móviles de menos de 550 píxeles (antes no aparecía).
2. Las seis ilustraciones admiten apertura a tamaño completo en una nueva pestaña.
3. Se ha aumentado a un mínimo de 44 × 44 píxeles el área táctil de los controles de la barra superior.
4. Se han ajustado la cabecera, la tabla de rúbrica y los esquemas explicativos para 320–380 píxeles.
5. Se ha vuelto a ejecutar el conjunto completo de pruebas funcionales y responsive tras los cambios.

## Metodología

- Inventario de contenidos y archivos.
- Análisis de puntos de ruptura y diseño móvil (Chromium headless / Playwright).
- Verificación de anchura de documento, imágenes y controles en secciones representativas.
- Ejecución de cuestionario, desbloqueo de unidad, búsqueda de glosario y navegación.
- Revisión de validez y recuento de páginas de los PDF.
- Separación del material público y del solucionario privado.

## Limitaciones y próximos controles

La auditoría se ha ejecutado en Chromium automatizado, no en dispositivos físicos. No constituye certificación WCAG 2.2 AA ni sustituye pruebas con lectores de pantalla, distintos motores de navegador o personas usuarias. Las imágenes generadas, aunque revisadas visualmente, deberían contrastarse contra el programa oficial si se reutilizan como contenido normativo. Los ejercicios escritos abiertos necesitan corrección humana. La disponibilidad pública de la URL final, la configuración de DNS/Hostinger y los requisitos administrativos de la convocatoria requieren verificación externa por separado. No se garantiza el aprobado ni una plaza universitaria.

## Archivos

La carpeta `web/` está preparada para publicarse como sitio estático (colocar su contenido en el directorio público de Hostinger o GitHub Pages). El directorio `material_docente/` contiene las soluciones para uso privado y no debe publicarse.
