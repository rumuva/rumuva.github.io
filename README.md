# NANDO BROS II

Juego original de plataformas 2D creado con Canvas, CSS y JavaScript puro. No usa assets, música ni librerías externas para el juego: el arte se dibuja por código y el audio se sintetiza con Web Audio.

## Ejecutar

Abre `index.html` en un navegador moderno. Para evitar restricciones locales de algunos navegadores también puedes servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Después visita `http://localhost:8080`.

## Controles

- A/D o flechas: caminar
- W, flecha arriba o Espacio: saltar
- Dos pulsaciones rápidas de salto: supersalto (solo uno por cadena de pulsaciones)
- Z: disparar proyectiles de luz
- P o Escape: pausa
- M: silenciar/reactivar audio

Toca los bloques de la suerte desde cualquier lado para liberar una mejora aleatoria: salud, escudo, velocidad, impulso celeste, pulso nova o disparo rápido.

El progreso de niveles, mejor puntuación y preferencias de audio se guardan en el navegador.

## Instalar en Android

Enlace público: **https://rumuva.github.io/**

1. Abre esa dirección desde Chrome en el móvil Android.
2. Pulsa **Instalar en Android** o abre el menú de Chrome y elige **Instalar aplicación**.
3. Gira el móvil horizontalmente para jugar con los controles táctiles.

Después de la primera carga, el juego funciona sin conexión gracias al service worker. Abrir `index.html` directamente como archivo permite jugar, pero Android exige una dirección HTTPS para mostrar la instalación.

