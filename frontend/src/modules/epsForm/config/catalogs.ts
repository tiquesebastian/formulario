// Catálogos maestros de opciones para selects del formulario EPS.
export interface CatalogOption {
  value: string
  label: string
}

export const documentTypeCatalog: CatalogOption[] = [
  { value: 'CN', label: 'CN - Certificado Nacido Vivo' },
  { value: 'MS', label: 'MS - Menor sin documento de identificación' },
  { value: 'RC', label: 'RC - Registro Civil' },
  { value: 'TI', label: 'TI - Tarjeta de Identidad' },
  { value: 'CC', label: 'CC - Cédula de Ciudadanía' },
  { value: 'CE', label: 'CE - Cédula de Extranjería' },
  { value: 'SC', label: 'SC - Salvo Conducto' },
  { value: 'PA', label: 'PA - Pasaporte' },
  { value: 'CD', label: 'CD - Carné Diplomático' },
  { value: 'PE', label: 'PE - Permiso Especial Permanencia' },
  { value: 'AS', label: 'AS - Adulto sin documento de identificación' },
  { value: 'PT', label: 'PT - Permiso Protección Temporal' },
]

export const departmentCatalog: CatalogOption[] = [
  { value: 'Amazonas', label: 'Amazonas' },
  { value: 'Antioquia', label: 'Antioquia' },
  { value: 'Arauca', label: 'Arauca' },
  { value: 'Atlántico', label: 'Atlántico' },
  { value: 'Bolívar', label: 'Bolívar' },
  { value: 'Boyacá', label: 'Boyacá' },
  { value: 'Caldas', label: 'Caldas' },
  { value: 'Caquetá', label: 'Caquetá' },
  { value: 'Casanare', label: 'Casanare' },
  { value: 'Cauca', label: 'Cauca' },
  { value: 'Cesar', label: 'Cesar' },
  { value: 'Chocó', label: 'Chocó' },
  { value: 'Córdoba', label: 'Córdoba' },
  { value: 'Cundinamarca', label: 'Cundinamarca' },
  { value: 'Guainía', label: 'Guainía' },
  { value: 'Guaviare', label: 'Guaviare' },
  { value: 'Huila', label: 'Huila' },
  { value: 'La Guajira', label: 'La Guajira' },
  { value: 'Magdalena', label: 'Magdalena' },
  { value: 'Meta', label: 'Meta' },
  { value: 'Nariño', label: 'Nariño' },
  { value: 'Norte de Santander', label: 'Norte de Santander' },
  { value: 'Putumayo', label: 'Putumayo' },
  { value: 'Quindío', label: 'Quindío' },
  { value: 'Risaralda', label: 'Risaralda' },
  {
    value: 'San Andrés, Providencia y Santa Catalina',
    label: 'San Andrés, Providencia y Santa Catalina',
  },
  { value: 'Santander', label: 'Santander' },
  { value: 'Sucre', label: 'Sucre' },
  { value: 'Tolima', label: 'Tolima' },
  { value: 'Valle del Cauca', label: 'Valle del Cauca' },
  { value: 'Vaupés', label: 'Vaupés' },
  { value: 'Vichada', label: 'Vichada' },
]

export const municipalityCatalogByDepartment: Record<string, CatalogOption[]> = {
  Antioquia: [
    { value: 'Medellín', label: 'Medellín' },
    { value: 'Bello', label: 'Bello' },
    { value: 'Envigado', label: 'Envigado' },
    { value: 'Itagüí', label: 'Itagüí' },
  ],
  'Valle del Cauca': [
    { value: 'Cali', label: 'Cali' },
    { value: 'Palmira', label: 'Palmira' },
    { value: 'Buenaventura', label: 'Buenaventura' },
  ],
  Atlántico: [
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Soledad', label: 'Soledad' },
  ],
  Magdalena: [{ value: 'Santa Marta', label: 'Santa Marta' }],
  Bolívar: [{ value: 'Cartagena', label: 'Cartagena' }],
  Santander: [
    { value: 'Bucaramanga', label: 'Bucaramanga' },
    { value: 'Floridablanca', label: 'Floridablanca' },
    { value: 'Girón', label: 'Girón' },
  ],
  Risaralda: [
    { value: 'Pereira', label: 'Pereira' },
    { value: 'Dosquebradas', label: 'Dosquebradas' },
  ],
  Caldas: [{ value: 'Manizales', label: 'Manizales' }],
  Quindío: [{ value: 'Armenia', label: 'Armenia' }],
  Boyacá: [
    { value: 'Tunja', label: 'Tunja' },
    { value: 'Sogamoso', label: 'Sogamoso' },
  ],
  Meta: [{ value: 'Villavicencio', label: 'Villavicencio' }],
  Huila: [{ value: 'Neiva', label: 'Neiva' }],
  'Norte de Santander': [{ value: 'Cúcuta', label: 'Cúcuta' }],
  Nariño: [{ value: 'Pasto', label: 'Pasto' }],
  Sucre: [{ value: 'Sincelejo', label: 'Sincelejo' }],
  Córdoba: [{ value: 'Montería', label: 'Montería' }],
  Cesar: [{ value: 'Valledupar', label: 'Valledupar' }],
  Chocó: [{ value: 'Quibdó', label: 'Quibdó' }],
  'La Guajira': [{ value: 'Riohacha', label: 'Riohacha' }],
  Cundinamarca: [{ value: 'Bogotá', label: 'Bogotá' }],
}

export const sisbenClassCatalog = {
  levelPlaceholder: 'Nivel',
  groupPlaceholder: 'Grupo',
}

export const dateCatalog = {
  days: Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0')),
  months: Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0')),
  years: Array.from({ length: 90 }, (_, index) => String(new Date().getFullYear() - index)),
}

export const complementaryCatalog = {
  etnia: [
    { value: '01', label: '01. Indígena' },
    { value: '02', label: '02. Gitano(a) o Rrom' },
    {
      value: '03',
      label: '03. Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina',
    },
    { value: '04', label: '04. Palenquero(a) de San Basilio' },
    {
      value: '05',
      label: '05. Negro(a), Mulato(a), Afrocolombiano(a) o Afrodescendiente',
    },
    { value: '06', label: '06. Ninguno de los anteriores' },
  ] as CatalogOption[],
  grupoPoblacionEspecial: [
    { value: '1', label: '1 - Habitante de la Calle' },
    { value: '2', label: '2 - Población infantil abandonada a cargo de ICBF' },
    {
      value: '6',
      label: '6 - Menores desvinculados del conflicto armado bajo la protección del ICBF',
    },
    {
      value: '8',
      label:
        '8 - Población desmovilizada y/o miembros del grupo armado ilegal que celebren acuerdos de paz con el Gobierno Nacional',
    },
    { value: '9', label: '9 - Víctimas del conflicto armado interno' },
    {
      value: '10',
      label: '10 - Población infantil vulnerable bajo protección de instituciones diferentes al ICBF',
    },
    { value: '11', label: '11 - Programa en protección a testigos' },
    { value: '14', label: '14 - Población reclusa a cargo de la entidad territorial' },
    { value: '16', label: '16 - Adulto Mayor en centros de protección' },
    { value: '17', label: '17 - Comunidades indígenas' },
    { value: '18', label: '18 - Rrom (Gitano)' },
    { value: '22', label: '22 - Personas en prisión domiciliaria a cargo del INPEC' },
    { value: '23', label: '23 - Personas que dejen de ser madres comunitarias' },
    {
      value: '24',
      label:
        '24 - Migrantes colombianos repatriados que han retornado voluntariamente al país o han sido deportados o expulsados de territorio extranjero',
    },
    {
      value: '25',
      label:
        '25 - Adolescentes y jóvenes a cargo del ICBF en el sistema de responsabilidad penal para adolescentes',
    },
    {
      value: '26',
      label:
        '26 - Miembros de los grupos armados al margen de la ley que celebren acuerdos de paz con el Gobierno Nacional',
    },
    { value: '27', label: '27 - Recién nacidos y menores de edad de padres no afiliados' },
    {
      value: '28',
      label:
        '28 - Los voluntarios acreditados y activos de la Defensa Civil, Cruz Roja y Cuerpo de Bomberos y su núcleo familiar',
    },
    {
      value: '29',
      label:
        '29 - Personas con discapacidad de escasos recursos y en condición de abandono en centros de protección',
    },
    {
      value: '30',
      label: '30 - Migrante venezolano con PEP e hijos menores de edad con documento válido',
    },
    {
      value: '32',
      label:
        '32 - Personas que se encuentren detenidas sin condena o cumpliendo medida de aseguramiento en centros de detención transitoria',
    },
    { value: '33', label: '33 - Veteranos de la Fuerza Pública' },
  ] as CatalogOption[],
  categoriaDiscapacidad: [] as CatalogOption[],
  arl: [
    { value: '1', label: '1. Positiva' },
    { value: '2', label: '2. SURA' },
    { value: '3', label: '3. Colmena (Riesgos Profesionales Colmena S.A)' },
    { value: '4', label: '4. Bolívar (Compañía de Seguros Bolívar S.A)' },
    { value: '5', label: '5. Alfa (Seguros de Vida Alfa S.A)' },
    { value: '6', label: '6. Colpatria (Seguros de Vida Colpatria S.A)' },
    { value: '7', label: '7. La Equidad (La Equidad Seguros de Vida Organismo Cooperativo)' },
    { value: '9', label: '9. Mapfre Colombia Vida Seguros S.A' },
    { value: '10', label: '10. Aurora (Compañía de Seguros de Vida Aurora S.A)' },
  ] as CatalogOption[],
  administradoraPensiones: [
    { value: '01', label: '01. Colpensiones (Régimen de Prima Media – Estado)' },
    { value: '02', label: '02. Porvenir (Administradora de Fondos de Pensiones y Cesantías)' },
    { value: '03', label: '03. Protección (AFP)' },
    { value: '04', label: '04. Skandia (Old Mutual) (AFP)' },
    { value: '05', label: '05. Old Mutual (Skandia Vida Pensiones)' },
    { value: '06', label: '06. AXA Colpatria Pensiones y Cesantías' },
    { value: '07', label: '07. BBVA Horizonte Pensiones y Cesantías' },
    { value: '08', label: '08. Liberty Pensiones y Cesantías' },
    { value: '09', label: '09. No tiene / Está por definir' },
    { value: '10', label: '10. Otra (especificar)' },
  ] as CatalogOption[],
}
