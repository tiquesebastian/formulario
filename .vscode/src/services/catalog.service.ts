import { HttpError } from '../types/httpError.js'
import {
  departmentExistsById,
  findAllDepartments,
  findMunicipalitiesByDepartmentId,
} from '../repositories/catalog.repository.js'
import type { Department, Municipality } from '../types/catalog.js'

// Servicio de catálogo: aplica validaciones de negocio antes de responder.
export async function getDepartments(): Promise<Department[]> {
  try {
    return await findAllDepartments()
  } catch (error) {
    throw new HttpError({
      status: 500,
      code: 'DEPARTMENTS_READ_FAILED',
      message: 'No fue posible consultar los departamentos.',
      details:
        error instanceof Error
          ? { reason: error.message }
          : { reason: 'Error desconocido de acceso a datos.' },
    })
  }
}

export async function getMunicipalitiesByDepartmentId(
  departmentId: number,
): Promise<Municipality[]> {
  try {
    const departmentExists = await departmentExistsById(departmentId)
    if (!departmentExists) {
      throw new HttpError({
        status: 404,
        code: 'DEPARTMENT_NOT_FOUND',
        message: 'Departamento no encontrado.',
      })
    }

    return await findMunicipalitiesByDepartmentId(departmentId)
  } catch (error) {
    if (error instanceof HttpError) throw error

    throw new HttpError({
      status: 500,
      code: 'MUNICIPALITIES_READ_FAILED',
      message: 'No fue posible consultar los municipios.',
      details:
        error instanceof Error
          ? { reason: error.message }
          : { reason: 'Error desconocido de acceso a datos.' },
    })
  }
}
