import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock } from 'lucide-react'

interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  createdBy?: string | null
  createdAt: Date
  items: Array<{
    id: string
    order: number
    resource: {
      id: string
      title: string
      slug: string
    }
  }>
}

interface LearningPathsGridProps {
  paths: LearningPath[]
}

export function LearningPathsGrid({ paths }: LearningPathsGridProps) {
  if (paths.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No learning paths available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {paths.map((path) => (
        <Link key={path.id} href={`/learning-paths/${path.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">
                  {path.title}
                </CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {path.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {path.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{path.items.length} resources</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Resources:</h4>
                  <div className="space-y-1">
                    {path.items.slice(0, 3).map((item) => (
                      <p key={item.id} className="text-xs text-muted-foreground truncate">
                        {item.order + 1}. {item.resource.title}
                      </p>
                    ))}
                    {path.items.length > 3 && (
                      <p className="text-xs text-muted-foreground">
                        +{path.items.length - 3} more resources
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Created {formatDate(path.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}