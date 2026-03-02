import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp } from '../app.js'
import { HttpError } from '../types/httpError.js'

const catalogServiceMocks = vi.hoisted(() => ({
  getDepartments: vi.fn(),
  getMunicipalitiesByDepartmentId: vi.fn(),
}))

const pdfServiceMocks = vi.hoisted(() => ({
  createPdfRecord: vi.fn(),
  generatePdfAndCreateRecord: vi.fn(),
  getPdfRecordByPdfId: vi.fn(),
}))

vi.mock('../services/catalog.service.js', () => ({
  getDepartments: catalogServiceMocks.getDepartments,
  getMunicipalitiesByDepartmentId: catalogServiceMocks.getMunicipalitiesByDepartmentId,
}))

vi.mock('../services/pdfRecords.service.js', () => ({
  createPdfRecord: pdfServiceMocks.createPdfRecord,
  generatePdfAndCreateRecord: pdfServiceMocks.generatePdfAndCreateRecord,
  getPdfRecordByPdfId: pdfServiceMocks.getPdfRecordByPdfId,
}))

describe('Fase 5 - backend endpoints críticos', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET /api/departments devuelve lista', async () => {
    catalogServiceMocks.getDepartments.mockResolvedValueOnce([
      { id: 29, code: '91', name: 'Amazonas' },
    ])

    const response = await request(createApp()).get('/api/departments')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([{ id: 29, code: '91', name: 'Amazonas' }])
    expect(catalogServiceMocks.getDepartments).toHaveBeenCalledTimes(1)
  })

  it('GET /api/municipalities filtra por departmentId', async () => {
    catalogServiceMocks.getMunicipalitiesByDepartmentId.mockResolvedValueOnce([
      { id: 969, departmentId: 29, code: '263', name: 'EL ENCANTO' },
    ])

    const response = await request(createApp()).get('/api/municipalities').query({ departmentId: '29' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      { id: 969, departmentId: 29, code: '263', name: 'EL ENCANTO' },
    ])
    expect(catalogServiceMocks.getMunicipalitiesByDepartmentId).toHaveBeenCalledWith(29)
  })

  it('GET /api/municipalities retorna 400 si departmentId es inválido', async () => {
    const response = await request(createApp()).get('/api/municipalities').query({ departmentId: 'abc' })

    expect(response.status).toBe(400)
    expect(response.body.code).toBe('VALIDATION_ERROR')
    expect(catalogServiceMocks.getMunicipalitiesByDepartmentId).not.toHaveBeenCalled()
  })

  it('POST /api/pdf-records crea registro válido', async () => {
    const createdRecord = {
      id: 1,
      pdfId: '99e9f235-2301-4e27-b8c5-71c017408b55',
      documentNumber: '1234567890',
      departmentId: 29,
      municipalityId: 969,
      createdAt: '2026-02-27T17:08:35.000Z',
      pdfUrl: null,
    }

    pdfServiceMocks.createPdfRecord.mockResolvedValueOnce(createdRecord)

    const response = await request(createApp())
      .post('/api/pdf-records')
      .send({
        pdfId: '99e9f235-2301-4e27-b8c5-71c017408b55',
        documentNumber: '1234567890',
        departmentId: 29,
        municipalityId: 969,
        createdAt: '2026-02-27T17:08:35.000Z',
      })

    expect(response.status).toBe(201)
    expect(response.body).toEqual(createdRecord)
    expect(pdfServiceMocks.createPdfRecord).toHaveBeenCalledTimes(1)
  })

  it('POST /api/pdf-records retorna 400 si documentNumber está vacío', async () => {
    const response = await request(createApp())
      .post('/api/pdf-records')
      .send({
        pdfId: 'pdf-1',
        documentNumber: '',
        departmentId: 29,
        municipalityId: 969,
        createdAt: '2026-02-27T17:08:35.000Z',
      })

    expect(response.status).toBe(400)
    expect(response.body.code).toBe('VALIDATION_ERROR')
    expect(pdfServiceMocks.createPdfRecord).not.toHaveBeenCalled()
  })

  it('POST /api/pdf-records retorna 400 cuando municipio no corresponde al departamento', async () => {
    pdfServiceMocks.createPdfRecord.mockRejectedValueOnce(
      new HttpError({
        status: 400,
        code: 'MUNICIPALITY_DEPARTMENT_MISMATCH',
        message: 'El municipio no pertenece al departamento enviado.',
      }),
    )

    const response = await request(createApp())
      .post('/api/pdf-records')
      .send({
        pdfId: 'pdf-2',
        documentNumber: '1234567890',
        departmentId: 29,
        municipalityId: 1,
        createdAt: '2026-02-27T17:08:35.000Z',
      })

    expect(response.status).toBe(400)
    expect(response.body.code).toBe('MUNICIPALITY_DEPARTMENT_MISMATCH')
  })
})
