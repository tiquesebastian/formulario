import { supabaseAdmin } from '../lib/supabase.js'
import { env } from '../config/env.js'
import type { FormRecord, FormRecordStatus } from '../types/form.js'
import { HttpError } from '../types/httpError.js'

// Capa de acceso a datos: encapsula operaciones CRUD contra Supabase.

interface CreateFormInput {
  status: FormRecordStatus
  data: Record<string, unknown>
}

interface UpdateFormInput {
  status?: FormRecordStatus
  data?: Record<string, unknown>
}

// Nombre de tabla configurable por entorno para facilitar despliegues.
const TABLE = env.SUPABASE_FORMS_TABLE

// Crea un formulario nuevo y retorna el registro persistido.
export async function createForm(input: CreateFormInput): Promise<FormRecord> {
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .insert({ status: input.status, data: input.data })
      .select('*')
      .single()

    // Error conocido del proveedor de BD: se mapea a 502 para diferenciar de errores internos.
    if (error) {
      throw new HttpError({
        status: 502,
        code: 'SUPABASE_CREATE_FAILED',
        message: 'No fue posible crear el formulario en base de datos.',
        details: { code: error.code, hint: error.hint },
      })
    }

    return data as FormRecord
  } catch (error) {
    // Error no tipado (red/timeouts/etc): se responde como indisponibilidad temporal de infraestructura.
    if (error instanceof HttpError) throw error
    throw new HttpError({
      status: 503,
      code: 'SUPABASE_UNAVAILABLE',
      message: 'Servicio de base de datos no disponible temporalmente.',
    })
  }
}

// Consulta un formulario por UUID.
export async function getFormById(id: string): Promise<FormRecord | null> {
  try {
    const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle()

    // Fallo controlado de consulta en Supabase.
    if (error) {
      throw new HttpError({
        status: 502,
        code: 'SUPABASE_READ_FAILED',
        message: 'No fue posible consultar el formulario en base de datos.',
        details: { code: error.code, hint: error.hint },
      })
    }

    return (data as FormRecord | null) ?? null
  } catch (error) {
    if (error instanceof HttpError) throw error
    throw new HttpError({
      status: 503,
      code: 'SUPABASE_UNAVAILABLE',
      message: 'Servicio de base de datos no disponible temporalmente.',
    })
  }
}

// Actualiza estado y/o data del formulario sin reemplazar campos no enviados.
export async function updateFormById(id: string, input: UpdateFormInput): Promise<FormRecord | null> {
  const payload: UpdateFormInput = {}
  // Solo se envían campos presentes para evitar sobreescrituras no intencionales.
  if (input.status !== undefined) payload.status = input.status
  if (input.data !== undefined) payload.data = input.data

  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select('*')
      .maybeSingle()

    // Fallo controlado de actualización en Supabase.
    if (error) {
      throw new HttpError({
        status: 502,
        code: 'SUPABASE_UPDATE_FAILED',
        message: 'No fue posible actualizar el formulario en base de datos.',
        details: { code: error.code, hint: error.hint },
      })
    }

    return (data as FormRecord | null) ?? null
  } catch (error) {
    if (error instanceof HttpError) throw error
    throw new HttpError({
      status: 503,
      code: 'SUPABASE_UNAVAILABLE',
      message: 'Servicio de base de datos no disponible temporalmente.',
    })
  }
}
