import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import { SENALES } from '../data/senales'
import { TITULOS_TEMAS } from '../data/temas'
import {
  IDS_POR_TEMA,
  TEMAS_CON_PREGUNTAS,
  contarDominadas,
  etiquetaTema,
  pendientesDeRepaso,
} from '../lib/datos'
import { calcularRacha, hoy, useProgreso } from '../lib/progreso'
import { useAjustes } from '../lib/ajustes'
import { Barra, BotonEnlace, Tarjeta } from '../components/ui'
import { Senal } from '../components/Senal'
import { pct } from '../lib/util'

const DESTACADAS = [
  'b-pare',
  'b-ceda-el-paso',
  'a-ninos',
  'c-velocidad-maxima',
  'd-sentido-obligatorio-recto',
  'a-paso-peatones-cebra',
  'c-prohibido-adelantar',
  'b-via-con-prioridad',
]

export default function Inicio() {
  const { progreso } = useProgreso()
  const { ajustes } = useAjustes()

  const dominadas = useMemo(
    () => PREGUNTAS.filter((p) => progreso.preguntas[p.id]?.caja >= 3).length,
    [progreso],
  )
  const repaso = useMemo(() => pendientesDeRepaso(progreso).length, [progreso])
  const racha = useMemo(() => calcularRacha(progreso.porDia), [progreso.porDia])
  const deHoy = progreso.porDia[hoy()] ?? 0
  const ultimo = progreso.examenes[0]
  const sesion = progreso.sesion

  const siguienteTema =
    TEMAS_CON_PREGUNTAS.find(
      (t) => contarDominadas(IDS_POR_TEMA[t], progreso) < IDS_POR_TEMA[t].length,
    ) ?? TEMAS_CON_PREGUNTAS[0]

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-hero-de to-hero-a p-5 text-white">
        <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
          Licencia de conducción · Cuba
        </p>
        <h1 className="mt-1 text-2xl leading-tight font-bold text-balance">
          Aprende las señales y aprueba el teórico
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-snug text-white/85">
          {PREGUNTAS.length} preguntas de los cuestionarios oficiales, {SENALES.length} señales del
          Código de Seguridad Vial y el temario de la Ley&nbsp;109. Todo funciona sin conexión.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <BotonEnlace
            to={
              sesion
                ? sesion.tipo === 'examen'
                  ? '/examen'
                  : `/practica/${sesion.origen}`
                : `/practica/${siguienteTema}`
            }
            className="bg-white text-hero-de hover:bg-white/90"
          >
            {sesion ? 'Retomar donde iba' : 'Seguir estudiando'}
          </BotonEnlace>
          <BotonEnlace
            to="/examen"
            className="border border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            Examen simulado
          </BotonEnlace>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-2">
        <Recuadro
          principal={`${pct(dominadas, PREGUNTAS.length)}%`}
          etiqueta="dominado"
        />
        <Recuadro
          principal={racha === 0 ? '—' : `${racha}`}
          etiqueta={racha === 1 ? 'día seguido' : 'días seguidos'}
        />
        <Recuadro principal={`${deHoy}`} etiqueta={`hoy · meta ${ajustes.metaDiaria}`} />
      </div>

      <Tarjeta>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-texto">Meta de hoy</p>
            <p className="text-xs text-suave">
              {deHoy >= ajustes.metaDiaria
                ? '¡Cumplida! Todo lo que hagas de más suma.'
                : `Te faltan ${ajustes.metaDiaria - deHoy} preguntas.`}
            </p>
          </div>
          <p className="shrink-0 text-sm font-bold text-marca tabular-nums">
            {Math.min(deHoy, ajustes.metaDiaria)}/{ajustes.metaDiaria}
          </p>
        </div>
        <div className="mt-3">
          <Barra valor={deHoy} total={ajustes.metaDiaria} />
        </div>
      </Tarjeta>

      {repaso > 0 && (
        <Link
          to="/practica/repaso"
          className="flex items-center gap-4 rounded-2xl border border-aviso/30 bg-aviso-suave p-4"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aviso/15 text-lg">
            🔁
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-texto">
              {repaso} {repaso === 1 ? 'pregunta lista' : 'preguntas listas'} para repasar
            </span>
            <span className="block text-xs text-suave">
              Repasarlas hoy es lo que las fija en la memoria.
            </span>
          </span>
          <span className="text-suave">›</span>
        </Link>
      )}

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-texto">Práctica por tema</h2>
          <Link to="/practica" className="text-xs font-semibold text-marca">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TEMAS_CON_PREGUNTAS.slice(0, 4).map((t) => {
            const ids = IDS_POR_TEMA[t]
            const d = contarDominadas(ids, progreso)
            return (
              <Link
                key={t}
                to={`/practica/${t}`}
                className="rounded-2xl border border-borde bg-superficie p-3 transition-colors hover:border-marca/40"
              >
                <p className="text-[11px] font-bold text-marca">{etiquetaTema(t)}</p>
                <p className="mt-0.5 line-clamp-2 text-[13px] leading-tight font-semibold text-texto">
                  {TITULOS_TEMAS[t]}
                </p>
                <div className="mt-2">
                  <Barra valor={d} total={ids.length} />
                </div>
                <p className="mt-1 text-[11px] text-suave tabular-nums">
                  {d}/{ids.length}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-texto">Señales</h2>
          <Link to="/senales" className="text-xs font-semibold text-marca">
            Catálogo completo
          </Link>
        </div>
        <Tarjeta className="overflow-x-auto">
          <div className="flex gap-5">
            {DESTACADAS.map((id) => (
              <Link key={id} to={`/senales?q=${id}`} className="shrink-0">
                <Senal id={id} size={64} titulo lienzo />
              </Link>
            ))}
          </div>
        </Tarjeta>
        <div className="mt-2">
          <BotonEnlace to="/entrenador" variante="secundario" className="w-full">
            🎯 Entrenador de señales
          </BotonEnlace>
        </div>
      </section>

      {ultimo && (
        <Tarjeta>
          <p className="text-sm font-semibold text-texto">Último examen</p>
          <p className="mt-1 text-xs text-suave">
            <span className={ultimo.aprobado ? 'font-bold text-bien' : 'font-bold text-mal'}>
              {ultimo.correctas}/{ultimo.total} — {ultimo.aprobado ? 'aprobado' : 'suspenso'}
            </span>{' '}
            · se aprueba con {ajustes.minimoAprobado} de {ajustes.largoExamen}.
          </p>
        </Tarjeta>
      )}

      <section className="grid gap-2 sm:grid-cols-2">
        <Atajo
          to="/calle"
          titulo="Andar en la calle"
          texto="Quién tiene la prioridad, distancias, peatones y qué hacer ante un accidente."
        />
        <Atajo
          to="/tramites"
          titulo="Trámites y teléfonos"
          texto="Documentos del permiso de aprendizaje y contactos de Licencia y Registro."
        />
      </section>
    </div>
  )
}

function Recuadro({ principal, etiqueta }: { principal: string; etiqueta: string }) {
  return (
    <div className="rounded-2xl border border-borde bg-superficie p-3 text-center">
      <p className="text-2xl font-bold text-marca tabular-nums">{principal}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-suave">{etiqueta}</p>
    </div>
  )
}

function Atajo({ to, titulo, texto }: { to: string; titulo: string; texto: string }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-borde bg-superficie p-4 transition-colors hover:border-marca/40"
    >
      <p className="text-sm font-bold text-texto">{titulo}</p>
      <p className="mt-1 text-xs leading-snug text-suave">{texto}</p>
    </Link>
  )
}
