-- =========================================================
-- SEMILLA MÍNIMA - MUNICIPIOS (COLOMBIA)
-- Generado desde archivo: ecxel
-- Inserta/actualiza municipios por departamento
-- =========================================================

SET NOCOUNT ON;

-- DEPARTAMENTO: ANTIOQUIA (05)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'MEDELLIN'),
        (N'002', N'ABEJORRAL'),
        (N'004', N'ABRIAQUI'),
        (N'021', N'ALEJANDRIA'),
        (N'030', N'AMAGA'),
        (N'031', N'AMALFI'),
        (N'034', N'ANDES'),
        (N'036', N'ANGELOPOLIS'),
        (N'038', N'ANGOSTURA'),
        (N'040', N'ANORI'),
        (N'042', N'SANTAFE DE ANTIOQUIA'),
        (N'044', N'ANZA'),
        (N'045', N'APARTADO'),
        (N'051', N'ARBOLETES'),
        (N'055', N'ARGELIA'),
        (N'059', N'ARMENIA'),
        (N'079', N'BARBOSA'),
        (N'086', N'BELMIRA'),
        (N'088', N'BELLO'),
        (N'091', N'BETANIA'),
        (N'093', N'BETULIA'),
        (N'101', N'BOLIVAR'),
        (N'107', N'BRICEÑO'),
        (N'113', N'BURITICA'),
        (N'120', N'CACERES'),
        (N'125', N'CAICEDO'),
        (N'129', N'CALDAS'),
        (N'134', N'CAMPAMENTO'),
        (N'138', N'CAÑASGORDAS'),
        (N'142', N'CARACOLI'),
        (N'145', N'CARAMANTA'),
        (N'147', N'CAREPA'),
        (N'148', N'EL CARMEN DE VIBORAL'),
        (N'150', N'CAROLINA'),
        (N'154', N'CAUCASIA'),
        (N'172', N'CHIGORODO'),
        (N'190', N'CISNEROS'),
        (N'197', N'COCORNA'),
        (N'206', N'CONCEPCION'),
        (N'209', N'CONCORDIA'),
        (N'212', N'COPACABANA'),
        (N'234', N'DABEIBA'),
        (N'237', N'DON MATIAS'),
        (N'240', N'EBEJICO'),
        (N'250', N'EL BAGRE'),
        (N'264', N'ENTRERRIOS'),
        (N'266', N'ENVIGADO'),
        (N'282', N'FREDONIA'),
        (N'284', N'FRONTINO'),
        (N'306', N'GIRALDO'),
        (N'308', N'GIRARDOTA'),
        (N'310', N'GOMEZ PLATA'),
        (N'313', N'GRANADA'),
        (N'315', N'GUADALUPE'),
        (N'318', N'GUARNE'),
        (N'321', N'GUATAPE'),
        (N'347', N'HELICONIA'),
        (N'353', N'HISPANIA'),
        (N'360', N'ITAGUI'),
        (N'361', N'ITUANGO'),
        (N'364', N'JARDIN'),
        (N'368', N'JERICO'),
        (N'376', N'LA CEJA'),
        (N'380', N'LA ESTRELLA'),
        (N'390', N'LA PINTADA'),
        (N'400', N'LA UNION'),
        (N'411', N'LIBORINA'),
        (N'425', N'MACEO'),
        (N'440', N'MARINILLA'),
        (N'467', N'MONTEBELLO'),
        (N'475', N'MURINDO'),
        (N'480', N'MUTATA'),
        (N'483', N'NARIÑO'),
        (N'490', N'NECOCLI'),
        (N'495', N'NECHI'),
        (N'501', N'OLAYA'),
        (N'541', N'PEÑOL'),
        (N'543', N'PEQUE'),
        (N'576', N'PUEBLORRICO'),
        (N'579', N'PUERTO BERRIO'),
        (N'585', N'PUERTO NARE-LA MAGDALENA'),
        (N'591', N'PUERTO TRIUNFO'),
        (N'604', N'REMEDIOS'),
        (N'607', N'RETIRO'),
        (N'615', N'RIONEGRO'),
        (N'628', N'SABANALARGA'),
        (N'631', N'SABANETA'),
        (N'642', N'SALGAR'),
        (N'647', N'SAN ANDRES'),
        (N'649', N'SAN CARLOS'),
        (N'652', N'SAN FRANCISCO'),
        (N'656', N'SAN JERONIMO'),
        (N'658', N'SAN JOSE DE LA MONTAÑA'),
        (N'659', N'SAN JUAN DE URABA'),
        (N'660', N'SAN LUIS'),
        (N'664', N'SAN PEDRO'),
        (N'665', N'SAN PEDRO DE URABA'),
        (N'667', N'SAN RAFAEL'),
        (N'670', N'SAN ROQUE'),
        (N'674', N'SAN VICENTE'),
        (N'679', N'SANTA BARBARA'),
        (N'686', N'SANTA ROSA DE OSOS'),
        (N'690', N'SANTO DOMINGO'),
        (N'697', N'SANTUARIO'),
        (N'736', N'SEGOVIA'),
        (N'756', N'SONSON'),
        (N'761', N'SOPETRAN'),
        (N'789', N'TAMESIS'),
        (N'790', N'TARAZA'),
        (N'792', N'TARSO'),
        (N'809', N'TITIRIBI'),
        (N'819', N'TOLEDO'),
        (N'837', N'TURBO'),
        (N'842', N'URAMITA'),
        (N'847', N'URRAO'),
        (N'854', N'VALDIVIA'),
        (N'856', N'VALPARAISO'),
        (N'858', N'VEGACHI'),
        (N'861', N'VENECIA'),
        (N'873', N'VIGIA DEL FUERTE'),
        (N'885', N'YALI'),
        (N'887', N'YARUMAL'),
        (N'890', N'YOLOMBO'),
        (N'893', N'YONDO-CASABE'),
        (N'895', N'ZARAGOZA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'05'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: ATLANTICO (08)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'BARRANQUILLA'),
        (N'078', N'BARANOA'),
        (N'137', N'CAMPO DE LA CRUZ'),
        (N'141', N'CANDELARIA'),
        (N'296', N'GALAPA'),
        (N'372', N'JUAN DE ACOSTA'),
        (N'421', N'LURUACO'),
        (N'433', N'MALAMBO'),
        (N'436', N'MANATI'),
        (N'520', N'PALMAR DE VARELA'),
        (N'549', N'PIOJO'),
        (N'558', N'POLONUEVO'),
        (N'560', N'PONEDERA'),
        (N'573', N'PUERTO COLOMBIA'),
        (N'606', N'REPELON'),
        (N'634', N'SABANAGRANDE'),
        (N'638', N'SABANALARGA'),
        (N'675', N'SANTA LUCIA'),
        (N'685', N'SANTO TOMAS'),
        (N'758', N'SOLEDAD'),
        (N'770', N'SUAN'),
        (N'832', N'TUBARA'),
        (N'849', N'USIACURI')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'08'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: BOGOTÁ (11)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'BOGOTÁ, D.C.')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'11'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: BOLIVAR (13)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'CARTAGENA DE INDIAS'),
        (N'006', N'ACHI'),
        (N'030', N'ALTOS DEL ROSARIO'),
        (N'042', N'ARENAL'),
        (N'052', N'ARJONA'),
        (N'062', N'ARROYOHONDO'),
        (N'074', N'BARRANCO DE LOBA'),
        (N'140', N'CALAMAR'),
        (N'160', N'CANTAGALLO'),
        (N'188', N'CICUCO'),
        (N'212', N'CORDOBA'),
        (N'222', N'CLEMENCIA'),
        (N'244', N'EL CARMEN DE BOLIVAR'),
        (N'248', N'EL GUAMO'),
        (N'268', N'EL PEÑON'),
        (N'300', N'HATILLO DE LOBA'),
        (N'430', N'MAGANGUE'),
        (N'433', N'MAHATES'),
        (N'440', N'MARGARITA'),
        (N'442', N'MARIA LA BAJA'),
        (N'458', N'MONTECRISTO'),
        (N'468', N'MOMPOS'),
        (N'473', N'MORALES'),
        (N'549', N'PINILLOS'),
        (N'580', N'REGIDOR'),
        (N'600', N'RIO VIEJO'),
        (N'620', N'SAN CRISTOBAL'),
        (N'647', N'SAN ESTANISLAO'),
        (N'650', N'SAN FERNANDO'),
        (N'654', N'SAN JACINTO'),
        (N'655', N'SAN JACINTO DEL CAUCA'),
        (N'657', N'SAN JUAN NEPOMUCENO'),
        (N'667', N'SAN MARTIN DE LOBA'),
        (N'670', N'SAN PABLO'),
        (N'673', N'SANTA CATALINA'),
        (N'683', N'SANTA ROSA'),
        (N'688', N'SANTA ROSA DEL SUR'),
        (N'744', N'SIMITI'),
        (N'760', N'SOPLAVIENTO'),
        (N'780', N'TALAIGUA NUEVO'),
        (N'810', N'TIQUISIO'),
        (N'836', N'TURBACO'),
        (N'838', N'TURBANA'),
        (N'873', N'VILLANUEVA'),
        (N'894', N'ZAMBRANO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'13'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: BOYACA (15)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'TUNJA'),
        (N'022', N'ALMEIDA'),
        (N'047', N'AQUITANIA'),
        (N'051', N'ARCABUCO'),
        (N'087', N'BELEN'),
        (N'090', N'BERBEO'),
        (N'092', N'BETEITIVA'),
        (N'097', N'BOAVITA'),
        (N'104', N'BOYACA'),
        (N'106', N'BRICEÑO'),
        (N'109', N'BUENAVISTA'),
        (N'114', N'BUSBANZA'),
        (N'131', N'CALDAS'),
        (N'135', N'CAMPOHERMOSO'),
        (N'162', N'CERINZA'),
        (N'172', N'CHINAVITA'),
        (N'176', N'CHIQUINQUIRA'),
        (N'180', N'CHISCAS'),
        (N'183', N'CHITA'),
        (N'185', N'CHITARAQUE'),
        (N'187', N'CHIVATA'),
        (N'189', N'CIENEGA'),
        (N'204', N'COMBITA'),
        (N'212', N'COPER'),
        (N'215', N'CORRALES'),
        (N'218', N'COVARACHIA'),
        (N'223', N'CUBARA'),
        (N'224', N'CUCAITA'),
        (N'226', N'CUITIVA'),
        (N'232', N'CHIQUIZA'),
        (N'236', N'CHIVOR'),
        (N'238', N'DUITAMA'),
        (N'244', N'EL COCUY'),
        (N'248', N'EL ESPINO'),
        (N'272', N'FIRAVITOBA'),
        (N'276', N'FLORESTA'),
        (N'293', N'GACHANTIVA'),
        (N'296', N'GAMEZA'),
        (N'299', N'GARAGOA'),
        (N'317', N'GUACAMAYAS'),
        (N'322', N'GUATEQUE'),
        (N'325', N'GUAYATA'),
        (N'332', N'GUICAN'),
        (N'362', N'IZA'),
        (N'367', N'JENESANO'),
        (N'368', N'JERICO'),
        (N'377', N'LABRANZAGRANDE'),
        (N'380', N'LA CAPILLA'),
        (N'401', N'LA VICTORIA'),
        (N'403', N'LA UVITA'),
        (N'407', N'VILLA DE LEYVA'),
        (N'425', N'MACANAL'),
        (N'442', N'MARIPI'),
        (N'455', N'MIRAFLORES'),
        (N'464', N'MONGUA'),
        (N'466', N'MONGUI'),
        (N'469', N'MONIQUIRA'),
        (N'476', N'MOTAVITA'),
        (N'480', N'MUZO'),
        (N'491', N'NOBSA'),
        (N'494', N'NUEVO COLON'),
        (N'500', N'OICATA'),
        (N'507', N'OTANCHE'),
        (N'511', N'PACHAVITA'),
        (N'514', N'PAEZ'),
        (N'516', N'PAIPA'),
        (N'518', N'PAJARITO'),
        (N'522', N'PANQUEBA'),
        (N'531', N'PAUNA'),
        (N'533', N'PAYA'),
        (N'537', N'PAZ DE RIO'),
        (N'542', N'PESCA'),
        (N'550', N'PISBA'),
        (N'572', N'PUERTO BOYACA'),
        (N'580', N'QUIPAMA'),
        (N'599', N'RAMIRIQUI'),
        (N'600', N'RAQUIRA'),
        (N'621', N'RONDON'),
        (N'632', N'SABOYA'),
        (N'638', N'SACHICA'),
        (N'646', N'SAMACA'),
        (N'660', N'SAN EDUARDO'),
        (N'664', N'SAN JOSE DE PARE'),
        (N'667', N'SAN LUIS DE GACENO'),
        (N'673', N'SAN MATEO'),
        (N'676', N'SAN MIGUEL DE SEMA'),
        (N'681', N'SAN PABLO DE BORBUR'),
        (N'686', N'SANTANA'),
        (N'690', N'SANTA MARIA'),
        (N'693', N'SANTA ROSA DE VITERBO'),
        (N'696', N'SANTA SOFIA'),
        (N'720', N'SATIVANORTE'),
        (N'723', N'SATIVASUR'),
        (N'740', N'SIACHOQUE'),
        (N'753', N'SOATA'),
        (N'755', N'SOCOTA'),
        (N'757', N'SOCHA'),
        (N'759', N'SOGAMOSO'),
        (N'761', N'SOMONDOCO'),
        (N'762', N'SORA'),
        (N'763', N'SOTAQUIRA'),
        (N'764', N'SORACA'),
        (N'774', N'SUSACON'),
        (N'776', N'SUTAMARCHAN'),
        (N'778', N'SUTATENZA'),
        (N'790', N'TASCO'),
        (N'798', N'TENZA'),
        (N'804', N'TIBANA'),
        (N'806', N'TIBASOSA'),
        (N'808', N'TINJACA'),
        (N'810', N'TIPACOQUE'),
        (N'814', N'TOCA'),
        (N'816', N'TOGUI'),
        (N'820', N'TOPAGA'),
        (N'822', N'TOTA'),
        (N'832', N'TUNUNGUA'),
        (N'835', N'TURMEQUE'),
        (N'837', N'TUTA'),
        (N'839', N'TUTAZA'),
        (N'842', N'UMBITA'),
        (N'861', N'VENTAQUEMADA'),
        (N'879', N'VIRACACHA'),
        (N'897', N'ZETAQUIRA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'15'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CALDAS (17)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'MANIZALES'),
        (N'013', N'AGUADAS'),
        (N'042', N'ANSERMA'),
        (N'050', N'ARANZAZU'),
        (N'088', N'BELALCAZAR'),
        (N'174', N'CHINCHINA'),
        (N'272', N'FILADELFIA'),
        (N'380', N'LA DORADA'),
        (N'388', N'LA MERCED'),
        (N'433', N'MANZANARES'),
        (N'442', N'MARMATO'),
        (N'444', N'MARQUETALIA'),
        (N'446', N'MARULANDA'),
        (N'486', N'NEIRA'),
        (N'495', N'NORCASIA'),
        (N'513', N'PACORA'),
        (N'524', N'PALESTINA'),
        (N'541', N'PENSILVANIA'),
        (N'614', N'RIOSUCIO'),
        (N'616', N'RISARALDA'),
        (N'653', N'SALAMINA'),
        (N'662', N'SAMANA'),
        (N'665', N'SAN JOSE'),
        (N'777', N'SUPIA'),
        (N'867', N'VICTORIA'),
        (N'873', N'VILLAMARIA'),
        (N'877', N'VITERBO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'17'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CAQUETA (18)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'FLORENCIA'),
        (N'029', N'ALBANIA'),
        (N'094', N'BELEN DE LOS ANDAQUIES'),
        (N'150', N'CARTAGENA DEL CHAIRA'),
        (N'205', N'CURILLO'),
        (N'247', N'EL DONCELLO'),
        (N'256', N'EL PAUJIL'),
        (N'410', N'LA MONTAÑITA'),
        (N'460', N'MILAN'),
        (N'479', N'MORELIA'),
        (N'592', N'PUERTO RICO'),
        (N'610', N'SAN JOSE DEL FRAGUA'),
        (N'753', N'SAN VICENTE DEL CAGUAN'),
        (N'756', N'SOLANO'),
        (N'785', N'SOLITA'),
        (N'860', N'VALPARAISO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'18'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CAUCA (19)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'POPAYAN'),
        (N'022', N'ALMAGUER'),
        (N'050', N'ARGELIA'),
        (N'075', N'BALBOA'),
        (N'100', N'BOLIVAR'),
        (N'110', N'BUENOS AIRES'),
        (N'130', N'CAJIBIO'),
        (N'137', N'CALDONO'),
        (N'142', N'CALOTO'),
        (N'212', N'CORINTO'),
        (N'256', N'EL TAMBO'),
        (N'290', N'FLORENCIA'),
        (N'300', N'GUACHENE'),
        (N'318', N'GUAPI'),
        (N'355', N'INZA'),
        (N'364', N'JAMBALO'),
        (N'392', N'LA SIERRA'),
        (N'397', N'LA VEGA'),
        (N'418', N'LOPEZ DE MICAY'),
        (N'450', N'MERCADERES'),
        (N'455', N'MIRANDA'),
        (N'473', N'MORALES'),
        (N'513', N'PADILLA'),
        (N'517', N'PAEZ'),
        (N'532', N'PATIA'),
        (N'533', N'PIAMONTE'),
        (N'548', N'PIENDAMO'),
        (N'573', N'PUERTO TEJADA'),
        (N'585', N'PURACE'),
        (N'622', N'ROSAS'),
        (N'693', N'SAN SEBASTIAN'),
        (N'698', N'SANTANDER DE QUILICHAO'),
        (N'701', N'SANTA ROSA'),
        (N'743', N'SILVIA'),
        (N'760', N'SOTARA'),
        (N'780', N'SUAREZ'),
        (N'785', N'SUCRE'),
        (N'807', N'TIMBIO'),
        (N'809', N'TIMBIQUI'),
        (N'821', N'TORIBIO'),
        (N'824', N'TOTORO'),
        (N'845', N'VILLA RICA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'19'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CESAR (20)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'VALLEDUPAR'),
        (N'005', N'AGUACHICA'),
        (N'010', N'AGUSTIN CODAZZI'),
        (N'015', N'ASTREA'),
        (N'020', N'BOSCONIA'),
        (N'025', N'CHIMICHAGUA'),
        (N'030', N'CHIRIGUANA'),
        (N'035', N'CURUMANI'),
        (N'040', N'EL COPEY'),
        (N'045', N'EL PASO'),
        (N'050', N'GAMARRA'),
        (N'055', N'GONZALEZ'),
        (N'060', N'LA GLORIA'),
        (N'065', N'LA JAGUA DE IBIRICO'),
        (N'070', N'MANAURE BALCON DEL CESAR'),
        (N'075', N'PAILITAS'),
        (N'080', N'PELAYA'),
        (N'085', N'PUEBLO BELLO'),
        (N'090', N'RÍO DE ORO'),
        (N'095', N'SAN ALBERTO'),
        (N'100', N'SAN DIEGO'),
        (N'105', N'SAN MARTÍN'),
        (N'110', N'TAMALAMEQUE')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'20'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CÓRDOBA (23)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'MONTERÍA'),
        (N'005', N'AYAPEL'),
        (N'010', N'BUENAVISTA'),
        (N'015', N'CANALETE'),
        (N'020', N'CERETÉ'),
        (N'025', N'CHIMÁ'),
        (N'030', N'CHINÚ'),
        (N'035', N'CIÉNAGA DE ORO'),
        (N'040', N'COTORRA'),
        (N'045', N'LA APARTADA'),
        (N'050', N'LORICA'),
        (N'055', N'LOS CÓRDOBAS'),
        (N'060', N'MOMIL'),
        (N'065', N'MOÑITOS'),
        (N'070', N'PLANETA RICA'),
        (N'075', N'PUEBLO NUEVO'),
        (N'080', N'PUERTO ESCONDIDO'),
        (N'085', N'PUERTO LIBERTADOR'),
        (N'090', N'SAN ANDRÉS DE SOTAVENTO'),
        (N'095', N'SAN ANTERO'),
        (N'100', N'SAN BERNARDO DEL VIENTO'),
        (N'105', N'SAN CARLOS'),
        (N'110', N'SAN JOSÉ DE URÉ'),
        (N'115', N'SANA LUCÍA'),
        (N'120', N'TIERRALTA'),
        (N'125', N'TUCHÍN')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'23'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CUNDINAMARCA (25)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'SOACHA'),
        (N'005', N'FACATATIVÁ'),
        (N'010', N'FUNZA'),
        (N'015', N'MOSQUERA'),
        (N'020', N'ZIPAQUIRÁ'),
        (N'025', N'CHÍA'),
        (N'030', N'COTA'),
        (N'035', N'MADRID'),
        (N'040', N'TENJO'),
        (N'045', N'TABIO'),
        (N'050', N'EL COLEGIO'),
        (N'055', N'LA CALERA'),
        (N'060', N'SASAIMA'),
        (N'065', N'GIRARDOT'),
        (N'070', N'FUSAGASUGÁ'),
        (N'075', N'GUADUAS'),
        (N'080', N'LA MESA'),
        (N'085', N'QUEBRADANEGRA'),
        (N'090', N'SIBATÉ'),
        (N'095', N'SOPO'),
        (N'100', N'SUBACHOQUE'),
        (N'105', N'VIOTÁ')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'25'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CHOCÓ (27)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'QUIBDÓ'),
        (N'005', N'ACANDÍ'),
        (N'010', N'ALTO BAUDÓ'),
        (N'015', N'ATRATO'),
        (N'020', N'BAGADÓ'),
        (N'025', N'BAHÍA SOLANO'),
        (N'030', N'BAJO BAUDÓ'),
        (N'035', N'BOJAYA'),
        (N'040', N'EL CARMEN DE ATRATO'),
        (N'045', N'CANTÓN DE SAN PABLO'),
        (N'050', N'CONDOTO'),
        (N'055', N'ISTMINA'),
        (N'060', N'JURADÓ'),
        (N'065', N'LLORÓ'),
        (N'070', N'MEDIO ATRATO'),
        (N'075', N'MEDIO BAUDÓ'),
        (N'080', N'NÓVITA'),
        (N'085', N'RIOSUCIO'),
        (N'090', N'SAN JOSÉ DEL PALMAR'),
        (N'095', N'SIPI'),
        (N'100', N'TADÓ'),
        (N'105', N'UNGUÍA'),
        (N'110', N'UNIÓN PANAMERICANA'),
        (N'115', N'BAJO RÍO SAN JUAN'),
        (N'120', N'CARMEN DE APICALÁ'),
        (N'125', N'CANAÑO'),
        (N'130', N'JURIDICO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'27'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: Huila (41)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'41206', N'Acevedo'),
        (N'41244', N'Agrado'),
        (N'41298', N'Aipe'),
        (N'41306', N'Algeciras'),
        (N'41319', N'Altamira'),
        (N'41349', N'Baraya'),
        (N'41357', N'Campoalegre'),
        (N'41359', N'Colombia'),
        (N'41378', N'Elías'),
        (N'41396', N'Garzón'),
        (N'41483', N'Gigante'),
        (N'41486', N'Guadalupe'),
        (N'41503', N'Hobo'),
        (N'41518', N'Iquira'),
        (N'41524', N'Isnos'),
        (N'41530', N'La Argentina'),
        (N'41548', N'La Plata'),
        (N'41615', N'Nataga'),
        (N'41001', N'Neiva'),
        (N'41660', N'Oporapa'),
        (N'41668', N'Paicol'),
        (N'41676', N'Palermo'),
        (N'41678', N'Palestina'),
        (N'41770', N'Pital'),
        (N'41791', N'Pitalito'),
        (N'41797', N'Rivera'),
        (N'41799', N'Saladoblanco'),
        (N'41801', N'San Agustín'),
        (N'41807', N'Santa María'),
        (N'41872', N'Suaza'),
        (N'41885', N'Tarqui'),
        (N'41887', N'Tello'),
        (N'41889', N'Teruel'),
        (N'41891', N'Tesalia'),
        (N'41897', N'Timaná'),
        (N'41901', N'Villavieja'),
        (N'41907', N'Yaguará')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'41'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: La Guajira (44)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'44035', N'Albania'),
        (N'44078', N'Barrancas'),
        (N'44090', N'Dibulla'),
        (N'44098', N'Distracción'),
        (N'44110', N'El Molino'),
        (N'44279', N'Fonseca'),
        (N'44378', N'Hatonuevo'),
        (N'44420', N'La Jagua del Pilar'),
        (N'44430', N'Maicao'),
        (N'44560', N'Manaure'),
        (N'44001', N'Riohacha'),
        (N'44650', N'San Juan del Cesar'),
        (N'44847', N'Uribia'),
        (N'44855', N'Urumita'),
        (N'44874', N'Villanueva')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'44'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: MAGDALENA (47)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'SANTA MARTA'),
        (N'030', N'ALGARROBO'),
        (N'053', N'ARACATACA'),
        (N'058', N'ARIGUANI'),
        (N'161', N'CERRO DE SAN ANTONIO'),
        (N'170', N'CHIVOLO'),
        (N'189', N'CIENAGA'),
        (N'205', N'CONCORDIA'),
        (N'245', N'EL BANCO'),
        (N'258', N'EL PIÑON'),
        (N'268', N'EL RETEN'),
        (N'288', N'FUNDACION'),
        (N'318', N'GUAMAL'),
        (N'460', N'NUEVA GRANADA'),
        (N'541', N'PEDRAZA'),
        (N'545', N'EL PIJIÑO DEL CARMEN'),
        (N'551', N'PIVIJAY'),
        (N'555', N'PLATO'),
        (N'570', N'PUEBLOVIEJO'),
        (N'605', N'REMOLINO'),
        (N'660', N'SABANAS DE SAN ANGEL'),
        (N'675', N'SALAMINA'),
        (N'692', N'SAN SEBASTIAN BUENAVISTA'),
        (N'703', N'SAN ZENON'),
        (N'707', N'SANTA ANA'),
        (N'720', N'SANTA BARBARA DE PINTO'),
        (N'745', N'SITIONUEVO'),
        (N'798', N'TENERIFE'),
        (N'960', N'ZAPAYAN'),
        (N'980', N'ZONA BANANERA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'47'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: META (50)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'VILLAVICENCIO'),
        (N'006', N'ACACIAS'),
        (N'110', N'BARRANCA DE UPIA'),
        (N'124', N'CABUYARO'),
        (N'150', N'CASTILLA LA NUEVA'),
        (N'223', N'CUBARRAL'),
        (N'226', N'CUMARAL'),
        (N'245', N'EL CALVARIO'),
        (N'251', N'EL CASTILLO'),
        (N'270', N'EL DORADO'),
        (N'287', N'FUENTE DE ORO'),
        (N'313', N'GRANADA'),
        (N'318', N'GUAMAL'),
        (N'325', N'MAPIRIPAN'),
        (N'330', N'MESETAS'),
        (N'350', N'LA MACARENA'),
        (N'370', N'LA URIBE'),
        (N'400', N'LEJANIAS'),
        (N'450', N'PUERTO CONCORDIA'),
        (N'568', N'PUERTO GAITAN'),
        (N'573', N'PUERTO LOPEZ'),
        (N'577', N'PUERTO LLERAS'),
        (N'590', N'PUERTO RICO'),
        (N'606', N'RESTREPO'),
        (N'680', N'SAN CARLOS DE GUAROA'),
        (N'683', N'SAN JUAN DE ARAMA'),
        (N'686', N'SAN JUANITO'),
        (N'689', N'SAN MARTIN'),
        (N'711', N'VISTA HERMOSA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'50'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: NARIÑO (52)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'PASTO'),
        (N'019', N'ALBAN'),
        (N'022', N'ALDANA'),
        (N'036', N'ANCUYA'),
        (N'051', N'ARBOLEDA'),
        (N'079', N'BARBACOAS'),
        (N'083', N'BELEN'),
        (N'110', N'BUESACO'),
        (N'203', N'COLON'),
        (N'207', N'CONSACA'),
        (N'210', N'CONTADERO'),
        (N'215', N'CORDOBA'),
        (N'224', N'CUASPUD'),
        (N'227', N'CUMBAL'),
        (N'233', N'CUMBITARA'),
        (N'240', N'CHACHAGUI'),
        (N'250', N'EL CHARCO'),
        (N'254', N'EL PENOL'),
        (N'256', N'EL ROSARIO'),
        (N'258', N'EL TABLON'),
        (N'260', N'EL TAMBO'),
        (N'287', N'FUNES'),
        (N'317', N'GUACHUCAL'),
        (N'320', N'GUAITARILLA'),
        (N'323', N'GUALMATAN'),
        (N'352', N'ILES'),
        (N'354', N'IMUES'),
        (N'356', N'IPIALES'),
        (N'378', N'LA CRUZ'),
        (N'381', N'LA FLORIDA'),
        (N'385', N'LA LLANADA'),
        (N'390', N'LA TOLA'),
        (N'399', N'LA UNION'),
        (N'405', N'LEIVA'),
        (N'411', N'LINARES'),
        (N'418', N'LOS ANDES'),
        (N'427', N'MAGUI'),
        (N'435', N'MALLAMA'),
        (N'473', N'MOSQUERA'),
        (N'480', N'NARIÑO'),
        (N'490', N'OLAYA HERRERA'),
        (N'506', N'OSPINA'),
        (N'520', N'FRANCISCO PIZARRO'),
        (N'540', N'POLICARPA'),
        (N'560', N'POTOSI'),
        (N'565', N'PROVIDENCIA'),
        (N'573', N'PUERRES'),
        (N'585', N'PUPIALES'),
        (N'612', N'RICAURTE'),
        (N'621', N'ROBERTO PAYAN'),
        (N'678', N'SAMANIEGO'),
        (N'683', N'SANDONA'),
        (N'685', N'SAN BERNARDO'),
        (N'687', N'SAN LORENZO'),
        (N'693', N'SAN PABLO'),
        (N'694', N'SAN PEDRO DE CARTAGO'),
        (N'696', N'SANTA BARBARA'),
        (N'699', N'SANTACRUZ'),
        (N'720', N'SAPUYES'),
        (N'786', N'TAMINANGO'),
        (N'788', N'TANGUA'),
        (N'835', N'TUMACO'),
        (N'838', N'TUQUERRES'),
        (N'885', N'YACUANQUER')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'52'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: NORTE DE SANTANDER (54)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'CUCUTA'),
        (N'003', N'ABREGO'),
        (N'051', N'ARBOLEDAS'),
        (N'099', N'BOCHALEMA'),
        (N'109', N'BUCARASICA'),
        (N'125', N'CACOTA'),
        (N'128', N'CACHIRA'),
        (N'172', N'CHINACOTA'),
        (N'174', N'CHITAGA'),
        (N'206', N'CONVENCION'),
        (N'223', N'CUCUTILLA'),
        (N'239', N'DURANIA'),
        (N'245', N'EL CARMEN'),
        (N'250', N'EL TARRA'),
        (N'261', N'EL ZULIA'),
        (N'313', N'GRAMALOTE'),
        (N'344', N'HACARI'),
        (N'347', N'HERRAN'),
        (N'377', N'LABATECA'),
        (N'385', N'LA ESPERANZA'),
        (N'398', N'LA PLAYA'),
        (N'405', N'LOS PATIOS'),
        (N'418', N'LOURDES'),
        (N'480', N'MUTISCUA'),
        (N'498', N'OCAÑA'),
        (N'518', N'PAMPLONA'),
        (N'520', N'PAMPLONITA'),
        (N'553', N'PUERTO SANTANDER'),
        (N'599', N'RAGONVALIA'),
        (N'660', N'SALAZAR'),
        (N'670', N'SAN CALIXTO'),
        (N'673', N'SAN CAYETANO'),
        (N'680', N'SANTIAGO'),
        (N'720', N'SARDINATA'),
        (N'743', N'SILOS'),
        (N'800', N'TEORAMA'),
        (N'810', N'TIBU'),
        (N'820', N'TOLEDO'),
        (N'871', N'VILLA CARO'),
        (N'874', N'VILLA DEL ROSARIO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'54'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: QUINDIO (63)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'ARMENIA'),
        (N'111', N'BUENAVISTA'),
        (N'130', N'CALARCA'),
        (N'190', N'CIRCASIA'),
        (N'212', N'CORDOBA'),
        (N'272', N'FILANDIA'),
        (N'302', N'GENOVA'),
        (N'401', N'LA TEBAIDA'),
        (N'470', N'MONTENEGRO'),
        (N'548', N'PIJAO'),
        (N'594', N'QUIMBAYA'),
        (N'690', N'SALENTO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'63'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: RISARALDA (66)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'PEREIRA'),
        (N'045', N'APIA'),
        (N'075', N'BALBOA'),
        (N'088', N'BELEN DE UMBRIA'),
        (N'170', N'DOS QUEBRADAS'),
        (N'318', N'GUATICA'),
        (N'383', N'LA CELIA'),
        (N'400', N'LA VIRGINIA'),
        (N'440', N'MARSELLA'),
        (N'456', N'MISTRATO'),
        (N'572', N'PUEBLO RICO'),
        (N'594', N'QUINCHIA'),
        (N'682', N'SANTA ROSA DE CABAL'),
        (N'687', N'SANTUARIO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'66'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: SANTANDER (68)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'BUCARAMANGA'),
        (N'013', N'AGUADA'),
        (N'020', N'ALBANIA'),
        (N'051', N'ARATOCA'),
        (N'077', N'BARBOSA'),
        (N'079', N'BARICHARA'),
        (N'081', N'BARRANCABERMEJA'),
        (N'092', N'BETULIA'),
        (N'101', N'BOLIVAR'),
        (N'121', N'CABRERA'),
        (N'132', N'CALIFORNIA'),
        (N'147', N'CAPITANEJO'),
        (N'152', N'CARCASI'),
        (N'160', N'CEPITA'),
        (N'162', N'CERRITO'),
        (N'167', N'CHARALA'),
        (N'169', N'CHARTA'),
        (N'176', N'CHIMA'),
        (N'179', N'CHIPATA'),
        (N'190', N'CIMITARRA'),
        (N'207', N'CONCEPCION'),
        (N'209', N'CONFINES'),
        (N'211', N'CONTRATACION'),
        (N'217', N'COROMORO'),
        (N'229', N'CURITI'),
        (N'235', N'EL CARMEN'),
        (N'245', N'EL GUACAMAYO'),
        (N'250', N'EL PEÑON'),
        (N'255', N'EL PLAYON'),
        (N'264', N'ENCINO'),
        (N'266', N'ENCISO'),
        (N'271', N'FLORIAN'),
        (N'276', N'FLORIDABLANCA'),
        (N'296', N'GALAN'),
        (N'298', N'GAMBITA'),
        (N'307', N'GIRON'),
        (N'318', N'GUACA'),
        (N'320', N'GUADALUPE'),
        (N'322', N'GUAPOTA'),
        (N'324', N'GUAVATA'),
        (N'327', N'GUEPSA'),
        (N'344', N'HATO'),
        (N'368', N'JESUS MARIA'),
        (N'370', N'JORDAN'),
        (N'377', N'LA BELLEZA'),
        (N'385', N'LANDAZURI'),
        (N'397', N'LA PAZ'),
        (N'406', N'LEBRIJA'),
        (N'418', N'LOS SANTOS'),
        (N'425', N'MACARAVITA'),
        (N'432', N'MALAGA'),
        (N'444', N'MATANZA'),
        (N'464', N'MOGOTES'),
        (N'468', N'MOLAGAVITA'),
        (N'498', N'OCAMONTE'),
        (N'500', N'OIBA'),
        (N'502', N'ONZAGA'),
        (N'522', N'PALMAR'),
        (N'524', N'PALMAS DEL SOCORRO'),
        (N'533', N'PARAMO'),
        (N'547', N'PIEDECUESTA'),
        (N'549', N'PINCHOTE'),
        (N'572', N'PUENTE NACIONAL'),
        (N'573', N'PUERTO PARRA'),
        (N'575', N'PUERTO WILCHES'),
        (N'615', N'RIONEGRO'),
        (N'655', N'SABANA DE TORRES'),
        (N'669', N'SAN ANDRES'),
        (N'673', N'SAN BENITO'),
        (N'679', N'SAN GIL'),
        (N'682', N'SAN JOAQUIN'),
        (N'684', N'SAN JOSE DE MIRANDA'),
        (N'686', N'SAN MIGUEL'),
        (N'689', N'SAN VICENTE DE CHUCURI'),
        (N'705', N'SANTA BARBARA'),
        (N'720', N'SANTA HELENA DEL OPON'),
        (N'745', N'SIMACOTA'),
        (N'755', N'SOCORRO'),
        (N'770', N'SUAITA'),
        (N'773', N'SUCRE'),
        (N'780', N'SURATA'),
        (N'820', N'TONA'),
        (N'855', N'VALLE DE SAN JOSE'),
        (N'861', N'VELEZ'),
        (N'867', N'VETAS'),
        (N'872', N'VILLANUEVA'),
        (N'895', N'ZAPATOCA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'68'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: SUCRE (70)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'SINCELEJO'),
        (N'110', N'BUENAVISTA'),
        (N'124', N'CAIMITO'),
        (N'204', N'COLOSO'),
        (N'215', N'COROZAL'),
        (N'221', N'COVEÑAS'),
        (N'230', N'CHALAN'),
        (N'233', N'EL ROBLE'),
        (N'235', N'GALERAS'),
        (N'265', N'GUARANDA'),
        (N'400', N'LA UNION'),
        (N'418', N'LOS PALMITOS'),
        (N'429', N'MAJAGUAL'),
        (N'473', N'MORROA'),
        (N'508', N'OVEJAS'),
        (N'523', N'PALMITO'),
        (N'670', N'SAMPUES'),
        (N'678', N'SAN BENITO ABAD'),
        (N'702', N'SAN JUAN DE BETULIA'),
        (N'708', N'SAN MARCOS'),
        (N'713', N'SAN ONOFRE'),
        (N'717', N'SAN PEDRO'),
        (N'742', N'SINCE'),
        (N'771', N'SUCRE'),
        (N'820', N'TOLU'),
        (N'823', N'TOLUVIEJO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'70'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: TOLIMA (73)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'IBAGUE'),
        (N'024', N'ALPUJARRA'),
        (N'026', N'ALVARADO'),
        (N'030', N'AMBALEMA'),
        (N'043', N'ANZOATEGUI'),
        (N'055', N'ARMERO'),
        (N'067', N'ATACO'),
        (N'124', N'CAJAMARCA'),
        (N'148', N'CARMEN DE APICALA'),
        (N'152', N'CASABIANCA'),
        (N'168', N'CHAPARRAL'),
        (N'200', N'COELLO'),
        (N'217', N'COYAIMA'),
        (N'226', N'CUNDAY'),
        (N'236', N'DOLORES'),
        (N'268', N'ESPINAL'),
        (N'270', N'FALAN'),
        (N'275', N'FLANDES'),
        (N'283', N'FRESNO'),
        (N'319', N'GUAMO'),
        (N'347', N'HERVEO'),
        (N'349', N'HONDA'),
        (N'352', N'ICONONZO'),
        (N'408', N'LERIDA'),
        (N'411', N'LIBANO'),
        (N'443', N'MARIQUITA'),
        (N'449', N'MELGAR'),
        (N'461', N'MURILLO'),
        (N'483', N'NATAGAIMA'),
        (N'504', N'ORTEGA'),
        (N'520', N'PALOCABILDO'),
        (N'547', N'PIEDRAS'),
        (N'555', N'PLANADAS'),
        (N'563', N'PRADO'),
        (N'585', N'PURIFICACION'),
        (N'616', N'RIOBLANCO'),
        (N'622', N'RONCESVALLES'),
        (N'624', N'ROVIRA'),
        (N'671', N'SALDAÑA'),
        (N'675', N'SAN ANTONIO'),
        (N'678', N'SAN LUIS'),
        (N'686', N'SANTA ISABEL'),
        (N'770', N'SUAREZ'),
        (N'854', N'VALLE DE SAN JUAN'),
        (N'861', N'VENADILLO'),
        (N'870', N'VILLAHERMOSA'),
        (N'873', N'VILLARRICA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'73'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: VALLE DEL CAUCA (76)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'CALI'),
        (N'020', N'ALCALA'),
        (N'036', N'ANDALUCIA'),
        (N'041', N'ANSERMANUEVO'),
        (N'054', N'ARGELIA'),
        (N'100', N'BOLIVAR'),
        (N'109', N'BUENAVENTURA'),
        (N'111', N'BUGA'),
        (N'113', N'BUGALAGRANDE'),
        (N'122', N'CAICEDONIA'),
        (N'126', N'CALIMA'),
        (N'130', N'CANDELARIA'),
        (N'147', N'CARTAGO'),
        (N'233', N'DAGUA'),
        (N'243', N'EL AGUILA'),
        (N'246', N'EL CAIRO'),
        (N'248', N'EL CERRITO'),
        (N'250', N'EL DOVIO'),
        (N'275', N'FLORIDA'),
        (N'306', N'GINEBRA'),
        (N'318', N'GUACARI'),
        (N'364', N'JAMUNDI'),
        (N'377', N'LA CUMBRE'),
        (N'400', N'LA UNION'),
        (N'403', N'LA VICTORIA'),
        (N'497', N'OBANDO'),
        (N'520', N'PALMIRA'),
        (N'563', N'PRADERA'),
        (N'606', N'RESTREPO'),
        (N'616', N'RIOFRIO'),
        (N'622', N'ROLDANILLO'),
        (N'670', N'SAN PEDRO'),
        (N'736', N'SEVILLA'),
        (N'823', N'TORO'),
        (N'828', N'TRUJILLO'),
        (N'834', N'TULUA'),
        (N'845', N'ULLOA'),
        (N'863', N'VERSALLES'),
        (N'869', N'VIJES'),
        (N'890', N'YOTOCO'),
        (N'892', N'YUMBO'),
        (N'895', N'ZARZAL')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'76'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: ARAUCA (81)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'ARAUCA'),
        (N'065', N'ARAUQUITA'),
        (N'220', N'CRAVO NORTE'),
        (N'300', N'FORTUL'),
        (N'591', N'PUERTO RONDON'),
        (N'736', N'SARAVENA'),
        (N'794', N'TAME')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'81'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: CASANARE (85)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'YOPAL'),
        (N'010', N'AGUAZUL'),
        (N'015', N'CHAMEZA'),
        (N'125', N'HATO COROZAL'),
        (N'136', N'LA SALINA'),
        (N'139', N'MANI'),
        (N'162', N'MONTERREY'),
        (N'225', N'NUNCHIA'),
        (N'230', N'OROCUE'),
        (N'250', N'PAZ DE ARIPORO'),
        (N'263', N'PORE'),
        (N'279', N'RECETOR'),
        (N'300', N'SABANALARGA'),
        (N'315', N'SACAMA'),
        (N'325', N'SAN LUIS DE PALENQUE'),
        (N'400', N'TAMARA'),
        (N'410', N'TAURAMENA'),
        (N'430', N'TRINIDAD'),
        (N'440', N'VILLANUEVA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'85'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: PUTUMAYO (86)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'MOCOA'),
        (N'219', N'COLON'),
        (N'320', N'ORITO'),
        (N'568', N'PUERTO ASIS'),
        (N'569', N'PUERTO CAICEDO'),
        (N'571', N'PUERTO GUZMAN'),
        (N'573', N'PUERTO LEGUIZAMO'),
        (N'749', N'SIBUNDOY'),
        (N'755', N'SAN FRANCISCO'),
        (N'757', N'SAN MIGUEL'),
        (N'760', N'SANTIAGO'),
        (N'865', N'VALLE GUAMUEZ'),
        (N'885', N'VILLAGARZON')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'86'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: SAN ANDRES (88)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'SAN ANDRES'),
        (N'564', N'PROVIDENCIA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'88'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: AMAZONAS (91)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'LETICIA'),
        (N'263', N'EL ENCANTO'),
        (N'405', N'LA CHORRERA'),
        (N'407', N'LA PEDRERA'),
        (N'430', N'LA VICTORIA'),
        (N'460', N'MIRITI-PARANA'),
        (N'530', N'PUERTO ALEGRIA'),
        (N'536', N'PUERTO ARICA'),
        (N'540', N'PUERTO NARIÑO'),
        (N'669', N'PUERTO SANTANDER'),
        (N'798', N'TARAPACA')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'91'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: GUAINIA (94)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'INIRIDA'),
        (N'343', N'BARRANCO MINAS'),
        (N'663', N'MAPIRIPANA'),
        (N'883', N'SAN FELIPE'),
        (N'884', N'PUERTO COLOMBIA'),
        (N'885', N'LA GUADALUPE'),
        (N'886', N'CACAHUAL'),
        (N'887', N'PANA PANA'),
        (N'888', N'MORICHAL NUEVO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'94'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: GUAVIARE (95)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'SAN JOSE DEL GUAVIARE'),
        (N'015', N'CALAMAR'),
        (N'025', N'EL RETORNO'),
        (N'200', N'MIRAFLORES')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'95'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: VAUPES (97)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'MITU'),
        (N'161', N'CARURU'),
        (N'511', N'PACOA'),
        (N'666', N'TARAIRA'),
        (N'777', N'PAPUNAUA'),
        (N'889', N'YAVARATE')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'97'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- DEPARTAMENTO: VICHADA (99)
;WITH source AS (
    SELECT
        d.id AS department_id,
        v.code,
        v.name
    FROM (VALUES
        (N'001', N'PUERTO CARREÑO'),
        (N'524', N'LA PRIMAVERA'),
        (N'624', N'SANTA ROSALIA'),
        (N'773', N'CUMARIBO')
    ) AS v(code, name)
    INNER JOIN dbo.departments d ON d.code = N'99'
)
MERGE dbo.municipalities AS target
USING source
ON target.department_id = source.department_id AND target.code = source.code
WHEN NOT MATCHED BY TARGET THEN
    INSERT (department_id, code, name)
    VALUES (source.department_id, source.code, source.name)
WHEN MATCHED AND target.name <> source.name THEN
    UPDATE SET target.name = source.name;
GO

-- Resumen de carga
SELECT
    d.code AS department_code,
    d.name AS department_name,
    COUNT(m.id) AS municipalities_count
FROM dbo.departments d
LEFT JOIN dbo.municipalities m ON m.department_id = d.id
GROUP BY d.code, d.name
ORDER BY d.code;

