export interface Resource {
  id: string
  title: string
  url: string
  category: string
  tags?: string | null
  description: string
  notes?: string | null
  language?: string | null
  legalStatus: string
  verified: boolean
  addedBy?: string | null
  clicks: number
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface LearningPath {
  id: string
  title: string
  description: string
  category: string
  createdBy?: string | null
  createdAt: Date
  items: LearningPathItem[]
}

export interface LearningPathItem {
  id: string
  learningPathId: string
  resourceId: string
  order: number
  resource: Resource
}

export interface Report {
  id: string
  resourceId: string
  reason: string
  reportedBy?: string | null
  status: string
  createdAt: Date
  resource: Resource
}

export interface SearchFilters {
  category?: string[]
  tags?: string
  language?: string
  verified?: boolean
}

export interface SearchParams {
  q?: string
  category?: string
  tags?: string
  language?: string
  verified?: string
  sort?: string
  page?: string
}