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
| **Entrenador** | Reconoce señales contra reloj: ves el dibujo y eliges el nombre, o al revés. Insiste en las que peor recuerdas. |
| **Progreso** | Avance por tema, racha diaria, gráfico de la semana, historial de exámenes y repaso programado. |
| **Ajustes** | Tema claro u oscuro, tamaño de letra, vibración, meta diaria, reglas del examen y copia de seguridad del progreso. |

## Fuentes

- **Ley 109, Código de Seguridad Vial** (versión con señales, artículos 62 al 301).
- **Cuestionarios PREGUNTAS TEMA 1 al 10** de la escuela de educación vial y conducción,
  con sus claves de respuesta oficiales.
- Carteles informativos de la escuela y de la Policía Nacional Revolucionaria
  (documentos del permiso de aprendizaje y teléfonos de La Habana).

Los temas 6 y 7 del cuestionario no traían clave de respuestas: las 34 preguntas de
señales verticales se respondieron a partir del articulado de la Ley 109 y cada una
cita el artículo que la respalda.

## La app en Android (APK)

El proyecto lleva incluido el envoltorio nativo de Capacitor (`android/`) y un
flujo de GitHub Actions que compila el APK en cada empujón a una rama.

### Descargar el APK ya compilado

1. Abra la pestaña **Actions** del repositorio y entre en la última ejecución de
   *«APK de Android»*.
2. Descargue el artefacto **via-cuba-apk**.
3. Pase el `.apk` al teléfono y ábralo. Android pedirá permiso para instalar
   desde orígenes desconocidos la primera vez.

En la rama principal el flujo publica además una *release* con el APK adjunto,
que se puede descargar directamente desde el teléfono.

### Compilarlo usted mismo

Hace falta el SDK de Android (Android Studio) y un JDK 21:

```bash
npm install
npm run android:apk     # deja el APK en android/app/build/outputs/apk/debug/
npm run android:open    # o abre el proyecto en Android Studio
```

### Sobre la firma

Las compilaciones de depuración usan `android/debug.keystore`, que está
versionado a propósito: así todas las compilaciones firman igual y un APK nuevo
se instala encima del anterior **sin perder el progreso**. Es una clave de
depuración, equivalente a la que genera Android por su cuenta; no protege nada.

Para una compilación de publicación, añada estos secretos al repositorio y lance
el flujo a mano eligiendo la variante `release`:

| Secreto | Contenido |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | el almacén de claves `.jks` codificado en base64 |
| `ANDROID_KEYSTORE_PASSWORD` | contraseña del almacén |
| `ANDROID_KEY_ALIAS` | alias de la clave |
| `ANDROID_KEY_PASSWORD` | contraseña de la clave |

## Desarrollo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # compila a dist/ (incluye el service worker)
npm run preview    # sirve dist/ para comprobar la versión de producción
```

Vite + React + TypeScript + Tailwind CSS v4 + vite-plugin-pwa + Capacitor. Sin
backend: los datos viven en `src/data/` y el progreso en `localStorage`, que en
Android entra en la copia de seguridad del sistema.

### Estructura

```
src/
  data/        preguntas, catálogo de señales, temario y trámites
  components/  dibujo SVG de las señales, cuestionario y piezas de interfaz
  pages/       una pantalla por sección
  lib/         progreso, ajustes, almacenamiento, puente nativo y utilidades
android/       proyecto nativo generado por Capacitor
```

### Cómo se guarda el estado

- `lib/almacen.ts` agrupa las escrituras y las vuelca cuando la app se oculta.
- `lib/progreso.ts` guarda cada pregunta en cajas tipo Leitner (0 a 5) con la
  fecha del próximo repaso, la racha diaria, el historial de exámenes, las
  señales marcadas y la **sesión a medias**, para poder cerrar la app y volver
  exactamente donde iba.
- `lib/ajustes.ts` guarda tema, tamaño de letra, vibración, meta diaria y las
  reglas del examen.
- Desde **Ajustes** se puede guardar y restaurar una copia del progreso.

## Aviso

El contenido es material de estudio. Ante cualquier duda, y para los trámites,
rige siempre lo que dispongan la Ley 109 vigente y el Ministerio del Interior.
