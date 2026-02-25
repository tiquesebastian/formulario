# Backend - Formulario EPS

API mínima para persistir formularios en Supabase (PostgreSQL) usando Express + TypeScript.

## Requisitos
- Node.js 20+
- Proyecto creado en Supabase

## 1) Configurar base de datos en Supabase
1. Abrir SQL Editor en Supabase.
2. Ejecutar el script: `src/sql/init.sql`.

Esto crea la tabla `affiliation_forms` y trigger de `updated_at`.

## 2) Variables de entorno
1. Copiar `.env.example` a `.env`.
2. Completar valores reales:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
SUPABASE_FORMS_TABLE=affiliation_forms
```

## 3) Ejecutar en local
```bash
npm install
npm run dev
```

Servidor: `http://localhost:4000`

## Build y comentarios en dist
- `npm run build` compila TypeScript y luego ejecuta un postbuild.
- El postbuild agrega comentarios explicativos automáticos en los archivos de `dist/`.
- Script responsable: `scripts/add-dist-banners.mjs`.

## Endpoints
- `GET /health`
- `POST /api/forms`
  - body:
    ```json
    {
      "status": "draft",
      "data": { "campo": "valor" }
    }
    ```
- `GET /api/forms/:id`
- `PUT /api/forms/:id`
  - body parcial:
    ```json
    {
      "status": "submitted",
      "data": { "campo": "valor actualizado" }
    }
    ```

## Notas importantes
- Este backend usa `SUPABASE_SERVICE_ROLE_KEY`; úsala solo en servidor.
- Validación server-side reforzada (Fase 3):
  - estructura de payload,
  - campos críticos (nombres, documento, teléfono, correo),
  - validación de fechas,
  - límite de tamaño de payload.
- Errores de API estandarizados con `code` + `message`:
  - `VALIDATION_ERROR`
  - `INVALID_ID`
  - `FORM_NOT_FOUND`
  - `EMPTY_UPDATE`
  - `INVALID_JSON_BODY`
  - `SUPABASE_*` (falla de persistencia / disponibilidad)
- Siguiente paso recomendado: autenticar usuarios y registrar quién creó/actualizó cada formulario.

## Pruebas críticas (Fase 3)
1. `POST /api/forms` con payload válido → `201`.
2. `POST /api/forms` con correo/teléfono inválido → `400` (`VALIDATION_ERROR`).
3. `GET /api/forms/:id` con ID no UUID (`1`, `01`) → `400` (`INVALID_ID`).
4. `GET /api/forms/:id` con UUID inexistente → `404` (`FORM_NOT_FOUND`).
5. `PUT /api/forms/:id` sin `status` ni `data` → `400` (`EMPTY_UPDATE`).
