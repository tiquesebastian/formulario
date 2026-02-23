import type { UseFormRegister } from 'react-hook-form';
import { FieldError } from '../components/FieldError';
import type { AffiliationFormData } from '../schema/affiliationSchema';
import { dateCatalog, departmentCatalog, sisbenClassCatalog } from '../config/catalogs';

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
const checkCellLabelClassName = 'inline-flex select-none items-center gap-1 cursor-pointer';

export default function BeneficiariesSection({ register, errors }: BeneficiariesSectionProps) {
  return (
    <section className="-mt-px overflow-hidden border-x border-b border-sky-300">
      <div className="border-b border-sky-300 bg-sky-50 px-3 py-1 text-[10px] font-semibold text-sky-900">
        Datos básicos de identificación de los beneficiarios y de los afiliados adicionales
      </div>

      {/* Tabla de Nombres */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Primer Apellido</th>
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Segundo Apellido</th>
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Primer Nombre</th>
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900">Segundo Nombre</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`names-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-sky-50 px-0.5 py-0 font-bold text-center text-[9px] text-sky-900">{b}</td>
                
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
              <th className="border border-sky-300 bg-sky-100 px-0.5 py-0 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="min-w-[120px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">36. Tipo de documento</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">37. Número de documento</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">38. Nacionalidad</th>
              <th className="min-w-[120px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">39. Sexo biológico</th>
              <th className="min-w-[140px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">40. Sexo de identificación</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. País nacimiento</th>
              <th className="min-w-[120px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Departamento (desplegable)</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Municipio</th>
              <th className="min-w-[130px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">41. Segundo departamento (desplegable)</th>
              <th className="min-w-[150px] border border-sky-300 bg-sky-100 px-1 py-0 text-[9px] font-bold text-sky-900">42. Fecha de nacimiento (desplegable)</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`data-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-sky-50 px-0.5 py-0 font-bold text-center text-[9px] text-sky-900">{b}</td>

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
                    {departmentCatalog.map((department) => (
                      <option key={department.value} value={department.value}>
                        {department.label}
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
                    {departmentCatalog.map((department) => (
                      <option key={`second-${department.value}`} value={department.value}>
                        {department.label}
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
                      {dateCatalog.days.map((day) => (
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
                      {dateCatalog.months.map((month) => (
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
                      {dateCatalog.years.map((year) => (
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

      {/* Tabla 43-50. Datos complementarios del beneficiario */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={10} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-left text-[9px] font-bold text-sky-900">
                Datos complementarios del Beneficiario
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">Fila</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">43. Parentesco</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">44. Etnia</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">45. Comunidad</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900">46. Grupo de población especial</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900">47. Tiene encuesta SISBÉN</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900">
                <div className="leading-tight">48. Clasificación SISBÉN</div>
                <div className="mt-0.5 grid grid-cols-2 text-[7px] font-semibold">
                  <span>Nivel</span>
                  <span>Grupo</span>
                </div>
              </th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">49. Discapacidad</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900">Categoría de discapacidad</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900">50. Incapacidad permanente</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`supplementary-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-slate-200 px-1 py-0.5 font-bold text-center text-[9px] text-sky-900">{b}</td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Parentesco` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Etnia` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Comunidad` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}GrupoPoblacionEspecial` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[8px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                  <div className="flex items-center justify-center gap-2">
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="Si"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}EncuestaSisben` as keyof AffiliationFormData)}
                      />
                      Sí
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="No"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}EncuestaSisben` as keyof AffiliationFormData)}
                      />
                      No
                    </label>
                  </div>
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <div className="grid grid-cols-2 gap-0.5 px-0.5 py-0.5">
                    <input
                      type="text"
                      placeholder={sisbenClassCatalog.levelPlaceholder}
                      {...register(`beneficiario${b}ClasificacionSisbenNivel` as keyof AffiliationFormData)}
                      className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                    <input
                      type="text"
                      placeholder={sisbenClassCatalog.groupPlaceholder}
                      {...register(`beneficiario${b}ClasificacionSisbenGrupo` as keyof AffiliationFormData)}
                      className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </div>
                </td>

                <td className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                  <div className="flex items-center justify-center gap-2">
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="Si"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Discapacidad` as keyof AffiliationFormData)}
                      />
                      Sí
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="No"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Discapacidad` as keyof AffiliationFormData)}
                      />
                      No
                    </label>
                  </div>
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}CategoriaDiscapacidad` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[8px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                  <div className="flex items-center justify-center gap-2">
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="Si"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}IncapacidadPermanente` as keyof AffiliationFormData)}
                      />
                      Sí
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="No"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}IncapacidadPermanente` as keyof AffiliationFormData)}
                      />
                      No
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla 51. Datos de residencia */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left" rowSpan={2}>
                Fila
              </th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left" colSpan={4}>
                51. Datos de residencia
              </th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900" rowSpan={2}>
                Teléfono fijo y/o celular
              </th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold leading-tight text-sky-900" rowSpan={2}>
                52. Valor de la UPC del afiliado adicional (si aplica, para la EPS)
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">Departamento</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900">Municipio/ Distrito</th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900" colSpan={2}>
                Zona
              </th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryLabels.map(({ b }) => (
              <tr key={`complementary-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-slate-200 px-1 py-0.5 font-bold text-center text-[9px] text-sky-900">{b}</td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Departamento` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Municipio` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td colSpan={2} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                  <div className="grid grid-cols-4 items-center gap-1 whitespace-nowrap">
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="CabeceraMunicipal"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Zona` as keyof AffiliationFormData)}
                      />
                      Cabecera Municipal
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="CentroPoblado"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Zona` as keyof AffiliationFormData)}
                      />
                      Centro Poblado
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="RuralDisperso"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Zona` as keyof AffiliationFormData)}
                      />
                      Rural Disperso
                    </label>
                    <label className={checkCellLabelClassName}>
                      <input
                        type="radio"
                        value="RestoRural"
                        className={checklistInputClassName}
                        {...register(`beneficiario${b}Zona` as keyof AffiliationFormData)}
                      />
                      Resto Rural
                    </label>
                  </div>
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <div className="grid grid-cols-2 gap-0.5 px-0.5 py-0.5">
                    <input
                      type="text"
                      placeholder="Fijo"
                      {...register(`beneficiario${b}TelefonoFijo` as keyof AffiliationFormData)}
                      className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                    <input
                      type="text"
                      placeholder="Celular"
                      {...register(`beneficiario${b}TelefonoCelular` as keyof AffiliationFormData)}
                      className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </div>
                </td>

                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}ValorUpc` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>
              </tr>
            ))}

            <tr className="border border-sky-300">
              <td className="border border-sky-300 bg-slate-200 px-1 py-0.5 text-[9px] font-bold text-sky-900"></td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-center text-[9px] font-bold text-sky-900">
                Dirección
              </td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-center text-[9px] font-bold text-sky-900">
                Localidad/Comuna
              </td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-center text-[9px] font-bold text-sky-900">
                Correo Electrónico
              </td>
            </tr>

            {beneficiaryLabels.map(({ b }) => (
              <tr key={`residence-extra-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-slate-200 px-1 py-0.5 font-bold text-center text-[9px] text-sky-900">{b}</td>

                <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Direccion` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`beneficiario${b}Localidad` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>

                <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="email"
                    {...register(`beneficiario${b}Correo` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
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
