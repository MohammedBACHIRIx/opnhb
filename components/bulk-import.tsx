'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, Download, AlertCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export function BulkImport() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setFile(selectedFile)
      } else {
        toast({
          title: 'Invalid file type',
          description: 'Please select a CSV or Excel file.',
          variant: 'destructive',
        })
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: 'Import successful',
          description: `Imported ${result.imported} resources successfully.`,
        })
        setFile(null)
      } else {
        throw new Error(result.error || 'Import failed')
      }
    } catch (error) {
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'Failed to import resources',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const downloadTemplate = () => {
    const template = [
      ['title', 'url', 'category', 'description', 'tags', 'language'],
      ['Introduction to Machine Learning', 'https://example.com/ml-course', 'AI/ML', 'A comprehensive course on ML fundamentals', 'machine learning, AI, beginner', 'English'],
      ['Advanced React Patterns', 'https://example.com/react-patterns', 'Courses', 'Deep dive into React design patterns', 'react, javascript, frontend', 'English']
    ]

    const csvContent = template.map(row => row.map(field => `"${field}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'import-template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Import Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Upload a CSV or Excel file with resource data. Files containing URLs with 
              "torrent", "z-library", or "piratebay" will be automatically flagged.
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="file-upload">Select File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="mt-2"
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
            
            <Button
              variant="outline"
              onClick={downloadTemplate}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <h4 className="font-medium mb-2">Required Columns:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>title</strong> - Resource title</li>
              <li><strong>url</strong> - Resource URL</li>
              <li><strong>category</strong> - Category (Electronics, AI/ML, Research, etc.)</li>
              <li><strong>description</strong> - Brief description</li>
              <li><strong>tags</strong> - Comma-separated tags (optional)</li>
              <li><strong>language</strong> - Language (optional)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}