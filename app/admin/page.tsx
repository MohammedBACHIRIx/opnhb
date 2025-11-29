import { Navigation } from '@/components/navigation'
import { AdminNavigation } from '@/components/admin-navigation'
import { AdminStats } from '@/components/admin-stats'
import { db } from '@/lib/db'

export default async function AdminDashboard() {
  const stats = await Promise.all([
    db.resource.count(),
    db.resource.count({ where: { verified: true } }),
    db.resource.count({ where: { legalStatus: 'pirate' } }),
    db.report.count({ where: { status: 'open' } }),
    db.learningPath.count(),
  ])

  const [
    totalResources,
    verifiedResources,
    pirateResources,
    openReports,
    totalLearningPaths
  ] = stats

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your OpenKnowledge Hub platform</p>
        </div>
        
        <AdminNavigation />
        
        <div className="mt-8">
          <AdminStats
            totalResources={totalResources}
            verifiedResources={verifiedResources}
            pirateResources={pirateResources}
            openReports={openReports}
            totalLearningPaths={totalLearningPaths}
          />
        </div>
      </div>
    </div>
  )
}