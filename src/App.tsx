import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Senales from './pages/Senales'
import Teoria, { ListaTeoria } from './pages/Teoria'
import Practica, { ListaPractica } from './pages/Practica'
import Examen from './pages/Examen'
import Entrenador from './pages/Entrenador'
import Calle from './pages/Calle'
import Tramites from './pages/Tramites'
import Progreso from './pages/Progreso'
import Ajustes from './pages/Ajustes'
import { BotonEnlace, Vacio } from './components/ui'
import { useAplicarAjustes } from './lib/ajustes'
import { alPasarASegundoPlano, atenderBotonAtras, ocultarSplash } from './lib/nativo'
import { sincronizar } from './lib/almacen'
import { calcularRacha, useProgreso } from './lib/progreso'

const NAV = [
  { to: '/', texto: 'Inicio', icono: IconoCasa },
  { to: '/senales', texto: 'Señales', icono: IconoSenal },
  { to: '/teoria', texto: 'Teoría', icono: IconoLibro },
  { to: '/practica', texto: 'Práctica', icono: IconoCheck },
  { to: '/progreso', texto: 'Progreso', icono: IconoGrafico },
]

export default function App() {
  useAplicarAjustes()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    void ocultarSplash()
    return alPasarASegundoPlano(sincronizar)
  }, [])

  // Botón «atrás» de Android: retrocede y, en la pantalla inicial, cierra.
  useEffect(
    () =>
      atenderBotonAtras(() => {
        if (window.location.hash === '#/' || window.location.hash === '') return false
        navigate(-1)
        return true
      }),
    [navigate],
  )

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col bg-fondo">
      <BarraSuperior />
      <main className="flex-1 px-4 pt-3 pb-28">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/senales" element={<Senales />} />
          <Route path="/entrenador" element={<Entrenador />} />
          <Route path="/teoria" element={<ListaTeoria />} />
          <Route path="/teoria/:tema" element={<Teoria />} />
          <Route path="/practica" element={<ListaPractica />} />
          <Route path="/practica/:tema" element={<Practica />} />
          <Route path="/examen" element={<Examen />} />
          <Route path="/calle" element={<Calle />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route
            path="*"
            element={
              <Vacio titulo="Página no encontrada" texto="Usa la barra de abajo para volver.">
                <BotonEnlace to="/" variante="secundario">
                  Ir al inicio
                </BotonEnlace>
              </Vacio>
            }
          />
        </Routes>
      </main>
      <BarraNavegacion />
    </div>
  )
}

function BarraSuperior() {
  const { progreso } = useProgreso()
  const racha = calcularRacha(progreso.porDia)
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-borde bg-fondo/90 px-4 py-2 backdrop-blur"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
    >
      <Link to="/" className="flex items-center gap-2">
        <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden>
          <rect width="100" height="100" rx="24" fill="var(--v-marca)" />
          <path d="M50 22 L82 80 L18 80 Z" fill="#E1261C" />
          <path d="M50 34 L73 76 L27 76 Z" fill="#FFDD00" />
          <rect x="45.5" y="44" width="9" height="17" rx="2" fill="#1A1A1A" />
          <circle cx="50" cy="69" r="4.2" fill="#1A1A1A" />
        </svg>
        <span className="text-sm font-bold tracking-tight text-texto">Vía Cuba</span>
      </Link>
      <div className="flex items-center gap-2">
        {racha > 0 && (
          <span className="rounded-full bg-superficie-2 px-2.5 py-1 text-[11px] font-bold text-suave tabular-nums">
            🔥 {racha}
          </span>
        )}
        <NavLink
          to="/ajustes"
          aria-label="Ajustes"
          className={({ isActive }) =>
            `flex size-9 items-center justify-center rounded-full transition-colors ${
              isActive ? 'bg-marca-suave text-marca' : 'text-suave hover:bg-superficie-2'
            }`
          }
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="3.2" />
            <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5v.2a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
          </svg>
        </NavLink>
      </div>
    </header>
  )
}

function BarraNavegacion() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-borde bg-superficie/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-2xl">
        {NAV.map(({ to, texto, icono: Icono }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-marca' : 'text-tenue'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icono activo={isActive} />
                  <span>{texto}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type IconoProps = { activo?: boolean }

function base(activo?: boolean) {
  return {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: activo ? 2.3 : 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
}

function IconoCasa({ activo }: IconoProps) {
  return (
    <svg {...base(activo)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  )
}

function IconoSenal({ activo }: IconoProps) {
  return (
    <svg {...base(activo)}>
      <path d="M12 2.8 21 12l-9 9.2L3 12z" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function IconoLibro({ activo }: IconoProps) {
  return (
    <svg {...base(activo)}>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19" />
      <path d="M8 7.5h7" />
    </svg>
  )
}

function IconoCheck({ activo }: IconoProps) {
  return (
    <svg {...base(activo)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="m8 12.3 2.8 2.7L16 9.5" />
    </svg>
  )
}

function IconoGrafico({ activo }: IconoProps) {
  return (
    <svg {...base(activo)}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6" />
      <path d="M13 20V8" />
      <path d="M18 20v-9" />
    </svg>
  )
}
