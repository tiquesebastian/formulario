// Tipo de entrada/salida para registro de trazabilidad de PDFs.
export interface CreatePdfRecordParams {
  pdfId: string
  documentNumber: string
  departmentId: number
  municipalityId: number
  createdAt: Date
  pdfUrl?: string
}

export interface PdfRecord {
  id: number
  pdfId: string
  documentNumber: string
  departmentId: number
  municipalityId: number
  createdAt: string
  pdfUrl: string | null
}
