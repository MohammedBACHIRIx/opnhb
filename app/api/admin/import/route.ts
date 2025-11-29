import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Read file content
    const buffer = await file.arrayBuffer()
    const content = new TextDecoder().decode(buffer)
    
    // Parse CSV (basic implementation)
    const lines = content.split('\n').filter(line => line.trim())
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      return row
    })

    let imported = 0
    let skipped = 0

    for (const row of data) {
      // Validate required fields
      if (!row.title || !row.url || !row.category || !row.description) {
        skipped++
        continue
      }

      // Check for pirate links
      const isPirate = 
        row.url.includes('torrent') ||
        row.url.includes('z-library') ||
        row.url.includes('piratebay')

      try {
        await db.resource.create({
          data: {
            title: row.title,
            url: row.url,
            category: row.category,
            description: row.description,
            tags: row.tags || null,
            language: row.language || null,
            legalStatus: isPirate ? 'pirate' : 'user-submitted',
            verified: !isPirate,
            slug: generateSlug(row.title),
            addedBy: 'bulk-import'
          }
        })
        imported++
      } catch (error) {
        console.error('Error importing row:', error)
        skipped++
      }
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: data.length
    })

  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { error: 'Failed to import file' },
      { status: 500 }
    )
  }
}