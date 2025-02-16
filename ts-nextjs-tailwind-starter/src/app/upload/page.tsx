'use client';

import { useState } from 'react';

import { Upload } from '@/app/upload/_components/upload';
import { View } from '@/app/upload/_components/view';

import { ExcelData } from '@/types/excel';

export default function UploadPage() {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);

  return (
    <main className="container mx-auto py-8">
      <Upload onUploadSuccess={setExcelData} />
      <View data={excelData} />
    </main>
  );
}