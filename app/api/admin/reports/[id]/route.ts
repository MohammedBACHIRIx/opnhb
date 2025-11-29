import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, resolutionNotes } = body

    const report = await db.report.update({
      where: { id: params.id },
      data: {
        status,
        ...(resolutionNotes && { resolutionNotes })
      }
    })

    return NextResponse.json({ success: true, report })
  } catch (error) {
    console.error('Failed to update report:', error)
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    )
  }
}