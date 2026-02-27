const lettersOnlyPattern = /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g

// Patrones de nombres de campo que deben admitir solo caracteres alfabéticos.
const lettersFieldMatchers = [
  /Apellido/i,
  /Nombre/i,
  /Nacionalidad/i,
  /PaisBirth/i,
  /^nacimientoPais$/i,
  /DepartamentoBirth/i,
  /^nacimientoDepartamento$/i,
  /MunicipioBirth/i,
  /^nacimientoMunicipio$/i,
  /Etnia/i,
  /Comunidad/i,
  /Parentesco/i,
  /Localidad/i,
  /grupoPoblacionEspecial/i,
  /categoriaDiscapacidad/i,
  /administradoraRiesgosLaborales/i,
  /administradoraPensiones/i,
  /sexoIdentificacionCual/i,
  /ips.*Nombre/i,
  /aportanteDepartamento/i,
  /aportanteMunicipio/i,
  /novedadPrimerApellido/i,
  /novedadSegundoApellido/i,
  /novedadPrimerNombre/i,
  /novedadSegundoNombre/i,
  /novedadSexoIdentificacionCual/i,
  /novedadCajaCompensacion/i,
  /contribSolidariaPrimerApellido/i,
  /contribSolidariaSegundoApellido/i,
  /contribSolidariaPrimerNombre/i,
  /contribSolidariaSegundoNombre/i,
  /firmaCotizanteNombre/i,
  /firmaAportanteNombre/i,
  /entidadTerritorialIdentificacion/i,
  /entidadTerritorialNombreInstitucion/i,
  /funcionarioPrimerApellido/i,
  /funcionarioSegundoApellido/i,
  /funcionarioPrimerNombre/i,
  /funcionarioSegundoNombre/i,
]

// Patrones de campos que se restringen a dígitos para mantener consistencia de captura.
const numericFieldMatchers = [
  /Dia$/i,
  /Mes$/i,
  /Anio$/i,
  /Documento$/i,
  /codigoEps/i,
  /telefono/i,
  /ingresoBaseCotizacion/i,
  /tarifaContribucionSolidaria/i,
  /valorUpc/i,
  /ips.*Codigo/i,
  /aportanteNumeroDocumento/i,
  /aportanteTelefono/i,
  /novedad\d+Codigo/i,
  /novedadNumeroDocumento/i,
  /novedadMotivoTrasladoCodigo/i,
  /novedadFechaNacimientoDia/i,
  /novedadFechaNacimientoMes/i,
  /novedadFechaNacimientoAnio/i,
  /novedadFechaDia/i,
  /novedadFechaMes/i,
  /novedadFechaAnio/i,
  /contribSolidariaNumeroDocumento/i,
  /anexosDocCN/i,
  /anexosDocRC/i,
  /anexosDocTI/i,
  /anexosDocCC/i,
  /anexosDocCE/i,
  /anexosDocPA/i,
  /anexosDocCD/i,
  /anexosDocSC/i,
  /anexosDocPT/i,
  /anexosTotal/i,
  /entidadTerritorialCodigoMunicipio/i,
  /entidadTerritorialCodigoDepartamento/i,
  /funcionarioNumeroDocumento/i,
  /funcionarioFechaRadicacionDia/i,
  /funcionarioFechaRadicacionMes/i,
  /funcionarioFechaRadicacionAnio/i,
  /funcionarioFechaValidacionDia/i,
  /funcionarioFechaValidacionMes/i,
  /funcionarioFechaValidacionAnio/i,
]

const excludeFromAutoSanitize = [/correo/i, /direccion/i]
// Algunos campos libres (correo/dirección) no deben recortarse automáticamente.

// Campos económicos que deben mostrarse con separador de miles (24, 25 y 52).
const currencyLikeFieldMatchers = [
  /^ingresoBaseCotizacion$/i,
  /^tarifaContribucionSolidaria$/i,
  /^beneficiarioB[1-5]ValorUpc$/i,
]

// Campos de número de identificación (CC, TI, CE, etc.) para formateo con puntos.
const identificationNumberFieldMatchers = [/NumeroDocumento/i]

// Limpia cualquier carácter no permitido en entradas alfabéticas.
export function sanitizeLetters(value: string) {
  return value.replace(lettersOnlyPattern, '').replace(/\s{2,}/g, ' ')
}

// Elimina caracteres no numéricos para entradas de tipo documento, teléfono y fechas.
export function sanitizeNumbers(value: string) {
  return value.replace(/\D+/g, '')
}

// Formatea un string numérico como valor monetario simple (ej: 1000 -> 1.000).
export function formatThousandsWithDots(value: string) {
  const digits = sanitizeNumbers(value)
  if (!digits) return ''

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// Variante visual con símbolo peso para campos monetarios del formulario.
export function formatCurrencyWithPeso(value: string) {
  const formatted = formatThousandsWithDots(value)
  if (!formatted) return ''

  return `$ ${formatted}`
}

export function shouldSanitizeAsLetters(fieldName: string) {
  if (excludeFromAutoSanitize.some((matcher) => matcher.test(fieldName))) {
    return false
  }

  return lettersFieldMatchers.some((matcher) => matcher.test(fieldName))
}

export function shouldSanitizeAsNumbers(fieldName: string) {
  if (excludeFromAutoSanitize.some((matcher) => matcher.test(fieldName))) {
    return false
  }

  return numericFieldMatchers.some((matcher) => matcher.test(fieldName))
}

export function shouldFormatAsCurrencyLike(fieldName: string) {
  return currencyLikeFieldMatchers.some((matcher) => matcher.test(fieldName))
}

export function shouldFormatAsIdentificationNumber(fieldName: string) {
  return identificationNumberFieldMatchers.some((matcher) => matcher.test(fieldName))
}
