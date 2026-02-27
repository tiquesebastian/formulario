import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { defaultValues, type AffiliationFormData, affiliationSchema } from './modules/epsForm/schema/affiliationSchema'
import {
  formatCurrencyWithPeso,
  formatThousandsWithDots,
  sanitizeLetters,
  sanitizeNumbers,
  shouldFormatAsCurrencyLike,
  shouldFormatAsIdentificationNumber,
  shouldSanitizeAsLetters,
  shouldSanitizeAsNumbers,
} from './modules/epsForm/utils/inputSanitizers'
import { FormHeader } from './modules/epsForm/sections/FormHeader'
import { TramiteSection } from './modules/epsForm/sections/TramiteSection'
import { IdentificacionSection } from './modules/epsForm/sections/IdentificacionSection'
import { ComplementariosSection } from './modules/epsForm/sections/ComplementariosSection'
import { ConyugeSection } from './modules/epsForm/sections/ConyugeSection'
import BeneficiariesSection from './modules/epsForm/sections/BeneficiariesSection'

// Estilo común para radios/checkbox con apariencia de casilla del formulario físico.
const checklistInputClassName = 'check-symbol focus:outline-none focus:ring-2 focus:ring-sky-300'
// URL base de backend configurable por entorno.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

interface CatalogDepartment {
  id: number
  code: string
  name: string
}

interface CatalogMunicipality {
  id: number
  departmentId: number
  code: string
  name: string
}

interface PdfRecordResponse {
  id: number
  pdfId: string
}

function App() {
  // Referencia para permitir deselección al hacer clic sobre el radio ya activo.
  const radioDeselectRef = useRef<{ name: string; value: string } | null>(null)
  // Estado del radicado actual (UUID) para alternar entre creación y actualización.
  const [currentFormId, setCurrentFormId] = useState<string>('')
  // Campo auxiliar para consultar y reabrir formularios guardados por ID.
  const [lookupFormId, setLookupFormId] = useState<string>('')
  // Indicador de carga durante la consulta de un formulario por ID.
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  // Catálogos dinámicos para selects dependientes de departamento y municipio.
  const [departments, setDepartments] = useState<CatalogDepartment[]>([])
  const [municipalities, setMunicipalities] = useState<CatalogMunicipality[]>([])
  const [isCatalogLoading, setIsCatalogLoading] = useState(false)
  const [isMunicipalitiesLoading, setIsMunicipalitiesLoading] = useState(false)
  const [catalogErrorMessage, setCatalogErrorMessage] = useState<string>('')
  const [pdfRecordState, setPdfRecordState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [pdfRecordMessage, setPdfRecordMessage] = useState<string>('')

  // Formulario principal: integra validación Zod + estado RHF para todas las secciones.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AffiliationFormData>({
    resolver: zodResolver(affiliationSchema),
    defaultValues,
    mode: 'onBlur',
  })

  // Fecha actual precargada en el encabezado (radicado) para evitar digitación manual inicial.
  const today = useMemo(() => {
    const now = new Date()
    return {
      day: String(now.getDate()).padStart(2, '0'),
      month: String(now.getMonth() + 1).padStart(2, '0'),
      year: String(now.getFullYear()),
    }
  }, [])

  // Observadores de anexos: permiten recalcular el total de forma reactiva.
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
  const selectedBirthDepartmentId = watch('nacimientoDepartamento')

  useEffect(() => {
    let isMounted = true

    const loadDepartments = async () => {
      try {
        setCatalogErrorMessage('')
        setIsCatalogLoading(true)
        const response = await fetch(`${apiBaseUrl}/api/departments`)
        if (!response.ok) {
          throw new Error('No fue posible cargar departamentos.')
        }

        const payload = (await response.json()) as CatalogDepartment[]
        if (!isMounted) return
        setDepartments(payload)
      } catch (error) {
        if (!isMounted) return
        setDepartments([])
        setMunicipalities([])
        const message =
          error instanceof Error ? error.message : 'Error inesperado al cargar departamentos.'
        setCatalogErrorMessage(message)
      } finally {
        if (isMounted) {
          setIsCatalogLoading(false)
        }
      }
    }

    loadDepartments()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadMunicipalities = async () => {
      if (!selectedBirthDepartmentId) {
        setMunicipalities([])
        if (getValues('nacimientoMunicipio')) {
          setValue('nacimientoMunicipio', '')
        }
        return
      }

      try {
        setCatalogErrorMessage('')
        setIsMunicipalitiesLoading(true)
        const response = await fetch(
          `${apiBaseUrl}/api/municipalities?departmentId=${encodeURIComponent(selectedBirthDepartmentId)}`,
        )

        if (!response.ok) {
          throw new Error('No fue posible cargar municipios.')
        }

        const payload = (await response.json()) as CatalogMunicipality[]
        if (!isMounted) return

        setMunicipalities(payload)

        const currentMunicipality = getValues('nacimientoMunicipio')
        const hasCurrentMunicipality = payload.some(
          (municipality) => String(municipality.id) === currentMunicipality,
        )

        if (currentMunicipality && !hasCurrentMunicipality) {
          setValue('nacimientoMunicipio', '')
        }
      } catch (error) {
        if (!isMounted) return
        setMunicipalities([])
        setValue('nacimientoMunicipio', '')
        const message = error instanceof Error ? error.message : 'Error inesperado al cargar municipios.'
        setCatalogErrorMessage(message)
      } finally {
        if (isMounted) {
          setIsMunicipalitiesLoading(false)
        }
      }
    }

    loadMunicipalities()

    return () => {
      isMounted = false
    }
  }, [selectedBirthDepartmentId, getValues, setValue])

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

  // Persistencia principal del formulario.
  // - POST cuando es un registro nuevo.
  // - PUT cuando ya existe un UUID cargado en pantalla.
  const onSubmit = async (data: AffiliationFormData) => {
    try {
      // Si existe ID se actualiza (PUT), si no existe se crea (POST).
      const requestMethod = currentFormId ? 'PUT' : 'POST'
      const requestUrl = currentFormId
        ? `${apiBaseUrl}/api/forms/${currentFormId}`
        : `${apiBaseUrl}/api/forms`

      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'draft',
          data,
        }),
      })

      const payload = (await response.json()) as {
        id?: string
        message?: string
        errors?: {
          fieldErrors?: Record<string, string[] | undefined>
        }
      }

      if (!response.ok) {
        const firstFieldError = Object.entries(payload.errors?.fieldErrors ?? {}).find(
          ([, fieldMessages]) => Array.isArray(fieldMessages) && fieldMessages.length > 0,
        )
        const detailedMessage = firstFieldError
          ? `${firstFieldError[0]}: ${firstFieldError[1]?.[0]}`
          : undefined
        const message = detailedMessage ?? payload.message ?? 'No fue posible guardar el formulario.'
        throw new Error(message)
      }

      const savedId = payload.id ?? currentFormId
      if (savedId) {
        setCurrentFormId(savedId)
        setLookupFormId(savedId)
      }

      const actionMessage = currentFormId ? 'actualizado' : 'guardado'
      const formIdMessage = savedId ? `\nID: ${savedId}` : ''
      window.alert(`Formulario ${actionMessage} correctamente.${formIdMessage}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado al guardar el formulario.'
      window.alert(`Error al guardar: ${message}`)
    }
  }

  // Reapertura por UUID: consulta backend y reemplaza estado del formulario en cliente.
  const onLoadFormById = async () => {
    // Reabre un formulario persistido en backend y rellena toda la UI con reset().
    const id = lookupFormId.trim()
    if (!id) {
      window.alert('Ingresa un ID para consultar.')
      return
    }

    try {
      setIsLoadingForm(true)
      const response = await fetch(`${apiBaseUrl}/api/forms/${id}`)
      const payload = (await response.json()) as {
        id?: string
        data?: Partial<AffiliationFormData>
        message?: string
      }

      if (!response.ok) {
        const message = payload.message ?? 'No fue posible consultar el formulario.'
        throw new Error(message)
      }

      // Se mezcla con defaults para garantizar claves esperadas aun cuando faltan campos en BD.
      const loadedData = payload.data ?? {}
      reset({ ...defaultValues, ...loadedData })
      setCurrentFormId(payload.id ?? id)
      setLookupFormId(payload.id ?? id)
      window.alert(`Formulario cargado correctamente.\nID: ${payload.id ?? id}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado al consultar el formulario.'
      window.alert(`Error al consultar: ${message}`)
    } finally {
      setIsLoadingForm(false)
    }
  }

  const onStartNewForm = () => {
    // Reinicia formulario y limpia contexto de radicado para iniciar un registro nuevo.
    reset(defaultValues)
    setCurrentFormId('')
    setLookupFormId('')
  }

  const onDownloadPdf = async () => {
    // Exportación PDF condicionada a validación para destacar obligatorios faltantes.
    setPdfRecordState('idle')
    setPdfRecordMessage('')

    const isValid = await trigger()
    if (!isValid) {
      window.alert('Completa los campos obligatorios marcados con * antes de descargar.')
      return
    }

    const payload = getValues()
    const departmentId = Number(payload.nacimientoDepartamento)
    const municipalityId = Number(payload.nacimientoMunicipio)

    if (!departmentId || !municipalityId) {
      setPdfRecordState('error')
      setPdfRecordMessage('Selecciona departamento y municipio válidos antes de descargar.')
      return
    }

    try {
      setPdfRecordState('loading')
      setPdfRecordMessage('Registrando trazabilidad del PDF...')

      const response = await fetch(`${apiBaseUrl}/api/pdf-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfId: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
          documentNumber: payload.numeroDocumento.replace(/\D+/g, ''),
          departmentId,
          municipalityId,
          createdAt: new Date().toISOString(),
        }),
      })

      const result = (await response.json()) as
        | PdfRecordResponse
        | { message?: string; code?: string }

      if (!response.ok) {
        const message =
          'message' in result && result.message
            ? result.message
            : 'No fue posible registrar el PDF en backend.'
        throw new Error(message)
      }

      const registered = result as PdfRecordResponse
      setPdfRecordState('success')
      setPdfRecordMessage(`Registro PDF exitoso (${registered.pdfId}).`)

      window.print()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de red al registrar PDF.'
      setPdfRecordState('error')
      setPdfRecordMessage(message)
    }
  }

  const handleSanitizeOnChangeCapture = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Sanitización transversal para mantener consistencia con el formulario físico.
    const target = event.target

    if (!(target instanceof HTMLInputElement)) return
    if (target.type === 'radio' || target.type === 'checkbox' || target.type === 'email') return

    const fieldName = target.name
    if (!fieldName) return

    if (shouldSanitizeAsNumbers(fieldName)) {
      const sanitizedNumeric = sanitizeNumbers(target.value)
      const nextValue = shouldFormatAsCurrencyLike(fieldName)
        ? formatCurrencyWithPeso(sanitizedNumeric)
        : shouldFormatAsIdentificationNumber(fieldName)
          ? formatThousandsWithDots(sanitizedNumeric)
        : sanitizedNumeric

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

  // Registra la intención de clic para permitir “toggle off” en radios tipo casilla.
  const handleRadioMouseDownCapture = (event: React.MouseEvent<HTMLFormElement>) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) return
    if (target.type !== 'radio') return
    if (!target.classList.contains('check-symbol')) return

    radioDeselectRef.current = target.checked
      ? { name: target.name, value: target.value }
      : null
  }

  // Si el usuario hace clic en el radio ya seleccionado, se desmarca para emular checkbox.
  const handleRadioClickCapture = (event: React.MouseEvent<HTMLFormElement>) => {
    const target = event.target
    if (!(target instanceof HTMLInputElement)) return
    if (target.type !== 'radio') return
    if (!target.classList.contains('check-symbol')) return

    const intent = radioDeselectRef.current
    if (!intent) return

    const isSameOption = intent.name === target.name && intent.value === target.value
    if (!isSameOption) return

    target.checked = false
    target.dispatchEvent(new Event('input', { bubbles: true }))
    target.dispatchEvent(new Event('change', { bubbles: true }))
    radioDeselectRef.current = null
  }

  return (
    // Contenedor principal: mantiene layout responsivo en pantalla y limpio en impresión.
    <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 lg:py-8">
      <section className="print-shell overflow-hidden rounded-lg border border-sky-300 bg-white shadow-sm">
        <form
          className="print-form space-y-4 p-3 sm:p-5"
          onSubmit={handleSubmit(onSubmit)}
          onMouseDownCapture={handleRadioMouseDownCapture}
          onClickCapture={handleRadioClickCapture}
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
            departments={departments}
            municipalities={municipalities}
            isCatalogLoading={isCatalogLoading}
            isMunicipalitiesLoading={isMunicipalitiesLoading}
          />
          <ComplementariosSection
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            checklistInputClassName={checklistInputClassName}
            departments={departments}
          />
          <div className="space-y-0">
            <ConyugeSection
              register={register}
              setValue={setValue}
              watch={watch}
              checklistInputClassName={checklistInputClassName}
              departments={departments}
            />
            <BeneficiariesSection
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              departments={departments}
            />
          </div>

          <div className="no-print rounded-md border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-semibold">ID radicado actual</p>
                <p className="text-sm font-bold text-sky-700">{currentFormId || 'Sin radicado aún'}</p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Reabrir por ID</span>
                  <input
                    type="text"
                    value={lookupFormId}
                    onChange={(event) => setLookupFormId(event.target.value)}
                    placeholder="Pega el ID"
                    className="h-9 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring sm:w-72"
                  />
                </label>
                <button
                  type="button"
                  onClick={onLoadFormById}
                  disabled={isLoadingForm}
                  className="h-9 rounded-md border border-sky-300 px-3 text-xs font-semibold text-sky-700 hover:bg-sky-100 disabled:opacity-60"
                >
                  {isLoadingForm ? 'Consultando...' : 'Consultar'}
                </button>
              </div>
            </div>
          </div>

          <div className="no-print flex flex-col gap-3 sm:flex-row sm:justify-end">
            <p className="sm:mr-auto sm:self-center text-[11px] text-sky-700">
              * Campos obligatorios para descargar.
            </p>
            <div className="sm:mr-auto sm:self-center text-[11px] text-sky-700">
              {isCatalogLoading || isMunicipalitiesLoading ? (
                <p>Cargando catálogos...</p>
              ) : null}
              {catalogErrorMessage ? <p>Error de red: {catalogErrorMessage}</p> : null}
              {pdfRecordState === 'loading' ? <p>{pdfRecordMessage}</p> : null}
              {pdfRecordState === 'success' ? <p>{pdfRecordMessage}</p> : null}
              {pdfRecordState === 'error' ? <p>Error: {pdfRecordMessage}</p> : null}
            </div>
            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={pdfRecordState === 'loading'}
              className="rounded-md border border-sky-300 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
            >
              {pdfRecordState === 'loading' ? 'Registrando...' : 'Descargar PDF'}
            </button>
            <button
              type="button"
              onClick={onStartNewForm}
              className="rounded-md border border-sky-300 px-4 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
            >
              Nuevo formulario
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
