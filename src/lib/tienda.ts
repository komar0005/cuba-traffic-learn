/**
 * Almacén mínimo compartido entre componentes: un valor, suscriptores y
 * persistencia automática. Evita repetir el mismo patrón en cada módulo.
 */
import { useSyncExternalStore } from 'react'
import { escribirJSON, leerJSON } from './almacen'

export function crearTienda<T>(clave: string, inicial: T, migrar?: (crudo: unknown) => T) {
  let valor: T = (() => {
    const crudo = leerJSON<unknown>(clave, null)
    if (crudo === null) return inicial
    try {
      return migrar ? migrar(crudo) : (crudo as T)
    } catch {
      return inicial
    }
  })()

  const oyentes = new Set<() => void>()

  function obtener() {
    return valor
  }

  function fijar(siguiente: T | ((anterior: T) => T)) {
    const nuevo =
      typeof siguiente === 'function' ? (siguiente as (a: T) => T)(valor) : siguiente
    if (Object.is(nuevo, valor)) return
    valor = nuevo
    escribirJSON(clave, valor)
    oyentes.forEach((o) => o())
  }

  function suscribir(o: () => void) {
    oyentes.add(o)
    return () => {
      oyentes.delete(o)
    }
  }

  function usar() {
    return useSyncExternalStore(suscribir, obtener, obtener)
  }

  return { obtener, fijar, suscribir, usar }
}
