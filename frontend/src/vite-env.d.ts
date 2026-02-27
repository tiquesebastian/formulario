/// <reference types="vite/client" />

// Variables de entorno permitidas en cliente (prefijo VITE_).
interface ImportMetaEnv {
  // URL base del backend consumida por el frontend en tiempo de build/runtime.
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
