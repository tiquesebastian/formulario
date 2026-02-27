-- =========================================================
-- PRUEBAS DE VERIFICACIÓN POST-CARGA (SQL SERVER)
-- Ejecutar después de:
-- 1) schema_sql
-- 2) insert.sql
-- 3) insert_municipalities.sql
-- =========================================================

SET NOCOUNT ON;

PRINT '========== INICIO DE PRUEBAS ==========';

-- ---------------------------------------------------------
-- 0) Existencia de tablas esperadas
-- ---------------------------------------------------------
PRINT 'Prueba 0: existencia de tablas';

SELECT
    expected_table,
    CASE WHEN OBJECT_ID(expected_table, 'U') IS NOT NULL THEN 'OK' ELSE 'FALTA' END AS status
FROM (VALUES
    ('dbo.departments'),
    ('dbo.municipalities'),
    ('dbo.pdf_records')
) AS t(expected_table);

-- ---------------------------------------------------------
-- 1) Conteos base
-- ---------------------------------------------------------
PRINT 'Prueba 1: conteos base';

SELECT 'departments' AS table_name, COUNT(1) AS total_rows FROM dbo.departments
UNION ALL
SELECT 'municipalities' AS table_name, COUNT(1) AS total_rows FROM dbo.municipalities
UNION ALL
SELECT 'pdf_records' AS table_name, COUNT(1) AS total_rows FROM dbo.pdf_records;

-- ---------------------------------------------------------
-- 2) Departamentos faltantes respecto al seed oficial
-- ---------------------------------------------------------
PRINT 'Prueba 2: departamentos faltantes';

;WITH expected AS (
    SELECT * FROM (VALUES
        (N'05', N'Antioquia'),
        (N'08', N'Atlántico'),
        (N'11', N'Bogotá, D.C.'),
        (N'13', N'Bolívar'),
        (N'15', N'Boyacá'),
        (N'17', N'Caldas'),
        (N'18', N'Caquetá'),
        (N'19', N'Cauca'),
        (N'20', N'Cesar'),
        (N'23', N'Córdoba'),
        (N'25', N'Cundinamarca'),
        (N'27', N'Chocó'),
        (N'41', N'Huila'),
        (N'44', N'La Guajira'),
        (N'47', N'Magdalena'),
        (N'50', N'Meta'),
        (N'52', N'Nariño'),
        (N'54', N'Norte de Santander'),
        (N'63', N'Quindío'),
        (N'66', N'Risaralda'),
        (N'68', N'Santander'),
        (N'70', N'Sucre'),
        (N'73', N'Tolima'),
        (N'76', N'Valle del Cauca'),
        (N'81', N'Arauca'),
        (N'85', N'Casanare'),
        (N'86', N'Putumayo'),
        (N'88', N'Archipiélago de San Andrés, Providencia y Santa Catalina'),
        (N'91', N'Amazonas'),
        (N'94', N'Guainía'),
        (N'95', N'Guaviare'),
        (N'97', N'Vaupés'),
        (N'99', N'Vichada')
    ) AS v(code, name)
)
SELECT
    e.code,
    e.name,
    'FALTA EN dbo.departments' AS issue
FROM expected e
LEFT JOIN dbo.departments d ON d.code = e.code
WHERE d.id IS NULL
ORDER BY e.code;

-- ---------------------------------------------------------
-- 3) Duplicados en departments (code/name)
-- ---------------------------------------------------------
PRINT 'Prueba 3: duplicados en departments';

SELECT code, COUNT(1) AS duplicates
FROM dbo.departments
GROUP BY code
HAVING COUNT(1) > 1;

SELECT name, COUNT(1) AS duplicates
FROM dbo.departments
GROUP BY name
HAVING COUNT(1) > 1;

-- ---------------------------------------------------------
-- 4) Duplicados en municipalities por departamento/código
-- ---------------------------------------------------------
PRINT 'Prueba 4: duplicados en municipalities';

SELECT
    d.code AS department_code,
    m.code AS municipality_code,
    COUNT(1) AS duplicates
FROM dbo.municipalities m
INNER JOIN dbo.departments d ON d.id = m.department_id
GROUP BY d.code, m.code
HAVING COUNT(1) > 1
ORDER BY d.code, m.code;

-- ---------------------------------------------------------
-- 5) Municipios huérfanos (sin departamento)
-- ---------------------------------------------------------
PRINT 'Prueba 5: municipios huérfanos';

SELECT
    m.id,
    m.department_id,
    m.code,
    m.name
FROM dbo.municipalities m
LEFT JOIN dbo.departments d ON d.id = m.department_id
WHERE d.id IS NULL;

-- ---------------------------------------------------------
-- 6) Conteo de municipios por departamento
-- ---------------------------------------------------------
PRINT 'Prueba 6: conteo por departamento';

SELECT
    d.code AS department_code,
    d.name AS department_name,
    COUNT(m.id) AS municipalities_count
FROM dbo.departments d
LEFT JOIN dbo.municipalities m ON m.department_id = d.id
GROUP BY d.code, d.name
ORDER BY d.code;

-- ---------------------------------------------------------
-- 7) Validación de pdf_records (orfandad y campos básicos)
-- ---------------------------------------------------------
PRINT 'Prueba 7: validación de pdf_records';

-- 7.1 Registros con document_number vacío
SELECT
    id,
    pdf_id,
    document_number,
    created_at
FROM dbo.pdf_records
WHERE LTRIM(RTRIM(document_number)) = N'';

-- 7.2 Registros con department_id inexistente
SELECT
    p.id,
    p.pdf_id,
    p.department_id
FROM dbo.pdf_records p
LEFT JOIN dbo.departments d ON d.id = p.department_id
WHERE d.id IS NULL;

-- 7.3 Registros con municipality_id inexistente
SELECT
    p.id,
    p.pdf_id,
    p.municipality_id
FROM dbo.pdf_records p
LEFT JOIN dbo.municipalities m ON m.id = p.municipality_id
WHERE m.id IS NULL;

-- 7.4 Inconsistencia: municipio no pertenece al departamento del registro
SELECT
    p.id,
    p.pdf_id,
    p.department_id,
    p.municipality_id,
    m.department_id AS municipality_real_department_id
FROM dbo.pdf_records p
INNER JOIN dbo.municipalities m ON m.id = p.municipality_id
WHERE m.department_id <> p.department_id;

-- ---------------------------------------------------------
-- 8) Resumen rápido de estado (OK/FALLO)
-- ---------------------------------------------------------
PRINT 'Prueba 8: resumen rápido';

;WITH checks AS (
    SELECT 'departments_count_min_33' AS check_name,
           CASE WHEN (SELECT COUNT(1) FROM dbo.departments) >= 33 THEN 1 ELSE 0 END AS passed
    UNION ALL
    SELECT 'municipalities_count_gt_0',
           CASE WHEN (SELECT COUNT(1) FROM dbo.municipalities) > 0 THEN 1 ELSE 0 END
    UNION ALL
    SELECT 'departments_code_duplicates',
           CASE WHEN EXISTS (
               SELECT 1 FROM dbo.departments GROUP BY code HAVING COUNT(1) > 1
           ) THEN 0 ELSE 1 END
    UNION ALL
    SELECT 'municipalities_duplicates_by_dept_code',
           CASE WHEN EXISTS (
               SELECT 1 FROM dbo.municipalities GROUP BY department_id, code HAVING COUNT(1) > 1
           ) THEN 0 ELSE 1 END
)
SELECT
    check_name,
    CASE WHEN passed = 1 THEN 'OK' ELSE 'FALLO' END AS status
FROM checks
ORDER BY check_name;

PRINT '========== FIN DE PRUEBAS ==========';
