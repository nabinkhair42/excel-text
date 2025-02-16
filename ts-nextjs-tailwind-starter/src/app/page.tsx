'use client';

import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const Page = () => {
  const router = useRouter();

  return (
    <main className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 border border-dashed rounded-md p-4">
        <h1 className="text-3xl font-bold">Excel File Upload</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Upload and view your Excel files easily. Click below to get started.
        </p>
        <Button
          onClick={() => router.push('/upload')}
          className="flex items-center gap-2"
        >
          <UploadCloud className="w-4 h-4" />
          Go to Upload Page
        </Button>
      </div>
    </main>
  );
};

export default Page;