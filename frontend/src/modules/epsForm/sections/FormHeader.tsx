import type { UseFormRegister } from 'react-hook-form'
import type { AffiliationFormData } from '../schema/affiliationSchema'
import { dateCatalog } from '../config/catalogs'

// Encabezado oficial del formulario: logo, título y fecha de radicado.

interface FormHeaderProps {
  register: UseFormRegister<AffiliationFormData>
  today: {
    day: string
    month: string
    year: string
  }
}

export function FormHeader({ register, today }: FormHeaderProps) {
  return (
    <header className="rounded-md border border-sky-300">
      <div className="grid gap-3 border-b border-sky-300 bg-white px-3 py-3 sm:grid-cols-[220px_1fr_220px] sm:items-center">
        <div className="flex items-center">
          <img
            src="/eps-sanitas7287.logowik.com.jpg"
            alt="EPS Sanitas"
            className="h-16 w-auto max-w-full object-contain"
          />
        </div>

        <h1 className="text-center text-sm font-bold uppercase leading-tight text-sky-800 sm:text-lg">
          Formulario Único de Afiliación y
          <br />
          Registro de Novedades al SGSSS
        </h1>

        <div className="rounded-md border border-sky-300 bg-sky-50 p-2">
          <p className="text-center text-[11px] font-semibold text-sky-700">Fecha de Radicado</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <select
              defaultValue={today.day}
              className="h-7 w-10 rounded border border-sky-300 bg-white px-1 text-center text-xs text-sky-900"
              {...register('radicadoDia')}
            >
              {dateCatalog.days.map((day) => (
                <option key={`rd-${day}`} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              defaultValue={today.month}
              className="h-7 w-10 rounded border border-sky-300 bg-white px-1 text-center text-xs text-sky-900"
              {...register('radicadoMes')}
            >
              {dateCatalog.months.map((month) => (
                <option key={`rm-${month}`} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              defaultValue={today.year}
              className="h-7 w-14 rounded border border-sky-300 bg-white px-1 text-center text-xs text-sky-900"
              {...register('radicadoAnio')}
            >
              {dateCatalog.years.map((year) => (
                <option key={`ry-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <p className="bg-sky-100 px-3 py-1 text-[11px] font-medium italic text-sky-700">
        (Lea las instrucciones que se encuentran al respaldo antes de diligenciar este formulario)
      </p>
    </header>
  )
}
