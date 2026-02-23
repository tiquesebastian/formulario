export interface CatalogOption {
  value: string
  label: string
}

export const departmentCatalog: CatalogOption[] = [
  { value: 'Amazonas', label: 'Amazonas' },
  { value: 'Antioquia', label: 'Antioquia' },
  { value: 'Atlántico', label: 'Atlántico' },
  { value: 'Bogotá D.C.', label: 'Bogotá D.C.' },
  { value: 'Cundinamarca', label: 'Cundinamarca' },
  { value: 'Valle del Cauca', label: 'Valle del Cauca' },
]

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
  etnia: [] as CatalogOption[],
  grupoPoblacionEspecial: [] as CatalogOption[],
  categoriaDiscapacidad: [] as CatalogOption[],
  arl: [] as CatalogOption[],
  administradoraPensiones: [] as CatalogOption[],
}
