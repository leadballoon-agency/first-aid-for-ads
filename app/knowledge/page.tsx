'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

// Knowledge Base Categories and Articles
const knowledgeBase = {
  'slo-strategy': {
    title: 'S.L.O. Strategy',
    icon: '🎯',
    description: 'The proven Seasoning, Laddering & Optimizing framework',
    articles: [
      {
        id: 'slo-framework-overview',
        title: 'The S.L.O. Framework: Your Path to Profitable Ads',
        readTime: '10 min',
        tags: ['Strategy', 'Framework', 'Essential'],
        content: `
          <h2>The S.L.O. Strategy Framework</h2>
          <p>S.L.O. stands for <strong>Seasoning, Laddering, and Optimizing</strong> - a proven three-phase approach that transforms struggling campaigns into profit machines.</p>
          
          <div class="strategy-box">
            <h3>Phase 1: Seasoning (Weeks 1-2)</h3>
            <p>Your pixel is like a new chef - it needs to taste many dishes before it knows what's good.</p>
            <ul>
              <li>🔥 <strong>Warm up your pixel</strong> with easy conversions</li>
              <li>📊 <strong>Feed it data</strong> - aim for 50+ events per week</li>
              <li>🎯 <strong>Start broad</strong> - let the algorithm learn</li>
            </ul>
          </div>

          <div class="strategy-box">
            <h3>Phase 2: Laddering (Weeks 3-4)</h3>
            <p>Build a conversion ladder - each step brings users closer to the ultimate goal.</p>
            <ul>
              <li>📈 <strong>View Content</strong> → 500+ events/week</li>
              <li>🛒 <strong>Add to Cart</strong> → 200+ events/week</li>
              <li>💳 <strong>Initiate Checkout</strong> → 100+ events/week</li>
              <li>✅ <strong>Purchase</strong> → 50+ events/week</li>
            </ul>
          </div>

          <div class="strategy-box">
            <h3>Phase 3: Optimizing (Week 5+)</h3>
            <p>Now your pixel is seasoned and your ladder is built - time to scale.</p>
            <ul>
              <li>🚀 <strong>Switch to purchase optimization</strong></li>
              <li>💰 <strong>Increase budgets gradually</strong> (20% every 3 days)</li>
              <li>🎨 <strong>Test new creatives</strong> with confidence</li>
            </ul>
          </div>

          <h3>Why S.L.O. Works</h3>
          <ol>
            <li><strong>Exits Learning Phase Fast:</strong> 50 conversions in 7 days guaranteed</li>
            <li><strong>Reduces CPM:</strong> Facebook rewards accounts with good data</li>
            <li><strong>Improves Targeting:</strong> More data = better audience matching</li>
            <li><strong>Scales Predictably:</strong> Strong foundation enables growth</li>
          </ol>

          <div class="tip">
            💡 <strong>Pro Tip:</strong> Use our assessment tool as a conversion event! Drive traffic to it, track completions, and season your pixel with high-quality, high-intent data.
          </div>
        `,
        relatedArticles: ['pixel-seasoning-strategy', 'learning-phase-mastery']
      },
      {
        id: 'slo-implementation-guide',
        title: 'Step-by-Step S.L.O. Implementation',
        readTime: '15 min',
        tags: ['Implementation', 'Technical', 'Guide'],
        content: `
          <h2>Implementing S.L.O. - The Complete Guide</h2>
          
          <h3>Week 1-2: Seasoning Phase</h3>
          
          <h4>Step 1: Install Conversion Events</h4>
          <code>
          // Add these events to your pixel
          fbq('track', 'ViewContent');
          fbq('track', 'AddToCart');
          fbq('track', 'InitiateCheckout');
          fbq('track', 'Purchase', {value: 0.00, currency: 'GBP'});
          </code>

          <h4>Step 2: Create Micro-Conversion Campaign</h4>
          <ul>
            <li>Budget: £50-100/day</li>
            <li>Objective: Conversions</li>
            <li>Optimization: View Content (first week)</li>
            <li>Audience: Broad (3-5% lookalike or interest-based)</li>
          </ul>

          <h4>Step 3: Track & Monitor</h4>
          <p>You need 50+ View Content events in the first 7 days. If not hitting this, increase budget or broaden audience.</p>

          <h3>Week 3-4: Laddering Phase</h3>
          
          <h4>Step 4: Move Up the Ladder</h4>
          <div class="ladder-progression">
            <p><strong>Week 3:</strong> Switch optimization to Add to Cart</p>
            <p><strong>Week 4:</strong> Switch optimization to Initiate Checkout</p>
          </div>

          <h4>Step 5: Adjust Budgets</h4>
          <p>As you move up the ladder, costs increase. Budget formula:</p>
          <code>
          Required Budget = (Target Conversions × Cost per Conversion) / 7 days
          Example: 50 conversions × £20 CPA = £1,000/week = £143/day
          </code>

          <h3>Week 5+: Optimizing Phase</h3>
          
          <h4>Step 6: Switch to Purchase Optimization</h4>
          <p>Only when you're getting 50+ purchases per week. If not, stay on Initiate Checkout longer.</p>

          <h4>Step 7: Scale Strategically</h4>
          <ul>
            <li>Increase budget 20% every 3 days if CPA is stable</li>
            <li>Duplicate winning ad sets (don't edit originals)</li>
            <li>Test new audiences with 10-20% of budget</li>
          </ul>

          <div class="warning">
            ⚠️ <strong>Common Mistakes:</strong>
            <ul>
              <li>Jumping to Purchase optimization too early</li>
              <li>Increasing budgets too quickly (kills performance)</li>
              <li>Not giving each phase enough time</li>
              <li>Changing too many variables at once</li>
            </ul>
          </div>
        `,
        relatedArticles: ['slo-framework-overview', 'conversion-tracking-setup']
      },
      {
        id: 'slo-calculator-tool',
        title: '🎯 Interactive S.L.O. Calculator',
        readTime: '2 min',
        tags: ['Tool', 'Calculator', 'Interactive'],
        content: `
          <h2>Your Personal S.L.O. Budget Calculator</h2>
          <p>Stop guessing your budget needs! Our interactive Google Sheets calculator shows you exactly:</p>
          
          <ul>
            <li>✅ How much budget you need for each phase</li>
            <li>✅ When to switch optimization events</li>
            <li>✅ Expected conversion volumes</li>
            <li>✅ ROI projections at each stage</li>
            <li>✅ Scaling timeline and milestones</li>
          </ul>

          <div class="tip">
            🎯 <strong>Features:</strong>
            <ul>
              <li>Real-time calculations as you edit</li>
              <li>Customizable to your business metrics</li>
              <li>Video tutorial included</li>
              <li>Make your own copy to keep forever</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="/slo-calculator" class="btn-primary" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #00FF88, #00FFAA); color: #1a1a2e; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Open S.L.O. Calculator →
            </a>
          </div>

          <p><strong>How it works:</strong> Enter your current metrics (AOV, conversion rate, budget) and the calculator instantly shows your optimal S.L.O. timeline, budget requirements, and expected results for each phase.</p>
        `,
        relatedArticles: ['slo-framework-overview', 'slo-implementation-guide']
      }
    ]
  },
  'getting-started': {
    title: 'Getting Started',
    icon: '🚀',
    description: 'Foundation concepts for Facebook Ads success',
    articles: [
      {
        id: 'why-offer-first',
        title: 'Why Your Offer Must Come Before Everything Else',
        readTime: '8 min',
        tags: ['Strategy', 'Fundamentals'],
        content: `
          <h2>The Brutal Truth About Marketing</h2>
          <p>A great offer can save bad marketing, but great marketing cannot save a bad offer. This is the most important lesson in advertising that 90% of businesses ignore.</p>
          
          <h3>The Offer Hierarchy</h3>
          <ol>
            <li><strong>Market Fit</strong>: Does anyone actually want this?</li>
            <li><strong>Value Proposition</strong>: Is it worth more than you're charging?</li>
            <li><strong>Risk Reversal</strong>: Can you remove their fear of buying?</li>
            <li><strong>Urgency/Scarcity</strong>: Why should they buy now?</li>
          </ol>
          
          <div class="tip">
            💡 <strong>Pro Tip:</strong> Before spending £1 on ads, get 10 people to say "yes" to your offer organically. If you can't, your ads won't work either.
          </div>
          
          <h3>The £100 Offer Test</h3>
          <p>Take £100 and try to get 10 people interested in your offer. If you can't convert at least 3 of them, don't scale - iterate on your offer first.</p>
          
          <h3>Why SEO Comes Last</h3>
          <p>SEO is a 6-12 month game. If your offer doesn't convert paid traffic (immediate feedback), it won't convert organic traffic either. Test with ads first, optimize for SEO later.</p>
        `,
        relatedArticles: ['pixel-seasoning-strategy', 'learning-phase-mastery']
      },
      {
        id: 'pixel-seasoning-strategy',
        title: 'The Art of Pixel Seasoning: From Cold to Hot',
        readTime: '12 min',
        tags: ['Pixel', 'Technical', 'Strategy'],
        content: `
          <h2>What Is Pixel Seasoning?</h2>
          <p>A "cold" pixel is like a new employee - it needs training before it can perform. Facebook's algorithm requires data to optimize, and that data comes from conversions.</p>
          
          <h3>The 50 Conversion Rule</h3>
          <p>Facebook needs <strong>50 conversions per week</strong> to properly exit the learning phase. But here's the secret: those don't have to be purchases!</p>
          
          <h3>The Progressive Optimization Ladder</h3>
          <div class="strategy-box">
            <h4>Week 1-2: Traffic Events</h4>
            <ul>
              <li>Optimize for: Landing Page Views</li>
              <li>Goal: 200+ events/week</li>
              <li>Purpose: Teach pixel who engages</li>
            </ul>
            
            <h4>Week 3-4: Micro-Conversions</h4>
            <ul>
              <li>Optimize for: Quiz Starts, Video Views</li>
              <li>Goal: 100+ events/week</li>
              <li>Purpose: Identify high-intent users</li>
            </ul>
            
            <h4>Week 5-6: Standard Events</h4>
            <ul>
              <li>Optimize for: Leads, Add to Cart</li>
              <li>Goal: 50+ events/week</li>
              <li>Purpose: Exit learning phase properly</li>
            </ul>
            
            <h4>Week 7+: Purchase Events</h4>
            <ul>
              <li>Optimize for: Purchases</li>
              <li>Now your pixel is seasoned!</li>
              <li>Performance will be 2-3x better</li>
            </ul>
          </div>
          
          <h3>Using Assessment Tools for Seasoning</h3>
          <p>Our assessment tool isn't just diagnostic - it's a pixel seasoning weapon. Drive traffic to the assessment, track completions as conversions, and season your pixel with high-intent events!</p>
        `,
        relatedArticles: ['learning-phase-mastery', 'conversion-tracking-setup']
      },
      {
        id: 'business-manager-setup',
        title: 'Business Manager Setup: The Right Way',
        readTime: '15 min',
        tags: ['Setup', 'Technical', 'Infrastructure'],
        content: `
          <h2>The Foundation Nobody Talks About</h2>
          <p>9 out of 10 Facebook Ad accounts are set up incorrectly. This guide will ensure you're in the successful 10%.</p>
          
          <h3>Critical Setup Steps</h3>
          
          <h4>1. Business Manager Creation</h4>
          <ul>
            <li>Use business.facebook.com (NOT ads manager)</li>
            <li>Verify your business immediately</li>
            <li>Add 2FA for security</li>
          </ul>
          
          <h4>2. Business Info Connection</h4>
          <div class="warning">
            ⚠️ <strong>Critical:</strong> If your Business Info isn't connected to your Facebook Page, you're missing 40% of features and paying 20-30% more for ads.
          </div>
          
          <h4>3. Asset Organization</h4>
          <ul>
            <li>Ad Account: Under Business Manager (not personal)</li>
            <li>Pixel: Owned by Business Manager</li>
            <li>Domain: Verified in Business Manager</li>
            <li>Facebook Page: Connected with full admin rights</li>
          </ul>
          
          <h3>Common Disasters We Fix</h3>
          <ol>
            <li><strong>Personal ad accounts</strong>: No backup, no support, no sharing</li>
            <li><strong>Agency owns everything</strong>: You're held hostage</li>
            <li><strong>Multiple pixels fighting</strong>: Data confusion, poor optimization</li>
            <li><strong>No Conversions API</strong>: Lost 30% of data post-iOS 14.5</li>
          </ol>
        `,
        relatedArticles: ['pixel-seasoning-strategy', 'ios-14-solutions']
      }
    ]
  },
  'optimization': {
    title: 'Campaign Optimization',
    icon: '⚡',
    description: 'Advanced strategies for improving performance',
    articles: [
      {
        id: 'learning-phase-mastery',
        title: 'Mastering the Learning Phase',
        readTime: '10 min',
        tags: ['Optimization', 'Strategy'],
        content: `
          <h2>The Learning Phase: Where Campaigns Go to Die</h2>
          <p>The learning phase is Facebook's training period. Most advertisers sabotage it without knowing.</p>
          
          <h3>The Golden Rules</h3>
          <ol>
            <li><strong>Don't touch for 3 days</strong>: Let it learn</li>
            <li><strong>Budget changes over 20% reset learning</strong>: Plan ahead</li>
            <li><strong>Audience edits reset learning</strong>: Get it right first time</li>
            <li><strong>Creative swaps reset learning</strong>: Test in separate campaigns</li>
          </ol>
          
          <h3>How to Exit Learning Fast</h3>
          <div class="strategy-box">
            <h4>Option 1: Increase Budget</h4>
            <p>Need 50 conversions in 7 days. If getting 5/day, need 10/day. Double budget temporarily.</p>
            
            <h4>Option 2: Optimize for Higher-Funnel Event</h4>
            <p>Can't get 50 purchases? Optimize for Add to Cart first, then graduate to Purchase.</p>
            
            <h4>Option 3: Consolidate Campaigns</h4>
            <p>Running 5 campaigns with 10 conversions each? Consolidate to 1 campaign with 50.</p>
          </div>
        `,
        relatedArticles: ['pixel-seasoning-strategy', 'audience-overlap-fix']
      },
      {
        id: 'audience-overlap-fix',
        title: 'Fixing Audience Overlap: Stop Your Campaigns Fighting',
        readTime: '8 min',
        tags: ['Optimization', 'Troubleshooting'],
        content: `
          <h2>Your Campaigns Are Boxing Each Other</h2>
          <p>When audiences overlap by more than 20%, you're bidding against yourself. CPMs increase 30-50%.</p>
          
          <h3>How to Check for Overlap</h3>
          <ol>
            <li>Go to Audiences in Business Manager</li>
            <li>Select 2+ audiences</li>
            <li>Click "Show Audience Overlap"</li>
            <li>Anything over 20% is a problem</li>
          </ol>
          
          <h3>The Consolidation Strategy</h3>
          <p>Instead of 10 ad sets targeting similar audiences, use 1 ad set with broader targeting and let Facebook optimize.</p>
          
          <div class="tip">
            💡 <strong>2024 Reality:</strong> Broad targeting + good creative beats narrow targeting + average creative every time.
          </div>
        `,
        relatedArticles: ['learning-phase-mastery', 'creative-testing-framework']
      }
    ]
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    icon: '🔧',
    description: 'Solutions to common Facebook Ads problems',
    articles: [
      {
        id: 'ios-14-solutions',
        title: 'iOS 14.5+ Attribution: Working Around Apple\'s Changes',
        readTime: '12 min',
        tags: ['Technical', 'iOS', 'Tracking'],
        content: `
          <h2>The iOS Apocalypse (And How We Survived)</h2>
          <p>Apple killed 50% of tracking. Here\'s how to get it back.</p>
          
          <h3>What We Lost</h3>
          <ul>
            <li>28-day attribution → 7-day only</li>
            <li>Real-time data → 3-day delay</li>
            <li>User-level data → Aggregated only</li>
            <li>Retargeting pools → Shrunk by 70%</li>
          </ul>
          
          <h3>The Recovery Strategy</h3>
          
          <h4>1. Conversions API (Required)</h4>
          <p>Server-side tracking bypasses iOS restrictions. Recovers 30-40% of lost data.</p>
          
          <h4>2. First-Party Data Collection</h4>
          <ul>
            <li>Email capture early and often</li>
            <li>Phone numbers for offline events</li>
            <li>Customer lists for lookalikes</li>
          </ul>
          
          <h4>3. Shorter Conversion Windows</h4>
          <p>Design funnels that convert in 1-3 days, not 7-14 days. Speed is everything post-iOS 14.5.</p>
        `,
        relatedArticles: ['conversion-tracking-setup', 'pixel-seasoning-strategy']
      },
      {
        id: 'learning-limited-fix',
        title: 'Stuck in Learning Limited? Here\'s Your Escape Plan',
        readTime: '10 min',
        tags: ['Troubleshooting', 'Optimization'],
        content: `
          <h2>The Learning Limited Death Spiral</h2>
          <p>Your campaign says "Learning Limited" and performance sucks. Here\'s why and how to fix it.</p>
          
          <h3>Why You're Stuck</h3>
          <ul>
            <li>Less than 50 conversions per week</li>
            <li>Budget too low for optimization goal</li>
            <li>Audience too narrow</li>
            <li>Optimization event too rare</li>
          </ul>
          
          <h3>The Escape Plan</h3>
          
          <div class="strategy-box">
            <h4>Step 1: Calculate Required Budget</h4>
            <p>Need 50 conversions. If conversion costs £20, need £1,000/week minimum.</p>
            
            <h4>Step 2: Choose Right Optimization</h4>
            <p>Can't afford 50 purchases? Optimize for Initiate Checkout (cheaper) first.</p>
            
            <h4>Step 3: Implement Conversion Ladder</h4>
            <ol>
              <li>Week 1-2: Optimize for Add to Cart</li>
              <li>Week 3-4: Optimize for Initiate Checkout</li>
              <li>Week 5+: Optimize for Purchase</li>
            </ol>
          </div>
        `,
        relatedArticles: ['learning-phase-mastery', 'pixel-seasoning-strategy']
      }
    ]
  },
  'case-studies': {
    title: 'Case Studies',
    icon: '📊',
    description: 'Real campaign transformations and results',
    articles: [
      {
        id: 'aesthetic-clinic-turnaround',
        title: 'Aesthetic Clinic: From £150 CAC to £45 in 14 Days',
        readTime: '8 min',
        tags: ['Case Study', 'Healthcare', 'Success Story'],
        content: `
          <h2>The Situation</h2>
          <p>Liverpool aesthetic clinic burning £3,000/month with 20 leads. Cost per acquisition: £150. They were 2 weeks from stopping ads completely.</p>
          
          <h3>What We Found</h3>
          <ul>
            <li>🔴 3 different pixels installed (fighting each other)</li>
            <li>🔴 Optimizing for Purchase with 3 conversions/week</li>
            <li>🔴 15 campaigns with 80% audience overlap</li>
            <li>🔴 No Conversions API (losing iOS data)</li>
          </ul>
          
          <h3>The Fix (14 Days)</h3>
          
          <h4>Day 1-3: Infrastructure</h4>
          <ul>
            <li>Removed duplicate pixels</li>
            <li>Installed Conversions API</li>
            <li>Connected Business Info to Page</li>
          </ul>
          
          <h4>Day 4-7: Consolidation</h4>
          <ul>
            <li>15 campaigns → 2 campaigns</li>
            <li>Eliminated audience overlap</li>
            <li>Switched to broad targeting</li>
          </ul>
          
          <h4>Day 8-14: Optimization Ladder</h4>
          <ul>
            <li>Created skin assessment quiz</li>
            <li>Optimized for quiz completions first</li>
            <li>Got 150+ events in first week</li>
            <li>Then optimized for bookings</li>
          </ul>
          
          <h3>Results</h3>
          <div class="results-box">
            <p>✅ Cost per lead: £150 → £45 (-70%)</p>
            <p>✅ Monthly leads: 20 → 67 (+235%)</p>
            <p>✅ Ad spend: £3,000 (same budget)</p>
            <p>✅ ROI: Negative → 320% positive</p>
          </div>
        `,
        relatedArticles: ['learning-limited-fix', 'pixel-seasoning-strategy']
      }
    ]
  }
}

// Search function
const searchArticles = (query: string) => {
  const results: any[] = []
  Object.values(knowledgeBase).forEach(category => {
    category.articles.forEach(article => {
      if (
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        article.content.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push({ ...article, category: category.title })
      }
    })
  })
  return results
}

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('getting-started')
  const [activeArticle, setActiveArticle] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [bookmarked, setBookmarked] = useState<string[]>([])
  const [readArticles, setReadArticles] = useState<string[]>([])

  // Load bookmarks and read articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kb-bookmarks')
    if (saved) setBookmarked(JSON.parse(saved))
    
    const read = localStorage.getItem('kb-read')
    if (read) setReadArticles(JSON.parse(read))
  }, [])

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 2) {
      setSearchResults(searchArticles(searchQuery))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Toggle bookmark
  const toggleBookmark = (articleId: string) => {
    const updated = bookmarked.includes(articleId)
      ? bookmarked.filter(id => id !== articleId)
      : [...bookmarked, articleId]
    
    setBookmarked(updated)
    localStorage.setItem('kb-bookmarks', JSON.stringify(updated))
    
    toast.success(
      bookmarked.includes(articleId) ? 'Removed from bookmarks' : 'Added to bookmarks'
    )
  }

  // Mark as read
  const markAsRead = (articleId: string) => {
    if (!readArticles.includes(articleId)) {
      const updated = [...readArticles, articleId]
      setReadArticles(updated)
      localStorage.setItem('kb-read', JSON.stringify(updated))
    }
  }

  // Open article
  const openArticle = (article: any) => {
    setActiveArticle(article)
    markAsRead(article.id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
      {/* Navigation */}
      <Navigation />
      
      {/* Header - adjusted for sticky nav that appears on scroll */}
      <header className="border-b border-accent/20 backdrop-blur-xl bg-dark-400/50 pt-20 pb-4">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-400 hover:text-accent transition">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-accent">Knowledge Base</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-playfair">Knowledge Base</h1>
              <p className="text-sm text-gray-400">Facebook Ads strategies, guides, and troubleshooting</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md flex-1 mx-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-dark-400/50 border border-gray-600 rounded-lg focus:border-accent focus:outline-none pl-10"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 w-full bg-dark-100 border border-accent/30 rounded-lg shadow-xl max-h-96 overflow-y-auto"
                >
                  {searchResults.map(result => (
                    <button
                      key={result.id}
                      onClick={() => {
                        openArticle(result)
                        setSearchQuery('')
                        setSearchResults([])
                      }}
                      className="w-full text-left p-4 hover:bg-white/5 transition border-b border-gray-800 last:border-0"
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {result.category} • {result.readTime}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-sm text-gray-400 hover:text-accent transition">
                📚 {readArticles.length} read
              </button>
              <button className="text-sm text-gray-400 hover:text-accent transition">
                ⭐ {bookmarked.length} saved
              </button>
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
                {Object.entries(knowledgeBase).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCategory(key)
                      setActiveArticle(null)
                    }}
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
                        <p className="text-xs text-gray-400">{category.articles.length} articles</p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-semibold mb-3 text-gray-400">Your Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Articles Read</span>
                    <span className="font-bold gradient-text">
                      {readArticles.length}/{Object.values(knowledgeBase).reduce((sum, cat) => sum + cat.articles.length, 0)}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-accent-light transition-all"
                      style={{ 
                        width: `${(readArticles.length / Object.values(knowledgeBase).reduce((sum, cat) => sum + cat.articles.length, 0)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {!activeArticle ? (
              <div className="space-y-6">
                {/* Category Header */}
                <div className="glass-card p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{knowledgeBase[activeCategory as keyof typeof knowledgeBase].icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold font-playfair">
                        {knowledgeBase[activeCategory as keyof typeof knowledgeBase].title}
                      </h2>
                      <p className="text-gray-400">
                        {knowledgeBase[activeCategory as keyof typeof knowledgeBase].description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Articles Grid */}
                <div className="grid gap-4">
                  {knowledgeBase[activeCategory as keyof typeof knowledgeBase].articles.map((article) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-6 cursor-pointer hover:border-accent/40 transition-all"
                      onClick={() => openArticle(article)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {readArticles.includes(article.id) && (
                              <span className="text-green-400 text-sm">✓</span>
                            )}
                            <h3 className="text-xl font-semibold">{article.title}</h3>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                            <span>📖 {article.readTime}</span>
                            <div className="flex gap-2">
                              {article.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-400 line-clamp-2">
                            {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(article.id)
                          }}
                          className="ml-4 text-2xl hover:scale-110 transition"
                        >
                          {bookmarked.includes(article.id) ? '⭐' : '☆'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Article View
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-8"
              >
                <button
                  onClick={() => setActiveArticle(null)}
                  className="mb-4 text-accent hover:text-accent-light transition"
                >
                  ← Back to {knowledgeBase[activeCategory as keyof typeof knowledgeBase].title}
                </button>
                
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold font-playfair mb-2">{activeArticle.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>📖 {activeArticle.readTime}</span>
                      <div className="flex gap-2">
                        {activeArticle.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-white/5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toggleBookmark(activeArticle.id)}
                    className="text-3xl hover:scale-110 transition"
                  >
                    {bookmarked.includes(activeArticle.id) ? '⭐' : '☆'}
                  </button>
                </div>
                
                {/* Article Content */}
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: activeArticle.content }}
                  style={{
                    '--tw-prose-body': 'rgb(229, 231, 235)',
                    '--tw-prose-headings': 'rgb(255, 255, 255)',
                    '--tw-prose-links': '#00ff88',
                    '--tw-prose-bold': 'rgb(255, 255, 255)',
                    '--tw-prose-code': '#00ff88',
                  } as any}
                />
                
                {/* Related Articles */}
                {activeArticle.relatedArticles && activeArticle.relatedArticles.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
                    <div className="grid gap-3">
                      {activeArticle.relatedArticles.map((relatedId: string) => {
                        const related = Object.values(knowledgeBase)
                          .flatMap(cat => cat.articles)
                          .find(a => a.id === relatedId)
                        
                        if (!related) return null
                        
                        return (
                          <button
                            key={relatedId}
                            onClick={() => openArticle(related)}
                            className="text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition"
                          >
                            <div className="font-medium">{related.title}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {related.readTime} • {related.tags.join(', ')}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      <style jsx global>{`
        .prose h2 {
          color: white;
          font-size: 1.8rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          color: #00ff88;
          font-size: 1.4rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .prose h4 {
          color: white;
          font-size: 1.2rem;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .prose ul, .prose ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: white;
          font-weight: 600;
        }
        .tip {
          background: rgba(0, 255, 136, 0.1);
          border-left: 4px solid #00ff88;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
        }
        .warning {
          background: rgba(255, 153, 68, 0.1);
          border-left: 4px solid #ff9944;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
        }
        .strategy-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 136, 0.3);
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
        }
        .results-box {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 255, 136, 0.05));
          border: 2px solid #00ff88;
          padding: 1.5rem;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
        }
      `}</style>
    </div>
  )
}