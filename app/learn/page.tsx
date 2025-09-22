'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import * as Accordion from '@radix-ui/react-accordion'
import * as Progress from '@radix-ui/react-progress'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { useRouter } from 'next/navigation'

// Educational modules data
const educationModules = {
  fundamentals: {
    title: "Campaign Fundamentals",
    icon: "🎯",
    modules: [
      {
        id: "offer-first",
        title: "Why Your Offer Comes Before Everything",
        duration: "15 min",
        difficulty: "Beginner",
        content: {
          intro: "Before you even think about SEO, Facebook Ads, or any marketing channel, you need a proven offer. Here's why...",
          sections: [
            {
              title: "The Offer Hierarchy",
              content: "A great offer can save bad marketing, but great marketing can't save a bad offer. Your offer is the foundation of everything.",
              interactive: {
                type: "quiz",
                question: "What should you validate first before spending on ads?",
                options: [
                  { text: "Your website design", correct: false },
                  { text: "Your offer's market fit", correct: true },
                  { text: "Your SEO strategy", correct: false },
                  { text: "Your social media presence", correct: false }
                ]
              }
            },
            {
              title: "The £100 Test",
              content: "Can you get 10 people to say 'yes' to your offer with just £100 in ads? If not, don't scale - iterate on your offer first.",
              tool: {
                type: "calculator",
                title: "Offer Viability Calculator",
                inputs: ["Cost per lead", "Conversion rate", "Customer lifetime value"]
              }
            }
          ]
        }
      },
      {
        id: "pixel-seasoning",
        title: "How to Season Your Facebook Pixel Like a Pro",
        duration: "20 min",
        difficulty: "Intermediate",
        content: {
          intro: "A 'cold' pixel is like a new driver - it needs time and data to learn. Here's the strategic way to season it for optimal performance.",
          sections: [
            {
              title: "The 50 Conversion Rule",
              content: "Facebook's algorithm needs at least 50 conversions per week to exit the learning phase effectively. But here's the secret - those conversions don't have to be purchases!",
              strategy: {
                steps: [
                  "Start with micro-conversions (page views, content views)",
                  "Progress to engagement events (add to cart, initiate checkout)",
                  "Graduate to macro-conversions (purchases, leads)",
                  "Use our assessment tool completions as initial conversions!"
                ]
              }
            },
            {
              title: "Pixel Seasoning Timeline",
              content: "Week 1-2: Focus on traffic and engagement. Week 3-4: Shift to lead generation. Week 5+: Optimize for purchases.",
              tracker: {
                type: "progress",
                phases: [
                  { name: "Cold Start", conversions: "0-10", status: "learning" },
                  { name: "Warming Up", conversions: "10-50", status: "optimizing" },
                  { name: "Seasoned", conversions: "50+", status: "performing" }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  optimization: {
    title: "Campaign Optimization",
    icon: "⚡",
    modules: [
      {
        id: "learning-phase",
        title: "Mastering the Learning Phase",
        duration: "12 min",
        difficulty: "Intermediate",
        content: {
          intro: "The learning phase is where most campaigns die. Here's how to navigate it successfully.",
          sections: [
            {
              title: "Why Campaigns Get Stuck",
              content: "Making too many changes resets the learning phase. Each significant edit means starting over.",
              rules: [
                "Don't touch campaigns for first 3 days",
                "Budget changes over 20% reset learning",
                "Audience changes reset learning",
                "Creative swaps reset learning"
              ]
            }
          ]
        }
      },
      {
        id: "assessment-optimization",
        title: "Using Assessments to Season Your Pixel",
        duration: "10 min",
        difficulty: "Advanced",
        content: {
          intro: "Our assessment tool isn't just for diagnostics - it's a strategic pixel seasoning weapon.",
          sections: [
            {
              title: "The Assessment Funnel Strategy",
              content: "Drive traffic to the assessment tool as your first conversion event. It's high-intent, valuable, and easier to achieve than purchases.",
              implementation: {
                steps: [
                  "Create ads promoting free assessment",
                  "Track 'StartAssessment' as micro-conversion",
                  "Track 'CompleteAssessment' as standard event",
                  "Use completions to exit learning phase faster",
                  "Retarget assessment takers with offers"
                ]
              }
            }
          ]
        }
      }
    ]
  },
  advanced: {
    title: "Advanced Strategies",
    icon: "🚀",
    modules: [
      {
        id: "slo-strategy",
        title: "S.L.O. Strategy Calculator - Scale & Reduce Costs",
        duration: "30 min",
        difficulty: "Expert",
        isCalculator: true,
        content: {
          intro: "The Seasoning, Laddering & Optimizing strategy is our advanced method for scaling campaigns while reducing lead costs. Only use this after mastering the fundamentals.",
          sections: [
            {
              title: "Prerequisites Before Using S.L.O.",
              content: "This is an ADVANCED strategy. You must have: properly configured Business Manager, working pixel tracking, optimized landing pages, established baseline conversion rates, and at least $50-100/day budget.",
              checklist: [
                "✅ Fixed all Business Manager issues",
                "✅ Pixel tracking accurately",
                "✅ Landing pages optimized",
                "✅ Creative testing complete",
                "✅ Baseline metrics established",
                "✅ Ready to commit budget consistently"
              ]
            },
            {
              title: "The Three Phases",
              content: "Seasoning: Build pixel data with micro-conversions. Laddering: Gradually increase conversion difficulty. Optimizing: Scale winning campaigns.",
              timeline: {
                phases: [
                  { name: "Seasoning (Weeks 1-2)", focus: "50+ micro-conversions weekly" },
                  { name: "Laddering (Weeks 3-4)", focus: "Transition to quality events" },
                  { name: "Optimizing (Week 5+)", focus: "Scale and reduce costs" }
                ]
              }
            }
          ]
        }
      }
    ]
  },
  troubleshooting: {
    title: "Common Issues & Fixes",
    icon: "🔧",
    modules: [
      {
        id: "attribution-issues",
        title: "Fixing iOS 14.5+ Attribution",
        duration: "18 min",
        difficulty: "Expert",
        content: {
          intro: "Since iOS 14.5, attribution has been broken. Here's how to work around it.",
          sections: [
            {
              title: "The 7-Day Click Window",
              content: "You're now limited to 7-day click attribution. This means you need faster conversion paths.",
              solutions: [
                "Shorten your sales cycle",
                "Use Conversions API",
                "Implement server-side tracking",
                "Focus on same-day conversions"
              ]
            }
          ]
        }
      }
    ]
  }
}

export default function LearnPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('fundamentals')
  const [showSLOCalculator, setShowSLOCalculator] = useState(false)
  const [activeModule, setActiveModule] = useState<any>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [pixelEvents, setPixelEvents] = useState<any[]>([])
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({})
  const [hasAssessment, setHasAssessment] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Check assessment and load progress
  useEffect(() => {
    const assessmentData = localStorage.getItem('assessmentCompleted')
    if (!assessmentData) {
      toast.error('Please complete the assessment first to access the Learning Center!', {
        icon: '🔒',
        duration: 4000,
      })
      router.push('/')
      return
    }
    
    setHasAssessment(true)
    setLoading(false)
    
    const saved = localStorage.getItem('learn-progress')
    if (saved) setProgress(JSON.parse(saved))
  }, [router])

  // Track pixel events
  const trackEvent = (eventType: string, data?: any) => {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      data
    }
    setPixelEvents(prev => [...prev, event])
    
    // Send to backend
    fetch('/api/pixel/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    })
  }

  // Start module
  const startModule = (module: any) => {
    if (module.isCalculator && module.id === 'slo-strategy') {
      setShowSLOCalculator(true)
      trackEvent('OpenSLOCalculator', { moduleId: module.id })
      toast.success('Opening S.L.O. Calculator')
    } else {
      setActiveModule(module)
      trackEvent('StartModule', { moduleId: module.id })
      toast.success(`Started: ${module.title}`)
    }
  }

  // Complete module
  const completeModule = (moduleId: string) => {
    setProgress(prev => ({ ...prev, [moduleId]: 100 }))
    setShowConfetti(true)
    trackEvent('CompleteModule', { moduleId })
    toast.success('Module completed! 🎉')
    setTimeout(() => setShowConfetti(false), 5000)
  }

  // Handle quiz answer
  const handleQuizAnswer = (moduleId: string, questionId: string, answer: any) => {
    setQuizAnswers(prev => ({
      ...prev,
      [`${moduleId}-${questionId}`]: answer
    }))
    
    if (answer.correct) {
      toast.success('Correct! 🎯')
      trackEvent('QuizCorrect', { moduleId, questionId })
    } else {
      toast.error('Not quite. Try again!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-400">Loading Learning Center...</p>
        </div>
      </div>
    )
  }

  if (!hasAssessment) {
    return null // Router will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
      {showConfetti && <Confetti />}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Header - adjusted for sticky nav */}
      <header className="border-b border-accent/20 backdrop-blur-xl bg-dark-400/50 pt-20 pb-4">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-400 hover:text-accent transition">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-accent">Learning Center</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-playfair">Learning Center</h1>
              <p className="text-sm text-gray-400">Master Facebook Ads the Right Way</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Your Progress</p>
                <p className="text-xl font-bold gradient-text">
                  {Object.keys(progress).length} / {Object.values(educationModules).flatMap(c => c.modules).length} Modules
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <nav className="space-y-2">
                {Object.entries(educationModules).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeCategory === key 
                        ? 'bg-accent/20 border-l-4 border-accent' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <p className="font-medium">{category.title}</p>
                        <p className="text-xs text-gray-400">{category.modules.length} modules</p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Pixel Tracker */}
            <div className="glass-card p-4 mt-4">
              <h3 className="text-sm font-semibold mb-2 gradient-text">Pixel Seasoning Tracker</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Events Today</span>
                  <span className="font-bold">{pixelEvents.filter(e => {
                    const today = new Date().toDateString()
                    return new Date(e.timestamp).toDateString() === today
                  }).length}</span>
                </div>
                <Progress.Root className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <Progress.Indicator 
                    className="h-full bg-gradient-to-r from-accent to-accent-light transition-all"
                    style={{ width: `${Math.min((pixelEvents.length / 50) * 100, 100)}%` }}
                  />
                </Progress.Root>
                <p className="text-xs text-gray-400">
                  {pixelEvents.length < 50 
                    ? `${50 - pixelEvents.length} events until learning phase exit`
                    : '✅ Pixel is seasoned!'
                  }
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {showSLOCalculator ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setShowSLOCalculator(false)}
                  className="text-accent hover:text-accent-light transition flex items-center gap-2"
                >
                  ← Back to Learning Center
                </button>
                
                {/* SLO Calculator Content */}
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold font-playfair mb-4">
                    S.L.O. Strategy <span className="gradient-text">Calculator</span>
                  </h2>
                  
                  {/* Warning Banner */}
                  <div className="glass-card p-4 mb-6 border-yellow-500/30 bg-yellow-500/5">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-500 text-2xl">⚠️</span>
                      <div>
                        <h4 className="text-yellow-500 font-semibold mb-1">Advanced Strategy Alert</h4>
                        <p className="text-sm text-gray-300">
                          Only use this after implementing all fundamental optimizations. 
                          This strategy requires consistent daily budget and proper tracking setup.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Tutorial */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Tutorial: How to Use the S.L.O. Calculator</h3>
                    <div className="relative rounded-xl overflow-hidden" style={{ padding: '56.25% 0 0 0' }}>
                      <iframe
                        src="https://player.vimeo.com/video/1114671549?badge=0&autopause=0&player_id=0&app_id=58479"
                        title="S.L.O. Calculator Tutorial"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%'
                        }}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  
                  {/* Calculator Embed */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Interactive Calculator</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      💡 Edit the yellow cells to see your custom results
                    </p>
                    <div className="rounded-xl overflow-hidden" style={{ height: '800px' }}>
                      <iframe
                        src="https://docs.google.com/spreadsheets/d/1hntnY34vK24U0ZrTX4zTQBVl_hfIWe2Xa2-6UedfxUI/edit?embedded=true"
                        className="w-full h-full"
                        frameBorder="0"
                      >
                        Loading calculator...
                      </iframe>
                    </div>
                  </div>
                  
                  {/* Instructions */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass-card p-4">
                      <div className="text-2xl mb-2">📝</div>
                      <h4 className="font-bold mb-1">Step 1: Input Data</h4>
                      <p className="text-xs text-gray-400">
                        Enter your AOV, conversion rate, and daily budget
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-bold mb-1">Step 2: Review Timeline</h4>
                      <p className="text-xs text-gray-400">
                        See when to transition between phases
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <div className="text-2xl mb-2">🚀</div>
                      <h4 className="font-bold mb-1">Step 3: Execute</h4>
                      <p className="text-xs text-gray-400">
                        Follow the recommended budget and timeline
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : !activeModule ? (
              <div className="space-y-6">
                <div className="glass-card p-8">
                  <h2 className="text-3xl font-bold font-playfair mb-4">
                    {educationModules[activeCategory as keyof typeof educationModules].title}
                  </h2>
                  <div className="grid gap-4">
                    {educationModules[activeCategory as keyof typeof educationModules].modules.map((module) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="education-card cursor-pointer"
                        onClick={() => startModule(module)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                            <p className="text-gray-400 mb-3">{module.content.intro}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                ⏱ {module.duration}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {module.difficulty}
                              </span>
                            </div>
                          </div>
                          {progress[module.id] === 100 && (
                            <div className="text-2xl">✅</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8"
              >
                <button
                  onClick={() => setActiveModule(null)}
                  className="mb-4 text-accent hover:text-accent-light transition"
                >
                  ← Back to modules
                </button>
                
                <h2 className="text-3xl font-bold font-playfair mb-2">{activeModule.title}</h2>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                  <span>⏱ {activeModule.duration}</span>
                  <span>📊 {activeModule.difficulty}</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg mb-6">{activeModule.content.intro}</p>
                  
                  <Accordion.Root type="single" collapsible className="space-y-4">
                    {activeModule.content.sections.map((section: any, index: number) => (
                      <Accordion.Item key={index} value={`section-${index}`} className="glass-card">
                        <Accordion.Trigger className="w-full p-6 text-left hover:bg-white/5 transition">
                          <h3 className="text-xl font-semibold">{section.title}</h3>
                        </Accordion.Trigger>
                        <Accordion.Content className="p-6 pt-0">
                          <p className="mb-4">{section.content}</p>
                          
                          {/* Interactive elements */}
                          {section.interactive && section.interactive.type === 'quiz' && (
                            <div className="bg-dark-100/50 rounded-lg p-4 mt-4">
                              <p className="font-semibold mb-3">{section.interactive.question}</p>
                              <div className="grid gap-2">
                                {section.interactive.options.map((option: any, i: number) => (
                                  <button
                                    key={i}
                                    onClick={() => handleQuizAnswer(activeModule.id, `q${index}`, option)}
                                    className={`p-3 rounded-lg text-left transition ${
                                      quizAnswers[`${activeModule.id}-q${index}`] === option
                                        ? option.correct 
                                          ? 'bg-green-500/20 border border-green-500'
                                          : 'bg-red-500/20 border border-red-500'
                                        : 'bg-white/5 hover:bg-white/10'
                                    }`}
                                  >
                                    {option.text}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {section.strategy && (
                            <div className="bg-accent/10 rounded-lg p-4 mt-4">
                              <p className="font-semibold mb-2">Implementation Strategy:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {section.strategy.steps.map((step: string, i: number) => (
                                  <li key={i} className="text-sm">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                          
                          {section.implementation && (
                            <div className="bg-accent/10 rounded-lg p-4 mt-4">
                              <p className="font-semibold mb-2">How to Implement:</p>
                              <ol className="list-decimal list-inside space-y-1">
                                {section.implementation.steps.map((step: string, i: number) => (
                                  <li key={i} className="text-sm">{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion.Root>
                  
                  <button
                    onClick={() => completeModule(activeModule.id)}
                    className="btn-primary w-full mt-8"
                    disabled={progress[activeModule.id] === 100}
                  >
                    {progress[activeModule.id] === 100 ? 'Completed ✅' : 'Mark as Complete'}
                  </button>
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}