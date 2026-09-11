import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Pregunta } from '../data/preguntas'
import type { Sesion } from '../lib/progreso'
import { FilaSenales, Senal } from './Senal'
import { Boton, Tarjeta } from './ui'
import { barajar, mmss, pct } from '../lib/util'
import { vibrarAcierto, vibrarFallo, vibrarToque } from '../lib/nativo'

export type Resultado = {
  correctas: number
  total: number
  segundos: number
  fallos: Pregunta[]
}

type Props = {
  preguntas: Pregunta[]
  /** en el examen no se revela la respuesta hasta el final y corre el reloj */
  modo: 'practica' | 'examen'
  /** identifica la sesión para poder retomarla (tema, 'fallos', 'repaso'…) */
  origen: string
  /** estado con el que se retoma una sesión interrumpida */
  inicial?: { indice: number; respuestas: (number | null)[]; segundos: number }
  onRespuesta?: (p: Pregunta, acierto: boolean) => void
  onGuardar?: (s: Sesion | null) => void
  onTerminar: (r: Resultado) => void
  /** presenta las opciones en otro orden para no memorizar posiciones */
  barajarOpciones?: boolean
}

export function Cuestionario({
  preguntas,
  modo,
  origen,
  inicial,
  onRespuesta,
  onGuardar,
  onTerminar,
  barajarOpciones = false,
}: Props) {
  const [i, setI] = useState(inicial?.indice ?? 0)
  const [elegida, setElegida] = useState<number | null>(null)
  const [respuestas, setRespuestas] = useState<(number | null)[]>(
    inicial?.respuestas ?? Array(preguntas.length).fill(null),
  )
  const [segundos, setSegundos] = useState(inicial?.segundos ?? 0)
  const base = useRef(Date.now() - (inicial?.segundos ?? 0) * 1000)
  const tope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modo !== 'examen') return
    const t = setInterval(() => setSegundos(Math.floor((Date.now() - base.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [modo])

  const p = preguntas[i]
  const revelada = modo === 'practica' && elegida !== null

  // «orden» traduce la posición en pantalla al índice real de la opción, de
  // modo que la respuesta correcta siga siendo la misma aunque se barajen.
  const orden = useMemo(() => {
    const idx = (p?.opciones ?? []).map((_, k) => k)
    return barajarOpciones ? barajar(idx) : idx
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p?.id, barajarOpciones])

  const contestadas = respuestas.filter((r) => r !== null).length + (revelada ? 1 : 0)
  const correctas = useMemo(
    () =>
      respuestas.filter((r, idx) => r !== null && r === preguntas[idx]?.correcta).length +
      (revelada && elegida === p?.correcta ? 1 : 0),
    [respuestas, preguntas, revelada, elegida, p],
  )

  // Guarda la sesión en cada avance para poder cerrar la app sin perder nada.
  const guardar = useCallback(
    (indice: number, rs: (number | null)[]) => {
      onGuardar?.({
        tipo: modo,
        origen,
        ids: preguntas.map((q) => q.id),
        respuestas: rs,
        indice,
        iniciada: base.current,
        segundos: Math.floor((Date.now() - base.current) / 1000),
      })
    },
    [modo, origen, preguntas, onGuardar],
  )

  function elegir(idx: number) {
    if (elegida !== null) return
    setElegida(idx)
    if (modo === 'practica') {
      const acierto = idx === p.correcta
      onRespuesta?.(p, acierto)
      void (acierto ? vibrarAcierto() : vibrarFallo())
    } else {
      void vibrarToque()
    }
  }

  function siguiente() {
    if (elegida === null) return
    const nuevas = respuestas.slice()
    nuevas[i] = elegida
    setRespuestas(nuevas)
    if (modo === 'examen') onRespuesta?.(p, elegida === p.correcta)

    if (i + 1 >= preguntas.length) {
      onGuardar?.(null)
      onTerminar({
        correctas: nuevas.filter((r, idx) => r === preguntas[idx].correcta).length,
        total: preguntas.length,
        segundos: Math.floor((Date.now() - base.current) / 1000),
        fallos: preguntas.filter((q, idx) => nuevas[idx] !== q.correcta),
      })
      return
    }
    guardar(i + 1, nuevas)
    setI(i + 1)
    setElegida(null)
    tope.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  if (!p) return null

  const ilustraciones = [...(p.senales ?? []), ...(p.marca ? [p.marca] : [])]
  const soloMarca = Boolean(p.marca) && !p.senales?.length
  const letras = ['A', 'B', 'C', 'D']

  return (
    <div ref={tope} className="scroll-mt-4">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-texto">
          {i + 1} <span className="font-normal text-tenue">de {preguntas.length}</span>
        </span>
        {modo === 'examen' ? (
          <span className="rounded-lg bg-superficie-2 px-2 py-1 font-mono text-xs font-semibold text-suave tabular-nums">
            {mmss(segundos)}
          </span>
        ) : (
          <span className="text-suave">
            {correctas}/{contestadas} correctas
          </span>
        )}
      </div>

      <div className="mb-4">
        <Barrita valor={i} total={preguntas.length} />
      </div>

      <Tarjeta className="mb-3">
        {ilustraciones.length > 0 && (
          <div className="mb-4 rounded-xl bg-superficie-2 p-4">
            {soloMarca ? (
              <div className="mx-auto max-w-xs overflow-hidden rounded-lg">
                <Senal id={p.marca!} size={240} className="w-full" />
              </div>
            ) : (
              <FilaSenales ids={ilustraciones} size={84} />
            )}
          </div>
        )}
        <h2 className="text-[15px] leading-snug font-semibold text-balance text-texto">{p.q}</h2>
      </Tarjeta>

      <ul className="space-y-2">
        {orden.map((idx, pos) => {
          const o = p.opciones[idx]
          const esCorrecta = idx === p.correcta
          const esElegida = idx === elegida
          let caja = 'border-borde bg-superficie hover:border-marca/50'
          let ficha = 'bg-superficie-2 text-suave'
          if (revelada && esCorrecta) {
            caja = 'border-bien bg-bien-suave'
            ficha = 'bg-bien text-sobre-bien'
          } else if (revelada && esElegida) {
            caja = 'border-mal bg-mal-suave'
            ficha = 'bg-mal text-sobre-mal'
          } else if (revelada) {
            caja = 'border-borde bg-superficie opacity-55'
          } else if (esElegida) {
            caja = 'border-marca bg-marca-suave'
            ficha = 'bg-marca text-sobre-marca'
          }

          return (
            <li key={idx}>
              <button
                onClick={() => elegir(idx)}
                disabled={elegida !== null}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left transition-all active:scale-[.99] ${caja}`}
              >
                <span
                  className={`mt-px flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${ficha}`}
                >
                  {letras[pos]}
                </span>
                <span className="text-sm leading-snug text-texto">{o}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {revelada && (
        <div
          className={`aparecer mt-3 rounded-xl border p-3 text-sm ${
            elegida === p.correcta
              ? 'border-bien/35 bg-bien-suave text-bien'
              : 'border-aviso/35 bg-aviso-suave text-aviso'
          }`}
        >
          <p className="font-bold">
            {elegida === p.correcta
              ? '¡Correcto!'
              : `Respuesta correcta: ${letras[orden.indexOf(p.correcta)]}`}
          </p>
          {elegida !== p.correcta && (
            <p className="mt-1 leading-snug text-texto">{p.opciones[p.correcta]}</p>
          )}
          {p.ref && <p className="mt-2 text-xs opacity-80">{p.ref}</p>}
        </div>
      )}

      <div className="sticky bottom-16 z-10 -mx-4 mt-4 bg-gradient-to-t from-fondo via-fondo to-transparent px-4 pt-6 pb-3">
        <Boton onClick={siguiente} disabled={elegida === null} className="w-full shadow-lg">
          {i + 1 >= preguntas.length ? 'Terminar' : 'Siguiente'}
        </Boton>
      </div>
    </div>
  )
}

function Barrita({ valor, total }: { valor: number; total: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-superficie-2">
      <div
        className="h-full rounded-full bg-marca transition-[width] duration-300"
        style={{ width: `${pct(valor, total)}%` }}
      />
    </div>
  )
}
