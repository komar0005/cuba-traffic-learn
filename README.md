# Vía Cuba — Señales y Teórico

Aplicación para aprender las señales del tránsito en Cuba, las reglas para andar
en la calle y prepararse para el **examen teórico de la licencia de conducción**.

Funciona **sin conexión** (PWA instalable) y guarda el progreso en el propio
dispositivo. Toda la interfaz está en español.

## Qué trae

| Sección | Contenido |
| --- | --- |
| **Señales** | 115 señales dibujadas en SVG: grupos A al H de las señales verticales, marcas del pavimento, semáforos y señales del agente. Cada una con su significado y el artículo de la Ley 109 que la define. |
| **Teoría** | Los nueve temas del temario oficial, resumidos del articulado de la Ley 109: prioridades, velocidades, adelantamiento, estacionamiento, luces, sanciones, estado técnico. |
| **Práctica** | 360 preguntas de los cuestionarios oficiales de la escuela, por tema, con la respuesta y el artículo al momento. |
| **Examen** | Simulación del teórico: 20 preguntas al azar, con reloj, sin ver la respuesta hasta el final. Se aprueba con 18. |
| **Andar en la calle** | Guía rápida: quién tiene la prioridad, distancias de seguridad, peatones, qué hacer ante un accidente. |
| **Trámites** | Los seis documentos del permiso de aprendizaje (MININT) y los teléfonos de Licencia de Conducción y Registro de Vehículos. |
| **Progreso** | Avance por tema, historial de exámenes y repaso de las preguntas falladas. |

## Fuentes

- **Ley 109, Código de Seguridad Vial** (versión con señales, artículos 62 al 301).
- **Cuestionarios PREGUNTAS TEMA 1 al 10** de la escuela de educación vial y conducción,
  con sus claves de respuesta oficiales.
- Carteles informativos de la escuela y de la Policía Nacional Revolucionaria
  (documentos del permiso de aprendizaje y teléfonos de La Habana).

Los temas 6 y 7 del cuestionario no traían clave de respuestas: las 34 preguntas de
señales verticales se respondieron a partir del articulado de la Ley 109 y cada una
cita el artículo que la respalda.

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # compila a dist/ (incluye el service worker)
npm run preview    # sirve dist/ para comprobar la versión de producción
```

Vite + React + TypeScript + Tailwind CSS v4 + vite-plugin-pwa. Sin backend: los datos
viven en `src/data/` y el progreso en `localStorage`.

### Estructura

```
src/
  data/        preguntas, catálogo de señales, temario y trámites
  components/  dibujo SVG de las señales, cuestionario y piezas de interfaz
  pages/       una pantalla por sección
  lib/         progreso (localStorage), utilidades y derivados de los datos
```

## Aviso

El contenido es material de estudio. Ante cualquier duda, y para los trámites,
rige siempre lo que dispongan la Ley 109 vigente y el Ministerio del Interior.
