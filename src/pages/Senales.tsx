import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GRUPOS, SENALES } from '../data/senales'
import type { Grupo, Senal as TSenal } from '../data/senales'
import { Senal } from '../components/Senal'
import { Encabezado, Tarjeta, Vacio } from '../components/ui'
import { normalizar } from '../lib/util'

export default function Senales() {
  const [params, setParams] = useSearchParams()
  const [grupo, setGrupo] = useState<Grupo | 'todos'>('todos')
  const busqueda = params.get('q') ?? ''
  const abierta = SENALES.find((s) => s.id === busqueda)

  const lista = useMemo(() => {
    const q = normalizar(busqueda.trim())
    return SENALES.filter((s) => {
      if (grupo !== 'todos' && s.grupo !== grupo) return false
      if (!q || abierta) return true
      return (
        normalizar(s.nombre).includes(q) ||
        normalizar(s.significado).includes(q) ||
        s.id.includes(q)
      )
    })
  }, [busqueda, grupo, abierta])

  const porGrupo = useMemo(() => {
    const m = new Map<Grupo, TSenal[]>()
    for (const s of lista) m.set(s.grupo, [...(m.get(s.grupo) ?? []), s])
    return m
  }, [lista])

  const [detalle, setDetalle] = useState<TSenal | null>(abierta ?? null)

  return (
    <div>
      <Encabezado
        titulo="Catálogo de señales"
        bajada={`${SENALES.length} señales del Código de Seguridad Vial`}
      />

      <input
        type="search"
        value={busqueda}
        onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        placeholder="Buscar una señal…"
        className="mb-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-marca-500 focus:ring-2 focus:ring-marca-200"
      />

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

      {lista.length === 0 && (
        <Vacio titulo="Sin resultados" texto="Pruebe con otra palabra o cambie el grupo de señales." />
      )}

      <div className="space-y-6">
        {GRUPOS.filter((g) => porGrupo.has(g.id)).map((g) => (
          <section key={g.id}>
            <div className="mb-2 flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: g.color }} />
              <h2 className="text-sm font-bold text-slate-800">{g.nombre}</h2>
              <span className="text-xs text-slate-400">{porGrupo.get(g.id)!.length}</span>
            </div>
            <p className="mb-3 text-xs leading-snug text-slate-500">{g.descripcion}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {porGrupo.get(g.id)!.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setDetalle(s)}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2.5 transition-colors hover:border-marca-300 hover:bg-marca-50/40"
                >
                  <Senal id={s.id} size={58} />
                  <span className="line-clamp-2 text-center text-[11px] leading-tight font-medium text-slate-600">
                    {s.nombre}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {detalle && <Detalle senal={detalle} onCerrar={() => setDetalle(null)} />}
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
        activo ? 'border-transparent text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
      }`}
      style={activo ? { background: color ?? '#0b3c8c' } : undefined}
    >
      {children}
    </button>
  )
}

function Detalle({ senal, onCerrar }: { senal: TSenal; onCerrar: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-5 pb-8 sm:rounded-3xl sm:pb-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={senal.nombre}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-300 sm:hidden" />
        <div className="flex flex-col items-center">
          <Senal id={senal.id} size={132} />
          <h2 className="mt-4 text-center text-lg leading-tight font-bold text-balance text-slate-900">
            {senal.nombre}
          </h2>
          {senal.articulo && (
            <p className="mt-1 text-xs font-semibold text-marca-700">{senal.articulo} · Ley 109</p>
          )}
        </div>
        <Tarjeta className="mt-4 bg-slate-50">
          <p className="text-sm leading-relaxed text-slate-700">{senal.significado}</p>
        </Tarjeta>
        <button
          onClick={onCerrar}
          className="mt-4 min-h-11 w-full rounded-xl bg-slate-100 text-sm font-semibold text-slate-700 hover:bg-slate-200"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
