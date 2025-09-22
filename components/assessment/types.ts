// Shared types for the assessment flow
export type AssessmentMode = 'guided' | 'expert'
export type AssessmentStep = 'intro' | 'analyze' | 'qualification' | 'results' | 'ai-chat'
export type BusinessQuestion = 'type' | 'price' | 'market' | 'model' | 'complete'

export interface AssessmentData {
  mode: AssessmentMode
  // Business Profile
  businessType: 'ecommerce' | 'service' | 'local' | 'saas' | 'info' | null
  industry: string | null
  pricePoint: 'low' | 'medium' | 'high' | 'enterprise' | null
  targetMarket: 'local' | 'national' | 'global' | null
  salesModel: 'direct' | 'lead-gen' | 'both' | null
  avgOrderValue: number | null
  // Infrastructure
  skippedInfrastructure: boolean
  businessManager: boolean | null
  businessInfoConnected: boolean | null
  pixelInstalled: boolean | null
  pixelFiring: boolean | null
  hasLandingPage: boolean | null
  conversionsPerWeek: number | null
  optimizingFor: string | null
  monthlyBudget: number | null
  campaignCount: number | null
  audienceOverlap: boolean | null
  scores: {
    infrastructure: number
    pixel: number
    optimization: number
    overall: number
  }
  issues: Issue[]
  recommendations: string[]
}

export interface Issue {
  id: string
  title: string
  severity: 'critical' | 'warning' | 'info'
  impact: string
  quickFix: boolean
  estimatedSavings?: number
}

export interface StepProps {
  assessmentData: AssessmentData
  setAssessmentData: React.Dispatch<React.SetStateAction<AssessmentData>>
  onNext: () => void
  onBack?: () => void
  userName?: string
  websiteUrl?: string
  siteAnalysis?: any
}