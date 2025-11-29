import { notFound } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { ResourceDetail } from '@/components/resource-detail'
import { db } from '@/lib/db'

interface ResourcePageProps {
  params: {
    slug: string
  }
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const resource = await db.resource.findUnique({
    where: { slug: params.slug },
    include: {
      reports: true
    }
  })

  if (!resource) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ResourceDetail resource={resource} />
      </main>
    </div>
  )
}