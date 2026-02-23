import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { formRouter } from './routes/forms.routes.js'

// Punto de entrada HTTP del backend.
const app = express()

// CORS restringido al frontend configurado y parser JSON para payload del formulario.
app.use(cors({ origin: env.FRONTEND_ORIGIN }))
app.use(express.json({ limit: '8mb' }))

// Verificación rápida de disponibilidad del servicio.
app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'eps-form-backend' })
})

// Rutas de negocio para crear, consultar y actualizar formularios.
app.use('/api/forms', formRouter)

// Manejador global de errores no controlados.
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Error interno'
  res.status(500).json({ message })
})

// Inicio del servidor en el puerto definido por entorno.
app.listen(env.port, () => {
  console.log(`Backend escuchando en http://localhost:${env.port}`)
})
