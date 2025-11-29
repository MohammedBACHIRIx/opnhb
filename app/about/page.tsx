import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Shield, Users, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About OpenKnowledge Hub</h1>
            <p className="text-xl text-muted-foreground">
              Empowering learners through curated, accessible knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  OpenKnowledge Hub is dedicated to democratizing access to quality educational resources. 
                  We believe that knowledge should be freely accessible to everyone, regardless of their 
                  geographic location or economic status.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Legal & Ethical Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We operate under strict ethical guidelines. Our platform only indexes publicly available 
                  links for educational purposes. We do not host or promote illegal content and provide 
                  mechanisms for users to report problematic links.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Community-Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our platform thrives on community contributions. Users can submit resources, 
                  create learning paths, and help maintain the quality of our content through 
                  reporting and verification systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Multilingual Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We support multiple languages including English, Arabic, and French, 
                  making educational resources accessible to a global audience. 
                  Our interface and content notes are available in multiple languages.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Transparency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We believe in complete transparency about how we collect and use data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Click Tracking:</strong> We track clicks on resource links to measure 
                  popularity and improve our recommendations. This data is anonymized and 
                  used only for statistical purposes.
                </li>
                <li>
                  <strong>Content Verification:</strong> Resources are marked as verified 
                  through community feedback and administrative review processes.
                </li>
                <li>
                  <strong>Legal Status:</strong> Each resource is categorized by its legal status 
                  (official, mirror, user-submitted, or flagged as inappropriate).
                </li>
                <li>
                  <strong>No Personal Data:</strong> We do not collect or store personal 
                  information about our users. All interactions are anonymous.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Built with modern web technologies including Next.js, TypeScript, and PostgreSQL
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}