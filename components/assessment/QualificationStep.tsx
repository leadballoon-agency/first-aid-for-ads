'use client'

import { useState } from 'react'
import { StepProps } from './types'

export default function QualificationStep({
  assessmentData,
  setAssessmentData,
  siteAnalysis,
  onNext,
  onBack
}: StepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any>({})

  // Detect currency based on multiple signals
  const getCurrency = () => {
    // First check if we have location data from site analysis
    const location = siteAnalysis?.businessInfo?.location?.country || ''

    // Currency map by country
    const currencyMap: { [key: string]: string } = {
      // Europe (Euro)
      'DE': '€', 'FR': '€', 'IT': '€', 'ES': '€', 'NL': '€', 'BE': '€', 'AT': '€',
      'PT': '€', 'GR': '€', 'FI': '€', 'IE': '€', 'LU': '€', 'SK': '€', 'SI': '€',
      // UK
      'GB': '£', 'UK': '£',
      // North America
      'US': '$', 'CA': 'CAD $',
      // Asia Pacific
      'AU': 'AUD $', 'NZ': 'NZD $',
      'JP': '¥', 'CN': '¥',
      'IN': '₹',
      'SG': 'S$',
      // Others
      'ZA': 'R', 'BR': 'R$', 'MX': 'MX$'
    }

    // Try location-based currency first
    if (location && currencyMap[location.toUpperCase()]) {
      return currencyMap[location.toUpperCase()]
    }

    // Fallback to domain-based detection
    const domain = siteAnalysis?.domain || ''

    // Check TLD for hints
    if (domain.endsWith('.uk') || domain.endsWith('.co.uk')) return '£'
    if (domain.endsWith('.ca')) return 'CAD $'
    if (domain.endsWith('.au') || domain.endsWith('.com.au')) return 'AUD $'
    if (domain.endsWith('.nz') || domain.endsWith('.co.nz')) return 'NZD $'
    if (domain.endsWith('.in') || domain.endsWith('.co.in')) return '₹'
    if (domain.endsWith('.za') || domain.endsWith('.co.za')) return 'R'

    // European TLDs
    if (domain.endsWith('.de') || domain.endsWith('.fr') || domain.endsWith('.it') ||
        domain.endsWith('.es') || domain.endsWith('.nl') || domain.endsWith('.be') ||
        domain.endsWith('.eu')) return '€'

    // Check for currency in location data
    const locationCurrency = siteAnalysis?.businessInfo?.location?.currency
    if (locationCurrency) return locationCurrency

    // Check for language/content hints in the analysis
    if (siteAnalysis?.language === 'en-GB') return '£'
    if (siteAnalysis?.language?.startsWith('en')) return '$'

    // Default to USD for .com and unknown
    return '$'
  }

  const currency = getCurrency()

  const questions = [
    {
      id: 'whose_website',
      question: 'Is this your website?',
      options: [
        { value: 'mine', label: 'Yes, my business' },
        { value: 'client', label: "My client's website" },
        { value: 'competitor', label: "A competitor's site" },
        { value: 'testing', label: 'Just testing the tool' }
      ]
    },
    {
      id: 'competitor_strategy',
      question: '🕵️ Smart move! What do you want to know about their strategy?',
      showIf: (ans: any) => ans.whose_website === 'competitor',
      options: [
        { value: 'stealing_customers', label: 'How they\'re stealing my customers' },
        { value: 'ad_strategy', label: 'Their Facebook Ads strategy' },
        { value: 'funnel_analysis', label: 'Their entire sales funnel' },
        { value: 'what_works', label: 'What\'s working for them' }
      ]
    },
    {
      id: 'your_industry',
      question: 'What industry are you both in?',
      showIf: (ans: any) => ans.whose_website === 'competitor',
      options: [
        { value: 'ecommerce', label: 'E-commerce/Retail' },
        { value: 'services', label: 'Services/Consulting' },
        { value: 'saas', label: 'Software/SaaS' },
        { value: 'local', label: 'Local Business' },
        { value: 'other', label: 'Other Industry' }
      ]
    },
    {
      id: 'monthly_spend',
      question: "What's your monthly Facebook Ads spend?",
      showIf: (ans: any) => ans.whose_website !== 'testing',
      options: [
        { value: 'zero', label: `${currency}0 - Not running ads yet` },
        { value: 'under_500', label: `Under ${currency}500` },
        { value: '500_2000', label: `${currency}500 - ${currency}2,000` },
        { value: '2000_5000', label: `${currency}2,000 - ${currency}5,000` },
        { value: 'over_5000', label: `Over ${currency}5,000` }
      ]
    },
    {
      id: 'why_not_spending',
      question: 'What stopped you from running Facebook Ads?',
      showIf: (ans: any) => ans.monthly_spend === 'zero',
      options: [
        { value: 'never_tried', label: "Haven't started yet" },
        { value: 'tried_failed', label: 'Tried but got no results' },
        { value: 'too_complex', label: 'Too complicated' },
        { value: 'no_budget', label: "Don't have budget" }
      ]
    },
    {
      id: 'planning_to_start',
      question: 'When are you planning to start?',
      showIf: (ans: any) => ans.why_not_spending === 'never_tried',
      options: [
        { value: 'this_month', label: 'This month' },
        { value: 'next_quarter', label: 'Next 3 months' },
        { value: 'exploring', label: 'Just exploring' }
      ]
    },
    {
      id: 'who_manages',
      question: 'Who manages your Facebook Ads?',
      showIf: (ans: any) => ans.monthly_spend !== 'zero',
      options: [
        { value: 'myself', label: 'I do it myself' },
        { value: 'team', label: 'My team' },
        { value: 'agency', label: 'An agency' },
        { value: 'boosting', label: 'Just boosting posts' }
      ]
    },
    {
      id: 'pixel_awareness',
      question: "I noticed you don't have a Facebook Pixel installed. Did you know about this?",
      showIf: (ans: any) => !siteAnalysis?.pixelFound && ans.monthly_spend !== 'zero' && ans.whose_website === 'mine',
      options: [
        { value: 'didnt_know', label: "I didn't know I needed one" },
        { value: 'thought_installed', label: "I thought it was already installed" },
        { value: 'tried_couldnt', label: "I tried but couldn't figure it out" },
        { value: 'chose_not_to', label: "I chose not to install it" }
      ]
    },
    {
      id: 'pixel_blocker',
      question: 'What stopped you from installing it?',
      showIf: (ans: any) => ans.pixel_awareness === 'tried_couldnt',
      options: [
        { value: 'too_technical', label: 'Too technical for me' },
        { value: 'platform_issues', label: 'My website platform made it difficult' },
        { value: 'no_developer', label: "Couldn't get developer help" },
        { value: 'conflicting_info', label: 'Found conflicting instructions' }
      ]
    },
    {
      id: 'pixel_working',
      question: 'Good news - your Pixel is installed! Is it tracking conversions properly?',
      showIf: (ans: any) => siteAnalysis?.pixelFound && ans.monthly_spend !== 'zero' && ans.whose_website === 'mine',
      options: [
        { value: 'yes_working', label: 'Yes, tracking everything perfectly' },
        { value: 'some_events', label: 'Some events work, others don\'t' },
        { value: 'not_sure', label: 'Not sure how to check' },
        { value: 'no_conversions', label: 'Installed but not tracking conversions' }
      ]
    },
    {
      id: 'business_age',
      question: 'How long has your business been running?',
      showIf: (ans: any) => ans.whose_website === 'mine',
      options: [
        { value: 'startup', label: 'Less than 6 months (startup)' },
        { value: 'new', label: '6-12 months (new)' },
        { value: 'established', label: '1-3 years (established)' },
        { value: 'mature', label: '3+ years (mature)' }
      ]
    },
    {
      id: 'advertising_duration',
      question: 'How long have you been running Facebook Ads?',
      showIf: (ans: any) => ans.monthly_spend !== 'zero',
      options: [
        { value: 'just_started', label: 'Just started (less than 1 month)' },
        { value: '1_3_months', label: '1-3 months' },
        { value: '3_6_months', label: '3-6 months' },
        { value: 'over_6_months', label: 'Over 6 months' }
      ]
    },
    {
      id: 'conversions_per_week',
      question: 'How many conversions do you get per week?',
      showIf: (ans: any) => ans.monthly_spend !== 'zero' && siteAnalysis?.pixelFound,
      options: [
        { value: 'none', label: '0 - No conversions yet' },
        { value: 'under_10', label: 'Under 10 (very limited data)' },
        { value: '10_50', label: '10-50 (learning limited)' },
        { value: 'over_50', label: 'Over 50 (optimized)' }
      ]
    },
    {
      id: 'main_problem',
      question: "What's your biggest challenge?",
      showIf: (ans: any) => ans.monthly_spend !== 'zero' && ans.who_manages !== 'agency',
      options: [
        { value: 'no_sales', label: 'Not getting enough sales' },
        { value: 'too_expensive', label: 'Cost per sale too high' },
        { value: 'learning_limited', label: 'Stuck in learning limited' },
        { value: 'dont_understand', label: "Don't understand the metrics" },
        { value: 'working_fine', label: "It's working well" }
      ]
    }
  ]

  const activeQuestions = questions.filter(q => !q.showIf || q.showIf(answers))
  const currentQ = activeQuestions[currentQuestion]

  const handleAnswer = (option: any) => {
    const newAnswers = { ...answers, [currentQ.id]: option.value }
    setAnswers(newAnswers)

    // Segment the lead
    let segment = 'cold'
    let priority = 5

    // HOT LEADS (Priority 1-2)
    if (newAnswers.monthly_spend === '500_2000' || newAnswers.monthly_spend === '2000_5000') {
      if (newAnswers.who_manages === 'myself' || newAnswers.who_manages === 'boosting') {
        segment = 'hot'
        priority = 1
      }
    }

    // WARM LEADS (Priority 3)
    if (newAnswers.monthly_spend === 'under_500' && newAnswers.who_manages === 'myself') {
      segment = 'warm'
      priority = 3
    }

    if (newAnswers.why_not_spending === 'tried_failed') {
      segment = 'warm'
      priority = 2
    }

    // COLD LEADS (Priority 4-5)
    if (newAnswers.monthly_spend === 'zero' && newAnswers.why_not_spending === 'no_budget') {
      segment = 'cold'
      priority = 5
    }

    // Store in assessment data
    setAssessmentData(prev => ({
      ...prev,
      qualification: newAnswers,
      segment,
      priority
    }))

    // Move to next question or complete
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onNext()
    }
  }

  if (!currentQ) {
    onNext()
    return null
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl p-12 rounded-2xl border border-emerald-500/20 max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-light text-emerald-400 mb-2 text-center">
          {currentQ.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {currentQ.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option)}
            className="p-6 bg-slate-900/30 rounded-xl border border-slate-600/50 hover:border-emerald-500/50 hover:bg-slate-900/50 transition-all duration-300 text-left group"
          >
            <span className="text-lg text-slate-200 group-hover:text-emerald-400 transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Back button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="mt-8 px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all duration-300 border border-slate-600/50"
        >
          ← Back
        </button>
      )}
    </div>
  )
}