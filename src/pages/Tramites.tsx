import { CONTACTOS, NOTA_CONTACTOS, PASOS_LICENCIA, REQUISITOS_PERMISO } from '../data/tramites'
import { Encabezado, Tarjeta } from '../components/ui'

export default function Tramites() {
  return (
    <div>
      <Encabezado titulo="Trámites" bajada="Del curso al carné, y a quién llamar" />

      <Tarjeta className="mb-5">
        <h2 className="text-sm font-bold text-slate-900">{REQUISITOS_PERMISO.titulo}</h2>
        <ol className="mt-3 space-y-2">
          {REQUISITOS_PERMISO.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-sm leading-snug text-slate-700">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-marca-100 text-xs font-bold text-marca-800">
                {i + 1}
              </span>
              <span className="pt-0.5">{it}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[11px] text-slate-400">Fuente: {REQUISITOS_PERMISO.fuente}.</p>
      </Tarjeta>

      <section className="mb-5">
        <h2 className="mb-2 text-sm font-bold text-slate-800">El camino hasta la licencia</h2>
        <ol className="space-y-2">
          {PASOS_LICENCIA.map((p, i) => (
            <li key={p.titulo}>
              <Tarjeta>
                <p className="text-[11px] font-bold text-marca-700">Paso {i + 1}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">{p.titulo}</p>
                <p className="mt-1 text-sm leading-snug text-slate-600">{p.texto}</p>
              </Tarjeta>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold text-slate-800">Teléfonos · PNR La Habana</h2>
        <div className="space-y-3">
          {CONTACTOS.map((g) => (
            <Tarjeta key={g.titulo} className="p-0">
              <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-bold tracking-wide text-marca-700 uppercase">
                {g.titulo}
              </p>
              <ul className="divide-y divide-slate-100">
                {g.contactos.map((c) => (
                  <li key={c.lugar} className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800">{c.lugar}</p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {c.telefonos.map((t) => (
                        <a
                          key={t}
                          href={`tel:+53${t}`}
                          className="rounded-lg bg-marca-50 px-2.5 py-1 font-mono text-xs font-semibold text-marca-800 tabular-nums hover:bg-marca-100"
                        >
                          {t}
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Tarjeta>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-snug text-slate-400">{NOTA_CONTACTOS}</p>
      </section>
    </div>
  )
}
