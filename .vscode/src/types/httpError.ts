// Utilidades para propagar errores de negocio con estado HTTP y código semántico.
export interface HttpErrorOptions {
  status: number
  code: string
  message: string
  details?: unknown
}

// Error de aplicación tipado para mapear estados HTTP y códigos de negocio.
export class HttpError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown

  constructor(options: HttpErrorOptions) {
    super(options.message)
    this.name = 'HttpError'
    this.status = options.status
    this.code = options.code
    this.details = options.details
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError
}
