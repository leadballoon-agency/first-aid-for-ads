'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { StepProps } from './types'

interface IntroStepProps extends StepProps {
  tempName: string
  setTempName: (name: string) => void
  setUserName: (name: string) => void
}

export default function IntroStep({
  tempName,
  setTempName,
  setUserName,
  onNext
}: IntroStepProps) {

  const handleContinue = () => {
    if (tempName.trim()) {
      setUserName(tempName)
      toast.success(`Nice to meet you, ${tempName}!`)
      // Prevent form submission from causing page jump
      setTimeout(() => {
        onNext()
      }, 50)
    }
  }

  return (
    <div className="bg-slate-900/20 backdrop-blur-sm p-12 rounded-lg border border-slate-700/30 max-w-2xl mx-auto w-full">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-emerald-400 mb-2">Welcome</h2>
          <p className="text-slate-500 text-sm">Let's begin with your name</p>
        </div>

        <div>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleContinue()
              }
            }}
            className="w-full px-6 py-4 bg-slate-950/50 text-white text-lg rounded-lg border border-slate-700/50 focus:border-emerald-500/50 focus:outline-none transition-all duration-300 placeholder:text-slate-600 text-center"
            placeholder="Enter your name"
            autoFocus
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!tempName.trim()}
          className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  )
}