'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { StepProps } from './types'

interface AnalyzeStepProps extends StepProps {
  tempUrl: string
  setTempUrl: (url: string) => void
  setWebsiteUrl: (url: string) => void
  analyzing: boolean
  setAnalyzing: (analyzing: boolean) => void
  handleUrlSubmit: () => Promise<void>
  setSiteAnalysis: (analysis: any) => void
}

export default function AnalyzeStep({
  userName,
  tempUrl,
  setTempUrl,
  analyzing,
  handleUrlSubmit,
  siteAnalysis,
  onNext,
  onBack
}: AnalyzeStepProps) {

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl p-12 rounded-2xl border border-emerald-500/20 max-w-3xl mx-auto w-full">

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && tempUrl.trim() && !analyzing) {
                handleUrlSubmit()
              }
            }}
            className="w-full px-6 py-4 bg-slate-900/50 text-white text-lg rounded-xl border border-slate-600/50 focus:border-emerald-500 focus:outline-none transition-all duration-300 placeholder:text-slate-500 text-center"
            placeholder="Your website"
            disabled={analyzing}
            autoFocus
          />
        </div>

        {!siteAnalysis && (
          <button
            onClick={handleUrlSubmit}
            disabled={!tempUrl.trim() || analyzing}
            className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-slate-900 font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            {analyzing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              'Analyze'
            )}
          </button>
        )}

        {siteAnalysis && (
          <div className="mt-8 p-8 bg-slate-900/30 rounded-xl border border-emerald-500/10">
            {/* Pixel Health Check - Most Important */}
            <div className="mb-6 p-6 bg-slate-900/50 rounded-xl border-2 border-emerald-500/30">
              <h3 className="text-emerald-400 font-semibold text-lg mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span> Pixel Health Check
              </h3>
            {/* Website Analysis */}
            <div className="space-y-3 text-slate-300">
              <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">Website Analysis</h4>
              <p className="flex items-center">
                <span className="text-emerald-400 mr-2">✓</span>
                Domain: {siteAnalysis.domain}
              </p>
              <div className={`p-4 rounded-lg ${
                siteAnalysis.pixelFound
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-rose-500/10 border border-rose-500/30'
              }`}>
                <p className={`text-lg font-medium mb-2 ${
                  siteAnalysis.pixelFound ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {siteAnalysis.pixelFound ? '✅ Pixel Detected' : '🚫 No Pixel Found'}
                </p>
                <p className="text-slate-400 text-sm">
                  {siteAnalysis.message}
                </p>
                {siteAnalysis.pixelIds && siteAnalysis.pixelIds.length > 0 && (
                  <p className="text-slate-500 text-xs mt-2">
                    Pixel ID: {siteAnalysis.pixelIds[0]}
                  </p>
                )}
              </div>
            </div>
              {/* Analysis time removed - not actual page speed */}

              {/* Platform & Contact Info */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-500 text-xs uppercase mb-1">Platform</p>
                  <p className="text-emerald-400 font-medium">
                    {siteAnalysis.businessInfo?.platform || 'Unknown'}
                  </p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-500 text-xs uppercase mb-1">Contact Found</p>
                  <p className="text-emerald-400 font-medium">
                    {(siteAnalysis.contactInfo?.emails?.length > 0 || siteAnalysis.contactInfo?.phones?.length > 0)
                      ? '✅ Yes' : '⚠️ No'}
                  </p>
                </div>
              </div>

              {/* Contact Details if found */}
              {(siteAnalysis.contactInfo?.emails?.length > 0 || siteAnalysis.contactInfo?.phones?.length > 0) && (
                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  {siteAnalysis.contactInfo.emails?.length > 0 && (
                    <p className="text-sm text-slate-400">
                      📧 {siteAnalysis.contactInfo.emails[0]}
                    </p>
                  )}
                  {siteAnalysis.contactInfo.phones?.length > 0 && (
                    <p className="text-sm text-slate-400 mt-1">
                      📞 {siteAnalysis.contactInfo.phones[0]}
                    </p>
                  )}
                </div>
              )}

              {/* Issues if no pixel */}
              {!siteAnalysis.pixelFound && (
                <div className="mt-4 p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                  <p className="text-rose-400 text-sm font-medium mb-2">🚨 Critical Issue</p>
                  <p className="text-slate-400 text-sm">
                    Without a Facebook Pixel, you can't track conversions, optimize campaigns, or build retargeting audiences.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/70 transition-all duration-300 border border-slate-600/50"
              >
                ← Back
              </button>
              <button
                onClick={onNext}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                Continue →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}