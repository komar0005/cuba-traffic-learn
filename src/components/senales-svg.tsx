/**
 * Dibujo vectorial de las señales del tránsito descritas en la Ley 109
 * (Código de Seguridad Vial), artículos 156 al 180.
 *
 * Todas las figuras se dibujan sobre un lienzo normalizado de 100x100 para que
 * puedan mostrarse a cualquier tamaño sin pérdida de nitidez y sin depender de
 * archivos de imagen (la app funciona sin conexión).
 */
import type { JSX, ReactNode } from 'react'

export const C = {
  rojo: '#E1261C',
  amarillo: '#FFDD00',
  azul: '#0B4EA2',
  negro: '#1A1A1A',
  blanco: '#FFFFFF',
  gris: '#9AA0A6',
  verde: '#1F8A3B',
  asfalto: '#5E6367',
} as const

/* ---------------------------------------------------------------- marcos -- */

function TrianguloPeligro({ children }: { children?: ReactNode }) {
  return (
    <>
      <path
        d="M50 6 L96 88 Q98 94 91 94 L9 94 Q2 94 4 88 Z"
        fill={C.rojo}
        stroke={C.rojo}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M50 20 L85 85 Q86 87 83 87 L17 87 Q14 87 15 85 Z"
        fill={C.amarillo}
      />
      {children}
    </>
  )
}

function TrianguloInvertido({ children }: { children?: ReactNode }) {
  return (
    <>
      <path
        d="M6 10 L94 10 Q99 10 96 15 L54 90 Q50 96 46 90 L4 15 Q1 10 6 10 Z"
        fill={C.rojo}
      />
      <path d="M20 21 L80 21 L50 74 Z" fill={C.amarillo} />
      {children}
    </>
  )
}

function CirculoProhibicion({ children }: { children?: ReactNode }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <circle cx="50" cy="50" r="36" fill={C.blanco} />
      {children}
    </>
  )
}

function CirculoAzul({ children }: { children?: ReactNode }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill={C.blanco} />
      <circle cx="50" cy="50" r="44" fill={C.azul} />
      {children}
    </>
  )
}

function RectAzul({ children, w = 96, h = 68 }: { children?: ReactNode; w?: number; h?: number }) {
  const x = (100 - w) / 2
  const y = (100 - h) / 2
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={C.azul} />
      <rect
        x={x + 4}
        y={y + 4}
        width={w - 8}
        height={h - 8}
        rx="2"
        fill="none"
        stroke={C.blanco}
        strokeWidth="2.5"
      />
      {children}
    </>
  )
}

function Rombo({ children }: { children?: ReactNode }) {
  return (
    <>
      <path d="M50 3 L97 50 L50 97 L3 50 Z" fill={C.negro} />
      <path d="M50 7 L93 50 L50 93 L7 50 Z" fill={C.blanco} />
      <path d="M50 13 L87 50 L50 87 L13 50 Z" fill={C.negro} />
      <path d="M50 17 L83 50 L50 83 L17 50 Z" fill={C.amarillo} />
      {children}
    </>
  )
}

/** Círculo del Grupo E: la misma figura con banda diagonal de anulación. */
function CirculoFin({ children, banda = C.negro }: { children?: ReactNode; banda?: string }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill={C.negro} />
      <circle cx="50" cy="50" r="41" fill={C.blanco} />
      {children}
      <line x1="80" y1="18" x2="20" y2="82" stroke={banda} strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

/* --------------------------------------------------------------- símbolos -- */

const flechaCurvaDerecha = (
  <path
    d="M40 78 L40 56 Q40 36 60 36 L66 36"
    fill="none"
    stroke={C.negro}
    strokeWidth="9"
    strokeLinecap="butt"
  />
)

const flechaCurvaIzquierda = (
  <g transform="translate(100,0) scale(-1,1)">{flechaCurvaDerecha}</g>
)

const dobleCurvaDerecha = (
  <path
    d="M42 82 L42 66 Q42 54 54 54 Q66 54 66 42 L66 28"
    fill="none"
    stroke={C.negro}
    strokeWidth="8.5"
    strokeLinecap="butt"
  />
)

const dobleCurvaIzquierda = <g transform="translate(100,0) scale(-1,1)">{dobleCurvaDerecha}</g>

function Peaton({ x = 50, y = 62, s = 1, color = C.negro }: { x?: number; y?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill={color}>
      <circle cx="0" cy="-20" r="4.4" />
      <path d="M-3.4 -15 L3.4 -15 L6.2 -3 L3 -3 L3 14 L-0.4 14 L-0.4 2 L-2.2 2 L-2.2 14 L-5.6 14 L-5.6 -3 L-8.4 -3 Z" />
    </g>
  )
}

function Cebra({ y = 80, color = C.negro }: { y?: number; color?: string }) {
  return (
    <g fill={color}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={30 + i * 11} y={y} width="6.5" height="9" />
      ))}
    </g>
  )
}

function Bicicleta({ cx = 50, cy = 52, s = 1, color = C.negro }: { cx?: number; cy?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} fill="none" stroke={color} strokeWidth="3">
      <circle cx="-17" cy="8" r="11" />
      <circle cx="17" cy="8" r="11" />
      <path d="M-17 8 L-4 -8 L10 -8 L17 8 M-4 -8 L4 8 L17 8" strokeWidth="3" />
      <path d="M8 -12 L16 -12" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-4" cy="8" r="2.6" fill={color} stroke="none" />
    </g>
  )
}

function Auto({ cx = 50, cy = 52, s = 1, color = C.negro }: { cx?: number; cy?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} fill={color}>
      <path d="M-26 6 Q-26 -2 -18 -3 L-11 -12 Q-9 -14 -6 -14 L8 -14 Q11 -14 13 -12 L20 -3 Q26 -2 26 6 L26 9 Q26 11 24 11 L-24 11 Q-26 11 -26 9 Z" />
      <path d="M-10 -10 L6 -10 Q8 -10 9 -8 L14 -3 L-15 -3 Z" fill={C.blanco} />
      <circle cx="-15" cy="11" r="4.5" />
      <circle cx="15" cy="11" r="4.5" />
    </g>
  )
}

function Camion({ cx = 50, cy = 52, s = 1, color = C.negro }: { cx?: number; cy?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} fill={color}>
      <rect x="-6" y="-13" width="30" height="20" rx="2" />
      <path d="M-26 -5 L-12 -5 L-12 7 L-26 7 Z" />
      <path d="M-25 -4 L-15 -4 L-15 -0.5 L-25 -0.5 Z" fill={C.blanco} />
      <rect x="-27" y="6" width="52" height="3" />
      <circle cx="-18" cy="11" r="4.5" />
      <circle cx="14" cy="11" r="4.5" />
    </g>
  )
}

function Moto({ cx = 50, cy = 52, s = 1, color = C.negro }: { cx?: number; cy?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      <g fill="none" stroke={color} strokeWidth="3.4">
        <circle cx="-18" cy="9" r="9.5" />
        <circle cx="18" cy="9" r="9.5" />
        <path d="M-18 9 L-6 -2 L8 -2 L18 9" />
        <path d="M-8 -2 L-2 9 L18 9" />
      </g>
      <g fill={color}>
        <path d="M-4 -6 L12 -6 L14 -2 L-2 -2 Z" />
        <circle cx="3" cy="-13" r="4.6" />
        <path d="M-1 -9 L7 -9 L10 -2 L2 -2 Z" />
      </g>
    </g>
  )
}

/** Flecha recta con punta, en cualquiera de los dos sentidos. */
function FlechaRecta({
  x = 50,
  y1 = 78,
  y2 = 26,
  ancho = 11,
  punta = 22,
  color = C.blanco,
  rot = 0,
}: {
  x?: number
  y1?: number
  y2?: number
  ancho?: number
  punta?: number
  color?: string
  rot?: number
}) {
  const a = ancho / 2
  const p = punta / 2
  // y1 es la cola y y2 la punta; el signo decide hacia dónde apunta.
  const dir = Math.sign(y2 - y1) || -1
  const base = y2 - dir * punta * 0.8
  return (
    <g transform={`rotate(${rot} 50 50)`}>
      <path
        d={`M${x - a} ${y1} L${x - a} ${base} L${x - p} ${base} L${x} ${y2} L${x + p} ${base} L${x + a} ${base} L${x + a} ${y1} Z`}
        fill={color}
      />
    </g>
  )
}

function Texto({
  children,
  y = 58,
  size = 30,
  color = C.negro,
  weight = 700,
  x = 50,
}: {
  children: ReactNode
  y?: number
  size?: number
  color?: string
  weight?: number
  x?: number
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fontWeight={weight}
      fill={color}
      fontFamily="'Helvetica Neue',Arial,sans-serif"
      letterSpacing="-0.5"
    >
      {children}
    </text>
  )
}

/* ------------------------------------------------------- Grupo A: peligro -- */

const GRUPO_A: Record<string, JSX.Element> = {
  'a-cruce-preferencia': (
    <TrianguloPeligro>
      <rect x="45.5" y="34" width="9" height="50" fill={C.negro} />
      <rect x="30" y="56" width="40" height="7" fill={C.negro} />
    </TrianguloPeligro>
  ),
  'a-entronque-derecho': (
    <TrianguloPeligro>
      <g stroke={C.negro} strokeWidth="8" strokeLinecap="butt">
        <line x1="44" y1="86" x2="44" y2="40" />
        <line x1="44" y1="62" x2="68" y2="62" />
      </g>
    </TrianguloPeligro>
  ),
  'a-entronque-izquierdo': (
    <TrianguloPeligro>
      <g stroke={C.negro} strokeWidth="8" strokeLinecap="butt">
        <line x1="56" y1="86" x2="56" y2="40" />
        <line x1="56" y1="62" x2="32" y2="62" />
      </g>
    </TrianguloPeligro>
  ),
  'a-cruce': (
    <TrianguloPeligro>
      <g stroke={C.negro} strokeWidth="8.5" strokeLinecap="butt">
        <line x1="34" y1="46" x2="66" y2="80" />
        <line x1="66" y1="46" x2="34" y2="80" />
      </g>
    </TrianguloPeligro>
  ),
  'a-cruce-semaforo': (
    <TrianguloPeligro>
      <rect x="41" y="38" width="18" height="46" rx="5" fill={C.negro} />
      <circle cx="50" cy="49" r="5" fill={C.rojo} />
      <circle cx="50" cy="61" r="5" fill={C.amarillo} />
      <circle cx="50" cy="73" r="5" fill={C.verde} />
    </TrianguloPeligro>
  ),
  'a-circulacion-giratoria': (
    <TrianguloPeligro>
      <g fill="none" stroke={C.negro} strokeWidth="6" strokeLinecap="round">
        <path d="M36 62 A16 16 0 1 1 52 78" />
      </g>
      <path d="M52 84 L44 78 L52 72 Z" fill={C.negro} />
      <path d="M30 62 L36 54 L42 62 Z" fill={C.negro} />
    </TrianguloPeligro>
  ),
  'a-paso-nivel-con-proteccion': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <rect x="30" y="55" width="40" height="6" />
        <rect x="34" y="45" width="6" height="30" />
        <rect x="47" y="45" width="6" height="30" />
        <rect x="60" y="45" width="6" height="30" />
      </g>
    </TrianguloPeligro>
  ),
  'a-paso-nivel-sin-proteccion': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <rect x="30" y="52" width="40" height="18" rx="3" />
        <rect x="38" y="43" width="14" height="10" rx="2" />
        <rect x="27" y="69" width="46" height="4" />
        <circle cx="38" cy="75" r="4" />
        <circle cx="52" cy="75" r="4" />
        <rect x="66" y="46" width="4" height="8" />
      </g>
    </TrianguloPeligro>
  ),
  'a-vuelo-rasante': (
    <TrianguloPeligro>
      <g transform="translate(50,64) rotate(-20)">
        <path
          d="M-30 2 L-4 -2 L-4 -22 Q-4 -26 0 -26 Q4 -26 4 -22 L4 -2 L30 2 L30 8 L4 6 L4 16 L12 20 L12 24 L0 21 L-12 24 L-12 20 L-4 16 L-4 6 L-30 8 Z"
          fill={C.negro}
        />
      </g>
    </TrianguloPeligro>
  ),
  'a-perfil-irregular': (
    <TrianguloPeligro>
      <path d="M22 80 Q22 74 30 72 Q42 68 50 56 Q58 68 70 72 Q78 74 78 80 Z" fill={C.negro} />
    </TrianguloPeligro>
  ),
  'a-curva-derecha': <TrianguloPeligro>{flechaCurvaDerecha}</TrianguloPeligro>,
  'a-curva-izquierda': <TrianguloPeligro>{flechaCurvaIzquierda}</TrianguloPeligro>,
  'a-doble-curva-derecha': <TrianguloPeligro>{dobleCurvaDerecha}</TrianguloPeligro>,
  'a-doble-curva-izquierda': <TrianguloPeligro>{dobleCurvaIzquierda}</TrianguloPeligro>,
  'a-viento-lateral': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <rect x="28" y="42" width="4" height="40" />
        <path d="M33 46 L64 52 L33 62 Z" />
        <path d="M66 60 Q74 64 66 68 Q58 72 66 76" fill="none" stroke={C.negro} strokeWidth="3.5" />
      </g>
    </TrianguloPeligro>
  ),
  'a-bajada-peligrosa': (
    <TrianguloPeligro>
      <path d="M24 82 L76 52 L76 82 Z" fill={C.negro} />
      <g fill={C.negro}>
        <rect x="40" y="44" width="22" height="10" rx="2" transform="rotate(-30 51 49)" />
      </g>
    </TrianguloPeligro>
  ),
  'a-obras': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <circle cx="46" cy="43" r="5" />
        <path d="M38 52 L52 52 L56 74 L48 74 L46 62 L44 74 L36 74 Z" />
        <rect x="52" y="44" width="24" height="5" transform="rotate(35 64 46)" />
        <path d="M66 58 L80 58 L84 66 L62 66 Z" />
      </g>
    </TrianguloPeligro>
  ),
  'a-pavimento-resbaladizo': (
    <TrianguloPeligro>
      <Auto cx={50} cy={60} s={0.85} />
      <g stroke={C.negro} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M26 78 Q31 70 26 62" />
        <path d="M74 78 Q69 70 74 62" />
      </g>
    </TrianguloPeligro>
  ),
  'a-paso-peatones-cebra': (
    <TrianguloPeligro>
      <Peaton x={50} y={62} s={1.25} />
      <Cebra y={79} />
    </TrianguloPeligro>
  ),
  'a-paso-peatones-paralelas': (
    <TrianguloPeligro>
      <Peaton x={50} y={62} s={1.25} />
      <g fill={C.negro}>
        <rect x="26" y="79" width="48" height="3.5" />
        <rect x="26" y="86" width="48" height="3.5" />
      </g>
    </TrianguloPeligro>
  ),
  'a-ninos': (
    <TrianguloPeligro>
      <Peaton x={40} y={64} s={1.05} />
      <g fill={C.negro} transform="translate(62,64) scale(0.9)">
        <circle cx="0" cy="-20" r="4.4" />
        <path d="M-8 -14 L8 -14 L10 -4 L5 -4 L5 14 L1 14 L1 3 L-1 3 L-1 14 L-5 14 L-5 -4 L-10 -4 Z" />
      </g>
    </TrianguloPeligro>
  ),
  'a-animal-domestico': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <path d="M28 58 Q28 52 34 52 L60 52 Q72 52 74 60 L74 68 Q74 72 70 72 L69 82 L64 82 L64 72 L52 72 L52 82 L47 82 L47 72 L38 72 L38 82 L33 82 L33 72 L29 72 Q26 72 26 68 Z" />
        <path d="M27 52 Q20 48 22 44 Q28 45 30 51 Z" />
        <path d="M74 60 Q80 58 80 62 Q80 66 75 65 Z" />
      </g>
    </TrianguloPeligro>
  ),
  'a-doble-sentido': (
    <TrianguloPeligro>
      <FlechaRecta x={40} y1={44} y2={84} ancho={8} punta={16} color={C.negro} />
      <FlechaRecta x={60} y1={84} y2={44} ancho={8} punta={16} color={C.negro} />
    </TrianguloPeligro>
  ),
  'a-salida-ciclistas': (
    <TrianguloPeligro>
      <Bicicleta cx={50} cy={64} s={0.9} />
      <g fill={C.negro} transform="translate(50,46) scale(0.75)">
        <circle cx="0" cy="0" r="5" />
        <path d="M-8 6 L8 6 L6 16 L-6 16 Z" />
      </g>
    </TrianguloPeligro>
  ),
  'a-desvio': (
    <TrianguloPeligro>
      <path
        d="M42 84 L42 62 Q42 52 54 52 L60 52"
        fill="none"
        stroke={C.negro}
        strokeWidth="7"
      />
      <path d="M68 52 L56 45 L56 59 Z" fill={C.negro} />
      <rect x="34" y="40" width="6" height="22" fill={C.negro} />
    </TrianguloPeligro>
  ),
  'a-otros-peligros': (
    <TrianguloPeligro>
      <g fill={C.negro}>
        <path d="M46 38 L54 38 L52.6 70 L47.4 70 Z" />
        <circle cx="50" cy="79" r="4.6" />
      </g>
    </TrianguloPeligro>
  ),
}

/** Placa azul del Grupo B con un «Ceda el Paso» pequeño y dos renglones. */
function PlacaCeda({ arriba, abajo }: { arriba: string; abajo: string }) {
  return (
    <>
      <rect x="8" y="14" width="84" height="72" rx="4" fill={C.azul} />
      <rect x="11" y="17" width="78" height="66" rx="2" fill="none" stroke={C.blanco} strokeWidth="2.5" />
      <Texto y={31} size={11} color={C.blanco}>
        {arriba}
      </Texto>
      <path d="M32 38 L68 38 L50 70 Z" fill={C.rojo} />
      <path d="M38 42 L62 42 L50 63 Z" fill={C.amarillo} />
      <Texto y={78} size={10} color={C.blanco}>
        {abajo}
      </Texto>
    </>
  )
}

/* ----------------------------------------------------- Grupo B: prioridad -- */

const GRUPO_B: Record<string, JSX.Element> = {
  'b-pare': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <circle cx="50" cy="50" r="39" fill={C.blanco} />
      <Texto y={39} size={15}>
        PARE
      </Texto>
      <path d="M20 44 L80 44 L50 96 Z" fill={C.rojo} />
      <path d="M31 50 L69 50 L50 83 Z" fill={C.blanco} />
    </>
  ),
  'b-ceda-el-paso': (
    <TrianguloInvertido>
      <Texto y={38} size={9.5}>
        CEDA EL
      </Texto>
      <Texto y={50} size={9.5}>
        PASO
      </Texto>
    </TrianguloInvertido>
  ),
  'b-prioridad-sentido-contrario': (
    <CirculoProhibicion>
      <FlechaRecta x={38} y1={24} y2={76} ancho={9} punta={18} color={C.negro} />
      <FlechaRecta x={62} y1={76} y2={24} ancho={9} punta={18} color={C.rojo} />
    </CirculoProhibicion>
  ),
  'b-prioridad-circulacion': (
    <RectAzul w={70} h={92}>
      <FlechaRecta x={38} y1={24} y2={76} ancho={9} punta={18} color={C.rojo} />
      <FlechaRecta x={62} y1={76} y2={24} ancho={9} punta={18} color={C.blanco} />
    </RectAzul>
  ),
  'b-via-con-prioridad': <Rombo />,
  'b-fin-via-con-prioridad': (
    <Rombo>
      <clipPath id="rombo-fin">
        <path d="M50 13 L87 50 L50 87 L13 50 Z" />
      </clipPath>
      <g clipPath="url(#rombo-fin)">
        <path d="M18 66 L66 18 L82 34 L34 82 Z" fill={C.negro} />
      </g>
    </Rombo>
  ),
  'b-ceda-luz-roja': <PlacaCeda arriba="DERECHA" abajo="CON LUZ ROJA" />,
  'b-ceda-izquierda-luz-verde': <PlacaCeda arriba="IZQUIERDA" abajo="CON LUZ VERDE" />,
}

/* --------------------------------------------------- Grupo C: prohibición -- */

function Barra() {
  return <rect x="18" y="43" width="64" height="14" rx="1" fill={C.blanco} />
}

const GRUPO_C: Record<string, JSX.Element> = {
  'c-circulacion-prohibida': <CirculoProhibicion />,
  'c-acceso-prohibido': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <Barra />
    </>
  ),
  'c-prohibido-motor-excepto-motos': (
    <CirculoProhibicion>
      <Auto cx={50} cy={52} s={1.05} />
    </CirculoProhibicion>
  ),
  'c-prohibido-motocicletas': (
    <CirculoProhibicion>
      <Moto cx={50} cy={52} s={1.05} />
    </CirculoProhibicion>
  ),
  'c-prohibido-todos-motor': (
    <CirculoProhibicion>
      <Auto cx={50} cy={40} s={0.78} />
      <Moto cx={50} cy={68} s={0.72} />
    </CirculoProhibicion>
  ),
  'c-prohibido-carga-3500': (
    <CirculoProhibicion>
      <Camion cx={50} cy={52} s={1} />
    </CirculoProhibicion>
  ),
  'c-prohibido-ciclos': (
    <CirculoProhibicion>
      <Bicicleta cx={50} cy={52} s={1.1} />
    </CirculoProhibicion>
  ),
  'c-prohibido-traccion-animal': (
    <CirculoProhibicion>
      <g transform="translate(50,54) scale(0.92)">
        <g fill={C.negro}>
          <path d="M-26 -2 L-4 -2 L-4 -10 L-24 -10 Z" />
          <path d="M-4 -2 L4 -2 L4 2 L-26 2 L-26 -2 Z" />
          <path d="M6 -4 L14 -4 L20 -14 L24 -16 L26 -12 L22 -8 L22 4 L18 4 L17 -3 L10 -3 L9 8 L5 8 L6 0 Z" />
          <path d="M18 4 L20 12 L17 12 L14 5 Z" />
          <path d="M8 3 L8 12 L5 12 L5 4 Z" />
        </g>
        <circle cx="-18" cy="7" r="6.5" fill="none" stroke={C.negro} strokeWidth="3" />
        <circle cx="-1" cy="7" r="6.5" fill="none" stroke={C.negro} strokeWidth="3" />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-animales-montura': (
    <CirculoProhibicion>
      <g fill={C.negro} transform="translate(50,54) scale(0.95)">
        <path d="M-22 4 L-14 -6 L6 -6 L16 -12 L20 -14 L22 -8 L18 -2 L18 8 L14 8 L12 0 L-2 0 L-4 10 L-8 10 L-8 2 L-16 6 L-16 12 L-20 12 Z" />
        <circle cx="0" cy="-18" r="4" />
        <path d="M-4 -14 L6 -14 L4 -7 L-4 -7 Z" />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-carros-mano': (
    <CirculoProhibicion>
      <g transform="translate(50,54) scale(0.95)">
        <g fill={C.negro}>
          <path d="M-26 -6 L0 -6 L0 2 L-26 2 Z" />
          <path d="M0 -2 L10 -2 L14 4 L2 4 Z" />
          <circle cx="16" cy="-16" r="4.6" />
          <path d="M12 -11 L20 -11 L22 -2 L14 -2 Z" />
          <path d="M12 -9 L4 -4 L2 -7 L11 -12 Z" />
          <path d="M14 2 L18 12 L14 13 L10 4 Z" />
          <path d="M20 2 L23 12 L19 13 L16 4 Z" />
        </g>
        <circle cx="-18" cy="8" r="6.5" fill="none" stroke={C.negro} strokeWidth="3.2" />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-peatones': (
    <CirculoProhibicion>
      <Peaton x={50} y={62} s={1.5} />
    </CirculoProhibicion>
  ),
  'c-prohibido-peso': (
    <CirculoProhibicion>
      <Camion cx={50} cy={42} s={0.72} />
      <Texto y={76} size={20}>
        5 t
      </Texto>
    </CirculoProhibicion>
  ),
  'c-prohibido-peso-eje': (
    <CirculoProhibicion>
      <Texto y={44} size={19}>
        6,5 t
      </Texto>
      <g fill={C.negro}>
        <rect x="30" y="56" width="40" height="5" />
        <circle cx="36" cy="68" r="6" />
        <circle cx="64" cy="68" r="6" />
        <rect x="36" y="61" width="28" height="4" />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-longitud': (
    <CirculoProhibicion>
      <Camion cx={50} cy={44} s={0.7} />
      <g stroke={C.negro} strokeWidth="2.5">
        <line x1="24" y1="70" x2="76" y2="70" />
        <line x1="24" y1="65" x2="24" y2="75" />
        <line x1="76" y1="65" x2="76" y2="75" />
      </g>
      <Texto y={86} size={16}>
        10 m
      </Texto>
    </CirculoProhibicion>
  ),
  'c-prohibido-anchura': (
    <CirculoProhibicion>
      <Texto y={62} size={30}>
        2,30
      </Texto>
      <path d="M14 50 L22 44 L22 56 Z" fill={C.negro} />
      <path d="M86 50 L78 44 L78 56 Z" fill={C.negro} />
    </CirculoProhibicion>
  ),
  'c-prohibido-altura': (
    <CirculoProhibicion>
      <Texto y={62} size={30}>
        3,50
      </Texto>
      <path d="M50 16 L44 24 L56 24 Z" fill={C.negro} />
      <path d="M50 84 L44 76 L56 76 Z" fill={C.negro} />
    </CirculoProhibicion>
  ),
  'c-prohibido-remolque': (
    <CirculoProhibicion>
      <g transform="translate(2,0)">
        <Camion cx={36} cy={52} s={0.62} />
      </g>
      <g fill={C.negro}>
        <rect x="56" y="42" width="24" height="14" rx="2" />
        <rect x="52" y="52" width="6" height="3" />
        <circle cx="68" cy="60" r="4.2" />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-agricolas': (
    <CirculoProhibicion>
      <g transform="translate(52,48) scale(0.92)">
        <g fill={C.negro}>
          <path d="M-2 -20 L14 -20 L14 -6 L-2 -6 Z" />
          <path d="M-24 -8 L14 -8 L14 6 L-24 6 Z" />
          <rect x="-26" y="-18" width="6" height="10" />
          <path d="M-20 -18 L-6 -18 L-6 -14 L-20 -14 Z" />
        </g>
        <circle cx="-17" cy="10" r="7.5" fill={C.blanco} stroke={C.negro} strokeWidth="4" />
        <circle cx="10" cy="8" r="14" fill={C.blanco} stroke={C.negro} strokeWidth="6" />
        <circle cx="10" cy="8" r="4" fill={C.negro} />
      </g>
    </CirculoProhibicion>
  ),
  'c-prohibido-distancia-minima': (
    <CirculoProhibicion>
      <Auto cx={34} cy={58} s={0.6} />
      <Auto cx={70} cy={58} s={0.6} />
      <Texto y={36} size={17}>
        70 m
      </Texto>
      <g stroke={C.negro} strokeWidth="2">
        <line x1="42" y1="44" x2="62" y2="44" />
      </g>
    </CirculoProhibicion>
  ),
  'c-velocidad-maxima': (
    <CirculoProhibicion>
      <Texto y={66} size={44}>
        60
      </Texto>
    </CirculoProhibicion>
  ),
  'c-prohibido-girar-derecha': (
    <CirculoProhibicion>
      <path d="M42 82 L42 46 L64 46" fill="none" stroke={C.negro} strokeWidth="9" />
      <path d="M76 46 L60 36 L60 56 Z" fill={C.negro} />
      <line x1="80" y1="20" x2="20" y2="80" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
    </CirculoProhibicion>
  ),
  'c-prohibido-girar-izquierda': (
    <CirculoProhibicion>
      <path d="M58 82 L58 46 L36 46" fill="none" stroke={C.negro} strokeWidth="9" />
      <path d="M24 46 L40 36 L40 56 Z" fill={C.negro} />
      <line x1="80" y1="20" x2="20" y2="80" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
    </CirculoProhibicion>
  ),
  'c-prohibido-giro-u': (
    <CirculoProhibicion>
      <path d="M62 82 L62 42 A12 12 0 0 0 38 42 L38 58" fill="none" stroke={C.negro} strokeWidth="8.5" />
      <path d="M38 76 L28 58 L48 58 Z" fill={C.negro} />
      <line x1="80" y1="20" x2="20" y2="80" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
    </CirculoProhibicion>
  ),
  'c-prohibido-adelantar': (
    <CirculoProhibicion>
      <Auto cx={34} cy={55} s={0.62} color={C.rojo} />
      <Auto cx={68} cy={55} s={0.62} color={C.negro} />
    </CirculoProhibicion>
  ),
  'c-prohibido-adelantar-carga': (
    <CirculoProhibicion>
      <g transform="translate(-4,0)">
        <Camion cx={34} cy={55} s={0.6} color={C.rojo} />
      </g>
      <Auto cx={70} cy={55} s={0.6} color={C.negro} />
    </CirculoProhibicion>
  ),
  'c-estacionamiento-prohibido': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <circle cx="50" cy="50" r="38" fill={C.azul} />
      <line x1="76" y1="24" x2="24" y2="76" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
    </>
  ),
  'c-prohibido-estacionar-detener': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <circle cx="50" cy="50" r="38" fill={C.azul} />
      <line x1="76" y1="24" x2="24" y2="76" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
      <line x1="24" y1="24" x2="76" y2="76" stroke={C.rojo} strokeWidth="9" strokeLinecap="round" />
    </>
  ),
  'c-prohibido-pasar-sin-detenerse': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.rojo} />
      <circle cx="50" cy="50" r="38" fill={C.blanco} />
      <rect x="26" y="43" width="48" height="14" rx="3" fill={C.negro} />
    </>
  ),
}

/* ---------------------------------------------------- Grupo D: obligación -- */

const GRUPO_D: Record<string, JSX.Element> = {
  'd-sentido-obligatorio-recto': (
    <CirculoAzul>
      <FlechaRecta x={50} y1={76} y2={22} ancho={13} punta={26} />
    </CirculoAzul>
  ),
  'd-sentido-obligatorio-derecha': (
    <CirculoAzul>
      <g transform="rotate(90 50 50)">
        <FlechaRecta x={50} y1={76} y2={22} ancho={13} punta={26} />
      </g>
    </CirculoAzul>
  ),
  'd-sentido-obligatorio-izquierda': (
    <CirculoAzul>
      <g transform="rotate(-90 50 50)">
        <FlechaRecta x={50} y1={76} y2={22} ancho={13} punta={26} />
      </g>
    </CirculoAzul>
  ),
  'd-sentido-obligatorio-giro-derecha': (
    <CirculoAzul>
      <path d="M38 78 L38 46 L60 46" fill="none" stroke={C.blanco} strokeWidth="12" />
      <path d="M76 46 L58 34 L58 58 Z" fill={C.blanco} />
    </CirculoAzul>
  ),
  'd-sentido-obligatorio-giro-izquierda': (
    <CirculoAzul>
      <path d="M62 78 L62 46 L40 46" fill="none" stroke={C.blanco} strokeWidth="12" />
      <path d="M24 46 L42 34 L42 58 Z" fill={C.blanco} />
    </CirculoAzul>
  ),
  'd-sentido-giratorio': (
    <CirculoAzul>
      <g fill="none" stroke={C.blanco} strokeWidth="8">
        <path d="M32 58 A20 20 0 1 1 52 78" />
      </g>
      <path d="M54 86 L42 77 L54 68 Z" fill={C.blanco} />
      <path d="M24 58 L32 46 L40 58 Z" fill={C.blanco} />
    </CirculoAzul>
  ),
  'd-paso-obligatorio-derecha': (
    <CirculoAzul>
      <g transform="rotate(40 50 50)">
        <FlechaRecta x={50} y1={76} y2={22} ancho={13} punta={26} />
      </g>
    </CirculoAzul>
  ),
  'd-paso-obligatorio-izquierda': (
    <CirculoAzul>
      <g transform="rotate(-40 50 50)">
        <FlechaRecta x={50} y1={76} y2={22} ancho={13} punta={26} />
      </g>
    </CirculoAzul>
  ),
  'd-via-ciclistas': (
    <CirculoAzul>
      <Bicicleta cx={50} cy={52} s={1.1} color={C.blanco} />
    </CirculoAzul>
  ),
  'd-via-peatones': (
    <CirculoAzul>
      <Peaton x={50} y={62} s={1.5} color={C.blanco} />
    </CirculoAzul>
  ),
  'd-velocidad-minima': (
    <CirculoAzul>
      <Texto y={66} size={44} color={C.blanco}>
        30
      </Texto>
    </CirculoAzul>
  ),
  'd-via-camiones': (
    <CirculoAzul>
      <Camion cx={50} cy={52} s={1} color={C.blanco} />
    </CirculoAzul>
  ),
  'd-via-omnibus': (
    <CirculoAzul>
      <g fill={C.blanco} transform="translate(50,52)">
        <rect x="-26" y="-14" width="52" height="24" rx="4" />
        <g fill={C.azul}>
          {[-20, -10, 0, 10].map((x) => (
            <rect key={x} x={x} y={-10} width="8" height="8" />
          ))}
        </g>
        <circle cx="-16" cy="13" r="4.5" />
        <circle cx="16" cy="13" r="4.5" />
      </g>
    </CirculoAzul>
  ),
}

/* ------------------------------------------- Grupo E: fin de prohibición --- */

const GRUPO_E: Record<string, JSX.Element> = {
  'e-fin-velocidad-maxima': (
    <CirculoFin>
      <Texto y={66} size={44} color={C.gris}>
        50
      </Texto>
    </CirculoFin>
  ),
  'e-fin-prohibido-adelantar': (
    <CirculoFin>
      <Auto cx={34} cy={55} s={0.62} color={C.gris} />
      <Auto cx={68} cy={55} s={0.62} color={C.gris} />
    </CirculoFin>
  ),
  'e-fin-prohibido-adelantar-carga': (
    <CirculoFin>
      <g transform="translate(-4,0)">
        <Camion cx={34} cy={55} s={0.6} color={C.gris} />
      </g>
      <Auto cx={70} cy={55} s={0.6} color={C.gris} />
    </CirculoFin>
  ),
  'e-fin-velocidad-minima': (
    <>
      <circle cx="50" cy="50" r="46" fill={C.blanco} />
      <circle cx="50" cy="50" r="44" fill={C.azul} />
      <Texto y={66} size={44} color={C.blanco}>
        30
      </Texto>
      <line x1="80" y1="18" x2="20" y2="82" stroke={C.rojo} strokeWidth="7" strokeLinecap="round" />
    </>
  ),
  'e-fin-todas-prohibiciones': (
    <CirculoFin>
      <g stroke={C.negro} strokeWidth="4" strokeLinecap="round">
        <line x1="72" y1="24" x2="26" y2="70" />
        <line x1="78" y1="32" x2="32" y2="78" />
        <line x1="66" y1="20" x2="22" y2="64" />
      </g>
    </CirculoFin>
  ),
}

/* --------------------------------------------------- Grupo F: información -- */

const GRUPO_F: Record<string, JSX.Element> = {
  'f-via-sentido-unico': (
    <RectAzul w={62} h={92}>
      <FlechaRecta x={50} y1={80} y2={22} ancho={14} punta={26} />
    </RectAzul>
  ),
  'f-sentido-circulacion': (
    <RectAzul w={96} h={44}>
      <g transform="rotate(90 50 50)">
        <FlechaRecta x={50} y1={76} y2={26} ancho={13} punta={22} />
      </g>
    </RectAzul>
  ),
  'f-via-sin-salida': (
    <RectAzul w={70} h={92}>
      <rect x="46" y="28" width="8" height="50" fill={C.blanco} />
      <rect x="40" y="22" width="20" height="8" fill={C.rojo} />
    </RectAzul>
  ),
  'f-policlinico': (
    <RectAzul w={84} h={84}>
      <rect x="24" y="24" width="52" height="52" fill={C.blanco} />
      <path d="M44 30 L56 30 L56 44 L70 44 L70 56 L56 56 L56 70 L44 70 L44 56 L30 56 L30 44 L44 44 Z" fill={C.rojo} />
    </RectAzul>
  ),
  'f-paso-peatones-cebra': (
    <RectAzul w={84} h={84}>
      <path d="M24 74 L34 30 L66 30 L76 74 Z" fill={C.blanco} />
      <g fill={C.azul}>
        <rect x="30" y="58" width="7" height="16" />
        <rect x="41" y="58" width="7" height="16" />
        <rect x="52" y="58" width="7" height="16" />
        <rect x="63" y="58" width="7" height="16" />
      </g>
      <Peaton x={50} y={52} s={1.05} color={C.azul} />
    </RectAzul>
  ),
  'f-paso-peatones-paralelas': (
    <RectAzul w={84} h={84}>
      <path d="M24 74 L34 30 L66 30 L76 74 Z" fill={C.blanco} />
      <g fill={C.azul}>
        <rect x="26" y="62" width="48" height="4" />
        <rect x="26" y="70" width="48" height="4" />
      </g>
      <Peaton x={50} y={54} s={1.05} color={C.azul} />
    </RectAzul>
  ),
  'f-paso-peatones-desnivel': (
    <RectAzul w={84} h={84}>
      <Peaton x={44} y={52} s={1.15} color={C.blanco} />
      <g fill={C.blanco}>
        <rect x="28" y="70" width="14" height="6" />
        <rect x="42" y="64" width="14" height="12" />
        <rect x="56" y="58" width="14" height="18" />
      </g>
    </RectAzul>
  ),
  'f-area-descanso': (
    <RectAzul w={84} h={84}>
      <Texto y={62} size={46} color={C.blanco}>
        P
      </Texto>
    </RectAzul>
  ),
  'f-auxilio-carretera': (
    <RectAzul w={84} h={84}>
      <rect x="24" y="24" width="52" height="52" fill={C.blanco} />
      <g fill={C.negro}>
        <circle cx="42" cy="38" r="6" />
        <path d="M32 62 Q32 48 42 48 Q52 48 52 62 Z" />
        <path d="M56 40 L70 40 L70 44 L62 52 L70 52 L70 62 L54 62 L54 58 L62 50 L56 50 Z" />
      </g>
    </RectAzul>
  ),
  'f-telefono-emergencia': (
    <RectAzul w={84} h={84}>
      <rect x="24" y="24" width="52" height="52" fill={C.blanco} />
      <path
        d="M37 33 Q33 37 34 44 Q37 62 55 67 Q61 68 64 64 L57 56 Q53 58 50 55 L45 50 Q42 47 44 43 Z"
        fill={C.negro}
      />
      <Texto y={72} size={11}>
        S.O.S
      </Texto>
    </RectAzul>
  ),
}

/* -------------------------------- Grupo G: orientación / Grupo H: nivel --- */

const GRUPO_GH: Record<string, JSX.Element> = {
  'g-poblacion': (
    <>
      <rect x="6" y="30" width="88" height="40" rx="3" fill={C.azul} />
      <rect x="9" y="33" width="82" height="34" rx="2" fill="none" stroke={C.blanco} strokeWidth="2" />
      <Texto y={57} size={17} color={C.blanco}>
        GÜINES
      </Texto>
    </>
  ),
  'g-velocidad-maxima-aconsejable': (
    <RectAzul w={84} h={84}>
      <Texto y={66} size={44} color={C.blanco}>
        70
      </Texto>
    </RectAzul>
  ),
  'g-giro-u-permitido': (
    <RectAzul w={76} h={90}>
      <path d="M60 78 L60 44 A10 10 0 0 0 40 44 L40 60" fill="none" stroke={C.blanco} strokeWidth="9" />
      <path d="M40 76 L31 58 L49 58 Z" fill={C.blanco} />
    </RectAzul>
  ),
  'g-via-vehiculos-lentos': (
    <RectAzul w={90} h={76}>
      <Camion cx={50} cy={44} s={0.85} color={C.blanco} />
      <path d="M56 68 L66 68 L66 74 L74 66 L66 58 L66 64 L52 64 Z" fill={C.blanco} />
    </RectAzul>
  ),
  'h-cruz-una-via': (
    <>
      <g stroke={C.rojo} strokeWidth="13" strokeLinecap="butt">
        <line x1="14" y1="22" x2="86" y2="78" />
        <line x1="86" y1="22" x2="14" y2="78" />
      </g>
      <g stroke={C.blanco} strokeWidth="6" strokeLinecap="butt">
        <line x1="18" y1="25" x2="82" y2="75" />
        <line x1="82" y1="25" x2="18" y2="75" />
      </g>
    </>
  ),
  'h-cruz-dos-vias': (
    <>
      <g stroke={C.rojo} strokeWidth="11" strokeLinecap="butt">
        <line x1="14" y1="16" x2="86" y2="62" />
        <line x1="86" y1="16" x2="14" y2="62" />
        <line x1="26" y1="66" x2="50" y2="90" />
        <line x1="74" y1="66" x2="50" y2="90" />
      </g>
      <g stroke={C.blanco} strokeWidth="4.5" strokeLinecap="butt">
        <line x1="18" y1="19" x2="82" y2="59" />
        <line x1="82" y1="19" x2="18" y2="59" />
      </g>
    </>
  ),
}

/* ------------------------------------- señales horizontales (pavimento) ---- */

function Calzada({ children }: { children?: ReactNode }) {
  return (
    <>
      <rect x="0" y="10" width="100" height="80" fill={C.asfalto} />
      {children}
    </>
  )
}

const MARCAS: Record<string, JSX.Element> = {
  'm-linea-continua': (
    <Calzada>
      <rect x="0" y="47" width="100" height="6" fill={C.amarillo} />
    </Calzada>
  ),
  'm-linea-discontinua': (
    <Calzada>
      <g fill={C.amarillo}>
        {[2, 22, 42, 62, 82].map((x) => (
          <rect key={x} x={x} y="47" width="12" height="6" />
        ))}
      </g>
    </Calzada>
  ),
  'm-doble-continua': (
    <Calzada>
      <rect x="0" y="43" width="100" height="5" fill={C.amarillo} />
      <rect x="0" y="52" width="100" height="5" fill={C.amarillo} />
    </Calzada>
  ),
  'm-continua-discontinua': (
    <Calzada>
      <rect x="0" y="43" width="100" height="5" fill={C.amarillo} />
      <g fill={C.amarillo}>
        {[2, 22, 42, 62, 82].map((x) => (
          <rect key={x} x={x} y="52" width="12" height="5" />
        ))}
      </g>
    </Calzada>
  ),
  'm-linea-borde': (
    <Calzada>
      <rect x="0" y="20" width="100" height="5" fill={C.blanco} />
      <rect x="0" y="75" width="100" height="5" fill={C.blanco} />
      <g fill={C.blanco}>
        {[2, 22, 42, 62, 82].map((x) => (
          <rect key={x} x={x} y="48" width="12" height="4" />
        ))}
      </g>
    </Calzada>
  ),
  'm-canalizacion': (
    <Calzada>
      <rect x="42" y="10" width="16" height="40" fill={C.blanco} opacity="0.15" />
      <g fill={C.blanco}>
        <rect x="40" y="10" width="4" height="42" />
        <rect x="56" y="10" width="4" height="42" />
        <rect x="20" y="60" width="60" height="4" />
      </g>
      <rect x="0" y="72" width="100" height="4" fill={C.amarillo} />
    </Calzada>
  ),
  'm-linea-pare': (
    <Calzada>
      <rect x="30" y="40" width="52" height="10" fill={C.blanco} />
      <Texto y={72} size={18} color={C.blanco}>
        PARE
      </Texto>
    </Calzada>
  ),
  'm-linea-ceda': (
    <Calzada>
      <g fill={C.blanco}>
        {[30, 45, 60, 75].map((x) => (
          <rect key={x} x={x} y="40" width="10" height="9" />
        ))}
        <path d="M42 58 L70 58 L56 78 Z" />
      </g>
    </Calzada>
  ),
  'm-cebra': (
    <Calzada>
      <g fill={C.blanco}>
        {[14, 28, 42, 56, 70].map((x) => (
          <rect key={x} x={x} y="18" width="9" height="64" />
        ))}
      </g>
    </Calzada>
  ),
  'm-doble-linea-peatones': (
    <Calzada>
      <g fill={C.blanco}>
        <rect x="28" y="14" width="5" height="72" />
        <rect x="66" y="14" width="5" height="72" />
      </g>
    </Calzada>
  ),
  'm-paso-nivel': (
    <Calzada>
      <g stroke={C.blanco} strokeWidth="7" strokeLinecap="butt">
        <line x1="28" y1="28" x2="72" y2="72" />
        <line x1="72" y1="28" x2="28" y2="72" />
      </g>
      <Texto x={16} y={56} size={16} color={C.blanco}>
        F
      </Texto>
      <Texto x={86} y={56} size={16} color={C.blanco}>
        C
      </Texto>
    </Calzada>
  ),
}

/* --------------------------------------------------------------- semáforo -- */

function Semaforo({ activa }: { activa: 'rojo' | 'amarillo' | 'verde' }) {
  const on = (c: 'rojo' | 'amarillo' | 'verde', color: string) =>
    activa === c ? color : '#3A3F45'
  return (
    <>
      <rect x="32" y="6" width="36" height="88" rx="7" fill="#22262B" />
      <circle cx="50" cy="26" r="11" fill={on('rojo', C.rojo)} />
      <circle cx="50" cy="50" r="11" fill={on('amarillo', '#FFC107')} />
      <circle cx="50" cy="74" r="11" fill={on('verde', '#26A65B')} />
    </>
  )
}

const SEMAFOROS: Record<string, JSX.Element> = {
  'sem-rojo': <Semaforo activa="rojo" />,
  'sem-amarillo': <Semaforo activa="amarillo" />,
  'sem-verde': <Semaforo activa="verde" />,
  'sem-flecha-verde': (
    <>
      <rect x="32" y="6" width="36" height="88" rx="7" fill="#22262B" />
      <circle cx="50" cy="26" r="11" fill="#3A3F45" />
      <circle cx="50" cy="50" r="11" fill="#3A3F45" />
      <circle cx="50" cy="74" r="11" fill="#0F1418" />
      <path d="M44 82 L44 72 L38 72 L50 62 L62 72 L56 72 L56 82 Z" fill="#26A65B" />
    </>
  ),
  'sem-peatonal': (
    <>
      <rect x="30" y="8" width="40" height="84" rx="7" fill="#22262B" />
      <circle cx="50" cy="30" r="14" fill="#3A3F45" />
      <circle cx="50" cy="66" r="14" fill="#0F1418" />
      <Peaton x={50} y={74} s={0.78} color="#26A65B" />
    </>
  ),
}

/* ------------------------------ señales de brazo del agente y del conductor */

function Agente({ brazos }: { brazos: 'vertical' | 'horizontal' | 'frente' }) {
  const brazo =
    brazos === 'vertical'
      ? 'M58 44 L64 10'
      : brazos === 'horizontal'
        ? 'M50 44 L14 44 M50 44 L86 44'
        : 'M50 44 L84 44'
  return (
    <>
      <circle cx="50" cy="26" r="9" fill={C.azul} />
      <path d="M40 38 L60 38 L64 74 L36 74 Z" fill={C.azul} />
      <rect x="44" y="74" width="5" height="20" fill={C.negro} />
      <rect x="51" y="74" width="5" height="20" fill={C.negro} />
      <path d={brazo} stroke={C.azul} strokeWidth="8" strokeLinecap="round" fill="none" />
      {brazos === 'vertical' && <circle cx="64" cy="9" r="4.5" fill={C.azul} />}
    </>
  )
}

const AGENTE: Record<string, JSX.Element> = {
  'ag-atencion-alto': <Agente brazos="vertical" />,
  'ag-alto': <Agente brazos="horizontal" />,
  'ag-brazo-al-frente': <Agente brazos="frente" />,
}

/* ------------------------------------------------------------------ index -- */

export const DIBUJOS: Record<string, JSX.Element> = {
  ...GRUPO_A,
  ...GRUPO_B,
  ...GRUPO_C,
  ...GRUPO_D,
  ...GRUPO_E,
  ...GRUPO_F,
  ...GRUPO_GH,
  ...MARCAS,
  ...SEMAFOROS,
  ...AGENTE,
}
