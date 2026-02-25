import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FieldError } from '../components/FieldError'
import type { AffiliationFormData } from '../schema/affiliationSchema'
import {
  dateCatalog,
  departmentCatalog,
  documentTypeCatalog,
} from '../config/catalogs'

// Sección II: datos básicos de identificación del afiliado principal.

interface IdentificacionSectionProps {
  register: UseFormRegister<AffiliationFormData>
  errors: FieldErrors<AffiliationFormData>
  checklistInputClassName: string
}

export function IdentificacionSection({
  register,
  errors,
  checklistInputClassName,
}: IdentificacionSectionProps) {
  return (
    <section className="overflow-hidden rounded-md border border-sky-300">
      <h2 className="border-b border-sky-300 bg-sky-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
        II. Datos básicos de identificación
        <span className="ml-1 text-[10px] font-medium normal-case">
          (del cotizante, cabeza de familia o beneficiario cuando aplique o afiliado adicional)
        </span>
      </h2>

      <div className="grid border-b border-sky-300 md:grid-cols-4">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">8. Apellidos y nombres *</span>
          <span className="block text-[10px] text-sky-700">Primer Apellido</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('primerApellido')}
          />
          <FieldError message={errors.primerApellido?.message} />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[10px] text-sky-700">Segundo Apellido</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('segundoApellido')}
          />
          <FieldError message={errors.segundoApellido?.message} />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900 md:last:border-r-0">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[10px] text-sky-700">Primer Nombre</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('primerNombre')}
          />
          <FieldError message={errors.primerNombre?.message} />
        </label>

        <label className="p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">&nbsp;</span>
          <span className="block text-[10px] text-sky-700">Segundo Nombre</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('segundoNombre')}
          />
          <FieldError message={errors.segundoNombre?.message} />
        </label>
      </div>

      <div className="grid border-b border-sky-300 md:grid-cols-[1.2fr_1.5fr_1fr_2fr_1fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">9. Tipo de documento de identidad *</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('tipoDocumento')}
          >
            {documentTypeCatalog.map((documentType) => (
              <option key={documentType.value} value={documentType.value}>
                {documentType.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.tipoDocumento?.message} />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">10. Número del documento de identidad *</span>
          <input
            inputMode="numeric"
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('numeroDocumento')}
          />
          <FieldError message={errors.numeroDocumento?.message} />
        </label>

        <fieldset className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">11. Sexo biológico *</legend>
          <div className="mt-1 flex gap-3 text-[10px]">
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="F" className={checklistInputClassName} {...register('sexoBiologico')} />
              Femenino
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="M" className={checklistInputClassName} {...register('sexoBiologico')} />
              Masculino
            </label>
          </div>
        </fieldset>

        <fieldset className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">12. Sexo identificación *</legend>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[10px]">
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="F" className={checklistInputClassName} {...register('sexoIdentificacion')} /> F
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="M" className={checklistInputClassName} {...register('sexoIdentificacion')} /> M
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="T" className={checklistInputClassName} {...register('sexoIdentificacion')} /> T
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="NB" className={checklistInputClassName} {...register('sexoIdentificacion')} /> NB
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="Otro"
                className={checklistInputClassName}
                {...register('sexoIdentificacion')}
              />
              Otro
            </label>
          </div>
          <input
            placeholder="Cuál"
            className="mt-1 h-7 w-full rounded border border-sky-300 px-2 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('sexoIdentificacionCual')}
          />
        </fieldset>

        <label className="p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">13. Nacionalidad *</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('nacionalidad')}
          />
          <FieldError message={errors.nacionalidad?.message} />
        </label>
      </div>

      <div className="grid border-b border-sky-300 md:grid-cols-[1fr_1fr_1fr_1fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">14. Lugar de nacimiento - País *</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('nacimientoPais')}
          />
          <FieldError message={errors.nacimientoPais?.message} />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Departamento *</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('nacimientoDepartamento')}
          >
            <option value="">Seleccione</option>
            {departmentCatalog.map((department) => (
              <option key={department.value} value={department.value}>
                {department.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.nacimientoDepartamento?.message} />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Municipio *</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('nacimientoMunicipio')}
          />
          <FieldError message={errors.nacimientoMunicipio?.message} />
        </label>

        <fieldset className="p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">15. Fecha de nacimiento *</legend>
          <div className="mt-1 grid grid-cols-[1fr_1fr_1.4fr] gap-1">
            <select
              className="h-8 w-full rounded border border-sky-300 bg-white px-1 text-center text-xs outline-none ring-sky-400 focus:ring"
              {...register('fechaNacimientoDia')}
            >
              <option value="">DD</option>
              {dateCatalog.days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              className="h-8 w-full rounded border border-sky-300 bg-white px-1 text-center text-xs outline-none ring-sky-400 focus:ring"
              {...register('fechaNacimientoMes')}
            >
              <option value="">MM</option>
              {dateCatalog.months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              className="h-8 w-full rounded border border-sky-300 bg-white px-1 text-center text-xs outline-none ring-sky-400 focus:ring"
              {...register('fechaNacimientoAnio')}
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
