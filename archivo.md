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





# Plan Concertado (para cerrar el formulario de una vez)

Meta final (definida): formulario 100% operativo con guardado real, edición por ID, PDF, validaciones y despliegue.
Duración sugerida: 8–10 días hábiles, con cierre por hitos verificables.

# Fase 1 — Cierre funcional UI (Día 1-2)

Revisar campo por campo contra el físico y congelar estructura final.
Ajustar últimos textos, casillas y comportamiento de firma/sello/sticker.
Criterio de cierre: “sin pendientes visuales” + checklist firmado.

-Parte I: bien todo parecido visualmente y funcionalemente.

-parte II: faltaria hacer menus desplegables de tipo de identificacion: 
"CC.cedula de cuidadania"
"TI. Tarjeta de Identidad"
menus desplegables de Departamento y Municipio segun Departamento
desplegable para fecha de nacimiento o calendario y que se acomode al formulario 
sin dañar o modificar su estructura visual.

-parte III:

ETNIA DESPLEGABLE:

01.Indígena

02.Gitano(a) o Rrom

03.Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina

04.Palenquero(a) de San Basilio

05.Negro(a), Mulato(a), Afrocolombiano(a) o Afrodescendiente

06.Ninguno de los anteriores

21. Grupo de poblacion especial dezplegable:

1-Habitante de la Calle
2-Población infantil abandonada a cargo de ICBF
6-Menores desvinculados del conflicto armado bajo la protección del ICBF
8-Población desmovilizada y/op miembros del grupo armado ilegal que celebren acuerdos de paz con el Gobierno Nacional
9-Victimas del conflicto armado interno
10-Población infantil vulnerable bajo protección de instituciones diferentes al ICBF
11-Programa en protección a testigos
14-Población reclusa a cargo de la entidad territorial
16-Adulto Mayor en centros de protección
17-Comunidades indígenas
18-Rrom (Gitano)
22-Personas en prisión domiciliaria a cargo del INPEC
23-Personas que dejen de ser madres comunitarias
24-Migrantes colombianos repatriados que han retornado voluntariamente al país o han sido deportados o expulsados de territorio extranjero
25-Adolescentes y jóvenes a cargo del ICBF en el sistema de responsabilidad penal para adolescentes
26-Miembros de los grupos armados al margen de la ley que celebren acuerdos de paz con el Gobierno Nacional
27-Recién nacidos y menores de edad de padres no afiliados
28-Los voluntarios acreditados y activos de la Defensa Civil, Cruz Roja y Cuerpo de Bomberos y su núcleo familiar
29-Personas con discapacidad de escasos recursos y en condición de abandono en centros de protección
30-Migrante venezonalo con PEP e hijos menores de edad con documento válido
32-Personas que se encuentren detendidas sin condena o cumpliendo medida de aseguramiento en centros de detención transitoria
33-Veteranos de la Fuerza Pública

22. Administradora de Riesgos Laborales - ARL

1.Positiva

2.SURA

3.Colmena (Riesgos Profesionales Colmena S.A)

4.Bolívar (Compañía de Seguros Bolívar S.A)

5.Alfa (Seguros de Vida Alfa S.A)

6.Colpatria (Seguros de Vida Colpatria S.A)

7.La Equidad (La Equidad Seguros de Vida Organismo Cooperativo)

9.Mapfre Colombia Vida Seguros S.A

10.Aurora (Compañía de Seguros de Vida Aurora S.A)

23. Administradoras de Pensiones dezplegable y (Lista completa)

01.Colpensiones (Régimen de Prima Media – Estado)

02.Porvenir (Administradora de Fondos de Pensiones y Cesantías)

03.Protección (AFP)

04.Skandia (Old Mutual) (AFP)

05.Old Mutual (Skandia Vida Pensiones)

06.AXA Colpatria Pensiones y Cesantías

07.BBVA Horizonte Pensiones y Cesantías

08.Liberty Pensiones y Cesantías

09.No tiene / Está por definir

10.Otra (especificar)


municipio departamento dezplegables en todos los items y partes donde se pidan 

Parte IV: IV. DATOS DE IDENTIFICACION DE LOS MIEMBROS DEL NUCLEO FAMILIAR 

28. tipo de documento de identidad - lista despegable

CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

33. departamentos - lista despegable

Amazonas
Antioquia
Arauca
Atlántico
Bolívar
Boyacá
Caldas
Caquetá
Casanare
Cauca
Cesar
Chocó
Córdoba
Cundinamarca
Guainía
Guaviare
Huila
La Guajira
Magdalena
Meta
Nariño
Norte de Santander
Putumayo
Quindío
Risaralda
San Andrés, Providencia y Santa Catalina
Santander
Sucre
Tolima
Valle del Cauca
Vaupés
Vichada


33. municipios - lista despegables 

Bogotá
Medellín
Bello
Envigado
Itagüí
Cali
Palmira
Buenaventura
Barranquilla
Soledad
Santa Marta
Cartagena
Bucaramanga
Floridablanca
Girón
Pereira
Dosquebradas
Manizales
Armenia
Tunja
Sogamoso
Villavicencio
Neiva
Cúcuta
Pasto
Sincelejo
Montería
Valledupar
Quibdó
Riohacha

34. fecha de nacimiento - despegables

36. tipo de documento de identidad - lista despegable

CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

41. departamentos - lista despegable

Amazonas
Antioquia
Arauca
Atlántico
Bolívar
Boyacá
Caldas
Caquetá
Casanare
Cauca
Cesar
Chocó
Córdoba
Cundinamarca
Guainía
Guaviare
Huila
La Guajira
Magdalena
Meta
Nariño
Norte de Santander
Putumayo
Quindío
Risaralda
San Andrés, Providencia y Santa Catalina
Santander
Sucre
Tolima
Valle del Cauca
Vaupés
Vichada

41. segundo departamento - ELIMINAR 
44. etnia - despegable 

01.Indígena
02.Gitano(a) o Rrom
03.Raizal del Archipiélago de San Andrés, Providencia y Santa Catalina
04.Palenquero(a) de San Basilio
05.Negro(a), Mulato(a), Afrocolombiano(a) o Afrodescendiente
06.Ninguno de los anteriores

46. grupo de población especial - despegable

1-Habitante de la Calle
2-Población infantil abandonada a cargo de ICBF
6-Menores desvinculados del conflicto armado bajo la protección del ICBF
8-Población desmovilizada y/op miembros del grupo armado ilegal que celebren acuerdos de paz con el Gobierno Nacional
9-Victimas del conflicto armado interno
10-Población infantil vulnerable bajo protección de instituciones diferentes al ICBF
11-Programa en protección a testigos
14-Población reclusa a cargo de la entidad territorial
16-Adulto Mayor en centros de protección
17-Comunidades indígenas
18-Rrom (Gitano)
22-Personas en prisión domiciliaria a cargo del INPEC
23-Personas que dejen de ser madres comunitarias
24-Migrantes colombianos repatriados que han retornado voluntariamente al país o han sido deportados o expulsados de territorio extranjero
25-Adolescentes y jóvenes a cargo del ICBF en el sistema de responsabilidad penal para adolescentes
26-Miembros de los grupos armados al margen de la ley que celebren acuerdos de paz con el Gobierno Nacional
27-Recién nacidos y menores de edad de padres no afiliados
28-Los voluntarios acreditados y activos de la Defensa Civil, Cruz Roja y Cuerpo de Bomberos y su núcleo familiar
29-Personas con discapacidad de escasos recursos y en condición de abandono en centros de protección
30-Migrante venezolano con PEP e hijos menores de edad con documento válido
32-Personas que se encuentren detenidas sin condena o cumpliendo medida de aseguramiento en centros de detención transitoria
33-Veteranos de la Fuerza Pública

51. departamentos - lista despegable

Amazonas
Antioquia
Arauca
Atlántico
Bolívar
Boyacá
Caldas
Caquetá
Casanare
Cauca
Cesar
Chocó
Córdoba
Cundinamarca
Guainía
Guaviare
Huila
La Guajira
Magdalena
Meta
Nariño
Norte de Santander
Putumayo
Quindío
Risaralda
San Andrés, Providencia y Santa Catalina
Santander
Sucre
Tolima
Valle del Cauca
Vaupés
Vichada


51. municipios - lista despegables 

Bogotá
Medellín
Bello
Envigado
Itagüí
Cali
Palmira
Buenaventura
Barranquilla
Soledad
Santa Marta
Cartagena
Bucaramanga
Floridablanca
Girón
Pereira
Dosquebradas
Manizales
Armenia
Tunja
Sogamoso
Villavicencio
Neiva
Cúcuta
Pasto
Sincelejo
Montería
Valledupar
Quibdó
Riohacha

PARTE V: V. DATOS DE IDENTIFICACION DEL APORTANTE, DE LAS ENTIDADES RESPONSABLES DE LA AFILIACION COLECTIVA DEL PAGO 

56. tipo de documento de identificación - despegable

CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

59. departamento - despegable


Amazonas
Antioquia
Arauca
Atlántico
Bolívar
Boyacá
Caldas
Caquetá
Casanare
Cauca
Cesar
Chocó
Córdoba
Cundinamarca
Guainía
Guaviare
Huila
La Guajira
Magdalena
Meta
Nariño
Norte de Santander
Putumayo
Quindío
Risaralda
San Andrés, Providencia y Santa Catalina
Santander
Sucre
Tolima
Valle del Cauca
Vaupés
Vichada

59. municipio - despegable

Bogotá
Medellín
Bello
Envigado
Itagüí
Cali
Palmira
Buenaventura
Barranquilla
Soledad
Santa Marta
Cartagena
Bucaramanga
Floridablanca
Girón
Pereira
Dosquebradas
Manizales
Armenia
Tunja
Sogamoso
Villavicencio
Neiva
Cúcuta
Pasto
Sincelejo
Montería
Valledupar
Quibdó
Riohacha

PARTE VI:VI: DATOS ACTUALIZADOS SEGUN REPORTE DE LA NOVEDAD

61. Documento de identidad - despegables 

CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

64. fecha de nacimiento
66. fecha de novedad 


PARTE: VIII. Contribución Solidaria

79. D.I - despegables 

CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

PARTE XII: DATOS DE FUNCIONARIO DE LA ENTIDAD TERRITORIAL O DE LA INSTITUCION RESPONSABLE DE POBLACION ESPECIAL 

94. documento de identificación - despegable


CN - Certificado Nacido Vivo
MS - Menor sin documento de identificación
RC - Registro Civil
TI- Tarjeta de Identidad
CC - Cédula de Ciudadanía
CC - Cédula de Extranjería
SC - Salvo Conducto
PA - Pasaporte
CD - Carné Diplomático
PE - Permiso Especial Permanencia
AS - Adulto sin documento de identificación
PT - Permiso Protección Temporal

96. fecha de radicación - despegable
97. fecha de validación - despegable




# Fase 2 — Flujo de datos completo (Día 3-4)

Guardar, consultar y actualizar formulario desde frontend a backend.
Mostrar ID radicado en pantalla y permitir reabrir por ID.
Criterio de cierre: crear → editar → guardar → recargar sin pérdida.

# Fase 3 — Calidad y reglas de negocio (Día 5-6)

Endurecer validaciones server-side (no solo frontend).
Manejar errores claros (red, Supabase, campos inválidos).
Criterio de cierre: pruebas de casos críticos aprobadas.

# Fase 4 — Operación y despliegue (Día 7-8)

Variables por ambiente (dev/prod), .gitignore, hardening básico.
Pipeline de build/deploy (Azure DevOps) y checklist de salida.
Criterio de cierre: despliegue en entorno productivo funcionando.

# Fase 5 — Cierre documental (Día 9-10)

Manual corto de uso + soporte + recuperación de fallos.
Entrega técnica final (arquitectura, DB, endpoints, operación).
Criterio de cierre: equipo puede operar sin dependencia directa.
