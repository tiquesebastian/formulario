import type { ChangeEvent } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FieldError } from '../components/FieldError';
import type { AffiliationFormData } from '../schema/affiliationSchema';
import { dateCatalog, departmentCatalog, sisbenClassCatalog } from '../config/catalogs';

interface BeneficiariesSectionProps {
  register: UseFormRegister<AffiliationFormData>;
  setValue: UseFormSetValue<AffiliationFormData>;
  watch: UseFormWatch<AffiliationFormData>;
  errors: Record<string, any>;
}

// Catálogos base usados para pintar filas repetitivas con la misma estructura del formulario físico.
const beneficiaryLabels = [
  { b: 'B1' },
  { b: 'B2' },
  { b: 'B3' },
  { b: 'B4' },
  { b: 'B5' },
];

const novedadesColumnaIzquierda = [
  { id: 1, text: 'Modificación de datos básicos de identificación.' },
  { id: 2, text: 'Corrección de datos básicos de identificación.' },
  { id: 3, text: 'Actualización del documento de identificación.' },
  { id: 4, text: 'Actualización y corrección de datos complementarios.' },
  { id: 5, text: 'Terminación de la inscripción en la EPS.' },
  { id: 6, text: 'Reporte de pago a través de un tercero.' },
  { id: 7, text: 'Inclusión de beneficiarios o de afiliados adicionales.' },
  { id: 8, text: 'Exclusión de beneficiarios o de afiliados adicionales.' },
  { id: 9, text: 'Inicio de relación laboral o adquisición de condiciones para cotizar.' },
  { id: 10, text: 'Terminación de la relación laboral o pérdida de las condiciones para seguir cotizando.' },
  { id: 11, text: 'Inscripción EPS retorno al país.' },
]

const novedadesColumnaDerecha = [
  { id: 12, text: 'Vinculación a una entidad autorizada para realizar afiliaciones colectivas.' },
  { id: 13, text: 'Desvinculación de una entidad autorizada para realizar afiliaciones colectivas.' },
  {
    id: 14,
    text: 'Movilidad:',
    options: [
      { key: 'A', label: 'A. Régimen Contributivo' },
      { key: 'B', label: 'B. Régimen Subsidiado' },
    ],
  },
  {
    id: 15,
    text: 'Traslado:',
    options: [
      { key: 'A', label: 'A. Mismo Régimen' },
      { key: 'B', label: 'B. Diferente Régimen' },
    ],
  },
  { id: 16, text: 'Reporte del fallecimiento del Cotizante o Cabeza de familia.' },
  { id: 17, text: 'Reporte del trámite de protección al cesante.' },
  { id: 18, text: 'Reporte de la calidad de Pre- pensionado.' },
  { id: 19, text: 'Reporte de la calidad de Pensionado.' },
  { id: 20, text: 'Ingreso a Contribución Solidaria.' },
  { id: 21, text: 'Retiro de Contribución Solidaria.' },
]

const declaracionesAutorizaciones = [
  'Declaración de dependencia económica de los beneficiarios y afiliados adicionales.',
  'Declaración de la no selección de afiliación al Régimen Contributivo, Especial o de Excepción.',
  'Declaración de existencia de razones de fuerza mayor o caso fortuito que impiden la entrega de los documentos que acreditan la condición de beneficiarios.',
  'Declaración de no intención del cotizante, cabeza de familia, beneficiarios o afiliados adicionales en la Institución Prestadora de Servicios de Salud.',
  'Autorización para que la EPS gestione y obtenga datos y copia de la historia clínica del cotizante o cabeza de familia y de sus beneficiarios o afiliados adicionales.',
  'Autorización para que la EPS reporte la información que se genere de la afiliación del reporte de novedades a la base de datos de afiliados vigente y a las entidades públicas que por sus funciones la requieran.',
  'Autorización para que la EPS maneje los datos personales del cotizante o cabeza de familia y de sus beneficiarios o afiliados adicionales de acuerdo con lo previsto en la Ley 1581 de 2012 y el Decreto 1377 de 2013.',
  'Autorización para que la EPS envíe información al correo electrónico o al celular como mensajes de texto.',
  'Aceptación de las condiciones para vincularse a la Contribución Solidaria y de realizar los pagos correspondientes.',
  'Aceptación de actualización del porcentaje de la contribución solidaria conforme a lo establecido en el Sisbén vigente.',
]

const anexosDetalle = [
  { id: 83, text: 'Copia del dictamen de incapacidad permanente emitido por la autoridad competente.' },
  { id: 84, text: 'Copia del registro civil de matrimonio, o de la escritura pública, acta de conciliación o sentencia judicial que declare la unión marital.' },
  { id: 85, text: 'Copia de la escritura pública o sentencia judicial que declare el divorcio, sentencia judicial que declare la separación de cuerpos y escritura pública, acta de conciliación o sentencia judicial que declare la terminación de la unión marital.' },
  { id: 86, text: 'Copia del certificado de adopción o acta de entrega del menor.' },
  { id: 87, text: 'Copia de la orden judicial o del acto administrativo de custodia.' },
  { id: 88, text: 'Documento en que conste la pérdida de la patria potestad, o el certificado de defunción de los padres o la declaración suscrita por el cotizante sobre la ausencia de los dos padres.' },
  { id: 89, text: 'Copia de la autorización de traslado por parte de la Superintendencia Nacional de Salud numeral 4 y 5 del artículo 2.1.7.3 del Decreto 780 de 2016.' },
  { id: 90, text: 'Certificación de vinculación a una entidad autorizada para realizar afiliaciones colectivas.' },
  { id: 91, text: 'Copia del acto administrativo o providencia de las autoridades competentes en que conste la calidad de beneficiario o se ordene la afiliación de oficio.' },
]

const checklistInputClassName = 'check-symbol focus:outline-none focus:ring-2 focus:ring-sky-300';
const checkCellLabelClassName = 'inline-flex select-none items-center gap-1 cursor-pointer';

export default function BeneficiariesSection({ register, setValue, watch, errors }: BeneficiariesSectionProps) {
  // Estado reactivo de imágenes para mostrar preview en firma/sello/sticker.
  const firmaCotizanteImagen = watch('firmaCotizanteImagen')
  const firmaAportanteImagen = watch('firmaAportanteImagen')
  const selloRadicacionImagen = watch('selloRadicacionImagen')
  const stickerProcesamientoImagen = watch('stickerProcesamientoImagen')
  const funcionarioFirmaImagen = watch('funcionarioFirmaImagen')

  const handleFirmaUpload = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName:
      | 'firmaCotizanteImagen'
      | 'firmaAportanteImagen'
      | 'selloRadicacionImagen'
      | 'stickerProcesamientoImagen'
      | 'funcionarioFirmaImagen',
  ) => {
    // Convierte imagen a base64 para almacenarla en el estado del formulario y exportarla en impresión/PDF.
    const file = event.target.files?.[0]
    if (!file) return

    if (!/^image\/(png|jpeg|jpg)$/i.test(file.type)) {
      window.alert('Solo se permiten imágenes de firma PNG o JPG.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setValue(fieldName, result, { shouldDirty: true })
    }
    reader.readAsDataURL(file)
  }

  const clearFirma = (
    fieldName:
      | 'firmaCotizanteImagen'
      | 'firmaAportanteImagen'
      | 'selloRadicacionImagen'
      | 'stickerProcesamientoImagen'
      | 'funcionarioFirmaImagen',
  ) => {
    // Limpia el campo visual y de datos del activo cargado.
    setValue(fieldName, '', { shouldDirty: true })
  }

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

      <div className="print-page-break mt-3 overflow-x-auto rounded-b-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th className="w-8 border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left"></th>
              <th className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                53. Nombre de la Institución Prestadora de Servicios de Salud - IPS
              </th>
              <th className="w-[190px] border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                54. Código de la IPS (a registrar por la EPS)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-center text-[9px] font-bold text-sky-900">C</td>
              <td className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('ipsCNombre')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register('ipsCCodigo')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
            </tr>

            {beneficiaryLabels.map(({ b }) => (
              <tr key={`ips-${b}`} className="border border-sky-300">
                <td className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-center text-[9px] font-bold text-sky-900">{b}</td>
                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    {...register(`ips${b}Nombre` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>
                <td className="border border-sky-300 bg-slate-100 p-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    {...register(`ips${b}Codigo` as keyof AffiliationFormData)}
                    className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                V. Datos de identificación del aportante, de las entidades responsables de la afiliación colectiva o responsables del pago
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={4} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                55. Nombre o razón social
              </th>
              <th colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                56. Tipo documento de Identificación
              </th>
              <th colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                57. Número del documento de identificación
              </th>
              <th colSpan={4} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold leading-tight text-sky-900 text-left">
                58. Tipo de aportante o pagador de pensiones (a registrar por la EPS)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={4} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('aportanteRazonSocial')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <select
                  {...register('aportanteTipoDocumento')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                >
                  <option value="">-</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                  <option value="NIT">NIT</option>
                </select>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register('aportanteNumeroDocumento')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td colSpan={4} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('aportanteTipoAportante')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={9} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                59. Ubicación
              </td>
              <td colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left"></td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={9} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Dirección
              </td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Teléfono fijo o Celular
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={9} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('aportanteDireccion')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register('aportanteTelefono')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={6} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Correo Electrónico
              </td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Departamento
              </td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Municipio / Distrito
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={6} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="email"
                  {...register('aportanteCorreo')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('aportanteDepartamento')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  {...register('aportanteMunicipio')}
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900"
                />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[9px] font-bold text-sky-900 text-left">
                60. Tipo de Novedad
              </td>
            </tr>

            {Array.from({ length: Math.max(novedadesColumnaIzquierda.length, novedadesColumnaDerecha.length) }, (_, index) => {
              const left = novedadesColumnaIzquierda[index]
              const right = novedadesColumnaDerecha[index]

              return (
                <tr key={`novedad-row-${index}`} className="border border-sky-300">
                  <td colSpan={6} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                    {left ? (
                      <>
                        <label className={checkCellLabelClassName}>
                          <input
                            type="checkbox"
                            className={checklistInputClassName}
                            {...register(`novedad${left.id}` as keyof AffiliationFormData)}
                          />
                          <span>{left.id}. {left.text}</span>
                        </label>
                        {(left.id === 5 || left.id === 6) && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[8px] font-semibold text-sky-900">
                            Código
                            <input
                              type="text"
                              inputMode="numeric"
                              {...register(`novedad${left.id}Codigo` as keyof AffiliationFormData)}
                              className="h-4 w-16 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                            />
                          </span>
                        )}
                      </>
                    ) : null}
                  </td>

                  <td colSpan={6} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                    {right ? (
                      <>
                        <label className={checkCellLabelClassName}>
                          <input
                            type="checkbox"
                            className={checklistInputClassName}
                            {...register(`novedad${right.id}` as keyof AffiliationFormData)}
                          />
                          <span>{right.id}. {right.text}</span>
                        </label>

                        {right.options ? (
                          <div className="ml-6 mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5">
                            {right.options.map((option) => (
                              <label key={`${right.id}-${option.key}`} className={checkCellLabelClassName}>
                                <input
                                  type="checkbox"
                                  className={checklistInputClassName}
                                  {...register(`novedad${right.id}${option.key}` as keyof AffiliationFormData)}
                                />
                                <span className="font-semibold">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                VI. Datos actualizados según reporte de la novedad
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                61. Datos básicos de identificación
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Primer Apellido</th>
              <th colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Segundo Apellido</th>
              <th colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Primer Nombre</th>
              <th colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Segundo Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadPrimerApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadSegundoApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadPrimerNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadSegundoNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Tipo documento de identidad</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">Número del documento de identidad</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">62. Sexo biológico</td>
              <td colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">63. Sexo identificación</td>
              <td colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">64. Fecha de nacimiento</td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <select {...register('novedadTipoDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900">
                  <option value="">-</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                </select>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" inputMode="numeric" {...register('novedadNumeroDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                <div className="flex items-center gap-3">
                  <label className={checkCellLabelClassName}>
                    <input type="radio" value="F" className={checklistInputClassName} {...register('novedadSexoBiologico')} />
                    Femenino
                  </label>
                  <label className={checkCellLabelClassName}>
                    <input type="radio" value="M" className={checklistInputClassName} {...register('novedadSexoBiologico')} />
                    Masculino
                  </label>
                </div>
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] text-sky-900">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <label className={checkCellLabelClassName}><input type="radio" value="M" className={checklistInputClassName} {...register('novedadSexoIdentificacion')} />M</label>
                  <label className={checkCellLabelClassName}><input type="radio" value="F" className={checklistInputClassName} {...register('novedadSexoIdentificacion')} />F</label>
                  <label className={checkCellLabelClassName}><input type="radio" value="T" className={checklistInputClassName} {...register('novedadSexoIdentificacion')} />T</label>
                  <label className={checkCellLabelClassName}><input type="radio" value="NB" className={checklistInputClassName} {...register('novedadSexoIdentificacion')} />NB</label>
                  <label className={checkCellLabelClassName}><input type="radio" value="Otro" className={checklistInputClassName} {...register('novedadSexoIdentificacion')} />Otro</label>
                  <input
                    type="text"
                    placeholder="Cuál"
                    {...register('novedadSexoIdentificacionCual')}
                    className="h-4 w-16 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                  />
                </div>
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 px-1 py-0.5">
                <div className="flex items-center gap-1">
                  <input maxLength={2} inputMode="numeric" placeholder="DD" {...register('novedadFechaNacimientoDia')} className="h-5 w-8 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={2} inputMode="numeric" placeholder="MM" {...register('novedadFechaNacimientoMes')} className="h-5 w-8 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={4} inputMode="numeric" placeholder="AAAA" {...register('novedadFechaNacimientoAnio')} className="h-5 w-11 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                </div>
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={4} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">65. EPS anterior</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">66. Fecha de novedad</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">67. Motivo de traslado</td>
              <td colSpan={4} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">68. Caja de compensación Familiar o pagador de pensiones</td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={4} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadEpsAnterior')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 px-1 py-0.5">
                <div className="flex items-center gap-1">
                  <input maxLength={2} inputMode="numeric" placeholder="DD" {...register('novedadFechaDia')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={2} inputMode="numeric" placeholder="MM" {...register('novedadFechaMes')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={4} inputMode="numeric" placeholder="AAAA" {...register('novedadFechaAnio')} className="h-5 w-10 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                </div>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <div className="flex h-6 items-center gap-1 px-1 text-[8px] text-sky-900">
                  Código
                  <input type="text" inputMode="numeric" {...register('novedadMotivoTrasladoCodigo')} className="h-4 w-12 border border-sky-300 bg-white px-1 text-[8px] text-sky-900" />
                </div>
              </td>
              <td colSpan={4} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('novedadCajaCompensacion')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                VII. Declaraciones y autorizaciones
              </th>
            </tr>
          </thead>
          <tbody>
            {declaracionesAutorizaciones.map((declaracion, index) => (
              <tr key={`declaracion-${index + 69}`} className="border border-sky-300">
                <td colSpan={12} className="border border-sky-300 bg-sky-50 px-1.5 py-0.5 text-[8px] leading-tight text-sky-900">
                  <label className={checkCellLabelClassName}>
                    <input
                      type="checkbox"
                      className={checklistInputClassName}
                      {...register(`declaracion${index + 69}` as keyof AffiliationFormData)}
                    />
                    <span>
                      <span className="font-semibold">{index + 69}. </span>
                      {declaracion}
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                VIII. Contribución Solidaria
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                79. En caso de ausencia o fallecimiento del cabeza de familia reporte la persona de su grupo familiar que se hará cargo del pago de la Contribución Solidaria
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Primer Apellido</th>
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Segundo Apellido</th>
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Primer Nombre</th>
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Segundo Nombre</th>
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Tipo de documento de identidad</th>
              <th colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">No. del documento de identidad</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('contribSolidariaPrimerApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('contribSolidariaSegundoApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('contribSolidariaPrimerNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('contribSolidariaSegundoNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <select {...register('contribSolidariaTipoDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900">
                  <option value="">-</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                </select>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" inputMode="numeric" {...register('contribSolidariaNumeroDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                IX. Firmas
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={6} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                80. El cotizante, cabeza de familia o beneficiario cuando aplique o afiliado adicional
              </th>
              <th colSpan={6} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                81. Aportante o entidad responsable de la afiliación colectiva, institucional o de oficio
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={6} className="border border-sky-300 bg-slate-100 p-0">
                <div className="h-14 w-full border-0 bg-transparent px-1 py-0.5">
                  {firmaCotizanteImagen ? (
                    <img src={firmaCotizanteImagen} alt="Firma cotizante" className="h-full w-full object-contain" />
                  ) : null}
                </div>
              </td>
              <td colSpan={6} className="border border-sky-300 bg-slate-100 p-0">
                <div className="h-14 w-full border-0 bg-transparent px-1 py-0.5">
                  {firmaAportanteImagen ? (
                    <img src={firmaAportanteImagen} alt="Firma aportante" className="h-full w-full object-contain" />
                  ) : null}
                </div>
              </td>
            </tr>
            <tr className="border border-sky-300">
              <td colSpan={6} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] text-sky-900">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  {...register('firmaCotizanteNombre')}
                  className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                />
              </td>
              <td colSpan={6} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] text-sky-900">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  {...register('firmaAportanteNombre')}
                  className="h-5 w-full border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                />
              </td>
            </tr>
            <tr className="border border-sky-300">
              <td colSpan={6} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] text-sky-900">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) => handleFirmaUpload(event, 'firmaCotizanteImagen')}
                    className="h-5 text-[8px] text-sky-900 file:mr-2 file:rounded file:border file:border-sky-300 file:bg-white file:px-1 file:py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => clearFirma('firmaCotizanteImagen')}
                    className="rounded border border-sky-300 bg-white px-2 py-0.5 text-[8px] font-semibold text-sky-900"
                  >
                    Limpiar firma
                  </button>
                </div>
              </td>
              <td colSpan={6} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] text-sky-900">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) => handleFirmaUpload(event, 'firmaAportanteImagen')}
                    className="h-5 text-[8px] text-sky-900 file:mr-2 file:rounded file:border file:border-sky-300 file:bg-white file:px-1 file:py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => clearFirma('firmaAportanteImagen')}
                    className="rounded border border-sky-300 bg-white px-2 py-0.5 text-[8px] font-semibold text-sky-900"
                  >
                    Limpiar firma
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                X. Anexos
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] text-sky-900">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">82. Anexo copia del documento de identidad</span>
                  <span className="font-semibold">Cantidad de documentos de identidad anexos:</span>

                  <span className="inline-flex items-center gap-1">CN
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocCN')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>

                  <span className="inline-flex items-center gap-1">RC
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocRC')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>

                  <span className="inline-flex items-center gap-1">TI
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocTI')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>

                  <span className="inline-flex items-center gap-1">CC
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocCC')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1">CE
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocCE')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1">PA
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocPA')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1">CD
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocCD')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1">SC
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocSC')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1">PT
                    <input
                      type="text"
                      inputMode="numeric"
                      {...register('anexosDocPT')}
                      className="h-4 w-10 border border-sky-300 bg-white px-1 text-[8px] text-sky-900"
                    />
                  </span>
                </div>
              </td>
            </tr>

            {anexosDetalle.map((anexo) => (
              <tr key={`anexo-${anexo.id}`} className="border border-sky-300">
                <td colSpan={12} className="border border-sky-300 bg-slate-100 px-1 py-0.5 text-[8px] leading-tight text-sky-900">
                  <label className={checkCellLabelClassName}>
                    <input
                      type="checkbox"
                      className={checklistInputClassName}
                      {...register(`anexo${anexo.id}` as keyof AffiliationFormData)}
                    />
                    <span>
                      <span className="font-semibold">{anexo.id}. </span>
                      {anexo.text}
                    </span>
                  </label>
                </td>
              </tr>
            ))}

            <tr className="border border-sky-300">
              <td colSpan={10} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-right text-[8px] font-semibold text-sky-900">
                Total Anexos
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input
                  type="text"
                  inputMode="numeric"
                  {...register('anexosTotal')}
                  readOnly
                  className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-center text-[9px] text-sky-900"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-x-auto rounded-md border border-sky-300">
        <table className="w-full border-collapse border border-sky-300">
          <thead>
            <tr className="border border-sky-300">
              <th colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                XI. Datos de la Entidad Territorial y/o Institución responsable de población especial
              </th>
            </tr>
            <tr className="border border-sky-300">
              <th colSpan={5} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                92. Identificación de la Entidad Territorial
              </th>
              <th colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                Código del municipio
              </th>
              <th colSpan={2} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                Código del departamento
              </th>
              <th colSpan={3} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                93. Nombre de la Institución
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-sky-300">
              <td colSpan={5} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">
                Entidad Territorial
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" inputMode="numeric" {...register('entidadTerritorialCodigoMunicipio')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" inputMode="numeric" {...register('entidadTerritorialCodigoDepartamento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('entidadTerritorialNombreInstitucion')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-sky-600 px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wide text-white">
                XII. Datos del funcionario de la Entidad Territorial o de la Institución responsable de población especial
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                94. Apellidos y nombres
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Primer Apellido</td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Segundo Apellido</td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Primer Nombre</td>
              <td colSpan={3} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Segundo Nombre</td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('funcionarioPrimerApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('funcionarioSegundoApellido')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('funcionarioPrimerNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={3} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('funcionarioSegundoNombre')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Tipo de documento de identidad</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">Número del documento de identidad</td>
              <td colSpan={4} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">95. Firma del funcionario</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">96. fecha de radicación</td>
              <td colSpan={2} className="border border-sky-300 bg-sky-50 px-1 py-0.5 text-[8px] font-semibold text-sky-900 text-left">97. Fecha de validación</td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <select {...register('funcionarioTipoDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900">
                  <option value="">-</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="PA">PA</option>
                </select>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" inputMode="numeric" {...register('funcionarioNumeroDocumento')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
              <td colSpan={4} className="border border-sky-300 bg-slate-100 p-0">
                <div className="px-1 py-0.5">
                  <div className="flex items-center gap-1">
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={(event) => handleFirmaUpload(event, 'funcionarioFirmaImagen')}
                      className="h-5 text-[7px] text-sky-900 file:mr-1 file:rounded file:border file:border-sky-300 file:bg-white file:px-1 file:py-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => clearFirma('funcionarioFirmaImagen')}
                      className="rounded border border-sky-300 bg-white px-1 py-0.5 text-[7px] font-semibold text-sky-900"
                    >
                      Limpiar
                    </button>
                  </div>
                  {funcionarioFirmaImagen ? (
                    <img src={funcionarioFirmaImagen} alt="Firma funcionario" className="mt-1 h-8 w-full object-contain" />
                  ) : null}
                </div>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 px-1 py-0.5">
                <div className="flex items-center gap-1">
                  <input maxLength={2} inputMode="numeric" placeholder="DD" {...register('funcionarioFechaRadicacionDia')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={2} inputMode="numeric" placeholder="MM" {...register('funcionarioFechaRadicacionMes')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={4} inputMode="numeric" placeholder="AAAA" {...register('funcionarioFechaRadicacionAnio')} className="h-5 w-10 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                </div>
              </td>
              <td colSpan={2} className="border border-sky-300 bg-slate-100 px-1 py-0.5">
                <div className="flex items-center gap-1">
                  <input maxLength={2} inputMode="numeric" placeholder="DD" {...register('funcionarioFechaValidacionDia')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={2} inputMode="numeric" placeholder="MM" {...register('funcionarioFechaValidacionMes')} className="h-5 w-7 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                  <input maxLength={4} inputMode="numeric" placeholder="AAAA" {...register('funcionarioFechaValidacionAnio')} className="h-5 w-10 border border-sky-300 bg-white px-1 text-center text-[8px] text-sky-900" />
                </div>
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-sky-100 px-1 py-0.5 text-[8px] font-bold text-sky-900 text-left">
                Observaciones:
              </td>
            </tr>

            <tr className="border border-sky-300">
              <td colSpan={12} className="border border-sky-300 bg-slate-100 p-0">
                <input type="text" {...register('funcionarioObservaciones')} className="h-6 w-full border-0 bg-transparent px-1 py-0.5 text-[9px] text-sky-900" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-3 overflow-hidden rounded-md border border-sky-300">
        <p className="border-b border-sky-300 bg-sky-50 px-2 py-0.5 text-center text-[8px] font-semibold text-sky-900">
          Recuerde que con la firma del formulario, el afiliado manifiesta la veracidad de la información registrada y de las declaraciones contenidas en el capítulo VII del formulario
        </p>
        <table className="w-full border-collapse border border-sky-300">
          <tbody>
            <tr className="border border-sky-300">
              <td className="h-12 w-[48%] border border-sky-300 bg-slate-100 px-2 py-1 align-top text-[8px] font-semibold text-sky-900">
                Doc. identificación y nombre del Ejecutivo Comercial
                <input
                  type="text"
                  {...register('ejecutivoComercialInfo')}
                  className="mt-1 h-5 w-full border border-sky-300 bg-white px-1 text-[8px] font-normal text-sky-900"
                />
              </td>
              <td className="h-12 w-[24%] border border-sky-300 bg-slate-100 px-2 py-1 align-top text-[8px] font-semibold text-sky-900">
                Sello de Radicación
                <input
                  type="text"
                  {...register('selloRadicacionInfo')}
                  className="mt-1 h-5 w-full border border-sky-300 bg-white px-1 text-[8px] font-normal text-sky-900"
                />
                <div className="mt-1 flex items-center gap-1">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) => handleFirmaUpload(event, 'selloRadicacionImagen')}
                    className="h-5 text-[7px] text-sky-900 file:mr-1 file:rounded file:border file:border-sky-300 file:bg-white file:px-1 file:py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => clearFirma('selloRadicacionImagen')}
                    className="rounded border border-sky-300 bg-white px-1 py-0.5 text-[7px] font-semibold text-sky-900"
                  >
                    Limpiar
                  </button>
                </div>
                {selloRadicacionImagen ? (
                  <img src={selloRadicacionImagen} alt="Sello de radicación" className="mt-1 h-8 w-full object-contain" />
                ) : null}
              </td>
              <td className="h-12 w-[28%] border border-sky-300 bg-slate-100 px-2 py-1 align-top text-[8px] font-semibold text-sky-900">
                Sticker procesamiento
                <input
                  type="text"
                  {...register('stickerProcesamientoInfo')}
                  className="mt-1 h-5 w-full border border-sky-300 bg-white px-1 text-[8px] font-normal text-sky-900"
                />
                <div className="mt-1 flex items-center gap-1">
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(event) => handleFirmaUpload(event, 'stickerProcesamientoImagen')}
                    className="h-5 text-[7px] text-sky-900 file:mr-1 file:rounded file:border file:border-sky-300 file:bg-white file:px-1 file:py-0.5"
                  />
                  <button
                    type="button"
                    onClick={() => clearFirma('stickerProcesamientoImagen')}
                    className="rounded border border-sky-300 bg-white px-1 py-0.5 text-[7px] font-semibold text-sky-900"
                  >
                    Limpiar
                  </button>
                </div>
                {stickerProcesamientoImagen ? (
                  <img src={stickerProcesamientoImagen} alt="Sticker de procesamiento" className="mt-1 h-8 w-full object-contain" />
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
