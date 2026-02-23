# Formulario EPS (réplica digital)

Este repositorio contiene la réplica en código de un formulario físico de EPS, conservando estructura visual, orden de secciones y lógica de diligenciamiento.

## Estado actual
- Frontend implementado en React + TypeScript + Vite.
- Backend inicial implementado en Express + TypeScript + Supabase.
- Formulario extenso por secciones (I a XII) ya maquetado y funcional.
- Validaciones de entrada en cliente (solo letras / solo números según campo).
- Carga de imágenes para firmas, sello y sticker.
- Exportación a PDF vía impresión del navegador con separación de hojas.

## Estructura del repo
- `frontend/`: aplicación principal.
- `.vscode/`: API para persistencia de formularios en Supabase.
- `archivo.md`: material de referencia.

## Documentación detallada
La guía completa (arquitectura, campos, reglas, PDF, firmas, próximos pasos backend) está en:

- `frontend/README.md`
- `.vscode/README.md`
- `README-INSTALACION.md`

## Próximo paso recomendado
Implementar backend + base de datos para:
- persistencia de formularios,
- catálogos dinámicos (departamentos, municipios, ARL, pensiones, etc.),
- trazabilidad y auditoría,
- generación de PDF en servidor si se requiere salida 100% estandarizada.
