# Fase 7 - Preparación de despliegue

Esta guía deja un flujo repetible para build, test, migraciones SQL, deploy y rollback básico.

## 1) Variables por ambiente

Backend (`.vscode`):
- `.env.dev.example`
- `.env.qa.example`
- `.env.prod.example`

Frontend (`frontend`):
- `.env.dev.example`
- `.env.qa.example`
- `.env.prod.example`

> No subir secretos reales al repositorio. Usar secretos del proveedor CI/CD.

## 2) Workflows disponibles

En `.github/workflows/`:
- `ci.yml`: build + test de frontend y backend en `push`/`pull_request`.
- `release.yml`: release manual (qa/prod), migraciones SQL opcionales, deploy por webhook y healthcheck.
- `rollback.yml`: rollback manual por versión.

## 3) Secrets requeridos (GitHub Actions)

Para migraciones SQL:
- `SQLSERVER_HOST`
- `SQLSERVER_PORT`
- `SQLSERVER_USER`
- `SQLSERVER_PASSWORD`
- `SQLSERVER_DATABASE`
- `SQLSERVER_ENCRYPT`
- `SQLSERVER_TRUST_SERVER_CERTIFICATE`

Para deploy:
- `BACKEND_DEPLOY_WEBHOOK`
- `FRONTEND_DEPLOY_WEBHOOK`

Para healthcheck:
- `BACKEND_HEALTHCHECK_URL`

Para rollback:
- `ROLLBACK_DEPLOY_WEBHOOK`

## 4) Migraciones SQL automatizadas

Script backend:
- `npm run migrate:sql`

Características:
- Lee migraciones desde `.vscode/src/sql/migrations/*.sql` en orden.
- Mantiene historial en `dbo.schema_migrations`.
- No re-ejecuta versiones ya aplicadas.
- Soporta batches separados por `GO`.

Migraciones iniciales incluidas:
- `001_create_core_tables.sql`
- `002_fix_bogota_name.sql`

## 5) Release recomendado (qa/prod)

1. Ejecutar workflow `Release` manualmente.
2. Elegir ambiente (`qa` o `prod`).
3. Activar `run_migrations=true` cuando aplique.
4. Verificar healthcheck de backend al terminar.

## 6) Rollback básico

1. Ejecutar workflow `Rollback`.
2. Seleccionar ambiente.
3. Indicar versión/tag a restaurar.
4. Validar `BACKEND_HEALTHCHECK_URL` tras rollback.

## 7) Validación mínima post-deploy

- `GET /health` responde 200.
- Frontend carga y consulta `GET /api/departments`.
- Flujo principal completo: llenar formulario → descargar PDF → `POST /api/pdf-records` exitoso.

## Recordatorio pendiente (Azure DevOps)

- Mientras el runner no tenga acceso a la red interna de SQL Server, ejecutar releases con migraciones desactivadas.
- Cuando se migre a Azure DevOps y exista conectividad segura a la BD corporativa, volver a activar migraciones automáticas en el release (`run_migrations=true` o stage equivalente de migraciones).
- Validar en QA primero que el stage de migraciones quede en verde antes de habilitarlo en producción.
