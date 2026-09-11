/** Baraja una copia del arreglo (Fisher–Yates). */
export function barajar<T>(xs: readonly T[]): T[] {
  const a = xs.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 100)
}

export function mmss(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function fecha(ts: number) {
  return new Date(ts).toLocaleDateString('es', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function normalizar(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}
