import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { catalogRouter } from './routes/catalog.routes.js'
import { formRouter } from './routes/forms.routes.js'
import { pdfRecordsRouter } from './routes/pdfRecords.routes.js'
import { isHttpError } from './types/httpError.js'

export function createApp() {
  const app = express()

  app.use(cors({ origin: env.FRONTEND_ORIGIN }))
  app.use(express.json({ limit: '8mb' }))

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

  app.get('/', (_req, res) => {
    res.json({
      ok: true,
      service: 'eps-form-backend',
      message: 'API activa. Usa /health o /api/...',
    })
  })

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'eps-form-backend' })
  })

  app.use('/api/forms', formRouter)
  app.use('/api', catalogRouter)
  app.use('/api', pdfRecordsRouter)

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

  return app
}
