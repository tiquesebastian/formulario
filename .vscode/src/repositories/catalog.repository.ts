import sql from 'mssql'
import { getSqlServerPool } from '../lib/sqlServer.js'
import type { Department, Municipality } from '../types/catalog.js'

// Repositorio de lectura de catálogos (departamentos y municipios).
export async function findAllDepartments(): Promise<Department[]> {
  const pool = await getSqlServerPool()

  const result = await pool.request().query(`
    SELECT
      id,
      code,
      name
    FROM dbo.departments
    ORDER BY name ASC
  `)

  return result.recordset.map((row: { id: number; code: string; name: string }) => ({
    id: Number(row.id),
    code: String(row.code),
    name: String(row.name),
  }))
}

export async function findMunicipalitiesByDepartmentId(
  departmentId: number,
): Promise<Municipality[]> {
  const pool = await getSqlServerPool()

  const result = await pool
    .request()
    .input('departmentId', sql.Int, departmentId)
    .query(`
      SELECT
        id,
        department_id,
        code,
        name
      FROM dbo.municipalities
      WHERE department_id = @departmentId
      ORDER BY name ASC
    `)

  return result.recordset.map(
    (row: { id: number; department_id: number; code: string; name: string }) => ({
    id: Number(row.id),
    departmentId: Number(row.department_id),
    code: String(row.code),
    name: String(row.name),
    }),
  )
}

export async function departmentExistsById(departmentId: number): Promise<boolean> {
  const pool = await getSqlServerPool()

  const result = await pool
    .request()
    .input('departmentId', sql.Int, departmentId)
    .query('SELECT TOP (1) id FROM dbo.departments WHERE id = @departmentId')

  return result.recordset.length > 0
}
