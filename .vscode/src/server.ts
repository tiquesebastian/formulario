import { env } from './config/env.js'
import { createApp } from './app.js'

// Servidor HTTP principal de la API de formularios (Express + middlewares globales).

// Punto de entrada HTTP del backend.
const app = createApp()

// Inicio del servidor en el puerto definido por entorno.
app.listen(env.port, () => {
  console.log(`Backend escuchando en http://localhost:${env.port}`)
})
