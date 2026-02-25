// Tipos de dominio para representar formularios persistidos en base de datos.
// Estados persistidos para cada formulario en base de datos.
export type FormRecordStatus = 'draft' | 'submitted'

// Representa una fila de la tabla affiliation_forms en Supabase.
export interface FormRecord {
  id: string
  status: FormRecordStatus
  data: Record<string, unknown>
  created_at: string
  updated_at: string
}
