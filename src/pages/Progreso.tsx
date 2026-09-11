import { useMemo } from 'react'
import { PREGUNTAS } from '../data/preguntas'
import { SENALES } from '../data/senales'
import { IDS_POR_TEMA, TEMAS_CON_PREGUNTAS, contarDominadas, pendientesDeRepaso } from '../lib/datos'
import { TITULOS_TEMAS } from '../data/temas'
import { calcularRacha, hoy, useProgreso } from '../lib/progreso'
import { useAjustes } from '../lib/ajustes'
import { Barra, BotonEnlace, Encabezado, Metrica, Tarjeta } from '../components/ui'
import { fecha, mmss, pct } from '../lib/util'

export default function Progreso() {
  const { progreso } = useProgreso()
  const { ajustes } = useAjustes()

  const dominadas = PREGUNTAS.filter((p) => (progreso.preguntas[p.id]?.caja ?? 0) >= 3).length
  const respondidas = Object.keys(progreso.preguntas).length
  const repaso = pendientesDeRepaso(progreso).length
  const racha = calcularRacha(progreso.porDia)
  const aciertos = Object.values(progreso.preguntas).reduce((a, e) => a + e.aciertos, 0)
  const fallos = Object.values(progreso.preguntas).reduce((a, e) => a + e.fallos, 0)
  const senalesVistas = Object.keys(progreso.senales).length

  const semana = useMemo(() => {
    const dias = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dias.push({
        clave: hoy(d),
        etiqueta: d.toLocaleDateString('es', { weekday: 'narrow' }),
        n: progreso.porDia[hoy(d)] ?? 0,
      })
    }
    return dias
  }, [progreso.porDia])

  const tope = Math.max(ajustes.metaDiaria, ...semana.map((d) => d.n), 1)

  return (
    <div>
      <Encabezado titulo="Progreso" bajada="Todo se guarda en este dispositivo" />

      <div className="mb-4 grid grid-cols-3 gap-2">
        <Metrica valor={`${pct(dominadas, PREGUNTAS.length)}%`} etiqueta="dominado" />
        <Metrica valor={racha === 0 ? '—' : racha} etiqueta="días seguidos" />
        <Metrica
          valor={aciertos + fallos ? `${pct(aciertos, aciertos + fallos)}%` : '—'}
          etiqueta="de acierto"
        />
      </div>

      <Tarjeta className="mb-4">
        <p className="text-sm font-semibold text-texto">Últimos siete días</p>
        <div className="mt-4 flex h-24 items-end justify-between gap-2">
          {semana.map((d) => (
            <div key={d.clave} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-suave tabular-nums">
                {d.n || ''}
              </span>
              <div
                className={`w-full rounded-md transition-[height] duration-500 ${
                  d.n >= ajustes.metaDiaria ? 'bg-bien' : d.n > 0 ? 'bg-marca' : 'bg-superficie-2'
                }`}
                style={{ height: `${Math.max(4, (d.n / tope) * 64)}px` }}
              />
              <span className="text-[10px] text-tenue uppercase">{d.etiqueta}</span>
            </div>
          ))}
        </div>
      </Tarjeta>

      {repaso > 0 && (
        <Tarjeta className="mb-4 border-aviso/35 bg-aviso-suave">
          <p className="text-sm font-bold text-texto">
            {repaso} {repaso === 1 ? 'pregunta toca' : 'preguntas tocan'} hoy
          </p>
          <p className="mt-1 text-xs text-suave">
            El repaso te devuelve cada pregunta justo antes de que se te olvide.
          </p>
          <BotonEnlace to="/practica/repaso" className="mt-3">
            Empezar el repaso
          </BotonEnlace>
        </Tarjeta>
      )}

      <section className="mb-4">
        <h2 className="mb-2 text-sm font-bold text-texto">Por tema</h2>
        <Tarjeta className="space-y-3">
          {TEMAS_CON_PREGUNTAS.map((t) => {
            const ids = IDS_POR_TEMA[t]
            const d = contarDominadas(ids, progreso)
            return (
              <div key={t}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <p className="truncate text-xs font-medium text-texto">
                    <span className="font-bold text-marca">{t === 6 ? '6·7' : t}</span>{' '}
                    {TITULOS_TEMAS[t]}
                  </p>
                  <span className="shrink-0 text-[11px] text-tenue tabular-nums">
                    {d}/{ids.length}
                  </span>
                </div>
                <Barra valor={d} total={ids.length} />
              </div>
            )
          })}
        </Tarjeta>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-sm font-bold text-texto">Señales</h2>
        <Tarjeta>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-texto">Entrenador</p>
              <p className="text-xs text-suave">
                {senalesVistas} de {SENALES.length} señales practicadas
              </p>
            </div>
            <p className="text-xl font-bold text-marca tabular-nums">
              {pct(senalesVistas, SENALES.length)}%
            </p>
          </div>
          <div className="mt-3">
            <Barra valor={senalesVistas} total={SENALES.length} />
          </div>
          <BotonEnlace to="/entrenador" variante="secundario" className="mt-3 w-full">
            Entrenar señales
          </BotonEnlace>
        </Tarjeta>
      </section>

      <section className="mb-4">
        <h2 className="mb-2 text-sm font-bold text-texto">Exámenes</h2>
        {progreso.examenes.length === 0 ? (
          <Tarjeta>
            <p className="text-sm text-suave">Todavía no has hecho ningún examen simulado.</p>
            <BotonEnlace to="/examen" className="mt-3">
              Hacer el primero
            </BotonEnlace>
          </Tarjeta>
        ) : (
          <Tarjeta className="p-0">
            <ul className="divide-y divide-borde">
              {progreso.examenes.slice(0, 12).map((e) => (
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
        )}
      </section>

      <p className="text-[11px] leading-snug text-tenue">
        Has respondido {respondidas} preguntas distintas de {PREGUNTAS.length}. Se aprueba el examen
        con {ajustes.minimoAprobado} de {ajustes.largoExamen}. Puedes guardar una copia de tu
        progreso desde Ajustes.
      </p>
    </div>
  )
}
