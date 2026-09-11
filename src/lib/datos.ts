import { PREGUNTAS } from '../data/preguntas'
import type { Pregunta } from '../data/preguntas'
import type { Progreso } from './progreso'
import { dominada, tocaRepasar } from './progreso'

export const TEMAS_CON_PREGUNTAS = [...new Set(PREGUNTAS.map((p) => p.tema))].sort((a, b) => a - b)

export const PREGUNTAS_POR_TEMA: Record<number, Pregunta[]> = Object.fromEntries(
  TEMAS_CON_PREGUNTAS.map((t) => [t, PREGUNTAS.filter((p) => p.tema === t)]),
)

export const IDS_POR_TEMA: Record<number, string[]> = Object.fromEntries(
  TEMAS_CON_PREGUNTAS.map((t) => [t, PREGUNTAS_POR_TEMA[t].map((p) => p.id)]),
)

export const PREGUNTA_POR_ID: Record<string, Pregunta> = Object.fromEntries(
  PREGUNTAS.map((p) => [p.id, p]),
)

/** Preguntas que ya tocan repasar según las cajas de Leitner. */
export function pendientesDeRepaso(progreso: Progreso, ahora = Date.now()) {
  return PREGUNTAS.filter((p) => tocaRepasar(progreso.preguntas[p.id], ahora))
}

/** Preguntas que aún no se han visto nunca. */
export function sinVer(progreso: Progreso) {
  return PREGUNTAS.filter((p) => !progreso.preguntas[p.id])
}

export function contarDominadas(ids: string[], progreso: Progreso) {
  return ids.filter((id) => dominada(progreso.preguntas[id])).length
}

export function etiquetaTema(t: number) {
  return t === 6 ? 'Temas 6 y 7' : `Tema ${t}`
}
