import { z } from 'zod'

// Reglas de validación server-side del payload del formulario para Fase 3.

// Estados permitidos para el ciclo de vida del formulario.
export const formStatusSchema = z.enum(['draft', 'submitted'])

const onlyNumbersPattern = /^\d+$/
const onlyNumbersWithDotsPattern = /^[\d.]+$/
const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/
const emptyStringToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value
const digitsOnly = (value: string) => value.replace(/\D+/g, '')

function isValidDayMonthYear(day?: string, month?: string, year?: string): boolean {
  if (!day || !month || !year) return true

  const dayNumber = Number(day)
  const monthNumber = Number(month)
  const yearNumber = Number(year)

  if (monthNumber < 1 || monthNumber > 12) return false
  if (dayNumber < 1 || dayNumber > 31) return false
  if (yearNumber < 1900 || yearNumber > 2100) return false

  const date = new Date(yearNumber, monthNumber - 1, dayNumber)
  return (
    date.getFullYear() === yearNumber &&
    date.getMonth() === monthNumber - 1 &&
    date.getDate() === dayNumber
  )
}

const formDataSchema = z
  .object({
    radicadoDia: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{2}$/, 'radicadoDia inválido').optional()),
    radicadoMes: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{2}$/, 'radicadoMes inválido').optional()),
    radicadoAnio: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{4}$/, 'radicadoAnio inválido').optional()),
    codigoEps: z.preprocess(
      emptyStringToUndefined,
      z.string().min(3, 'codigoEps debe tener mínimo 3 dígitos').regex(onlyNumbersPattern, 'codigoEps solo acepta números').optional(),
    ),
    primerApellido: z.preprocess(
      emptyStringToUndefined,
      z.string().min(3, 'primerApellido inválido').regex(namePattern, 'primerApellido solo permite letras').optional(),
    ),
    segundoApellido: z.preprocess(
      emptyStringToUndefined,
      z.string().min(3, 'segundoApellido inválido').regex(namePattern, 'segundoApellido solo permite letras').optional(),
    ),
    primerNombre: z.preprocess(
      emptyStringToUndefined,
      z.string().min(3, 'primerNombre inválido').regex(namePattern, 'primerNombre solo permite letras').optional(),
    ),
    segundoNombre: z.preprocess(
      emptyStringToUndefined,
      z.string().min(3, 'segundoNombre inválido').regex(namePattern, 'segundoNombre solo permite letras').optional(),
    ),
    numeroDocumento: z.preprocess(
      emptyStringToUndefined,
      z.string().refine((value) => digitsOnly(value).length >= 6, 'numeroDocumento debe tener mínimo 6 dígitos').refine((value) => digitsOnly(value).length <= 20, 'numeroDocumento demasiado largo').regex(onlyNumbersWithDotsPattern, 'numeroDocumento solo acepta números').optional(),
    ),
    correo: z.preprocess(emptyStringToUndefined, z.string().email('correo inválido').optional()),
    telefono: z.preprocess(
      emptyStringToUndefined,
      z.string().min(10, 'telefono debe tener mínimo 10 dígitos').max(15, 'telefono demasiado largo').regex(onlyNumbersPattern, 'telefono solo acepta números').optional(),
    ),
    telefonoFijo: z.preprocess(
      emptyStringToUndefined,
      z.string().min(7, 'telefonoFijo debe tener mínimo 7 dígitos').max(15, 'telefonoFijo demasiado largo').regex(onlyNumbersPattern, 'telefonoFijo solo acepta números').optional(),
    ),
    fechaNacimientoDia: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{2}$/, 'fechaNacimientoDia inválido').optional()),
    fechaNacimientoMes: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{2}$/, 'fechaNacimientoMes inválido').optional()),
    fechaNacimientoAnio: z.preprocess(emptyStringToUndefined, z.string().regex(/^\d{4}$/, 'fechaNacimientoAnio inválido').optional()),
  })
  .passthrough()
  .superRefine((data, ctx) => {
    const payloadBytes = Buffer.byteLength(JSON.stringify(data), 'utf8')
    if (payloadBytes > 6_000_000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['data'],
        message: 'El formulario excede el tamaño máximo permitido (6MB).',
      })
    }

    if (!isValidDayMonthYear(data.radicadoDia, data.radicadoMes, data.radicadoAnio)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['radicadoDia'],
        message: 'La fecha de radicado no es válida.',
      })
    }

    if (
      !isValidDayMonthYear(
        data.fechaNacimientoDia,
        data.fechaNacimientoMes,
        data.fechaNacimientoAnio,
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fechaNacimientoDia'],
        message: 'La fecha de nacimiento no es válida.',
      })
    }
  })

// Contrato mínimo para creación.
export const createFormSchema = z.object({
  status: formStatusSchema.default('draft'),
  data: formDataSchema,
})

// Contrato parcial para actualización.
export const updateFormSchema = z.object({
  status: formStatusSchema.optional(),
  data: formDataSchema.optional(),
})
