import { Navigation } from '@/components/navigation'
import { AdminNavigation } from '@/components/admin-navigation'
import { BulkImport } from '@/components/bulk-import'

export default function ImportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bulk Import</h1>
          <p className="text-muted-foreground">Import resources from CSV or Excel files</p>
        </div>
        
        <AdminNavigation />
        
        <div className="mt-8">
          <BulkImport />
        </div>
      </div>
    </div>
  )
}