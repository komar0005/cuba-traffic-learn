import { Link, useParams } from 'react-router-dom'
import { TEMAS, TEMA_POR_NUMERO } from '../data/temas'
import type { Bloque } from '../data/temas'
import { Senal } from '../components/Senal'
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
            className="block rounded-2xl border border-borde bg-superficie p-4 transition-colors hover:border-marca/40"
          >
            <p className="text-[11px] font-bold text-marca">
              {t.numero === 6 ? 'Temas 6 y 7' : `Tema ${t.numero}`}
            </p>
            <p className="mt-0.5 text-sm leading-tight font-semibold text-texto">{t.titulo}</p>
            <p className="mt-1 text-xs leading-snug text-suave">{t.resumen}</p>
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
      <Link to="/teoria" className="text-xs font-semibold text-marca">
        ← Temas
      </Link>
      <h1 className="mt-1 text-xl leading-tight font-bold text-balance text-texto">{t.titulo}</h1>
      <p className="mt-1 text-sm text-suave">{t.resumen}</p>

      <div className="mt-5 space-y-6">
        {t.secciones.map((s, i) => (
          <section key={i}>
            <h2 className="text-base font-bold text-texto">{s.titulo}</h2>
            {s.articulo && (
              <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-marca uppercase">
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

      <Tarjeta className="mt-8 border-marca/35 bg-marca-suave">
        <p className="text-sm font-semibold text-texto">¿Listo para practicar?</p>
        <p className="mt-1 text-xs text-suave">
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
      return <p className="text-sm leading-relaxed text-texto">{b.texto}</p>

    case 'lista':
      return (
        <div>
          {b.titulo && <p className="mb-1.5 text-sm font-semibold text-texto">{b.titulo}</p>}
          <ul className="space-y-1.5">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-snug text-texto">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-marca" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'clave':
      return (
        <div className="rounded-xl border-l-4 border-marca bg-marca-suave p-3">
          <p className="text-sm font-bold text-texto">{b.titulo}</p>
          <p className="mt-1 text-sm leading-snug text-texto">{b.texto}</p>
        </div>
      )

    case 'senales':
      return (
        <div className="rounded-2xl border border-borde bg-superficie p-4">
          {b.titulo && <p className="mb-3 text-sm font-semibold text-texto">{b.titulo}</p>}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {b.ids.map((id) => (
              <Link
                key={id}
                to={`/senales?q=${id}`}
                className="rounded-xl p-1 hover:bg-superficie-2"
              >
                <Senal id={id} size={54} titulo lienzo />
              </Link>
            ))}
          </div>
        </div>
      )

    case 'tabla':
      return (
        <div>
          {b.titulo && <p className="mb-1.5 text-sm font-semibold text-texto">{b.titulo}</p>}
          <div className="overflow-x-auto rounded-xl border border-borde">
            <table className="w-full min-w-[22rem] border-collapse text-sm">
              <thead>
                <tr className="bg-superficie-2">
                  {b.encabezados.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-borde px-3 py-2 text-left text-xs font-bold text-suave"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.filas.map((f, i) => (
                  <tr key={i} className="odd:bg-superficie even:bg-superficie-2/60">
                    {f.map((c, j) => (
                      <td
                        key={j}
                        className={`border-b border-borde px-3 py-2 align-top leading-snug text-texto ${
                          j === 0 ? 'font-semibold whitespace-nowrap text-texto' : ''
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

