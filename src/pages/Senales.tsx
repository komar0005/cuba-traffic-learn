import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GRUPOS, SENALES } from '../data/senales'
import type { Grupo, Senal as TSenal } from '../data/senales'
import { Senal } from '../components/Senal'
import { BotonEnlace, Encabezado, Hoja, Tarjeta, Vacio } from '../components/ui'
import { normalizar } from '../lib/util'
import { useProgreso } from '../lib/progreso'

export default function Senales() {
  const [params, setParams] = useSearchParams()
  const [grupo, setGrupo] = useState<Grupo | 'todos' | 'favoritas'>('todos')
  const { progreso, alternarFavorita } = useProgreso()
  const busqueda = params.get('q') ?? ''
  const apuntada = SENALES.find((s) => s.id === busqueda)
  const [detalle, setDetalle] = useState<TSenal | null>(apuntada ?? null)

  const lista = useMemo(() => {
    const q = normalizar(busqueda.trim())
    return SENALES.filter((s) => {
      if (grupo === 'favoritas') return progreso.favoritas.includes(s.id)
      if (grupo !== 'todos' && s.grupo !== grupo) return false
      if (!q || apuntada) return true
      return (
        normalizar(s.nombre).includes(q) ||
        normalizar(s.significado).includes(q) ||
        s.id.includes(q)
      )
    })
  }, [busqueda, grupo, apuntada, progreso.favoritas])

  const porGrupo = useMemo(() => {
    const m = new Map<Grupo, TSenal[]>()
    for (const s of lista) m.set(s.grupo, [...(m.get(s.grupo) ?? []), s])
    return m
  }, [lista])

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
        className="mb-3 w-full rounded-xl border border-borde bg-superficie px-4 py-3 text-sm text-texto outline-none placeholder:text-tenue focus:border-marca"
      />

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        <Chip activo={grupo === 'todos'} onClick={() => setGrupo('todos')}>
          Todas
        </Chip>
        <Chip activo={grupo === 'favoritas'} onClick={() => setGrupo('favoritas')}>
          ★ Marcadas{progreso.favoritas.length > 0 ? ` (${progreso.favoritas.length})` : ''}
        </Chip>
        {GRUPOS.map((g) => (
          <Chip key={g.id} activo={grupo === g.id} onClick={() => setGrupo(g.id)} color={g.color}>
            {g.nombre}
          </Chip>
        ))}
      </div>

      {lista.length === 0 && (
        <Vacio
          titulo={grupo === 'favoritas' ? 'Sin señales marcadas' : 'Sin resultados'}
          texto={
            grupo === 'favoritas'
              ? 'Abre una señal y pulsa la estrella para tenerla siempre a mano.'
              : 'Prueba con otra palabra o cambia el grupo de señales.'
          }
        />
      )}

      <div className="space-y-6">
        {GRUPOS.filter((g) => porGrupo.has(g.id)).map((g) => (
          <section key={g.id}>
            <div className="mb-2 flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ background: g.color }} />
              <h2 className="text-sm font-bold text-texto">{g.nombre}</h2>
              <span className="text-xs text-tenue">{porGrupo.get(g.id)!.length}</span>
            </div>
            <p className="mb-3 text-xs leading-snug text-suave">{g.descripcion}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {porGrupo.get(g.id)!.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setDetalle(s)}
                  className="relative flex flex-col items-center gap-1.5 rounded-2xl border border-borde bg-superficie p-2.5 transition-colors hover:border-marca/40"
                >
                  {progreso.favoritas.includes(s.id) && (
                    <span className="absolute top-1.5 right-2 text-xs text-aviso">★</span>
                  )}
                  <Senal id={s.id} size={58} lienzo />
                  <span className="line-clamp-2 text-center text-[11px] leading-tight font-medium text-suave">
                    {s.nombre}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {detalle && (
        <Hoja onCerrar={() => setDetalle(null)} etiqueta={detalle.nombre}>
          <div className="flex flex-col items-center">
            <Senal id={detalle.id} size={132} lienzo />
            <h2 className="mt-4 text-center text-lg leading-tight font-bold text-balance text-texto">
              {detalle.nombre}
            </h2>
            {detalle.articulo && (
              <p className="mt-1 text-xs font-semibold text-marca">{detalle.articulo} · Ley 109</p>
            )}
          </div>
          <Tarjeta className="mt-4 bg-superficie-2" relieve={false}>
            <p className="text-sm leading-relaxed text-texto">{detalle.significado}</p>
          </Tarjeta>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => alternarFavorita(detalle.id)}
              className={`min-h-12 flex-1 rounded-xl border text-sm font-semibold transition-colors ${
                progreso.favoritas.includes(detalle.id)
                  ? 'border-aviso/40 bg-aviso-suave text-aviso'
                  : 'border-borde-fuerte bg-superficie text-suave'
              }`}
            >
              {progreso.favoritas.includes(detalle.id) ? '★ Marcada' : '☆ Marcar'}
            </button>
            <BotonEnlace to="/entrenador" variante="secundario" className="flex-1">
              Entrenar
            </BotonEnlace>
          </div>
          <button
            onClick={() => setDetalle(null)}
            className="mt-2 min-h-12 w-full rounded-xl bg-superficie-2 text-sm font-semibold text-suave"
          >
            Cerrar
          </button>
        </Hoja>
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
