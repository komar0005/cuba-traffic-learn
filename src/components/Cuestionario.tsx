import { useEffect, useMemo, useRef, useState } from 'react'
import type { Pregunta } from '../data/preguntas'
import { FilaSenales, Senal } from './Senal'
import { Boton, Tarjeta } from './ui'
import { mmss, pct } from '../lib/util'

export type Resultado = {
  correctas: number
  total: number
  segundos: number
  fallos: Pregunta[]
}

type Props = {
  preguntas: Pregunta[]
  /** modo examen: no revela el resultado hasta el final y lleva reloj */
  modo: 'practica' | 'examen'
  onRespuesta?: (p: Pregunta, acierto: boolean) => void
  onTerminar: (r: Resultado) => void
  etiqueta?: string
}

export function Cuestionario({ preguntas, modo, onRespuesta, onTerminar, etiqueta }: Props) {
  const [i, setI] = useState(0)
  const [elegida, setElegida] = useState<number | null>(null)
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [segundos, setSegundos] = useState(0)
  const inicio = useRef(Date.now())
  const tope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modo !== 'examen') return
    const t = setInterval(() => setSegundos(Math.floor((Date.now() - inicio.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [modo])

  const p = preguntas[i]
  const revelada = modo === 'practica' && elegida !== null
  // En práctica la respuesta actual ya cuenta: se revela en el momento.
  const contestadas = respuestas.length + (revelada ? 1 : 0)
  const correctas = useMemo(
    () =>
      respuestas.filter((r, idx) => r === preguntas[idx]?.correcta).length +
      (revelada && elegida === p?.correcta ? 1 : 0),
    [respuestas, preguntas, revelada, elegida, p],
  )

  function elegir(idx: number) {
    if (elegida !== null) return
    setElegida(idx)
    if (modo === 'practica') onRespuesta?.(p, idx === p.correcta)
  }

  function siguiente() {
    if (elegida === null) return
    const nuevas = [...respuestas, elegida]
    setRespuestas(nuevas)
    if (modo === 'examen') onRespuesta?.(p, elegida === p.correcta)

    if (i + 1 >= preguntas.length) {
      const fallos = preguntas.filter((q, idx) => nuevas[idx] !== q.correcta)
      onTerminar({
        correctas: nuevas.filter((r, idx) => r === preguntas[idx].correcta).length,
        total: preguntas.length,
        segundos: Math.floor((Date.now() - inicio.current) / 1000),
        fallos,
      })
      return
    }
    setI(i + 1)
    setElegida(null)
    tope.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  if (!p) return null

  const ilustraciones = [...(p.senales ?? []), ...(p.marca ? [p.marca] : [])]

  return (
    <div ref={tope} className="scroll-mt-4">
      <div className="mb-3 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-700">
          {etiqueta ? `${etiqueta} · ` : ''}
          {i + 1} <span className="font-normal text-slate-400">de {preguntas.length}</span>
        </span>
        {modo === 'examen' ? (
          <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-600 tabular-nums">
            {mmss(segundos)}
          </span>
        ) : (
          <span className="text-slate-500">
            {correctas}/{contestadas} correctas
          </span>
        )}
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-marca-600 transition-[width] duration-300"
          style={{ width: `${pct(i, preguntas.length)}%` }}
        />
      </div>

      <Tarjeta className="mb-3">
        {ilustraciones.length > 0 && (
          <div className="mb-4 rounded-xl bg-slate-50 p-4">
            {p.marca && !p.senales?.length ? (
              <div className="mx-auto max-w-xs overflow-hidden rounded-lg">
                <Senal id={p.marca} size={240} className="w-full" />
              </div>
            ) : (
              <FilaSenales ids={ilustraciones} size={84} />
            )}
          </div>
        )}
        <h2 className="text-[15px] leading-snug font-semibold text-balance text-slate-900">{p.q}</h2>
      </Tarjeta>

      <ul className="space-y-2">
        {p.opciones.map((o, idx) => {
          const esCorrecta = idx === p.correcta
          const esElegida = idx === elegida
          let estilo = 'border-slate-200 bg-white hover:border-marca-300 hover:bg-marca-50/50'
          if (revelada && esCorrecta) estilo = 'border-emerald-400 bg-emerald-50'
          else if (revelada && esElegida) estilo = 'border-red-400 bg-red-50'
          else if (revelada) estilo = 'border-slate-200 bg-white opacity-60'
          else if (esElegida) estilo = 'border-marca-500 bg-marca-50 ring-2 ring-marca-200'

          return (
            <li key={idx}>
              <button
                onClick={() => elegir(idx)}
                disabled={elegida !== null}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors ${estilo}`}
              >
                <span
                  className={`mt-px flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    revelada && esCorrecta
                      ? 'bg-emerald-600 text-white'
                      : revelada && esElegida
                        ? 'bg-red-600 text-white'
                        : esElegida
                          ? 'bg-marca-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                <span className="text-sm leading-snug text-slate-800">{o}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {revelada && (
        <div
          className={`mt-3 rounded-xl border p-3 text-sm ${
            elegida === p.correcta
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-amber-200 bg-amber-50 text-amber-900'
          }`}
        >
          <p className="font-semibold">
            {elegida === p.correcta ? '¡Correcto!' : 'Respuesta correcta: ' + ['A', 'B', 'C'][p.correcta]}
          </p>
          {elegida !== p.correcta && <p className="mt-1 leading-snug">{p.opciones[p.correcta]}</p>}
          {p.ref && <p className="mt-2 text-xs opacity-75">{p.ref}</p>}
        </div>
      )}

      <div className="sticky bottom-16 z-10 -mx-4 mt-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent px-4 pt-6 pb-3">
        <Boton onClick={siguiente} disabled={elegida === null} className="w-full shadow-lg shadow-marca-900/15">
          {i + 1 >= preguntas.length ? 'Terminar' : 'Siguiente'}
        </Boton>
      </div>
    </div>
  )
}
