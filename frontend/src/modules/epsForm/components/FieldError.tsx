interface FieldErrorProps {
  message?: string
}

// Renderiza el mensaje de validación de un campo si existe error activo.
export function FieldError({ message }: FieldErrorProps) {
  // Si no hay error activo, no ocupa espacio visual en el layout.
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}
