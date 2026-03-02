import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

function asInput(container: HTMLElement, name: string): HTMLInputElement {
  const element = container.querySelector(`[name="${name}"]`)
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`No se encontró input ${name}`)
  }
  return element
}

function asField(container: HTMLElement, name: string): HTMLInputElement | HTMLSelectElement {
  const element = container.querySelector(`[name="${name}"]`)
  if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement)) {
    throw new Error(`No se encontró campo ${name}`)
  }
  return element
}

function asSelect(container: HTMLElement, name: string): HTMLSelectElement {
  const element = container.querySelector(`[name="${name}"]`)
  if (!(element instanceof HTMLSelectElement)) {
    throw new Error(`No se encontró select ${name}`)
  }
  return element
}

describe('Fase 5 - frontend flujo crítico', () => {
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
  const printMock = vi.spyOn(window, 'print').mockImplementation(() => {})

  beforeEach(() => {
    vi.clearAllMocks()

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input)

        if (url.includes('/api/departments')) {
          return {
            ok: true,
            json: async () => [{ id: 29, code: '91', name: 'AMAZONAS' }],
          }
        }

        if (url.includes('/api/municipalities?departmentId=29')) {
          return {
            ok: true,
            json: async () => [{ id: 969, departmentId: 29, code: '263', name: 'EL ENCANTO' }],
          }
        }

        if (url.includes('/api/pdf-records')) {
          return {
            ok: true,
            json: async () => ({ id: 1, pdfId: 'test-pdf-id' }),
          }
        }

        throw new Error(`URL no mockeada: ${url}`)
      }),
    )

    if (!globalThis.crypto?.randomUUID) {
      Object.defineProperty(globalThis, 'crypto', {
        value: { randomUUID: () => 'test-random-uuid' },
        configurable: true,
      })
    }
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('cambio de departamento refresca municipios', async () => {
    const { container } = render(<App />)

    await waitFor(() => {
      const departmentSelect = asSelect(container, 'nacimientoDepartamento')
      expect(departmentSelect.querySelector('option[value="29"]')).toBeInTheDocument()
    })

    const departmentSelect = asSelect(container, 'nacimientoDepartamento')
    fireEvent.change(departmentSelect, { target: { value: '29' } })

    await waitFor(() => {
      const municipalitySelect = asSelect(container, 'nacimientoMunicipio')
      expect(municipalitySelect.querySelector('option[value="969"]')).toBeInTheDocument()
    })
  })

  it('bloquea descarga si faltan obligatorios', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Descargar PDF' }))

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        'Completa los campos obligatorios marcados con * antes de descargar.',
      )
    })

    const fetchMock = vi.mocked(globalThis.fetch)
    expect(fetchMock).not.toHaveBeenCalledWith(
      expect.stringContaining('/api/pdf-records'),
      expect.anything(),
    )
  })

  it('registra trazabilidad en backend y confirma éxito', async () => {
    const { container } = render(<App />)

    fireEvent.change(asSelect(container, 'radicadoDia'), { target: { value: '27' } })
    fireEvent.change(asSelect(container, 'radicadoMes'), { target: { value: '02' } })
    fireEvent.change(asSelect(container, 'radicadoAnio'), { target: { value: '2026' } })
    fireEvent.change(asInput(container, 'codigoEps'), { target: { value: '123' } })
    fireEvent.change(asInput(container, 'primerApellido'), { target: { value: 'Perez' } })
    fireEvent.change(asInput(container, 'segundoApellido'), { target: { value: 'Gomez' } })
    fireEvent.change(asInput(container, 'primerNombre'), { target: { value: 'Juan' } })
    fireEvent.change(asInput(container, 'segundoNombre'), { target: { value: 'Jose' } })
    fireEvent.change(asInput(container, 'numeroDocumento'), { target: { value: '1234567' } })
    fireEvent.change(asInput(container, 'nacimientoPais'), { target: { value: 'Colombia' } })
    fireEvent.change(asField(container, 'fechaNacimientoDia'), { target: { value: '12' } })
    fireEvent.change(asField(container, 'fechaNacimientoMes'), { target: { value: '07' } })
    fireEvent.change(asField(container, 'fechaNacimientoAnio'), { target: { value: '1990' } })
    fireEvent.change(asInput(container, 'correo'), { target: { value: 'qa@eps.test' } })
    fireEvent.change(asInput(container, 'telefono'), { target: { value: '3001234567' } })

    await waitFor(() => {
      const departmentSelect = asSelect(container, 'nacimientoDepartamento')
      expect(departmentSelect.querySelector('option[value="29"]')).toBeInTheDocument()
    })

    fireEvent.change(asSelect(container, 'nacimientoDepartamento'), { target: { value: '29' } })

    await waitFor(() => {
      const municipalitySelect = asSelect(container, 'nacimientoMunicipio')
      expect(municipalitySelect.querySelector('option[value="969"]')).toBeInTheDocument()
    })

    fireEvent.change(asSelect(container, 'nacimientoMunicipio'), { target: { value: '969' } })

    fireEvent.click(screen.getByRole('button', { name: 'Descargar PDF' }))

    await waitFor(() => {
      expect(printMock).toHaveBeenCalledTimes(1)
    })

    expect(await screen.findByText(/Registro PDF exitoso/)).toBeInTheDocument()
  })
})
