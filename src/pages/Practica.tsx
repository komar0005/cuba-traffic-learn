import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Cuestionario } from '../components/Cuestionario'
import type { Resultado } from '../components/Cuestionario'
import { IDS_POR_TEMA, PREGUNTAS_POR_TEMA, TEMAS_CON_PREGUNTAS } from '../lib/datos'
import { TITULOS_TEMAS, TEMA_POR_NUMERO } from '../data/temas'
import { dominada, useProgreso } from '../lib/progreso'
import { Barra, Boton, BotonEnlace, Encabezado, Tarjeta, Vacio } from '../components/ui'
import { barajar, pct } from '../lib/util'

export function ListaPractica() {
  const { progreso } = useProgreso()
  return (
    <div>
      <Encabezado titulo="Práctica" bajada="Elige un tema y responde con la respuesta al momento" />
      <div className="space-y-2">
        {TEMAS_CON_PREGUNTAS.map((t) => {
          const ids = IDS_POR_TEMA[t]
          const d = ids.filter((id) => dominada(progreso.preguntas[id])).length
          return (
            <Link
              key={t}
              to={`/practica/${t}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-marca-300"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-marca-50 text-sm font-bold text-marca-700">
                {t === 6 ? '6·7' : t}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-tight font-semibold text-slate-900">{TITULOS_TEMAS[t]}</p>
                <div className="mt-2">
                  <Barra valor={d} total={ids.length} />
                </div>
              </div>
              <span className="shrink-0 text-xs font-semibold text-slate-500 tabular-nums">
                {d}/{ids.length}
              </span>
            </Link>
          )
        })}
      </div>

      <Tarjeta className="mt-4 border-marca-200 bg-marca-50/60">
        <p className="text-sm font-semibold text-marca-900">Repasar lo que fallo</p>
        <p className="mt-1 text-xs leading-snug text-marca-800/80">
          Repite solo las preguntas que has respondido mal alguna vez.
        </p>
        <BotonEnlace to="/practica/fallos" variante="primario" className="mt-3">
          Ir al repaso
        </BotonEnlace>
      </Tarjeta>
    </div>
  )
}

export default function Practica() {
  const { tema } = useParams()
  const navigate = useNavigate()
  const { progreso, registrarRespuesta } = useProgreso()
  const [ronda, setRonda] = useState(0)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const esFallos = tema === 'fallos'
  const num = Number(tema)

  const preguntas = useMemo(() => {
    void ronda
    if (esFallos) {
      const fallidas = Object.entries(progreso.preguntas)
        .filter(([, e]) => e.fallos > 0 && e.racha < 2)
        .map(([id]) => id)
      return barajar(
        TEMAS_CON_PREGUNTAS.flatMap((t) => PREGUNTAS_POR_TEMA[t]).filter((p) => fallidas.includes(p.id)),
      )
    }
    return barajar(PREGUNTAS_POR_TEMA[num] ?? [])
    // La lista se congela al montar cada ronda a propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, esFallos, ronda])

  if (!esFallos && !PREGUNTAS_POR_TEMA[num]) {
    return <Vacio titulo="Tema no encontrado" texto="Vuelve a la lista de temas para elegir uno." />
  }

  if (esFallos && preguntas.length === 0) {
    return (
      <div>
        <Encabezado titulo="Repaso de fallos" />
        <Vacio
          titulo="No tienes nada pendiente"
          texto="Cuando falles una pregunta en la práctica o en un examen aparecerá aquí hasta que la aciertes dos veces seguidas."
        />
        <div className="mt-4">
          <BotonEnlace to="/practica" variante="secundario">
            Volver a los temas
          </BotonEnlace>
        </div>
      </div>
    )
  }

  const titulo = esFallos ? 'Repaso de fallos' : TITULOS_TEMAS[num]
  const t = esFallos ? null : TEMA_POR_NUMERO[num]

  if (resultado) {
    return (
      <div>
        <Encabezado titulo={titulo} />
        <Tarjeta className="text-center">
          <p className="text-5xl font-bold text-marca-700 tabular-nums">
            {pct(resultado.correctas, resultado.total)}%
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {resultado.correctas} de {resultado.total} correctas
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Boton
              onClick={() => {
                setResultado(null)
                setRonda((r) => r + 1)
              }}
            >
              Repetir el tema
            </Boton>
            {resultado.fallos.length > 0 && (
              <Boton variante="secundario" onClick={() => navigate('/practica/fallos')}>
                Repasar las {resultado.fallos.length} que fallé
              </Boton>
            )}
            <Boton variante="fantasma" onClick={() => navigate('/practica')}>
              Elegir otro tema
            </Boton>
          </div>
        </Tarjeta>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <Link to="/practica" className="text-xs font-semibold text-marca-700">
          ← Temas
        </Link>
        <h1 className="mt-1 text-lg leading-tight font-bold text-slate-900">{titulo}</h1>
        {t && (
          <Link
            to={`/teoria/${t.numero}`}
            className="mt-1 inline-block text-xs font-semibold text-marca-700"
          >
            Leer la teoría de este tema →
          </Link>
        )}
      </div>
      <Cuestionario
        key={ronda}
        preguntas={preguntas}
        modo="practica"
        onRespuesta={(p, ok) => registrarRespuesta(p.id, ok)}
        onTerminar={setResultado}
      />
    </div>
  )
}
