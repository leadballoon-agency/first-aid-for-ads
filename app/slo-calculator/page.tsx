'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'

export default function SLOCalculatorPage() {
  const [showVideo, setShowVideo] = useState(false)
  const [copied, setCopied] = useState(false)

  // Configuration URLs
  const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1hntnY34vK24U0ZrTX4zTQBVl_hfIWe2Xa2-6UedfxUI/edit"
  const VIDEO_URL = "https://player.vimeo.com/video/1114671549?badge=0&autopause=0&player_id=0&app_id=58479"
  const SHEET_TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/1hntnY34vK24U0ZrTX4zTQBVl_hfIWe2Xa2-6UedfxUI/copy" // Users can copy this template

  const copySheetTemplate = () => {
    // This would copy the template URL to clipboard
    navigator.clipboard.writeText(SHEET_TEMPLATE_URL)
    setCopied(true)
    toast.success('Template link copied! Open it and make a copy for yourself.')
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-400 hover:text-accent transition">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/knowledge" className="text-gray-400 hover:text-accent transition">
                Knowledge Base
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-accent">S.L.O. Calculator</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              S.L.O. Strategy <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
              Calculate your exact budget needs and timeline for the Seasoning, Laddering & Optimizing strategy
            </p>
            
            {/* Advanced Strategy Warning */}
            <div className="glass-card p-4 max-w-3xl mx-auto border-yellow-500/30 bg-yellow-500/5">
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-2xl">⚠️</span>
                <div className="text-left">
                  <h4 className="text-yellow-500 font-semibold mb-1">Advanced Strategy Alert</h4>
                  <p className="text-sm text-gray-300">
                    The S.L.O. strategy is an advanced technique for advertisers looking to mitigate lead costs at scale. 
                    <strong className="text-white"> Before implementing this strategy</strong>, ensure you have:
                  </p>
                  <ul className="text-sm text-gray-400 mt-2 space-y-1">
                    <li>✓ Fixed your Business Manager setup and pixel tracking</li>
                    <li>✓ Implemented proper conversion tracking</li>
                    <li>✓ Optimized your landing pages and creative</li>
                    <li>✓ Established a baseline conversion rate</li>
                    <li>✓ Budget of at least $50-100/day to commit</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <span>📹</span>
              {showVideo ? 'Hide Tutorial' : 'Watch Tutorial'}
            </button>
            
            <button
              onClick={copySheetTemplate}
              className="glass-card px-6 py-3 hover:border-accent/50 transition flex items-center justify-center gap-2"
            >
              <span>📊</span>
              {copied ? 'Copied!' : 'Get Your Own Copy'}
            </button>
            
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card px-6 py-3 hover:border-accent/50 transition flex items-center justify-center gap-2"
            >
              <span>🔗</span>
              Open in Google Sheets
            </a>
          </motion.div>

          {/* Video Tutorial */}
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12"
            >
              <div className="glass-card p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  How to Use the S.L.O. Calculator
                </h2>
                <div className="relative rounded-xl overflow-hidden" style={{ padding: '56.25% 0 0 0' }}>
                  <iframe
                    src={VIDEO_URL}
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
            </motion.div>
          )}

          {/* Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 md:p-8 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Interactive S.L.O. Calculator</h2>
              <span className="text-sm text-gray-400">
                💡 Edit the yellow cells to see your custom results
              </span>
            </div>
            
            {/* Google Sheets Embed */}
            <div className="rounded-xl overflow-hidden" style={{ height: '800px' }}>
              <iframe
                src={`${GOOGLE_SHEET_URL}?embedded=true`}
                className="w-full h-full"
                frameBorder="0"
              >
                Loading calculator...
              </iframe>
            </div>
          </motion.div>

          {/* Instructions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Step 1: Input Your Data</h3>
              <p className="text-gray-300 text-sm">
                Enter your current metrics: average order value, current conversion rate, 
                and daily budget in the yellow cells.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Step 2: Review Timeline</h3>
              <p className="text-gray-300 text-sm">
                The calculator shows exactly when to switch between Seasoning, 
                Laddering, and Optimizing phases based on your data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-2">Step 3: Execute Plan</h3>
              <p className="text-gray-300 text-sm">
                Follow the recommended budget and timeline. The calculator updates 
                in real-time as you progress through each phase.
              </p>
            </motion.div>
          </div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 border-accent/30"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              What Makes This Calculator <span className="gradient-text">Special</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Real-Time Calculations</h4>
                    <p className="text-sm text-gray-400">
                      Updates instantly as you change your inputs
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Phase Timing</h4>
                    <p className="text-sm text-gray-400">
                      Shows exactly when to transition between S.L.O. phases
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Budget Optimization</h4>
                    <p className="text-sm text-gray-400">
                      Calculates minimum budget needed for success
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Conversion Predictions</h4>
                    <p className="text-sm text-gray-400">
                      Projects your conversion volume at each phase
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">ROI Forecasting</h4>
                    <p className="text-sm text-gray-400">
                      Estimates your return at each optimization level
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Scaling Roadmap</h4>
                    <p className="text-sm text-gray-400">
                      Shows when and how much to increase budgets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prerequisites Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-8 mb-12 border-accent/30"
          >
            <h3 className="text-2xl font-bold mb-6">
              Ready for S.L.O.? <span className="gradient-text">Check Your Prerequisites</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-accent mb-3">Must Have:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Working Facebook Pixel with accurate tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>At least 2-3 months of campaign data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Consistent daily budget ($50+ minimum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Optimized landing pages and ad creative</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent mb-3">When to Use S.L.O.:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">→</span>
                    <span>Your CPL is too high despite optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">→</span>
                    <span>You're stuck in "Learning Limited" status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">→</span>
                    <span>You need to scale beyond current limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">→</span>
                    <span>You want predictable, scalable results</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                Not ready yet? Start with our assessment to identify and fix fundamental issues first.
              </p>
              <Link href="/" className="text-accent hover:underline text-sm">
                Take the Free Assessment →
              </Link>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <h3 className="text-2xl font-bold mb-4">
              Need Help Implementing Your S.L.O. Strategy?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our experts can set up and manage your entire S.L.O. campaign, 
              ensuring you hit every milestone for maximum profitability.
            </p>
            <Link href="/#services" className="btn-primary inline-flex items-center gap-2">
              Get Expert Implementation
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}