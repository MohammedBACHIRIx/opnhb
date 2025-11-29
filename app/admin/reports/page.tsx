import { Navigation } from '@/components/navigation'
import { AdminNavigation } from '@/components/admin-navigation'
import { ReportsManagement } from '@/components/reports-management'
import { db } from '@/lib/db'

export default async function ReportsPage() {
  const reports = await db.report.findMany({
    where: { status: 'open' },
    orderBy: { createdAt: 'desc' },
    include: {
      resource: {
        select: {
          id: true,
          title: true,
          url: true,
          category: true
        }
      }
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reports Management</h1>
          <p className="text-muted-foreground">Review and manage user reports</p>
        </div>
        
        <AdminNavigation />
        
        <div className="mt-8">
          <ReportsManagement reports={reports} />
        </div>
      </div>
    </div>
  )
}