import { NextRequest, NextResponse } from 'next/server'
import { handleCors, createCorsResponse } from '../../lib/cors'
import { FACEBOOK_ADS_KNOWLEDGE, CONVERSATION_STARTERS, OBJECTION_HANDLERS } from '@/lib/facebook-ads-knowledge'

// Anthropic Claude API configuration
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'

export async function OPTIONS(request: NextRequest) {
  return handleCors(request)
}

export async function POST(request: NextRequest) {
  try {
    const { 
      messages, 
      siteAnalysis, 
      qualificationData,
      isFirstMessage = false 
    } = await request.json()

    // Check if we have Claude API key
    if (!CLAUDE_API_KEY) {
      console.warn('⚠️ Claude API key not configured')
      // Fallback to rule-based responses
      return createCorsResponse({
        response: generateFallbackResponse(messages, siteAnalysis, qualificationData, isFirstMessage),
        qualified: checkQualification(qualificationData, siteAnalysis),
        isFallback: true, // Mark as fallback response
        debugInfo: 'No API key configured'
      }, 200, request)
    }

    // Build the system prompt with all context
    const systemPrompt = buildSystemPrompt(siteAnalysis, qualificationData)
    
    // Prepare messages for Claude
    let claudeMessages = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))

    // If first message (no messages yet), create an initial user message
    if (claudeMessages.length === 0 && isFirstMessage) {
      claudeMessages = [{
        role: 'user',
        content: 'Start with a brief, friendly greeting and ask ONE relevant question based on their situation. Be conversational, not overwhelming.'
      }]
    }

    // Call Claude API
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Fast, affordable model for chat
        max_tokens: 500,
        temperature: 0.7,
        system: systemPrompt,
        messages: claudeMessages
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Claude API error:', response.status, errorText)

      // Check for specific error types
      if (response.status === 401) {
        throw new Error(`Authentication failed: Invalid API key`)
      } else if (response.status === 429) {
        throw new Error(`Rate limit exceeded`)
      } else {
        throw new Error(`Claude API error (${response.status}): ${errorText}`)
      }
    }

    const data = await response.json()
    const aiResponse = data.content[0].text

    // Check if lead qualifies for 7-day trial
    const qualified = checkQualification(qualificationData, siteAnalysis)

    return createCorsResponse({
      response: aiResponse,
      qualified,
      trialEligible: qualified.trialEligible,
      reason: qualified.reason,
      offerLandingPage: qualified.offerLandingPage
    }, 200, request)

  } catch (error: any) {
    console.error('AI chat error:', error.message || error)

    // Different fallback messages based on error type
    let fallbackMessage = "I'm having trouble connecting right now. Let me help you understand your Facebook Ads issues. What's your biggest challenge?";
    let debugInfo = error.message || 'Unknown error';

    if (error.message?.includes('Authentication failed')) {
      fallbackMessage = "There's a configuration issue with our AI assistant. But I can still help! Tell me about your Facebook Ads challenges.";
      debugInfo = 'API key authentication failed';
    } else if (error.message?.includes('Rate limit')) {
      fallbackMessage = "We're experiencing high demand right now. But let's continue - what specific Facebook Ads issues are you facing?";
      debugInfo = 'Rate limit exceeded';
    }

    // Return a helpful fallback response
    return createCorsResponse({
      response: fallbackMessage,
      error: true,
      isFallback: true, // Mark as fallback
      debugInfo: debugInfo // Include debug info for troubleshooting
    }, 500, request)
  }
}

// Analyze how "warm" the pixel is based on data volume
function analyzePixelWarmth(qualificationData: any) {
  const { advertising_duration, conversions_per_week } = qualificationData || {}

  if (!advertising_duration || advertising_duration === 'just_started') {
    return {
      status: 'COLD PIXEL',
      implications: `- Facebook has NO data to optimize with
- Every campaign will start from scratch
- Expect 2-4 weeks before seeing results
- Need to be VERY patient with optimization`
    }
  }

  if (conversions_per_week === 'none') {
    return {
      status: 'DEAD PIXEL',
      implications: `- Pixel installed but not tracking conversions
- Facebook can't optimize without conversion data
- URGENT: Fix conversion tracking immediately
- Currently wasting all ad spend`
    }
  }

  if (conversions_per_week === 'under_10') {
    return {
      status: 'BARELY WARM',
      implications: `- Not enough data for Facebook to optimize
- Campaigns will struggle to exit learning phase
- Need to increase volume or optimize for higher-funnel events
- Consider consolidating campaigns`
    }
  }

  if (conversions_per_week === '10_50') {
    return {
      status: 'LEARNING LIMITED',
      implications: `- Stuck between not enough and enough data
- Facebook can't fully optimize
- Need to push to 50+ conversions/week
- Consider broader audiences or higher budgets`
    }
  }

  return {
    status: 'OPTIMIZED',
    implications: `- Pixel has good data flow
- Facebook can optimize effectively
- Focus on scaling and efficiency
- Ready for advanced strategies`
  }
}

// Analyze business maturity and readiness for ads
function analyzeBusinessMaturity(qualificationData: any) {
  const { business_age } = qualificationData || {}

  if (business_age === 'startup') {
    return {
      status: 'STARTUP PHASE',
      implications: `- Need to validate product-market fit first
- Facebook Ads might be premature
- Focus on organic growth initially
- Need clear value proposition before scaling`
    }
  }

  if (business_age === 'new') {
    return {
      status: 'EARLY STAGE',
      implications: `- Ready to test paid acquisition
- Start small and test carefully
- Focus on learning what works
- Don't scale too fast`
    }
  }

  if (business_age === 'established') {
    return {
      status: 'GROWTH READY',
      implications: `- Perfect time to scale with ads
- Has proven product/service
- Ready for aggressive testing
- Can handle increased volume`
    }
  }

  return {
    status: 'MATURE BUSINESS',
    implications: `- Should have ads dialed in by now
- If struggling, likely systematic issues
- Focus on optimization not basics
- Ready for advanced strategies`
  }
}

// Analyze learning mode status
function analyzeLearningMode(qualificationData: any) {
  const { conversions_per_week, monthly_spend } = qualificationData || {}

  if (conversions_per_week === 'over_50') {
    return {
      status: 'FULLY OPTIMIZED',
      implications: `- Campaigns can exit learning phase quickly
- Facebook's AI works at full capacity
- Can test multiple audiences/creatives
- Ready for CBO and advanced strategies`
    }
  }

  if (conversions_per_week === '10_50') {
    return {
      status: 'LEARNING LIMITED WARNING',
      implications: `- Most campaigns stuck in learning limited
- Performance will be inconsistent
- Need to consolidate or increase budget
- Consider optimizing for add-to-cart instead of purchase`
    }
  }

  return {
    status: 'SEVERE LEARNING LIMITED',
    implications: `- All campaigns stuck in learning
- Facebook can't optimize properly
- Wasting significant budget
- URGENT: Need to fix data flow immediately`
  }
}

function buildSystemPrompt(siteAnalysis: any, qualificationData: any) {
  const knowledge = JSON.stringify(FACEBOOK_ADS_KNOWLEDGE)

  // Analyze pixel warmth and business maturity
  const pixelWarmth = analyzePixelWarmth(qualificationData)
  const businessMaturity = analyzeBusinessMaturity(qualificationData)
  const learningMode = analyzeLearningMode(qualificationData)

  return `You are a Facebook Ads expert consultant working for First Aid For Ads.

YOUR PERSONALITY:
- Conversational and approachable, not overwhelming
- Start gentle then gradually reveal insights (like a swan - graceful on surface)
- Use numbers and specifics when relevant, but don't info-dump
- Build trust before pointing out problems
- Focus on one issue at a time, don't overwhelm

CRITICAL CONTEXT - READ THIS FIRST:

PIXEL WARMTH: ${pixelWarmth.status}
${pixelWarmth.implications}

BUSINESS MATURITY: ${businessMaturity.status}
${businessMaturity.implications}

LEARNING MODE STATUS: ${learningMode.status}
${learningMode.implications}

CONTEXT ABOUT THE LEAD:
${siteAnalysis ? `
Website Analysis:
- Domain: ${siteAnalysis.domain}
- Has Facebook Pixel: ${siteAnalysis.pixelFound ? 'Yes' : 'NO - CRITICAL ISSUE'}
- Platform: ${siteAnalysis.platform || 'Unknown'}
- Email found: ${siteAnalysis.emails?.length > 0 ? 'Yes' : 'No'}
- Business Type: ${siteAnalysis.businessInfo?.type || 'Unknown'}
` : ''}

${qualificationData ? `
Qualification Data:
- Whose website: ${qualificationData.whose_website}
- Monthly spend: ${qualificationData.monthly_spend}
- Currently running ads: ${qualificationData.monthly_spend === 'zero' ? 'NO - NOT RUNNING ADS' : 'YES - RUNNING ADS'}
- Why not spending: ${qualificationData.why_not_spending || 'N/A'}
- Planning to start: ${qualificationData.planning_to_start || 'N/A'}
- Who manages ads: ${qualificationData.who_manages || 'N/A'}
- Pixel awareness: ${qualificationData.pixel_awareness || 'N/A'}
- Pixel blocker reason: ${qualificationData.pixel_blocker || 'N/A'}
- Pixel working status: ${qualificationData.pixel_working || 'N/A'}
- Business age: ${qualificationData.business_age || 'Unknown'}
- Advertising duration: ${qualificationData.advertising_duration || 'N/A'}
- Conversions per week: ${qualificationData.conversions_per_week || 'N/A'}
- Main problem: ${qualificationData.main_problem || 'N/A'}
- Competitor strategy interest: ${qualificationData.competitor_strategy || 'N/A'}
- Industry: ${qualificationData.your_industry || 'N/A'}
` : ''}

YOUR FULL-STACK AGENCY KNOWLEDGE:
${knowledge}

CONVERSATION FLOW - IMPORTANT:

1. OPENING MESSAGE: MUST MATCH THEIR SITUATION

   If monthly_spend === 'zero' (NOT running ads):
   → "I see you haven't started Facebook Ads yet. What's been holding you back?"
   → "I noticed you're not currently running ads. Is it the complexity or something else?"
   → "Facebook Ads can be overwhelming to start. What made you want to explore them now?"

   If they ARE running ads (any spend above zero):
   → "Hi! I see you're spending £[amount] on Facebook Ads. How's that working out for you?"

   CRITICAL: NEVER say they're running ads if monthly_spend is 'zero'!

2. IDENTIFY THE PRIORITY ISSUE (Triage Order):
   Priority 1: No Pixel = EMERGENCY (Route to Mark after 2-3 messages)
   Priority 2: Pixel but no conversions = CRITICAL (Route to Mark)
   Priority 3: Learning Limited (10-50 conv/week) = KERRY'S SWEET SPOT - She DOUBLES conversions
   Priority 4: Poor ROAS but working = Kerry can optimize
   Priority 5: Working well = Offer competitive analysis

3. KNOW WHEN TO STOP HELPING AND ROUTE:
   - 2-3 message exchanges MAX before suggesting next step
   - Give ONE actionable tip they can implement immediately
   - Then transition: "This is exactly what we fix. Here's your best next step..."

4. ROUTING LOGIC:
   Technical Issues (No pixel, tracking broken) → Mark's 30-min call
   Conversion Issues (Have pixel, need leads) → Kerry's 7-day trial
   Just exploring → Give value, soft CTA at end

IMPORTANT RULES:
- Prioritize issues by business impact (no tracking = bleeding money)
- Don't try to solve everything in chat (that's what calls are for)
- Give enough value to build trust, but save the solution for the call
- After 3 messages, always transition to booking

AVOID RABBIT HOLES:
- NO TECHNICAL LECTURES (they don't need a masterclass)
- STAY FOCUSED on their main problem
- DON'T EXPLAIN how Facebook's algorithm works
- DON'T LIST all possible solutions
- Just identify issue → give ONE tip → route to solution

CONVERSATION FLOW EXAMPLES (Maximum value approach):

SCENARIO 1 - No Pixel Detected:
Message 1: "I noticed you don't have a Facebook Pixel installed. How long have you been running ads without tracking?"
User: "About 3 months, spending £1000/month"
Message 2: "That's £3000 spent blind. Quick math: without tracking, Facebook shows your ads to random people instead of buyers. You're probably wasting 60-70% of that. Here's a quick fix: Install the Facebook Pixel Helper Chrome extension to verify if you have any partial tracking."
Message 3: "This is exactly what Mark fixes in 30 minutes. He'll install your pixel, verify it's tracking purchases, and show you the data you've been missing. Want to stop the bleeding?"

SCENARIO 2 - Learning Limited (Perfect for Kerry):
Message 1: "I see you're getting 10-50 conversions per week. What's your current cost per conversion?"
User: "About £50 per lead"
Message 2: "And what percentage of those leads actually become customers?"
User: "Maybe 5%"
Message 3: "So you need 20 leads (£1000) for one customer. Kerry converts 15-20% of leads - that's 3-4 customers from the same 20 leads. Same ad spend, TRIPLE the revenue. She offers a 7-day trial where you don't pay until day 7. Interested?"

SCENARIO 3 - High-Value Questions in Action:
Message 1: "What's the ONE thing that would need to change for you to double your revenue from Facebook Ads?"
User: "I need more people to actually buy, not just click"
Message 2: "How quickly do you currently follow up with leads?"
User: "Usually next day, sometimes 2-3 days"
Message 3: "There's your problem. Kerry's team calls in 5-15 minutes while they're still hot. That's why she converts at 15-20% vs the 5% you're seeing. Want to test her 7-day trial?"

BAD EXAMPLES (DON'T DO THIS):
❌ "Let me explain the 5 types of campaign objectives and when to use each..."
❌ "Facebook's algorithm uses machine learning with 50+ signals including..."
❌ "There are 7 ways to fix Learning Limited, first you could..."

GOOD EXAMPLES (DO THIS):
✅ "You're losing about £60/day without proper tracking. Does that concern you?"
✅ "What would one extra customer per day be worth to your business?"
✅ "If I could guarantee you'd exit Learning Limited in 7 days, what would that be worth?"

INTELLIGENT QUESTIONING STRATEGY (Maximum value to USER, not just data collection):

Ask questions that REVEAL PROBLEMS and BUILD VALUE, not just collect data:

If NOT RUNNING ADS (monthly_spend === 'zero'):
Based on why_not_spending:
- 'havent_started': "What specific part feels most overwhelming - the technical setup or strategy?"
- 'bad_experience': "What went wrong last time? Let's make sure it doesn't happen again."
- 'too_complex': "What if I told you 80% of Facebook Ads features don't matter? You only need 5 settings."
- 'no_budget': "What's your average customer worth? Often just 2-3 sales pays for a month of ads."
VALUE TO USER: Addresses their specific concerns and removes barriers

If NO PIXEL detected (but they ARE spending):
→ "How long have you been running ads without tracking?" (Calculates total waste)
→ "What made you think the ads were working?" (Challenges assumptions)
→ "How much have you spent in total?" (Quantifies the loss)
VALUE TO USER: Makes them realize the scale of waste they didn't know about

If LEARNING LIMITED (10-50 conv/week):
→ "What's your current cost per conversion?" (Identifies if problem is volume or cost)
→ "What percentage of leads actually convert to sales?" (Perfect setup for Kerry)
→ "Have you tried consolidating campaigns?" (Quick win they can try)
VALUE TO USER: Gives them immediate action items + reveals conversion gaps

If SPENDING MONEY BUT NO RESULTS:
→ "What's your break-even ROAS?" (Shows if they understand unit economics)
→ "How quickly do you follow up with leads?" (Perfect setup for Kerry's speed)
→ "What's your average order value?" (Reality check on viability)
VALUE TO USER: Makes them think about profitability, not just traffic

If COMPETITOR ANALYSIS:
→ "What specifically caught your attention about their ads?" (Reveals what they think works)
→ "How long have they been running these ads?" (Shows longevity = profitability)
→ "What's your website URL so I can compare?" (Gets their info for follow-up)
VALUE TO USER: Competitive intelligence they can use immediately

THE GOLDEN QUESTIONS (Universal high value):
→ "What's the ONE thing that would need to change for you to double your revenue from Facebook Ads?"
→ "How many hours per week are you spending trying to fix this yourself?" (Opportunity cost)
→ "What happens to your business if this doesn't get fixed in the next 30 days?" (Creates urgency)
→ "Have you considered that the problem might not be your ads, but what happens AFTER someone clicks?"

QUESTIONS THAT BUILD VALUE FOR OUR SOLUTION:
→ "If I could guarantee you'd exit Learning Limited in 7 days, what would that be worth to you?"
→ "How much would one extra customer be worth?" (Value per conversion)
→ "How much did your last agency charge?" (Price anchoring)
→ "You're probably losing £___ per day without proper tracking. Does that concern you?"

PSYCHOLOGICAL TRIGGER QUESTIONS:

Loss Aversion:
→ "You're probably losing £[calculated amount] per day without proper tracking. Does that concern you?"
→ "Every day without a pixel is money you can't get back. How much longer can you afford that?"

Social Proof:
→ "Most businesses in your situation see 3X conversions after fixing this. Would that transform your business?"
→ "Your competitors with pixels are stealing your customers right now. Want to level the playing field?"

Authority:
→ "In my experience with 200+ campaigns, this specific issue causes 80% of failures. Want to know the fix?"
→ "Mark has fixed this exact problem for 147 businesses. Takes him 30 minutes. Interested?"

Urgency:
→ "Facebook's algorithm changes next month could make this worse. Should we fix it now?"
→ "Black Friday is coming - without tracking you'll waste your biggest opportunity. Ready to fix this?"

Reciprocity:
→ "I can see three specific issues just from your domain. Want me to share what I found?"
→ "Here's a quick win you can implement today: [specific tip]. Want the complete solution?"

COMPETITIVE INTELLIGENCE INSIGHTS (When they provide competitor):
- Check if competitor has pixel (they're serious about ads)
- Identify their platform (Shopify = ecommerce focused)
- Look for email capture (building list vs direct sales)
- Analyze load speed (affects their ad costs)
- Find their value propositions in meta tags
- "Their pixel ID is [X] - let's check their Facebook Ad Library"
- "They're using [platform] which suggests [strategy]"
- "No pixel found - they might be using Google Ads instead"

FACEBOOK AD LIBRARY PROMPTS:
→ "Go to facebook.com/ads/library and search for [competitor domain]"
→ "Look for ads running 90+ days (those are profitable)"
→ "Check their ad creative styles - video vs image"
→ "Notice their offers and hooks"
→ "See how many variations they're testing"

KERRY'S APPOINTMENT SETTING SERVICE:
- She converts 15-20% of leads into appointments
- Calls within 5-15 minutes, 8am-8pm, 7 days a week
- 7-DAY RISK-FREE TRIAL for qualified businesses
- Qualification for trial: Must be spending $500+/month on ads OR have tried ads before
- Average client books 8-12 appointments per month
- She follows up 7 times over 14 days

YOUR GOALS:
1. Diagnose their Facebook Ads problems quickly
2. Show them the money they're leaving on the table
3. If they qualify (spending $500+/month or tried ads), mention Kerry's 7-day trial
4. Get them to book a free 30-minute strategy call

RULES:
- Keep responses under 100 words
- Always include a specific number or statistic
- End with a question that digs deeper
- If they're not spending on ads, find out why
- If no pixel, this is EMERGENCY level priority
- For qualified leads, casually mention: "You'd actually qualify for Kerry's 7-day risk-free trial where she books appointments for you."

NEVER:
- Be vague or generic
- Use corporate speak
- Apologize unnecessarily  
- Make promises you can't keep`
}

function checkQualification(qualificationData: any, siteAnalysis?: any) {
  if (!qualificationData) {
    return {
      trialEligible: false,
      reason: 'No qualification data available'
    }
  }

  const {
    monthly_spend,
    why_not_spending,
    pixel_working,
    business_age,
    advertising_duration,
    conversions_per_week,
    main_problem
  } = qualificationData

  const hasPixel = siteAnalysis?.pixelFound || pixel_working === 'yes_working'

  // FULL-STACK AGENCY ANALYSIS - Like a swan, graceful on surface, genius below

  // 🚨 EMERGENCY CASES - Immediate intervention needed
  if (!hasPixel && monthly_spend !== 'zero') {
    return {
      trialEligible: false,
      reason: 'CRITICAL: Running ads without tracking = burning money!',
      offerLandingPage: true,
      segment: 'emergency-fix',
      urgency: 'critical',
      diagnosis: 'No pixel but spending - hemorrhaging money daily'
    }
  }

  // 🧮 SOPHISTICATED ROUTING LOGIC - Based on multiple factors

  // STARTUP + NEW TO ADS = Education & Setup
  if (business_age === 'startup' || business_age === 'new') {
    if (monthly_spend === 'zero' || !hasPixel) {
      return {
        trialEligible: false,
        reason: 'New business needs foundation first',
        offerTriage: true,
        segment: 'foundation-building',
        recommendation: 'Mark will build your ads foundation properly from day one'
      }
    }
  }

  // LEARNING LIMITED HELL - Common problem, specific solution
  if (conversions_per_week === '10_50' || main_problem === 'learning_limited') {
    return {
      trialEligible: false,
      reason: 'Stuck in Learning Limited - bleeding money slowly',
      offerTriage: true,
      segment: 'optimization-needed',
      diagnosis: 'Need to escape learning limited through consolidation or scaling',
      recommendation: 'Mark can restructure campaigns to hit 50+ conversions/week'
    }
  }

  // PERFECT FOR KERRY - Good setup, need conversion help
  if (hasPixel && conversions_per_week === 'over_50') {
    if (monthly_spend === '500_2000' ||
        monthly_spend === '2000_5000' ||
        monthly_spend === 'over_5000') {
      return {
        trialEligible: true,
        reason: 'Your setup is solid - Kerry will convert those leads!',
        segment: 'hot-ready',
        offerType: 'kerry-conversion',
        diagnosis: 'Good technical setup, ready for conversion optimization'
      }
    }
  }

  // MATURE BUT STRUGGLING - Needs complete overhaul
  if (business_age === 'mature' &&
      (main_problem === 'no_sales' || main_problem === 'too_expensive')) {
    if (advertising_duration === 'over_6_months') {
      return {
        trialEligible: false,
        reason: 'Systematic issues after 6+ months - needs complete audit',
        offerTriage: true,
        segment: 'overhaul-needed',
        diagnosis: 'Long-term underperformance indicates structural problems',
        recommendation: 'Mark will do complete teardown and rebuild'
      }
    }
  }

  // PIXEL CONFUSION - Common technical issue
  if (pixel_working === 'some_events' ||
      pixel_working === 'not_sure' ||
      pixel_working === 'no_conversions') {
    return {
      trialEligible: false,
      reason: 'Pixel partially working = partially wasting money',
      offerTriage: true,
      segment: 'technical-fix',
      diagnosis: 'Tracking issues preventing optimization',
      recommendation: 'Mark will audit and fix all tracking issues'
    }
  }

  // COMPETITOR ANALYSIS - Only for qualified leads as booking incentive
  if (qualificationData.whose_website === 'competitor') {
    const { competitor_strategy, monthly_spend } = qualificationData

    // Only offer deep analysis to HOT leads who can afford our services
    const isQualifiedForAnalysis =
      monthly_spend === '500_2000' ||
      monthly_spend === '2000_5000' ||
      monthly_spend === 'over_5000'

    if (isQualifiedForAnalysis) {
      return {
        trialEligible: false,
        reason: 'Perfect! Book a call and I\'ll show you EXACTLY how to beat them - £500 analysis included!',
        offerCompetitive: true,
        segment: 'hot-competitive',
        diagnosis: 'Qualified for live competitive intelligence session',
        recommendation: 'I\'ll analyze their entire strategy WITH you on the call',
        competitorInsights: {
          hasPixel: siteAnalysis?.pixelFound,
          pixelId: siteAnalysis?.pixelIds?.[0],
          platform: siteAnalysis?.platform,
          loadTime: siteAnalysis?.loadTime,
          strategy: competitor_strategy
        },
        bonusOffer: 'LIVE on call: Screen share analysis of their ads & funnel'
      }
    } else {
      // For lower-budget leads, just note the competitor but don't offer expensive analysis
      return {
        trialEligible: false,
        reason: 'I see you\'re checking the competition - smart move!',
        offerTriage: true,
        segment: 'explorer',
        diagnosis: 'Researching competitors but not ready for full analysis',
        recommendation: 'Let\'s focus on getting YOUR fundamentals right first'
      }
    }
  }

  // 3. Under £500 but actively spending
  if (monthly_spend === 'under_500') {
    return { 
      trialEligible: true, 
      reason: 'Active advertiser ready to scale',
      segment: 'warm'
    }
  }

  // NOT QUALIFIED:
  // - Never tried (no budget proven)
  // - No budget stated
  // - Just exploring
  return { 
    trialEligible: false, 
    reason: 'Not currently investing in growth',
    segment: 'cold'
  }
}

function generateFallbackResponse(
  messages: any[], 
  siteAnalysis: any, 
  qualificationData: any,
  isFirstMessage: boolean
) {
  // Smart fallback responses based on context
  if (isFirstMessage) {
    if (!siteAnalysis?.pixelFound) {
      return CONVERSATION_STARTERS.noPixel
    }
    if (qualificationData?.monthly_spend === 'zero') {
      return CONVERSATION_STARTERS.notSpending
    }
    if (qualificationData?.monthly_spend === 'under_500') {
      return CONVERSATION_STARTERS.lowSpend
    }
    return CONVERSATION_STARTERS.hasPixel
  }

  // Use last user message to determine response
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  if (lastMessage.includes('expensive') || lastMessage.includes('cost')) {
    return OBJECTION_HANDLERS.tooExpensive
  }
  
  if (lastMessage.includes('time')) {
    return OBJECTION_HANDLERS.noTime
  }
  
  if (lastMessage.includes('tried') || lastMessage.includes('didn\'t work')) {
    return OBJECTION_HANDLERS.triedBefore
  }

  // Default response
  return "Tell me about your business - what are you selling and who's your ideal customer? This helps me diagnose your Facebook Ads situation."
}