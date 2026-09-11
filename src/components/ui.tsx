import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Tarjeta({
  children,
  className = '',
  relieve = true,
}: {
  children: ReactNode
  className?: string
  relieve?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border border-borde bg-superficie p-4 ${
        relieve ? 'shadow-[0_1px_2px_rgba(16,24,40,.05)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function Encabezado({
  titulo,
  bajada,
  accion,
}: {
  titulo: string
  bajada?: string
  accion?: ReactNode
}) {
  return (
    <header className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-texto">{titulo}</h1>
        {bajada && <p className="mt-0.5 text-sm text-suave">{bajada}</p>}
      </div>
      {accion}
    </header>
  )
}

export function Barra({
  valor,
  total,
  color = 'bg-marca',
  alto = 'h-2',
}: {
  valor: number
  total: number
  color?: string
  alto?: string
}) {
  const p = total === 0 ? 0 : Math.min(100, Math.round((valor / total) * 100))
  return (
    <div
      className={`${alto} w-full overflow-hidden rounded-full bg-superficie-2`}
      role="progressbar"
      aria-valuenow={p}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-500 ease-out`}
        style={{ width: `${p}%` }}
      />
    </div>
  )
}

const ESTILOS = {
  primario: 'bg-marca text-sobre-marca hover:brightness-110 active:brightness-95',
  secundario: 'bg-superficie text-marca border border-borde-fuerte hover:bg-marca-suave',
  fantasma: 'bg-superficie-2 text-suave hover:text-texto',
  peligro: 'bg-superficie text-mal border border-mal/35 hover:bg-mal-suave',
} as const

export type Variante = keyof typeof ESTILOS

export function Boton({
  children,
  onClick,
  variante = 'primario',
  disabled,
  tipo = 'button',
  className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variante?: Variante
  disabled?: boolean
  tipo?: 'button' | 'submit'
  className?: string
}) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all active:scale-[.985] disabled:pointer-events-none disabled:opacity-40 ${ESTILOS[variante]} ${className}`}
    >
      {children}
    </button>
  )
}

export function BotonEnlace({
  to,
  children,
  variante = 'primario',
  className = '',
}: {
  to: string
  children: ReactNode
  variante?: Variante
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all active:scale-[.985] ${ESTILOS[variante]} ${className}`}
    >
      {children}
    </Link>
  )
}

export function Vacio({
  titulo,
  texto,
  children,
}: {
  titulo: string
  texto: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-borde-fuerte bg-superficie/60 p-8 text-center">
      <p className="font-semibold text-texto">{titulo}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-suave">{texto}</p>
      {children && <div className="mt-4 flex justify-center">{children}</div>}
    </div>
  )
}

export function Metrica({
  valor,
  etiqueta,
  acento,
}: {
  valor: ReactNode
  etiqueta: string
  acento?: string
}) {
  return (
    <div className="rounded-2xl border border-borde bg-superficie p-3 text-center">
      <p className={`text-xl font-bold tabular-nums ${acento ?? 'text-marca'}`}>{valor}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-suave">{etiqueta}</p>
    </div>
  )
}

export function Fila({
  children,
  onClick,
  to,
}: {
  children: ReactNode
  onClick?: () => void
  to?: string
}) {
  const clases =
    'flex w-full items-center gap-3 rounded-2xl border border-borde bg-superficie p-4 text-left transition-colors hover:border-marca/40'
  if (to)
    return (
      <Link to={to} className={clases}>
        {children}
      </Link>
    )
  return (
    <button type="button" onClick={onClick} className={clases}>
      {children}
    </button>
  )
}

export function Interruptor({
  activo,
  onChange,
  etiqueta,
}: {
  activo: boolean
  onChange: (v: boolean) => void
  etiqueta: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      aria-label={etiqueta}
      onClick={() => onChange(!activo)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        activo ? 'bg-marca' : 'bg-borde-fuerte'
      }`}
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-white shadow transition-[left] duration-200 ${
          activo ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

export function Segmentado<T extends string>({
  valor,
  opciones,
  onChange,
}: {
  valor: T
  opciones: { valor: T; texto: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-superficie-2 p-1">
      {opciones.map((o) => (
        <button
          key={o.valor}
          type="button"
          onClick={() => onChange(o.valor)}
          className={`min-h-9 flex-1 rounded-lg px-2 text-xs font-semibold transition-colors ${
            valor === o.valor ? 'bg-superficie text-marca shadow-sm' : 'text-suave'
          }`}
        >
          {o.texto}
        </button>
      ))}
    </div>
  )
}

export function Hoja({
  children,
  onCerrar,
  etiqueta,
}: {
  children: ReactNode
  onCerrar: () => void
  etiqueta: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-6"
      onClick={onCerrar}
      role="presentation"
    >
      <div
        className="aparecer max-h-[88dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-superficie p-5 pb-8 sm:rounded-3xl sm:pb-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={etiqueta}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-borde-fuerte sm:hidden" />
        {children}
      </div>
    </div>
  )
}
