import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultValues, type AffiliationFormData, affiliationSchema } from './modules/epsForm/schema/affiliationSchema'
import {
  sanitizeLetters,
  sanitizeNumbers,
  shouldSanitizeAsLetters,
  shouldSanitizeAsNumbers,
} from './modules/epsForm/utils/inputSanitizers'
import { FormHeader } from './modules/epsForm/sections/FormHeader'
import { TramiteSection } from './modules/epsForm/sections/TramiteSection'
import { IdentificacionSection } from './modules/epsForm/sections/IdentificacionSection'
import { ComplementariosSection } from './modules/epsForm/sections/ComplementariosSection'
import { ConyugeSection } from './modules/epsForm/sections/ConyugeSection'
import BeneficiariesSection from './modules/epsForm/sections/BeneficiariesSection'

const checklistInputClassName = 'check-symbol focus:outline-none focus:ring-2 focus:ring-sky-300'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

function App() {
  // Formulario principal: integra validación Zod + estado RHF para todas las secciones.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const anexosDocCN = watch('anexosDocCN')
  const anexosDocRC = watch('anexosDocRC')
  const anexosDocTI = watch('anexosDocTI')
  const anexosDocCC = watch('anexosDocCC')
  const anexosDocCE = watch('anexosDocCE')
  const anexosDocPA = watch('anexosDocPA')
  const anexosDocCD = watch('anexosDocCD')
  const anexosDocSC = watch('anexosDocSC')
  const anexosDocPT = watch('anexosDocPT')
  const anexo83 = watch('anexo83')
  const anexo84 = watch('anexo84')
  const anexo85 = watch('anexo85')
  const anexo86 = watch('anexo86')
  const anexo87 = watch('anexo87')
  const anexo88 = watch('anexo88')
  const anexo89 = watch('anexo89')
  const anexo90 = watch('anexo90')
  const anexo91 = watch('anexo91')
  const anexosTotal = watch('anexosTotal')

  useEffect(() => {
    // Total de anexos = suma de cantidades numéricas + cantidad de casillas marcadas (83-91).
    const values = [
      anexosDocCN,
      anexosDocRC,
      anexosDocTI,
      anexosDocCC,
      anexosDocCE,
      anexosDocPA,
      anexosDocCD,
      anexosDocSC,
      anexosDocPT,
    ]

    const totalNumerico = values.reduce((sum, value) => {
      const parsed = Number(value || 0)
      return Number.isNaN(parsed) ? sum : sum + parsed
    }, 0)

    const totalChecks = [
      anexo83,
      anexo84,
      anexo85,
      anexo86,
      anexo87,
      anexo88,
      anexo89,
      anexo90,
      anexo91,
    ].filter(Boolean).length

    const total = totalNumerico + totalChecks

    const nextTotal = total > 0 ? String(total) : ''
    if (anexosTotal !== nextTotal) {
      setValue('anexosTotal', nextTotal)
    }
  }, [
    anexosDocCN,
    anexosDocRC,
    anexosDocTI,
    anexosDocCC,
    anexosDocCE,
    anexosDocPA,
    anexosDocCD,
    anexosDocSC,
    anexosDocPT,
    anexo83,
    anexo84,
    anexo85,
    anexo86,
    anexo87,
    anexo88,
    anexo89,
    anexo90,
    anexo91,
    anexosTotal,
    setValue,
  ])

  const onSubmit = async (data: AffiliationFormData) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'draft',
          data,
        }),
      })

      const payload = (await response.json()) as { id?: string; message?: string }

      if (!response.ok) {
        const message = payload.message ?? 'No fue posible guardar el formulario.'
        throw new Error(message)
      }

      const formIdMessage = payload.id ? `\nID: ${payload.id}` : ''
      window.alert(`Formulario guardado correctamente.${formIdMessage}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado al guardar el formulario.'
      window.alert(`Error al guardar: ${message}`)
    }
  }

  const onDownloadPdf = () => {
    // Exportación PDF mediante diálogo nativo de impresión del navegador.
    window.print()
  }

  const handleSanitizeOnChangeCapture = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Sanitización transversal para mantener consistencia con el formulario físico.
    const target = event.target

    if (!(target instanceof HTMLInputElement)) return
    if (target.type === 'radio' || target.type === 'checkbox' || target.type === 'email') return

    const fieldName = target.name
    if (!fieldName) return

    if (shouldSanitizeAsNumbers(fieldName)) {
      const nextValue = sanitizeNumbers(target.value)
      if (nextValue !== target.value) {
        target.value = nextValue
      }
      return
    }

    if (shouldSanitizeAsLetters(fieldName)) {
      const nextValue = sanitizeLetters(target.value)
      if (nextValue !== target.value) {
        target.value = nextValue
      }
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 lg:py-8">
      <section className="overflow-hidden rounded-lg border border-sky-300 bg-white shadow-sm">
        <form
          className="space-y-4 p-3 sm:p-5"
          onSubmit={handleSubmit(onSubmit)}
          onChangeCapture={handleSanitizeOnChangeCapture}
          noValidate
        >
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
          <div className="space-y-0">
            <ConyugeSection register={register} checklistInputClassName={checklistInputClassName} />
            <BeneficiariesSection register={register} setValue={setValue} watch={watch} errors={errors} />
          </div>

          <div className="no-print flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onDownloadPdf}
              className="rounded-md border border-sky-300 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
            >
              Descargar PDF
            </button>
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
              {isSubmitting ? 'Guardando...' : 'Guardar y continuar'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
