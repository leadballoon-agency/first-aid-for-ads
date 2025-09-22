import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Store conversations in a JSON file for now (can switch to database later)
const CONVERSATIONS_FILE = path.join(process.cwd(), 'data', 'conversations.json')
const PATTERNS_FILE = path.join(process.cwd(), 'data', 'patterns.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load existing conversations
async function loadConversations() {
  try {
    const data = await fs.readFile(CONVERSATIONS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Save conversations
async function saveConversations(conversations: any[]) {
  await ensureDataDir()
  await fs.writeFile(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2))
}

// Load patterns
async function loadPatterns() {
  try {
    const data = await fs.readFile(PATTERNS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {
      successful: [],
      failed: [],
      insights: []
    }
  }
}

// Save patterns
async function savePatterns(patterns: any) {
  await ensureDataDir()
  await fs.writeFile(PATTERNS_FILE, JSON.stringify(patterns, null, 2))
}

// Analyze conversation for patterns
function analyzeConversation(conversation: any) {
  const insights: any[] = []

  // Pattern 1: No pixel → Booking
  if (!conversation.pixelFound && conversation.bookedCall) {
    insights.push({
      type: 'success_pattern',
      category: 'no_pixel_to_booking',
      trigger: 'No pixel detected + spending money',
      outcome: 'Booked technical call',
      confidence: 0.9
    })
  }

  // Pattern 2: Learning limited → Trial
  if (conversation.conversionsPerWeek === '10_50' && conversation.callType === 'kerry_trial') {
    insights.push({
      type: 'success_pattern',
      category: 'learning_limited_to_trial',
      trigger: 'Learning limited (10-50 conversions)',
      outcome: 'Signed up for Kerry trial',
      confidence: 0.85
    })
  }

  // Pattern 3: Quick abandonment
  if (conversation.messageCount <= 1 && !conversation.bookedCall) {
    insights.push({
      type: 'failure_pattern',
      category: 'quick_abandonment',
      trigger: 'User left after first message',
      improvement: 'Opening message may be too aggressive',
      confidence: 0.7
    })
  }

  return insights
}

export async function POST(request: Request) {
  try {
    const conversation = await request.json()

    // Add timestamp and ID
    const enrichedConversation = {
      ...conversation,
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }

    // Load existing data
    const conversations = await loadConversations()
    const patterns = await loadPatterns()

    // Analyze for patterns
    const insights = analyzeConversation(conversation)

    // Update patterns based on insights
    insights.forEach(insight => {
      if (insight.type === 'success_pattern') {
        patterns.successful.push({
          ...insight,
          conversationId: enrichedConversation.id,
          timestamp: new Date().toISOString()
        })
      } else if (insight.type === 'failure_pattern') {
        patterns.failed.push({
          ...insight,
          conversationId: enrichedConversation.id,
          timestamp: new Date().toISOString()
        })
      }
    })

    // Calculate success metrics
    const totalConversations = conversations.length + 1
    const bookings = conversations.filter((c: any) => c.bookedCall).length + (conversation.bookedCall ? 1 : 0)
    const bookingRate = (bookings / totalConversations * 100).toFixed(1)

    // Store conversation
    conversations.push(enrichedConversation)
    await saveConversations(conversations)
    await savePatterns(patterns)

    // Return insights for immediate use
    return NextResponse.json({
      success: true,
      conversationId: enrichedConversation.id,
      insights,
      metrics: {
        totalConversations,
        bookings,
        bookingRate: `${bookingRate}%`,
        topPatterns: getTopPatterns(patterns)
      }
    })

  } catch (error) {
    console.error('Conversation tracking error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to track conversation'
    }, { status: 500 })
  }
}

// Get most successful patterns
function getTopPatterns(patterns: any) {
  const patternCounts: any = {}

  patterns.successful.forEach((p: any) => {
    if (!patternCounts[p.category]) {
      patternCounts[p.category] = { count: 0, confidence: 0 }
    }
    patternCounts[p.category].count++
    patternCounts[p.category].confidence = Math.max(patternCounts[p.category].confidence, p.confidence)
  })

  return Object.entries(patternCounts)
    .map(([category, data]: any) => ({
      category,
      occurrences: data.count,
      confidence: data.confidence
    }))
    .sort((a, b) => b.occurrences - a.occurrences)
    .slice(0, 5)
}

// GET endpoint to retrieve insights
export async function GET() {
  try {
    const conversations = await loadConversations()
    const patterns = await loadPatterns()

    // Calculate metrics
    const totalConversations = conversations.length
    const bookings = conversations.filter((c: any) => c.bookedCall).length
    const bySegment = {
      hot: conversations.filter((c: any) => c.segment === 'hot').length,
      warm: conversations.filter((c: any) => c.segment === 'warm').length,
      cold: conversations.filter((c: any) => c.segment === 'cold').length
    }

    return NextResponse.json({
      metrics: {
        totalConversations,
        bookings,
        bookingRate: totalConversations > 0 ? `${(bookings / totalConversations * 100).toFixed(1)}%` : '0%',
        bySegment
      },
      topPatterns: getTopPatterns(patterns),
      recentInsights: patterns.insights?.slice(-10) || []
    })

  } catch (error) {
    console.error('Error fetching conversation insights:', error)
    return NextResponse.json({
      error: 'Failed to fetch insights'
    }, { status: 500 })
  }
}