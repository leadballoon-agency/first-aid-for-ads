'use client'

import { useState, useRef, useEffect } from 'react'
import { StepProps } from './types'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatInterface({
  assessmentData,
  siteAnalysis,
  onNext
}: StepProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [qualified, setQualified] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [initialMessageSent, setInitialMessageSent] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [isAIActive, setIsAIActive] = useState(false) // Track if real AI is responding
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [bookedCall, setBookedCall] = useState(false)

  // Track conversation for learning
  const trackConversation = async (eventType: string, data?: any) => {
    try {
      await fetch('/api/track-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          domain: siteAnalysis?.domain || 'unknown',
          url: siteAnalysis?.url,
          pixelFound: siteAnalysis?.pixelFound || false,
          pixelIds: siteAnalysis?.pixelIds,
          platform: siteAnalysis?.businessInfo?.platform,
          businessType: siteAnalysis?.businessInfo?.businessType,

          // Qualification data
          whoseWebsite: (assessmentData as any).qualification?.whose_website,
          monthlySpend: (assessmentData as any).qualification?.monthly_spend,
          mainProblem: (assessmentData as any).qualification?.main_problem,
          businessAge: (assessmentData as any).qualification?.business_age,
          conversionsPerWeek: (assessmentData as any).qualification?.conversions_per_week,

          // Conversation data
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          messageCount,
          usedAI: isAIActive,

          // Outcomes
          qualified: qualified?.trialEligible || false,
          segment: (assessmentData as any).segment,
          priority: (assessmentData as any).priority,
          bookedCall,
          callType: data?.callType,

          // Event specific
          eventType,
          eventData: data
        })
      })
    } catch (error) {
      console.error('Failed to track conversation:', error)
    }
  }

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send initial AI message on mount
  useEffect(() => {
    if (!initialMessageSent) {
      sendInitialMessage()
    }
  }, [initialMessageSent])

  const sendInitialMessage = async () => {
    setInitialMessageSent(true)
    setLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          siteAnalysis,
          qualificationData: (assessmentData as any).qualification,
          isFirstMessage: true
        })
      })

      const data = await response.json()

      // Check if this is real AI or fallback
      if (!data.error && data.response && !data.isFallback) {
        setIsAIActive(true)
      }

      setMessages([{
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }])

      // Don't qualify on the first message
      // Let conversation develop naturally
    } catch (error) {
      console.error('Failed to get initial message:', error)
      // Fallback message
      setMessages([{
        role: 'assistant',
        content: getSmartFallbackMessage(),
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  const getSmartFallbackMessage = () => {
    const { qualification } = assessmentData as any
    
    if (!siteAnalysis?.pixelFound) {
      return "I see you're running Facebook Ads without a Pixel installed. That's like driving blindfolded - you're wasting at least 40% of your ad spend. Let's fix this. What's been your biggest frustration with Facebook Ads?"
    }
    
    if (qualification?.monthly_spend === 'zero') {
      return "I notice you're not running Facebook Ads yet. Most businesses leave £10,000+ per month on the table by not advertising. What's held you back - bad experience, too complex, or just haven't started?"
    }
    
    if (qualification?.monthly_spend === '500_2000' || qualification?.monthly_spend === '2000_5000') {
      return "With your current ad spend, you should be getting 30-50 qualified appointments per month. Are you hitting those numbers, or is something broken in your funnel?"
    }
    
    return "Let's diagnose your Facebook Ads performance. On a scale of 1-10, how happy are you with your current return on ad spend?"
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setMessageCount(prev => prev + 1)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          siteAnalysis,
          qualificationData: (assessmentData as any).qualification,
          isFirstMessage: false
        })
      })

      const data = await response.json()

      // Check if this is real AI or fallback
      if (!data.error && data.response && !data.isFallback) {
        setIsAIActive(true)
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

      // Only check qualification after at least 3 exchanges (6 messages total)
      // This ensures a meaningful conversation before showing the calendar
      if (messageCount >= 2 && data.qualified && data.qualified.trialEligible) {
        setQualified(data.qualified)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Let me think about that... Actually, here's what matters: Are you currently tracking conversions with the Facebook Pixel?",
        timestamp: new Date()
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-emerald-500/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-emerald-400">AI Strategy Consultant</h2>
              <p className="text-slate-400 mt-1">Let's diagnose your Facebook Ads performance</p>
            </div>
            {/* BETA Badge - Only show when real AI is active */}
            {isAIActive && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-400/10 rounded-full border border-yellow-400/30">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400 text-xs font-medium tracking-wide">AI Beta</span>
              </div>
            )}
            {!isAIActive && messages.length > 0 && (
              <div className="relative">
                <div className="bg-slate-700/50 px-4 py-1.5 rounded-full border border-slate-600/50">
                  <span className="text-slate-400 font-medium text-xs tracking-wider">FALLBACK</span>
                </div>
              </div>
            )}
          </div>

          {/* Only show qualification status after meaningful conversation */}
          {messageCount >= 3 && qualified?.trialEligible && (
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-emerald-400 text-sm font-medium">
                ✅ You qualify for Kerry's 7-day risk-free trial!
              </p>
              <p className="text-emerald-300/80 text-xs mt-1">
                {qualified.reason}
              </p>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-emerald-500/20 text-emerald-50 border border-emerald-500/30'
                    : 'bg-slate-700/50 text-slate-200 border border-slate-600/50'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs opacity-50 mt-2 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600/50">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-700/50 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all duration-300 border border-slate-600/50"
        >
          ← Back
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
        >
          Continue to Results →
        </button>
      </div>

      {/* Book a Call CTA with Kerry's Calendar */}
      {/* Only show after meaningful conversation (at least 3 user messages) */}
      {messageCount >= 3 && qualified?.trialEligible && (
        <div className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-cyan-500 p-8 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1))]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                You Qualify for Kerry's 7-Day Risk-Free Trial!
              </h3>
              <p className="text-emerald-50 text-lg mb-4">
                Start getting 8-12 appointments per month
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-emerald-50">✓ 15-20% Conversion Rate</span>
                </div>
                <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-emerald-50">✓ Response in 5-15 mins</span>
                </div>
                <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                  <span className="text-emerald-50">✓ Pay on Day 7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-b-2xl border border-t-0 border-emerald-500/20 p-4 md:p-6">
            <div className="bg-white/5 rounded-xl p-2">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/0rIHtDmjDYaZh818GCFB"
                className="w-full rounded-lg"
                style={{
                  border: 'none',
                  minHeight: '600px',
                  height: '600px',
                  backgroundColor: 'transparent'
                }}
                scrolling="no"
                id="0rIHtDmjDYaZh818GCFB_1758530796900"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                Select a time that works for you • 30-minute call • No obligation
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Pixel Fix CTA for those without pixel */}
      {messageCount >= 3 && qualified?.offerLandingPage && (
        <div className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 p-8 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1))]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4 animate-pulse">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                CRITICAL: You're Advertising Blind!
              </h3>
              <p className="text-orange-50 text-lg mb-4">
                Without a pixel, you're literally burning money
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <h4 className="text-xl font-semibold text-white mb-3">FREE Emergency Pixel Fix Session</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🔧</span>
                    <div>
                      <p className="text-orange-100 font-medium">I'll fix your pixel LIVE on the call</p>
                      <p className="text-orange-200 text-sm">Share your screen, I'll guide you step-by-step</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <p className="text-orange-100 font-medium">Instant tracking verification</p>
                      <p className="text-orange-200 text-sm">We'll test it together to ensure it works</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                      <p className="text-orange-100 font-medium">Quick campaign audit</p>
                      <p className="text-orange-200 text-sm">I'll spot other critical issues costing you money</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                  <p className="text-red-200 text-sm font-medium">
                    ⚠️ Every day without a pixel = money wasted on unoptimized ads
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-b-2xl border border-t-0 border-orange-500/20 p-4 md:p-6">
            <p className="text-orange-400 mb-2 text-center font-semibold text-lg">
              30-Minute FREE First Aid Session
            </p>
            <p className="text-slate-400 mb-4 text-center text-sm">
              No pitch, just help. I'll fix your pixel and spot other critical issues.
            </p>
            <div className="bg-white/5 rounded-xl p-2">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/KZHMIuJOgaZqAvId0qrv"
                className="w-full rounded-lg"
                style={{
                  border: 'none',
                  minHeight: '600px',
                  height: '600px',
                  backgroundColor: 'transparent'
                }}
                scrolling="no"
                id="KZHMIuJOgaZqAvId0qrv_pixelfix"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mark's Technical Triage CTA - for setup/tracking issues */}
      {messageCount >= 3 && qualified?.offerTriage && (
        <div className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 p-8 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1))]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Technical Issues Detected
              </h3>
              <p className="text-indigo-50 text-lg mb-4">
                Let's diagnose and fix your Facebook Ads setup
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <h4 className="text-xl font-semibold text-white mb-3">FREE Technical Triage Session</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🛠️</span>
                    <div>
                      <p className="text-indigo-100 font-medium">Full technical audit</p>
                      <p className="text-indigo-200 text-sm">Pixel, events, conversions, campaign structure</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📐</span>
                    <div>
                      <p className="text-indigo-100 font-medium">Fix broken tracking</p>
                      <p className="text-indigo-200 text-sm">Get your data flowing correctly</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <p className="text-indigo-100 font-medium">Strategic roadmap</p>
                      <p className="text-indigo-200 text-sm">Clear action plan to scale profitably</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-b-2xl border border-t-0 border-indigo-500/20 p-4 md:p-6">
            <p className="text-indigo-400 mb-2 text-center font-semibold text-lg">
              30-Minute FREE Technical Triage
            </p>
            <p className="text-slate-400 mb-4 text-center text-sm">
              I'll diagnose your issues and show you exactly how to fix them
            </p>
            <div className="bg-white/5 rounded-xl p-2">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/KZHMIuJOgaZqAvId0qrv"
                className="w-full rounded-lg"
                style={{
                  border: 'none',
                  minHeight: '600px',
                  height: '600px',
                  backgroundColor: 'transparent'
                }}
                scrolling="no"
                id="KZHMIuJOgaZqAvId0qrv_triage"
              />
            </div>
          </div>
        </div>
      )}

      {/* Competitive Intelligence CTA - for beating competitors */}
      {messageCount >= 2 && qualified?.offerCompetitive && (
        <div className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-yellow-600 via-orange-500 to-red-500 p-8 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1))]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4 animate-pulse">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                EXCLUSIVE: £500 Competitor Analysis FREE
              </h3>
              <p className="text-yellow-50 text-lg mb-4">
                I'll reveal their ENTIRE strategy LIVE on our call!
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                <h4 className="text-xl font-semibold text-white mb-3">What I'll Show You On The Call:</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <p className="text-yellow-100 font-medium">Screen share their Facebook Ad Library</p>
                      <p className="text-yellow-200 text-sm">Walk through every ad together, identify winners</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <p className="text-yellow-100 font-medium">Live funnel breakdown</p>
                      <p className="text-yellow-200 text-sm">I'll click through their entire flow with you</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">💡</span>
                    <div>
                      <p className="text-yellow-100 font-medium">Exact strategy to beat them</p>
                      <p className="text-yellow-200 text-sm">Specific tactics you can implement immediately</p>
                    </div>
                  </div>
                </div>
                {qualified.competitorInsights?.hasPixel && (
                  <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                    <p className="text-green-200 text-sm">
                      ✅ They have Pixel ID: {qualified.competitorInsights.pixelId} - They're serious about ads
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-b-2xl border border-t-0 border-yellow-500/20 p-4 md:p-6">
            <p className="text-yellow-400 mb-2 text-center font-semibold text-lg">
              Book Your Competitive Intelligence Call Now
            </p>
            <p className="text-slate-400 mb-4 text-center text-sm">
              Don't miss out - I'll analyze their strategy LIVE with you (£500 value)
            </p>
            <div className="bg-white/5 rounded-xl p-2">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/KZHMIuJOgaZqAvId0qrv"
                className="w-full rounded-lg"
                style={{
                  border: 'none',
                  minHeight: '600px',
                  height: '600px',
                  backgroundColor: 'transparent'
                }}
                scrolling="no"
                id="KZHMIuJOgaZqAvId0qrv_competitive"
              />
            </div>
          </div>
        </div>
      )}

      {/* Alternative CTA for non-qualified leads */}
      {/* Show after conversation develops but they don't qualify for trial */}
      {messageCount >= 3 && !qualified?.trialEligible && !qualified?.offerLandingPage && !qualified?.offerTriage && !qualified?.offerCompetitive && (
        <div className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 p-8 text-center">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.05))]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 backdrop-blur-lg rounded-full mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                Ready to Fix Your Facebook Ads?
              </h3>
              <p className="text-slate-300 text-lg mb-4">
                Get a FREE 30-minute strategy call to diagnose your campaigns
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                <div className="inline-flex items-center justify-center bg-slate-800/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600/50">
                  <span className="text-slate-300">✓ Find Hidden Problems</span>
                </div>
                <div className="inline-flex items-center justify-center bg-slate-800/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600/50">
                  <span className="text-slate-300">✓ Get Action Plan</span>
                </div>
                <div className="inline-flex items-center justify-center bg-slate-800/50 backdrop-blur px-4 py-2 rounded-full border border-slate-600/50">
                  <span className="text-slate-300">✓ 100% Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-b-2xl border border-t-0 border-slate-600/30 p-4 md:p-6">
            <div className="bg-white/5 rounded-xl p-2">
              <iframe
                src="https://link.leadballoon.co.uk/widget/booking/KZHMIuJOgaZqAvId0qrv"
                className="w-full rounded-lg"
                style={{
                  border: 'none',
                  minHeight: '600px',
                  height: '600px',
                  backgroundColor: 'transparent'
                }}
                scrolling="no"
                id="KZHMIuJOgaZqAvId0qrv_strategy"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                📅 Pick your preferred time • 📞 30-minute call • 🎯 Get your roadmap
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}