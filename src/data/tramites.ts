/**
 * Trámites y contactos. Tomado de los carteles informativos de la escuela de
 * educación vial y de la Policía Nacional Revolucionaria (La Habana).
 */

export const REQUISITOS_PERMISO = {
  titulo: 'Documentos para obtener el permiso de aprendizaje (MININT)',
  fuente: 'Cartel de la escuela de educación vial y conducción',
  items: [
    'Resumen de la historia clínica de su médico de la familia.',
    'Chequeo oftalmológico del policlínico de su área de salud.',
    'Una foto de 1 × 1.',
    'Treinta pesos en sellos (en CUC para los extranjeros).',
    'Carné de Identidad.',
    'El certifico que avala la aprobación del curso de la escuela.',
  ],
}

export const PASOS_LICENCIA = [
  {
    titulo: 'Curso en la escuela de educación vial',
    texto:
      'Matricúlese y venza el curso teórico y práctico. Al terminar le entregan el certifico que avala la aprobación del curso.',
  },
  {
    titulo: 'Permiso de aprendizaje',
    texto:
      'Con los seis documentos de la lista anterior, tramite el permiso de aprendizaje en la unidad del MININT que le corresponde.',
  },
  {
    titulo: 'Aprendizaje en la vía',
    texto:
      'El aprendizaje queda restringido a las zonas y rutas debidamente señalizadas y a los requisitos que disponga el Ministerio del Interior (Art. 283). Circular fuera de esas regulaciones —o bajo los efectos del alcohol— es causal de cancelación (Art. 289.1 f).',
  },
  {
    titulo: 'Exámenes médico, teórico y práctico',
    texto:
      'El examen teórico se hace sobre el contenido de los temas 1 al 10 de la Ley 109. Practique con los cuestionarios de esta app hasta pasar de 90 % con holgura.',
  },
  {
    titulo: 'Conductor novel',
    texto:
      'Al obtener la licencia usted es conductor novel: solo puede acumular 24 puntos en un año natural (los titulares acumulan 36) y las sanciones por alcohol son más severas.',
  },
]

export type Contacto = { lugar: string; telefonos: string[] }
export type GrupoContactos = { titulo: string; contactos: Contacto[] }

export const CONTACTOS: GrupoContactos[] = [
  {
    titulo: 'Jefatura',
    contactos: [{ lugar: 'Vía Blanca y Agua Dulce', telefonos: ['76995185', '76900740'] }],
  },
  {
    titulo: 'Licencia de conducción',
    contactos: [
      { lugar: 'Parque Trillo — Centro Habana', telefonos: ['78793338', '78793345'] },
      { lugar: '1ra y 12 — Playa', telefonos: ['72030791', '72140184'] },
      { lugar: 'Ave. Luyanó y Luco — Diez de Octubre', telefonos: ['76990850', '76900690'] },
      { lugar: 'Vía Blanca y calle Dolores — Guanabacoa', telefonos: ['77944086', '76841145'] },
    ],
  },
  {
    titulo: 'Registro de vehículos',
    contactos: [
      { lugar: 'San Felipe y Villa Nueva — La Habana Vieja', telefonos: ['78665707', '78665781'] },
      { lugar: '1ra y 12 — Playa', telefonos: ['72093727', '72069114'] },
      { lugar: 'Ave. Diez de Octubre y calle Marino — Arroyo Naranjo', telefonos: ['76900704', '76997563'] },
      { lugar: 'Vía Blanca y calle Dolores — Guanabacoa', telefonos: ['77974781', '77937455'] },
    ],
  },
]

export const NOTA_CONTACTOS =
  'Datos tomados del cartel informativo de la Policía Nacional Revolucionaria para La Habana. Los teléfonos y direcciones pueden cambiar: confírmelos antes de ir.'

/** Guía rápida para el que empieza a andar en la calle. */
export const GUIA_CALLE = [
  {
    titulo: 'Quién manda en la vía',
    puntos: [
      'Primero el agente, después las señales provisionales, luego el semáforo, después las señales verticales y por último las marcas del pavimento.',
      'Si el agente le indica algo distinto a lo que dice el semáforo, obedezca al agente.',
    ],
  },
  {
    titulo: 'En una intersección sin señales',
    puntos: [
      'Cede el paso el que tiene al otro vehículo por su derecha.',
      'En una «T», cede el que viene por el acceso que no tiene continuidad.',
      'El de la vía de un solo sentido cede ante la vía de doble sentido.',
      'El de la vía no pavimentada cede ante la pavimentada.',
      'Al doblar a la izquierda, cede a los que vienen de frente.',
    ],
  },
  {
    titulo: 'Distancia y velocidad',
    puntos: [
      '5 metros por cada 15 km/h de velocidad con el vehículo de delante.',
      'Zona urbana: 50 km/h como máximo general; 40 km/h en zona escolar o de niños.',
      'Carretera: 90 km/h para ligeros; autopista: 100 km/h.',
      'Marcha atrás: máximo 20 metros y 20 km/h.',
    ],
  },
  {
    titulo: 'Con los peatones',
    puntos: [
      'Deténgase y ceda el paso ante quien está listo para cruzar o cruzando por la cebra.',
      'Al girar —a la derecha, a la izquierda o en «U»— ceda siempre al peatón que ya empezó a cruzar.',
      'El peatón discapacitado tiene derecho de paso preferencial una vez iniciado el cruce.',
      'Modere la marcha ante un ómnibus que se está deteniendo o está detenido.',
    ],
  },
  {
    titulo: 'Si tiene un accidente',
    puntos: [
      'Dé parte a la PNR si hay muertos o lesionados, o si participa un vehículo estatal o se afecta la propiedad estatal.',
      'No mueva el vehículo si hubo muerte o lesiones, salvo para llevar a alguien al médico.',
      'Advierta del hecho a los demás usuarios de la vía.',
      'Permanezca en el lugar hasta que llegue la policía.',
    ],
  },
  {
    titulo: 'Lo que no se hace al volante',
    puntos: [
      'Teléfono en la mano, equipos de audio a volumen alto o cualquier distracción.',
      'Menores de 12 años en el asiento delantero.',
      'Conducir con una sola mano fuera de las maniobras permitidas.',
      'Beber alcohol: 0,25 mg/l en aire espirado ya afecta legalmente su capacidad de conducción.',
    ],
  },
]
