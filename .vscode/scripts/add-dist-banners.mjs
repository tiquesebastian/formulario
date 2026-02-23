import { promises as fs } from 'node:fs'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')

const genericBanner = '// Archivo compilado automáticamente desde src.\n'

const fileBanners = new Map([
  ['server.js', '// Archivo compilado: servidor Express principal del backend.\n'],
  ['config/env.js', '// Archivo compilado: carga y validación de variables de entorno.\n'],
  ['lib/supabase.js', '// Archivo compilado: cliente administrativo de Supabase para operaciones de servidor.\n'],
  ['routes/forms.routes.js', '// Archivo compilado: rutas HTTP para crear, consultar y actualizar formularios.\n'],
  ['schemas/form.schema.js', '// Archivo compilado: esquemas Zod para validar payloads del API.\n'],
  ['services/forms.service.js', '// Archivo compilado: capa de acceso a datos en Supabase para formularios.\n'],
  ['types/form.js', '// Archivo compilado: este módulo no tiene runtime (solo tipos en TypeScript).\n'],
])

async function listJsFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return listJsFiles(fullPath)
      }
      if (entry.isFile() && entry.name.endsWith('.js')) {
        return [fullPath]
      }
      return []
    }),
  )

  return files.flat()
}

async function addBanner(filePath) {
  const relativePath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/')
  const banner = fileBanners.get(relativePath) ?? genericBanner
  const content = await fs.readFile(filePath, 'utf8')

  if (content.startsWith(banner)) {
    return false
  }

  await fs.writeFile(filePath, `${banner}${content}`, 'utf8')
  return true
}

async function run() {
  try {
    const files = await listJsFiles(DIST_DIR)
    const results = await Promise.all(files.map(addBanner))
    const updated = results.filter(Boolean).length
    console.log(`Banners aplicados en ${updated} archivo(s) de dist.`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    console.error(`No se pudieron aplicar banners en dist: ${message}`)
    process.exit(1)
  }
}

run()
