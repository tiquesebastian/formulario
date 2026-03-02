# Guía de despliegue en Azure DevOps (Proyecto Formulario EPS)

Esta guía está adaptada a tu estructura actual:
- `frontend/` (React + Vite)
- `.vscode/` (Backend Express + TypeScript)
- Migraciones SQL en `.vscode/src/sql/migrations`

## 1) Preparación inicial en Azure DevOps

## 1.1 Crear proyecto
1. En Azure DevOps, crea un Project (ej: `formulario-eps`).
2. Elige visibilidad privada.

## 1.2 Subir código
Opciones:
- **Opción A (recomendada):** conectar GitHub como repositorio fuente.
- **Opción B:** usar Azure Repos y hacer `git remote add` + `git push`.

## 1.3 Crear ambientes
En Pipelines > Environments crea:
- `qa`
- `prod`

## 1.4 Service connections (si despliegas a Azure)
Dependiendo de destino:
- Azure Web App / App Service (backend)
- Azure Static Web Apps / Storage Static Website (frontend)

## 2) Variables y secretos por ambiente

Usa Variable Groups o Azure Key Vault (recomendado para secretos).

Variables backend SQL Server:
- `SQLSERVER_HOST`
- `SQLSERVER_PORT`
- `SQLSERVER_USER`
- `SQLSERVER_PASSWORD` (secreto)
- `SQLSERVER_DATABASE`
- `SQLSERVER_ENCRYPT`
- `SQLSERVER_TRUST_SERVER_CERTIFICATE`
- `FRONTEND_ORIGIN`
- `PORT`

Variables frontend:
- `VITE_API_BASE_URL`

Variables opcionales:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (secreto)
- `SUPABASE_FORMS_TABLE`

## Recomendación de seguridad para tu caso
Como tu SQL Server es corporativo/local:
- No expongas la BD a internet.
- Ejecuta migraciones con agente **self-hosted** dentro de la red interna.
- Usa usuario SQL de mínimos privilegios para migraciones.

## 3) Pipeline CI/CD implementado

Stages (ya definidos en `azure-pipelines.yml`):
1. **BuildAndTest**
   - Backend: `npm ci`, `npm run build`, `npm run test`
   - Frontend: `npm ci`, `npm run build`, `npm run test`
2. **MigrateDB (QA/Prod)**
   - Ejecutar `.vscode/scripts/run-migrations.mjs`
   - Solo si hay conectividad SQL (ideal: self-hosted agent)
3. **DeployBackend**
4. **DeployFrontend**
5. **Healthcheck**

## 4) Pipeline listo en repo

Archivo creado:
- `azure-pipelines.yml`

Parámetros manuales del pipeline:
- `targetEnvironment` (`qa` o `prod`)
- `runMigrations` (`true/false`)
- `runDeploy` (`true/false`)

Variable groups esperados:
- `vg-formulario-qa`
- `vg-formulario-prod`

Variables mínimas en cada Variable Group:
- `AZURE_SERVICE_CONNECTION`
- `BACKEND_WEBAPP_NAME`
- `FRONTEND_STORAGE_ACCOUNT`
- `BACKEND_HEALTHCHECK_URL`
- `SELF_HOSTED_POOL` (solo para migraciones SQL internas)
- `SQLSERVER_HOST`
- `SQLSERVER_PORT`
- `SQLSERVER_USER`
- `SQLSERVER_PASSWORD` (secreto)
- `SQLSERVER_DATABASE`
- `SQLSERVER_ENCRYPT`
- `SQLSERVER_TRUST_SERVER_CERTIFICATE`

Variables opcionales (si usas CDN):
- `AZURE_CDN_PROFILE`
- `AZURE_CDN_ENDPOINT`
- `AZURE_CDN_RESOURCE_GROUP`

## 4.1 Plantilla rápida (copiar/pegar en Variable Group QA)

Usa estos nombres exactos en `vg-formulario-qa`:

```text
AZURE_SERVICE_CONNECTION=<nombre-service-connection>
BACKEND_WEBAPP_NAME=<nombre-webapp-backend-qa>
FRONTEND_STORAGE_ACCOUNT=<storageaccountqa>
BACKEND_HEALTHCHECK_URL=https://<backend-qa>/health
SELF_HOSTED_POOL=<nombre-pool-interno>

SQLSERVER_HOST=192.168.100.47
SQLSERVER_PORT=1433
SQLSERVER_USER=Desarrollo
SQLSERVER_PASSWORD=<secreto>
SQLSERVER_DATABASE=formulario
SQLSERVER_ENCRYPT=true
SQLSERVER_TRUST_SERVER_CERTIFICATE=true

AZURE_CDN_PROFILE=<opcional>
AZURE_CDN_ENDPOINT=<opcional>
AZURE_CDN_RESOURCE_GROUP=<opcional>
```

Para `vg-formulario-prod`, crea las mismas claves con valores productivos.

## 4.2 Orden recomendado de ejecución

1. Primer corrida técnica (sin tocar BD):
   - `targetEnvironment=qa`
   - `runMigrations=false`
   - `runDeploy=true`
2. Cuando exista conectividad segura SQL desde agente interno:
   - `targetEnvironment=qa`
   - `runMigrations=true`
   - `runDeploy=true`
3. Solo después de QA en verde, repetir en `prod`.

## 5) Migraciones SQL automáticas

Ya tienes el script listo en backend:
- `npm run migrate:sql`

Y usa:
- `.vscode/scripts/run-migrations.mjs`
- `dbo.schema_migrations` para control de versiones ejecutadas

## 6) Rollback básico recomendado

## Aplicación
- Backend: redeploy de build anterior (artifact/tag previo).
- Frontend: redeploy de build anterior.

## Base de datos
- En MVP: preferir scripts idempotentes y forward-fix.
- Si una migración cambia estructura crítica, preparar script de reversa explícito.

## 7) Checklist de salida a QA

- Build backend y frontend en verde.
- Tests en verde.
- Migraciones en verde.
- `GET /health` responde 200.
- Flujo funcional: formulario -> descarga PDF -> `POST /api/pdf-records` exitoso.

## 8) Paso a producción

- Reusar el mismo pipeline con `vg-formulario-prod`.
- Activar aprobación manual en environment `prod`.
- Ejecutar primero en QA y validar smoke test.

---

