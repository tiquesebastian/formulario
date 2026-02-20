import type { UseFormRegister } from 'react-hook-form';
import { FieldError } from '../components/FieldError';
import type { AffiliationFormData } from '../schema/affiliationSchema';

interface BeneficiariesSectionProps {
  register: UseFormRegister<AffiliationFormData>;
  errors: Record<string, any>;
}

const beneficiaryLabels = [
  { b: 'B1' },
  { b: 'B2' },
  { b: 'B3' },
  { b: 'B4' },
  { b: 'B5' },
];

const checklistInputClassName = 'check-symbol focus:outline-none focus:ring-2 focus:ring-sky-300';
const departmentOptions = ['Amazonas', 'Antioquia', 'Atlántico', 'Bogotá D.C.', 'Cundinamarca', 'Valle del Cauca'];
const dayOptions = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const monthOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const yearOptions = Array.from({ length: 90 }, (_, i) => String(new Date().getFullYear() - i));

export default function BeneficiariesSection({ register, errors }: BeneficiariesSectionProps) {
  return (
    <section className="overflow-hidden border border-sky-300">
      <div className="bg-blue-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        Beneficiarios
      </div>
      <div className="border-b border-sky-300 bg-blue-50 px-3 py-1 text-[10px] text-sky-900">
        Datos básicos de identificación de beneficiarios
      </div>

      {/* Tabla de Nombres */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Primer Apellido</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Segundo Apellido</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Primer Nombre</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Segundo Nombre</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`names-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-blue-50 px-0.5 py-0 font-bold text-center text-[9px] text-sky-900">{b}</td>
                
                {/* Primer Apellido */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}PrimerApellido` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                  {errors[`beneficiario${b}PrimerApellido`] && (
                    <FieldError message={errors[`beneficiario${b}PrimerApellido`]?.message} />
                  )}
                </td>

                {/* Segundo Apellido */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}SegundoApellido` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Primer Nombre */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}PrimerNombre` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Segundo Nombre */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}SegundoNombre` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de Datos Adicionales */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="min-w-[120px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">36. Tipo de documento</th>
              <th className="border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">37. Número de documento</th>
              <th className="border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">38. Nacionalidad</th>
              <th className="min-w-[120px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">39. Sexo biológico</th>
              <th className="min-w-[140px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">40. Sexo de identificación</th>
              <th className="border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. País nacimiento</th>
              <th className="min-w-[120px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Departamento (desplegable)</th>
              <th className="border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Municipio</th>
              <th className="min-w-[130px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Segundo departamento (desplegable)</th>
              <th className="min-w-[150px] border border-sky-300 bg-blue-100 px-1 py-0 text-[9px] font-bold text-sky-900">42. Fecha de nacimiento (desplegable)</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`data-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-blue-50 px-0.5 py-0 font-bold text-center text-[9px] text-sky-900">{b}</td>

                {/* Tipo Documento */}
                <td className="border border-sky-300 p-0">
                  <select
                    {...register(`beneficiario${b}TipoDocumento` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  >
                    <option value="">-</option>
                    <option value="CC">CC</option>
                    <option value="CE">CE</option>
                    <option value="PA">PA</option>
                    <option value="RC">RC</option>
                  </select>
                </td>

                {/* Número Documento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}NumeroDocumento` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Nacionalidad */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Nacionalidad` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Sexo Biológico */}
                <td className="border border-sky-300 px-1 py-0.5 text-[9px] text-sky-900">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        value="F"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}SexoBiologico` as keyof AffiliationFormData)}
                      />
                      F
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        value="M"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}SexoBiologico` as keyof AffiliationFormData)}
                      />
                      M
                    </label>
                  </div>
                </td>

                {/* Sexo de Identificación */}
                <td className="border border-sky-300 px-1 py-0.5 text-[9px] text-sky-900">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        value="F"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}SexoIdentificacion` as keyof AffiliationFormData)}
                      />
                      F
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        value="M"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}SexoIdentificacion` as keyof AffiliationFormData)}
                      />
                      M
                    </label>
                    <label className="inline-flex items-center gap-1">
                      <input
                        type="radio"
                        value="Otro"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}SexoIdentificacion` as keyof AffiliationFormData)}
                      />
                      Otro
                    </label>
                  </div>
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}PaisBirth` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Departamento Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <select
                    {...register(`beneficiario${b}DepartamentoBirth` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  >
                    <option value="">-</option>
                    {departmentOptions.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Municipio Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}MunicipioBirth` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Segundo Departamento Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <select
                    {...register(`beneficiario${b}SegundoDepartamentoBirth` as keyof AffiliationFormData)}
                    className="w-full px-1 py-0.5 border-0 text-[9px]"
                  >
                    <option value="">-</option>
                    {departmentOptions.map((department) => (
                      <option key={`second-${department}`} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Fecha Nacimiento */}
                <td className="border border-sky-300 px-1 py-0.5">
                  <div className="flex items-center gap-1">
                    <select
                      {...register(`beneficiario${b}FechaNacimientoDia` as keyof AffiliationFormData)}
                      className="w-12 border-0 bg-transparent text-[9px]"
                    >
                      <option value="">DD</option>
                      {dayOptions.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      {...register(`beneficiario${b}FechaNacimientoMes` as keyof AffiliationFormData)}
                      className="w-12 border-0 bg-transparent text-[9px]"
                    >
                      <option value="">MM</option>
                      {monthOptions.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      {...register(`beneficiario${b}FechaNacimientoAnio` as keyof AffiliationFormData)}
                      className="w-16 border-0 bg-transparent text-[9px]"
                    >
                      <option value="">AAAA</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de Datos Complementarios */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Departamento</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Municipio Distrito</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Localidad/Comuna</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Zona</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Dirección</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Teléfono fijo</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Teléfono celular</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Correo</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`complementary-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-blue-50 px-0.5 py-0 font-bold text-center text-[9px] text-sky-900">{b}</td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Departamento` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Municipio` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Localidad` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Zona` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Direccion` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}TelefonoFijo` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}TelefonoCelular` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Correo` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
