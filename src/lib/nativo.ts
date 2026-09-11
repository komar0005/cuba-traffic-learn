/**
 * Puente con las capacidades del teléfono cuando la app corre empaquetada con
 * Capacitor. En el navegador cada función es un no-op, así que el resto del
 * código no tiene que preguntar dónde se está ejecutando.
 */
import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'

export const esNativo = Capacitor.isNativePlatform()

let vibracionActiva = true
export function configurarVibracion(activa: boolean) {
  vibracionActiva = activa
}

export async function vibrarToque() {
  if (!esNativo || !vibracionActiva) return
  try {
    await Haptics.impact({ style: ImpactStyle.Light })
  } catch {
    /* el teléfono puede no tener motor de vibración */
  }
}

export async function vibrarAcierto() {
  if (!esNativo || !vibracionActiva) return
  try {
    await Haptics.notification({ type: NotificationType.Success })
  } catch {
    /* sin vibración disponible */
  }
}

export async function vibrarFallo() {
  if (!esNativo || !vibracionActiva) return
  try {
    await Haptics.notification({ type: NotificationType.Error })
  } catch {
    /* sin vibración disponible */
  }
}

/** Pinta la barra de estado acorde al tema en uso. */
export async function barraDeEstado(oscuro: boolean) {
  if (!esNativo) return
  try {
    await StatusBar.setStyle({ style: oscuro ? Style.Dark : Style.Light })
    await StatusBar.setBackgroundColor({ color: oscuro ? '#0b0f17' : '#f4f6fb' })
  } catch {
    /* algunas versiones de Android no permiten teñir la barra */
  }
}

export async function ocultarSplash() {
  if (!esNativo) return
  try {
    await SplashScreen.hide()
  } catch {
    /* ya estaba oculta */
  }
}

/**
 * Botón «atrás» de Android: retrocede en el historial y, si ya no hay a dónde,
 * deja que el sistema cierre la app.
 */
export function atenderBotonAtras(alRetroceder: () => boolean) {
  if (!esNativo) return () => {}
  const promesa = App.addListener('backButton', () => {
    const manejado = alRetroceder()
    if (!manejado) App.exitApp()
  })
  return () => {
    void promesa.then((o) => o.remove())
  }
}

/** Avisa cuando la app pasa a segundo plano, para guardar el estado. */
export function alPasarASegundoPlano(fn: () => void) {
  if (!esNativo) return () => {}
  const promesa = App.addListener('appStateChange', ({ isActive }) => {
    if (!isActive) fn()
  })
  return () => {
    void promesa.then((o) => o.remove())
  }
}
