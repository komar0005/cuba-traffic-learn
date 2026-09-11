import { Link } from 'react-router-dom'
import { PREGUNTAS } from '../data/preguntas'
import { SENALES } from '../data/senales'
import { IDS_POR_TEMA, TEMAS_CON_PREGUNTAS, EXAMEN } from '../lib/datos'
import { dominada, useProgreso } from '../lib/progreso'
import { Barra, BotonEnlace, Tarjeta } from '../components/ui'
import { Senal } from '../components/Senal'
import { pct } from '../lib/util'
import { TITULOS_TEMAS } from '../data/temas'

const DESTACADAS = ['b-pare', 'b-ceda-el-paso', 'a-ninos', 'c-velocidad-maxima', 'd-sentido-obligatorio-recto', 'a-paso-peatones-cebra']

export default function Inicio() {
  const { progreso } = useProgreso()
  const dominadas = PREGUNTAS.filter((p) => dominada(progreso.preguntas[p.id])).length
  const ultimo = progreso.examenes[0]

  const siguienteTema =
    TEMAS_CON_PREGUNTAS.find(
      (t) => IDS_POR_TEMA[t].filter((id) => dominada(progreso.preguntas[id])).length < IDS_POR_TEMA[t].length,
    ) ?? TEMAS_CON_PREGUNTAS[0]

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-marca-800 to-marca-600 p-5 text-white">
        <p className="text-xs font-semibold tracking-wide text-marca-200 uppercase">Licencia de conducción · Cuba</p>
        <h1 className="mt-1 text-2xl leading-tight font-bold text-balance">
          Aprende las señales y aprueba el teórico
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-snug text-marca-100">
          {PREGUNTAS.length} preguntas de los cuestionarios oficiales, {SENALES.length} señales del Código de
          Seguridad Vial y el temario completo de la Ley&nbsp;109. Todo funciona sin conexión.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <BotonEnlace to={`/practica/${siguienteTema}`} variante="secundario">
            Seguir estudiando
          </BotonEnlace>
          <BotonEnlace
            to="/examen"
            variante="primario"
            className="border border-white/25 bg-white/15 hover:bg-white/25"
          >
            Examen simulado
          </BotonEnlace>
        </div>
      </section>

      <Tarjeta>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Tu progreso</p>
            <p className="text-xs text-slate-500">
              {dominadas} de {PREGUNTAS.length} preguntas dominadas
            </p>
          </div>
          <p className="text-2xl font-bold text-marca-700 tabular-nums">
            {pct(dominadas, PREGUNTAS.length)}%
          </p>
        </div>
        <div className="mt-3">
          <Barra valor={dominadas} total={PREGUNTAS.length} />
        </div>
        {ultimo && (
          <p className="mt-3 text-xs text-slate-500">
            Último examen:{' '}
            <span className={ultimo.aprobado ? 'font-semibold text-emerald-700' : 'font-semibold text-red-700'}>
              {ultimo.correctas}/{ultimo.total} — {ultimo.aprobado ? 'aprobado' : 'suspenso'}
            </span>{' '}
            (se aprueba con {EXAMEN.aprobado} de {EXAMEN.preguntas}).
          </p>
        )}
      </Tarjeta>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-slate-800">Práctica por tema</h2>
          <Link to="/practica" className="text-xs font-semibold text-marca-700">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TEMAS_CON_PREGUNTAS.slice(0, 4).map((t) => {
            const ids = IDS_POR_TEMA[t]
            const d = ids.filter((id) => dominada(progreso.preguntas[id])).length
            return (
              <Link
                key={t}
                to={`/practica/${t}`}
                className="rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-marca-300"
              >
                <p className="text-[11px] font-bold text-marca-700">
                  {t === 6 ? 'Temas 6 y 7' : `Tema ${t}`}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[13px] leading-tight font-semibold text-slate-800">
                  {TITULOS_TEMAS[t]}
                </p>
                <div className="mt-2">
                  <Barra valor={d} total={ids.length} />
                </div>
                <p className="mt-1 text-[11px] text-slate-500 tabular-nums">
                  {d}/{ids.length}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-bold text-slate-800">Señales</h2>
          <Link to="/senales" className="text-xs font-semibold text-marca-700">
            Catálogo completo
          </Link>
        </div>
        <Tarjeta className="overflow-x-auto">
          <div className="flex gap-5">
            {DESTACADAS.map((id) => (
              <Link key={id} to={`/senales?q=${id}`} className="shrink-0">
                <Senal id={id} size={64} titulo />
              </Link>
            ))}
          </div>
        </Tarjeta>
      </section>

      <section className="grid gap-2 sm:grid-cols-2">
        <Link
          to="/calle"
          className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-marca-300"
        >
          <p className="text-sm font-bold text-slate-800">Andar en la calle</p>
          <p className="mt-1 text-xs leading-snug text-slate-500">
            Quién tiene la prioridad, distancias, peatones y qué hacer ante un accidente.
          </p>
        </Link>
        <Link
          to="/tramites"
          className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-marca-300"
        >
          <p className="text-sm font-bold text-slate-800">Trámites y teléfonos</p>
          <p className="mt-1 text-xs leading-snug text-slate-500">
            Documentos del permiso de aprendizaje y contactos de Licencia y Registro.
          </p>
        </Link>
      </section>
    </div>
  )
}
