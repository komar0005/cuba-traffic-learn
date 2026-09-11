/**
 * Progreso del estudiante: qué preguntas domina, cuándo toca repasarlas,
 * historial de exámenes, racha diaria y señales marcadas.
 *
 * El repaso usa cajas tipo Leitner: cada acierto sube de caja y aleja la
 * próxima revisión; cada fallo devuelve la pregunta a la primera caja.
 */
import { crearTienda } from './tienda'

const CLAVE = 'via-cuba:progreso:v2'
const CLAVE_V1 = 'via-cuba:progreso:v1'

/** Días de espera hasta el próximo repaso según la caja alcanzada. */
export const ESPERA_POR_CAJA = [0, 1, 3, 7, 16, 35]
/** A partir de esta caja la pregunta se considera dominada. */
export const CAJA_DOMINADA = 3

export type EstadoPregunta = {
  caja: number
  aciertos: number
  fallos: number
  /** última vez que se respondió (ms) */
  vista: number
  /** cuándo vuelve a tocar (ms) */
  toca: number
}

export type Examen = {
  fecha: number
  correctas: number
  total: number
  aprobado: boolean
  segundos: number
}

/** Sesión a medio hacer, para poder cerrar la app y volver donde iba. */
export type Sesion = {
  tipo: 'practica' | 'examen'
  /** tema, 'fallos' o 'repaso' en la práctica */
  origen: string
  ids: string[]
  respuestas: (number | null)[]
  indice: number
  iniciada: number
  /** segundos ya consumidos en el examen */
  segundos: number
}

export type Progreso = {
  version: 2
  preguntas: Record<string, EstadoPregunta>
  examenes: Examen[]
  /** ids de señales marcadas por el usuario */
  favoritas: string[]
  /** respuestas por día, en formato AAAA-MM-DD */
  porDia: Record<string, number>
  /** aciertos del entrenador de señales por id */
  senales: Record<string, { aciertos: number; fallos: number }>
  sesion: Sesion | null
}

const VACIO: Progreso = {
  version: 2,
  preguntas: {},
  examenes: [],
  favoritas: [],
  porDia: {},
  senales: {},
  sesion: null,
}

function migrar(crudo: unknown): Progreso {
  const p = crudo as Partial<Progreso> & { preguntas?: Record<string, unknown> }
  if (p?.version === 2) return { ...VACIO, ...(p as Progreso) }

  // Formato v1: { preguntas: {racha, aciertos, fallos, vista}, examenes, senalesVistas }
  const preguntas: Record<string, EstadoPregunta> = {}
  for (const [id, e] of Object.entries(p?.preguntas ?? {})) {
    const v = e as { racha?: number; aciertos?: number; fallos?: number; vista?: number }
    const caja = Math.min(ESPERA_POR_CAJA.length - 1, Math.max(0, v.racha ?? 0))
    preguntas[id] = {
      caja,
      aciertos: v.aciertos ?? 0,
      fallos: v.fallos ?? 0,
      vista: v.vista ?? 0,
      toca: (v.vista ?? 0) + ESPERA_POR_CAJA[caja] * 86400000,
    }
  }
  return { ...VACIO, preguntas, examenes: (p?.examenes as Examen[]) ?? [] }
}

// Arrastra el progreso guardado por la primera versión de la app.
if (typeof localStorage !== 'undefined' && !localStorage.getItem(CLAVE)) {
  const viejo = localStorage.getItem(CLAVE_V1)
  if (viejo) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(migrar(JSON.parse(viejo))))
    } catch {
      /* si el dato viejo está corrupto se empieza limpio */
    }
  }
}

export const tiendaProgreso = crearTienda<Progreso>(CLAVE, VACIO, migrar)

export function hoy(fecha = new Date()) {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(
    fecha.getDate(),
  ).padStart(2, '0')}`
}

export function dominada(e?: EstadoPregunta) {
  return (e?.caja ?? 0) >= CAJA_DOMINADA
}

export function tocaRepasar(e: EstadoPregunta | undefined, ahora = Date.now()) {
  if (!e) return false
  return e.toca <= ahora
}

/** Racha de días seguidos con al menos una respuesta. */
export function calcularRacha(porDia: Record<string, number>) {
  let racha = 0
  const dia = new Date()
  // Si hoy todavía no se ha estudiado, la racha se cuenta hasta ayer.
  if (!porDia[hoy(dia)]) dia.setDate(dia.getDate() - 1)
  for (;;) {
    if (!porDia[hoy(dia)]) break
    racha++
    dia.setDate(dia.getDate() - 1)
  }
  return racha
}

export function useProgreso() {
  const progreso = tiendaProgreso.usar()

  const registrarRespuesta = (id: string, acierto: boolean) => {
    tiendaProgreso.fijar((p) => {
      const ahora = Date.now()
      const ant = p.preguntas[id] ?? { caja: 0, aciertos: 0, fallos: 0, vista: 0, toca: 0 }
      const caja = acierto ? Math.min(ESPERA_POR_CAJA.length - 1, ant.caja + 1) : 0
      const dia = hoy()
      return {
        ...p,
        preguntas: {
          ...p.preguntas,
          [id]: {
            caja,
            aciertos: ant.aciertos + (acierto ? 1 : 0),
            fallos: ant.fallos + (acierto ? 0 : 1),
            vista: ahora,
            toca: ahora + ESPERA_POR_CAJA[caja] * 86400000,
          },
        },
        porDia: { ...p.porDia, [dia]: (p.porDia[dia] ?? 0) + 1 },
      }
    })
  }

  const registrarExamen = (e: Examen) =>
    tiendaProgreso.fijar((p) => ({ ...p, examenes: [e, ...p.examenes].slice(0, 60) }))

  const registrarSenal = (id: string, acierto: boolean) =>
    tiendaProgreso.fijar((p) => {
      const ant = p.senales[id] ?? { aciertos: 0, fallos: 0 }
      return {
        ...p,
        senales: {
          ...p.senales,
          [id]: {
            aciertos: ant.aciertos + (acierto ? 1 : 0),
            fallos: ant.fallos + (acierto ? 0 : 1),
          },
        },
      }
    })

  const alternarFavorita = (id: string) =>
    tiendaProgreso.fijar((p) => ({
      ...p,
      favoritas: p.favoritas.includes(id)
        ? p.favoritas.filter((x) => x !== id)
        : [...p.favoritas, id],
    }))

  const guardarSesion = (s: Sesion | null) => tiendaProgreso.fijar((p) => ({ ...p, sesion: s }))

  const borrarTodo = () => tiendaProgreso.fijar({ ...VACIO })

  const importar = (crudo: unknown) => {
    const p = migrar(crudo)
    tiendaProgreso.fijar(p)
  }

  return {
    progreso,
    registrarRespuesta,
    registrarExamen,
    registrarSenal,
    alternarFavorita,
    guardarSesion,
    borrarTodo,
    importar,
  }
}
