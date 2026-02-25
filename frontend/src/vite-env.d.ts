/// <reference types="vite/client" />

// Variables de entorno permitidas en cliente (prefijo VITE_).
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
