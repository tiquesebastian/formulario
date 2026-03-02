-- 001_create_core_tables.sql
-- Estructura mínima para catálogo y trazabilidad de PDFs.

IF OBJECT_ID('dbo.departments', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.departments (
        id            INT IDENTITY(1,1) PRIMARY KEY,
        code          NVARCHAR(10)  NOT NULL,
        name          NVARCHAR(120) NOT NULL,
        created_at    DATETIME2(0)  NOT NULL CONSTRAINT DF_departments_created_at DEFAULT SYSDATETIME(),
        CONSTRAINT UQ_departments_code UNIQUE (code),
        CONSTRAINT UQ_departments_name UNIQUE (name)
    );
END;

IF OBJECT_ID('dbo.municipalities', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.municipalities (
        id             INT IDENTITY(1,1) PRIMARY KEY,
        department_id  INT           NOT NULL,
        code           NVARCHAR(10)  NOT NULL,
        name           NVARCHAR(140) NOT NULL,
        created_at     DATETIME2(0)  NOT NULL CONSTRAINT DF_municipalities_created_at DEFAULT SYSDATETIME(),

        CONSTRAINT FK_municipalities_departments
            FOREIGN KEY (department_id) REFERENCES dbo.departments(id),

        CONSTRAINT UQ_municipalities_department_code UNIQUE (department_id, code),
        CONSTRAINT UQ_municipalities_department_name UNIQUE (department_id, name)
    );
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_municipalities_department_id'
      AND object_id = OBJECT_ID('dbo.municipalities')
)
BEGIN
    CREATE INDEX IX_municipalities_department_id
        ON dbo.municipalities(department_id);
END;

IF OBJECT_ID('dbo.pdf_records', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.pdf_records (
        id              BIGINT IDENTITY(1,1) PRIMARY KEY,
        pdf_id          NVARCHAR(80)  NOT NULL,
        document_number NVARCHAR(30)  NOT NULL,
        department_id   INT           NOT NULL,
        municipality_id INT           NOT NULL,
        pdf_url         NVARCHAR(500) NULL,
        created_at      DATETIME2(0)  NOT NULL CONSTRAINT DF_pdf_records_created_at DEFAULT SYSDATETIME(),

        CONSTRAINT FK_pdf_records_departments
            FOREIGN KEY (department_id) REFERENCES dbo.departments(id),

        CONSTRAINT FK_pdf_records_municipalities
            FOREIGN KEY (municipality_id) REFERENCES dbo.municipalities(id)
    );
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'UQ_pdf_records_pdf_id'
      AND object_id = OBJECT_ID('dbo.pdf_records')
)
BEGIN
    CREATE UNIQUE INDEX UQ_pdf_records_pdf_id
        ON dbo.pdf_records(pdf_id);
END;

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_pdf_records_created_at'
      AND object_id = OBJECT_ID('dbo.pdf_records')
)
BEGIN
    CREATE INDEX IX_pdf_records_created_at
        ON dbo.pdf_records(created_at);
END;
