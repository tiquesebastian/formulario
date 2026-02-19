import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultValues, type AffiliationFormData, affiliationSchema } from './modules/epsForm/schema/affiliationSchema'
import { FormHeader } from './modules/epsForm/sections/FormHeader'
import { TramiteSection } from './modules/epsForm/sections/TramiteSection'
import { IdentificacionSection } from './modules/epsForm/sections/IdentificacionSection'
import { ComplementariosSection } from './modules/epsForm/sections/ComplementariosSection'
import { ConyugeSection } from './modules/epsForm/sections/ConyugeSection'
import BeneficiariesSection from './modules/epsForm/sections/BeneficiariesSection'

const checklistInputClassName = 'check-symbol focus:outline-none focus:ring-2 focus:ring-sky-300'

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

  const today = useMemo(() => {
    const now = new Date()
    return {
      day: String(now.getDate()).padStart(2, '0'),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      year: String(now.getFullYear()),
    }
  }, [])

  const onSubmit = async (data: AffiliationFormData) => {
    console.log('Formulario válido:', data)
    await new Promise((resolve) => setTimeout(resolve, 600))
    window.alert('Formulario validado correctamente (demo).')
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 lg:py-8">
      <section className="overflow-hidden rounded-lg border border-sky-300 bg-white shadow-sm">
        <form className="space-y-4 p-3 sm:p-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormHeader register={register} today={today} />
          <TramiteSection
            register={register}
            errors={errors}
            checklistInputClassName={checklistInputClassName}
          />
          <IdentificacionSection
            register={register}
            errors={errors}
            checklistInputClassName={checklistInputClassName}
          />
          <ComplementariosSection
            register={register}
            errors={errors}
            checklistInputClassName={checklistInputClassName}
          />
          <ConyugeSection register={register} checklistInputClassName={checklistInputClassName} />
          <BeneficiariesSection register={register} errors={errors} />

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => reset(defaultValues)}
              className="rounded-md border border-sky-300 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
            >
              Limpiar formulario
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
