import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { FeaturedCategories } from '@/components/featured-categories'
import { RecentResources } from '@/components/recent-resources'
import { db } from '@/lib/db'

export default async function HomePage() {
  const recentResources = await db.resource.findMany({
    where: { verified: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      slug: true,
      createdAt: true,
      verified: true,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <RecentResources resources={recentResources} />
      </main>
    </div>
  )
}