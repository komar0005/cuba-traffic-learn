/**
 * Contenido de estudio por tema. Resumen fiel del articulado de la Ley 109,
 * Código de Seguridad Vial, siguiendo el temario de la escuela de educación vial.
 */

export type Bloque =
  | { tipo: 'texto'; texto: string }
  | { tipo: 'lista'; titulo?: string; items: string[] }
  | { tipo: 'clave'; titulo: string; texto: string }
  | { tipo: 'senales'; titulo?: string; ids: string[] }
  | { tipo: 'tabla'; titulo?: string; encabezados: string[]; filas: string[][] }

export type Seccion = { titulo: string; articulo?: string; bloques: Bloque[] }

export type Tema = {
  numero: number
  titulo: string
  resumen: string
  secciones: Seccion[]
}

export const TEMAS: Tema[] = [
  {
    numero: 1,
    titulo: 'Señales del conductor, del agente y marcas en el pavimento',
    resumen:
      'Cómo circular por la vía, las señales de brazo, lo que ordena el agente de la autoridad, las marcas del pavimento y el orden de prioridad de todas las señales.',
    secciones: [
      {
        titulo: 'Cómo debe circular por la vía',
        articulo: 'Art. 65',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'El conductor está obligado a:',
            items: [
              'Transitar de acuerdo con el sentido señalizado en las vías de un solo sentido de dirección.',
              'Transitar por el lado derecho del eje central de la vía, según el sentido en que circule, en vías de doble sentido.',
              'Mantener el máximo de la velocidad autorizada cuando circule por el carril de la extrema izquierda en vías de dos o más carriles en el mismo sentido, salvo que pretenda girar a la izquierda.',
              'No exceder los límites de velocidad establecidos para la vía.',
              'En vías de tres o más carriles en un mismo sentido, usar el carril de la extrema derecha cuando circule a marcha lenta.',
              'En vías de tres carriles con doble sentido, usar las sendas extremas a ambos lados; el carril central queda para el adelantamiento en ambos sentidos.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Las vías sin señalizar',
            texto:
              'Las vías que no tengan señalizado su sentido de dirección se consideran de doble sentido de circulación (Art. 79).',
          },
        ],
      },
      {
        titulo: 'Señales de brazo del conductor',
        articulo: 'Art. 77',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Cuando no funcionan las luces, se usan las señales de brazo:',
            items: [
              'Disminuir la velocidad o parar: brazo fuera, inclinado hacia abajo, con la palma de la mano hacia atrás.',
              'Doblar o cambiar de carril a la derecha: brazo fuera en posición vertical hacia arriba.',
              'Doblar o cambiar de carril a la izquierda: brazo fuera y extendido en posición horizontal.',
              'Dar marcha atrás: brazo extendido con la palma de la mano hacia atrás.',
            ],
          },
          {
            tipo: 'texto',
            texto:
              'Hacer la señal no concede derecho de vía. Antes de efectuar la maniobra hay que cerciorarse de que no ocasionará interferencias a la circulación ni dará lugar a un accidente.',
          },
        ],
      },
      {
        titulo: 'Señales del agente de la autoridad',
        articulo: 'Art. 63',
        bloques: [
          { tipo: 'senales', ids: ['ag-atencion-alto', 'ag-alto', 'ag-brazo-al-frente'] },
          {
            tipo: 'lista',
            items: [
              '«Atención, Alto»: el agente levanta el brazo verticalmente. Todos los usuarios de la vía deben detenerse de inmediato.',
              '«Alto»: uno o los dos brazos extendidos horizontalmente. Se detienen los que están de frente o a espalda del agente; los que están en el sentido del brazo pueden continuar.',
              'Brazo extendido horizontalmente al frente: los conductores que están a la izquierda del agente pueden circular en todas las direcciones y los peatones cruzar a su espalda.',
              'Después de hacer la señal de «Alto», el agente puede bajar el brazo: la circulación regulada no varía.',
              'Balanceo manual de una luz roja: los usuarios hacia los que va dirigida deben detenerse.',
              'Silbato: una serie de toques cortos para detener los vehículos; un toque largo para reanudar la marcha.',
              'Banderas desde el vehículo policial: roja cierra temporalmente la calzada, verde la abre de nuevo, amarilla indica extremar la atención o la proximidad de un peligro.',
            ],
          },
        ],
      },
      {
        titulo: 'Vehículos con prioridad y accidentes',
        articulo: 'Art. 67 y 69',
        bloques: [
          {
            tipo: 'clave',
            titulo: 'Sirena o baliza',
            texto:
              'Al escuchar la sirena o ver la baliza de un vehículo que requiere prioridad: si conduce, debe arrimar y detener el vehículo al borde derecho de la vía en el sentido en que circula. Si es peatón y está cruzando, debe alcanzar o retornar rápidamente a la acera o zona de seguridad.',
          },
          {
            tipo: 'lista',
            titulo: 'Implicado en un accidente, usted está obligado a:',
            items: [
              'Dar cuenta de inmediato a la PNR cuando resulten personas muertas o lesionadas, y en todos los casos en que participe un vehículo estatal, se afecte la propiedad estatal o un bien mueble o inmueble sin el perjudicado presente.',
              'Mantener el vehículo en la posición que resulte del accidente cuando haya muerte o lesión de una persona.',
              'Tomar las medidas a su alcance para advertir el hecho a los demás usuarios de la vía.',
              'Permanecer en el lugar hasta la llegada de los agentes de la PNR.',
              'Excepción: puede retirarse para trasladar una víctima o para recibir él mismo asistencia médica, debiendo retornar de inmediato.',
            ],
          },
        ],
      },
      {
        titulo: 'Marcas en el pavimento (señales horizontales)',
        articulo: 'Art. 175 al 180',
        bloques: [
          {
            tipo: 'clave',
            titulo: 'El color no indica la regulación',
            texto:
              'Las marcas son amarillas o blancas, pero su color no indica la regulación: la indica el diseño de su trazado en el pavimento (Art. 176.2).',
          },
          {
            tipo: 'senales',
            titulo: 'Marcas paralelas a la circulación',
            ids: [
              'm-linea-continua',
              'm-linea-discontinua',
              'm-doble-continua',
              'm-continua-discontinua',
              'm-linea-borde',
              'm-canalizacion',
            ],
          },
          {
            tipo: 'senales',
            titulo: 'Marcas transversales a la circulación',
            ids: ['m-linea-pare', 'm-linea-ceda', 'm-cebra', 'm-doble-linea-peatones', 'm-paso-nivel'],
          },
        ],
      },
      {
        titulo: 'Orden de prioridad de las señales',
        articulo: 'Art. 62',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'De mayor a menor prioridad:',
            items: [
              'Señales de los agentes de la PNR, los reguladores militares del tránsito y los guardacruceros.',
              'Señales que indican régimen de circulación provisional.',
              'Señales mediante luces de los semáforos, sonoras y lumínicas.',
              'Señales verticales.',
              'Señales horizontales (marcas en el pavimento).',
            ],
          },
        ],
      },
    ],
  },
  {
    numero: 2,
    titulo: 'Semáforos y límites de velocidad',
    resumen:
      'Qué ordena cada luz del semáforo, los semáforos de carril y de peatones, y todos los límites de velocidad en zona urbana y rural.',
    secciones: [
      {
        titulo: 'Las luces del semáforo',
        articulo: 'Art. 149 al 152',
        bloques: [
          { tipo: 'senales', ids: ['sem-rojo', 'sem-amarillo', 'sem-verde', 'sem-flecha-verde', 'sem-peatonal'] },
          {
            tipo: 'texto',
            texto:
              'Las luces están situadas, de arriba abajo o de izquierda a derecha, en el orden: roja, amarilla, verde. El contador de tiempo no sustituye el significado de las luces ni determina prioridades.',
          },
          {
            tipo: 'lista',
            titulo: 'Luz roja',
            items: [
              'Obliga a detenerse en la línea de Pare o, si no existe, antes del paso para peatones sin sobrepasar la intersección.',
              'Roja + amarilla juntas: la roja está por terminar, pero no cambia su acción prohibitiva.',
              'Roja intermitente: detenerse cualesquiera que sean las circunstancias de visibilidad y continuar cediendo el paso.',
              'Roja intermitente en pasos a nivel, salidas de ambulancias o bomberos y puentes móviles: no se continúa la marcha mientras permanezca encendida.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Luz amarilla',
            items: [
              'Obliga a detenerse, salvo que al proyectarse se encuentre tan cerca de la intersección que no pueda detenerse con seguridad suficiente.',
              'Intermitente: se puede continuar extremando las precauciones hasta rebasar la zona regulada.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Luz verde',
            items: [
              'Permite continuar la marcha, doblar a la derecha y doblar a la izquierda con precaución donde no se prohíba el giro, cediendo el paso a los que circulan en sentido contrario.',
              'Verde con flecha: solo se permite el sentido que indica la flecha.',
              'Verde intermitente: alerta de que su tiempo está por concluir.',
              'Donde se establece por flecha el giro a la izquierda, se permite también el giro en «U» si no lo prohíbe el Art. 89.4.',
            ],
          },
        ],
      },
      {
        titulo: 'Límites de velocidad en zona urbana',
        articulo: 'Art. 126 y 127',
        bloques: [
          {
            tipo: 'tabla',
            encabezados: ['Velocidad', 'Se aplica a'],
            filas: [
              ['20 km/h', 'Equipos especializados de la construcción, industriales, tractores y equipos agrícolas. En salidas de garajes y edificios.'],
              ['30 km/h', 'Velocidad máxima para vehículos con arrastre (remolcados).'],
              ['40 km/h', 'Zona escolar o de niños. Vehículos destinados al transporte masivo de personal.'],
              ['50 km/h', 'Velocidad máxima para todo tipo de vehículo de motor.'],
              ['60 km/h', 'Velocidad mínima obligatoria en los túneles.'],
            ],
          },
        ],
      },
      {
        titulo: 'Límites de velocidad en zona rural',
        articulo: 'Art. 125 y 127',
        bloques: [
          {
            tipo: 'tabla',
            encabezados: ['Tipo de vehículo', 'Carreteras', 'Autopistas'],
            filas: [
              ['Motos, ómnibus y vehículos ligeros', '90 km/h', '100 km/h'],
              ['Vehículos de carga rígidos y articulados', '80 km/h', '90 km/h'],
              ['Grúas y remolques', '70 km/h', '80 km/h'],
            ],
          },
          {
            tipo: 'lista',
            items: [
              '40 km/h: vehículos con arrastre.',
              '60 km/h: zona escolar, camiones de transportación masiva de personal y caminos de tierra o terraplén.',
              'En vías rurales de más de dos carriles en el mismo sentido, los vehículos que circulan a menos de 60 km/h deben hacerlo por el carril de la extrema derecha y usar el inmediato izquierdo para adelantar (Art. 66).',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Marcha atrás',
            texto:
              'No más de 20 metros, a no más de 20 km/h, observando la vía detrás del vehículo, sin obstruir la circulación y nunca en túnel, intersección, paso a nivel, curva o cerca de un cambio de rasante (Art. 92).',
          },
        ],
      },
    ],
  },
  {
    numero: 3,
    titulo: 'Transportación masiva de personal y prohibiciones de circulación',
    resumen:
      'Reglas para llevar personas en vehículos de carga, caravanas, dimensiones y peso máximos, y cómo debe ir acondicionada la carga.',
    secciones: [
      {
        titulo: 'Prohibiciones generales de circulación',
        articulo: 'Art. 106 al 125',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Circular por aceras, paseos, separador central o cualquier componente de la vía no construido para ello.',
              'Interrumpir el tránsito sin permiso del Ministerio del Interior y sin situar previamente las señales adecuadas.',
              'Trasbordar mercancías de un vehículo a otro en la vía cuando obstruya la circulación, excepto por accidente o rotura.',
              'Cruzar una intersección o paso de peatones cuando la vía está obstaculizada más allá y el vehículo no puede rebasarla sin obstruirla.',
              'Circular vehículos de carga de más de 10 000 kg de capacidad nominal en zonas urbanas, salvo autorización.',
              'Reparar cualquier vehículo en la vía, excepto en casos de fuerza mayor y por el tiempo mínimo indispensable.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Remolcar un vehículo',
            texto:
              'Barra fija o, en su lugar, cable o cuerda resistente y señalizada de no más de 8 metros —prohibido el cable si fallan los frenos del remolcado—; bandera roja o luces de avería detrás; velocidad máxima de arrastre de 30 km/h en zona urbana y 40 km/h en zona rural; luces encendidas a cualquier hora del día.',
          },
        ],
      },
      {
        titulo: 'Transporte de personas en vehículos de carga',
        articulo: 'Art. 135',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Velocidad máxima: 40 km/h en zona urbana y 60 km/h en zona rural.',
              'Barandas posteriores y laterales de metal o madera capaces de resistir el impacto de los pasajeros.',
              'Si las barandas miden menos de 120 cm de alto, las personas deben ir obligatoriamente sentadas.',
              'La altura de las barandas para transportar personas sentadas no debe ser inferior a 40 cm.',
              'Máximo cuatro personas de pie por metro cuadrado en viajes de una hora o menos; en viajes de más de una hora todos deben ir sentados.',
              'No transportar personas sentadas en las barandas con parte del cuerpo fuera de la cama o caja.',
              'Llevar cerrada la tapa o baranda posterior durante el viaje.',
              'Evitar bandazos, frenazos rápidos y maniobras similares.',
            ],
          },
        ],
      },
      {
        titulo: 'Caravanas',
        articulo: 'Art. 136',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Un responsable en la cabina y otro en la cama o caja de cada vehículo, consignados en la hoja de ruta.',
              'El jefe de la caravana viaja en la cabina del vehículo guía.',
              'Ningún vehículo de la caravana puede adelantar al que le precede, salvo fuerza mayor.',
              'Todos llevan encendidas las luces de cruce o cortas también en horas del día.',
              'Nadie se baja hasta que el vehículo esté detenido en el área prevista.',
              'Si el personal debe cruzar a pie una vía, los responsables detienen el tránsito mientras se efectúa el cruce.',
            ],
          },
        ],
      },
      {
        titulo: 'Dimensiones, peso y carga',
        articulo: 'Art. 103, 131 y 132',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Se prohíbe la circulación cuando:',
            items: [
              'La longitud sea mayor que 15 m en vehículos rígidos y 18 m en articulados o conjuntos.',
              'El ancho sea mayor que 2,60 m.',
              'La altura sea mayor que 4 m.',
              'El peso de la carga exceda el máximo autorizado en la licencia de circulación.',
              'Transporte más personas que el total permisible o las lleve en guardafangos, capó, defensa o cualquier parte exterior.',
              'Tenga el timón instalado a la derecha, o circule con las puertas abiertas.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Carga que sobresale',
            texto:
              'Si la carga sobresale más de un metro por delante o por detrás, debe señalizarse: de noche, luz y reflectante blancos delante y rojos detrás; de día, dos banderas rojas de 30 × 30 cm. Deben advertirse a 100 metros como mínimo (Art. 134).',
          },
        ],
      },
    ],
  },
  {
    numero: 4,
    titulo: 'Dónde hay que parar y dónde ceder el paso',
    resumen:
      'Lugares donde es obligatorio detener la marcha, dónde hay que aminorar y parar si fuera necesario, prioridades sin señales, pasos a nivel, peatones y uso del claxon.',
    secciones: [
      {
        titulo: 'Obligatorio detener la marcha',
        articulo: 'Art. 78',
        bloques: [
          { tipo: 'senales', ids: ['b-pare', 'b-ceda-el-paso', 'a-circulacion-giratoria'] },
          {
            tipo: 'lista',
            items: [
              'Ante la señal de Pare: detener la marcha cualesquiera que sean las circunstancias de visibilidad, dando prioridad a los vehículos que circulan por la vía transversal.',
              'Ante la señal de Ceda el Paso: disminuir la velocidad y parar si fuera necesario para permitir el paso a todos los vehículos que se aproximen por la vía transversal.',
              'Al incorporarse a una rotonda: disminuir la velocidad y parar si fuera necesario, cediendo el paso a los vehículos que circulan por ella.',
            ],
          },
        ],
      },
      {
        titulo: 'Prioridades cuando no hay señales',
        articulo: 'Art. 79',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Disminuya la velocidad, mire a ambos lados y ceda el paso:',
            items: [
              'Al vehículo que por la vía transversal se aproxima por su lado derecho, en vías de igual categoría.',
              'En las intersecciones en «T», al vehículo de la vía transversal cuando usted circula por el acceso que no tiene continuidad.',
              'Cuando circula por una vía de un solo sentido y se incorpora o cruza una vía de doble sentido.',
              'Al vehículo que se aproxima por el carril al que pretende incorporarse al salir de un estacionamiento, parqueo o acceso.',
              'A los vehículos que se aproximan por una vía pavimentada cuando usted circula por una no pavimentada.',
              'A los vehículos que se aproximan en sentido opuesto por la misma vía, cuando vaya a doblar a la izquierda en una vía de doble sentido.',
            ],
          },
        ],
      },
      {
        titulo: 'Pasos a nivel y peatones',
        articulo: 'Art. 80 y 82',
        bloques: [
          {
            tipo: 'clave',
            titulo: 'Tres metros',
            texto:
              'En todo paso a nivel sin ningún tipo de señalización, detenga la marcha a no menos de 3 metros del carril de la vía férrea más cercano y compruebe que no se aproxima ningún vehículo por la vía férrea antes de emprender la marcha.',
          },
          {
            tipo: 'lista',
            items: [
              'En pasos a nivel con barreras o señales sonoras y lumínicas: moderar la velocidad y tomar precauciones, salvo que el guardacrucero o la señal indique detenerse.',
              'No demorar indebidamente el cruce de un paso a nivel.',
              'Detenerse y ceder el paso cuando observe peatones listos para cruzar o cruzando por marcas tipo cebra o señales del mismo tipo.',
            ],
          },
        ],
      },
      {
        titulo: 'Moderar la marcha y parar si fuera necesario',
        articulo: 'Art. 128',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Frente a espectáculos públicos y reuniones a la hora de entrada y salida, o en aglomeraciones de personas.',
              'Al acercarse a animales, solos o en rebaños.',
              'En los tramos de calzada que presentan estrechamiento.',
              'Con niebla densa, lluvia copiosa, nubes de humo o de polvo.',
              'Cuando la superficie está resbaladiza por agua, grasa, arena o lodo.',
              'Cuando un ómnibus o vehículo de transporte colectivo se está deteniendo o está detenido.',
              'Cuando un peatón se encuentra en la calzada, para permitirle el cruce.',
              'Ante la presencia de un peatón discapacitado.',
              'En una intersección semaforizada cuando el semáforo no funciona.',
              'Cuando quien guía un grupo organizado se lo indica para permitir el cruce.',
            ],
          },
        ],
      },
      {
        titulo: 'Uso del claxon',
        articulo: 'Art. 191',
        bloques: [
          {
            tipo: 'texto',
            texto:
              'Todo vehículo debe estar equipado con claxon o aparato similar en perfecto estado. Se prohíbe usarlo dentro de las poblaciones y zonas de silencio, excepto por peligro, conducción de un herido o enfermo grave, pedir auxilio o evitar accidentes.',
          },
        ],
      },
    ],
  },
  {
    numero: 5,
    titulo: 'Estacionamiento, parqueo y detención momentánea',
    resumen:
      'Cómo y dónde se parquea, qué hacer al dejar el vehículo, obligaciones al tomar y dejar pasajeros y la lista de lugares donde está prohibido estacionar.',
    secciones: [
      {
        titulo: 'Cómo se estaciona',
        articulo: 'Art. 137',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Paralelo a la dirección de la circulación y junto a la acera o borde derecho, en vías de dos sentidos.',
              'Paralelo y junto al borde izquierdo, en el sentido del tránsito, en vías de un solo sentido; salvo en vías secundarias de poco tránsito y zonas residenciales con ancho suficiente para tres hileras, donde puede estacionarse a ambos lados.',
              'Con las ruedas a no más de 10 cm del contén de la acera o borde de la calzada.',
              'A no menos de 50 cm de otro vehículo.',
              'Dentro de la valla del parqueo, sin sobresalir de sus límites.',
            ],
          },
        ],
      },
      {
        titulo: 'Al dejar el vehículo estacionado',
        articulo: 'Art. 138',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Parar el motor y cerrar el chucho o interruptor de la ignición.',
              'Retirar la llave.',
              'Aplicar el freno de mano o de seguridad.',
              'Cuesta arriba: aplicar la primera velocidad y girar el timón en sentido contrario al contén, de manera que las ruedas topen con él si el vehículo se desplaza.',
              'Cuesta abajo: aplicar la velocidad de marcha atrás y girar el timón hacia el contén.',
              'Donde no exista contén: calzar las ruedas traseras o delanteras según la pendiente.',
            ],
          },
        ],
      },
      {
        titulo: 'Tomar y dejar pasajeros',
        articulo: 'Art. 83 y 148',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'No abrir las puertas hasta que el vehículo esté completamente detenido.',
              'Parar en firme en los lugares establecidos o señalizados cuando sea transporte público.',
              'Mantener el vehículo detenido solo el tiempo necesario.',
              'No reanudar la marcha hasta cerciorarse de que todos terminaron de subir o bajar y las puertas están cerradas.',
              'Los pasajeros deben usar los medios de protección pasivos, descender por el lado de la acera y no llevar parte del cuerpo u objetos fuera de la cabina o cama.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Cinturón de seguridad',
            texto:
              'Los vehículos de motor deben tener cinturón de seguridad en los asientos delanteros y traseros, según diseño del fabricante. El conductor está obligado a usarlo correctamente y a exigir su uso a los pasajeros (Art. 84 y 194).',
          },
        ],
      },
      {
        titulo: 'Dónde está prohibido estacionar',
        articulo: 'Art. 139',
        bloques: [
          { tipo: 'senales', ids: ['c-estacionamiento-prohibido', 'c-prohibido-estacionar-detener'] },
          {
            tipo: 'lista',
            items: [
              'Acera, paseo o césped.',
              'En zona de carga, en las horas y días de las operaciones de carga y descarga.',
              '40 metros hacia atrás como mínimo y 10 metros hacia delante de la señal de parada de ómnibus.',
              'En la piquera de automóviles de alquiler, en los días y horas del servicio.',
              'En la parte de la vía que circunda islas o rotondas.',
              'En la entrada o salida de garajes, pistas y rampas.',
              'Entre una zona de seguridad y la acera, o entre dos zonas de seguridad.',
              'A menos de 4 metros, delante o detrás, de un hidrante.',
              'Frente y costado de unidades de la PNR, bomberos, MININT o FAR.',
              'En puentes, túneles, pasos superiores o inferiores, pasos peatonales, curvas de visibilidad reducida y cambios de rasante —aunque la detención sea momentánea—.',
              'Sobre los pasos a nivel y 10 metros hacia delante y hacia atrás de estos.',
              'En ciclovías, ciclocarriles o vías exclusivas.',
              '10 metros antes y 10 después de los accesos a las intersecciones, y 100 metros si son semaforizadas.',
              'De forma que impida la salida de otros vehículos ya estacionados u obstruya la fluidez de la circulación.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Avería en vía rural',
            texto:
              'Si por rotura debe detenerse en la parte destinada a la circulación en una vía rural, coloque la señal reglamentaria a 30 metros detrás del vehículo, en línea recta con él y visible a no menos de 150 metros (Art. 140).',
          },
        ],
      },
    ],
  },
  {
    numero: 6,
    titulo: 'Señales verticales internacionales',
    resumen:
      'Los ocho grupos de señales verticales: peligro, prioridad, prohibición, obligación, fin de prohibición, información, orientación y pasos a nivel.',
    secciones: [
      {
        titulo: 'Reglas generales',
        articulo: 'Art. 156 y 157',
        bloques: [
          {
            tipo: 'texto',
            texto:
              'La señal vertical es el conjunto de los elementos de sustentación, la placa y los símbolos o leyendas inscritos en ella. Persigue la seguridad, la eficiencia y la comodidad de la circulación.',
          },
          {
            tipo: 'lista',
            items: [
              'Solo se pueden usar las señales prescritas en el Código; queda prohibido el uso de otras señales.',
              'Se colocan al lado derecho del sentido de circulación de quien debe observarlas; cuando las circunstancias lo exigen, pueden ir a la izquierda, a ambos lados, al centro o elevadas sobre los carriles.',
              'No se puede destruir, alterar, mover, pintar ni simular barreras y señales por personas no autorizadas.',
              'No se puede colocar carteles u objetos que limiten la visibilidad de las señales.',
              'Las señales pueden tener distintos tamaños según las velocidades de circulación.',
            ],
          },
        ],
      },
      {
        titulo: 'Grupo A — Peligro o precaución',
        articulo: 'Art. 159 y 160',
        bloques: [
          {
            tipo: 'texto',
            texto:
              'Triangulares con un vértice hacia arriba, fondo amarillo, orla roja y símbolo negro. Se fijan antes del tramo peligroso, a no menos de 100 metros fuera de las poblaciones y 50 metros dentro de ellas.',
          },
          {
            tipo: 'senales',
            ids: [
              'a-cruce-preferencia', 'a-entronque-derecho', 'a-entronque-izquierdo', 'a-cruce',
              'a-cruce-semaforo', 'a-circulacion-giratoria', 'a-paso-nivel-con-proteccion',
              'a-paso-nivel-sin-proteccion', 'a-vuelo-rasante', 'a-perfil-irregular',
              'a-curva-derecha', 'a-curva-izquierda', 'a-doble-curva-derecha', 'a-doble-curva-izquierda',
              'a-viento-lateral', 'a-bajada-peligrosa', 'a-obras', 'a-pavimento-resbaladizo',
              'a-paso-peatones-cebra', 'a-paso-peatones-paralelas', 'a-ninos', 'a-animal-domestico',
              'a-doble-sentido', 'a-salida-ciclistas', 'a-desvio', 'a-otros-peligros',
            ],
          },
        ],
      },
      {
        titulo: 'Grupo B — Prioridad',
        articulo: 'Art. 161 y 162',
        bloques: [
          {
            tipo: 'senales',
            ids: [
              'b-pare', 'b-ceda-el-paso', 'b-prioridad-sentido-contrario', 'b-prioridad-circulacion',
              'b-via-con-prioridad', 'b-fin-via-con-prioridad', 'b-ceda-luz-roja', 'b-ceda-izquierda-luz-verde',
            ],
          },
        ],
      },
      {
        titulo: 'Grupo C — Prohibición',
        articulo: 'Art. 163 y 164',
        bloques: [
          {
            tipo: 'senales',
            ids: [
              'c-circulacion-prohibida', 'c-acceso-prohibido', 'c-prohibido-motor-excepto-motos',
              'c-prohibido-motocicletas', 'c-prohibido-todos-motor', 'c-prohibido-carga-3500',
              'c-prohibido-ciclos', 'c-prohibido-traccion-animal', 'c-prohibido-animales-montura',
              'c-prohibido-carros-mano', 'c-prohibido-peatones', 'c-prohibido-peso', 'c-prohibido-peso-eje',
              'c-prohibido-longitud', 'c-prohibido-anchura', 'c-prohibido-altura', 'c-prohibido-remolque',
              'c-prohibido-agricolas', 'c-prohibido-distancia-minima', 'c-velocidad-maxima',
              'c-prohibido-girar-derecha', 'c-prohibido-girar-izquierda', 'c-prohibido-giro-u',
              'c-prohibido-adelantar', 'c-prohibido-adelantar-carga', 'c-estacionamiento-prohibido',
              'c-prohibido-estacionar-detener', 'c-prohibido-pasar-sin-detenerse',
            ],
          },
        ],
      },
      {
        titulo: 'Grupo D — Obligación',
        articulo: 'Art. 165 y 166',
        bloques: [
          {
            tipo: 'senales',
            ids: [
              'd-sentido-obligatorio-recto', 'd-sentido-obligatorio-derecha', 'd-sentido-obligatorio-izquierda',
              'd-sentido-obligatorio-giro-derecha', 'd-sentido-obligatorio-giro-izquierda', 'd-sentido-giratorio',
              'd-paso-obligatorio-derecha', 'd-paso-obligatorio-izquierda', 'd-via-ciclistas', 'd-via-peatones',
              'd-velocidad-minima', 'd-via-camiones', 'd-via-omnibus',
            ],
          },
        ],
      },
      {
        titulo: 'Grupos E, F, G y H',
        articulo: 'Art. 167 al 173',
        bloques: [
          {
            tipo: 'senales',
            titulo: 'Fin de prohibición u obligación',
            ids: ['e-fin-velocidad-maxima', 'e-fin-prohibido-adelantar', 'e-fin-prohibido-adelantar-carga', 'e-fin-velocidad-minima', 'e-fin-todas-prohibiciones'],
          },
          {
            tipo: 'senales',
            titulo: 'Información',
            ids: ['f-via-sentido-unico', 'f-sentido-circulacion', 'f-via-sin-salida', 'f-policlinico', 'f-paso-peatones-cebra', 'f-paso-peatones-paralelas', 'f-paso-peatones-desnivel', 'f-area-descanso', 'f-auxilio-carretera', 'f-telefono-emergencia'],
          },
          {
            tipo: 'senales',
            titulo: 'Orientación y pasos a nivel',
            ids: ['g-poblacion', 'g-velocidad-maxima-aconsejable', 'g-giro-u-permitido', 'g-via-vehiculos-lentos', 'h-cruz-una-via', 'h-cruz-dos-vias'],
          },
        ],
      },
    ],
  },
  {
    numero: 8,
    titulo: 'Sanciones, multas y licencia de conducción',
    resumen:
      'El alcohol al volante, los delitos contra la seguridad del tránsito, los grupos de multas y sus puntos, y las causales de suspensión y cancelación de la licencia.',
    secciones: [
      {
        titulo: 'Ingestión de bebidas alcohólicas',
        articulo: 'Art. 93 al 95',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Cifras de alcohol en sangre',
            encabezados: ['Concentración', 'Valoración'],
            filas: [
              ['Menos de 25 mg %', 'Negativo'],
              ['25 – 49 mg %', 'Ingestión, sin afectación'],
              ['50 – 99 mg %', 'Afectación sin embriaguez'],
              ['100 – 199 mg %', 'Embriaguez simple'],
              ['200 mg % o más', 'Embriaguez manifiesta'],
            ],
          },
          {
            tipo: 'clave',
            titulo: 'En aire espirado',
            texto:
              '0,15 mg por litro o menos se considera NEGATIVO. A partir de 0,25 mg por litro se establece la afectación de la capacidad de conducción; 0,50 mg por litro o más diagnostica el estado de embriaguez alcohólica.',
          },
          {
            tipo: 'tabla',
            titulo: 'Aliento etílico con infracción del tránsito (Art. 94)',
            encabezados: ['No profesionales', 'Profesionales'],
            filas: [['Se duplica el importe de la multa', 'Suspensión de la licencia de 6 meses a 1 año y se duplica el importe de la multa']],
          },
          {
            tipo: 'tabla',
            titulo: 'Afectado para conducir, sin llegar a la embriaguez',
            encabezados: ['No profesionales', 'Profesionales'],
            filas: [['1 a 3 meses de privación de libertad o multa de hasta 100 cuotas, o ambas', '3 meses a 1 año de privación de libertad o multa de 100 a 300 cuotas, o ambas']],
          },
          {
            tipo: 'tabla',
            titulo: 'Afectado para conducir en estado de embriaguez',
            encabezados: ['No profesionales', 'Profesionales'],
            filas: [['3 meses a 1 año de privación de libertad o multa de 100 a 300 cuotas, o ambas', '6 meses a 2 años de privación de libertad o multa de 200 a 500 cuotas, o ambas']],
          },
          {
            tipo: 'texto',
            texto:
              'Se prohíbe ingerir bebidas alcohólicas en los vehículos y su transportación en los compartimientos del conductor y los pasajeros cuando es evidente que se está consumiendo (Art. 95).',
          },
        ],
      },
      {
        titulo: 'Delitos contra la seguridad del tránsito',
        articulo: 'Ley 62, Código Penal, Art. 177 al 183',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Peatones',
            encabezados: ['Sanción', 'Conducta'],
            filas: [
              ['3 meses a 1 año de privación de libertad o multa de 100 a 300 cuotas', 'Peatón que cause heridos graves o daños a bienes ajenos'],
              ['1 a 3 años de privación de libertad', 'El que dé lugar a un accidente del que resulte la muerte de una persona'],
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Conductores',
            encabezados: ['Sanción', 'Conducta'],
            filas: [
              ['100 cuotas de multa', 'Si causa daños a bienes de pertenencia ajena'],
              ['3 meses a 1 año de privación de libertad o multa de 100 a 300 cuotas', 'Si los daños causados son de considerable valor'],
              ['1 a 3 meses de privación de libertad o multa de 100 cuotas', 'El que cause heridas leves a peatones'],
              ['1 a 3 años de privación de libertad', 'El que cause heridos graves'],
              ['1 a 10 años de privación de libertad', 'El que por infringir las leyes del tránsito provoca la muerte de una persona'],
            ],
          },
        ],
      },
      {
        titulo: 'Grupos de multas y puntos',
        bloques: [
          {
            tipo: 'tabla',
            encabezados: ['Grupo', 'Calificación', 'Puntos', 'Importe'],
            filas: [
              ['Primer grupo', 'Muy peligrosas', '12 puntos', '60 pesos'],
              ['Segundo grupo', 'Peligrosas', '8 puntos', '40 pesos'],
              ['Tercer grupo', 'Menos peligrosas', '6 puntos', '20 pesos'],
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Acumulación de puntos',
            texto:
              'En un año natural se permite acumular como máximo 36 puntos para los titulares de licencia y 24 puntos para los conductores noveles.',
          },
        ],
      },
      {
        titulo: 'Suspensión y cancelación de la licencia',
        articulo: 'Art. 288 al 294',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Suspensión de 1 a 3 meses (Art. 288.1)',
            items: [
              'Titulares que dentro de un año natural excedan la puntuación determinada, cuando no incida más de una infracción «Muy Peligrosa».',
              'Conductores noveles que acumulen más de dos tercios de esa puntuación en las mismas condiciones.',
              'Titulares que a los 60 días naturales de impuesta una multa no hayan abonado su importe.',
              'Titulares de 65 años que no presenten los resultados del examen médico.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Cancelación de 1 a 3 años (Art. 289.1)',
            items: [
              'Titulares a quienes en los dos últimos años naturales se les suspenda la licencia en más de tres ocasiones.',
              'Conductores noveles a quienes se les suspenda en más de dos ocasiones.',
              'Conductores noveles que se detecten conduciendo bajo los efectos del alcohol.',
              'Aspirantes que durante la vigencia del permiso de aprendizaje circulen incumpliendo las regulaciones del aprendizaje o bajo los efectos del alcohol.',
            ],
          },
          {
            tipo: 'texto',
            texto:
              'Los conductores sancionados a cancelación están obligados a vencer y aprobar un curso de educación vial y conducción certificado como requisito previo para optar por una nueva licencia (Art. 290). Los titulares pueden disminuir parte de los puntos acumulados o el período de suspensión si optan voluntariamente por reexámenes teórico y práctico (Art. 291).',
          },
          {
            tipo: 'clave',
            titulo: 'Examen médico por edad',
            texto:
              'Al cumplir 65 y 70 años, los titulares deben presentarse en el centro asistencial de Salud Pública para examen médico y presentar los resultados. A partir de los 70 años, esta obligación es cada dos años (Art. 286).',
          },
        ],
      },
      {
        titulo: 'Clases y categorías de licencia',
        articulo: 'Art. 263 y 264',
        bloques: [
          {
            tipo: 'tabla',
            encabezados: ['Categoría', 'Autoriza a conducir'],
            filas: [
              ['A', 'Motocicletas y otros vehículos de motor similares. Subcategoría A-1: ciclomotores.'],
              ['B', 'Vehículos de motor no comprendidos en la A, de peso máximo autorizado hasta 3 500 kg y hasta 8 asientos sin contar el del conductor; puede arrastrar un remolque ligero.'],
              ['C', 'Vehículos de transporte de carga de más de 3 500 kg. Subcategoría C-1: de 3 500 a 7 500 kg.'],
              ['D', 'Vehículos de transporte de personas con más de 8 asientos. Subcategoría D-1: de 9 a 16 asientos.'],
              ['E', 'Conjuntos de vehículos cuyo vehículo de tracción está en B, C, C-1, D o D-1. Incluye ómnibus articulados.'],
              ['F', 'Vehículos agrícolas de motor y especializados de la construcción e industriales.'],
            ],
          },
        ],
      },
    ],
  },
  {
    numero: 9,
    titulo: 'Sistema de luces, adelantamiento y giros',
    resumen:
      'Qué luces debe llevar cada vehículo, cuándo usar cada una, dónde está prohibido adelantar, cómo se adelanta y cómo se gira.',
    secciones: [
      {
        titulo: 'Luces obligatorias',
        articulo: 'Art. 184',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Dos luces de cruce o cortas delante, que alumbren con eficacia hasta 40 metros.',
              'Si el automóvil supera los 40 km/h: además dos luces de carretera o largas, que alumbren al menos 100 metros. De color blanco o amarillo selectivo.',
              'Luces de posición: dos delante blancas o amarillo selectivo y dos detrás rojas, visibles desde 300 metros como mínimo.',
              'Una luz blanca que ilumine la chapa trasera de identificación, visible de noche a 20 metros con el vehículo detenido.',
              'Dos luces de frenado rojas detrás, de intensidad considerablemente superior a las de posición traseras.',
              'Luces intermitentes indicadoras de dirección, de color amarillo, a la derecha e izquierda delante y detrás.',
              'Dos dispositivos reflectantes rojos detrás, visibles desde 150 metros como mínimo.',
              'Las luces de emergencia o avería se accionan obligatoriamente cuando el vehículo esté inmovilizado o circule muy despacio por emergencia o avería.',
            ],
          },
        ],
      },
      {
        titulo: 'Uso de las luces del anochecer al amanecer',
        articulo: 'Art. 186',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Dentro del perímetro urbano y en los túneles: luces de cruce o cortas, o las de posición, cuando la vía tenga iluminación suficiente.',
              'Luces largas en zona urbana: solo si el alumbrado de la vía está averiado o es deficiente, y sin deslumbrar.',
              'Con niebla densa, lluvia intensa, nubes de humo o polvo: luces de niebla o, en su defecto, las de cruce.',
              'En zona rural, sustituir las largas por las cortas aproximadamente a 150 metros del vehículo que viene en sentido contrario, aunque el otro conductor no cumpla.',
              'No usar las largas permanentemente cuando el vehículo que le precede está a menos de 50 metros.',
              'Reducir la velocidad, incluso hasta detenerse, en caso de deslumbramiento.',
              'Hacer señales alternativas con el cambio de luces al adelantar.',
              'Cambios de luces a intervalos regulares en curvas de visibilidad reducida y cerca de cambios de rasante.',
            ],
          },
        ],
      },
      {
        titulo: 'Dónde está prohibido adelantar',
        articulo: 'Art. 104 y 105',
        bloques: [
          { tipo: 'senales', ids: ['c-prohibido-adelantar', 'c-prohibido-adelantar-carga', 'e-fin-prohibido-adelantar'] },
          {
            tipo: 'lista',
            items: [
              'En una curva de visibilidad reducida.',
              'En un cambio de rasante que impida ver la continuación de la vía.',
              'En un paso a nivel.',
              'En los túneles.',
              'En los pasos para peatones señalizados con la marca tipo cebra.',
            ],
          },
          {
            tipo: 'texto',
            texto:
              'Lo establecido para las curvas y los cambios de rasante no se aplica en vías de dos o más carriles de circulación en un mismo sentido. Se prohíbe adelantar a más de un vehículo si no se tiene la total seguridad de poder desviarse a la derecha sin poner en peligro a alguno de los vehículos adelantados.',
          },
        ],
      },
      {
        titulo: 'Cómo se adelanta',
        articulo: 'Art. 85 y 86',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'El que adelanta:',
            items: [
              'Comprueba que puede efectuar la maniobra sin interferencia a los vehículos de delante, de detrás o que se acercan en sentido opuesto, y sin riesgo de accidente.',
              'Efectúa el paso por la senda izquierda.',
              'Terminada la maniobra, se incorpora de forma segura y gradual a su carril sin obligar al adelantado a modificar dirección o velocidad.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'El que va a ser adelantado:',
            items: [
              'No aumenta la velocidad ni efectúa maniobras que impidan o dificulten el adelantamiento.',
              'Disminuye la velocidad si, iniciada la maniobra, surge alguna situación de peligro.',
              'Le facilita espacio suficiente para reintegrarse al carril cuando termine el adelantamiento.',
            ],
          },
        ],
      },
      {
        titulo: 'Giros y media vuelta en «U»',
        articulo: 'Art. 89 al 91',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Giro a la derecha: desde el carril de la extrema derecha de la calzada por donde circula.',
              'Giro a la izquierda: desde el carril de la extrema izquierda de la calzada por donde circula.',
              'Si el giro está autorizado desde dos o más carriles, se mantiene la misma posición en los carriles de la vía a la que se incorpora.',
              'En todo giro —derecha, izquierda o en «U»— hay que ceder el paso a los peatones que empiezan a cruzar o están cruzando por el lugar autorizado.',
              'Si existe ciclocarril o ciclovía, el giro no puede interferir la circulación de los ciclos.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'No se autoriza el giro en «U»:',
            items: [
              'A menos de 150 metros antes de la entrada o después de la salida de una curva de visibilidad reducida o un cambio de rasante.',
              'En pasos a nivel, puentes, pasos superiores o inferiores e intercambios.',
              'Donde para efectuar la maniobra se vea obligado a retroceder.',
            ],
          },
        ],
      },
      {
        titulo: 'Motocicletas y ciclomotores',
        articulo: 'Art. 72',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'El conductor y los pasajeros deben usar casco protector correctamente abrochado.',
              'Se transporta al conductor en su asiento, a un pasajero detrás si el vehículo está habilitado, y a otro en el sidecar si lo tuviera.',
              'Un niño menor de 7 años solo puede ir en un sidecar y acompañado de otra persona de 14 o más años.',
              'Los bultos o cargas van en dispositivos adecuados y no pueden sobresalir más de 50 cm de las dimensiones del vehículo.',
              'El conductor y los pasajeros no pueden realizar acrobacias.',
            ],
          },
        ],
      },
    ],
  },
  {
    numero: 10,
    titulo: 'Estado técnico del vehículo y distracciones al conducir',
    resumen:
      'Las deficiencias técnicas que prohíben circular, los documentos y la revisión técnica, y todo lo que la ley prohíbe hacer mientras se conduce.',
    secciones: [
      {
        titulo: 'Deficiencias técnicas que prohíben circular',
        articulo: 'Art. 182',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Sistema de freno',
            items: [
              'El freno de servicio no acciona uniformemente en todas las ruedas.',
              'Existe salidero en el sistema de aire o de líquido en el sistema hidráulico.',
              'No trabaja el manómetro del sistema de aire.',
              'El compresor no produce la presión necesaria para el sistema de aire.',
              'Los remolques de más de 1 500 kg no tienen sistema de freno automático o no funciona.',
              'Los remolques de hasta 1 500 kg no disponen de freno, cadena o cable que los frene y sujete si quedan libres.',
              'El freno de mano no sostiene el vehículo, con carga o sin ella, en una pendiente al 16 % de inclinación.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Distancia máxima de frenado a 30 km/h',
            encabezados: ['Clase de vehículo', 'Distancia máxima'],
            filas: [
              ['Vehículos que no exceden de 3 500 kg', '7,2 m'],
              ['De 3 500 a 8 000 kg y ómnibus de hasta 7,5 m de largo', '9,5 m sin carga / 11,5 m con carga'],
              ['Más de 8 000 kg y ómnibus de hasta 7,5 m de largo', '11,0 m sin carga / 13,5 m con carga'],
              ['Motocicletas', '7,5 m'],
              ['Motocicletas con sidecar', '8,2 m'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Dirección, neumáticos, motor y transmisión',
            items: [
              'La holgura o juego del timón sobrepasa las normas de fabricación o supera los 25 grados de juego libre.',
              'El sistema de dirección está desajustado, con tuercas flojas o sin pasadores.',
              'Existe rigidez en el timón o desperfectos en el sistema hidráulico de la dirección.',
              'Roturas en las cuerdas de los neumáticos o desperfectos en las llantas.',
              'Los neumáticos presentan el desgaste máximo normado o su medida no corresponde con el peso del vehículo.',
              'Las ruedas delanteras no presentan los ajustes normados por los fabricantes.',
              'Salideros de combustible en el sistema de alimentación.',
              'Se desconectan las velocidades de la caja o vibra la transmisión.',
              'Las emisiones del escape superan lo establecido, o falta el tubo de escape o el silenciador, o están en mal estado.',
            ],
          },
        ],
      },
      {
        titulo: 'Espejos, parabrisas y chapas',
        articulo: 'Art. 193 al 198',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'Todo vehículo de motor debe tener uno o varios espejos retrovisores; el número y disposición dependen del tipo de vehículo, y deben permitir ver a una distancia mínima de 50 metros en vía recta y llana.',
              'Todo automóvil, excepto las motocicletas, debe tener parabrisas en buenas condiciones y limpio.',
              'Debe tener al menos un limpiaparabrisas eficaz, de funcionamiento automático, frente al conductor.',
              'No se pueden fijar en parabrisas o cristales distintivos, calcomanías, letreros o anuncios que limiten la visibilidad. En el parabrisas delantero solo puede cubrirse el tercio superior contra los rayos solares.',
              'Todo automóvil en circulación debe llevar únicamente dos chapas de identificación expedidas por el Registro de Vehículos: una delante y otra detrás, en posición horizontal y legibles a 40 metros como mínimo.',
              'Las motocicletas, remolques y semirremolques llevan una sola chapa, en la parte posterior.',
            ],
          },
        ],
      },
      {
        titulo: 'Inspección, revisión técnica y Registro',
        articulo: 'Art. 205 al 217',
        bloques: [
          {
            tipo: 'lista',
            items: [
              'La inspección técnica la ejecuta el Ministerio del Interior, según la periodicidad y forma que determine.',
              'La revisión técnica está a cargo del Ministerio del Transporte, en plantas de revisión con equipamiento especializado.',
              'Si el vehículo no reúne los requisitos, el MININT puede ocupar la licencia de circulación y las chapas, y concede hasta dos años para corregir las deficiencias.',
              'No pueden circular los vehículos sin el certificado de revisión técnica actualizado.',
              'Hay 30 días para comunicar al Registro: traspasos, cambios de motor y combustible, de carrocería y colores, pérdidas o deterioros de chapas y licencias, conversiones, bajas, altas, cambios de provincia y cambios de marca y modelo.',
            ],
          },
        ],
      },
      {
        titulo: 'Prohibiciones al conducir',
        articulo: 'Art. 102',
        bloques: [
          {
            tipo: 'clave',
            titulo: 'La distancia de seguridad',
            texto:
              '5 metros de distancia por cada 15 kilómetros por hora de velocidad entre vehículos que circulen uno detrás de otro. A 60 km/h son 20 metros.',
          },
          {
            tipo: 'lista',
            titulo: 'Se prohíbe al conductor:',
            items: [
              'Mantener otra posición que no sea la de frente ante el volante.',
              'Llevar personas encimadas que le impidan la adecuada seguridad o visibilidad.',
              'Conducir con una sola mano, excepto para hacer las señales de giro, dar marcha atrás, reducir velocidad o detenerse, cambiar velocidades y aplicar el freno de seguridad.',
              'Entablar conversación con otra persona mientras el vehículo está en marcha, en el transporte público de pasajeros.',
              'Abrir la portezuela, dejarla abierta o bajarse sin cerciorarse de que no constituye un peligro.',
              'Conducir con menores de 12 años en el asiento delantero.',
              'Transportar menores de 2 años sin acompañamiento de personas mayores o sin aditamentos especiales.',
              'Utilizar teléfonos u otros medios de comunicación mientras el vehículo está en marcha, salvo con aditamentos que permitan usarlos sin las manos.',
              'Usar equipos de audio a un volumen que moleste o impida la debida concentración.',
              'Conducir distraído o realizar cualquier acto o maniobra que le impida atender la conducción.',
            ],
          },
          {
            tipo: 'clave',
            titulo: 'Fumar',
            texto:
              'Se prohíbe fumar cuando se conduce un vehículo de transporte público o colectivo de pasajeros, o uno que transporte materiales inflamables o explosivos. La prohibición alcanza también a ayudantes y pasajeros de esos vehículos (Art. 124).',
          },
        ],
      },
      {
        titulo: 'Ciclos, patines y artefactos similares',
        articulo: 'Art. 112 y 117',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Se prohíbe la circulación de los ciclos:',
            items: [
              'A menores de 12 años fuera de zonas de recreación, repartos residenciales o vías de poco tránsito; y por las aceras o paseos destinados a los peatones.',
              'A más de un metro del contén de la acera o borde derecho de la calzada.',
              'Soltando el timón, las manillas o los pedales, o haciendo acrobacias.',
              'En marcha paralela a otro ciclo, excepto en el adelantamiento.',
              'Llevando personas, salvo en dispositivos adecuados instalados expresamente en el ciclo.',
              'Remolcado de otro vehículo, o sin timbre, fotuto o corneta.',
              'Sin un sistema de frenos que funcione correctamente.',
              'Del anochecer al amanecer sin la debida iluminación que lo haga visible.',
            ],
          },
          {
            tipo: 'texto',
            texto:
              'Se prohíbe la circulación por la vía utilizando patines, carriolas o artefactos similares, excepto cuando se realice en vía cerrada a tal efecto o en zona de recreación (Art. 117).',
          },
        ],
      },
    ],
  },
]

export const TEMA_POR_NUMERO: Record<number, Tema> = Object.fromEntries(
  TEMAS.map((t) => [t.numero, t]),
)

/** Títulos cortos para las listas y el examen. */
export const TITULOS_TEMAS: Record<number, string> = {
  1: 'Señales del agente y marcas del pavimento',
  2: 'Semáforos y velocidades',
  3: 'Transportación de personal y prohibiciones',
  4: 'Dónde parar y ceder el paso',
  5: 'Estacionamiento y parqueo',
  6: 'Señales verticales (temas 6 y 7)',
  8: 'Sanciones, multas y licencia',
  9: 'Luces, adelantamiento y giros',
  10: 'Estado técnico y distracciones',
}
