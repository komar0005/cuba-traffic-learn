import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import { EXAMEN } from '../lib/datos'
import { Cuestionario } from '../components/Cuestionario'
import type { Resultado } from '../components/Cuestionario'
import { useProgreso } from '../lib/progreso'
import { Boton, Encabezado, Tarjeta } from '../components/ui'
import { barajar, fecha, mmss, pct } from '../lib/util'
import { TITULOS_TEMAS } from '../data/temas'

export default function Examen() {
  const { progreso, registrarRespuesta, registrarExamen } = useProgreso()
  const [ronda, setRonda] = useState(0)
  const [corriendo, setCorriendo] = useState(false)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const preguntas = useMemo(() => {
    void ronda
    return barajar(PREGUNTAS).slice(0, EXAMEN.preguntas)
  }, [ronda])

  function terminar(r: Resultado) {
    setResultado(r)
    setCorriendo(false)
    registrarExamen({
      fecha: Date.now(),
      correctas: r.correctas,
      total: r.total,
      aprobado: r.correctas >= EXAMEN.aprobado,
      segundos: r.segundos,
    })
  }

  function empezar() {
    setResultado(null)
    setRonda((r) => r + 1)
    setCorriendo(true)
  }

  if (corriendo) {
    return (
      <div>
        <h1 className="mb-4 text-lg font-bold text-slate-900">Examen simulado</h1>
        <Cuestionario
          key={ronda}
          preguntas={preguntas}
          modo="examen"
          onRespuesta={(p, ok) => registrarRespuesta(p.id, ok)}
          onTerminar={terminar}
        />
      </div>
    )
  }

  if (resultado) {
    const aprobado = resultado.correctas >= EXAMEN.aprobado
    return (
      <div>
        <Encabezado titulo="Resultado del examen" />
        <Tarjeta className={aprobado ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'}>
          <p className={`text-center text-sm font-bold ${aprobado ? 'text-emerald-800' : 'text-red-800'}`}>
            {aprobado ? 'APROBADO' : 'NO APROBADO'}
          </p>
          <p
            className={`mt-1 text-center text-6xl font-bold tabular-nums ${
              aprobado ? 'text-emerald-700' : 'text-red-700'
            }`}
          >
            {resultado.correctas}
            <span className="text-3xl opacity-50">/{resultado.total}</span>
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            {pct(resultado.correctas, resultado.total)}% · {mmss(resultado.segundos)} ·{' '}
            {aprobado
              ? 'Superaste el mínimo'
              : `Faltaron ${EXAMEN.aprobado - resultado.correctas} para aprobar`}
          </p>
        </Tarjeta>

        {resultado.fallos.length > 0 && (
          <section className="mt-5">
            <h2 className="mb-2 text-sm font-bold text-slate-800">
              Lo que fallaste ({resultado.fallos.length})
            </h2>
            <ul className="space-y-2">
              {resultado.fallos.map((p) => (
                <li key={p.id}>
                  <Tarjeta>
                    <p className="text-[11px] font-semibold text-marca-700">
                      {p.tema === 6 ? 'Temas 6 y 7' : `Tema ${p.tema}`} · {TITULOS_TEMAS[p.tema]}
                    </p>
                    <p className="mt-1 text-sm leading-snug font-medium text-slate-900">{p.q}</p>
                    <p className="mt-2 rounded-lg bg-emerald-50 p-2 text-sm text-emerald-900">
                      {p.opciones[p.correcta]}
                    </p>
                    {p.ref && <p className="mt-1.5 text-[11px] text-slate-500">{p.ref}</p>}
                  </Tarjeta>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <Boton onClick={empezar}>Hacer otro examen</Boton>
          <Link
            to="/practica/fallos"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-marca-200 bg-white px-4 text-sm font-semibold text-marca-800"
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
      <Tarjeta>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="font-semibold text-marca-700">{EXAMEN.preguntas}</span> preguntas tomadas al azar
            de los diez temas.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-marca-700">{EXAMEN.aprobado}</span> respuestas correctas como
            mínimo para aprobar.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-marca-700">Sin</span> ver la respuesta hasta el final, y con
            el tiempo a la vista.
          </li>
        </ul>
        <Boton onClick={empezar} className="mt-4 w-full">
          Empezar el examen
        </Boton>
      </Tarjeta>

      {ultimos.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-2 text-sm font-bold text-slate-800">
            Historial · {aprobados} de {progreso.examenes.length} aprobados
          </h2>
          <Tarjeta className="p-0">
            <ul className="divide-y divide-slate-100">
              {ultimos.map((e) => (
                <li key={e.fecha} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-xs text-slate-500">{fecha(e.fecha)}</span>
                  <span className="text-xs text-slate-400 tabular-nums">{mmss(e.segundos)}</span>
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-bold tabular-nums ${
                      e.aprobado ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
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
