# Instalación en otro equipo (paso a paso)

Guía rápida para levantar el proyecto completo (frontend + backend + Supabase) en una máquina nueva.

## 1) Requisitos
- Git
- Node.js 20 o superior
- npm
- Cuenta y proyecto en Supabase

## 2) Clonar repositorio
```bash
git clone <URL_DEL_REPO>
cd formulario_sebtx
```

## 3) Configurar Base de Datos (Supabase)
1. Entrar al proyecto en Supabase.
2. Abrir `SQL Editor`.
3. Ejecutar el script:
   - `.vscode/src/sql/init.sql`
4. Verificar en `Table Editor` que exista `public.affiliation_forms`.

## 4) Configurar backend (.vscode)
> Nota: en este proyecto la API quedó en la carpeta `.vscode/`.

### 4.1 Instalar dependencias
```bash
cd .vscode
npm install
```

### 4.2 Variables de entorno
Crear archivo `.vscode/.env` con este contenido:

```env
PORT=4000
FRONTEND_ORIGIN=http://localhost:5173
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_CLAVE_SECRETA_SB_SECRET
SUPABASE_FORMS_TABLE=affiliation_forms
```

### 4.3 Levantar backend
```bash
npm run dev
```

Backend esperado en: `http://localhost:4000`

## 5) Configurar frontend
En otra terminal:

```bash
cd frontend
npm install
```

Crear `frontend/.env` (opcional, recomendado):

```env
VITE_API_BASE_URL=http://localhost:4000
```

Levantar frontend:

```bash
npm run dev
```

## 6) Prueba rápida de API por terminal (PowerShell)
Con backend encendido:

```powershell
Invoke-RestMethod -Method Get -Uri "http://localhost:4000/health" | ConvertTo-Json
```

Crear formulario de prueba:

```powershell
$body = '{"status":"draft","data":{"prueba":"api-ok"}}'
Invoke-RestMethod -Method Post -Uri "http://localhost:4000/api/forms" -ContentType "application/json" -Body $body | ConvertTo-Json -Depth 8
```

Si todo está bien, retorna un `id` UUID.

## 7) Prueba funcional desde UI
1. Abrir la URL del frontend.
2. Diligenciar el formulario.
3. Clic en `Guardar y continuar`.
4. Debe mostrar confirmación de guardado e ID.

## 8) Pruebas críticas recomendadas (Fase 3)
- Consultar con ID inválido (`1` o `01`) debe responder `400`.
- Consultar con UUID inexistente debe responder `404`.
- Enviar datos inválidos (correo mal formado / teléfono con letras) debe responder `400`.
- Confirmar que respuesta de error incluya `code` y `message`.

## Problemas comunes
- `fetch failed` al guardar:
  - Revisar `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `.vscode/.env`.
  - Confirmar que la clave sea `sb_secret_...` (no la pública).
  - Reiniciar backend después de cambiar `.env`.

- Error CORS:
  - Confirmar `FRONTEND_ORIGIN=http://localhost:5173`.

- Tabla no existe:
  - Re-ejecutar `.vscode/src/sql/init.sql` en Supabase.
