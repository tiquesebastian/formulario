import dotenv from 'dotenv'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sql from 'mssql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(backendRoot, '.env') })

dotenv.config()

const migrationsDir = path.join(backendRoot, 'src', 'sql', 'migrations')

function required(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

async function ensureMigrationsTable(pool) {
  await pool.request().query(`
    IF OBJECT_ID('dbo.schema_migrations', 'U') IS NULL
    BEGIN
      CREATE TABLE dbo.schema_migrations (
        id INT IDENTITY(1,1) PRIMARY KEY,
        version NVARCHAR(150) NOT NULL UNIQUE,
        executed_at DATETIME2(0) NOT NULL CONSTRAINT DF_schema_migrations_executed_at DEFAULT SYSDATETIME()
      );
    END;
  `)
}

async function getExecutedVersions(pool) {
  const result = await pool.request().query('SELECT version FROM dbo.schema_migrations')
  return new Set(result.recordset.map((row) => String(row.version)))
}

function splitSqlBatches(sqlText) {
  return sqlText
    .split(/^\s*GO\s*$/gim)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
}

async function run() {
  const config = {
    server: required('SQLSERVER_HOST'),
    port: Number(process.env.SQLSERVER_PORT ?? '1433'),
    user: required('SQLSERVER_USER'),
    password: required('SQLSERVER_PASSWORD'),
    database: required('SQLSERVER_DATABASE'),
    options: {
      encrypt: String(process.env.SQLSERVER_ENCRYPT ?? 'true') === 'true',
      trustServerCertificate:
        String(process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE ?? 'true') === 'true',
    },
  }

  const files = (await fs.readdir(migrationsDir))
    .filter((name) => name.endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b))

  if (files.length === 0) {
    console.log('No migrations found.')
    return
  }

  const pool = await sql.connect(config)

  try {
    await ensureMigrationsTable(pool)
    const executed = await getExecutedVersions(pool)

    for (const fileName of files) {
      if (executed.has(fileName)) {
        console.log(`Skipping already executed migration: ${fileName}`)
        continue
      }

      const fullPath = path.join(migrationsDir, fileName)
      const content = await fs.readFile(fullPath, 'utf8')
      const batches = splitSqlBatches(content)

      console.log(`Running migration: ${fileName}`)
      for (const batch of batches) {
        await pool.request().query(batch)
      }

      await pool
        .request()
        .input('version', sql.NVarChar(150), fileName)
        .query('INSERT INTO dbo.schema_migrations (version) VALUES (@version)')

      console.log(`Migration applied: ${fileName}`)
    }

    console.log('Migrations completed successfully.')
  } finally {
    await pool.close()
  }
}

run().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
