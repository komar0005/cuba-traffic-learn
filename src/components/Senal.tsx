import { DIBUJOS } from './senales-svg'
import { SENAL_POR_ID } from '../data/senales'

/**
 * Las señales se dibujan sobre fondo blanco siempre: sus colores son
 * normativos y no deben cambiar con el tema de la app.
 */
export function Senal({
  id,
  size = 72,
  className = '',
  titulo,
  lienzo = false,
}: {
  id: string
  size?: number
  className?: string
  titulo?: boolean
  lienzo?: boolean
}) {
  const dibujo = DIBUJOS[id]
  const meta = SENAL_POR_ID[id]
  if (!dibujo) return null
  return (
    <figure className={`flex flex-col items-center gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label={meta?.nombre ?? id}
        className={`shrink-0 ${lienzo ? 'senal-lienzo p-1' : ''}`}
      >
        {dibujo}
      </svg>
      {titulo && meta && (
        <figcaption className="max-w-[9rem] text-center text-[11px] leading-tight font-medium text-suave">
          {meta.nombre}
        </figcaption>
      )}
    </figure>
  )
}

export function FilaSenales({
  ids,
  size = 76,
  lienzo = false,
}: {
  ids: string[]
  size?: number
  lienzo?: boolean
}) {
  if (!ids.length) return null
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      {ids.map((id, i) => (
        <Senal key={`${id}-${i}`} id={id} size={size} lienzo={lienzo} />
      ))}
    </div>
  )
}
