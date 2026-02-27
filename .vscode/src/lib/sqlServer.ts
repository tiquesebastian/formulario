import sql from 'mssql'
import { env } from '../config/env.js'

// Pool singleton para reutilizar una sola conexión a SQL Server en todo el backend.
let poolPromise: Promise<sql.ConnectionPool> | null = null

function buildSqlServerConfig(): sql.config {
  return {
    server: env.SQLSERVER_HOST,
    port: env.sqlServerPort,
    user: env.SQLSERVER_USER,
    password: env.SQLSERVER_PASSWORD,
    database: env.SQLSERVER_DATABASE,
    options: {
      encrypt: env.sqlServerEncrypt,
      trustServerCertificate: env.sqlServerTrustServerCertificate,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30_000,
    },
  }
}

// Obtiene (o crea) el pool activo para ejecutar queries parametrizadas.
export async function getSqlServerPool(): Promise<sql.ConnectionPool> {
  if (!poolPromise) {
    const config = buildSqlServerConfig()
    poolPromise = new sql.ConnectionPool(config).connect()
  }

  return poolPromise
}

// Cierra pool manualmente (útil en tests o cierres controlados).
export async function closeSqlServerPool(): Promise<void> {
  if (!poolPromise) return
  const pool = await poolPromise
  await pool.close()
  poolPromise = null
}
