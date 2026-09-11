/**
 * Progreso del estudiante. Se guarda en localStorage: la app funciona sin
 * conexión y sin cuenta de usuario.
 */
import { useCallback, useEffect, useMemo, useState } from 'react'

const CLAVE = 'via-cuba:progreso:v1'

export type EstadoPregunta = {
  /** aciertos consecutivos */
  racha: number
  aciertos: number
  fallos: number
  /** timestamp de la última vez que se respondió */
  vista: number
}

export type Examen = {
  fecha: number
  correctas: number
  total: number
  aprobado: boolean
  segundos: number
}

export type Progreso = {
  preguntas: Record<string, EstadoPregunta>
  examenes: Examen[]
  senalesVistas: string[]
}

const VACIO: Progreso = { preguntas: {}, examenes: [], senalesVistas: [] }

function leer(): Progreso {
  try {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return VACIO
    const p = JSON.parse(crudo) as Partial<Progreso>
    return {
      preguntas: p.preguntas ?? {},
      examenes: p.examenes ?? [],
      senalesVistas: p.senalesVistas ?? [],
    }
  } catch {
    return VACIO
  }
}

function escribir(p: Progreso) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(p))
  } catch {
    /* almacenamiento lleno o bloqueado: la sesión sigue funcionando en memoria */
  }
}

const oyentes = new Set<(p: Progreso) => void>()
let actual: Progreso | null = null

function estado(): Progreso {
  if (actual === null) actual = leer()
  return actual
}

function actualizar(f: (p: Progreso) => Progreso) {
  actual = f(estado())
  escribir(actual)
  oyentes.forEach((o) => o(actual!))
}

export function useProgreso() {
  const [p, setP] = useState<Progreso>(estado)

  useEffect(() => {
    oyentes.add(setP)
    return () => {
      oyentes.delete(setP)
    }
  }, [])

  const registrarRespuesta = useCallback((id: string, acierto: boolean) => {
    actualizar((prev) => {
      const ant = prev.preguntas[id] ?? { racha: 0, aciertos: 0, fallos: 0, vista: 0 }
      return {
        ...prev,
        preguntas: {
          ...prev.preguntas,
          [id]: {
            racha: acierto ? ant.racha + 1 : 0,
            aciertos: ant.aciertos + (acierto ? 1 : 0),
            fallos: ant.fallos + (acierto ? 0 : 1),
            vista: Date.now(),
          },
        },
      }
    })
  }, [])

  const registrarExamen = useCallback((e: Examen) => {
    actualizar((prev) => ({ ...prev, examenes: [e, ...prev.examenes].slice(0, 50) }))
  }, [])

  const marcarSenalVista = useCallback((id: string) => {
    actualizar((prev) =>
      prev.senalesVistas.includes(id)
        ? prev
        : { ...prev, senalesVistas: [...prev.senalesVistas, id] },
    )
  }, [])

  const borrarTodo = useCallback(() => {
    actualizar(() => ({ ...VACIO }))
  }, [])

  return { progreso: p, registrarRespuesta, registrarExamen, marcarSenalVista, borrarTodo }
}

/** Una pregunta se considera dominada con 2 aciertos consecutivos. */
export const RACHA_DOMINADA = 2

export function dominada(e?: EstadoPregunta) {
  return (e?.racha ?? 0) >= RACHA_DOMINADA
}

export function useResumenTema(temas: number[], porTema: Record<number, string[]>) {
  const { progreso } = useProgreso()
  return useMemo(() => {
    const r: Record<number, { total: number; dominadas: number; vistas: number }> = {}
    for (const t of temas) {
      const ids = porTema[t] ?? []
      r[t] = {
        total: ids.length,
        dominadas: ids.filter((id) => dominada(progreso.preguntas[id])).length,
        vistas: ids.filter((id) => progreso.preguntas[id]).length,
      }
    }
    return r
  }, [progreso, temas, porTema])
}
