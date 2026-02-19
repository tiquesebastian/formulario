export interface FamilyMember {
  id: string
  apellido1: string
  apellido2: string
  nombre1: string
  nombre2: string
  tipoDocumento: string
  numeroDocumento: string
  sexoBiologico: string
  sexoIdentificacion: string
  sexoIdentificacionCual: string
  nacionalidad: string
  paisNacimiento: string
  departamentoNacimiento: string
  municipioNacimiento: string
  fechaNacimientoDia: string
  fechaNacimientoMes: string
  fechaNacimientoAnio: string
}

export const createFamilyMember = (id: string): FamilyMember => ({
  id,
  apellido1: '',
  apellido2: '',
  nombre1: '',
  nombre2: '',
  tipoDocumento: 'CC',
  numeroDocumento: '',
  sexoBiologico: 'F',
  sexoIdentificacion: 'F',
  sexoIdentificacionCual: '',
  nacionalidad: '',
  paisNacimiento: '',
  departamentoNacimiento: '',
  municipioNacimiento: '',
  fechaNacimientoDia: '',
  fechaNacimientoMes: '',
  fechaNacimientoAnio: '',
})
