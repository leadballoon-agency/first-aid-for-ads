'use client'

import { useState, useEffect } from 'react'

export default function FeedbackWidget() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'type' | 'message'>('type')
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'praise' | 'question' | null>(null)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render on client side to prevent hydration errors
  if (!mounted) return null

  const feedbackTypes = [
    {
      id: 'bug' as const,
      label: 'Report Bug',
      icon: '🐛',
      description: 'Something not working?',
      placeholder: 'Tell us what went wrong...'
    },
    {
      id: 'feature' as const,
      label: 'Request Feature',
      icon: '✨',
      description: 'Have an idea?',
      placeholder: 'What feature would you like to see?'
    },
    {
      id: 'praise' as const,
      label: 'Give Praise',
      icon: '💜',
      description: 'Love something?',
      placeholder: 'What made you happy?'
    },
    {
      id: 'question' as const,
      label: 'Ask Question',
      icon: '❓',
      description: 'Need help?',
      placeholder: 'What would you like to know?'
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Reset form
    setMessage('')
    setEmail('')
    setFeedbackType(null)
    setStep('type')
    setSending(false)
    setIsOpen(false)
  }

  const handleTypeSelect = (type: typeof feedbackTypes[number]['id']) => {
    setFeedbackType(type)
    setStep('message')
  }

  return (
    <>
      {/* Floating Action Button - Purple Accent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Open feedback widget"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          )}
        </svg>
      </button>

      {/* Feedback Panel - Elegant Dark Theme */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[420px] max-w-[calc(100vw-3rem)]">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden animate-slideUp">

            {step === 'type' ? (
              <>
                {/* Header */}
                <div className="p-6 pb-4 border-b border-slate-800/50">
                  <h3 className="text-xl font-light text-white mb-1">How can we help?</h3>
                  <p className="text-slate-400 text-sm">Choose an option below</p>
                </div>

                {/* Four Glassmorphic Cards */}
                <div className="grid grid-cols-2 gap-3 p-6">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className="group relative p-5 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium text-slate-200">{type.label}</div>
                      <div className="text-xs text-slate-400 mt-1">{type.description}</div>

                      {/* Subtle purple glow on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-violet-600/0 group-hover:from-purple-600/5 group-hover:to-violet-600/5 transition-all duration-300 pointer-events-none" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Header for Message */}
                <div className="p-6 pb-4 border-b border-slate-800/50">
                  <button
                    onClick={() => setStep('type')}
                    className="flex items-center text-slate-400 hover:text-white mb-3 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <div className="flex items-center">
                    <span className="text-3xl mr-3">
                      {feedbackTypes.find(t => t.id === feedbackType)?.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-light text-white">
                        {feedbackTypes.find(t => t.id === feedbackType)?.label}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {feedbackTypes.find(t => t.id === feedbackType)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder={feedbackTypes.find(t => t.id === feedbackType)?.placeholder}
                      autoFocus
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                      placeholder="Email (optional)"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!message.trim() || sending}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {sending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Feedback'
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Or email{' '}
                    <a href="mailto:support@firstaidforads.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                      support@firstaidforads.com
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  )
}