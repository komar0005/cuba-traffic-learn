import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import App from './App'
import './index.css'

/**
 * En el navegador el service worker es lo que permite usar la app sin
 * conexión. Dentro del APK los archivos ya están empaquetados, así que se
 * desactiva: un service worker viejo podría servir una versión anterior
 * después de actualizar la aplicación.
 */
if (Capacitor.isNativePlatform()) {
  void navigator.serviceWorker?.getRegistrations().then((rs) => rs.forEach((r) => void r.unregister()))
} else if ('serviceWorker' in navigator) {
  void import('virtual:pwa-register').then(({ registerSW }) => registerSW({ immediate: true }))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
