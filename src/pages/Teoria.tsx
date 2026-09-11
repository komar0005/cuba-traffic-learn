import { Link, useParams } from 'react-router-dom'
import { TEMAS, TEMA_POR_NUMERO } from '../data/temas'
import type { Bloque } from '../data/temas'
import { FilaSenales } from '../components/Senal'
import { BotonEnlace, Encabezado, Tarjeta, Vacio } from '../components/ui'

export function ListaTeoria() {
  return (
    <div>
      <Encabezado
        titulo="Teoría"
        bajada="Resumen de la Ley 109, Código de Seguridad Vial, por temas"
      />
      <div className="space-y-2">
        {TEMAS.map((t) => (
          <Link
            key={t.numero}
            to={`/teoria/${t.numero}`}
            className="block rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-marca-300"
          >
            <p className="text-[11px] font-bold text-marca-700">
              {t.numero === 6 ? 'Temas 6 y 7' : `Tema ${t.numero}`}
            </p>
            <p className="mt-0.5 text-sm leading-tight font-semibold text-slate-900">{t.titulo}</p>
            <p className="mt-1 text-xs leading-snug text-slate-500">{t.resumen}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Teoria() {
  const { tema } = useParams()
  const t = TEMA_POR_NUMERO[Number(tema)]
  if (!t) return <Vacio titulo="Tema no encontrado" texto="Vuelve a la lista de temas." />

  return (
    <div>
      <Link to="/teoria" className="text-xs font-semibold text-marca-700">
        ← Temas
      </Link>
      <h1 className="mt-1 text-xl leading-tight font-bold text-balance text-slate-900">{t.titulo}</h1>
      <p className="mt-1 text-sm text-slate-500">{t.resumen}</p>

      <div className="mt-5 space-y-6">
        {t.secciones.map((s, i) => (
          <section key={i}>
            <h2 className="text-base font-bold text-slate-900">{s.titulo}</h2>
            {s.articulo && (
              <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-marca-700 uppercase">
                {s.articulo}
              </p>
            )}
            <div className="mt-3 space-y-3">
              {s.bloques.map((b, j) => (
                <RenderBloque key={j} b={b} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Tarjeta className="mt-8 border-marca-200 bg-marca-50/60">
        <p className="text-sm font-semibold text-marca-900">¿Listo para practicar?</p>
        <p className="mt-1 text-xs text-marca-800/80">
          Responde las preguntas oficiales de este tema y comprueba lo aprendido.
        </p>
        <BotonEnlace to={`/practica/${t.numero}`} className="mt-3">
          Practicar el tema {t.numero === 6 ? '6 y 7' : t.numero}
        </BotonEnlace>
      </Tarjeta>
    </div>
  )
}

function RenderBloque({ b }: { b: Bloque }) {
  switch (b.tipo) {
    case 'texto':
      return <p className="text-sm leading-relaxed text-slate-700">{b.texto}</p>

    case 'lista':
      return (
        <div>
          {b.titulo && <p className="mb-1.5 text-sm font-semibold text-slate-800">{b.titulo}</p>}
          <ul className="space-y-1.5">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-snug text-slate-700">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-marca-400" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'clave':
      return (
        <div className="rounded-xl border-l-4 border-marca-600 bg-marca-50/70 p-3">
          <p className="text-sm font-bold text-marca-900">{b.titulo}</p>
          <p className="mt-1 text-sm leading-snug text-marca-900/85">{b.texto}</p>
        </div>
      )

    case 'senales':
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          {b.titulo && <p className="mb-3 text-sm font-semibold text-slate-800">{b.titulo}</p>}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {b.ids.map((id) => (
              <Link key={id} to={`/senales?q=${id}`} className="rounded-xl p-1 hover:bg-slate-50">
                <FilaSenales ids={[id]} size={54} />
                <Nombre id={id} />
              </Link>
            ))}
          </div>
        </div>
      )

    case 'tabla':
      return (
        <div>
          {b.titulo && <p className="mb-1.5 text-sm font-semibold text-slate-800">{b.titulo}</p>}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[22rem] border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  {b.encabezados.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-slate-200 px-3 py-2 text-left text-xs font-bold text-slate-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.filas.map((f, i) => (
                  <tr key={i} className="odd:bg-white even:bg-slate-50/50">
                    {f.map((c, j) => (
                      <td
                        key={j}
                        className={`border-b border-slate-100 px-3 py-2 align-top leading-snug text-slate-700 ${
                          j === 0 ? 'font-semibold whitespace-nowrap text-slate-900' : ''
                        }`}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
  }
}

function Nombre({ id }: { id: string }) {
  // El nombre se toma del catálogo dentro de FilaSenales; aquí solo reservamos
  // el hueco para mantener alineadas las celdas de la cuadrícula.
  return <span className="sr-only">{id}</span>
}
