import { PREGUNTAS } from '../data/preguntas'
import type { Pregunta } from '../data/preguntas'

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

/** Reglas del examen teórico simulado. */
export const EXAMEN = { preguntas: 20, aprobado: 18 }
