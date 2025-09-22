// Facebook Ads Expert Knowledge Base
// This is the domain expertise that the AI consultant will reference

export const FACEBOOK_ADS_KNOWLEDGE = {
  // Core Principles
  principles: {
    pixel: "Without a Facebook Pixel, you're flying blind. You can't track conversions, optimize campaigns, or build retargeting audiences.",
    learning: "Facebook needs 50+ conversions per week to exit 'Learning Limited' and optimize effectively.",
    budget: "Minimum £500/month to get meaningful data. Sweet spot is £2000-5000/month for most small businesses.",
    creative: "Creative fatigue happens every 2-3 weeks. Need fresh ads constantly.",
    audiences: "Broad targeting (1M+) often outperforms narrow targeting in 2024 due to AI improvements.",
    roas: {
      realistic: "2-3x ROAS is GOOD for cold traffic (doubling/tripling your money)",
      excellent: "3-4x ROAS is EXCELLENT for most businesses",
      unrealistic: "Expecting 10x+ ROAS on cold traffic = recipe for disappointment",
      math: "2x ROAS = spend £1000, get £2000 revenue (£1000 profit before other costs)",
      important: "ROAS must account for profit margins. 3x ROAS with 30% margins = barely breaking even"
    }
  },

  // Ad Library Insights
  adLibrary: {
    longevity: "Ads running 90+ days are likely profitable - competitors wouldn't keep paying for losers.",
    patterns: {
      ecommerce: "Look for carousel ads with lifestyle images, not just product shots.",
      leadgen: "Single image ads with clear value props and urgency work best.",
      local: "Video testimonials and before/after content drive local service ads."
    },
    competitive: "If 3+ competitors run similar ads, that format/message is proven to work."
  },

  // Common Problems & Solutions
  problems: {
    noSales: {
      issue: "Ads not generating sales",
      causes: [
        "No pixel or pixel not firing correctly",
        "Optimizing for wrong event (link clicks vs purchases)",
        "Audience too narrow (under 1M people)",
        "Landing page doesn't match ad promise"
      ],
      solutions: [
        "Install and verify pixel with Facebook Pixel Helper",
        "Switch to conversion campaigns optimizing for purchases",
        "Broaden audience to 2M+ people",
        "Ensure ad → landing page message match"
      ]
    },

    tooExpensive: {
      issue: "Cost per result too high",
      causes: [
        "Learning Limited due to low budget",
        "Too many ad sets competing (audience overlap)",
        "Poor quality score from low CTR",
        "Targeting too competitive audience"
      ],
      solutions: [
        "Consolidate budget into fewer ad sets",
        "Improve ad creative to boost CTR above 1%",
        "Test broader, less competitive audiences",
        "Use Campaign Budget Optimization (CBO)"
      ]
    },

    learningLimited: {
      issue: "Stuck in Learning Limited",
      cause: "Less than 50 conversions per week (usually optimizing for Purchase)",
      impact: "Facebook's AI can't optimize = Unstable costs, poor performance, wasted budget",
      theMath: {
        example1: "£100 product, need 50 sales/week = £5,000 revenue needed",
        withROAS: "At 2.5x ROAS (good), need £2,000/week ad spend = £8,000/month",
        reality: "Most spending £500-2000/month = 6-25 sales/week = STUCK",
        solution: "Either increase budget OR optimize for easier conversions"
      },
      smartSolutions: [
        "BEST: Optimize for micro-conversions (Start Assessment, Book Call, Add to Cart)",
        "Example: This tool! Easy to get 50 people to START assessment vs 50 purchases",
        "Lead magnets: Free audit, calculator, assessment = 50+ conversions easily",
        "Once pixel learns from micro-conversions, THEN optimize for purchase"
      ],
      progressionStrategy: [
        "Week 1-2: Optimize for PageView (super easy, builds pixel data)",
        "Week 3-4: Optimize for ViewContent or Start Assessment",
        "Week 5-6: Optimize for Lead or InitiateCheckout",
        "Week 7+: Finally optimize for Purchase (pixel now has data!)"
      ],
      howKerryHelps: {
        strategy: "Double your conversions from FRESH LEADS (not cold calling)",
        important: "Kerry ONLY calls fresh, hot leads from your current ads - NO cold data!",
        approach: [
          "Instant response: Kerry's team calls NEW leads within 5-15 minutes",
          "While they're hot: Catch them when interest is PEAK",
          "Professional conversion: 15-20% close rate on FRESH leads",
          "No old data: Never calls week-old or cold leads"
        ],
        math: "100 FRESH leads/week at 5% = 5 conversions (STUCK). Same 100 FRESH leads at 15% = 15 conversions (OPTIMIZING)",
        result: "Same ad spend, 3X conversions from your CURRENT campaigns",
        proof: "Kerry's clients average 15-20% conversion on HOT leads (not cold)"
      }
    }
  },

  // Industry Benchmarks (2024)
  benchmarks: {
    ecommerce: {
      cpm: "£10-30",
      ctr: "1-2%",
      cpc: "£0.50-2.00",
      conversionRate: "2-3%",
      roas: "3-4x"
    },
    leadGen: {
      cpm: "£15-40",
      ctr: "0.8-1.5%",
      cpl: "£10-50",
      conversionRate: "5-10%"
    },
    local: {
      cpm: "£5-15",
      ctr: "1.5-3%",
      costPerCall: "£5-20"
    }
  },

  // Platform-Specific Tips
  platforms: {
    shopify: {
      tip: "Use Shopify's Facebook channel for easy pixel setup",
      conversion: "Standard 'Purchase' event works well",
      catalog: "Set up dynamic product ads for retargeting"
    },
    wordpress: {
      tip: "Use PixelYourSite plugin for easy implementation",
      warning: "WooCommerce needs specific integration"
    },
    clickfunnels: {
      tip: "Built-in Facebook pixel integration",
      warning: "Track both opt-in and purchase events"
    },
    wix: {
      warning: "Wix's Facebook Pixel integration is buggy - verify with Pixel Helper",
      tip: "Consider Google Tag Manager as backup"
    }
  },

  // Budget Recommendations
  budgetGuidance: {
    starting: "Start with £30-50/day minimum to get data quickly",
    scaling: "Increase budget 20% every 3 days if ROAS is positive",
    testing: "Allocate 20% of budget to testing new audiences/creative"
  },

  // Red Flags
  redFlags: [
    "No pixel installed but running ads",
    "Only boosting posts (not using Ads Manager)",
    "Running 10+ ad sets with small budget",
    "No landing page (sending to homepage)",
    "No email capture before purchase"
  ],

  // Quick Wins
  quickWins: [
    "Install Facebook Pixel (immediate improvement)",
    "Switch from traffic to conversion campaigns",
    "Add video testimonials to ads",
    "Create lookalike audience from customer list",
    "Set up abandoned cart retargeting"
  ],

  // Mark's Complete Service Pricing (from firstaidforads.com/pricing-page-2025)
  marksPricing: {
    triage: {
      name: "30-Minute Diagnostic Call",
      price: "FREE",
      includes: ["Live hidden issue diagnosis", "Personalized repair roadmap"],
      calendarId: "KZHMIuJOgaZqAvId0qrv"
    },
    platformOnly: {
      name: "Platform Only (CRM/Automation)",
      price: "£95/month",
      includes: ["Business phone + SMS system", "CRM + pipeline management", "Booking calendars", "Email marketing", "Landing pages builder", "WhatsApp integration"]
    },
    campaignRecovery: {
      name: "Campaign Recovery",
      price: "£295 one-time + £95/month platform",
      for: "Broken campaigns that need fixing",
      includes: ["Business Manager organization", "Pixel and tracking repair", "Campaign optimization", "7-day monitoring"],
      bestFor: "Existing campaigns underperforming"
    },
    completeRebuild: {
      name: "Complete Rebuild",
      price: "£495 one-time + £95/month platform",
      for: "Starting fresh or total overhaul needed",
      includes: ["Fresh Business Manager setup", "Pixel configuration from scratch", "AI-optimized audiences", "Advantage+ campaign structure", "Landing page included", "14-day optimization support"],
      bestFor: "No pixel, messy account, or starting over"
    },
    profitEngine: {
      name: "Profit Engine (Full Funnel)",
      price: "£995 one-time + £95/month platform",
      for: "Complete sales funnel implementation",
      includes: ["90-minute strategy consultation", "Complete funnel build", "Lead magnet setup", "Custom landing page", "30-day optimization support", "Advanced platform customization"],
      bestFor: "Businesses ready to scale seriously"
    }
  },

  // Landing Page Service (Standalone option)
  landingPageService: {
    proven: "£295 - Adapt one of our proven high-converting templates",
    custom: "£495 - Build from scratch tailored to your business",
    value: "Worth £1500+ when done by agencies",
    guarantee: "High-converting design or your money back",
    stats: "Our landing pages average 8-12% conversion rates",
    bonus: "Includes professional targeting audit to find your perfect audience",
    note: "Landing pages also included in Complete Rebuild and Profit Engine packages"
  },

  // Kerry's Appointment Setting Service
  appointmentSetting: {
    whatKerryDoes: "Calls YOUR FRESH LEADS from current Facebook campaigns",
    whatKerryDoesNOT: "Does NOT call cold lists, old data, or purchased leads",
    trial: "7-DAY RISK-FREE TRIAL - Don't pay until day 7",
    qualification: "Must be spending £500+/month on ads AND generating fresh leads",
    conversionRate: "15-20% of FRESH leads become appointments (vs 2-5% industry average)",
    responseTime: "5-15 minutes for NEW leads, 8am-8pm, 7 days a week",
    followUp: "Multiple touches while lead is still warm (first 48 hours critical)",
    results: "Average client gets 8-12 appointments per month from CURRENT campaigns",
    value: "Double your conversions from existing traffic or it's FREE"
  }
}

export const CONVERSATION_STARTERS = {
  noPixel: "I noticed you don't have a Facebook Pixel installed. This means you're essentially advertising blind - Facebook has no idea who's buying from you, so it can't optimize your campaigns. This single fix could double your ROI. Have you tried installing it before?",

  hasPixel: "Good news - your Facebook Pixel is installed! Let's talk about your current results. What's your biggest frustration with Facebook Ads right now?",

  notSpending: "I see you're not currently running Facebook Ads. What's held you back - bad past experience, too complicated, or just haven't gotten around to it?",

  lowSpend: "With your current budget under £500/month, you're likely stuck in 'Learning Limited' mode where Facebook can't optimize properly. Have you noticed your results are inconsistent?",

  goodSpend: "Your budget range is actually ideal for Facebook Ads. Most businesses see their best ROI in the £500-5000/month range. How are your current results?",

  competitor: "Interesting that you're checking out your competitor's site! Smart move - competitive intelligence is crucial. Are you trying to understand their strategy or looking to outperform them?",

  agency: "Since you're checking a client's site, you must be managing their ads. What's the biggest challenge you're facing with their account?"
}

export const OBJECTION_HANDLERS = {
  tooExpensive: "I understand cost is a concern. Here's the thing - without proper tracking (like the Pixel), you might already be wasting money without knowing it. The average business wastes 40% of their ad spend on poor targeting. Would you rather waste £500/month or invest it properly?",

  noTime: "That's exactly why most businesses fail at Facebook Ads - it does take time to do right. The question is: would you rather spend 10 hours learning it yourself, or have an expert set it up correctly in 2 hours?",

  triedBefore: "I hear this a lot. Usually when Facebook Ads 'don't work', it's one of three things: no pixel tracking, wrong campaign objective, or targeting too narrow. Which of these sounds familiar?",

  dontNeedIt: "That's fair - not every business needs Facebook Ads. Out of curiosity, how are you currently getting new customers? And is that scalable?",

  tooComplicated: "You're absolutely right - Facebook Ads Manager looks like a airplane cockpit. But here's the secret: 80% of those features don't matter. You only need to know about 5 key settings to run profitable ads."
}