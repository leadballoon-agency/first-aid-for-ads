'use client'

import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import IntroStep from '../components/assessment/IntroStep'
import AnalyzeStep from '../components/assessment/AnalyzeStep'
import QualificationStep from '../components/assessment/QualificationStep'
import AIChatInterface from '../components/assessment/AIChatInterface'
import FeedbackWidget from '../components/FeedbackWidget'
import { AssessmentData, AssessmentStep, Issue } from '../components/assessment/types'
import { trackEvent, trackStartAssessment, trackLead, trackCompleteAssessment } from '../components/Analytics'

export default function HomePage() {
  const initialAssessmentData: AssessmentData = {
    mode: 'guided',
    businessType: null,
    industry: null,
    pricePoint: null,
    targetMarket: null,
    salesModel: null,
    avgOrderValue: null,
    skippedInfrastructure: false,
    businessManager: null,
    businessInfoConnected: null,
    pixelInstalled: null,
    pixelFiring: null,
    hasLandingPage: null,
    conversionsPerWeek: null,
    optimizingFor: null,
    monthlyBudget: null,
    campaignCount: null,
    audienceOverlap: null,
    scores: {
      infrastructure: 100,
      pixel: 100,
      optimization: 100,
      overall: 100
    },
    issues: [],
    recommendations: []
  }

  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro')
  const [assessmentData, setAssessmentData] = useState<AssessmentData>(initialAssessmentData)
  const [userName, setUserName] = useState('')
  const [tempName, setTempName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [tempUrl, setTempUrl] = useState('')
  const [siteAnalysis, setSiteAnalysis] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleUrlSubmit = async () => {
    if (!tempUrl.trim()) return

    setAnalyzing(true)

    // Format the URL properly
    let formattedUrl = tempUrl.trim().replace(/\/$/, '')

    // Add https:// if no protocol is specified
    if (!formattedUrl.match(/^https?:\/\//i)) {
      formattedUrl = 'https://' + formattedUrl
    }

    // Basic URL validation
    try {
      new URL(formattedUrl)
    } catch (e) {
      toast.error('Please enter a valid URL (e.g., example.com or https://example.com)')
      setAnalyzing(false)
      return
    }

    setWebsiteUrl(formattedUrl)

    try {
      const response = await fetch('/api/analyze-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl })
      })

      const analysis = await response.json()

      if (analysis.error) {
        toast.error(analysis.error)

        // Show suggestions if available
        if (analysis.suggestions && analysis.suggestions.length > 0) {
          setTimeout(() => {
            toast(`Try one of: ${analysis.suggestions.slice(0, 3).join(', ')}`, {
              icon: '💡',
              duration: 5000
            })
          }, 1000)
        }

        setAnalyzing(false)
        return
      }

      setSiteAnalysis(analysis)

      // Track URL submission
      trackEvent('Search', {
        search_string: formattedUrl,
        pixel_found: analysis.pixelFound
      })

      if (!analysis.pixelFound) {
        toast.error('No pixel found - we\'ll help you fix that!', { duration: 4000 })
      } else if (analysis.multiplePixels) {
        toast('Multiple pixels detected - this could cause issues', { icon: '⚠️', duration: 4000 })
      } else if (analysis.pixelFound) {
        toast.success('Pixel detected! Let\'s check the rest of your setup', { duration: 3000 })
      }

      setAnalyzing(false)
    } catch (error) {
      console.error('Site analysis error:', error)
      toast.error('Could not analyze your site, but let\'s continue!')

      // Provide a basic fallback analysis
      const domain = formattedUrl.replace(/^https?:\/\//, '').split('/')[0]
      setSiteAnalysis({
        url: formattedUrl,
        domain: domain,
        pixelFound: false,
        pixelIds: [],
        issues: ['analysis_failed'],
        message: 'Analysis unavailable - please verify pixel manually',
        loadTime: null
      })

      setAnalyzing(false)
    }
  }


  const handleNext = () => {
    const steps: AssessmentStep[] = ['intro', 'analyze', 'qualification', 'ai-chat']
    const currentIndex = steps.indexOf(currentStep)

    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1]
      setCurrentStep(nextStep as AssessmentStep)

      // Track progression events
      if (nextStep === 'analyze') {
        trackStartAssessment()
      } else if (nextStep === 'ai-chat') {
        trackCompleteAssessment()
        // Track as lead when reaching AI chat
        trackLead()
      }

      // Track step progression
      trackEvent('ViewContent', {
        content_name: `Assessment Step: ${nextStep}`,
        content_category: 'assessment'
      })
    }
  }

  const handleBack = () => {
    const steps: AssessmentStep[] = ['intro', 'analyze', 'qualification', 'ai-chat']
    const currentIndex = steps.indexOf(currentStep)

    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col" suppressHydrationWarning>
      <Toaster
        position="top-center"
        toastOptions={{
          className: '',
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#e2e8f0',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(51, 65, 85, 0.5)',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '90vw',
            marginTop: '20px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#064e3b',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#7f1d1d',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
            },
          },
          loading: {
            iconTheme: {
              primary: '#a78bfa',
              secondary: '#4c1d95',
            },
            style: {
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              color: '#c4b5fd',
            },
          },
          duration: 3500,
        }}
      />

      {/* Subtle geometric background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(120deg, transparent 50%, rgba(16, 185, 129, 0.03) 50%),
                           linear-gradient(60deg, transparent 50%, rgba(16, 185, 129, 0.03) 50%)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          {currentStep === 'intro' && (
            <div>
              <header className="mb-12 text-center">
                <h1 className="text-6xl md:text-7xl font-light text-emerald-400 mb-4 tracking-tight">
                  First Aid For Ads
                </h1>
                <div className="w-24 h-px bg-emerald-500/30 mx-auto mb-4"></div>
                <p className="text-slate-400 text-lg font-light">
                  Professional Facebook Ads Diagnostics
                </p>
              </header>

              <IntroStep
                tempName={tempName}
                setTempName={setTempName}
                setUserName={setUserName}
                assessmentData={assessmentData}
                setAssessmentData={setAssessmentData}
                onNext={handleNext}
              />
            </div>
          )}

          {currentStep !== 'intro' && (
            <div>
              {/* Educational Tooltip */}
              {currentStep !== 'results' && currentStep !== 'ai-chat' && (
                <div className="mb-4 text-center">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {currentStep === 'analyze' && "Analyzing your website for Facebook Pixel, platform, and optimization opportunities"}
                    {currentStep === 'qualification' && "Your answers help us provide personalized recommendations"}
                  </p>
                </div>
              )}

              {/* Step Components */}
              {currentStep === 'analyze' && (
            <AnalyzeStep
              userName={userName}
              tempUrl={tempUrl}
              setTempUrl={setTempUrl}
              setWebsiteUrl={setWebsiteUrl}
              analyzing={analyzing}
              setAnalyzing={setAnalyzing}
              handleUrlSubmit={handleUrlSubmit}
              setSiteAnalysis={setSiteAnalysis}
              siteAnalysis={siteAnalysis}
              assessmentData={assessmentData}
              setAssessmentData={setAssessmentData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}


          {currentStep === 'qualification' && (
            <QualificationStep
              assessmentData={assessmentData}
              setAssessmentData={setAssessmentData}
              siteAnalysis={siteAnalysis}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}


          {currentStep === 'ai-chat' && (
            <AIChatInterface
              assessmentData={assessmentData}
              setAssessmentData={setAssessmentData}
              siteAnalysis={siteAnalysis}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border-t border-slate-800/50 pt-6">
            <div className="text-center space-y-3">
                <p className="text-slate-500 text-xs">
                  © 2025 First Aid For Ads. Not affiliated with Meta, Facebook, or any of their subsidiaries.
                </p>
                <p className="text-slate-600 text-xs">
                  Facebook® and Meta® are registered trademarks of Meta Platforms, Inc.
                </p>
                <div className="flex justify-center items-center space-x-6 text-xs">
                  <a
                    href="https://firstaidforads.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href="https://firstaidforads.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                  <span className="text-slate-700">•</span>
                  <a
                    href="mailto:support@firstaidforads.com"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    Contact
                  </a>
                </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Widget */}
      <FeedbackWidget />
    </div>
  )
}