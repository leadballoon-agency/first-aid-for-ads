import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // For now, just log the feedback (in production, save to database)
    console.log('Feedback received:', body)
    
    // In production, you would save to database here:
    // const feedback = await prisma.feedback.create({
    //   data: {
    //     type: body.type.toUpperCase(),
    //     rating: body.rating,
    //     message: body.message,
    //     email: body.email,
    //     page: body.page,
    //     userAgent: body.metadata?.userAgent,
    //     sessionId: body.metadata?.sessionId,
    //   }
    // })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Feedback received successfully' 
    })
  } catch (error) {
    console.error('Feedback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}