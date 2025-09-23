import { NextRequest, NextResponse } from 'next/server'

// Debug endpoint to test Claude API configuration
// This should be removed before production!
// Updated: 2025-09-23

export async function GET(request: NextRequest) {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY?.trim()

  // Basic check without exposing the key
  const debugInfo = {
    hasKey: !!CLAUDE_API_KEY,
    keyLength: CLAUDE_API_KEY?.length || 0,
    startsWithSkAnt: CLAUDE_API_KEY?.startsWith('sk-ant-') || false,
    hasWhitespace: CLAUDE_API_KEY !== CLAUDE_API_KEY?.trim(),
    first10Chars: CLAUDE_API_KEY ? CLAUDE_API_KEY.substring(0, 10) + '...' : 'NO KEY',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  }

  // Test actual API call
  let apiTestResult = {
    success: false,
    status: 0,
    error: '',
    response: ''
  }

  if (CLAUDE_API_KEY) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 50,
          messages: [{
            role: 'user',
            content: 'Say "API working" in exactly 2 words'
          }]
        })
      })

      apiTestResult.status = response.status

      if (response.ok) {
        const data = await response.json()
        apiTestResult.success = true
        apiTestResult.response = data.content[0].text
      } else {
        const errorText = await response.text()
        apiTestResult.error = errorText

        // Parse error for better readability
        try {
          const errorJson = JSON.parse(errorText)
          apiTestResult.error = errorJson.error?.message || errorJson.message || errorText
        } catch (e) {
          // Keep original error text
        }
      }
    } catch (err: any) {
      apiTestResult.error = err.message
    }
  } else {
    apiTestResult.error = 'No API key configured'
  }

  return NextResponse.json({
    debug: debugInfo,
    apiTest: apiTestResult,
    recommendation: getRecommendation(debugInfo, apiTestResult)
  })
}

function getRecommendation(debug: any, apiTest: any): string {
  if (!debug.hasKey) {
    return 'Add CLAUDE_API_KEY to Vercel environment variables'
  }
  if (!debug.startsWithSkAnt) {
    return 'API key format incorrect - should start with "sk-ant-"'
  }
  if (debug.hasWhitespace) {
    return 'API key has whitespace - check for quotes or spaces in Vercel'
  }
  if (apiTest.status === 401) {
    return 'API key is invalid or revoked - create a new one at console.anthropic.com'
  }
  if (apiTest.success) {
    return '✅ Everything is working correctly!'
  }
  return 'Unknown issue - check the error details above'
}