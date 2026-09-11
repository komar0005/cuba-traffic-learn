import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Tarjeta({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.06)] ${className}`}
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
        <h1 className="text-xl font-bold tracking-tight text-slate-900">{titulo}</h1>
        {bajada && <p className="mt-0.5 text-sm text-slate-500">{bajada}</p>}
      </div>
      {accion}
    </header>
  )
}

export function Barra({
  valor,
  total,
  color = 'bg-marca-600',
}: {
  valor: number
  total: number
  color?: string
}) {
  const p = total === 0 ? 0 : Math.min(100, Math.round((valor / total) * 100))
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
      role="progressbar"
      aria-valuenow={p}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full ${color} transition-[width] duration-500`} style={{ width: `${p}%` }} />
    </div>
  )
}

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
  variante?: 'primario' | 'secundario' | 'fantasma' | 'peligro'
  disabled?: boolean
  tipo?: 'button' | 'submit'
  className?: string
}) {
  const estilos = {
    primario: 'bg-marca-700 text-white hover:bg-marca-800 active:bg-marca-900',
    secundario: 'bg-white text-marca-800 border border-marca-200 hover:bg-marca-50',
    fantasma: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    peligro: 'bg-white text-red-700 border border-red-200 hover:bg-red-50',
  }[variante]
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-45 ${estilos} ${className}`}
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
  variante?: 'primario' | 'secundario' | 'fantasma'
  className?: string
}) {
  const estilos = {
    primario: 'bg-marca-700 text-white hover:bg-marca-800',
    secundario: 'bg-white text-marca-800 border border-marca-200 hover:bg-marca-50',
    fantasma: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  }[variante]
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${estilos} ${className}`}
    >
      {children}
    </Link>
  )
}

export function Etiqueta({ children, color = 'slate' }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: `color-mix(in srgb, ${color} 12%, white)`, color }}
    >
      {children}
    </span>
  )
}

export function Vacio({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center">
      <p className="font-semibold text-slate-700">{titulo}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{texto}</p>
    </div>
  )
}
