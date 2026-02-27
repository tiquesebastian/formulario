import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { catalogRouter } from './routes/catalog.routes.js'
import { formRouter } from './routes/forms.routes.js'
import { pdfRecordsRouter } from './routes/pdfRecords.routes.js'
import { isHttpError } from './types/httpError.js'

// Servidor HTTP principal de la API de formularios (Express + middlewares globales).

// Punto de entrada HTTP del backend.
const app = express()

// CORS restringido al frontend configurado y parser JSON para payload del formulario.
app.use(cors({ origin: env.FRONTEND_ORIGIN }))
app.use(express.json({ limit: '8mb' }))

// Log básico por request para trazabilidad operativa mínima.
app.use((req, res, next) => {
  const startedAt = Date.now()

  res.on('finish', () => {
    const elapsedMs = Date.now() - startedAt
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${elapsedMs}ms)`,
    )
  })

  next()
})

// Verificación rápida de disponibilidad del servicio.
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'eps-form-backend' })
})

// Rutas de negocio para crear, consultar y actualizar formularios.
app.use('/api/forms', formRouter)

// Rutas mínimas para catálogos y trazabilidad de PDFs (Fase 3).
app.use('/api', catalogRouter)
app.use('/api', pdfRecordsRouter)

// Manejador global de errores no controlados.
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    console.error('[INVALID_JSON_BODY]', error.message)
    return res.status(400).json({
      code: 'INVALID_JSON_BODY',
      message: 'El cuerpo JSON de la solicitud es inválido.',
    })
  }

  if (isHttpError(error)) {
    console.error('[HTTP_ERROR]', {
      status: error.status,
      code: error.code,
      message: error.message,
      details: error.details,
    })
    return res.status(error.status).json({
      code: error.code,
      message: error.message,
      details: error.details,
    })
  }

  if (error instanceof Error) {
    console.error('[UNHANDLED_ERROR]', error.message)
  } else {
    console.error('[UNHANDLED_ERROR]', error)
  }

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Error interno del servidor.',
  })
})

// Inicio del servidor en el puerto definido por entorno.
app.listen(env.port, () => {
  console.log(`Backend escuchando en http://localhost:${env.port}`)
})
