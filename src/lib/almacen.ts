/**
 * Persistencia del estado. Fuente de verdad: localStorage del WebView, que en
 * Android sobrevive a cierres de la app y entra en la copia de seguridad del
 * sistema (ver android/app/src/main/res/xml/data_extraction_rules.xml).
 *
 * Las escrituras se agrupan para no castigar el almacenamiento en cada
 * pulsación, y se vuelcan al ocultarse la app para no perder nada.
 */

const pendientes = new Map<string, unknown>()
let temporizador: number | undefined

export function leerJSON<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave)
    if (crudo === null) return porDefecto
    return JSON.parse(crudo) as T
  } catch {
    return porDefecto
  }
}

function volcar() {
  temporizador = undefined
  for (const [clave, valor] of pendientes) {
    try {
      if (valor === undefined) localStorage.removeItem(clave)
      else localStorage.setItem(clave, JSON.stringify(valor))
    } catch {
      /* almacenamiento lleno o bloqueado: se sigue en memoria */
    }
  }
  pendientes.clear()
}

export function escribirJSON(clave: string, valor: unknown) {
  pendientes.set(clave, valor)
  if (temporizador === undefined) {
    temporizador = window.setTimeout(volcar, 250)
  }
}

export function borrarClave(clave: string) {
  pendientes.set(clave, undefined)
  if (temporizador === undefined) temporizador = window.setTimeout(volcar, 250)
}

/** Vuelca de inmediato lo que quede pendiente. */
export function sincronizar() {
  if (temporizador !== undefined) {
    clearTimeout(temporizador)
    temporizador = undefined
  }
  volcar()
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sincronizar()
  })
  window.addEventListener('pagehide', sincronizar)
}
