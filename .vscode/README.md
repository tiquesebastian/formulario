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
- La validación actual es estructural (Zod básico) y acepta el payload del formulario como JSON.
- Siguiente paso recomendado: autenticar usuarios y registrar quién creó/actualizó cada formulario.
