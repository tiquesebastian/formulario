import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/

const affiliationSchema = z.object({
  primerApellido: z
    .string()
    .min(2, 'Ingrese al menos 2 caracteres')
    .regex(namePattern, 'Solo se permiten letras y espacios'),
  segundoApellido: z
    .string()
    .min(2, 'Ingrese al menos 2 caracteres')
    .regex(namePattern, 'Solo se permiten letras y espacios'),
  primerNombre: z
    .string()
    .min(2, 'Ingrese al menos 2 caracteres')
    .regex(namePattern, 'Solo se permiten letras y espacios'),
  segundoNombre: z
    .string()
    .min(2, 'Ingrese al menos 2 caracteres')
    .regex(namePattern, 'Solo se permiten letras y espacios'),
  tipoDocumento: z.enum(['CC', 'TI', 'CE', 'PA']),
  numeroDocumento: z
    .string()
    .min(6, 'Debe tener mínimo 6 dígitos')
    .regex(/^\d+$/, 'Solo se permiten números'),
  sexoBiologico: z.enum(['F', 'M']),
  correo: z.string().email('Correo electrónico inválido'),
  telefono: z
    .string()
    .min(7, 'Debe tener mínimo 7 dígitos')
    .regex(/^\d+$/, 'Solo se permiten números'),
  regimen: z.enum(['Contributivo', 'Subsidiado']),
})

type AffiliationFormData = z.infer<typeof affiliationSchema>

const defaultValues: AffiliationFormData = {
  primerApellido: '',
  segundoApellido: '',
  primerNombre: '',
  segundoNombre: '',
  tipoDocumento: 'CC',
  numeroDocumento: '',
  sexoBiologico: 'F',
  correo: '',
  telefono: '',
  regimen: 'Contributivo',
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600">{message}</p>
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AffiliationFormData>({
    resolver: zodResolver(affiliationSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const today = useMemo(() => new Date().toLocaleDateString('es-CO'), [])

  const onSubmit = async (data: AffiliationFormData) => {
    console.log('Formulario válido:', data)
    await new Promise((resolve) => setTimeout(resolve, 600))
    window.alert('Formulario validado correctamente (demo).')
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
      <section className="overflow-hidden rounded-xl border border-sky-300 bg-white shadow-sm">
        <header className="border-b border-sky-300 bg-sky-100 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">EPS Sanitas</p>
              <h1 className="text-lg font-bold text-sky-900 sm:text-xl">
                Formulario Único de Afiliación y Registro de Novedades al SGSSS
              </h1>
            </div>
            <p className="text-sm text-sky-700">Fecha de radicado: {today}</p>
          </div>
        </header>

        <form className="space-y-6 p-4 sm:p-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="rounded-lg border border-sky-200">
            <h2 className="border-b border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800">
              I. Datos básicos de identificación
            </h2>

            <div className="grid gap-4 p-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm text-sky-900">
                Primer apellido
                <input
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('primerApellido')}
                />
                <FieldError message={errors.primerApellido?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Segundo apellido
                <input
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('segundoApellido')}
                />
                <FieldError message={errors.segundoApellido?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Primer nombre
                <input
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('primerNombre')}
                />
                <FieldError message={errors.primerNombre?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Segundo nombre
                <input
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('segundoNombre')}
                />
                <FieldError message={errors.segundoNombre?.message} />
              </label>
            </div>

            <div className="grid gap-4 border-t border-sky-200 p-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm text-sky-900">
                Tipo de documento
                <select
                  className="mt-1 w-full rounded-md border border-sky-300 bg-white px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('tipoDocumento')}
                >
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                </select>
                <FieldError message={errors.tipoDocumento?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Número de documento
                <input
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('numeroDocumento')}
                />
                <FieldError message={errors.numeroDocumento?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Sexo biológico
                <select
                  className="mt-1 w-full rounded-md border border-sky-300 bg-white px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('sexoBiologico')}
                >
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
                <FieldError message={errors.sexoBiologico?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Régimen
                <select
                  className="mt-1 w-full rounded-md border border-sky-300 bg-white px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('regimen')}
                >
                  <option value="Contributivo">Contributivo</option>
                  <option value="Subsidiado">Subsidiado</option>
                </select>
                <FieldError message={errors.regimen?.message} />
              </label>
            </div>

            <div className="grid gap-4 border-t border-sky-200 p-3 sm:grid-cols-2">
              <label className="text-sm text-sky-900">
                Correo electrónico
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('correo')}
                />
                <FieldError message={errors.correo?.message} />
              </label>

              <label className="text-sm text-sky-900">
                Teléfono celular
                <input
                  inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-sky-300 px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                  {...register('telefono')}
                />
                <FieldError message={errors.telefono?.message} />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => reset(defaultValues)}
              className="rounded-md border border-sky-300 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
            >
              Limpiar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-60"
            >
              {isSubmitting ? 'Validando...' : 'Guardar y continuar'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
