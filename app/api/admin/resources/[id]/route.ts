import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { verified, legalStatus } = body

    const updateData: any = {}
    if (verified !== undefined) updateData.verified = verified
    if (legalStatus !== undefined) updateData.legalStatus = legalStatus

    const resource = await db.resource.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({ success: true, resource })
  } catch (error) {
    console.error('Failed to update resource:', error)
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.resource.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete resource:', error)
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
}