export interface ExcelRow {
  [key: string]: string | number | null;
}

export interface ExcelData {
  headers: string[];
  rows: ExcelRow[];
}

export interface UploadResponse {
  message: string;
  data: ExcelData;
} 