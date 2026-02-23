import { z } from 'zod'

// Estados permitidos para el ciclo de vida del formulario.
export const formStatusSchema = z.enum(['draft', 'submitted'])

// Contrato mínimo para creación.
export const createFormSchema = z.object({
  status: formStatusSchema.default('draft'),
  data: z.record(z.string(), z.unknown()),
})

// Contrato parcial para actualización.
export const updateFormSchema = z.object({
  status: formStatusSchema.optional(),
  data: z.record(z.string(), z.unknown()).optional(),
})
