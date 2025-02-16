import { Request, Response } from 'express';
import Excel from 'exceljs';
import { ExcelData, UploadResponse } from '@/types/excel';
import { logger } from '@/utils/logger';

export const ExcelUploadController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      logger.error('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    logger.info('File upload received', {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    logger.success('Excel workbook loaded');

    const worksheet = workbook.getWorksheet(1);
    
    if (!worksheet) {
      logger.error('No worksheet found in the workbook');
      return res.status(400).json({ 
        message: 'Could not read worksheet from the uploaded file' 
      });
    }

    logger.info('Worksheet details', {
      name: worksheet.name,
      rowCount: worksheet.rowCount,
      columnCount: worksheet.columnCount,
      actualRowCount: worksheet.actualRowCount
    });

    const excelData: ExcelData = {
      headers: [],
      rows: []
    };

    // Get first row for debugging
    const firstRow = worksheet.getRow(1);
    logger.info('First row cells:', {
      values: firstRow.values,
      cellCount: firstRow.cellCount,
      actualCellCount: firstRow.actualCellCount
    });

    // Directly access cells by column number up to the actual column count
    for (let colNumber = 1; colNumber <= worksheet.columnCount; colNumber++) {
      const cell = firstRow.getCell(colNumber);
      
      // Log detailed cell information for debugging
      logger.info(`Processing column ${colNumber}:`, {
        type: typeof cell.value,
        value: cell.value,
        text: cell.text,
        formula: cell.formula,
        result: cell.result
      });

      let headerText = '';

      // Try different ways to get cell value
      if (cell.text) {
        headerText = cell.text.trim();
      } else if (cell.value !== null && cell.value !== undefined) {
        if (typeof cell.value === 'object') {
          // Handle rich text
          if ('richText' in cell.value && Array.isArray(cell.value.richText)) {
            headerText = cell.value.richText.map((t: any) => t?.text || '').join('');
          }
          // Handle result property
          else if ('result' in cell.value && cell.value.result !== undefined) {
            headerText = cell.value.result.toString();
          }
          // Handle text property
          else if ('text' in cell.value && cell.value.text !== undefined) {
            headerText = cell.value.text;
          }
        } else {
          headerText = cell.value.toString();
        }
      }

      headerText = headerText.trim();
      if (headerText) {
        excelData.headers.push(headerText);
      }
    }

    logger.info('Raw headers found:', excelData.headers);
    logger.success('Headers processed', excelData.headers);

    if (excelData.headers.length === 0) {
      // Try to read the first non-empty row as headers
      let headerRowIndex = 1;
      while (headerRowIndex <= Math.min(5, worksheet.actualRowCount)) {
        const row = worksheet.getRow(headerRowIndex);
        let hasContent = false;
        const tempHeaders: string[] = [];

        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
          const text = cell.text?.trim() || '';
          if (text) {
            hasContent = true;
            tempHeaders.push(text);
          }
        });

        if (hasContent) {
          excelData.headers = tempHeaders;
          logger.info(`Found headers in row ${headerRowIndex}:`, tempHeaders);
          break;
        }
        headerRowIndex++;
      }

      if (excelData.headers.length === 0) {
        logger.error('No headers found in the first 5 rows of the Excel file');
        return res.status(400).json({ 
          message: 'No headers found in the Excel file' 
        });
      }
    }

    // Process data rows (start from the row after headers)
    for (let rowNumber = 2; rowNumber <= worksheet.actualRowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      const rowData: { [key: string]: string | number | null } = {};
      let hasValue = false;

      excelData.headers.forEach((header, index) => {
        const cell = row.getCell(index + 1);
        let value = cell.text || cell.value;

        if (value !== null && value !== undefined) {
          if (typeof value === 'object') {
            if ('result' in value && value.result !== undefined) {
              value = value.result;
            } else if ('text' in value && value.text !== undefined) {
              value = value.text;
            }
          }

          if (typeof value === 'number') {
            rowData[header] = value;
            hasValue = true;
          } else if (value !== '') {
            rowData[header] = value?.toString().trim() || null;
            hasValue = true;
          } else {
            rowData[header] = null;
          }
        } else {
          rowData[header] = null;
        }
      });

      if (hasValue) {
        excelData.rows.push(rowData);
      }
    }

    logger.success('Excel processing complete', {
      headerCount: excelData.headers.length,
      rowCount: excelData.rows.length,
      headers: excelData.headers,
      sampleData: excelData.rows.slice(0, 2)
    });

    const response: UploadResponse = {
      message: 'File uploaded and processed successfully',
      data: excelData
    };

    return res.status(200).json(response);
  } catch (error) {
    logger.error('Error processing excel file', error);
    return res.status(500).json({ 
      message: 'Error processing excel file',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};