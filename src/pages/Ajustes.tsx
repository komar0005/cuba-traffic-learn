import { useState } from 'react'
import { AJUSTES_POR_DEFECTO, useAjustes } from '../lib/ajustes'
import { useProgreso, tiendaProgreso } from '../lib/progreso'
import { sincronizar } from '../lib/almacen'
import { esNativo } from '../lib/nativo'
import { Boton, Encabezado, Hoja, Interruptor, Segmentado, Tarjeta } from '../components/ui'
import { copiar } from '../lib/util'
import { PREGUNTAS } from '../data/preguntas'
import { SENALES } from '../data/senales'

export default function Ajustes() {
  const { ajustes, cambiar, restablecer } = useAjustes()
  const { borrarTodo, importar } = useProgreso()
  const [confirmar, setConfirmar] = useState(false)
  const [hoja, setHoja] = useState<'exportar' | 'importar' | null>(null)
  const [pegado, setPegado] = useState('')
  const [aviso, setAviso] = useState('')

  const copia = JSON.stringify(tiendaProgreso.obtener())

  async function copiarCopia() {
    sincronizar()
    setAviso((await copiar(copia)) ? 'Copiado al portapapeles' : 'No se pudo copiar')
    setTimeout(() => setAviso(''), 2500)
  }

  function descargarCopia() {
    const url = URL.createObjectURL(new Blob([copia], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `via-cuba-progreso-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function restaurar() {
    try {
      importar(JSON.parse(pegado))
      setHoja(null)
      setPegado('')
      setAviso('Progreso restaurado')
    } catch {
      setAviso('Ese texto no es una copia válida')
    }
    setTimeout(() => setAviso(''), 3000)
  }

  return (
    <div>
      <Encabezado titulo="Ajustes" bajada="Todo se guarda en este dispositivo" />

      <div className="space-y-4">
        <Bloque titulo="Apariencia">
          <Campo etiqueta="Tema">
            <Segmentado
              valor={ajustes.tema}
              onChange={(v) => cambiar('tema', v)}
              opciones={[
                { valor: 'sistema', texto: 'Sistema' },
                { valor: 'claro', texto: 'Claro' },
                { valor: 'oscuro', texto: 'Oscuro' },
              ]}
            />
          </Campo>
          <Campo etiqueta="Tamaño de la letra">
            <Segmentado
              valor={ajustes.letra}
              onChange={(v) => cambiar('letra', v)}
              opciones={[
                { valor: 'normal', texto: 'Normal' },
                { valor: 'grande', texto: 'Grande' },
                { valor: 'enorme', texto: 'Enorme' },
              ]}
            />
          </Campo>
          {esNativo && (
            <Linea
              titulo="Vibración"
              texto="Un toque al acertar o fallar"
              control={
                <Interruptor
                  activo={ajustes.vibracion}
                  onChange={(v) => cambiar('vibracion', v)}
                  etiqueta="Vibración"
                />
              }
            />
          )}
        </Bloque>

        <Bloque titulo="Estudio">
          <Campo etiqueta={`Meta diaria: ${ajustes.metaDiaria} preguntas`}>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={ajustes.metaDiaria}
              onChange={(e) => cambiar('metaDiaria', Number(e.target.value))}
              className="w-full accent-[var(--v-marca)]"
            />
          </Campo>
          <Campo etiqueta={`Preguntas por examen: ${ajustes.largoExamen}`}>
            <input
              type="range"
              min={10}
              max={40}
              step={5}
              value={ajustes.largoExamen}
              onChange={(e) => {
                const largo = Number(e.target.value)
                cambiar('largoExamen', largo)
                cambiar('minimoAprobado', Math.min(ajustes.minimoAprobado, largo))
              }}
              className="w-full accent-[var(--v-marca)]"
            />
          </Campo>
          <Campo etiqueta={`Mínimo para aprobar: ${ajustes.minimoAprobado}`}>
            <input
              type="range"
              min={1}
              max={ajustes.largoExamen}
              value={ajustes.minimoAprobado}
              onChange={(e) => cambiar('minimoAprobado', Number(e.target.value))}
              className="w-full accent-[var(--v-marca)]"
            />
          </Campo>
          <Linea
            titulo="Barajar las opciones"
            texto="Cambia el orden de A, B y C en cada pregunta"
            control={
              <Interruptor
                activo={ajustes.barajarOpciones}
                onChange={(v) => cambiar('barajarOpciones', v)}
                etiqueta="Barajar las opciones"
              />
            }
          />
        </Bloque>

        <Bloque titulo="Mi progreso">
          <p className="text-xs leading-snug text-suave">
            El progreso vive solo en este teléfono. Guarda una copia antes de cambiar de equipo o de
            reinstalar la app.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Boton variante="secundario" onClick={() => setHoja('exportar')}>
              Guardar copia
            </Boton>
            <Boton variante="secundario" onClick={() => setHoja('importar')}>
              Restaurar copia
            </Boton>
          </div>
        </Bloque>

        <Bloque titulo="Empezar de cero">
          <p className="text-xs leading-snug text-suave">
            Borra las respuestas guardadas, el historial de exámenes y las señales marcadas.
          </p>
          {confirmar ? (
            <div className="mt-3 flex gap-2">
              <Boton
                variante="peligro"
                onClick={() => {
                  borrarTodo()
                  restablecer()
                  setConfirmar(false)
                  setAviso('Progreso borrado')
                  setTimeout(() => setAviso(''), 2500)
                }}
              >
                Sí, borrar todo
              </Boton>
              <Boton variante="fantasma" onClick={() => setConfirmar(false)}>
                Cancelar
              </Boton>
            </div>
          ) : (
            <Boton variante="peligro" className="mt-3" onClick={() => setConfirmar(true)}>
              Borrar mi progreso
            </Boton>
          )}
        </Bloque>

        <Tarjeta relieve={false} className="bg-superficie-2">
          <p className="text-sm font-bold text-texto">Vía Cuba</p>
          <p className="mt-1 text-xs leading-snug text-suave">
            {PREGUNTAS.length} preguntas de los cuestionarios oficiales y {SENALES.length} señales
            del Código de Seguridad Vial. Contenido resumido de la Ley 109. Ante cualquier duda rige
            siempre la ley vigente y lo que disponga el Ministerio del Interior.
          </p>
          <p className="mt-2 text-[11px] text-tenue">
            Ajustes por defecto: examen de {AJUSTES_POR_DEFECTO.largoExamen} preguntas, se aprueba
            con {AJUSTES_POR_DEFECTO.minimoAprobado}.
          </p>
        </Tarjeta>
      </div>

      {aviso && (
        <p
          role="status"
          className="fixed inset-x-0 bottom-24 z-50 mx-auto w-fit rounded-full bg-texto px-4 py-2 text-xs font-semibold text-fondo"
        >
          {aviso}
        </p>
      )}

      {hoja === 'exportar' && (
        <Hoja onCerrar={() => setHoja(null)} etiqueta="Guardar copia">
          <h2 className="text-lg font-bold text-texto">Guardar copia</h2>
          <p className="mt-1 text-sm text-suave">
            Copia este texto y guárdalo donde quieras. Para restaurarlo, pégalo en «Restaurar copia».
          </p>
          <textarea
            readOnly
            value={copia}
            className="mt-3 h-32 w-full rounded-xl border border-borde bg-superficie-2 p-3 font-mono text-[11px] text-suave"
          />
          <div className="mt-3 flex gap-2">
            <Boton onClick={copiarCopia} className="flex-1">
              Copiar
            </Boton>
            {!esNativo && (
              <Boton variante="secundario" onClick={descargarCopia} className="flex-1">
                Descargar
              </Boton>
            )}
          </div>
        </Hoja>
      )}

      {hoja === 'importar' && (
        <Hoja onCerrar={() => setHoja(null)} etiqueta="Restaurar copia">
          <h2 className="text-lg font-bold text-texto">Restaurar copia</h2>
          <p className="mt-1 text-sm text-suave">
            Pega aquí el texto que guardaste. Sustituirá el progreso actual.
          </p>
          <textarea
            value={pegado}
            onChange={(e) => setPegado(e.target.value)}
            placeholder="{ … }"
            className="mt-3 h-32 w-full rounded-xl border border-borde bg-superficie p-3 font-mono text-[11px] text-texto"
          />
          <Boton onClick={restaurar} disabled={!pegado.trim()} className="mt-3 w-full">
            Restaurar
          </Boton>
        </Hoja>
      )}
    </div>
  )
}

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-bold tracking-wide text-tenue uppercase">{titulo}</h2>
      <Tarjeta className="space-y-4">{children}</Tarjeta>
    </section>
  )
}

function Campo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-texto">{etiqueta}</p>
      {children}
    </div>
  )
}

function Linea({
  titulo,
  texto,
  control,
}: {
  titulo: string
  texto: string
  control: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-texto">{titulo}</p>
        <p className="text-xs text-suave">{texto}</p>
      </div>
      {control}
    </div>
  )
}
