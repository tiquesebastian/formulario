import { Router } from 'express'
import { z } from 'zod'
import { createFormSchema, updateFormSchema } from '../schemas/form.schema.js'
import { createForm, getFormById, updateFormById } from '../services/forms.service.js'

// Router REST de formularios: create, read by id y update by id.

// Validador de parámetros de ruta para IDs de formulario.
const idSchema = z.string().uuid('ID inválido')

export const formRouter = Router()

// Crear formulario.
formRouter.post('/', async (req, res, next) => {
  try {
    // Validación de entrada antes de tocar base de datos.
    const parsed = createFormSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        errors: parsed.error.flatten(),
      })
    }

    const created = await createForm(parsed.data)
    return res.status(201).json(created)
  } catch (error) {
    return next(error)
  }
})

// Consultar formulario por ID.
formRouter.get('/:id', async (req, res, next) => {
  try {
    // La API solo acepta UUID para evitar ambigüedad entre identificadores.
    const idParsed = idSchema.safeParse(req.params.id)
    if (!idParsed.success) {
      return res.status(400).json({
        code: 'INVALID_ID',
        message: idParsed.error.issues[0]?.message ?? 'ID inválido',
      })
    }

    const form = await getFormById(idParsed.data)
    if (!form) {
      return res.status(404).json({ code: 'FORM_NOT_FOUND', message: 'Formulario no encontrado' })
    }

    return res.json(form)
  } catch (error) {
    return next(error)
  }
})

// Actualizar formulario por ID (estado y/o payload completo del formulario).
formRouter.put('/:id', async (req, res, next) => {
  try {
    const idParsed = idSchema.safeParse(req.params.id)
    if (!idParsed.success) {
      return res.status(400).json({
        code: 'INVALID_ID',
        message: idParsed.error.issues[0]?.message ?? 'ID inválido',
      })
    }

    const bodyParsed = updateFormSchema.safeParse(req.body)
    if (!bodyParsed.success) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        errors: bodyParsed.error.flatten(),
      })
    }

    // Regla de negocio: un update vacío no tiene efecto y se rechaza explícitamente.
    if (!bodyParsed.data.status && !bodyParsed.data.data) {
      return res.status(400).json({
        code: 'EMPTY_UPDATE',
        message: 'Envía al menos status o data para actualizar',
      })
    }

    const updated = await updateFormById(idParsed.data, bodyParsed.data)
    if (!updated) {
      return res.status(404).json({ code: 'FORM_NOT_FOUND', message: 'Formulario no encontrado' })
    }

    return res.json(updated)
  } catch (error) {
    return next(error)
  }
})
