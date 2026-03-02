-- 002_fix_bogota_name.sql
-- Corrige nomenclatura oficial de Bogotá.

UPDATE m
SET m.name = N'BOGOTÁ, D.C.'
FROM dbo.municipalities m
INNER JOIN dbo.departments d ON d.id = m.department_id
WHERE d.code = N'11' AND m.code = N'001';
