import { Navigation } from '@/components/navigation'
import { BrowseContent } from '@/components/browse-content'
import { SearchParams } from '@/types'

interface BrowsePageProps {
  searchParams: SearchParams
}

export default function BrowsePage({ searchParams }: BrowsePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Resources</h1>
        <BrowseContent searchParams={searchParams} />
      </main>
    </div>
  )
}