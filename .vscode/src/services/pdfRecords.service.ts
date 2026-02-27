import { HttpError } from '../types/httpError.js'
import { departmentExistsById } from '../repositories/catalog.repository.js'
import {
  findPdfRecordByPdfId,
  findMunicipalityDepartmentIdByMunicipalityId,
  insertPdfRecord,
} from '../repositories/pdfRecords.repository.js'
import type { CreatePdfRecordInput, GeneratePdfInput } from '../schemas/pdfRecord.schema.js'
import type { PdfRecord } from '../types/pdfRecord.js'
import { randomUUID } from 'node:crypto'

async function validateDepartmentMunicipalityRelation(
  departmentId: number,
  municipalityId: number,
): Promise<void> {
  const departmentExists = await departmentExistsById(departmentId)
  if (!departmentExists) {
    throw new HttpError({
      status: 404,
      code: 'DEPARTMENT_NOT_FOUND',
      message: 'Departamento no encontrado.',
    })
  }

  const municipalityDepartmentId = await findMunicipalityDepartmentIdByMunicipalityId(municipalityId)

  if (municipalityDepartmentId === null) {
    throw new HttpError({
      status: 404,
      code: 'MUNICIPALITY_NOT_FOUND',
      message: 'Municipio no encontrado.',
    })
  }

  if (municipalityDepartmentId !== departmentId) {
    throw new HttpError({
      status: 400,
      code: 'MUNICIPALITY_DEPARTMENT_MISMATCH',
      message: 'El municipio no pertenece al departamento enviado.',
    })
  }
}

export async function getPdfRecordByPdfId(pdfId: string): Promise<PdfRecord | null> {
  try {
    return await findPdfRecordByPdfId(pdfId)
  } catch {
    throw new HttpError({
      status: 500,
      code: 'PDF_RECORD_READ_FAILED',
      message: 'No fue posible consultar el registro PDF.',
    })
  }
}

// Servicio de registro PDF: valida coherencia relacional antes de insertar.
export async function createPdfRecord(input: CreatePdfRecordInput): Promise<PdfRecord> {
  try {
    await validateDepartmentMunicipalityRelation(input.departmentId, input.municipalityId)

    return await insertPdfRecord({
      pdfId: input.pdfId,
      documentNumber: input.documentNumber,
      departmentId: input.departmentId,
      municipalityId: input.municipalityId,
      createdAt: new Date(input.createdAt),
      pdfUrl: input.pdfUrl,
    })
  } catch (error) {
    if (error instanceof HttpError) throw error

    if (typeof error === 'object' && error !== null && 'code' in error) {
      const sqlErrorCode = (error as { code?: string }).code
      if (sqlErrorCode === 'EREQUEST') {
        throw new HttpError({
          status: 400,
          code: 'PDF_RECORD_INVALID',
          message: 'No fue posible crear el registro PDF por datos inválidos.',
        })
      }
    }

    throw new HttpError({
      status: 500,
      code: 'PDF_RECORD_CREATE_FAILED',
      message: 'No fue posible crear el registro PDF.',
    })
  }
}

export async function generatePdfAndCreateRecord(input: GeneratePdfInput): Promise<PdfRecord> {
  const createdAt = new Date().toISOString()
  const pdfId = randomUUID()
  const pdfUrl = `/generated-pdfs/${pdfId}.pdf`

  return createPdfRecord({
    pdfId,
    documentNumber: input.documentNumber,
    departmentId: input.departmentId,
    municipalityId: input.municipalityId,
    createdAt,
    pdfUrl,
  })
}
