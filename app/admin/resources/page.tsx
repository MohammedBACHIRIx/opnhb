import { Navigation } from '@/components/navigation'
import { AdminNavigation } from '@/components/admin-navigation'
import { ResourceManagement } from '@/components/resource-management'
import { db } from '@/lib/db'

export default async function ResourcesPage() {
  const resources = await db.resource.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      url: true,
      category: true,
      description: true,
      language: true,
      legalStatus: true,
      verified: true,
      clicks: true,
      createdAt: true,
      addedBy: true,
      slug: true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resource Management</h1>
          <p className="text-muted-foreground">Manage all resources in the system</p>
        </div>
        
        <AdminNavigation />
        
        <div className="mt-8">
          <ResourceManagement resources={resources} />
        </div>
      </div>
    </div>
  )
}