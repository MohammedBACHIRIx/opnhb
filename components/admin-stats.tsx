import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  BookOpen,
  TrendingUp
} from 'lucide-react'

interface AdminStatsProps {
  totalResources: number
  verifiedResources: number
  pirateResources: number
  openReports: number
  totalLearningPaths: number
}

export function AdminStats({
  totalResources,
  verifiedResources,
  pirateResources,
  openReports,
  totalLearningPaths
}: AdminStatsProps) {
  const verifiedPercentage = Math.round((verifiedResources / totalResources) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalResources}</div>
          <p className="text-xs text-muted-foreground">
            {verifiedPercentage}% verified
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Resources</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{verifiedResources}</div>
          <p className="text-xs text-muted-foreground">
            {verifiedPercentage}% of total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Learning Paths</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLearningPaths}</div>
          <p className="text-xs text-muted-foreground">
            Curated collections
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Reports</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openReports}</div>
          <p className="text-xs text-muted-foreground">
            Needs attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pirateResources}</div>
          <p className="text-xs text-muted-foreground">
            Potentially problematic
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12%</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}