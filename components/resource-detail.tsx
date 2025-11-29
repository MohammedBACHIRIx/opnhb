'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReportDialog } from '@/components/report-dialog'
import { ExternalLink, CheckCircle, Eye, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Resource } from '@/types'

interface ResourceDetailProps {
  resource: Resource & {
    reports: any[]
  }
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [notes, setNotes] = useState<any>(null)

  // Parse multilingual notes
  React.useEffect(() => {
    if (resource.notes) {
      try {
        setNotes(JSON.parse(resource.notes))
      } catch {
        setNotes(null)
      }
    }
  }, [resource.notes])

  const handleOpenLink = async () => {
    // Track click
    await fetch(`/api/resources/${resource.id}/click`, {
      method: 'POST'
    })
    
    // Open the link
    window.open(resource.url, '_blank')
  }

  const tags = resource.tags ? resource.tags.split(',').filter(tag => tag.trim()) : []

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="default" className="text-sm">
                  {resource.category}
                </Badge>
                {resource.verified && (
                  <Badge variant="secondary" className="text-sm flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
                {resource.language && (
                  <Badge variant="outline" className="text-sm">
                    {resource.language}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {resource.clicks} views
                </span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{resource.description}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Added {formatDate(resource.createdAt)}</span>
            <span>•</span>
            <span>Status: {resource.legalStatus}</span>
            {resource.addedBy && (
              <>
                <span>•</span>
                <span>Added by: {resource.addedBy}</span>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleOpenLink}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Link
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowReportDialog(true)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>

          {notes && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Additional Notes</h3>
              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="mt-4">
                  <Card>
                    <CardContent className="pt-4">
                      {notes.en || 'No notes available in English'}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="ar" className="mt-4">
                  <Card>
                    <CardContent className="pt-4" dir="rtl">
                      {notes.ar || 'لا توجد ملاحظات متوفرة باللغة العربية'}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="fr" className="mt-4">
                  <Card>
                    <CardContent className="pt-4">
                      {notes.fr || 'Aucune note disponible en français'}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>

      <ReportDialog
        resourceId={resource.id}
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
      />
    </div>
  )
}