/**
 * Catálogo de señales del tránsito de Cuba.
 * Textos tomados del articulado de la Ley 109, Código de Seguridad Vial
 * (artículos 149 al 180).
 */

export type Grupo = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'M' | 'S' | 'AG'

export type Senal = {
  id: string
  nombre: string
  grupo: Grupo
  significado: string
  articulo?: string
}

export const GRUPOS: { id: Grupo; nombre: string; descripcion: string; color: string }[] = [
  {
    id: 'A',
    nombre: 'Peligro o precaución',
    descripcion:
      'Advierten un peligro en la vía e indican su naturaleza. Son triangulares con un vértice hacia arriba, fondo amarillo, orla roja y símbolo negro. Se fijan a no menos de 100 m del peligro fuera de las poblaciones y 50 m dentro de ellas.',
    color: '#EAB308',
  },
  {
    id: 'B',
    nombre: 'Prioridad',
    descripcion:
      'Dan a conocer las reglas especiales en las intersecciones y los pasos estrechos. Su forma es triangular, circular o cuadrada según el caso.',
    color: '#DC2626',
  },
  {
    id: 'C',
    nombre: 'Prohibición',
    descripcion:
      'Establecen un régimen restrictivo de la circulación. Son circulares, con fondo blanco, orla roja y símbolos en negro y rojo. Se exceptúan las de prohibición de estacionamiento (fondo azul) y la de acceso prohibido (fondo rojo).',
    color: '#B91C1C',
  },
  {
    id: 'D',
    nombre: 'Obligación',
    descripcion:
      'Indican un régimen obligatorio de circulación, tanto en dirección y sentido como en el tipo de vehículo. Son circulares, de fondo azul, con la orla y el símbolo blancos.',
    color: '#1D4ED8',
  },
  {
    id: 'E',
    nombre: 'Fin de prohibición u obligación',
    descripcion:
      'Indican el cese de la prohibición u obligación que estableció una señal anterior. Llevan una banda diagonal negra o roja inclinada de derecha a izquierda.',
    color: '#4B5563',
  },
  {
    id: 'F',
    nombre: 'Información',
    descripcion:
      'Informan de regímenes de circulación permitidos, estacionamiento, giros y detenciones. Son rectangulares de fondo azul oscuro —verde en autopistas— con letras y símbolos blancos.',
    color: '#0E7490',
  },
  {
    id: 'G',
    nombre: 'Orientación',
    descripcion:
      'Contribuyen a orientar a los usuarios de la vía. Incluyen las placas complementarias, de fondo blanco y símbolos, letras o números negros.',
    color: '#0F766E',
  },
  {
    id: 'H',
    nombre: 'Pasos a nivel',
    descripcion:
      'Se colocan en las proximidades inmediatas de los pasos a nivel con el ferrocarril.',
    color: '#EA580C',
  },
  {
    id: 'M',
    nombre: 'Marcas en el pavimento',
    descripcion:
      'Señales horizontales que regulan o canalizan la circulación. Son amarillas o blancas, pero el color no indica la regulación: la indica el diseño de su trazado en el pavimento.',
    color: '#6B7280',
  },
  {
    id: 'S',
    nombre: 'Semáforos',
    descripcion:
      'Señales mediante luces. Las luces se sitúan de arriba abajo o de izquierda a derecha en el orden: roja, amarilla, verde.',
    color: '#16A34A',
  },
  {
    id: 'AG',
    nombre: 'Señales del agente',
    descripcion:
      'Las señales que realiza el agente de la autoridad en la vía. Son las de mayor prioridad: están por encima de los semáforos y de todas las demás señales.',
    color: '#1E3A8A',
  },
]

export const SENALES: Senal[] = [
  /* ---------------------------------------------------------- Grupo A ---- */
  { id: 'a-cruce-preferencia', grupo: 'A', nombre: 'Cruce con preferencia', articulo: 'Art. 160.1', significado: 'Peligro por la proximidad de una intersección con una carretera de menor importancia o no preferente.' },
  { id: 'a-entronque-derecho', grupo: 'A', nombre: 'Entronque lateral derecho', articulo: 'Art. 160.2', significado: 'Proximidad de un entronque en el lado derecho del sentido de la circulación con una carretera de menor importancia o no preferente.' },
  { id: 'a-entronque-izquierdo', grupo: 'A', nombre: 'Entronque lateral izquierdo', articulo: 'Art. 160.3', significado: 'Proximidad de un entronque en el lado izquierdo del sentido de la circulación con una carretera de menor importancia o no preferente.' },
  { id: 'a-cruce', grupo: 'A', nombre: 'Cruce', articulo: 'Art. 160.4', significado: 'Cruce de una carretera o camino con otro de igual categoría.' },
  { id: 'a-cruce-semaforo', grupo: 'A', nombre: 'Cruce regulado por semáforo', articulo: 'Art. 160.5', significado: 'Proximidad de una intersección regulada por semáforos.' },
  { id: 'a-circulacion-giratoria', grupo: 'A', nombre: 'Circulación giratoria', articulo: 'Art. 160.6', significado: 'Proximidad de un lugar donde está establecido un sentido giratorio para la circulación.' },
  { id: 'a-paso-nivel-con-proteccion', grupo: 'A', nombre: 'Paso a nivel con sistema de protección', articulo: 'Art. 160.7', significado: 'Proximidad de un paso a nivel equipado con dispositivos de protección (barreras).' },
  { id: 'a-paso-nivel-sin-proteccion', grupo: 'A', nombre: 'Paso a nivel sin sistema de protección', articulo: 'Art. 160.8', significado: 'Proximidad de un paso a nivel desprovisto de dispositivos de protección.' },
  { id: 'a-vuelo-rasante', grupo: 'A', nombre: 'Vuelo rasante', articulo: 'Art. 160.9', significado: 'Presencia de aeronaves que realizan vuelos bajos al aterrizar o al despegar.' },
  { id: 'a-perfil-irregular', grupo: 'A', nombre: 'Perfil irregular o badén', articulo: 'Art. 160.10', significado: 'Presencia de un perfil irregular por mal estado de la calzada, un puente combado, un cambio brusco de rasante o un badén.' },
  { id: 'a-curva-derecha', grupo: 'A', nombre: 'Curva peligrosa a la derecha', articulo: 'Art. 160.11', significado: 'Proximidad de una curva hacia el lado derecho del sentido de la circulación.' },
  { id: 'a-curva-izquierda', grupo: 'A', nombre: 'Curva peligrosa a la izquierda', articulo: 'Art. 160.12', significado: 'Proximidad de una curva hacia el lado izquierdo del sentido de la circulación.' },
  { id: 'a-doble-curva-derecha', grupo: 'A', nombre: 'Doble curva peligrosa a la derecha', articulo: 'Art. 160.13', significado: 'Proximidad de dos o más curvas, la primera a la derecha.' },
  { id: 'a-doble-curva-izquierda', grupo: 'A', nombre: 'Doble curva peligrosa a la izquierda', articulo: 'Art. 160.14', significado: 'Proximidad de dos o más curvas, la primera a la izquierda.' },
  { id: 'a-viento-lateral', grupo: 'A', nombre: 'Viento lateral', articulo: 'Art. 160.15', significado: 'Proximidad de un tramo de vía en el que sopla con frecuencia un viento lateral violento.' },
  { id: 'a-bajada-peligrosa', grupo: 'A', nombre: 'Bajada peligrosa', articulo: 'Art. 160.16', significado: 'Proximidad de un descenso peligroso a causa de su inclinación o de su longitud.' },
  { id: 'a-obras', grupo: 'A', nombre: 'Obras', articulo: 'Art. 160.23', significado: 'Proximidad de obras de construcción o reparación que ocupan parte de la vía.' },
  { id: 'a-pavimento-resbaladizo', grupo: 'A', nombre: 'Pavimento resbaladizo', articulo: 'Art. 160.24', significado: 'Pavimento con bajo coeficiente de fricción, permanente o eventual por lluvia, neblina u otra causa.' },
  { id: 'a-paso-peatones-cebra', grupo: 'A', nombre: 'Paso para peatones (cebra)', articulo: 'Art. 160.25 a)', significado: 'Paso frecuente de peatones mediante franjas tipo cebra: el peatón tiene prioridad en el cruce.' },
  { id: 'a-paso-peatones-paralelas', grupo: 'A', nombre: 'Paso para peatones (dos líneas)', articulo: 'Art. 160.25 b)', significado: 'Paso de peatones delimitado por dos líneas paralelas; no concede prioridad al peatón.' },
  { id: 'a-ninos', grupo: 'A', nombre: 'Niños', articulo: 'Art. 160.26', significado: 'Proximidad de un lugar frecuentado por niños: escuela, terrenos de juego, áreas de recreación u otros similares.' },
  { id: 'a-animal-domestico', grupo: 'A', nombre: 'Cruce de animal doméstico', articulo: 'Art. 160.27', significado: 'Proximidad de una zona por la que cruzan frecuentemente animales domésticos o grupos de animales.' },
  { id: 'a-doble-sentido', grupo: 'A', nombre: 'Doble sentido de circulación', articulo: 'Art. 160.29', significado: 'La circulación comienza en doble sentido, de manera permanente o provisional.' },
  { id: 'a-salida-ciclistas', grupo: 'A', nombre: 'Salida de ciclistas', articulo: 'Art. 160.32', significado: 'Proximidad de un paso frecuentado por ciclistas en la vía o que la atraviesan.' },
  { id: 'a-desvio', grupo: 'A', nombre: 'Desvío', articulo: 'Art. 160.35', significado: 'Proximidad de un desvío en la circulación.' },
  { id: 'a-otros-peligros', grupo: 'A', nombre: 'Otros peligros', articulo: 'Art. 159', significado: 'Advierte un peligro no contemplado en las demás señales del grupo. Suele acompañarse de una placa que explica en qué consiste.' },

  /* ---------------------------------------------------------- Grupo B ---- */
  { id: 'b-pare', grupo: 'B', nombre: 'Pare', articulo: 'Art. 162.1', significado: 'Todo vehículo está obligado a detenerse en la línea de Pare y, si no la hubiera, antes del borde de la vía transversal sin internarse en ella, cualesquiera que sean las circunstancias de visibilidad, dando prioridad a los vehículos que circulan por la vía transversal.' },
  { id: 'b-ceda-el-paso', grupo: 'B', nombre: 'Ceda el paso', articulo: 'Art. 162.2', significado: 'Todo vehículo está obligado a disminuir la velocidad y parar si fuera necesario, para permitir el paso a todos los vehículos que circulan por la vía preferente.' },
  { id: 'b-prioridad-sentido-contrario', grupo: 'B', nombre: 'Prioridad a los vehículos que vienen en sentido contrario', articulo: 'Art. 162.3', significado: 'Está prohibido entrar en el paso estrecho mientras no sea posible atravesarlo sin obligar a detenerse a los vehículos que circulan en sentido contrario.' },
  { id: 'b-prioridad-circulacion', grupo: 'B', nombre: 'Prioridad de circulación', articulo: 'Art. 162.4', significado: 'Usted tiene prioridad con relación a los vehículos que circulan en sentido contrario.' },
  { id: 'b-via-con-prioridad', grupo: 'B', nombre: 'Vía con prioridad', articulo: 'Art. 162.5', significado: 'La vía tiene preferencia en los cruces respecto a todas las demás vías que la atraviesan.' },
  { id: 'b-fin-via-con-prioridad', grupo: 'B', nombre: 'Fin de la vía con prioridad', articulo: 'Art. 162.6', significado: 'La preferencia en la vía por la cual se circula ha concluido.' },
  { id: 'b-ceda-luz-roja', grupo: 'B', nombre: 'Ceda el paso con luz roja', articulo: 'Art. 162.7', significado: 'En intersecciones semaforizadas permite girar a la derecha o seguir recto con extrema precaución, cediendo el paso a los conductores y peatones que transitan con la luz verde correspondiente.' },
  { id: 'b-ceda-izquierda-luz-verde', grupo: 'B', nombre: 'Ceda el paso izquierda con luz verde', articulo: 'Art. 162.8', significado: 'Permite girar a la izquierda con extrema precaución cediendo el paso a los vehículos que circulan en sentido opuesto, una vez cesada la fase de giro y mientras se mantenga la luz verde.' },

  /* ---------------------------------------------------------- Grupo C ---- */
  { id: 'c-circulacion-prohibida', grupo: 'C', nombre: 'Circulación prohibida', articulo: 'Art. 164.1', significado: 'Prohibición de circular por una vía en los dos sentidos a todos los vehículos, incluidos los de tracción animal o humana.' },
  { id: 'c-acceso-prohibido', grupo: 'C', nombre: 'Acceso prohibido', articulo: 'Art. 164.2', significado: 'Prohibición de circular a todos los vehículos, inclusive los de tracción animal o humana, en el sentido hacia el cual indica la señal. Se permite circular en el sentido opuesto.' },
  { id: 'c-prohibido-motor-excepto-motos', grupo: 'C', nombre: 'Prohibida a vehículos de motor, excepto motocicletas', articulo: 'Art. 164.3', significado: 'Circulación prohibida a todos los vehículos de motor, excepto las motocicletas.' },
  { id: 'c-prohibido-motocicletas', grupo: 'C', nombre: 'Prohibida a las motocicletas', articulo: 'Art. 164.4', significado: 'Circulación prohibida a las motocicletas.' },
  { id: 'c-prohibido-todos-motor', grupo: 'C', nombre: 'Prohibida a todos los vehículos de motor', articulo: 'Art. 164.5', significado: 'Circulación prohibida a todos los vehículos de motor, incluidas las motocicletas.' },
  { id: 'c-prohibido-carga-3500', grupo: 'C', nombre: 'Prohibida a vehículos de carga de más de 3 500 kg', articulo: 'Art. 164.6', significado: 'Circulación prohibida a los vehículos destinados a transporte de carga que sobrepasan un peso máximo autorizado de 3 500 kilogramos.' },
  { id: 'c-prohibido-ciclos', grupo: 'C', nombre: 'Prohibida a los ciclos', articulo: 'Art. 164.7', significado: 'Circulación prohibida a los ciclos.' },
  { id: 'c-prohibido-traccion-animal', grupo: 'C', nombre: 'Prohibida a vehículos de tracción animal', articulo: 'Art. 164.8', significado: 'Circulación prohibida a los vehículos de tracción animal.' },
  { id: 'c-prohibido-animales-montura', grupo: 'C', nombre: 'Prohibida a animales de silla o montura', articulo: 'Art. 164.9', significado: 'Circulación prohibida a los animales de silla o montura.' },
  { id: 'c-prohibido-carros-mano', grupo: 'C', nombre: 'Prohibida a los carros de mano', articulo: 'Art. 164.10', significado: 'Circulación prohibida a los carros de mano.' },
  { id: 'c-prohibido-peatones', grupo: 'C', nombre: 'Prohibida a los peatones', articulo: 'Art. 164.11', significado: 'Los peatones no pueden circular por el lugar a que se refiere la señal.' },
  { id: 'c-prohibido-peso', grupo: 'C', nombre: 'Prohibida por peso en carga', articulo: 'Art. 164.12', significado: 'Circulación prohibida a los vehículos de un peso en carga superior al que indica la señal.' },
  { id: 'c-prohibido-peso-eje', grupo: 'C', nombre: 'Prohibida por peso por eje', articulo: 'Art. 164.13', significado: 'Circulación prohibida a los vehículos de un peso superior al que indica la señal para cada eje.' },
  { id: 'c-prohibido-longitud', grupo: 'C', nombre: 'Prohibida por longitud', articulo: 'Art. 164.14', significado: 'Circulación prohibida a los vehículos o conjuntos de vehículos de una longitud superior a la que indica la señal.' },
  { id: 'c-prohibido-anchura', grupo: 'C', nombre: 'Prohibida por anchura', articulo: 'Art. 164.15', significado: 'Circulación prohibida a los vehículos con una anchura superior a la que indica la señal.' },
  { id: 'c-prohibido-altura', grupo: 'C', nombre: 'Prohibida por altura', articulo: 'Art. 164.16', significado: 'Circulación prohibida a los vehículos con una altura superior a la que indica la señal.' },
  { id: 'c-prohibido-remolque', grupo: 'C', nombre: 'Prohibida a vehículos con remolque', articulo: 'Art. 164.17', significado: 'Circulación prohibida a todo vehículo de motor con remolque que no sea un semirremolque o un remolque de un solo eje.' },
  { id: 'c-prohibido-agricolas', grupo: 'C', nombre: 'Prohibida a vehículos agrícolas', articulo: 'Art. 164.18', significado: 'Circulación prohibida a todos los vehículos agrícolas de motor.' },
  { id: 'c-prohibido-distancia-minima', grupo: 'C', nombre: 'Distancia mínima entre vehículos', articulo: 'Art. 164.19', significado: 'Circulación prohibida cuando no se mantiene entre vehículos la distancia mínima de metros que indica la señal.' },
  { id: 'c-velocidad-maxima', grupo: 'C', nombre: 'Velocidad máxima', articulo: 'Art. 164.20', significado: 'Establece el límite máximo de velocidad a que se puede circular.' },
  { id: 'c-prohibido-girar-derecha', grupo: 'C', nombre: 'Prohibido girar a la derecha', articulo: 'Art. 164.21', significado: 'El vehículo no puede girar a la derecha en la intersección a que se refiere la señal.' },
  { id: 'c-prohibido-girar-izquierda', grupo: 'C', nombre: 'Prohibido girar a la izquierda', articulo: 'Art. 164.22', significado: 'El vehículo no puede girar a la izquierda en la intersección a que se refiere la señal.' },
  { id: 'c-prohibido-giro-u', grupo: 'C', nombre: 'Prohibido dar media vuelta o girar en “U”', articulo: 'Art. 164.23', significado: 'Está prohibido dar media vuelta o girar en “U” en el lugar a que se refiere la señal.' },
  { id: 'c-prohibido-adelantar', grupo: 'C', nombre: 'Prohibido adelantar', articulo: 'Art. 164.24', significado: 'Prohibición de adelantar a cualquiera de los vehículos de motor que circulan por la vía, excepto a los ciclos y a las motocicletas de dos ruedas.' },
  { id: 'c-prohibido-adelantar-carga', grupo: 'C', nombre: 'Prohibido adelantar a vehículos de carga y pasajeros', articulo: 'Art. 164.25', significado: 'Prohibición de adelantar para los vehículos de transporte de pasajeros, de carga y especiales cuyo peso máximo autorizado exceda los 3 500 kilogramos.' },
  { id: 'c-estacionamiento-prohibido', grupo: 'C', nombre: 'Estacionamiento prohibido', articulo: 'Art. 164.26', significado: 'Prohibido estacionar o parquear en el lado de la vía en que está situada la señal, desde su vertical hasta la próxima intersección.' },
  { id: 'c-prohibido-estacionar-detener', grupo: 'C', nombre: 'Prohibido estacionar o detenerse', articulo: 'Art. 164.29', significado: 'Prohibido estacionar, parquear o hacer cualquier detención momentánea en el lado de la vía en que está situada la señal, desde su vertical hasta la próxima intersección.' },
  { id: 'c-prohibido-pasar-sin-detenerse', grupo: 'C', nombre: 'Prohibido pasar sin detenerse', articulo: 'Art. 164.31', significado: 'Prohíbe pasar sin detenerse: el alto es obligatorio para todo vehículo. En la señal debe indicarse el motivo del alto.' },

  /* ---------------------------------------------------------- Grupo D ---- */
  { id: 'd-sentido-obligatorio-recto', grupo: 'D', nombre: 'Sentido obligatorio: recto', articulo: 'Art. 166.1', significado: 'Indica el sentido que los conductores deben seguir obligatoriamente en el punto donde está situada la señal.' },
  { id: 'd-sentido-obligatorio-derecha', grupo: 'D', nombre: 'Sentido obligatorio: a la derecha', articulo: 'Art. 166.1', significado: 'Indica el sentido que los conductores deben seguir obligatoriamente en el punto donde está situada la señal.' },
  { id: 'd-sentido-obligatorio-izquierda', grupo: 'D', nombre: 'Sentido obligatorio: a la izquierda', articulo: 'Art. 166.1', significado: 'Indica el sentido que los conductores deben seguir obligatoriamente en el punto donde está situada la señal.' },
  { id: 'd-sentido-obligatorio-giro-derecha', grupo: 'D', nombre: 'Sentido obligatorio: giro a la derecha', articulo: 'Art. 166.1', significado: 'Obliga a girar a la derecha en el punto donde está situada la señal.' },
  { id: 'd-sentido-obligatorio-giro-izquierda', grupo: 'D', nombre: 'Sentido obligatorio: giro a la izquierda', articulo: 'Art. 166.1', significado: 'Obliga a girar a la izquierda en el punto donde está situada la señal.' },
  { id: 'd-sentido-giratorio', grupo: 'D', nombre: 'Sentido giratorio', articulo: 'Art. 166.2', significado: 'La circulación giratoria es obligatoria en el sentido que indica la flecha.' },
  { id: 'd-paso-obligatorio-derecha', grupo: 'D', nombre: 'Paso obligatorio por la derecha', articulo: 'Art. 166.3', significado: 'Los conductores deben pasar obligatoriamente por el lado del obstáculo que señala la flecha.' },
  { id: 'd-paso-obligatorio-izquierda', grupo: 'D', nombre: 'Paso obligatorio por la izquierda', articulo: 'Art. 166.3', significado: 'Los conductores deben pasar obligatoriamente por el lado del obstáculo que señala la flecha.' },
  { id: 'd-via-ciclistas', grupo: 'D', nombre: 'Vía obligatoria para los ciclistas', articulo: 'Art. 166.4', significado: 'Los ciclistas están obligados a utilizar esa vía o la parte de la vía a que se refiere la señal, y los conductores de los demás vehículos no tienen derecho a usarla.' },
  { id: 'd-via-peatones', grupo: 'D', nombre: 'Vía obligatoria para los peatones', articulo: 'Art. 166', significado: 'Los peatones están obligados a utilizar esa vía o la parte de la vía a que se refiere la señal.' },
  { id: 'd-velocidad-minima', grupo: 'D', nombre: 'Velocidad mínima obligatoria', articulo: 'Art. 166.7', significado: 'Los vehículos no pueden circular a una velocidad menor que la indicada por la vía donde está colocada la señal.' },
  { id: 'd-via-camiones', grupo: 'D', nombre: 'Vía obligatoria para camiones', articulo: 'Art. 166.8', significado: 'Los camiones de peso superior a 3 500 kilogramos tienen la obligación de circular por la vía señalada.' },
  { id: 'd-via-omnibus', grupo: 'D', nombre: 'Vía obligatoria para ómnibus', articulo: 'Art. 166.12', significado: 'Los ómnibus tienen la obligación de circular por la vía señalada.' },

  /* ---------------------------------------------------------- Grupo E ---- */
  { id: 'e-fin-velocidad-maxima', grupo: 'E', nombre: 'Fin de restricción del límite máximo de velocidad', articulo: 'Art. 168.1', significado: 'Cese de la restricción del límite de velocidad establecido para un tramo de la vía.' },
  { id: 'e-fin-prohibido-adelantar', grupo: 'E', nombre: 'Fin de prohibición de adelantamiento', articulo: 'Art. 168.2', significado: 'Fin de la restricción de adelantar impuesta a los vehículos de motor.' },
  { id: 'e-fin-prohibido-adelantar-carga', grupo: 'E', nombre: 'Fin de prohibición de adelantamiento (más de 3 500 kg)', articulo: 'Art. 168.3', significado: 'Fin de la restricción de adelantar impuesta a los vehículos mayores de un peso máximo autorizado de 3 500 kilogramos.' },
  { id: 'e-fin-velocidad-minima', grupo: 'E', nombre: 'Fin de velocidad mínima obligatoria', articulo: 'Art. 168.4', significado: 'Deja de ser obligatoria la velocidad mínima impuesta.' },
  { id: 'e-fin-todas-prohibiciones', grupo: 'E', nombre: 'Fin de todas las prohibiciones de carácter local', articulo: 'Art. 168.5', significado: 'Quedan sin efecto todas las prohibiciones de carácter local impuestas a los vehículos en circulación.' },

  /* ---------------------------------------------------------- Grupo F ---- */
  { id: 'f-via-sentido-unico', grupo: 'F', nombre: 'Vía en sentido único', articulo: 'Art. 170.1', significado: 'La vía por la cual se transita es en el sentido que indica la flecha. Se coloca perpendicular al eje de la vía por la que se circula.' },
  { id: 'f-sentido-circulacion', grupo: 'F', nombre: 'Sentido de circulación', articulo: 'Art. 170.2', significado: 'La vía es de una sola dirección en el sentido que indica la flecha. Se coloca paralela al eje de la vía a que se refiere la señal.' },
  { id: 'f-via-sin-salida', grupo: 'F', nombre: 'Vía sin salida', articulo: 'Art. 170.10', significado: 'La vía no tiene salida.' },
  { id: 'f-policlinico', grupo: 'F', nombre: 'Policlínico', articulo: 'Art. 170.11', significado: 'Indica la situación de un policlínico.' },
  { id: 'f-paso-peatones-cebra', grupo: 'F', nombre: 'Paso de peatones (cebra)', articulo: 'Art. 170.28 a)', significado: 'Indica el punto donde el peatón puede realizar el cruce con prioridad.' },
  { id: 'f-paso-peatones-paralelas', grupo: 'F', nombre: 'Paso de peatones (dos líneas)', articulo: 'Art. 170.28 b)', significado: 'Indica el punto donde el peatón puede realizar el cruce, sin concederle prioridad.' },
  { id: 'f-paso-peatones-desnivel', grupo: 'F', nombre: 'Paso de peatones a desnivel', articulo: 'Art. 170.29', significado: 'Indica el punto donde existe un paso de peatones a desnivel.' },
  { id: 'f-area-descanso', grupo: 'F', nombre: 'Área de descanso', articulo: 'Art. 170.32', significado: 'Proximidad de un área de descanso.' },
  { id: 'f-auxilio-carretera', grupo: 'F', nombre: 'Auxilio en carretera', articulo: 'Art. 170.33', significado: 'Situación del poste o puesto de socorro o el punto de control de carretera más cercano desde el que se puede solicitar auxilio en caso de accidente o avería.' },
  { id: 'f-telefono-emergencia', grupo: 'F', nombre: 'Teléfono de emergencia', articulo: 'Art. 170.34', significado: 'Indica la situación de un teléfono de emergencia.' },

  /* ------------------------------------------------------ Grupos G y H --- */
  { id: 'g-poblacion', grupo: 'G', nombre: 'Señal de población', articulo: 'Art. 172.3', significado: 'Indica el lugar donde comienza una zona urbana, mediante el nombre de la ciudad o pueblo.' },
  { id: 'g-velocidad-maxima-aconsejable', grupo: 'G', nombre: 'Velocidad máxima aconsejable', articulo: 'Art. 172.21', significado: 'Indica la conveniencia de no rebasar la velocidad señalada.' },
  { id: 'g-giro-u-permitido', grupo: 'G', nombre: 'Giro en “U” permitido', articulo: 'Art. 172.22', significado: 'Indica el lugar donde está permitido el giro en “U” o media vuelta sobre la propia vía.' },
  { id: 'g-via-vehiculos-lentos', grupo: 'G', nombre: 'Vía para vehículos lentos', articulo: 'Art. 172.23', significado: 'Indica la vía que han de utilizar los vehículos lentos, que pueden abandonarla para efectuar un adelantamiento.' },
  { id: 'h-cruz-una-via', grupo: 'H', nombre: 'Cruce con una sola vía férrea', articulo: 'Art. 173.1', significado: 'Indica el cruce con una vía férrea simple.' },
  { id: 'h-cruz-dos-vias', grupo: 'H', nombre: 'Cruce con dos o más vías férreas', articulo: 'Art. 173.2', significado: 'Indica que dos o más vías férreas pasan por el paso a nivel.' },

  /* --------------------------------------- Señales horizontales (marcas) - */
  { id: 'm-linea-continua', grupo: 'M', nombre: 'Línea continua', articulo: 'Art. 178.1', significado: 'Ningún vehículo puede cruzarla ni circular sobre ella.' },
  { id: 'm-linea-discontinua', grupo: 'M', nombre: 'Línea discontinua', articulo: 'Art. 178.2', significado: 'Los vehículos pueden cruzarla según lo requieran. Si la discontinuidad es con intervalos menores que el largo del trazo, anuncia que está próxima a continuar en línea continua.' },
  { id: 'm-doble-continua', grupo: 'M', nombre: 'Doble línea continua', articulo: 'Art. 178.3', significado: 'Ningún vehículo puede cruzarla ni circular sobre ella. Anuncia una peligrosidad mayor.' },
  { id: 'm-continua-discontinua', grupo: 'M', nombre: 'Líneas paralelas continua y discontinua', articulo: 'Art. 178.4', significado: 'No se puede cruzar cuando a su lado izquierdo está primero la línea continua; sí se puede cuando a ese lado está la discontinua. Terminado un adelantamiento se puede cruzar la continua para volver a su carril.' },
  { id: 'm-linea-borde', grupo: 'M', nombre: 'Línea continua del borde de la calzada', articulo: 'Art. 178.5', significado: 'Marca el límite derecho de la calzada. Puede cruzarse para efectuar una detención, sin que el vehículo quede en posición que afecte o perjudique la circulación de los demás usuarios.' },
  { id: 'm-canalizacion', grupo: 'M', nombre: 'Línea continua de canalización', articulo: 'Art. 178.6', significado: 'Delimita los carriles o sendas en las áreas críticas de la circulación.' },
  { id: 'm-linea-pare', grupo: 'M', nombre: 'Línea de Pare', articulo: 'Art. 179.1', significado: 'El conductor está obligado a detenerse ante ella por estar ante la señal de Pare o ante la luz amarilla o roja del semáforo. Es una franja ancha continua trazada a todo lo ancho de cada carril.' },
  { id: 'm-linea-ceda', grupo: 'M', nombre: 'Línea de Ceda el Paso', articulo: 'Art. 179.3', significado: 'Los conductores no deben pasarla cuando tienen que ceder el paso. Es una franja ancha discontinua; puede llevar delante un triángulo de línea gruesa con el vértice dirigido hacia los vehículos que se aproximan.' },
  { id: 'm-cebra', grupo: 'M', nombre: 'Franja de cruce de peatones (cebra)', articulo: 'Art. 179.4', significado: 'Indica el lugar destinado para que los peatones crucen la vía, con preferencia en el cruce sobre los vehículos.' },
  { id: 'm-doble-linea-peatones', grupo: 'M', nombre: 'Doble línea para el cruce de peatones', articulo: 'Art. 179.5', significado: 'Dos líneas que conforman una senda destinada a los peatones que cruzan la vía, sin preferencia en el cruce.' },
  { id: 'm-paso-nivel', grupo: 'M', nombre: 'Marca de paso a nivel', articulo: 'Art. 179.6', significado: 'Indica la proximidad de un paso a nivel: una X sobre la vía con las letras F y C en sus ángulos izquierdo y derecho.' },

  /* ---------------------------------------------------------- Semáforos -- */
  { id: 'sem-rojo', grupo: 'S', nombre: 'Luz roja', articulo: 'Art. 150', significado: 'Los conductores están obligados a detenerse en la línea de Pare o, si no existe, antes del paso para peatones, sin sobrepasar la intersección. Si junto a la roja se enciende la amarilla, significa que está a punto de terminar, pero no cambia la acción prohibitiva de la roja.' },
  { id: 'sem-amarillo', grupo: 'S', nombre: 'Luz amarilla', articulo: 'Art. 151', significado: 'Obliga a detenerse en la línea de Pare, salvo que al proyectarse la luz el vehículo esté tan cerca de la intersección que no pueda detenerse con seguridad. Cuando es intermitente se puede continuar la marcha extremando las precauciones.' },
  { id: 'sem-verde', grupo: 'S', nombre: 'Luz verde', articulo: 'Art. 152', significado: 'Permite continuar la marcha, doblar a la derecha y doblar a la izquierda con precaución donde no se prohíba el giro, cediendo el paso a los vehículos que circulan en sentido contrario. Cuando es intermitente alerta de que su tiempo está por concluir.' },
  { id: 'sem-flecha-verde', grupo: 'S', nombre: 'Luz verde con flecha', articulo: 'Art. 152.2', significado: 'Solo se permite continuar la marcha en el sentido que indica la flecha, independientemente del sentido de circulación de la vía.' },
  { id: 'sem-peatonal', grupo: 'S', nombre: 'Semáforo para peatones', articulo: 'Art. 155', significado: 'Los peatones cruzan con la luz verde y se detienen en la acera, paseo o zona de seguridad con la luz roja. Puede tener señal sonora que indique el tiempo disponible para cruzar.' },

  /* -------------------------------------------------- Señales del agente - */
  { id: 'ag-atencion-alto', grupo: 'AG', nombre: 'Atención, Alto', articulo: 'Art. 63.1', significado: 'El agente levanta el brazo verticalmente: todos los usuarios de la vía deben detenerse de inmediato.' },
  { id: 'ag-alto', grupo: 'AG', nombre: 'Alto', articulo: 'Art. 63.2', significado: 'El agente extiende uno o los dos brazos horizontalmente, como continuación de su hombro: los usuarios que se encuentren de frente o a espalda del agente deben detenerse de inmediato; solamente los que están en el mismo sentido de dirección del brazo pueden continuar.' },
  { id: 'ag-brazo-al-frente', grupo: 'AG', nombre: 'Brazo extendido horizontalmente al frente', articulo: 'Art. 63.4', significado: 'Indica a los conductores que se encuentren a la izquierda del agente que pueden circular en todas las direcciones, y a los peatones que pueden cruzar a su espalda.' },
]

export const SENAL_POR_ID: Record<string, Senal> = Object.fromEntries(
  SENALES.map((s) => [s.id, s]),
)
