import type { UseFormRegister } from 'react-hook-form'
import type { AffiliationFormData } from '../schema/affiliationSchema'

interface ConyugeSectionProps {
  register: UseFormRegister<AffiliationFormData>
  checklistInputClassName: string
}

export function ConyugeSection({ register, checklistInputClassName }: ConyugeSectionProps) {
  return (
    <section className="overflow-hidden border border-sky-300">
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
          <span className="block font-semibold">28. Tipo de documento de identidad</span>
          <select
            className="mt-0.5 h-7 w-full rounded border border-sky-300 bg-white px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
            {...register('conyugeTipoDocumento')}
          >
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            <option value="PA">PA</option>
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
          <legend className="font-semibold">30. Sexo biológico</legend>
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
          <legend className="font-semibold">31. Sexo identificación</legend>
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
            <input
              placeholder="Departamento"
              className="h-7 rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoDepartamento')}
            />
            <input
              placeholder="Municipio"
              className="h-7 rounded border border-sky-300 px-1.5 text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeNacimientoMunicipio')}
            />
          </div>
        </div>

        <fieldset className="p-1 text-[10px] text-sky-900">
          <legend className="font-semibold">34. Fecha de nacimiento</legend>
          <div className="mt-0.5 flex items-center gap-1">
            <input
              maxLength={2}
              inputMode="numeric"
              placeholder="DD"
              className="h-7 w-9 rounded border border-sky-300 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoDia')}
            />
            <input
              maxLength={2}
              inputMode="numeric"
              placeholder="MM"
              className="h-7 w-9 rounded border border-sky-300 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoMes')}
            />
            <input
              maxLength={4}
              inputMode="numeric"
              placeholder="AAAA"
              className="h-7 w-12 rounded border border-sky-300 text-center text-[10px] outline-none ring-sky-400 focus:ring"
              {...register('conyugeFechaNacimientoAnio')}
            />
          </div>
        </fieldset>
      </div>
    </section>
  )
}
