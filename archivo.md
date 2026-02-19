# Tareas por hacer - Formulario de Afiliación

## Objetivo
Replicar el formulario de afiliación mostrado en la referencia, con una experiencia moderna, validación estricta de datos y diseño responsive.

## 1) Base del proyecto
- [ ] Inicializar proyecto con **React + TypeScript** (Vite recomendado).
- [ ] Configurar **Node.js** para scripts, build y entorno local.
- [ ] Definir estructura de carpetas (`src/components`, `src/modules/formulario`, `src/validators`, `src/types`).
- [ ] Configurar lint/format (`ESLint + Prettier`).

## 2) Modelo de datos fuertemente tipado
- [ ] Crear tipos/interfaces para todas las secciones del formulario.
- [ ] Definir tipos cerrados (`union`/`enum`) para campos con opciones fijas (sexo, régimen, tipo de afiliación, etc.).
- [ ] Separar tipos por secciones: trámite, identificación, datos complementarios, núcleo familiar.
- [ ] Crear mapeo de campos requerido/opcional según reglas de negocio.

## 3) Validaciones de entrada (estrictas)
- [ ] Implementar esquema de validación con **Zod** (o Yup) alineado a TypeScript.
- [ ] Regla: en campos de **nombre/apellido** no permitir números ni símbolos (solo letras, tildes y espacios).
- [ ] Regla: en campos de **número de documento/teléfono** permitir solo números.
- [ ] Validar longitudes mínimas/máximas por campo.
- [ ] Validar fechas coherentes (ej. fecha de nacimiento no futura).
- [ ] Mostrar mensajes claros por campo.

## 4) UI/UX del formulario
- [ ] Replicar visualmente la estructura por bloques y subtítulos.
- [ ] Crear componentes reutilizables (`TextField`, `SelectField`, `DateField`, `SectionCard`, `GridRow`).
- [ ] Agregar estados de foco, error y éxito bien visibles.
- [ ] Mantener navegación fluida por teclado y orden lógico de tabulación.
- [ ] Añadir acciones principales: guardar borrador, limpiar, enviar.

## 5) Responsive y accesibilidad
- [ ] Diseñar mobile-first.
- [ ] Breakpoints sugeridos: 360px, 768px, 1024px, 1280px.
- [ ] Reorganizar grillas complejas a 1 columna en móvil y múltiples columnas en desktop.
- [ ] Asegurar contraste, labels asociados e `aria-*` en controles.
- [ ] Verificar uso cómodo en pantallas pequeñas sin perder legibilidad.

## 6) Lógica y flujo
- [ ] Manejar estado con **React Hook Form** + resolver de Zod.
- [ ] Implementar validación en tiempo real y en submit.
- [ ] Añadir persistencia temporal (localStorage) para no perder avances.
- [ ] Preparar payload tipado para API.

## 7) Backend Node.js (opcional inicial, recomendado)
- [ ] Crear API básica con **Node.js + Express + TypeScript**.
- [ ] Endpoint `POST /afiliaciones` con validación de servidor.
- [ ] Endpoint `GET /afiliaciones/:id` para consulta.
- [ ] Estandarizar respuestas y manejo de errores.

## 8) Calidad y pruebas
- [ ] Pruebas unitarias de validadores y utilidades.
- [ ] Pruebas de componentes críticos del formulario.
- [ ] Prueba E2E del flujo principal de registro.
- [ ] Checklist QA: desktop, tablet, móvil, impresión.

## 9) Entregables
- [ ] Formulario funcional y responsive.
- [ ] Validaciones tipadas completas.
- [ ] Documentación de uso y despliegue.
- [ ] Guía de campos/reglas de negocio.

## Criterios de aceptación clave
- [ ] No se pueden escribir números en nombres/apellidos.
- [ ] No se pueden escribir letras en campos numéricos.
- [ ] El formulario se adapta correctamente a móvil y desktop.
- [ ] La experiencia es clara, rápida y agradable para el usuario final.
- [ ] El código está fuertemente tipado y mantenible.
