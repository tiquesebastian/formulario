# Formulario EPS (réplica digital)

Este repositorio contiene la réplica en código de un formulario físico de EPS, conservando estructura visual, orden de secciones y lógica de diligenciamiento.

## Estado actual
- Frontend implementado en React + TypeScript + Vite.
- Backend implementado en Express + TypeScript (SQL Server para catálogos/trazabilidad y fallback local para formularios en desarrollo).
- Formulario extenso por secciones (I a XII) ya maquetado y funcional.
- Validaciones de entrada en cliente (solo letras / solo números según campo).
- Validaciones server-side reforzadas (Fase 3) para campos críticos, fechas y tamaño de payload.
- Manejo de errores estandarizado en API (códigos claros para validación, ID inválido, no encontrado y fallas de BD/red).
- Carga de imágenes para firmas, sello y sticker.
- Exportación a PDF vía impresión del navegador con separación de hojas.
- CI/CD base y release manual configurados (Fase 7).

## Estructura del repo
- `frontend/`: aplicación principal.
- `.vscode/`: API para persistencia de formularios en Supabase.
- `archivo.md`: material de referencia.

## Documentación detallada
La guía completa (arquitectura, campos, reglas, PDF, firmas, próximos pasos backend) está en:

- `frontend/README.md`
- `.vscode/README.md`
- `README-INSTALACION.md`
- `docs/fase7_despliegue.md`

## Pruebas críticas recomendadas (cierre Fase 3)
- Crear formulario válido (201).
- Consultar por UUID válido existente (200).
- Consultar por ID inválido (400).
- Consultar por UUID inexistente (404).
- Guardar payload con correo/teléfono inválido (400 con `VALIDATION_ERROR`).
- Verificar respuesta ante falla de Supabase/red (502/503).
