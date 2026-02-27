import { z } from 'zod'

// Valida formato de fecha aceptando valores parseables por Date.
function isValidDateLike(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime())
}

// Contrato de creación para trazabilidad mínima de PDF generado.
export const createPdfRecordSchema = z.object({
  pdfId: z.string().min(1, 'pdfId es obligatorio').max(80, 'pdfId demasiado largo'),
  documentNumber: z
    .string()
    .min(1, 'documentNumber es obligatorio')
    .max(30, 'documentNumber demasiado largo'),
  departmentId: z.coerce.number().int('departmentId debe ser entero').positive('departmentId inválido'),
  municipalityId: z.coerce.number().int('municipalityId debe ser entero').positive('municipalityId inválido'),
  createdAt: z
    .string()
    .min(1, 'createdAt es obligatorio')
    .refine(isValidDateLike, 'createdAt debe ser una fecha válida'),
  pdfUrl: z.string().max(500, 'pdfUrl demasiado largo').optional(),
})

// Parámetro de ruta para consultar trazabilidad por identificador de PDF.
export const pdfRecordByIdParamsSchema = z.object({
  pdfId: z.string().min(1, 'pdfId es obligatorio').max(80, 'pdfId demasiado largo'),
})

// Contrato de generación mínima: backend crea pdfId/createdAt y registra trazabilidad.
export const generatePdfSchema = z.object({
  documentNumber: z
    .string()
    .min(1, 'documentNumber es obligatorio')
    .max(30, 'documentNumber demasiado largo'),
  departmentId: z.coerce.number().int('departmentId debe ser entero').positive('departmentId inválido'),
  municipalityId: z.coerce
    .number()
    .int('municipalityId debe ser entero')
    .positive('municipalityId inválido'),
})

export type CreatePdfRecordInput = z.infer<typeof createPdfRecordSchema>
export type GeneratePdfInput = z.infer<typeof generatePdfSchema>
