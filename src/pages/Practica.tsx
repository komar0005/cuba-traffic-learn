import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Cuestionario } from '../components/Cuestionario'
import type { Resultado } from '../components/Cuestionario'
import {
  IDS_POR_TEMA,
  PREGUNTAS_POR_TEMA,
  PREGUNTA_POR_ID,
  TEMAS_CON_PREGUNTAS,
  contarDominadas,
  etiquetaTema,
  pendientesDeRepaso,
  sinVer,
} from '../lib/datos'
import { TITULOS_TEMAS, TEMA_POR_NUMERO } from '../data/temas'
import { useProgreso } from '../lib/progreso'
import { useAjustes } from '../lib/ajustes'
import { Barra, Boton, BotonEnlace, Encabezado, Tarjeta, Vacio } from '../components/ui'
import { barajar, pct } from '../lib/util'

export function ListaPractica() {
  const { progreso } = useProgreso()
  const repaso = pendientesDeRepaso(progreso).length
  const nuevas = sinVer(progreso).length
  const fallidas = Object.values(progreso.preguntas).filter((e) => e.fallos > 0 && e.caja < 3).length

  return (
    <div>
      <Encabezado titulo="Práctica" bajada="Responde y comprueba al momento, con el artículo" />

      <div className="mb-5 grid gap-2 sm:grid-cols-2">
        <Modo
          to="/practica/repaso"
          emoji="🔁"
          titulo="Repaso programado"
          texto={
            repaso > 0
              ? `${repaso} ${repaso === 1 ? 'pregunta toca' : 'preguntas tocan'} hoy`
              : 'Nada pendiente por ahora'
          }
          apagado={repaso === 0}
        />
        <Modo
          to="/practica/fallos"
          emoji="🎯"
          titulo="Lo que fallo"
          texto={
            fallidas > 0
              ? `${fallidas} ${fallidas === 1 ? 'pregunta' : 'preguntas'} sin afianzar`
              : 'No tienes fallos pendientes'
          }
          apagado={fallidas === 0}
        />
        <Modo
          to="/practica/nuevas"
          emoji="✨"
          titulo="Preguntas nuevas"
          texto={nuevas > 0 ? `${nuevas} que no has visto` : 'Ya las viste todas'}
          apagado={nuevas === 0}
        />
        <Modo to="/practica/todas" emoji="🔀" titulo="Todas al azar" texto="Mezcla de los diez temas" />
      </div>

      <h2 className="mb-2 text-sm font-bold text-texto">Por tema</h2>
      <div className="space-y-2">
        {TEMAS_CON_PREGUNTAS.map((t) => {
          const ids = IDS_POR_TEMA[t]
          const d = contarDominadas(ids, progreso)
          return (
            <Link
              key={t}
              to={`/practica/${t}`}
              className="flex items-center gap-4 rounded-2xl border border-borde bg-superficie p-4 transition-colors hover:border-marca/40"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-marca-suave text-sm font-bold text-marca">
                {t === 6 ? '6·7' : t}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-tight font-semibold text-texto">{TITULOS_TEMAS[t]}</p>
                <div className="mt-2">
                  <Barra valor={d} total={ids.length} />
                </div>
              </div>
              <span className="shrink-0 text-xs font-semibold text-suave tabular-nums">
                {d}/{ids.length}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Modo({
  to,
  emoji,
  titulo,
  texto,
  apagado,
}: {
  to: string
  emoji: string
  titulo: string
  texto: string
  apagado?: boolean
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl border border-borde bg-superficie p-3.5 transition-colors hover:border-marca/40 ${
        apagado ? 'opacity-55' : ''
      }`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-superficie-2 text-lg">
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-texto">{titulo}</span>
        <span className="block text-xs text-suave">{texto}</span>
      </span>
    </Link>
  )
}

const TITULOS_MODO: Record<string, string> = {
  repaso: 'Repaso programado',
  fallos: 'Lo que fallo',
  nuevas: 'Preguntas nuevas',
  todas: 'Todas al azar',
}

export default function Practica() {
  const { tema = '' } = useParams()
  const navigate = useNavigate()
  const { progreso, registrarRespuesta, guardarSesion } = useProgreso()
  const { ajustes } = useAjustes()
  const [ronda, setRonda] = useState(0)
  const [resultado, setResultado] = useState<Resultado | null>(null)

  const guardada = progreso.sesiones.practica
  const sesionValida = guardada?.origen === tema ? guardada : null

  const preguntas = useMemo(() => {
    void ronda
    if (sesionValida && ronda === 0) {
      return sesionValida.ids.map((id) => PREGUNTA_POR_ID[id]).filter(Boolean)
    }
    const todas = TEMAS_CON_PREGUNTAS.flatMap((t) => PREGUNTAS_POR_TEMA[t])
    let base
    switch (tema) {
      case 'repaso':
        base = pendientesDeRepaso(progreso)
        break
      case 'fallos':
        base = todas.filter((p) => {
          const e = progreso.preguntas[p.id]
          return e && e.fallos > 0 && e.caja < 3
        })
        break
      case 'nuevas':
        base = sinVer(progreso)
        break
      case 'todas':
        base = todas
        break
      default:
        base = PREGUNTAS_POR_TEMA[Number(tema)] ?? []
    }
    const barajadas = barajar(base)
    // Las tandas generales se acotan para que una sesión no sea eterna.
    return tema === 'todas' || tema === 'nuevas' ? barajadas.slice(0, 30) : barajadas
    // La lista se congela al montar cada ronda a propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tema, ronda])

  // Si el usuario cambia de modo, la sesión guardada de otro origen deja de valer.
  useEffect(() => {
    if (guardada && guardada.origen !== tema) guardarSesion('practica', null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tema])

  const esModo = tema in TITULOS_MODO
  const num = Number(tema)

  if (!esModo && !PREGUNTAS_POR_TEMA[num]) {
    return (
      <Vacio titulo="Tema no encontrado" texto="Vuelve a la lista para elegir uno.">
        <BotonEnlace to="/practica" variante="secundario">
          Ver los temas
        </BotonEnlace>
      </Vacio>
    )
  }

  const titulo = esModo ? TITULOS_MODO[tema] : TITULOS_TEMAS[num]

  if (preguntas.length === 0) {
    return (
      <div>
        <Encabezado titulo={titulo} />
        <Vacio
          titulo="No hay nada aquí ahora mismo"
          texto={
            tema === 'repaso'
              ? 'El repaso te va proponiendo cada pregunta cuando toca: hoy no queda ninguna. Estudia un tema o vuelve mañana.'
              : tema === 'fallos'
                ? 'Cuando falles una pregunta aparecerá aquí hasta que la afiances.'
                : 'Ya has visto todas las preguntas. Prueba con el repaso programado.'
          }
        >
          <BotonEnlace to="/practica" variante="secundario">
            Volver a la práctica
          </BotonEnlace>
        </Vacio>
      </div>
    )
  }

  if (resultado) {
    return (
      <div>
        <Encabezado titulo={titulo} />
        <Tarjeta className="text-center">
          <p className="text-5xl font-bold text-marca tabular-nums">
            {pct(resultado.correctas, resultado.total)}%
          </p>
          <p className="mt-1 text-sm text-suave">
            {resultado.correctas} de {resultado.total} correctas
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Boton
              onClick={() => {
                setResultado(null)
                setRonda((r) => r + 1)
              }}
            >
              Otra tanda
            </Boton>
            {resultado.fallos.length > 0 && (
              <Boton variante="secundario" onClick={() => navigate('/practica/fallos')}>
                Repasar las {resultado.fallos.length} que fallé
              </Boton>
            )}
            <Boton variante="fantasma" onClick={() => navigate('/practica')}>
              Elegir otra cosa
            </Boton>
          </div>
        </Tarjeta>
      </div>
    )
  }

  const t = esModo ? null : TEMA_POR_NUMERO[num]
  const inicial =
    sesionValida && ronda === 0
      ? {
          indice: sesionValida.indice,
          respuestas: sesionValida.respuestas,
          segundos: sesionValida.segundos,
        }
      : undefined

  return (
    <div>
      <div className="mb-4">
        <Link to="/practica" className="text-xs font-semibold text-marca">
          ← Práctica
        </Link>
        <h1 className="mt-1 text-lg leading-tight font-bold text-texto">{titulo}</h1>
        {t && (
          <Link to={`/teoria/${t.numero}`} className="mt-1 inline-block text-xs font-semibold text-marca">
            Leer la teoría de {etiquetaTema(t.numero).toLowerCase()} →
          </Link>
        )}
        {inicial && inicial.indice > 0 && (
          <p className="mt-2 rounded-lg bg-marca-suave px-3 py-2 text-xs text-marca">
            Retomamos en la pregunta {inicial.indice + 1}.
          </p>
        )}
      </div>
      <Cuestionario
        key={ronda}
        preguntas={preguntas}
        modo="practica"
        origen={tema}
        inicial={inicial}
        onRespuesta={(p, ok) => registrarRespuesta(p.id, ok)}
        onGuardar={(s) => guardarSesion('practica', s)}
        onTerminar={setResultado}
        barajarOpciones={ajustes.barajarOpciones}
      />
    </div>
  )
}
