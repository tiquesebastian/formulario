import sql from 'mssql'
import { getSqlServerPool } from '../lib/sqlServer.js'
import type { CreatePdfRecordParams, PdfRecord } from '../types/pdfRecord.js'

// Repositorio para inserción y validación relacional de registros de PDF.
export async function findMunicipalityDepartmentIdByMunicipalityId(
  municipalityId: number,
): Promise<number | null> {
  const pool = await getSqlServerPool()

  const result = await pool
    .request()
    .input('municipalityId', sql.Int, municipalityId)
    .query(`
      SELECT TOP (1) department_id
      FROM dbo.municipalities
      WHERE id = @municipalityId
    `)

  if (result.recordset.length === 0) return null
  return Number(result.recordset[0].department_id)
}

export async function insertPdfRecord(input: CreatePdfRecordParams): Promise<PdfRecord> {
  const pool = await getSqlServerPool()

  const result = await pool
    .request()
    .input('pdfId', sql.NVarChar(80), input.pdfId)
    .input('documentNumber', sql.NVarChar(30), input.documentNumber)
    .input('departmentId', sql.Int, input.departmentId)
    .input('municipalityId', sql.Int, input.municipalityId)
    .input('createdAt', sql.DateTime2, input.createdAt)
    .input('pdfUrl', sql.NVarChar(500), input.pdfUrl ?? null)
    .query(`
      INSERT INTO dbo.pdf_records (
        pdf_id,
        document_number,
        department_id,
        municipality_id,
        created_at,
        pdf_url
      )
      OUTPUT
        INSERTED.id,
        INSERTED.pdf_id,
        INSERTED.document_number,
        INSERTED.department_id,
        INSERTED.municipality_id,
        INSERTED.created_at,
        INSERTED.pdf_url
      VALUES (
        @pdfId,
        @documentNumber,
        @departmentId,
        @municipalityId,
        @createdAt,
        @pdfUrl
      )
    `)

  const row = result.recordset[0]

  return {
    id: Number(row.id),
    pdfId: String(row.pdf_id),
    documentNumber: String(row.document_number),
    departmentId: Number(row.department_id),
    municipalityId: Number(row.municipality_id),
    createdAt: new Date(row.created_at).toISOString(),
    pdfUrl: row.pdf_url === null ? null : String(row.pdf_url),
  }
}

export async function findPdfRecordByPdfId(pdfId: string): Promise<PdfRecord | null> {
  const pool = await getSqlServerPool()

  const result = await pool
    .request()
    .input('pdfId', sql.NVarChar(80), pdfId)
    .query(`
      SELECT TOP (1)
        id,
        pdf_id,
        document_number,
        department_id,
        municipality_id,
        created_at,
        pdf_url
      FROM dbo.pdf_records
      WHERE pdf_id = @pdfId
    `)

  if (result.recordset.length === 0) return null

  const row = result.recordset[0]

  return {
    id: Number(row.id),
    pdfId: String(row.pdf_id),
    documentNumber: String(row.document_number),
    departmentId: Number(row.department_id),
    municipalityId: Number(row.municipality_id),
    createdAt: new Date(row.created_at).toISOString(),
    pdfUrl: row.pdf_url === null ? null : String(row.pdf_url),
  }
}
