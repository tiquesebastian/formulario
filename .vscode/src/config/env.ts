import dotenv from 'dotenv'
import { z } from 'zod'

// Carga y valida variables de entorno requeridas por la API.

// Carga variables desde .env al iniciar el proceso, priorizando el archivo local.
dotenv.config({ override: true })

// Contrato de configuración requerido por el backend.
const envSchema = z.object({
  PORT: z.string().default('4000'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173'),
  SUPABASE_URL: z.string().url('SUPABASE_URL inválida'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY es requerida'),
  SUPABASE_FORMS_TABLE: z.string().default('affiliation_forms'),
})

// Validación temprana: si falta una variable crítica, se detiene el servicio.
const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Variables de entorno inválidas:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

// Objeto tipado para consumo interno del proyecto.
export const env = {
  ...parsed.data,
  port: Number(parsed.data.PORT),
}
