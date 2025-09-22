import { NextRequest, NextResponse } from 'next/server'
import { handleCors, createCorsResponse } from '../../lib/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log the event (in production, save to database)
    console.log('Event tracked:', {
      type: body.eventType,
      data: body.data,
      timestamp: body.timestamp,
      origin: request.headers.get('origin')
    })

    // In production, save to database and track for pixel seasoning
    // const event = await prisma.pixelEvent.create({
    //   data: {
    //     eventType: body.eventType,
    //     origin: request.headers.get('origin'),
    //     userAgent: request.headers.get('user-agent'),
    //     ...body.data
    //   }
    // })

    return createCorsResponse({ success: true }, 200, request)
  } catch (error) {
    console.error('Tracking error:', error)
    return createCorsResponse(
      { success: false, error: 'Failed to track event' },
      500,
      request
    )
  }
}