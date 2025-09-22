import { NextRequest, NextResponse } from 'next/server'

const isDev = process.env.NODE_ENV === 'development'

const allowedOrigins = isDev
  ? ['http://localhost:3000', 'http://localhost:3001', 'https://firstaidforads.com']
  : ['https://firstaidforads.com', 'https://www.firstaidforads.com']

export function corsHeaders(origin?: string | null) {
  const isAllowedOrigin = origin && allowedOrigins.includes(origin)

  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Origin, Accept',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  }
}

export function handleCors(request: NextRequest): NextResponse {
  const origin = request.headers.get('origin')

  // Always return NextResponse for OPTIONS
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  })
}

export function createCorsResponse(data: any, status = 200, request: NextRequest) {
  const origin = request.headers.get('origin')

  return NextResponse.json(data, {
    status,
    headers: corsHeaders(origin),
  })
}