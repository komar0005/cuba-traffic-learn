import { useEffect } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Senales from './pages/Senales'
import Teoria, { ListaTeoria } from './pages/Teoria'
import Practica, { ListaPractica } from './pages/Practica'
import Examen from './pages/Examen'
import Calle from './pages/Calle'
import Tramites from './pages/Tramites'
import Progreso from './pages/Progreso'
import { Vacio } from './components/ui'

const NAV = [
  { to: '/', texto: 'Inicio', icono: IconoCasa },
  { to: '/senales', texto: 'Señales', icono: IconoSenal },
  { to: '/teoria', texto: 'Teoría', icono: IconoLibro },
  { to: '/practica', texto: 'Práctica', icono: IconoCheck },
  { to: '/progreso', texto: 'Progreso', icono: IconoGrafico },
]

export default function App() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-2xl bg-slate-50">
      <AlSubirDeRuta />
      <main className="px-4 pt-5 pb-28">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/senales" element={<Senales />} />
          <Route path="/teoria" element={<ListaTeoria />} />
          <Route path="/teoria/:tema" element={<Teoria />} />
          <Route path="/practica" element={<ListaPractica />} />
          <Route path="/practica/:tema" element={<Practica />} />
          <Route path="/examen" element={<Examen />} />
          <Route path="/calle" element={<Calle />} />
          <Route path="/tramites" element={<Tramites />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route
            path="*"
            element={<Vacio titulo="Página no encontrada" texto="Usa la barra de abajo para volver." />}
          />
        </Routes>
      </main>
      <BarraNavegacion />
    </div>
  )
}

function AlSubirDeRuta() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function BarraNavegacion() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur"
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
                  isActive ? 'text-marca-700' : 'text-slate-400'
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
  }
}

function IconoCasa({ activo }: IconoProps) {
  return (
    <svg {...base(activo)} aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  )
}

function IconoSenal({ activo }: IconoProps) {
  return (
    <svg {...base(activo)} aria-hidden>
      <path d="M12 2.8 21 12l-9 9.2L3 12z" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function IconoLibro({ activo }: IconoProps) {
  return (
    <svg {...base(activo)} aria-hidden>
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5z" />
      <path d="M4 19.5A1.5 1.5 0 0 1 5.5 21H19" />
      <path d="M8 7.5h7" />
    </svg>
  )
}

function IconoCheck({ activo }: IconoProps) {
  return (
    <svg {...base(activo)} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="m8 12.3 2.8 2.7L16 9.5" />
    </svg>
  )
}

function IconoGrafico({ activo }: IconoProps) {
  return (
    <svg {...base(activo)} aria-hidden>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6" />
      <path d="M13 20V8" />
      <path d="M18 20v-9" />
    </svg>
  )
}
