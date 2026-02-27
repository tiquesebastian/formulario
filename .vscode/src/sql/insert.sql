-- =========================================================
-- SEMILLA MÍNIMA - DEPARTAMENTOS (COLOMBIA)
-- Archivo: insert.sql
-- =========================================================

SET NOCOUNT ON;

MERGE dbo.departments AS target
USING (
    VALUES
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
) AS source (code, name)
ON target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (code, name)
    VALUES (source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;

SELECT id, code, name, created_at
FROM dbo.departments
ORDER BY code;
