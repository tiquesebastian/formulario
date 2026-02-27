import { Router } from 'express'
import { municipalitiesQuerySchema } from '../schemas/catalog.schema.js'
import {
  getDepartments,
  getMunicipalitiesByDepartmentId,
} from '../services/catalog.service.js'

// Router de catálogos para poblar selects dependientes en frontend.
export const catalogRouter = Router()

// GET /api/departments
catalogRouter.get('/departments', async (_req, res, next) => {
  try {
    const departments = await getDepartments()
    return res.json(departments)
  } catch (error) {
    return next(error)
  }
})

// GET /api/municipalities?departmentId=...
catalogRouter.get('/municipalities', async (req, res, next) => {
  try {
    const parsed = municipalitiesQuerySchema.safeParse(req.query)

    if (!parsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Parámetros inválidos',
        errors: parsed.error.flatten(),
      })
    }

    const municipalities = await getMunicipalitiesByDepartmentId(parsed.data.departmentId)
    return res.json(municipalities)
  } catch (error) {
    return next(error)
  }
})
