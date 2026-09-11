import { useCallback, useEffect, useMemo, useState } from 'react'
import { GRUPOS, SENALES } from '../data/senales'
import type { Grupo, Senal as TSenal } from '../data/senales'
import { Senal } from '../components/Senal'
import { Boton, Encabezado, Segmentado, Tarjeta } from '../components/ui'
import { barajar, pct } from '../lib/util'
import { useProgreso } from '../lib/progreso'
import { vibrarAcierto, vibrarFallo } from '../lib/nativo'

type Ronda = { senal: TSenal; opciones: TSenal[] }

/** Reconoce una señal entre cuatro nombres posibles. */
export default function Entrenador() {
  const { progreso, registrarSenal } = useProgreso()
  const [grupo, setGrupo] = useState<Grupo | 'todos'>('todos')
  const [modo, setModo] = useState<'dibujo' | 'nombre'>('dibujo')
  const [ronda, setRonda] = useState<Ronda | null>(null)
  const [elegida, setElegida] = useState<TSenal | null>(null)
  const [marcador, setMarcador] = useState({ aciertos: 0, total: 0 })

  const candidatas = useMemo(
    () => (grupo === 'todos' ? SENALES : SENALES.filter((s) => s.grupo === grupo)),
    [grupo],
  )

  const nuevaRonda = useCallback(() => {
    if (candidatas.length < 4) {
      setRonda(null)
      return
    }
    // Se prioriza lo que peor se recuerda, con algo de azar para no repetir.
    const puntuadas = candidatas.map((s) => {
      const e = progreso.senales[s.id]
      const fallos = e?.fallos ?? 0
      const aciertos = e?.aciertos ?? 0
      return { s, peso: fallos * 3 - aciertos + Math.random() * 4 }
    })
    puntuadas.sort((a, b) => b.peso - a.peso)
    const senal = puntuadas[Math.floor(Math.random() * Math.min(8, puntuadas.length))].s
    const distractores = barajar(candidatas.filter((s) => s.id !== senal.id)).slice(0, 3)
    setRonda({ senal, opciones: barajar([senal, ...distractores]) })
    setElegida(null)
  }, [candidatas, progreso.senales])

  useEffect(() => {
    nuevaRonda()
    // Solo al cambiar el grupo o el modo: dentro de la tanda manda el botón.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grupo, modo])

  function elegir(s: TSenal) {
    if (elegida || !ronda) return
    setElegida(s)
    const acierto = s.id === ronda.senal.id
    registrarSenal(ronda.senal.id, acierto)
    setMarcador((m) => ({ aciertos: m.aciertos + (acierto ? 1 : 0), total: m.total + 1 }))
    void (acierto ? vibrarAcierto() : vibrarFallo())
  }

  const acertada = elegida && ronda && elegida.id === ronda.senal.id

  return (
    <div>
      <Encabezado
        titulo="Entrenador de señales"
        bajada="Reconócelas de un vistazo, como en la calle"
        accion={
          marcador.total > 0 ? (
            <span className="shrink-0 rounded-xl bg-superficie-2 px-3 py-2 text-xs font-bold text-marca tabular-nums">
              {marcador.aciertos}/{marcador.total}
            </span>
          ) : undefined
        }
      />

      <div className="mb-3">
        <Segmentado
          valor={modo}
          onChange={setModo}
          opciones={[
            { valor: 'dibujo', texto: 'Veo la señal' },
            { valor: 'nombre', texto: 'Leo el nombre' },
          ]}
        />
      </div>

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip activo={grupo === 'todos'} onClick={() => setGrupo('todos')}>
          Todas
        </Chip>
        {GRUPOS.map((g) => (
          <Chip key={g.id} activo={grupo === g.id} onClick={() => setGrupo(g.id)} color={g.color}>
            {g.nombre}
          </Chip>
        ))}
      </div>

      {!ronda ? (
        <Tarjeta>
          <p className="text-sm text-suave">
            Este grupo tiene menos de cuatro señales: elige otro para poder entrenar.
          </p>
        </Tarjeta>
      ) : (
        <>
          <Tarjeta className="mb-3">
            {modo === 'dibujo' ? (
              <div className="flex justify-center py-3">
                <Senal id={ronda.senal.id} size={150} lienzo />
              </div>
            ) : (
              <div className="py-6 text-center">
                <p className="text-xs font-semibold text-marca">
                  {GRUPOS.find((g) => g.id === ronda.senal.grupo)?.nombre}
                </p>
                <p className="mt-1 text-lg leading-tight font-bold text-balance text-texto">
                  {ronda.senal.nombre}
                </p>
              </div>
            )}
          </Tarjeta>

          {modo === 'dibujo' ? (
            <ul className="space-y-2">
              {ronda.opciones.map((s) => {
                const esCorrecta = s.id === ronda.senal.id
                const esElegida = elegida?.id === s.id
                let caja = 'border-borde bg-superficie hover:border-marca/50'
                if (elegida && esCorrecta) caja = 'border-bien bg-bien-suave'
                else if (esElegida) caja = 'border-mal bg-mal-suave'
                else if (elegida) caja = 'border-borde bg-superficie opacity-55'
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => elegir(s)}
                      disabled={Boolean(elegida)}
                      className={`w-full rounded-xl border-2 p-3 text-left text-sm leading-snug text-texto transition-all active:scale-[.99] ${caja}`}
                    >
                      {s.nombre}
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {ronda.opciones.map((s) => {
                const esCorrecta = s.id === ronda.senal.id
                const esElegida = elegida?.id === s.id
                let caja = 'border-borde bg-superficie hover:border-marca/50'
                if (elegida && esCorrecta) caja = 'border-bien bg-bien-suave'
                else if (esElegida) caja = 'border-mal bg-mal-suave'
                else if (elegida) caja = 'border-borde bg-superficie opacity-55'
                return (
                  <button
                    key={s.id}
                    onClick={() => elegir(s)}
                    disabled={Boolean(elegida)}
                    className={`flex items-center justify-center rounded-xl border-2 p-3 transition-all active:scale-[.99] ${caja}`}
                  >
                    <Senal id={s.id} size={76} lienzo />
                  </button>
                )
              })}
            </div>
          )}

          {elegida && (
            <div
              className={`aparecer mt-3 rounded-xl border p-3 ${
                acertada ? 'border-bien/35 bg-bien-suave' : 'border-aviso/35 bg-aviso-suave'
              }`}
            >
              <p className={`text-sm font-bold ${acertada ? 'text-bien' : 'text-aviso'}`}>
                {acertada ? '¡Correcto!' : ronda.senal.nombre}
              </p>
              <p className="mt-1 text-sm leading-snug text-texto">{ronda.senal.significado}</p>
              {ronda.senal.articulo && (
                <p className="mt-2 text-xs text-tenue">{ronda.senal.articulo} · Ley 109</p>
              )}
            </div>
          )}

          <div className="sticky bottom-16 z-10 -mx-4 mt-4 bg-gradient-to-t from-fondo via-fondo to-transparent px-4 pt-6 pb-3">
            <Boton onClick={nuevaRonda} disabled={!elegida} className="w-full shadow-lg">
              Siguiente señal
            </Boton>
          </div>

          {marcador.total >= 5 && (
            <p className="mt-2 text-center text-xs text-suave">
              Llevas {pct(marcador.aciertos, marcador.total)}% de aciertos en esta tanda.
            </p>
          )}
        </>
      )}
    </div>
  )
}

function Chip({
  children,
  activo,
  onClick,
  color,
}: {
  children: React.ReactNode
  activo: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
        activo ? 'border-transparent text-white' : 'border-borde bg-superficie text-suave'
      }`}
      style={activo ? { background: color ?? 'var(--v-marca)' } : undefined}
    >
      {children}
    </button>
  )
}
