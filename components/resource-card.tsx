import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, CheckCircle, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ResourceCardProps {
  resource: {
    id: string
    title: string
    description: string
    category: string
    tags?: string | null
    language?: string | null
    slug: string
    verified: boolean
    clicks: number
    createdAt: Date
    url: string
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const tags = resource.tags ? resource.tags.split(',').filter(tag => tag.trim()) : []

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">
            <Link href={`/resource/${resource.slug}`} className="hover:underline">
              {resource.title}
            </Link>
          </CardTitle>
          {resource.verified && (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="secondary">{resource.category}</Badge>
          {resource.language && (
            <Badge variant="outline">{resource.language}</Badge>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {resource.clicks}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {resource.description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild size="sm" className="flex-1">
          <Link href={`/resource/${resource.slug}`}>
            View Details
          </Link>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => window.open(resource.url, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}