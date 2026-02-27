import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { z } from 'zod'

// Carga y valida variables de entorno requeridas por la API.

// Carga variables desde .env de la carpeta del backend, sin depender del cwd.
const envFilePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
// 1) Intenta cargar .env junto al backend.
dotenv.config({ path: envFilePath, override: false })
// 2) Refuerzo: también intenta .env del cwd (útil en shells como Git Bash).
dotenv.config({ override: false })

// Contrato de configuración requerido por el backend.
const envSchema = z.object({
  PORT: z.string().default('4000'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173'),
  SUPABASE_URL: z.string().url('SUPABASE_URL inválida').default('https://example.supabase.co'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY es requerida').default('dev-placeholder-key'),
  SUPABASE_FORMS_TABLE: z.string().default('affiliation_forms'),
  SQLSERVER_HOST: z.string().default('localhost'),
  SQLSERVER_PORT: z.string().default('1433'),
  SQLSERVER_USER: z.string().default('sa'),
  SQLSERVER_PASSWORD: z.string().default('changeme'),
  SQLSERVER_DATABASE: z.string().default('master'),
  SQLSERVER_ENCRYPT: z.string().default('true'),
  SQLSERVER_TRUST_SERVER_CERTIFICATE: z.string().default('true'),
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
  sqlServerPort: Number(parsed.data.SQLSERVER_PORT),
  sqlServerEncrypt: parsed.data.SQLSERVER_ENCRYPT === 'true',
  sqlServerTrustServerCertificate:
    parsed.data.SQLSERVER_TRUST_SERVER_CERTIFICATE === 'true',
}
