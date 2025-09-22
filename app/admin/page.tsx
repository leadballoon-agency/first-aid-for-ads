'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'

interface AssessmentResult {
  id: string
  userName: string
  email?: string
  businessType: string
  score: number
  issues: string[]
  completedAt: string
}

interface FeedbackEntry {
  id: string
  type: 'bug' | 'feature' | 'praise' | 'question'
  message: string
  email?: string
  rating?: number
  page: string
  timestamp: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([])
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([])
  const [activeTab, setActiveTab] = useState<'assessments' | 'feedback' | 'analytics'>('assessments')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, this should be properly secured
    if (password === 'admin2024') {
      setIsAuthenticated(true)
      toast.success('Welcome to Admin Dashboard')
      // Fetch data
      fetchAssessmentResults()
      fetchFeedback()
    } else {
      toast.error('Invalid password')
    }
  }

  const fetchAssessmentResults = async () => {
    try {
      const response = await fetch('/api/assessments')
      if (response.ok) {
        const data = await response.json()
        setAssessmentResults(data)
      }
    } catch (error) {
      console.error('Failed to fetch assessments:', error)
    }
  }

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback/all')
      if (response.ok) {
        const data = await response.json()
        setFeedbackEntries(data)
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
        <Navigation />
        
        <main className="pt-24 pb-20 px-4">
          <div className="container max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <h1 className="text-2xl font-bold mb-6 text-center">
                Admin <span className="gradient-text">Login</span>
              </h1>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-400/50 border border-gray-600 rounded-lg focus:border-accent focus:outline-none mb-4"
                  autoFocus
                />
                
                <button type="submit" className="w-full btn-primary">
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-8">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                onClick={() => setActiveTab('assessments')}
                className={`px-6 py-3 rounded-lg transition ${
                  activeTab === 'assessments' 
                    ? 'bg-accent text-dark-400 font-semibold' 
                    : 'glass-card hover:border-accent/50'
                }`}
              >
                Assessments
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`px-6 py-3 rounded-lg transition ${
                  activeTab === 'feedback' 
                    ? 'bg-accent text-dark-400 font-semibold' 
                    : 'glass-card hover:border-accent/50'
                }`}
              >
                Feedback
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-3 rounded-lg transition ${
                  activeTab === 'analytics' 
                    ? 'bg-accent text-dark-400 font-semibold' 
                    : 'glass-card hover:border-accent/50'
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Content Area */}
            <div className="glass-card p-6 md:p-8">
              {activeTab === 'assessments' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Assessment Results</h2>
                  
                  {assessmentResults.length === 0 ? (
                    <p className="text-gray-400">No assessment results yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Business Type</th>
                            <th className="text-left py-3 px-4">Score</th>
                            <th className="text-left py-3 px-4">Issues</th>
                            <th className="text-left py-3 px-4">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assessmentResults.map((result) => (
                            <tr key={result.id} className="border-b border-gray-800">
                              <td className="py-3 px-4">{result.userName}</td>
                              <td className="py-3 px-4">{result.businessType}</td>
                              <td className="py-3 px-4">
                                <span className={`font-bold ${
                                  result.score > 80 ? 'text-green-400' :
                                  result.score > 50 ? 'text-yellow-400' :
                                  'text-red-400'
                                }`}>
                                  {result.score}%
                                </span>
                              </td>
                              <td className="py-3 px-4">{result.issues.length} issues</td>
                              <td className="py-3 px-4">
                                {new Date(result.completedAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">User Feedback</h2>
                  
                  {feedbackEntries.length === 0 ? (
                    <p className="text-gray-400">No feedback received yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {feedbackEntries.map((feedback) => (
                        <div key={feedback.id} className="p-4 bg-dark-400/50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                feedback.type === 'bug' ? 'bg-red-500/20 text-red-400' :
                                feedback.type === 'feature' ? 'bg-blue-500/20 text-blue-400' :
                                feedback.type === 'praise' ? 'bg-green-500/20 text-green-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {feedback.type.toUpperCase()}
                              </span>
                              {feedback.rating && (
                                <span className="text-yellow-400">
                                  {'★'.repeat(feedback.rating)}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(feedback.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-300 mb-2">{feedback.message}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {feedback.email && (
                              <span>📧 {feedback.email}</span>
                            )}
                            <span>📄 {feedback.page}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-dark-400/50 rounded-lg">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {assessmentResults.length}
                      </div>
                      <div className="text-sm text-gray-400">Total Assessments</div>
                    </div>
                    
                    <div className="p-6 bg-dark-400/50 rounded-lg">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {assessmentResults.filter(r => r.score > 70).length}
                      </div>
                      <div className="text-sm text-gray-400">High Score Results</div>
                    </div>
                    
                    <div className="p-6 bg-dark-400/50 rounded-lg">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {feedbackEntries.length}
                      </div>
                      <div className="text-sm text-gray-400">Feedback Received</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Common Issues Identified</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-dark-400/50 rounded">
                        <span>Business Manager Not Setup</span>
                        <span className="text-accent font-bold">87%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-dark-400/50 rounded">
                        <span>Pixel Not Firing Correctly</span>
                        <span className="text-accent font-bold">73%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-dark-400/50 rounded">
                        <span>Campaign Audience Overlap</span>
                        <span className="text-accent font-bold">65%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-dark-400/50 rounded">
                        <span>Learning Phase Issues</span>
                        <span className="text-accent font-bold">52%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}