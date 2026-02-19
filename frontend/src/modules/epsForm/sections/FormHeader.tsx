import type { UseFormRegister } from 'react-hook-form'
import type { AffiliationFormData } from '../schema/affiliationSchema'

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
        <div className="flex items-center gap-2 text-sky-700">
          <div className="h-7 w-7 rounded-full bg-sky-600" />
          <div>
            <p className="text-3xl font-bold leading-none">EPS</p>
            <p className="text-2xl font-semibold leading-none">Sanitas</p>
          </div>
        </div>

        <h1 className="text-center text-sm font-bold uppercase leading-tight text-sky-800 sm:text-lg">
          Formulario Único de Afiliación y
          <br />
          Registro de Novedades al SGSSS
        </h1>

        <div className="rounded-md border border-sky-300 bg-sky-50 p-2">
          <p className="text-center text-[11px] font-semibold text-sky-700">Fecha de Radicado</p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <input
              maxLength={2}
              inputMode="numeric"
              defaultValue={today.day}
              className="h-7 w-10 rounded border border-sky-300 text-center text-xs text-sky-900"
              {...register('radicadoDia')}
            />
            <input
              maxLength={2}
              inputMode="numeric"
              defaultValue={today.month}
              className="h-7 w-10 rounded border border-sky-300 text-center text-xs text-sky-900"
              {...register('radicadoMes')}
            />
            <input
              maxLength={4}
              inputMode="numeric"
              defaultValue={today.year}
              className="h-7 w-14 rounded border border-sky-300 text-center text-xs text-sky-900"
              {...register('radicadoAnio')}
            />
          </div>
        </div>
      </div>
      <p className="bg-sky-100 px-3 py-1 text-[11px] font-medium italic text-sky-700">
        (Lea las instrucciones que se encuentran al respaldo antes de diligenciar este formulario)
      </p>
    </header>
  )
}
