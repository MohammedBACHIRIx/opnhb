import { Navigation } from '@/components/navigation'
import { AIAssistant } from '@/components/ai-assistant'

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized resource recommendations powered by AI
          </p>
        </div>
        <AIAssistant />
      </main>
    </div>
  )
}