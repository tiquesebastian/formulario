import { useEffect, useState } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { AffiliationFormData } from '../schema/affiliationSchema'
import { dateCatalog, documentTypeCatalog } from '../config/catalogs'

// Sección IV (cónyuge): bloque de identificación del compañero(a) permanente.

interface ConyugeSectionProps {
  register: UseFormRegister<AffiliationFormData>
  setValue: UseFormSetValue<AffiliationFormData>
  watch: UseFormWatch<AffiliationFormData>
  checklistInputClassName: string
  departments: Array<{ id: number; code: string; name: string }>
}

interface CatalogMunicipality {
  id: number
  departmentId: number
  code: string
  name: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

function formatCatalogLabel(value: string): string {
  const titleCase = value
    .toLocaleLowerCase('es-CO')
    .split(' ')
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => chunk.charAt(0).toLocaleUpperCase('es-CO') + chunk.slice(1))
    .join(' ')

  return titleCase.replace(/D\.c\./g, 'D.C.')
}

export function ConyugeSection({
  register,
  setValue,
  watch,
  checklistInputClassName,
  departments,
}: ConyugeSectionProps) {
  const selectedBirthDepartmentId = watch('conyugeNacimientoDepartamento')
  const [birthMunicipalities, setBirthMunicipalities] = useState<CatalogMunicipality[]>([])
  const [isBirthMunicipalitiesLoading, setIsBirthMunicipalitiesLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadBirthMunicipalities = async () => {
      if (!selectedBirthDepartmentId) {
        setBirthMunicipalities([])
        setValue('conyugeNacimientoMunicipio', '')
        return
      }

      try {
        setIsBirthMunicipalitiesLoading(true)
        const response = await fetch(
          `${apiBaseUrl}/api/municipalities?departmentId=${encodeURIComponent(selectedBirthDepartmentId)}`,
        )

        if (!response.ok) {
          throw new Error('No fue posible cargar municipios del lugar de nacimiento.')
        }

        const payload = (await response.json()) as CatalogMunicipality[]
        if (!isMounted) return

        setBirthMunicipalities(payload)
        const currentMunicipality = watch('conyugeNacimientoMunicipio')
        const hasCurrent = payload.some((municipality) => String(municipality.id) === currentMunicipality)
        if (currentMunicipality && !hasCurrent) {
          setValue('conyugeNacimientoMunicipio', '')
        }
      } catch {
        if (!isMounted) return
        setBirthMunicipalities([])
        setValue('conyugeNacimientoMunicipio', '')
      } finally {
        if (isMounted) {
          setIsBirthMunicipalitiesLoading(false)
        }
      }
    }

    loadBirthMunicipalities()

    return () => {
      isMounted = false
    }
  }, [selectedBirthDepartmentId, setValue, watch])

  return (
    // print-section-iv identifica este bloque para correcciones de impresión por fila/celda.
    <section className="print-section-iv overflow-hidden border border-sky-300">
      <div className="bg-sky-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        IV. Datos de identificación de los miembros del núcleo familiar
      </div>
      <div className="border-b border-sky-300 bg-sky-50 px-3 py-1 text-[10px] text-sky-900">
        Datos básicos de identificación del cónyuge o compañero(a) permanente
      </div>

      {/* Bloque 27: apellidos y nombres del cónyuge en cuatro columnas. */}
      <div className="grid border-b border-sky-300 md:grid-cols-4">
        <label className="border-r border-sky-300 p-1 text-[10px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">27. Apellidos y nombres</span>
          <span className="block text-[9px] text-sky-700">Primer Apellido</span>
          <input
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugePrimerApellido')}
          />
        </label>

        <label className="border-r border-sky-300 p-1 text-[10px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[9px] text-sky-700">Segundo Apellido</span>
          <input
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeSegundoApellido')}
          />
        </label>

        <label className="border-r border-sky-300 p-1 text-[10px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[9px] text-sky-700">Primer Nombre</span>
          <input
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugePrimerNombre')}
          />
        </label>

        <label className="p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[9px] text-sky-700">Segundo Nombre</span>
          <input
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeSegundoNombre')}
          />
        </label>
      </div>

      {/* Bloques 28-32: documento, sexo y nacionalidad del cónyuge. */}
      <div className="grid border-b border-sky-300 md:grid-cols-[1fr_1fr_1fr_1.5fr_1fr]">
        <label className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">28. Tipo de documento de identidad *</span>
          <select
            className="mt-0.5 h-7 w-full rounded border border-sky-300 bg-white px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeTipoDocumento')}
          >
            {documentTypeCatalog.map((documentType) => (
              <option key={documentType.value} value={documentType.value}>
                {documentType.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">29. Número de documento de identidad</span>
          <input
            inputMode="numeric"
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeNumeroDocumento')}
          />
        </label>

        <fieldset className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <legend className="font-semibold">30. Sexo biológico *</legend>
          <div className="mt-1 flex gap-2 text-[9px]">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="F"
                className={checklistInputClassName}
                {...register('conyugeSexoBiologico')}
              />
              Femenino
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="M"
                className={checklistInputClassName}
                {...register('conyugeSexoBiologico')}
              />
              Masculino
            </label>
          </div>
        </fieldset>

        <fieldset className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <legend className="font-semibold">31. Sexo identificación *</legend>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[9px]">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="F"
                className={checklistInputClassName}
                {...register('conyugeSexoIdentificacion')}
              />
              F
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="M"
                className={checklistInputClassName}
                {...register('conyugeSexoIdentificacion')}
              />
              M
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="T"
                className={checklistInputClassName}
                {...register('conyugeSexoIdentificacion')}
              />
              T
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="NB"
                className={checklistInputClassName}
                {...register('conyugeSexoIdentificacion')}
              />
              NB
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="Otro"
                className={checklistInputClassName}
                {...register('conyugeSexoIdentificacion')}
              />
              Otro
            </label>
          </div>
          <input
            placeholder="Cuál"
            className="mt-0.5 h-6 w-full rounded border border-sky-300 px-1.5 text-[9px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeSexoIdentificacionCual')}
          />
        </fieldset>

        <label className="p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">32. Nacionalidad</span>
          <input
            className="mt-0.5 h-7 w-full rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeNacionalidad')}
          />
        </label>
      </div>

      {/* Bloques 33-34: lugar y fecha de nacimiento con formato DD/MM/AAAA. */}
      <div className="grid md:grid-cols-[2fr_1fr]">
        <div className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">33. Lugar de nacimiento (país, departamento y municipio)</span>
          <div className="mt-0.5 grid grid-cols-3 gap-1">
            <input
              placeholder="País"
              className="h-7 rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoPais')}
            />
            <select
              className="h-7 rounded border border-sky-300 bg-white px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoDepartamento')}
            >
              <option value="">Departamento</option>
              {departments.map((department) => (
                <option key={department.id} value={String(department.id)}>
                  {formatCatalogLabel(department.name)}
                </option>
              ))}
            </select>
            <select
              className="h-7 rounded border border-sky-300 bg-white px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              disabled={isBirthMunicipalitiesLoading || birthMunicipalities.length === 0}
              {...register('conyugeNacimientoMunicipio')}
            >
              <option value="">
                {isBirthMunicipalitiesLoading
                  ? 'Cargando...'
                  : birthMunicipalities.length > 0
                    ? 'Municipio'
                    : 'Seleccione departamento'}
              </option>
              {birthMunicipalities.map((municipality) => (
                <option key={municipality.id} value={String(municipality.id)}>
                  {formatCatalogLabel(municipality.name)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="p-1 text-[10px] text-sky-900">
          <legend className="font-semibold">34. Fecha de nacimiento</legend>
          {/* Fecha separada DD/MM/AAAA para conservar el formato visual del físico. */}
          <div className="mt-0.5 grid grid-cols-[1fr_1fr_1.3fr] gap-1">
            <select
              className="h-7 w-full rounded border border-sky-300 bg-white px-1 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoDia')}
            >
              <option value="">DD</option>
              {dateCatalog.days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              className="h-7 w-full rounded border border-sky-300 bg-white px-1 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoMes')}
            >
              <option value="">MM</option>
              {dateCatalog.months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="h-7 w-full rounded border border-sky-300 bg-white px-1 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoAnio')}
            >
              <option value="">AAAA</option>
              {dateCatalog.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </div>
    </section>
  )
}
