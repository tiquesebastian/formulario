const lettersOnlyPattern = /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g

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

export function sanitizeLetters(value: string) {
  return value.replace(lettersOnlyPattern, '').replace(/\s{2,}/g, ' ')
}

export function sanitizeNumbers(value: string) {
  return value.replace(/\D+/g, '')
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
