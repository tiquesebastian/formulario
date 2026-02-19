# Proyecto: Formulario de Afiliación (React + Node.js)

## Descripción
Este proyecto implementa un formulario de afiliación inspirado en el formato de referencia, optimizado para web moderna con:
- tipado fuerte,
- validaciones estrictas,
- experiencia de usuario clara,
- diseño responsive,
- y posibilidad de integración con backend en Node.js.

## Stack propuesto
### Frontend
- React
- TypeScript
- Vite
- React Hook Form
- Zod
- CSS Modules o Tailwind (según preferencia)

### Backend
- Node.js
- Express
- TypeScript
- Zod para validación de payload en servidor

## ¿Se puede hacer con Node.js y React?
Sí, totalmente. Es una combinación ideal para este caso:
- **React** permite construir un formulario complejo, modular y reusable.
- **TypeScript** asegura tipado fuerte de campos y reglas.
- **Node.js/Express** permite validar y persistir datos de forma segura en servidor.

## Características funcionales mínimas
- Captura por secciones del formulario completo.
- Campos requeridos/opcionales por regla de negocio.
- Validación en cliente y servidor.
- Mensajes de error legibles.
- Botones de limpiar, guardar borrador y enviar.
- Posibilidad de imprimir/exportar vista.

## Reglas de validación clave
- Campos de nombre/apellido: solo letras (incluyendo tildes), espacios y caracteres válidos de idioma.
- Campos numéricos (documento, teléfono, códigos): solo números.
- Fechas válidas y no futuras cuando aplique.
- Longitud mínima/máxima según cada campo.
- Selects obligatorios en campos críticos.

## Requisitos no funcionales
- Responsive real (móvil, tablet, desktop).
- Accesibilidad básica (labels, foco visible, navegación por teclado).
- Rendimiento fluido en formularios largos.
- Código mantenible con componentes reutilizables.

## Estructura sugerida
```
formulario_sebtx/
  src/
    components/
    modules/
      formulario/
        sections/
        fields/
    validators/
    types/
    services/
    utils/
  server/
    src/
      routes/
      controllers/
      validators/
      types/
  README.md
  archivo.md
```

## Plan de implementación recomendado
1. Levantar frontend base con React + TypeScript.
2. Definir tipos y esquema de validación (Zod).
3. Maquetar secciones y campos en componentes reutilizables.
4. Integrar React Hook Form.
5. Añadir backend Node.js con endpoints básicos.
6. Conectar frontend-backend y probar flujo completo.
7. Ajustar responsive, accesibilidad y QA final.

## Comandos sugeridos (cuando arranquemos)
### Frontend
- `npm create vite@latest . -- --template react-ts`
- `npm install react-hook-form zod @hookform/resolvers`

### Backend (carpeta server)
- `npm init -y`
- `npm install express zod cors`
- `npm install -D typescript ts-node-dev @types/node @types/express`

## Definición de éxito
- Formulario usable y agradable visualmente.
- Reglas de validación cumpliendo negocio.
- Datos correctamente tipados de extremo a extremo.
- Arquitectura lista para evolucionar a producción.
