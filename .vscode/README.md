# Backend - Formulario EPS

API Express + TypeScript para:
- gestión de formularios (`/api/forms`),
- catálogos de ubicación (`/api/departments`, `/api/municipalities`),
- trazabilidad de PDFs (`/api/pdf-records`) en SQL Server.

## Requisitos
- Node.js 20+
- SQL Server con tablas de Fase 2 creadas (`departments`, `municipalities`, `pdf_records`)

## Variables de entorno
Configura `.env` en esta carpeta (`.vscode/.env`) con al menos:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173

SQLSERVER_HOST=192.168.100.47
SQLSERVER_PORT=1433
SQLSERVER_USER=Desarrollo
SQLSERVER_PASSWORD=TU_PASSWORD
SQLSERVER_DATABASE=formulario
SQLSERVER_ENCRYPT=true
SQLSERVER_TRUST_SERVER_CERTIFICATE=true
```

## Ejecutar en local
```bash
npm install
npm run dev
```

Health check:
- `GET /health`

---

## Contratos API (Fase 3)

### 1) GET `/api/departments`

`200 OK`
```json
[
  {
    "id": 29,
    "code": "91",
    "name": "Amazonas"
  }
]
```

`500 Internal Server Error`
```json
{
  "code": "DEPARTMENTS_READ_FAILED",
  "message": "No fue posible consultar los departamentos.",
  "details": {
    "reason": "..."
  }
}
```

### 2) GET `/api/municipalities?departmentId=...`

Parámetros:
- `departmentId` (number, entero positivo, obligatorio)

`200 OK`
```json
[
  {
    "id": 969,
    "departmentId": 29,
    "code": "263",
    "name": "EL ENCANTO"
  }
]
```

`400 Bad Request` (validación)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Parámetros inválidos",
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "departmentId": ["departmentId debe ser mayor a 0"]
    }
  }
}
```

`404 Not Found`
```json
{
  "code": "DEPARTMENT_NOT_FOUND",
  "message": "Departamento no encontrado."
}
```

`500 Internal Server Error`
```json
{
  "code": "MUNICIPALITIES_READ_FAILED",
  "message": "No fue posible consultar los municipios.",
  "details": {
    "reason": "..."
  }
}
```

### 3) POST `/api/pdf-records`

Body requerido:
```json
{
  "pdfId": "99e9f235-2301-4e27-b8c5-71c017408b55",
  "documentNumber": "1234567890",
  "departmentId": 29,
  "municipalityId": 969,
  "createdAt": "2026-02-27T17:08:35.000Z",
  "pdfUrl": "https://.../formulario.pdf"
}
```

Notas:
- `documentNumber` es obligatorio y no vacío.
- `municipalityId` debe pertenecer al `departmentId` enviado.

`201 Created`
```json
{
  "id": 1,
  "pdfId": "99e9f235-2301-4e27-b8c5-71c017408b55",
  "documentNumber": "1234567890",
  "departmentId": 29,
  "municipalityId": 969,
  "createdAt": "2026-02-27T17:08:35.000Z",
  "pdfUrl": null
}
```

`400 Bad Request` (validación)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Datos inválidos",
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "documentNumber": ["documentNumber es obligatorio"]
    }
  }
}
```

`400 Bad Request` (regla de negocio)
```json
{
  "code": "MUNICIPALITY_DEPARTMENT_MISMATCH",
  "message": "El municipio no pertenece al departamento enviado."
}
```

`404 Not Found`
```json
{
  "code": "MUNICIPALITY_NOT_FOUND",
  "message": "Municipio no encontrado."
}
```

`500 Internal Server Error`
```json
{
  "code": "PDF_RECORD_CREATE_FAILED",
  "message": "No fue posible crear el registro PDF."
}
```

### 4) GET `/api/pdf-records/:pdfId`

`200 OK`
```json
{
  "id": 2,
  "pdfId": "6c470fda-e9c7-452b-90aa-e3f29742a514",
  "documentNumber": "1020304050",
  "departmentId": 29,
  "municipalityId": 969,
  "createdAt": "2026-02-27T18:04:49.000Z",
  "pdfUrl": "/generated-pdfs/6c470fda-e9c7-452b-90aa-e3f29742a514.pdf"
}
```

`404 Not Found`
```json
{
  "code": "PDF_RECORD_NOT_FOUND",
  "message": "Registro PDF no encontrado."
}
```

`500 Internal Server Error`
```json
{
  "code": "PDF_RECORD_READ_FAILED",
  "message": "No fue posible consultar el registro PDF."
}
```

### 5) POST `/api/pdfs/generate`

Body requerido:
```json
{
  "documentNumber": "1020304050",
  "departmentId": 29,
  "municipalityId": 969
}
```

`201 Created`
```json
{
  "id": 2,
  "pdfId": "6c470fda-e9c7-452b-90aa-e3f29742a514",
  "documentNumber": "1020304050",
  "departmentId": 29,
  "municipalityId": 969,
  "createdAt": "2026-02-27T18:04:49.000Z",
  "pdfUrl": "/generated-pdfs/6c470fda-e9c7-452b-90aa-e3f29742a514.pdf"
}
```

`400 Bad Request` (validación)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Datos inválidos",
  "errors": {
    "formErrors": [],
    "fieldErrors": {
      "documentNumber": ["documentNumber es obligatorio"]
    }
  }
}
```

`404 Not Found`
```json
{
  "code": "MUNICIPALITY_NOT_FOUND",
  "message": "Municipio no encontrado."
}
```

`500 Internal Server Error`
```json
{
  "code": "PDF_RECORD_CREATE_FAILED",
  "message": "No fue posible crear el registro PDF."
}
```

---

## Logs básicos
- Log por request: método + ruta + status + duración en ms.
- Log de error controlado/no controlado en middleware global.

## Arquitectura
- `routes` → `services` → `repositories`
- Validación de entrada con `zod`
- Errores estandarizados con `HttpError` (`status`, `code`, `message`, `details`)
