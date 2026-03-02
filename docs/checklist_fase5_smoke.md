# Checklist manual de smoke - Fase 5

Objetivo: validar el flujo completo MVP en ambiente local/QA.

## Precondiciones

- Backend arriba y conectado a base de datos.
- Frontend arriba con `VITE_API_BASE_URL` apuntando al backend.
- Catálogos (`departments`, `municipalities`) cargados en BD.

## Flujo smoke (E2E manual)

1. Abrir formulario y confirmar que el combo de departamento carga opciones.
2. Seleccionar un departamento y verificar que municipios se refresca con datos de ese departamento.
3. Intentar descargar PDF sin completar obligatorios.
   - Resultado esperado: bloqueo de descarga y alerta de validación.
4. Completar campos obligatorios del formulario.
5. Descargar PDF.
   - Resultado esperado: se ejecuta impresión y el PDF conserva formato de 2 hojas.
6. Verificar mensaje de éxito de trazabilidad en frontend.
7. Confirmar en backend/BD que existe registro en `pdf_records` con:
   - `pdfId`
   - `documentNumber`
   - `departmentId`
   - `municipalityId`
   - `createdAt`

## Verificaciones rápidas API (opcional)

- `GET /api/departments` responde `200` y lista no vacía.
- `GET /api/municipalities?departmentId=<id válido>` responde `200` y filtra por departamento.
- `POST /api/pdf-records` con payload válido responde `201`.
- `GET /api/municipalities?departmentId=abc` responde `400`.
- `POST /api/pdf-records` con `documentNumber` vacío responde `400`.
- `POST /api/pdf-records` con municipio que no corresponde al departamento responde `400`.
