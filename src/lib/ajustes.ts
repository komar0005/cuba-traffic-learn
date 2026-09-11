import { useEffect } from 'react'
import { crearTienda } from './tienda'
import { barraDeEstado, configurarVibracion } from './nativo'

export type Tema = 'sistema' | 'claro' | 'oscuro'
export type Letra = 'normal' | 'grande' | 'enorme'

export type Ajustes = {
  tema: Tema
  letra: Letra
  vibracion: boolean
  /** preguntas por examen simulado */
  largoExamen: number
  /** aciertos necesarios para aprobar */
  minimoAprobado: number
  /** preguntas al día que se propone el usuario */
  metaDiaria: number
  /** baraja el orden de las opciones en la práctica */
  barajarOpciones: boolean
}

export const AJUSTES_POR_DEFECTO: Ajustes = {
  tema: 'sistema',
  letra: 'normal',
  vibracion: true,
  largoExamen: 20,
  minimoAprobado: 18,
  metaDiaria: 20,
  barajarOpciones: false,
}

export const tiendaAjustes = crearTienda<Ajustes>(
  'via-cuba:ajustes:v1',
  AJUSTES_POR_DEFECTO,
  (crudo) => ({ ...AJUSTES_POR_DEFECTO, ...(crudo as Partial<Ajustes>) }),
)

export function useAjustes() {
  const ajustes = tiendaAjustes.usar()
  return {
    ajustes,
    cambiar: <K extends keyof Ajustes>(clave: K, valor: Ajustes[K]) =>
      tiendaAjustes.fijar((a) => ({ ...a, [clave]: valor })),
    restablecer: () => tiendaAjustes.fijar({ ...AJUSTES_POR_DEFECTO }),
  }
}

function sistemaEsOscuro() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

export function temaEfectivoEsOscuro(tema: Tema) {
  return tema === 'oscuro' || (tema === 'sistema' && sistemaEsOscuro())
}

/** Aplica tema, tamaño de letra y vibración al documento y al teléfono. */
export function useAplicarAjustes() {
  const ajustes = tiendaAjustes.usar()

  useEffect(() => {
    const raiz = document.documentElement

    function aplicar() {
      const oscuro = temaEfectivoEsOscuro(ajustes.tema)
      raiz.classList.toggle('oscuro', oscuro)
      raiz.dataset.letra = ajustes.letra
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', oscuro ? '#0b0f17' : '#f4f6fb')
      void barraDeEstado(oscuro)
    }

    aplicar()
    configurarVibracion(ajustes.vibracion)

    if (ajustes.tema !== 'sistema') return
    const consulta = window.matchMedia('(prefers-color-scheme: dark)')
    consulta.addEventListener('change', aplicar)
    return () => consulta.removeEventListener('change', aplicar)
  }, [ajustes.tema, ajustes.letra, ajustes.vibracion])
}
