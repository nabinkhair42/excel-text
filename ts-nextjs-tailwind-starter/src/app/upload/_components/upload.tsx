"use client"

import { File, Loader2, UploadCloud } from "lucide-react"
import { useCallback,useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { uploadExcelFile } from "../_config/service"

import type { ExcelData } from "@/types/excel"

interface UploadProps {
  onUploadSuccess: (data: ExcelData) => void
}

export const Upload = ({ onUploadSuccess }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
        toast.error("Please upload only Excel files")
        return
      }
      setFile(selectedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first")
      return
    }

    setLoading(true)
    setProgress(0)
    try {
      const response = await uploadExcelFile(file, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)
      })
      toast.success("File uploaded successfully")
      onUploadSuccess(response.data)
      setFile(null)
      setProgress(0)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error uploading file")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto !border-none !shadow-none text-center items-center">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-primary" /> Upload Excel File
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
            isDragActive ? "border-primary" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-2 text-center">
            <UploadCloud className="w-8 h-8 text-gray-400" />
            <span className="font-medium text-gray-600">
              {isDragActive ? "Drop the file here" : "Drag & drop your Excel file here"}
            </span>
            <span className="text-xs text-gray-500">or click to select a file</span>
          </div>
        </div>
        {file && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <File className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 truncate">Selected file: {file.name}</span>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
              Remove
            </Button>
          </div>
        )}
        {loading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-center text-muted-foreground">{progress}% uploaded</p>
          </div>
        )}
        <Button onClick={handleUpload} disabled={!file || loading} className="w-full">
          {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </CardContent>
    </Card>
  )
}

