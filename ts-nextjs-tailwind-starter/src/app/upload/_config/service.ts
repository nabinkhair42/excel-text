// eslint-disable-next-line @typescript-eslint/no-explicit-any
import axios from 'axios';

import { UploadConfig } from './route';

import { UploadResponse } from '@/types/excel';

export const uploadExcelFile = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<UploadResponse>(
      UploadConfig.EXCEL_UPLOAD, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error uploading file');
    }
    throw error;
  }
};

export const checkServerStatus = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(UploadConfig.HELLO_WORLD);
    return response.data;
  } catch (error) {
    throw new Error('Error connecting to server');
  }
};
