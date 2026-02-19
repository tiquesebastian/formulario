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
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Tipo Doc</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Número Doc</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Nacionalidad</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Sexo Bio</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Sexo Id</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Cual</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">País Nac</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Dpto Nac</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Municipio</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Día Nac</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Mes Nac</th>
              <th className="border border-sky-300 bg-blue-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Año Nac</th>
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
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
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
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Nacionalidad */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Nacionalidad` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Sexo Biológico */}
                <td className="border border-sky-300 p-0">
                  <select
                    {...register(`beneficiario${b}SexoBiologico` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  >
                    <option value="">-</option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                  </select>
                </td>

                {/* Sexo de Identificación */}
                <td className="border border-sky-300 p-0">
                  <select
                    {...register(`beneficiario${b}SexoIdentificacion` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  >
                    <option value="">-</option>
                    <option value="F">F</option>
                    <option value="M">M</option>
                    <option value="Otro">Otro</option>
                  </select>
                </td>

                {/* Cual (para "Otro") */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}SexoIdentificacionCual` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* País Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}PaisBirth` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Departamento Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}DepartamentoBirth` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Municipio Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}MunicipioBirth` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                  />
                </td>

                {/* Día Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}FechaNacimientoDia` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                    maxLength={2}
                  />
                </td>

                {/* Mes Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}FechaNacimientoMes` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                    maxLength={2}
                  />
                </td>

                {/* Año Nacimiento */}
                <td className="border border-sky-300 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}FechaNacimientoAnio` as keyof AffiliationFormData)}
                    className="w-full px-0.5 py-0.5 border-0 text-[9px]"
                    maxLength={4}
                  />
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
