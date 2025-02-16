import { Express, Request, Response } from 'express';
import { HelloController } from '@/controllers/hello';
import { ExcelUploadController } from '@/controllers/excelUpload';
import upload from '@/middleware/upload';

export const setupRoutes = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
  
  // Add more routes here
  app.get('/hello', HelloController);
  
  app.post('/upload', 
    upload.single('file'), 
    ExcelUploadController
  );
}; 