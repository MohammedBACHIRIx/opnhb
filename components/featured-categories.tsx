import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Cpu, FlaskConical, Wrench, GraduationCap, Search } from 'lucide-react'

const categories = [
  {
    title: 'Electronics',
    icon: Cpu,
    description: 'Hardware, circuits, and electronic systems',
    href: '/browse?category=Electronics',
    emoji: '⚙️'
  },
  {
    title: 'AI/ML',
    icon: Search,
    description: 'Artificial Intelligence and Machine Learning',
    href: '/browse?category=AI%2FML',
    emoji: '🤖'
  },
  {
    title: 'Research',
    icon: FlaskConical,
    description: 'Scientific papers and research materials',
    href: '/browse?category=Research',
    emoji: '🔬'
  },
  {
    title: 'Courses',
    icon: GraduationCap,
    description: 'Online courses and educational content',
    href: '/browse?category=Courses',
    emoji: '📚'
  },
  {
    title: 'Tools',
    icon: Wrench,
    description: 'Development tools and software',
    href: '/browse?category=Tools',
    emoji: '🛠️'
  },
  {
    title: 'Books',
    icon: BookOpen,
    description: 'Digital books and publications',
    href: '/browse?category=Books',
    emoji: '📖'
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <span>{category.title}</span>
                      <Icon className="h-5 w-5 text-muted-foreground ml-auto" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}