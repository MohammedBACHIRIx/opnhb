import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Perform full-text search using PostgreSQL
    const resources = await db.$queryRaw`
      SELECT 
        id,
        title,
        description,
        category,
        tags,
        language,
        slug,
        verified,
        clicks,
        created_at as "createdAt",
        url
      FROM "Resource"
      WHERE 
        "legalStatus" != 'pirate'
        AND "verified" = true
        AND (
          to_tsvector('english', title) @@ plainto_tsquery('english', ${query}) OR
          to_tsvector('english', description) @@ plainto_tsquery('english', ${query}) OR
          to_tsvector('english', COALESCE(tags, '')) @@ plainto_tsquery('english', ${query}) OR
          to_tsvector('english', COALESCE("notes", '')) @@ plainto_tsquery('english', ${query})
        )
      ORDER BY 
        ts_rank(
          to_tsvector('english', title || ' ' || description || ' ' || COALESCE(tags, '') || ' ' || COALESCE("notes", '')),
          plainto_tsquery('english', ${query})
        ) DESC
      LIMIT 3
    `

    if (resources.length === 0) {
      // Fallback: suggest popular categories
      const categories = ['AI/ML', 'Electronics', 'Research', 'Courses', 'Tools']
      return NextResponse.json({
        message: "I couldn't find specific resources matching your query, but here are some popular categories you might be interested in:",
        resources: [],
        suggestions: categories
      })
    }

    return NextResponse.json({
      message: "Here are a few recommendations based on your query:",
      resources: resources
    })

  } catch (error) {
    console.error('AI Assistant error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}