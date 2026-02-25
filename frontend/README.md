# Frontend - Formulario EPS (Réplica digital)

Aplicación React + TypeScript que replica un formulario físico de EPS en formato web, manteniendo la distribución visual por secciones, casillas y bloques tabulares.

## Objetivo
- Replicar fielmente el formulario físico en web.
- Permitir diligenciamiento completo con validaciones de entrada.
- Habilitar exportación PDF respetando el diseño y separación por hojas.
- Dejar base preparada para backend y base de datos.

## Stack
- React 19
- TypeScript
- Vite
- React Hook Form
- Zod
- Tailwind CSS

## Scripts
- `npm run dev`: entorno de desarrollo.
- `npm run build`: compilación TypeScript + build producción.
- `npm run preview`: vista previa de build.
- `npm run lint`: validación de lint.

## Estructura clave
- `src/App.tsx`
  - Configuración principal del formulario.
  - Sanitización global por tipo de campo (solo letras / solo números).
  - Cálculo automático de `Total Anexos`.
  - Botón `Descargar PDF` vía `window.print()`.

- `src/modules/epsForm/sections/`
  - Secciones visuales del formulario (I a XII y bloques finales).
  - Componente principal actual: `BeneficiariesSection.tsx` (incluye gran parte de la hoja 2).

- `src/modules/epsForm/schema/affiliationSchema.ts`
  - Esquema Zod de todo el formulario.
  - `defaultValues` completos.

- `src/modules/epsForm/utils/inputSanitizers.ts`
  - Reglas para detectar campos alfabéticos y numéricos.
  - Limpieza en tiempo real para evitar entradas inválidas.

- `src/modules/epsForm/config/catalogs.ts`
  - Catálogos centralizados (base para conexión futura a backend).

## Funcionalidad implementada

### 0) Estado funcional actual
- Frontend conectado a backend (`VITE_API_BASE_URL`) para guardar y consultar formularios.
- Flujo de guardado en UI: crea (`POST`) si no hay ID cargado y actualiza (`PUT`) cuando ya existe ID.
- Consulta por ID desde la UI para reabrir formularios previamente guardados.

### 1) Validación de entrada en tiempo real
- Campos alfabéticos: bloquean números y símbolos no permitidos.
- Campos numéricos: bloquean letras.
- Mantiene coherencia entre UI y datos enviados.

### 2) Bloques replicados del formulario
- Secciones de identificación, complementarios, núcleo familiar y beneficiarios.
- Secciones de aportante, novedades, declaraciones, anexos, entidad territorial y funcionario.
- Bloques de firmas, observaciones y celdas administrativas finales.

### 3) Firmas y anexos de imagen
- Firma por carga de imagen (`PNG/JPG`) en:
  - firma del cotizante,
  - firma del aportante,
  - firma del funcionario (campo 95).
- Carga de imagen para:
  - sello de radicación,
  - sticker de procesamiento.
- Incluye preview y botón para limpiar cada imagen.

### 4) Sección X. Anexos
- Cantidad de documentos de identidad anexos con campos numéricos:
  - `CN`, `RC`, `TI`, `CC`, `CE`, `PA`, `CD`, `SC`, `PT`.
- Ítems `83` a `91` con casilla de verificación.
- `Total Anexos` automático:
  - suma de cantidades numéricas,
  - +1 por cada casilla marcada en 83-91.

### 5) Exportación PDF
- Botón `Descargar PDF` en `App`.
- Usa impresión del navegador para `Guardar como PDF`.
- Estilos de impresión activos:
  - formato A4,
  - ajuste de color,
  - ocultar controles (`.no-print`),
  - salto de página entre hoja 1 y hoja 2 (`.print-page-break`).

## Flujo recomendado de uso
1. Diligenciar formulario.
2. Cargar firmas/sello/sticker si aplica.
3. Revisar totales automáticos (anexos).
4. Clic en `Descargar PDF`.
5. En el diálogo del navegador elegir `Guardar como PDF`.

## Estado de backend/BD
El frontend ya está integrado con backend y persistencia en Supabase:
- Guardado de formularios con API REST.
- Reapertura por ID (UUID).
- Actualización de formularios existentes.

Para detalles de API, validaciones server-side y códigos de error, ver `.vscode/README.md`.

## Notas de mantenimiento
- Mantener consistencia visual: bordes, paleta `sky`, tipografías compactas.
- Evitar cambios estructurales en tablas si no provienen del formulario físico.
- Cualquier nuevo campo debe reflejarse en:
  1) UI,
  2) esquema Zod,
  3) `defaultValues`,
  4) sanitizadores (si aplica).
