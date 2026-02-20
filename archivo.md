# Hoja de ruta - Réplica Formulario EPS Sanitas (editable, 2 hojas, exportable)

## Objetivo real del sprint
Replicar el formulario de la referencia de EPS Sanitas en versión web editable, manteniendo una estructura visual muy cercana al formato original (dos hojas largas), y permitir descargarlo en PDF e imagen con el menor peso posible.

## Estado actual (lo que ya está hecho)
- Frontend en React + TypeScript + Vite listo.
- Ya existe un formulario base en `frontend/src/App.tsx` con React Hook Form + Zod.
- Ya hay validaciones importantes implementadas (nombres solo letras, documento/teléfono solo números, email, selects).

## Alcance de esta réplica
1. Maquetar el formulario completo de 2 páginas del formato EPS.
2. Dejar todos los campos principales editables en web.
3. Mantener secciones y jerarquía visual (encabezados, bloques, filas, subtablas).
4. Exportar a:
	 - PDF liviano (prioridad 1)
	 - Imagen JPG/PNG optimizada (prioridad 2)

---

## Estrategia técnica recomendada

### 1) Estructura del formulario por páginas
Crear una vista principal con dos contenedores grandes:
- `Page1EpsForm`
- `Page2EpsForm`

Cada página dividida en secciones reutilizables:
- `FormSection` (barra de título azul)
- `FormRow` (fila de celdas)
- `FormCell` (celda editable)
- `CheckCell` (si/no, sexo, régimen, etc.)

### 2) Estado y validación
Mantener `react-hook-form` + `zod` (ya instalado) y ampliar el esquema:
- Sección I: tipo de trámite, afiliación, tipo de cotizante, etc.
- Sección II: identificación principal.
- Sección III: datos complementarios.
- Sección IV: núcleo familiar y beneficiarios (tabla de múltiples filas).

### 3) Persistencia de avance
Guardar borrador automático con `localStorage`:
- clave sugerida: `eps-form-draft-v1`
- guardado con debounce (300-500 ms)
- botón de limpiar borrador

---

## Exportación liviana (punto crítico)

### Opción recomendada para PDF (más liviano)
Usar impresión HTML a PDF (vectorial) con estilos de impresión:
- crear estilos `@media print`
- tamaño de página A4
- saltos controlados con `page-break-before/after`
- botón `Descargar PDF` que lance `window.print()` sobre la vista limpia

Ventaja: genera PDF más liviano que rasterizar toda la página en imagen.

### Exportación a imagen (JPG/PNG)
Para descarga en imagen:
- usar `html-to-image` sobre cada página por separado
- exportar en JPG calidad media (`quality: 0.8`) para reducir peso
- permitir 2 archivos (`pagina-1.jpg`, `pagina-2.jpg`) o ZIP

### Regla de peso sugerida
- PDF total objetivo: < 1.5 MB (2 páginas)
- Cada JPG objetivo: 200 KB - 600 KB según resolución

---

## Plan de implementación por fases

## Fase A - Maquetación fiel (sin pulir lógica)
- [ ] Crear layout fijo de las 2 páginas con grillas y bordes.
- [ ] Replicar encabezado, títulos y celdas tipo formulario oficial.
- [ ] Marcar placeholders por campo para validar alineación visual.

## Fase B - Campos editables + validación
- [ ] Conectar todos los `input/select/checkbox` a RHF.
- [ ] Extender esquema Zod por bloques.
- [ ] Validar longitudes, tipos y fechas.

## Fase C - Guardado y recuperación
- [ ] Auto guardado local.
- [ ] Restaurar borrador al abrir.
- [ ] Botones: guardar, limpiar, reiniciar.

## Fase D - Descarga PDF/imagen optimizada
- [ ] Implementar hoja de estilos de impresión.
- [ ] Probar PDF en Chrome/Edge (tamaño y legibilidad).
- [ ] Implementar exportación JPG por página con compresión.

## Fase E - Ajustes finales
- [ ] Revisar consistencia visual con la imagen de referencia.
- [ ] Revisar ortografía de labels y nombres de campos.
- [ ] Prueba final desktop + móvil + impresión.

---

## Estructura de archivos sugerida

Dentro de `frontend/src/`:

- `modules/epsForm/EpsFormPage.tsx`
- `modules/epsForm/Page1EpsForm.tsx`
- `modules/epsForm/Page2EpsForm.tsx`
- `modules/epsForm/components/FormSection.tsx`
- `modules/epsForm/components/FormRow.tsx`
- `modules/epsForm/components/FormCell.tsx`
- `modules/epsForm/schema/epsForm.schema.ts`
- `modules/epsForm/types/epsForm.types.ts`
- `modules/epsForm/utils/exportPdf.ts`
- `modules/epsForm/utils/exportImage.ts`
- `modules/epsForm/utils/localDraft.ts`

---

## Librerías sugeridas

Instalar según la fase:

- Base formulario (ya):
	- `react-hook-form`
	- `zod`
	- `@hookform/resolvers`

- Exportación:
	- `html-to-image` (imagen)
	- `jspdf` (solo si se requiere PDF automático sin diálogo de impresión)

Nota: para peso mínimo, priorizar PDF por impresión CSS antes de `jspdf`.

---

## Criterios de aceptación finales

- [ ] El formulario replica visualmente la referencia en dos hojas.
- [ ] Todos los campos clave son editables y validables.
- [ ] Se puede descargar en PDF.
- [ ] Se puede descargar en imagen por página.
- [ ] El archivo descargado mantiene buena legibilidad y peso bajo.
- [ ] El usuario puede guardar borrador y continuar después.

---

## Próximo paso inmediato recomendado
Empezar por **Fase A**: construir primero la maqueta completa (2 páginas) sin validación avanzada, para asegurar que la réplica visual quede cerrada antes de meter toda la lógica de campos y exportación.
