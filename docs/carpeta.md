# Manual de Usuario — Formulario EPS

## 1. Propósito del sistema
Este proyecto permite diligenciar el formulario EPS de afiliación y novedades, guardarlo en backend, reabrirlo por ID de radicado y descargarlo en PDF con formato de impresión.

Está diseñado para:
- Capturar datos del afiliado principal.
- Capturar datos complementarios, cónyuge y beneficiarios.
- Registrar novedades, anexos y datos institucionales.
- Guardar borradores y continuar después.

---

## 2. ¿Qué puede hacer un usuario?
1. Llenar el formulario completo por secciones.
2. Guardar el formulario (crea un ID único de radicado).
3. Reabrir un formulario anterior usando el ID.
4. Iniciar un formulario nuevo sin perder claridad del flujo.
5. Descargar PDF (solo cuando los obligatorios estén completos).

---

## 3. Estructura funcional visible en pantalla
### Encabezado
- Logo EPS.
- Fecha de radicado en formato día/mes/año.

### Secciones del formulario
- I. Datos del trámite.
- II. Datos básicos de identificación.
- III. Datos complementarios.
- IV. Datos de cónyuge/compañero(a).
- V a XII. Beneficiarios, novedades, declaraciones, firmas, anexos y datos institucionales.

### Bloque de acciones (parte inferior)
- ID radicado actual.
- Reabrir por ID.
- Botón Consultar.
- Botón Descargar PDF.
- Botón Nuevo formulario.
- Botón Guardar y continuar.

---

## 4. Convenciones importantes de uso
## 4.1 Campos obligatorios
Los campos obligatorios están marcados con asterisco (*).

Si falta alguno obligatorio:
- El sistema no permite descargar PDF.
- El sistema mostrará validaciones de campo.

## 4.2 Formato de datos
- Campos numéricos: solo números.
- Campos de texto personal: solo letras y espacios (según validación del formulario).
- Correos: formato válido de email.
- Fechas: usar selectores DD/MM/AAAA donde aplique.

---

## 5. Flujo recomendado de trabajo
1. Completar secciones I, II y III (base obligatoria principal).
2. Completar sección IV si corresponde.
3. Diligenciar beneficiarios y demás secciones según el caso.
4. Presionar Guardar y continuar.
5. Confirmar que aparezca un ID en “ID radicado actual”.
6. Si requiere continuar luego, copiar el ID.
7. Al finalizar, descargar PDF.

---

## 6. Guardado del formulario
## 6.1 ¿Cómo saber si se guardó bien?
Después de guardar correctamente:
- Aparece mensaje de éxito.
- El campo “ID radicado actual” deja de mostrar “Sin radicado aún” y muestra un UUID.

## 6.2 ¿Qué pasa si ya tenía ID?
Si el formulario ya tenía ID y se vuelve a guardar:
- Se actualiza el mismo registro (no crea uno nuevo).

## 6.3 ¿Qué pasa si falla el guardado?
El sistema muestra una alerta con el motivo.

Ejemplos de causa:
- Backend caído/no iniciado.
- Datos inválidos.
- Variables de entorno mal configuradas en backend.

---

## 7. Reabrir formulario por ID
1. Copiar el ID de radicado.
2. Pegar el valor en “Reabrir por ID”.
3. Presionar Consultar.
4. El sistema carga todos los campos guardados.

### Mensajes esperados
- Éxito: formulario cargado correctamente.
- Error: ID inválido o no encontrado.

Nota: el ID debe ser UUID válido.

---

## 8. Descargar PDF
## 8.1 Reglas
- El botón valida obligatorios antes de imprimir.
- Si faltan obligatorios, no descarga y avisa.

## 8.2 Resultado
- Se abre el diálogo de impresión del navegador.
- Seleccionar “Guardar como PDF”.

## 8.3 Recomendaciones de impresión
- Tamaño de papel: Carta o A4 según necesidad.
- Escala: predeterminada del navegador.
- Márgenes: predeterminados o mínimos.

---

## 9. Uso de botones y acciones
## 9.1 Guardar y continuar
- Crea registro nuevo si no hay ID.
- Actualiza registro existente si ya hay ID.

## 9.2 Nuevo formulario
- Limpia el formulario.
- Limpia el ID actual y el campo de consulta.
- Se usa para iniciar un caso diferente.

## 9.3 Consultar
- Busca un registro en backend por ID.
- Carga los datos en pantalla para continuar.

## 9.4 Descargar PDF
- Ejecuta validación.
- Si pasa validación, abre impresión.

---

## 10. Carga de firmas, sello y sticker
En los campos de imagen:
- Se permiten imágenes PNG o JPG.
- Al cargar, el sistema convierte la imagen y la almacena en el formulario.
- Puede limpiar una imagen sin afectar el resto del formulario.

Recomendación:
- Usar imágenes ligeras para mejor rendimiento.

---

## 11. Cálculo automático de anexos
El campo de total de anexos se calcula automáticamente con base en:
- Cantidades numéricas ingresadas.
- Casillas de anexos marcadas.

No requiere cálculo manual por parte del usuario.

---

## 12. Mensajes de error frecuentes y solución
## 12.1 Error al guardar: Datos inválidos
Posibles causas:
- Campo con formato incorrecto (correo, teléfono, documento, etc.).
- Fecha inválida.

Qué hacer:
- Revisar campos con asterisco y mensajes de validación.
- Corregir formato y guardar de nuevo.

## 12.2 Error 400 al consultar por ID
Causa:
- ID mal formado (no UUID).

Qué hacer:
- Copiar y pegar el ID completo generado por el sistema.

## 12.3 No conecta con backend
Causas:
- Backend no iniciado.
- URL de API incorrecta.
- CORS/origen no configurado.

Qué hacer:
- Verificar backend activo en /health.
- Revisar variables de entorno.

---

## 13. Buenas prácticas operativas
1. Guardar cada vez que termine una sección importante.
2. Copiar el ID apenas se genere.
3. Validar PDF antes de entregar.
4. Evitar cerrar sin guardar.
5. Mantener consistencia de nombres y documentos.

---

## 14. Checklist rápido de cierre de formulario
Antes de entregar:
- Campos obligatorios completos.
- Guardado exitoso confirmado.
- ID de radicado visible.
- Reapertura por ID probada (opcional recomendado).
- PDF descargado y revisado.

---

## 15. Guía de soporte interno
Cuando reportes un problema al equipo técnico, incluye:
- ID de radicado (si existe).
- Acción que estabas realizando (guardar, consultar, PDF).
- Mensaje exacto del error.
- Hora aproximada del incidente.
- Captura de pantalla si es posible.

Esto acelera el diagnóstico.

---

## 16. Alcance funcional (resumen)
Este sistema cubre:
- Captura estructurada del formulario EPS.
- Persistencia de borrador y actualización.
- Recuperación por ID.
- Exportación a PDF con validación previa.

No cubre actualmente:
- Flujo multiusuario con autenticación por roles.
- Firma electrónica certificada.
- Integración de notificaciones automáticas externas.

---

## 17. Glosario breve
- Radicado: identificador único del formulario guardado. Se usa para consultar, reabrir y dar trazabilidad al caso.
- UUID: formato técnico del ID de radicado (cadena alfanumérica larga con guiones), por ejemplo: `550e8400-e29b-41d4-a716-446655440000`.
- Borrador (draft): estado de formulario guardado de forma parcial; puede editarse y actualizarse cuantas veces sea necesario.
- Backend: servicio API (servidor) que recibe los datos, aplica validaciones y persiste la información en la base de datos.
- Frontend: interfaz visual web donde el usuario diligencia el formulario, ve validaciones y ejecuta acciones como guardar, consultar y descargar PDF.
- Validación: conjunto de reglas que revisan si los datos tienen formato correcto (correo, teléfono, fechas, obligatorios, etc.).
- Campo obligatorio: dato indispensable para completar procesos clave (por ejemplo, descargar PDF o guardar sin errores). Se identifica con `*`.
- Payload: bloque de datos enviado del frontend al backend en formato JSON durante operaciones de guardar/actualizar.
- Endpoint: URL específica de la API para una acción concreta, por ejemplo `POST /api/forms` o `GET /api/forms/:id`.
- CORS: política de seguridad del navegador que controla qué dominios pueden consumir la API.
- Supabase: plataforma donde está alojada la base de datos del proyecto.
- Estado 400 (Bad Request): respuesta que indica datos inválidos o mal formados en la solicitud.
- Estado 404 (Not Found): respuesta que indica que el recurso solicitado (por ejemplo un ID) no existe.
- Estado 500 (Internal Server Error): respuesta que indica un fallo inesperado en el servidor.

---

## 18. Contacto recomendado para operación
Definir internamente:
- Responsable funcional (proceso EPS).
- Responsable técnico (soporte del sistema).
- Canal único de reporte (correo o mesa de ayuda).

Este paso es clave para operación estable en producción.
