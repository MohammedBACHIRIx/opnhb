'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface Report {
  id: string
  reason: string
  status: string
  createdAt: Date
  resource: {
    id: string
    title: string
    url: string
    category: string
  }
}

interface ReportsManagementProps {
  reports: Report[]
}

export function ReportsManagement({ reports }: ReportsManagementProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showResolveDialog, setShowResolveDialog] = useState(false)
  const [resolutionNotes, setResolutionNotes] = useState('')
  const { toast } = useToast()

  const handleResolve = async () => {
    if (!selectedReport || !resolutionNotes.trim()) return

    try {
      const response = await fetch(`/api/admin/reports/${selectedReport.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'resolved',
          resolutionNotes: resolutionNotes
        }),
      })

      if (response.ok) {
        toast({
          title: 'Report resolved',
          description: 'The report has been marked as resolved.',
        })
        setShowResolveDialog(false)
        setSelectedReport(null)
        setResolutionNotes('')
        // Refresh the page to update the list
        window.location.reload()
      } else {
        throw new Error('Failed to resolve report')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resolve report. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (reports.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Open Reports</h3>
          <p className="text-muted-foreground">All reports have been resolved.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Open Reports ({reports.length})</h2>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">
                    {report.resource.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{report.resource.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Reported {formatDate(report.createdAt)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(report.resource.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Resource
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Report Reason</AlertTitle>
                <AlertDescription>{report.reason}</AlertDescription>
              </Alert>
              
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedReport(report)
                    setShowResolveDialog(true)
                  }}
                >
                  Mark as Resolved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/resources/${report.resource.id}`, {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ legalStatus: 'pirate' }),
                      })

                      if (response.ok) {
                        toast({
                          title: 'Resource flagged',
                          description: 'The resource has been marked as pirate content.',
                        })
                      }
                    } catch (error) {
                      toast({
                        title: 'Error',
                        description: 'Failed to flag resource.',
                        variant: 'destructive',
                      })
                    }
                  }}
                >
                  Flag as Pirate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Report</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="resolution-notes">Resolution Notes</Label>
              <Textarea
                id="resolution-notes"
                placeholder="Describe how this report was resolved..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowResolveDialog(false)
                setResolutionNotes('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleResolve}
              disabled={!resolutionNotes.trim()}
            >
              Mark as Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}