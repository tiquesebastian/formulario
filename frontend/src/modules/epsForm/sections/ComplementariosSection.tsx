import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FieldError } from '../components/FieldError'
import type { AffiliationFormData } from '../schema/affiliationSchema'
import {
  complementaryCatalog,
  departmentCatalog,
} from '../config/catalogs'

// Sección III: información complementaria social, geográfica y de aseguramiento.

interface ComplementariosSectionProps {
  register: UseFormRegister<AffiliationFormData>
  errors: FieldErrors<AffiliationFormData>
  checklistInputClassName: string
}

export function ComplementariosSection({
  register,
  errors,
  checklistInputClassName,
}: ComplementariosSectionProps) {
  return (
    <section className="overflow-hidden rounded-md border border-sky-300">
      <h2 className="border-b border-sky-300 bg-sky-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
        III. Datos complementarios
      </h2>

      <div className="grid border-b border-sky-300 md:grid-cols-[1fr_1fr_1fr_1fr_1.2fr_1.2fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">16. Etnia</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('etnia')}
          >
            <option value="">Seleccione</option>
            {complementaryCatalog.etnia.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">17. Comunidad</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('comunidad')}
          />
        </label>

        <fieldset className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">18. Discapacidad *</legend>
          <div className="mt-1 flex gap-3 text-[10px]">
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="Si" className={checklistInputClassName} {...register('discapacidad')} /> Sí
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="No" className={checklistInputClassName} {...register('discapacidad')} /> No
            </label>
          </div>
        </fieldset>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Categoría de discapacidad</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('categoriaDiscapacidad')}
          />
        </label>

        <fieldset className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">19. Tiene encuesta SISBÉN *</legend>
          <div className="mt-1 flex gap-3 text-[10px]">
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="Si" className={checklistInputClassName} {...register('encuestaSisben')} /> Sí
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="No" className={checklistInputClassName} {...register('encuestaSisben')} /> No
            </label>
          </div>
        </fieldset>

        <div className="p-2 text-[11px] text-sky-900">
          <p className="font-semibold">20. Clasificación SISBÉN</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            <input
              placeholder="Nivel"
              className="h-8 rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
              {...register('clasificacionSisbenNivel')}
            />
            <input
              placeholder="Grupo"
              className="h-8 rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
              {...register('clasificacionSisbenGrupo')}
            />
          </div>
        </div>
      </div>

      <div className="grid border-b border-sky-300 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">21. Grupo de población especial</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('grupoPoblacionEspecial')}
          >
            <option value="">Seleccione</option>
            {complementaryCatalog.grupoPoblacionEspecial.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">22. Administradora de Riesgos Laborales - ARL</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('administradoraRiesgosLaborales')}
          >
            <option value="">Seleccione</option>
            {complementaryCatalog.arl.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">23. Administradora de Pensiones</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('administradoraPensiones')}
          >
            <option value="">Seleccione</option>
            {complementaryCatalog.administradoraPensiones.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">24. Ingreso base de cotización - IBC *</span>
          <input
            inputMode="numeric"
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('ingresoBaseCotizacion')}
          />
        </label>

        <label className="p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">25. Tarifa Contribución Solidaria *</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('tarifaContribucionSolidaria')}
          />
        </label>
      </div>

      <div className="grid border-b border-sky-300 md:grid-cols-[2fr_1fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">26. Residencia - Dirección</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('residenciaDireccion')}
          />
        </label>

        <label className="p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Teléfono fijo</span>
          <input
            inputMode="numeric"
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('telefonoFijo')}
          />
        </label>
      </div>

      <div className="grid border-b border-sky-300 md:grid-cols-[1fr_1fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Teléfono celular *</span>
          <input
            inputMode="numeric"
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('telefono')}
          />
          <FieldError message={errors.telefono?.message} />
        </label>

        <label className="p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Correo electrónico *</span>
          <input
            type="email"
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('correo')}
          />
          <FieldError message={errors.correo?.message} />
        </label>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr_1fr_1.2fr]">
        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Departamento</span>
          <select
            className="mt-1 h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('departamentoResidencia')}
          >
            <option value="">Seleccione</option>
            {departmentCatalog.map((department) => (
              <option key={department.value} value={department.value}>
                {department.label}
              </option>
            ))}
          </select>
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Municipio / Distrito</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('municipioDistrito')}
          />
        </label>

        <label className="border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">Localidad / Comuna</span>
          <input
            className="mt-1 h-8 w-full rounded border border-sky-300 px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('localidadComuna')}
          />
        </label>

        <fieldset className="p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">Zona *</legend>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="CabeceraMunicipal"
                className={checklistInputClassName}
                {...register('zonaResidencia')}
              />
              Cabecera Municipal
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="CentroPoblado"
                className={checklistInputClassName}
                {...register('zonaResidencia')}
              />
              Centro Poblado
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="RuralDisperso"
                className={checklistInputClassName}
                {...register('zonaResidencia')}
              />
              Rural Disperso
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="CentroPoblado"
                className={checklistInputClassName}
                {...register('zonaResidencia')}
              />
              Resto Rural
            </label>
          </div>
        </fieldset>
      </div>
    </section>
  )
}
