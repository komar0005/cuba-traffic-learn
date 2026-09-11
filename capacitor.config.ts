import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'cu.viacuba.app',
  appName: 'Vía Cuba',
  webDir: 'dist',
  android: {
    // El contenido es local: no hace falta ningún permiso de red en tiempo de uso.
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchAutoHide: true,
      backgroundColor: '#0B3C8C',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
  },
}

export default config
