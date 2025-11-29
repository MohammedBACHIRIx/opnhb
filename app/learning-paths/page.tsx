import { Navigation } from '@/components/navigation'
import { LearningPathsGrid } from '@/components/learning-paths-grid'
import { db } from '@/lib/db'

export default async function LearningPathsPage() {
  const learningPaths = await db.learningPath.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          resource: true
        }
      }
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learning Paths</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated collections of resources to guide your learning journey
          </p>
        </div>
        <LearningPathsGrid paths={learningPaths} />
      </main>
    </div>
  )
}