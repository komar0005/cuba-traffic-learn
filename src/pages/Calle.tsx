import { GUIA_CALLE } from '../data/tramites'
import { Encabezado, Tarjeta } from '../components/ui'
import { FilaSenales } from '../components/Senal'
import { BotonEnlace } from '../components/ui'

export default function Calle() {
  return (
    <div>
      <Encabezado
        titulo="Andar en la calle"
        bajada="Lo esencial para moverte con seguridad, resumido de la Ley 109"
      />

      <Tarjeta className="mb-5 bg-superficie-2">
        <p className="mb-3 text-sm font-semibold text-texto">
          Las cuatro señales que decidirán casi todas tus maniobras
        </p>
        <FilaSenales
          ids={['b-pare', 'b-ceda-el-paso', 'b-via-con-prioridad', 'a-paso-peatones-cebra']}
          size={72}
        />
      </Tarjeta>

      <div className="space-y-3">
        {GUIA_CALLE.map((g) => (
          <Tarjeta key={g.titulo}>
            <h2 className="text-sm font-bold text-texto">{g.titulo}</h2>
            <ul className="mt-2 space-y-1.5">
              {g.puntos.map((p, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-snug text-texto">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-marca" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Tarjeta>
        ))}
      </div>

      <Tarjeta className="mt-5 border-marca/35 bg-marca-suave">
        <p className="text-sm font-semibold text-texto">Todo esto entra en el examen</p>
        <p className="mt-1 text-xs text-suave">
          Los temas 1, 4, 5 y 9 desarrollan cada uno de estos puntos con su artículo.
        </p>
        <BotonEnlace to="/teoria" className="mt-3">
          Ir a la teoría
        </BotonEnlace>
      </Tarjeta>
    </div>
  )
}
