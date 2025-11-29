import { Suspense } from 'react'
import { BrowseFilters } from '@/components/browse-filters'
import { ResourceGrid } from '@/components/resource-grid'
import { SearchParams } from '@/types'

interface BrowseContentProps {
  searchParams: SearchParams
}

export function BrowseContent({ searchParams }: BrowseContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <BrowseFilters searchParams={searchParams} />
      </div>
      <div className="lg:col-span-3">
        <Suspense fallback={<div>Loading resources...</div>}>
          <ResourceGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}