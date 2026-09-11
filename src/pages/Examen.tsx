import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import { PREGUNTA_POR_ID, etiquetaTema } from '../lib/datos'
import { Cuestionario } from '../components/Cuestionario'
import type { Resultado } from '../components/Cuestionario'
import { useProgreso } from '../lib/progreso'
import { useAjustes } from '../lib/ajustes'
import { Boton, Encabezado, Tarjeta } from '../components/ui'
import { barajar, fecha, mmss, pct } from '../lib/util'
import { TITULOS_TEMAS } from '../data/temas'

export default function Examen() {
  const { progreso, registrarRespuesta, registrarExamen, guardarSesion } = useProgreso()
  const { ajustes } = useAjustes()
  const [ronda, setRonda] = useState(0)
  const [corriendo, setCorriendo] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const sesion = progreso.sesion?.tipo === 'examen' ? progreso.sesion : null

  const preguntas = useMemo(() => {
    void ronda
    if (sesion && ronda === 0 && !corriendo) {
      return sesion.ids.map((id) => PREGUNTA_POR_ID[id]).filter(Boolean)
    }
    return barajar(PREGUNTAS).slice(0, ajustes.largoExamen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ronda, ajustes.largoExamen])

  function terminar(r: Resultado) {
    setResultado(r)
    setCorriendo(false)
    registrarExamen({
      fecha: Date.now(),
      correctas: r.correctas,
      total: r.total,
      aprobado: r.correctas >= ajustes.minimoAprobado,
      segundos: r.segundos,
    })
  }

  function empezar(retomar = false) {
    setResultado(null)
    if (!retomar) {
      guardarSesion(null)
      setRonda((r) => r + 1)
    }
    setCorriendo(true)
  }

  if (corriendo) {
    const retomando = sesion && ronda === 0
    return (
      <div>
        <h1 className="mb-4 text-lg font-bold text-texto">Examen simulado</h1>
        <Cuestionario
          key={ronda}
          preguntas={preguntas}
          modo="examen"
          origen="examen"
          inicial={
            retomando
              ? { indice: sesion.indice, respuestas: sesion.respuestas, segundos: sesion.segundos }
              : undefined
          }
          onRespuesta={(p, ok) => registrarRespuesta(p.id, ok)}
          onGuardar={guardarSesion}
          onTerminar={terminar}
          barajarOpciones={ajustes.barajarOpciones}
        />
      </div>
    )
  }

  if (resultado) {
    const aprobado = resultado.correctas >= ajustes.minimoAprobado
    return (
      <div>
        <Encabezado titulo="Resultado del examen" />
        <Tarjeta
          className={aprobado ? 'border-bien/40 bg-bien-suave' : 'border-mal/40 bg-mal-suave'}
        >
          <p className={`text-center text-sm font-bold ${aprobado ? 'text-bien' : 'text-mal'}`}>
            {aprobado ? 'APROBADO' : 'NO APROBADO'}
          </p>
          <p
            className={`latido mt-1 text-center text-6xl font-bold tabular-nums ${
              aprobado ? 'text-bien' : 'text-mal'
            }`}
          >
            {resultado.correctas}
            <span className="text-3xl opacity-50">/{resultado.total}</span>
          </p>
          <p className="mt-2 text-center text-sm text-suave">
            {pct(resultado.correctas, resultado.total)}% · {mmss(resultado.segundos)} ·{' '}
            {aprobado
              ? 'Superaste el mínimo'
              : `Faltaron ${ajustes.minimoAprobado - resultado.correctas} para aprobar`}
          </p>
        </Tarjeta>

        {resultado.fallos.length > 0 && (
          <section className="mt-5">
            <h2 className="mb-2 text-sm font-bold text-texto">
              Lo que fallaste ({resultado.fallos.length})
            </h2>
            <ul className="space-y-2">
              {resultado.fallos.map((p) => (
                <li key={p.id}>
                  <Tarjeta>
                    <p className="text-[11px] font-bold text-marca">
                      {etiquetaTema(p.tema)} · {TITULOS_TEMAS[p.tema]}
                    </p>
                    <p className="mt-1 text-sm leading-snug font-medium text-texto">{p.q}</p>
                    <p className="mt-2 rounded-lg bg-bien-suave p-2 text-sm text-bien">
                      {p.opciones[p.correcta]}
                    </p>
                    {p.ref && <p className="mt-1.5 text-[11px] text-tenue">{p.ref}</p>}
                  </Tarjeta>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Boton onClick={() => empezar()}>Hacer otro examen</Boton>
          <Link
            to="/practica/fallos"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-borde-fuerte bg-superficie px-4 text-sm font-semibold text-marca"
          >
            Repasar mis fallos
          </Link>
        </div>
      </div>
    )
  }

  const ultimos = progreso.examenes.slice(0, 8)
  const aprobados = progreso.examenes.filter((e) => e.aprobado).length

  return (
    <div>
      <Encabezado titulo="Examen simulado" bajada="Como el examen teórico del MININT" />

      {sesion && (
        <Tarjeta className="mb-3 border-marca/35 bg-marca-suave">
          <p className="text-sm font-bold text-texto">Tienes un examen a medias</p>
          <p className="mt-1 text-xs text-suave">
            Ibas por la pregunta {sesion.indice + 1} de {sesion.ids.length}.
          </p>
          <div className="mt-3 flex gap-2">
            <Boton onClick={() => empezar(true)}>Retomarlo</Boton>
            <Boton
              variante="fantasma"
              onClick={() => {
                guardarSesion(null)
                setRonda((r) => r + 1)
              }}
            >
              Descartar
            </Boton>
          </div>
        </Tarjeta>
      )}

      <Tarjeta>
        <ul className="space-y-2 text-sm text-texto">
          <li>
            <span className="font-bold text-marca">{ajustes.largoExamen}</span> preguntas tomadas al
            azar de los diez temas.
          </li>
          <li>
            <span className="font-bold text-marca">{ajustes.minimoAprobado}</span> respuestas
            correctas como mínimo para aprobar.
          </li>
          <li>
            <span className="font-bold text-marca">Sin</span> ver la respuesta hasta el final, y con
            el tiempo a la vista.
          </li>
        </ul>
        <Boton onClick={() => empezar()} className="mt-4 w-full">
          Empezar el examen
        </Boton>
        <p className="mt-2 text-center text-[11px] text-tenue">
          Puedes cambiar el número de preguntas en Ajustes.
        </p>
      </Tarjeta>

      {ultimos.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-2 text-sm font-bold text-texto">
            Historial · {aprobados} de {progreso.examenes.length} aprobados
          </h2>
          <Tarjeta className="p-0">
            <ul className="divide-y divide-borde">
              {ultimos.map((e) => (
                <li key={e.fecha} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-xs text-suave">{fecha(e.fecha)}</span>
                  <span className="text-xs text-tenue tabular-nums">{mmss(e.segundos)}</span>
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-bold tabular-nums ${
                      e.aprobado ? 'bg-bien-suave text-bien' : 'bg-mal-suave text-mal'
                    }`}
                  >
                    {e.correctas}/{e.total}
                  </span>
                </li>
              ))}
            </ul>
          </Tarjeta>
        </section>
      )}
    </div>
  )
}
