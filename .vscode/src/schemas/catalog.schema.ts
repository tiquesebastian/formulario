import { z } from 'zod'

// Validaciones de entrada para endpoints de catálogo.
export const municipalitiesQuerySchema = z.object({
  departmentId: z.coerce
    .number()
    .int('departmentId debe ser entero')
    .positive('departmentId debe ser mayor a 0'),
})
