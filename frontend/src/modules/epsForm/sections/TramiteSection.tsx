import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FieldError } from '../components/FieldError'
import type { AffiliationFormData } from '../schema/affiliationSchema'

interface TramiteSectionProps {
  register: UseFormRegister<AffiliationFormData>
  errors: FieldErrors<AffiliationFormData>
  checklistInputClassName: string
}

export function TramiteSection({ register, errors, checklistInputClassName }: TramiteSectionProps) {
  return (
    <section className="overflow-hidden rounded-md border border-sky-300">
      <h2 className="border-b border-sky-300 bg-sky-600 px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
        I. Datos del Trámite
      </h2>

      <div className="grid gap-0 border-b border-sky-300 md:grid-cols-[1.2fr_2fr_1fr_1fr]">
        <fieldset className="space-y-1 border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">1. Tipo de Trámite</legend>
          <label className="mr-3 inline-flex items-center gap-1">
            <input
              type="radio"
              value="Afiliacion"
              className={checklistInputClassName}
              {...register('tipoTramite')}
            />{' '}
            A. Afiliación
          </label>
          <label className="inline-flex items-center gap-1">
            <input
              type="radio"
              value="ReporteNovedades"
              className={checklistInputClassName}
              {...register('tipoTramite')}
            />{' '}
            B. Reporte de Novedades
          </label>
        </fieldset>

        <fieldset className="space-y-1 border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">2. Tipo de Afiliación</legend>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="CotizanteCabezaFamilia"
                className={checklistInputClassName}
                {...register('tipoAfiliacion')}
              />
              Cotizante o Cabeza de Familia
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="BeneficiarioAdicional"
                className={checklistInputClassName}
                {...register('tipoAfiliacion')}
              />
              Beneficiario o Afiliado adicional
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="Colectiva"
                className={checklistInputClassName}
                {...register('tipoAfiliacion')}
              />{' '}
              B. Colectiva
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="DeOficio"
                className={checklistInputClassName}
                {...register('tipoAfiliacion')}
              />{' '}
              D. De Oficio
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-1 border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">3. Régimen</legend>
          <label className="mr-3 inline-flex items-center gap-1">
            <input type="radio" value="Contributivo" className={checklistInputClassName} {...register('regimen')} />{' '}
            A. Contributivo
          </label>
          <label className="inline-flex items-center gap-1">
            <input type="radio" value="Subsidiado" className={checklistInputClassName} {...register('regimen')} />{' '}
            B. Subsidiado
          </label>
        </fieldset>

        <fieldset className="space-y-1 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">4. Contribución solidaria</legend>
          <label className="mr-3 inline-flex items-center gap-1">
            <input type="radio" value="Si" className={checklistInputClassName} {...register('contribucionSolidaria')} />{' '}
            Sí
          </label>
          <label className="inline-flex items-center gap-1">
            <input type="radio" value="No" className={checklistInputClassName} {...register('contribucionSolidaria')} />{' '}
            No
          </label>
        </fieldset>
      </div>

      <div className="grid gap-0 md:grid-cols-[2fr_2fr_1fr]">
        <fieldset className="space-y-1 border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">5. Tipo de Afiliado</legend>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <label className="inline-flex items-center gap-1">
              <input type="radio" value="Cotizante" className={checklistInputClassName} {...register('tipoAfiliado')} />{' '}
              A. Cotizante
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="Beneficiario"
                className={checklistInputClassName}
                {...register('tipoAfiliado')}
              />{' '}
              C. Beneficiario
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="CabezaFamilia"
                className={checklistInputClassName}
                {...register('tipoAfiliado')}
              />{' '}
              B. Cabeza de Familia
            </label>
            <label className="inline-flex items-center gap-1">
              <input
                type="radio"
                value="AfiliadoAdicional"
                className={checklistInputClassName}
                {...register('tipoAfiliado')}
              />{' '}
              D. Afiliado adicional
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-1 border-r border-sky-300 p-2 text-[11px] text-sky-900">
          <legend className="font-semibold">6. Tipo de Cotizante</legend>
          <label className="mr-3 inline-flex items-center gap-1">
            <input
              type="radio"
              value="Dependiente"
              className={checklistInputClassName}
              {...register('tipoCotizante')}
            />{' '}
            A. Dependiente
          </label>
          <label className="mr-3 inline-flex items-center gap-1">
            <input
              type="radio"
              value="Independiente"
              className={checklistInputClassName}
              {...register('tipoCotizante')}
            />{' '}
            B. Independiente
          </label>
          <label className="inline-flex items-center gap-1">
            <input
              type="radio"
              value="Pensionado"
              className={checklistInputClassName}
              {...register('tipoCotizante')}
            />{' '}
            C. Pensionado
          </label>
        </fieldset>

        <label className="space-y-1 p-2 text-[11px] text-sky-900">
          <span className="block font-semibold">7. Código (a registrar por la EPS)</span>
          <input
            inputMode="numeric"
            className="h-8 w-full rounded border border-sky-300 bg-white px-2 text-xs outline-none ring-sky-400 focus:ring"
            {...register('codigoEps')}
          />
          <FieldError message={errors.codigoEps?.message} />
        </label>
      </div>
    </section>
  )
}
