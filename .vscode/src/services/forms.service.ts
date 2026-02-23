import { supabaseAdmin } from '../lib/supabase.js'
import { env } from '../config/env.js'
import type { FormRecord, FormRecordStatus } from '../types/form.js'

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
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert({ status: input.status, data: input.data })
    .select('*')
    .single()

  if (error) {
    throw new Error(`Error creando formulario: ${error.message}`)
  }

  return data as FormRecord
}

// Consulta un formulario por UUID.
export async function getFormById(id: string): Promise<FormRecord | null> {
  const { data, error } = await supabaseAdmin.from(TABLE).select('*').eq('id', id).maybeSingle()

  if (error) {
    throw new Error(`Error consultando formulario: ${error.message}`)
  }

  return (data as FormRecord | null) ?? null
}

// Actualiza estado y/o data del formulario sin reemplazar campos no enviados.
export async function updateFormById(id: string, input: UpdateFormInput): Promise<FormRecord | null> {
  const payload: UpdateFormInput = {}
  if (input.status !== undefined) payload.status = input.status
  if (input.data !== undefined) payload.data = input.data

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .maybeSingle()

  if (error) {
    throw new Error(`Error actualizando formulario: ${error.message}`)
  }

  return (data as FormRecord | null) ?? null
}
