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

export function handleCors(request: NextRequest) {
  const origin = request.headers.get('origin')

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(origin),
    })
  }

  return corsHeaders(origin)
}

export function createCorsResponse(data: any, status = 200, request: NextRequest) {
  const headers = handleCors(request)

  return NextResponse.json(data, {
    status,
    headers: typeof headers === 'object' && 'Access-Control-Allow-Origin' in headers
      ? headers
      : corsHeaders(request.headers.get('origin')),
  })
}