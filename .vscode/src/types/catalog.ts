// Tipos de salida para endpoints de catálogo.
export interface Department {
  id: number
  code: string
  name: string
}

export interface Municipality {
  id: number
  departmentId: number
  code: string
  name: string
}
