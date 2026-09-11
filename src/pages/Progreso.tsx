import { useState } from 'react'
import { PREGUNTAS } from '../data/preguntas'
import { IDS_POR_TEMA, TEMAS_CON_PREGUNTAS, EXAMEN } from '../lib/datos'
import { TITULOS_TEMAS } from '../data/temas'
import { dominada, useProgreso } from '../lib/progreso'
import { Barra, Boton, BotonEnlace, Encabezado, Tarjeta } from '../components/ui'
import { fecha, mmss, pct } from '../lib/util'

export default function Progreso() {
  const { progreso, borrarTodo } = useProgreso()
  const [confirmar, setConfirmar] = useState(false)

  const respondidas = Object.keys(progreso.preguntas).length
  const dominadas = PREGUNTAS.filter((p) => dominada(progreso.preguntas[p.id])).length
  const pendientes = Object.values(progreso.preguntas).filter((e) => e.fallos > 0 && e.racha < 2).length
  const totalAciertos = Object.values(progreso.preguntas).reduce((a, e) => a + e.aciertos, 0)
  const totalFallos = Object.values(progreso.preguntas).reduce((a, e) => a + e.fallos, 0)

  return (
    <div>
      <Encabezado titulo="Progreso" bajada="Todo se guarda en este dispositivo" />

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Metrica valor={`${pct(dominadas, PREGUNTAS.length)}%`} etiqueta="dominado" />
        <Metrica valor={String(respondidas)} etiqueta={`de ${PREGUNTAS.length} vistas`} />
        <Metrica
          valor={totalAciertos + totalFallos ? `${pct(totalAciertos, totalAciertos + totalFallos)}%` : '—'}
          etiqueta="de acierto"
        />
      </div>

      {pendientes > 0 && (
        <Tarjeta className="mb-5 border-amber-200 bg-amber-50">
          <p className="text-sm font-semibold text-amber-900">
            {pendientes} {pendientes === 1 ? 'pregunta pendiente' : 'preguntas pendientes'}
          </p>
          <p className="mt-1 text-xs text-amber-800/80">
            Las has fallado alguna vez y aún no las has acertado dos veces seguidas.
          </p>
          <BotonEnlace to="/practica/fallos" className="mt-3">
            Repasarlas ahora
          </BotonEnlace>
        </Tarjeta>
      )}

      <section className="mb-5">
        <h2 className="mb-2 text-sm font-bold text-slate-800">Por tema</h2>
        <Tarjeta className="space-y-3">
          {TEMAS_CON_PREGUNTAS.map((t) => {
            const ids = IDS_POR_TEMA[t]
            const d = ids.filter((id) => dominada(progreso.preguntas[id])).length
            return (
              <div key={t}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <p className="truncate text-xs font-medium text-slate-700">
                    <span className="font-bold text-marca-700">{t === 6 ? '6·7' : t}</span>{' '}
                    {TITULOS_TEMAS[t]}
                  </p>
                  <span className="shrink-0 text-[11px] text-slate-400 tabular-nums">
                    {d}/{ids.length}
                  </span>
                </div>
                <Barra valor={d} total={ids.length} />
              </div>
            )
          })}
        </Tarjeta>
      </section>

      <section className="mb-5">
        <h2 className="mb-2 text-sm font-bold text-slate-800">Exámenes</h2>
        {progreso.examenes.length === 0 ? (
          <Tarjeta>
            <p className="text-sm text-slate-600">Todavía no has hecho ningún examen simulado.</p>
            <BotonEnlace to="/examen" className="mt-3">
              Hacer el primero
            </BotonEnlace>
          </Tarjeta>
        ) : (
          <Tarjeta className="p-0">
            <ul className="divide-y divide-slate-100">
              {progreso.examenes.slice(0, 12).map((e) => (
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
        )}
        <p className="mt-2 text-[11px] text-slate-400">
          Se aprueba con {EXAMEN.aprobado} de {EXAMEN.preguntas} respuestas correctas.
        </p>
      </section>

      <Tarjeta>
        <p className="text-sm font-semibold text-slate-800">Empezar de cero</p>
        <p className="mt-1 text-xs text-slate-500">
          Borra las respuestas guardadas y el historial de exámenes de este dispositivo.
        </p>
        {confirmar ? (
          <div className="mt-3 flex gap-2">
            <Boton
              variante="peligro"
              onClick={() => {
                borrarTodo()
                setConfirmar(false)
              }}
            >
              Sí, borrar todo
            </Boton>
            <Boton variante="fantasma" onClick={() => setConfirmar(false)}>
              Cancelar
            </Boton>
          </div>
        ) : (
          <Boton variante="peligro" className="mt-3" onClick={() => setConfirmar(true)}>
            Borrar mi progreso
          </Boton>
        )}
      </Tarjeta>
    </div>
  )
}

function Metrica({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
      <p className="text-xl font-bold text-marca-700 tabular-nums">{valor}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-slate-500">{etiqueta}</p>
    </div>
  )
}
