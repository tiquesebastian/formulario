import type { UseFormRegister } from 'react-hook-form'
import type { AffiliationFormData } from '../schema/affiliationSchema'
import { dateCatalog, departmentCatalog, documentTypeCatalog } from '../config/catalogs'

// Sección IV (cónyuge): bloque de identificación del compañero(a) permanente.

interface ConyugeSectionProps {
  register: UseFormRegister<AffiliationFormData>
  checklistInputClassName: string
}

export function ConyugeSection({ register, checklistInputClassName }: ConyugeSectionProps) {
  return (
    <section className="print-section-iv overflow-hidden border border-sky-300">
      <div className="bg-sky-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        IV. Datos de identificación de los miembros del núcleo familiar
      </div>
      <div className="border-b border-sky-300 bg-sky-50 px-3 py-1 text-[10px] text-sky-900">
        Datos básicos de identificación del cónyuge o compañero(a) permanente
      </div>

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

      <div className="grid md:grid-cols-[2fr_1fr]">
        <div className="border-r border-sky-300 p-1 text-[10px] text-sky-900">
          <span className="block font-semibold">33. Lugar de nacimiento</span>
          <div className="mt-0.5 grid grid-cols-3 gap-1">
            <input
              placeholder="País"
              className="h-7 rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoPais')}
            />
            <select
              // Departamento como catálogo fijo para mantener consistencia con el resto del formulario.
              className="h-7 rounded border border-sky-300 bg-white px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoDepartamento')}
            >
              <option value="">Departamento</option>
              {departmentCatalog.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.label}
                </option>
              ))}
            </select>
            <input
              placeholder="Municipio"
              className="h-7 rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoMunicipio')}
            />
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
