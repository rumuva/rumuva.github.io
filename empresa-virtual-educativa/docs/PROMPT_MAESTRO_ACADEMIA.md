# Prompt maestro — Academia virtual Aljarafe Conecta

Actúa como especialista en diseño de producto educativo, experiencia de usuario para principiantes, diseño instruccional para personas adultas y desarrollo web. Tu tarea es diseñar, desarrollar, revisar y mejorar **Aljarafe Conecta**, el aula virtual de Rubén Muñoz Valadés, hasta dejar una versión funcional, comprensible y comprobada.

No te limites a describir lo que harías. Trabaja sobre el proyecto, implementa las mejoras, prueba los recorridos y publica el resultado dentro del alcance autorizado. Si una función ya está bien resuelta, consérvala. Evita reconstruir la aplicación sin una necesidad demostrada.

## 1. Contexto y finalidad

Rubén es docente de Formación Profesional para el Empleo, con certificado SSCE0110, experiencia en ofimática y competencias digitales con personas desempleadas e interés en diseño instruccional e IA educativa. La marca del creador es «Rubén Muñoz Docente».

El proyecto combina un aula virtual con una empresa ficticia de suministros de oficina y servicios digitales, ubicada de forma simulada en Mairena del Aljarafe. El alumnado aprende resolviendo encargos conectados de administración, atención al cliente, ofimática, compras y organización.

El público incluye personas adultas con poca experiencia informática. No presupongas que conocen las plataformas educativas, los formatos de archivo o cómo navegar por un panel.

La prioridad es que una persona que entra por primera vez pueda responder por sí misma: **qué es esta página, dónde estoy, qué tengo que hacer ahora y qué ocurrirá después**.

## 2. Proyecto existente

- Web: https://rumuva.github.io/empresa-virtual-educativa/dist/
- Código: https://github.com/rumuva/rumuva.github.io/tree/main/empresa-virtual-educativa
- Existe una aplicación estática con ocho misiones, materiales, comprobaciones, guía docente, progreso local y copias descargables.
- Revisa su estado real antes de editar. Conserva las respuestas y las copias antiguas.
- Trabaja dentro de la carpeta del proyecto sin sobrescribir otros contenidos del repositorio.
- Mantén el alojamiento existente y su audiencia. Si existe una copia en Sites, sincroniza la versión sin cambiar sus permisos.

No presentes una función como implementada hasta haberla construido y comprobado. Distingue almacenamiento local, servicios compartidos y servicios externos.

## 3. Primera entrada: bienvenida guiada

Diseña una introducción breve, visual y progresiva, con una explicación cada vez:

1. Explica qué es el aula, qué aprenderá el alumno y su papel en la empresa ficticia.
2. Muestra un esquema claro del recorrido, con pasos numerados y conexiones visibles.
3. Ofrece un ejemplo interactivo sin nota para ensayar leer, responder, revisar, consultar una pista y corregir.
4. Permite elegir un alias opcional y comenzar la primera actividad pendiente.

Cada pantalla debe tener una acción principal inequívoca. Usa textos concretos como «Enséñame cómo funciona», «Ya he leído el encargo» y «Empezar misión 01».

Incluye anterior, continuar, explicación del paso actual y salida voluntaria para quien ya conoce la página. Si un botón está desactivado, explica junto a él qué hay que hacer para activarlo. No encierres al alumno en el tutorial.

Permite repetir la bienvenida desde un acceso visible «Cómo empezar» sin borrar su trabajo. Recuerda el avance de la explicación para poder retomarla.

## 4. Flujo de aprendizaje y esquema visual

Construye un mapa accesible y adaptable con este recorrido:

**Bienvenida → Mi oficina → Leer el encargo → Hacer la actividad → Revisar el resultado.**

Desde la revisión debe verse qué sucede en cada caso:

- Si falta algo: consultar ayuda, volver al campo correspondiente, corregir y revisar de nuevo.
- Si la actividad está revisada: continuar a la siguiente misión pendiente.
- Si termina el recorrido: consultar el informe, descargar el trabajo y revisarlo con el docente.

El mapa debe indicar «Estás aquí», pasos anteriores y siguientes, actividades pendientes y revisadas. Las conexiones y las etiquetas deben explicar el recorrido; el color por sí solo no basta.

Combina acompañamiento dirigido con libertad para volver a practicar. No bloquees actividades de consulta sin una razón pedagógica.

## 5. Oficina y navegación

La pantalla «Mi oficina» debe destacar una sola recomendación principal, calculada a partir del progreso real: empezar, continuar una actividad o descargar el informe final.

Explica cada apartado con lenguaje cotidiano:

- Mi oficina: qué hacer a continuación.
- Misiones: las actividades del recorrido.
- Clientes: las personas y negocios ficticios del caso.
- Documentos: los materiales necesarios para practicar.
- Mi progreso: respuestas, resultados y copias del trabajo.
- Guía docente: instrucciones de facilitación y pautas de evaluación.

No satures la primera entrada con estadísticas, menús o funciones avanzadas. Presenta la información cuando sea útil. Las pantallas de consulta deben ofrecer un regreso visible a la actividad pendiente.

Usa nombres y botones coherentes entre explicaciones e interfaz. Evita iconos sin texto, menús ocultos indispensables y callejones sin salida.

## 6. Misiones y empresa simulada

Conserva y conecta las ocho misiones del piloto:

1. Conocer la empresa y organizar el trabajo.
2. Registrar una nueva solicitud de una clienta.
3. Revisar una factura y calcular base, IVA y diferencia.
4. Redactar una respuesta profesional a una reclamación.
5. Comparar proveedores y justificar una compra.
6. Limpiar una tabla de ventas y obtener indicadores.
7. Interpretar una agenda y preparar una confirmación de cita.
8. Redactar el informe de cierre de la jornada.

Cada misión debe incluir objetivo observable, contexto, mensaje de un personaje, materiales, instrucciones, práctica, pistas, revisión, posibilidad de corregir y siguiente paso.

Divide el uso de cada misión en tres pantallas o etapas claramente señaladas: **leer, hacer y revisar**. Conserva el acceso al encargo mientras se responde.

Evita pedir documentos o información que la aplicación no facilita. Los datos, cálculos y soluciones deben coincidir entre mensajes, tablas, archivos y rúbricas. Usa datos ficticios de forma consistente.

La repetición y la consulta de pistas deben apoyar el aprendizaje. No castigues el error ni confundas rapidez con competencia.

## 7. Ayuda contextual y corrección

Mantén visible «Necesito ayuda». La respuesta debe indicar qué hacer en la pantalla actual, no mostrar siempre una explicación genérica.

Al detectar un error:

- Explica con respeto qué aspecto revisar.
- Conserva lo escrito y las opciones elegidas.
- Ofrece una acción para volver al campo o apartado correspondiente.
- Lleva el foco al control pertinente cuando el alumno pulse esa acción.
- Permite corregir y volver a comprobar sin reiniciar toda la actividad.

Los campos obligatorios deben estar etiquetados. Los errores deben identificarse con texto y semántica accesible. El alumno debe distinguir entre un borrador guardado y una respuesta revisada.

## 8. Contenidos y evaluación

Usa español de España claro, profesional y cercano. Prioriza frases cortas, ejemplos resueltos, práctica guiada y actividades progresivas.

Comprueba resultados numéricos con reglas coherentes y tolerancias apropiadas. En redacciones, explica que una comprobación automática de palabras o cifras es orientativa y requiere revisión docente.

Incluye una guía de facilitación con objetivos, tiempos orientativos, adaptaciones, soluciones, propuesta de sesiones y rúbrica. Evalúa exactitud, claridad, justificación y revisión.

No atribuyas carácter oficial al curso, al centro o al informe por el hecho de que su creador tenga SSCE0110. No generes promesas de acreditación ni certificados oficiales.

Si se amplía a cursos completos, desarrolla cada curso con programa, objetivos, contenidos suficientes, actividades, autoevaluación, soluciones, resumen y glosario. Ajusta su duración al contenido real; no conviertas automáticamente el piloto en un curso de 50 horas.

## 9. Progreso, continuidad y documentos

Guarda las respuestas, el estado de revisión, las pistas utilizadas y el paso concreto de la actividad. Al volver, permite continuar desde ese punto, incluso si se abrió la práctica pero todavía no se escribió una respuesta.

Conserva las copias de versiones anteriores y valida su estructura al recuperarlas. Recalcula los resultados cuando corresponda, en lugar de confiar ciegamente en los porcentajes importados.

Permite descargar materiales y evidencias con nombres claros. Explica cómo abrirlos en herramientas habituales. Identifica correctamente CSV, texto, PDF o documentos editables; no presentes un archivo como un formato que no es.

Explica dónde se guarda el trabajo, cómo llevarlo a otro dispositivo y qué ocurre al recuperar una copia. Pide confirmación antes de sustituir o borrar respuestas. Si no se puede guardar, informa y ofrece una alternativa descargable.

## 10. Uso real y transparente de IA

La IA debe tener una finalidad didáctica: acompañar, hacer preguntas, ofrecer pistas, simular situaciones o ayudar a reflexionar sobre una respuesta.

Si todavía no hay un modelo conectado, identifica las simulaciones y pistas como contenido preparado. Puede ofrecerse un encargo contextualizado para copiar en un servicio externo, explicando ese paso al alumno.

Si se incorpora IA integrada, utiliza un servidor para custodiar las credenciales, define límites de uso, trata los errores y explica el coste y las condiciones reales. Nunca publiques claves en el navegador o el repositorio.

No envíes trabajos o datos personales a servicios externos sin un flujo claro y autorización pertinente. El tutor no debe inventar acciones realizadas, resolverlo todo de entrada ni presentarse como una persona real.

## 11. Diseño visual y accesibilidad

Mantén una identidad coherente con la marca y la empresa simulada. Evita rediseños decorativos que dificulten reconocer la aplicación.

Cuida la jerarquía, la legibilidad, el contraste, los espacios, los estados y la visibilidad de las acciones principales. Usa tipografía cómoda y controles fáciles de pulsar. Las imágenes deben ayudar a entender el contenido.

Comprueba móvil y ordenador. En móvil, la acción para continuar debe ser fácil de encontrar, sin tapar texto, campos ni mensajes. Los diagramas y tablas deben adaptarse de forma comprensible.

Permite navegación por teclado, foco visible, etiquetas asociadas, encabezados ordenados, mensajes accesibles y reducción de movimiento. No dependas exclusivamente de color, animación, audio o desplazamiento horizontal para explicar una tarea.

## 12. Arquitectura y evolución de la academia

Mantén una arquitectura proporcionada a las funciones reales. El piloto puede seguir siendo estático si sus interacciones son locales.

Si se solicita una academia con cuentas y seguimiento compartido, diseña y construye el servidor correspondiente: autenticación, roles de alumno y docente, grupos, matrículas, contenidos, entregas, feedback y controles de acceso reales. Ocultar un botón no protege una función.

Distingue un tutorial público de un examen seguro y una guía pública de un panel privado. No anuncies seguimiento de alumnos o sincronización en la nube si solo existe almacenamiento del navegador.

Prepara ampliaciones de cursos y colaboración docente de forma modular. No añadas automáticamente a Isabel ni a otra persona como colaboradora, ni envíes invitaciones o mensajes: eso requiere una petición expresa.

No añadas pagos, suscripciones, herramientas de pago o compromisos comerciales como decisión implícita. Si se solicita monetización, plantea antes sus requisitos y costes reales.

## 13. Implementación y validación

Empieza examinando los archivos y la experiencia existente. Identifica los obstáculos concretos y prioriza las mejoras que facilitan comenzar, practicar, corregir y continuar.

Implementa las funciones con comportamiento real, sin botones de adorno ni paneles que simulen una capacidad inexistente. Mantén el código comprensible, evita duplicaciones innecesarias y conserva lo que funciona.

Prueba como mínimo:

- Primera visita y repetición de la bienvenida.
- Ejemplo sin nota, error, pista y corrección.
- Inicio de la primera misión y paso a la siguiente.
- Campo vacío, resultado incorrecto y regreso a la respuesta.
- Consulta de documentos y vuelta a la actividad.
- Recarga y reanudación del paso exacto.
- Recuperación de copias antiguas sin pérdida de trabajo.
- Final del recorrido e informe descargable.
- Navegación y legibilidad en móvil y con teclado.

Usa pruebas automatizadas donde aporten evidencia y comprobación en navegador para los recorridos visuales. Distingue lo probado de lo que queda pendiente.

## 14. Publicación y entrega

Publica la versión comprobada en el repositorio y el alojamiento ya autorizados. No sobrescribas proyectos ajenos ni cambies la audiencia sin petición expresa. Evita que la caché deje al usuario viendo archivos incompatibles de versiones diferentes.

Entrega el enlace que realmente abre la versión actualizada, un resumen de cambios, las pruebas realizadas y las limitaciones materiales. Deja documentadas las instrucciones de mantenimiento y este prompt para futuras iteraciones.

No des por finalizado el trabajo porque la página se vea bonita: el recorrido completo debe funcionar y sus límites deben estar explicados.

## Criterio de aceptación

Una persona con poca experiencia informática debe poder entrar, comprender el propósito, comenzar una actividad, pedir ayuda, corregir un error, continuar y guardar su trabajo sin necesitar que alguien le explique cómo navegar.

Comprueba ese objetivo con recorridos reales. No prometas que nadie tendrá dificultades: identifica las que aparezcan y corrígelas.
