import { db } from '@/lib/db'
import { SearchParams } from '@/types'
import { ResourceCard } from '@/components/resource-card'
import { Pagination } from '@/components/pagination'

interface ResourceGridProps {
  searchParams: SearchParams
}

export async function ResourceGrid({ searchParams }: ResourceGridProps) {
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Build where clause
  const where: any = {
    legalStatus: {
      not: 'pirate'
    }
  }

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: 'insensitive' } },
      { description: { contains: searchParams.q, mode: 'insensitive' } },
      { tags: { contains: searchParams.q, mode: 'insensitive' } }
    ]
  }

  if (searchParams.category) {
    where.category = {
      in: searchParams.category.split(',')
    }
  }

  if (searchParams.language) {
    where.language = searchParams.language
  }

  if (searchParams.verified === 'true') {
    where.verified = true
  }

  // Build order by
  const orderBy: any = {}
  switch (searchParams.sort) {
    case 'clicks':
      orderBy.clicks = 'desc'
      break
    case 'title':
      orderBy.title = 'asc'
      break
    default:
      orderBy.createdAt = 'desc'
  }

  const [resources, totalCount] = await Promise.all([
    db.resource.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        tags: true,
        language: true,
        slug: true,
        verified: true,
        clicks: true,
        createdAt: true,
        url: true
      }
    }),
    db.resource.count({ where })
  ])

  const totalPages = Math.ceil(totalCount / limit)

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No resources found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}
    </div>
  )
}