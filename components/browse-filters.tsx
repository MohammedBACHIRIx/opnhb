'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SearchParams } from '@/types'

const categories = ['Electronics', 'AI/ML', 'Research', 'Courses', 'Tools', 'Books']
const languages = ['English', 'Arabic', 'French', 'Spanish', 'German', 'Chinese']

interface BrowseFiltersProps {
  searchParams: SearchParams
}

export function BrowseFilters({ searchParams }: BrowseFiltersProps) {
  const router = useRouter()
  const currentParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(currentParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/browse?${params.toString()}`)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const params = new URLSearchParams(currentParams)
    const currentCategories = params.get('category')?.split(',') || []
    
    if (checked) {
      if (!currentCategories.includes(category)) {
        currentCategories.push(category)
      }
    } else {
      const index = currentCategories.indexOf(category)
      if (index > -1) {
        currentCategories.splice(index, 1)
      }
    }
    
    if (currentCategories.length > 0) {
      params.set('category', currentCategories.join(','))
    } else {
      params.delete('category')
    }
    
    router.push(`/browse?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/browse')
  }

  const selectedCategories = searchParams.category?.split(',') || []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search resources..."
            value={searchParams.q || ''}
            onChange={(e) => handleFilterChange('q', e.target.value)}
          />
        </div>

        <div>
          <Label>Categories</Label>
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Select
            value={searchParams.language || ''}
            onValueChange={(value) => handleFilterChange('language', value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Languages</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sort">Sort By</Label>
          <Select
            value={searchParams.sort || 'createdAt'}
            onValueChange={(value) => handleFilterChange('sort', value)}
          >
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Date Added</SelectItem>
              <SelectItem value="clicks">Popularity</SelectItem>
              <SelectItem value="title">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={searchParams.verified === 'true'}
            onCheckedChange={(checked) => 
              handleFilterChange('verified', checked ? 'true' : '')
            }
          />
          <Label
            htmlFor="verified"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Verified Only
          </Label>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}