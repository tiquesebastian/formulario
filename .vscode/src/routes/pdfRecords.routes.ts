import { Router } from 'express'
import {
  createPdfRecordSchema,
  generatePdfSchema,
  pdfRecordByIdParamsSchema,
} from '../schemas/pdfRecord.schema.js'
import {
  createPdfRecord,
  generatePdfAndCreateRecord,
  getPdfRecordByPdfId,
} from '../services/pdfRecords.service.js'

// Router de trazabilidad: registra metadata mínima por PDF generado.
export const pdfRecordsRouter = Router()

// POST /api/pdf-records
pdfRecordsRouter.post('/pdf-records', async (req, res, next) => {
  try {
    const parsed = createPdfRecordSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        errors: parsed.error.flatten(),
      })
    }

    const created = await createPdfRecord(parsed.data)
    return res.status(201).json(created)
  } catch (error) {
    return next(error)
  }
})

// GET /api/pdf-records/:pdfId
pdfRecordsRouter.get('/pdf-records/:pdfId', async (req, res, next) => {
  try {
    const parsed = pdfRecordByIdParamsSchema.safeParse(req.params)

    if (!parsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Parámetros inválidos',
        errors: parsed.error.flatten(),
      })
    }

    const record = await getPdfRecordByPdfId(parsed.data.pdfId)
    if (!record) {
      return res.status(404).json({
        code: 'PDF_RECORD_NOT_FOUND',
        message: 'Registro PDF no encontrado.',
      })
    }

    return res.json(record)
  } catch (error) {
    return next(error)
  }
})

// POST /api/pdfs/generate
pdfRecordsRouter.post('/pdfs/generate', async (req, res, next) => {
  try {
    const parsed = generatePdfSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        errors: parsed.error.flatten(),
      })
    }

    const created = await generatePdfAndCreateRecord(parsed.data)
    return res.status(201).json(created)
  } catch (error) {
    return next(error)
  }
})
