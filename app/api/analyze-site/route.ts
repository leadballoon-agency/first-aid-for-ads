import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Clean and validate URL
    let cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl
    }

    // Validate URL format and check for common TLD patterns
    let domain: string
    try {
      const urlObj = new URL(cleanUrl)
      domain = urlObj.hostname

      // Check if domain has a TLD (top-level domain)
      if (!domain.includes('.')) {
        // Common TLDs to try in order of likelihood
        const commonTLDs = ['.com', '.co.uk', '.org', '.net', '.io']

        // Return an informative error for ambiguous domains
        return NextResponse.json({
          error: `Please specify the full domain. Did you mean ${domain}.com or ${domain}.co.uk?`,
          suggestions: commonTLDs.map(tld => `${domain}${tld}`)
        }, { status: 400 })
      }
    } catch (e) {
      return NextResponse.json({
        error: 'Invalid URL format. Please enter a valid domain (e.g., example.com or example.co.uk)'
      }, { status: 400 })
    }
    console.log(`\n🔍 Analyzing website: ${cleanUrl}`)
    console.log(`Domain: ${domain}`)

    // Start timing the entire analysis operation
    const analysisStartTime = Date.now()

    let html = ''
    let enhancedData: any = {}
    let actualLoadTime: number | null = null

    // Try Oxylabs first for better data extraction
    const useOxylabs = process.env.OXYLABS_USERNAME && process.env.OXYLABS_PASSWORD

    if (useOxylabs) {
      try {
        console.log('🔧 Using Oxylabs for enhanced extraction...')
        const oxylabsResponse = await fetch('https://realtime.oxylabs.io/v1/queries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`).toString('base64')
          },
          body: JSON.stringify({
            source: 'universal',
            url: cleanUrl,
            render: 'html',
            javascript: true,
            timeout: 30000,
            parse: true,
            parsing_instructions: {
              emails: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//a[contains(@href,'mailto:')]/@href"]
                  }
                ]
              },
              phones: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//a[contains(@href,'tel:')]/@href"]
                  }
                ]
              },
              platform_signals: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@name='generator']/@content"]
                  }
                ]
              },
              social_links: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//a[contains(@href,'facebook.com') or contains(@href,'instagram.com') or contains(@href,'linkedin.com') or contains(@href,'twitter.com')]/@href"]
                  }
                ]
              },
              business_name: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@property='og:site_name']/@content"]
                  }
                ]
              },
              // SEO Metadata - crucial for understanding the business
              page_title: {
                _fns: [
                  {
                    _fn: "css",
                    _args: ["title"]
                  }
                ]
              },
              meta_description: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@name='description']/@content"]
                  }
                ]
              },
              meta_keywords: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@name='keywords']/@content"]
                  }
                ]
              },
              og_title: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@property='og:title']/@content"]
                  }
                ]
              },
              og_description: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@property='og:description']/@content"]
                  }
                ]
              },
              // Location detection
              html_lang: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//html/@lang"]
                  }
                ]
              },
              og_locale: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@property='og:locale']/@content"]
                  }
                ]
              },
              currency_symbols: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//text()[contains(., '£') or contains(., '€') or contains(., '$') or contains(., '¥') or contains(., '₹')]"]
                  }
                ]
              },
              og_type: {
                _fns: [
                  {
                    _fn: "xpath",
                    _args: ["//meta[@property='og:type']/@content"]
                  }
                ]
              },
              all_text_emails: {
                _fns: [
                  {
                    _fn: "css",
                    _args: ["body"]
                  }
                ]
              }
            }
          }),
          signal: AbortSignal.timeout(35000)
        })

        if (oxylabsResponse.ok) {
          const oxylabsData = await oxylabsResponse.json()
          // Oxylabs returns HTML in the content field
          const oxylabsContent = oxylabsData.results?.[0]?.content
          if (typeof oxylabsContent === 'string') {
            html = oxylabsContent
          } else if (oxylabsContent && typeof oxylabsContent === 'object') {
            // Sometimes Oxylabs returns structured data - extract HTML
            html = oxylabsContent.html || JSON.stringify(oxylabsContent)
          }
          enhancedData = oxylabsData.results?.[0]?.parsed || {}
          console.log('✅ Oxylabs extraction successful')
          console.log('HTML type:', typeof html, 'Length:', html.length)

          // Log what Oxylabs extracted
          if (enhancedData) {
            console.log('📧 Oxylabs Emails:', enhancedData.emails || 'none')
            console.log('📱 Oxylabs Phones:', enhancedData.phones || 'none')
            console.log('🔧 Platform signals:', enhancedData.platform_signals || 'none')
            console.log('🏢 Business name:', enhancedData.business_name || 'none')
            console.log('🔗 Social links:', enhancedData.social_links || 'none')
            console.log('📝 SEO Data:', {
              title: enhancedData.page_title || 'none',
              description: enhancedData.meta_description || 'none',
              keywords: enhancedData.meta_keywords || 'none'
            })
          }
        } else {
          const errorText = await oxylabsResponse.text()
          console.error('Oxylabs response error:', oxylabsResponse.status, errorText.substring(0, 200))
          throw new Error(`Oxylabs request failed with status ${oxylabsResponse.status}`)
        }
      } catch (oxylabsError) {
        console.error('⚠️ Oxylabs failed, falling back to direct fetch:', oxylabsError)
      }
    }

    // Fallback to direct fetch if Oxylabs not configured or failed
    if (!html) {
      const response = await fetch(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(10000)
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status}`)
      }

      html = await response.text()
    }

    // Calculate total analysis time (not actual page load time)
    const analysisTime = ((Date.now() - analysisStartTime) / 1000).toFixed(1)

    // Note: This is the time taken to analyze, not the actual page load speed
    console.log(`⏱️ Analysis completed in ${analysisTime}s`)

    // Extract Open Graph image for thumbnail
    const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1] || ''
    const favicon = html.match(/<link\s+[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i)?.[1] || ''

    // Make relative URLs absolute
    let thumbnail = ogImage
    if (thumbnail && !thumbnail.startsWith('http')) {
      thumbnail = new URL(thumbnail, cleanUrl).href
    } else if (!thumbnail && favicon) {
      thumbnail = favicon.startsWith('http') ? favicon : new URL(favicon, cleanUrl).href
    }

    console.log(`📸 Thumbnail: ${thumbnail || 'Not found'}`)

    // Extract business information first (includes platform detection)
    const businessInfo = extractBusinessInfo(html, domain)
    const platform = businessInfo.platform

    // Check for Facebook Pixel - CRITICAL DETECTION
    console.log('🔍 CRITICAL: Checking for Facebook Pixel...')
    console.log(`Platform: ${platform}`)

    const pixelPatterns = [
      /facebook\.com\/tr/gi,  // Standard Facebook Pixel
      /fbq\(['"]init['"]/gi,   // fbq('init', ...)
      /fbq\(['"]track['"]/gi,  // fbq('track', ...)
      /_fbq/gi,                 // Facebook Pixel variable
      /connect\.facebook\.net.*fbevents\.js/gi, // Facebook Events script
      /fbpixel/gi,             // Common pixel variable names
      /facebook.*pixel/gi,     // Facebook pixel references
      /Meta.*Pixel/gi,         // Meta Pixel (new branding)
    ]

    let pixelFound = false
    let pixelIds: string[] = []
    let multiplePixels = false
    let pixelConfidence = 'none'

    // Check if any pixel pattern exists
    for (const pattern of pixelPatterns) {
      if (pattern.test(html)) {
        pixelFound = true
        console.log(`✅ Pixel pattern found: ${pattern.source}`)
        break
      }
    }

    if (!pixelFound) {
      console.log('❌ NO FACEBOOK PIXEL DETECTED - Critical issue!')
    }
    
    // Extract pixel IDs if found
    if (pixelFound) {
      const pixelIdPattern = /fbq\(['"]init['"],\s*['"](\d{15,16})['"]/gi
      let match
      while ((match = pixelIdPattern.exec(html)) !== null) {
        if (!pixelIds.includes(match[1])) {
          pixelIds.push(match[1])
          console.log(`📊 Found Pixel ID: ${match[1]}`)
        }
      }
      multiplePixels = pixelIds.length > 1

      // Check for Wix placeholder pixel (has code but no real ID)
      if (pixelIds.length === 0 && platform === 'Wix') {
        // Look for signs of Wix's Facebook Pixel integration
        if (/facebook.*pixel|fbevents|meta.*pixel/gi.test(html)) {
          console.log('⚠️ Wix Facebook Pixel integration detected but NO PIXEL ID configured!')
          pixelConfidence = 'wix_unconfigured'
        }
      }
    }
    
    // Check for other tracking/optimization issues
    const issues = []
    
    // Check for Conversions API
    const hasConversionsAPI = /facebook.*conversions.*api/gi.test(html) || 
                             /server.*events/gi.test(html)
    
    // Check for domain verification meta tag
    const hasDomainVerification = /<meta.*name=['"]facebook-domain-verification['"]/gi.test(html)
    
    // Load time already calculated above during fetch
    
    // Extract contact information (enhanced with Oxylabs data if available)
    const contactInfo = extractContactInfo(html, domain, enhancedData)
    
    // Extract CTA (Call-to-Action) - CRITICAL for understanding conversion goals
    const ctaInfo = extractCTAs(html)

    // BusinessInfo already extracted above for platform detection

    // Build response
    let message = ''

    if (!pixelFound) {
      message = 'No Facebook Pixel detected - you\'re losing valuable data!'
      issues.push('no_pixel')
    } else if (pixelConfidence === 'wix_unconfigured') {
      message = '⚠️ Wix has Facebook Pixel integration BUT you haven\'t added your Pixel ID in Wix settings!'
      issues.push('wix_pixel_not_configured')
      pixelFound = false // Override - it's not actually working
    } else if (multiplePixels) {
      message = `Found ${pixelIds.length} different pixels (${pixelIds.join(', ')}) - this can cause tracking conflicts!`
      issues.push('multiple_pixels')
    } else if (pixelIds.length === 1) {
      message = `✅ Pixel detected: ${pixelIds[0]}`

      // Check for additional optimizations
      if (!hasConversionsAPI) {
        issues.push('no_conversions_api')
      }
      if (!hasDomainVerification) {
        issues.push('no_domain_verification')
      }
    } else {
      message = 'Pixel code found but no ID detected - might be improperly configured'
      issues.push('pixel_misconfigured')
    }
    
    const analysis = {
      url: cleanUrl,
      domain,
      thumbnail,
      pixelFound,
      pixelIds,
      multiplePixels,
      issues,
      message,
      analysisTime: analysisTime,  // Time taken to analyze (not page speed)
      hasConversionsAPI,
      hasDomainVerification,
      contactInfo,
      ctaInfo,
      businessInfo,
      // Additional insights
      recommendations: getRecommendations(issues, ctaInfo, pixelFound)
    }
    
    return NextResponse.json(analysis)
    
  } catch (error: any) {
    console.error('Site analysis error:', error)
    
    // Handle specific errors
    if (error.name === 'AbortError') {
      return NextResponse.json({ 
        error: 'Website took too long to respond',
        fallback: true 
      }, { status: 408 })
    }
    
    return NextResponse.json({ 
      error: 'Could not analyze website',
      details: error.message,
      fallback: true 
    }, { status: 500 })
  }
}

function extractCTAs(html: string) {
  const ctaInfo = {
    primaryCTA: '',
    allCTAs: [] as string[],
    conversionType: '',
    urgencyWords: [] as string[],
    hasForm: false,
    hasChat: false,
    hasCalendar: false,
    formTypes: [] as string[]
  }

  // Look for button text and prominent CTAs
  const buttonPatterns = [
    /<button[^>]*>([^<]+)<\/button>/gi,
    /<a[^>]*class="[^"]*btn[^"]*"[^>]*>([^<]+)<\/a>/gi,
    /<a[^>]*href="[^"]*"[^>]*class="[^"]*button[^"]*"[^>]*>([^<]+)<\/a>/gi
  ]

  const foundCTAs = new Set<string>()

  for (const pattern of buttonPatterns) {
    const matches = Array.from(html.matchAll(pattern))
    for (const match of matches) {
      const cta = match[1].trim()
      if (cta.length > 2 && cta.length < 50 && !cta.includes('<')) {
        foundCTAs.add(cta)
      }
    }
  }

  ctaInfo.allCTAs = Array.from(foundCTAs)

  // Detect primary conversion type based on CTAs
  const ctaText = ctaInfo.allCTAs.join(' ').toLowerCase()

  if (/buy now|add to cart|shop now|purchase|checkout/i.test(ctaText)) {
    ctaInfo.conversionType = 'purchase'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /buy|shop|cart/i.test(cta)) || ctaInfo.allCTAs[0]
  } else if (/book now|schedule|appointment|consultation/i.test(ctaText)) {
    ctaInfo.conversionType = 'booking'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /book|schedule/i.test(cta)) || ctaInfo.allCTAs[0]
  } else if (/get quote|request quote|get pricing|get estimate/i.test(ctaText)) {
    ctaInfo.conversionType = 'quote'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /quote|pricing/i.test(cta)) || ctaInfo.allCTAs[0]
  } else if (/contact|call|get in touch|enquire/i.test(ctaText)) {
    ctaInfo.conversionType = 'contact'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /contact|call/i.test(cta)) || ctaInfo.allCTAs[0]
  } else if (/sign up|register|join|start.*free/i.test(ctaText)) {
    ctaInfo.conversionType = 'signup'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /sign|register/i.test(cta)) || ctaInfo.allCTAs[0]
  } else if (/download|get.*free|claim/i.test(ctaText)) {
    ctaInfo.conversionType = 'leadmagnet'
    ctaInfo.primaryCTA = ctaInfo.allCTAs.find(cta => /download|free/i.test(cta)) || ctaInfo.allCTAs[0]
  }

  // Check for urgency/scarcity words
  const urgencyPatterns = /limited|today|now|hurry|last chance|ends|only|left|remaining|sale/gi
  const urgencyMatches = html.match(urgencyPatterns) || []
  ctaInfo.urgencyWords = Array.from(new Set(urgencyMatches.map(w => w.toLowerCase())))

  // Check for forms
  ctaInfo.hasForm = /<form/i.test(html)
  ctaInfo.hasChat = /chat|intercom|drift|crisp|tawk|zendesk|messenger/i.test(html)
  ctaInfo.hasCalendar = /calendly|acuity|schedule\.once|booking.*calendar/i.test(html)

  // Detect form types
  if (/<input[^>]*type=["']email["']/i.test(html)) ctaInfo.formTypes.push('email capture')
  if (/<input[^>]*type=["']tel["']/i.test(html)) ctaInfo.formTypes.push('phone capture')
  if (/<textarea/i.test(html)) ctaInfo.formTypes.push('message form')

  console.log('🎯 CTA Detection:', {
    primary: ctaInfo.primaryCTA,
    type: ctaInfo.conversionType,
    total: ctaInfo.allCTAs.length
  })

  return ctaInfo
}

// Helper function to identify mobile vs landline
function isMobileNumber(phoneNumber: string): boolean {
  // Remove all non-digits
  const cleaned = phoneNumber.replace(/\D/g, '')

  // UK mobile patterns
  if (cleaned.startsWith('447') && cleaned.length === 12) return true  // UK international
  if (cleaned.startsWith('07') && cleaned.length === 11) return true    // UK national

  // US mobile patterns (rough detection based on area codes)
  if (cleaned.startsWith('1') && cleaned.length === 11) {
    const areaCode = cleaned.substring(1, 4)
    // Common mobile area codes (not exhaustive)
    const mobileCodes = ['201', '202', '203', '205', '206', '207', '208', '209', '210', '212', '213', '214', '215', '216', '217', '218', '219', '224', '225', '228', '229', '231', '234', '239', '240', '248', '251', '252', '253', '254', '256', '260', '262', '267', '269', '270', '276', '281', '301', '302', '303', '304', '305', '307', '308', '309', '310', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '323', '330', '331', '334', '336', '337', '339', '340', '341', '347', '351', '352', '360', '361', '364', '380', '385', '386', '401', '402', '404', '405', '406', '407', '408', '409', '410', '412', '413', '414', '415', '417', '419', '423', '424', '425', '430', '432', '434', '435', '440', '442', '443', '445', '458', '463', '469', '470', '475', '478', '479', '480', '484', '501', '502', '503', '504', '505', '507', '508', '509', '510', '512', '513', '515', '516', '517', '518', '520', '530', '534', '539', '540', '541', '551', '559', '561', '562', '563', '564', '567', '570', '571', '573', '574', '575', '580', '585', '586', '601', '602', '603', '605', '606', '607', '608', '609', '610', '612', '614', '615', '616', '617', '618', '619', '620', '623', '626', '628', '629', '630', '631', '636', '641', '646', '650', '651', '657', '659', '660', '661', '662', '667', '669', '678', '680', '681', '682', '689', '701', '702', '703', '704', '706', '707', '708', '712', '713', '714', '715', '716', '717', '718', '719', '720', '724', '725', '727', '731', '732', '734', '737', '740', '743', '747', '754', '757', '760', '762', '763', '764', '765', '769', '770', '772', '773', '774', '775', '779', '781', '785', '786', '801', '802', '803', '804', '805', '806', '808', '810', '812', '813', '814', '815', '816', '817', '818', '828', '830', '831', '832', '838', '843', '845', '847', '848', '850', '854', '856', '857', '858', '859', '860', '862', '863', '864', '865', '870', '872', '878', '901', '903', '904', '906', '907', '908', '909', '910', '912', '913', '914', '915', '916', '917', '918', '919', '920', '925', '928', '929', '930', '931', '934', '936', '937', '938', '940', '941', '945', '947', '949', '951', '952', '954', '956', '959', '970', '971', '972', '973', '978', '979', '980', '984', '985', '989']
    return mobileCodes.includes(areaCode)
  }

  // Default to landline if we can't determine
  return false
}

function extractContactInfo(html: string, domain: string, enhancedData: any = {}) {
  const info: any = {
    emails: [],
    phones: [],
    mobiles: [],
    landlines: [],
    socialLinks: {},
    platform: ''  // Will be filled by platform detection
  }

  // If we have Oxylabs data, prioritize it
  if (enhancedData.emails) {
    const oxylabsEmails = enhancedData.emails
      .map((e: string) => e.replace('mailto:', ''))
      .filter((e: string) => e && !e.includes('example.com'))
    info.emails.push(...oxylabsEmails)
    console.log('📧 Oxylabs found emails:', oxylabsEmails)
  }

  if (enhancedData.phones) {
    const oxylabsPhones = enhancedData.phones
      .map((p: string) => p.replace('tel:', ''))
      .filter((p: string) => p)

    // Categorize phone numbers
    oxylabsPhones.forEach((phone: string) => {
      const cleaned = phone.replace(/\D/g, '')
      if (isMobileNumber(cleaned)) {
        info.mobiles.push(phone)
      } else {
        info.landlines.push(phone)
      }
      info.phones.push(phone)
    })

    console.log('📱 Mobile numbers found:', info.mobiles)
    console.log('☎️ Landline numbers found:', info.landlines)
  }

  if (enhancedData.social_links) {
    enhancedData.social_links.forEach((link: string) => {
      if (link.includes('facebook.com')) info.socialLinks.facebook = link
      if (link.includes('instagram.com')) info.socialLinks.instagram = link
      if (link.includes('linkedin.com')) info.socialLinks.linkedin = link
    })
  }
  
  // Extract email addresses
  const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  const emailMatches = html.match(emailPattern) || []
  
  // Filter out common non-contact emails and duplicates
  const excludePatterns = ['example.com', 'email.com', 'domain.com', 'sentry.io', 'jquery', 'bootstrap']
  info.emails = Array.from(new Set(emailMatches))
    .filter(email => {
      const lower = email.toLowerCase()
      return !excludePatterns.some(pattern => lower.includes(pattern)) &&
             !lower.includes('noreply') &&
             !lower.includes('no-reply') &&
             !lower.includes('@2x') &&
             !lower.includes('.png') &&
             !lower.includes('.jpg')
    })
    .slice(0, 3) // Limit to 3 emails
  
  // Extract phone numbers - try multiple methods
  const foundPhones = new Set<string>()

  // Method 1: Look for tel: links (most reliable)
  const telLinks = Array.from(html.matchAll(/href=["']?tel:([^"'\s>]+)["']?/gi))
  for (const match of telLinks) {
    const phone = match[1].trim()
    const digits = phone.replace(/\D/g, '')
    if (digits.length >= 10 && digits.length <= 15) {
      console.log(`Found tel: link: ${phone}`)
      foundPhones.add(formatPhone(phone))
    }
  }
  
  // Method 2: Look for phone numbers in common formats
  // Prioritize UK formats since this is a UK site
  const phonePatterns = [
    // UK formats (with +44 or 0 prefix)
    /(?:^|[^\d])((?:\+44|0)[1-9]\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{3,4})(?:[^\d]|$)/g,
    // WhatsApp links
    /whatsapp.*?(\+?\d{10,15})/gi,
    // International with country code
    /(?:^|[^\d])(\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})(?:[^\d]|$)/g
  ]
  
  for (const pattern of phonePatterns) {
    const matches = Array.from(html.matchAll(pattern))
    for (const match of matches) {
      let phone = match[0].trim()
      // Clean edges
      phone = phone.replace(/^[^\d+]+|[^\d]+$/g, '')
      const digits = phone.replace(/\D/g, '')
      
      if (digits.length >= 10 && digits.length <= 15) {
        // Skip if it looks like a year, price, or other number
        if (!digits.startsWith('20') && !digits.startsWith('19') && !phone.includes('$')) {
          foundPhones.add(formatPhone(phone))
        }
      }
    }
  }
  
  // Method 3: Disabled - too many false positives
  // This method was finding random numbers near contact keywords
  // const contactSections = html.match(/(?:contact|call|phone|reach|mobile)[\s\S]{0,100}/gi) || []
  // for (const section of contactSections) {
  //   const numbers = section.match(/[\d\s()+-]{10,20}/g) || []
  //   for (const num of numbers) {
  //     const digits = num.replace(/\D/g, '')
  //     if (digits.length >= 10 && digits.length <= 15) {
  //       foundPhones.add(formatPhone(num))
  //     }
  //   }
  // }
  
  info.phones = Array.from(foundPhones).slice(0, 3)
  
  // Helper function to format phones nicely
  function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '')
    if (digits.length === 10 && digits[0] >= '2') {
      return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
    } else if (digits.length === 11 && digits[0] === '1') {
      return `+1 (${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`
    }
    return phone.trim()
  }
  
  console.log(`Phone extraction for ${domain}: found ${info.phones.length} phones`, info.phones)
  
  // Extract social media links
  const socialPatterns = {
    facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([^\/\s"]+)/i,
    instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^\/\s"]+)/i,
    twitter: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/([^\/\s"]+)/i,
    linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:company|in)\/([^\/\s"]+)/i,
    youtube: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:c|channel|user)\/([^\/\s"]+)/i
  }
  
  for (const [platform, pattern] of Object.entries(socialPatterns)) {
    const match = html.match(pattern)
    if (match && match[1]) {
      info.socialLinks[platform] = match[1]
    }
  }
  
  // Extract business name from common patterns
  const businessNamePatterns = [
    /<meta\s+property="og:site_name"\s+content="([^"]+)"/i,
    /<meta\s+name="application-name"\s+content="([^"]+)"/i,
    /<title>([^<]+)<\/title>/i
  ]
  
  for (const pattern of businessNamePatterns) {
    const match = html.match(pattern)
    if (match && match[1]) {
      info.businessName = match[1].trim()
      break
    }
  }
  
  return info
}

// Detect location and currency from various signals
function detectLocation(html: string, domain: string) {
  const location: any = {
    country: '',
    currency: '$', // Default to USD
    language: '',
    confidence: 'low'
  }

  // 1. Check HTML lang attribute
  const htmlLang = html.match(/<html[^>]*lang=["']([^"']+)["']/i)?.[1] || ''
  if (htmlLang) {
    location.language = htmlLang
    // Parse country from lang (e.g., en-GB, fr-FR)
    if (htmlLang.includes('-')) {
      const country = htmlLang.split('-')[1].toUpperCase()
      location.country = country
      location.confidence = 'high'
    }
  }

  // 2. Check og:locale
  const ogLocale = html.match(/<meta\s+property=["']og:locale["']\s+content=["']([^"']+)["']/i)?.[1] || ''
  if (ogLocale) {
    location.language = ogLocale
    if (ogLocale.includes('_')) {
      const country = ogLocale.split('_')[1]?.toUpperCase()
      if (country) {
        location.country = country
        location.confidence = 'high'
      }
    }
  }

  // 3. Check domain TLD
  const tldMap: { [key: string]: { country: string, currency: string } } = {
    '.uk': { country: 'GB', currency: '£' },
    '.co.uk': { country: 'GB', currency: '£' },
    '.ca': { country: 'CA', currency: 'CAD $' },
    '.au': { country: 'AU', currency: 'AUD $' },
    '.com.au': { country: 'AU', currency: 'AUD $' },
    '.nz': { country: 'NZ', currency: 'NZD $' },
    '.co.nz': { country: 'NZ', currency: 'NZD $' },
    '.in': { country: 'IN', currency: '₹' },
    '.co.in': { country: 'IN', currency: '₹' },
    '.za': { country: 'ZA', currency: 'R' },
    '.co.za': { country: 'ZA', currency: 'R' },
    '.de': { country: 'DE', currency: '€' },
    '.fr': { country: 'FR', currency: '€' },
    '.it': { country: 'IT', currency: '€' },
    '.es': { country: 'ES', currency: '€' },
    '.nl': { country: 'NL', currency: '€' },
    '.be': { country: 'BE', currency: '€' },
    '.eu': { country: 'EU', currency: '€' },
    '.jp': { country: 'JP', currency: '¥' },
    '.cn': { country: 'CN', currency: '¥' },
    '.br': { country: 'BR', currency: 'R$' },
    '.mx': { country: 'MX', currency: 'MX$' }
  }

  for (const [tld, data] of Object.entries(tldMap)) {
    if (domain.endsWith(tld)) {
      location.country = data.country
      location.currency = data.currency
      if (location.confidence !== 'high') {
        location.confidence = 'medium'
      }
      break
    }
  }

  // 4. Detect currency symbols in content
  const currencyPatterns = [
    { pattern: /£[\d,]+/g, currency: '£', country: 'GB' },
    { pattern: /€[\d,]+/g, currency: '€', country: 'EU' },
    { pattern: /\$[\d,]+/g, currency: '$', country: 'US' },
    { pattern: /CAD\s*\$[\d,]+/g, currency: 'CAD $', country: 'CA' },
    { pattern: /AUD\s*\$[\d,]+/g, currency: 'AUD $', country: 'AU' },
    { pattern: /NZD\s*\$[\d,]+/g, currency: 'NZD $', country: 'NZ' },
    { pattern: /₹[\d,]+/g, currency: '₹', country: 'IN' },
    { pattern: /¥[\d,]+/g, currency: '¥', country: 'JP' },
    { pattern: /R\s*[\d,]+/g, currency: 'R', country: 'ZA' }
  ]

  for (const { pattern, currency, country } of currencyPatterns) {
    if (pattern.test(html)) {
      location.currency = currency
      if (!location.country) {
        location.country = country
        location.confidence = 'medium'
      }
      break
    }
  }

  // 5. Check for address patterns (only if we don't have high confidence already)
  if (location.confidence !== 'high') {
    const ukPostcode = /\b[A-Z]{1,2}[0-9R][0-9A-Z]?\s*[0-9][A-Z]{2}\b/i
    const usZip = /\b\d{5}(-\d{4})?\b/

    if (ukPostcode.test(html)) {
      location.country = 'GB'
      location.currency = '£'
      location.confidence = 'high'
    } else if (usZip.test(html)) {
      location.country = 'US'
      location.currency = '$'
      location.confidence = 'medium'
    }
  }

  // 6. Default .com domains to US if no other strong signals
  if (!location.country && domain.endsWith('.com')) {
    location.country = 'US'
    location.currency = '$'
    location.confidence = 'low'
  }

  // Apply currency based on detected country
  if (location.country) {
    const countryToCurrency: { [key: string]: string } = {
      'GB': '£', 'UK': '£',
      'US': '$',
      'CA': 'CAD $',
      'AU': 'AUD $',
      'NZ': 'NZD $',
      'JP': '¥', 'CN': '¥',
      'IN': '₹',
      'SG': 'S$',
      'ZA': 'R',
      'BR': 'R$',
      'MX': 'MX$',
      // European countries
      'DE': '€', 'FR': '€', 'IT': '€', 'ES': '€', 'NL': '€',
      'BE': '€', 'AT': '€', 'PT': '€', 'GR': '€', 'FI': '€',
      'IE': '€', 'LU': '€', 'SK': '€', 'SI': '€'
    }

    if (countryToCurrency[location.country]) {
      location.currency = countryToCurrency[location.country]
    }
  }

  console.log('📍 Location detection:', location)
  return location
}

function extractBusinessInfo(html: string, domain: string) {
  const info: any = {
    businessType: '',
    mainOffer: '',
    pricePoint: '',
    targetAudience: '',
    valueProps: [],
    hasEcommerce: false,
    hasBooking: false,
    isLeadGen: false,
    industry: '',
    platform: '',
    confidence: 0,
    signals: [],
    reasoning: '',
    location: detectLocation(html, domain) // Add location detection
  }
  
  // Extract meta description and title for business context
  const metaDescription = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1] || ''
  const ogDescription = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)?.[1] || ''
  const pageTitle = html.match(/<title>([^<]+)<\/title>/i)?.[1] || ''
  const h1Text = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi)?.map(h => h.replace(/<[^>]+>/g, '')).join(' ') || ''

  // Debug logging
  console.log('📝 Page Title:', pageTitle)
  console.log('📝 Meta Description:', metaDescription)
  console.log('📝 OG Description:', ogDescription)
  console.log('📝 H1 Text:', h1Text ? h1Text.substring(0, 100) : 'None found')

  // Detect platform first (this helps with business type detection)
  const platformDetection = {
    'Wix': /wix\.com|wixstatic\.com|wixsite\.com|parastorage\.com|wix-code|static\.wixstatic/gi,
    'Shopify': /shopify|myshopify\.com|cdn\.shopify|shopify-assets/gi,
    'WordPress': /wp-content|wordpress|wp-json|wp-includes/gi,
    'Squarespace': /squarespace|sqsp\.net|squarespace-cdn/gi,
    'Webflow': /webflow\.com|webflow\.io/gi,
    'WooCommerce': /woocommerce|wc-ajax/gi,
    'BigCommerce': /bigcommerce/gi,
    'Magento': /magento|mage\//gi,
    'PrestaShop': /prestashop/gi,
    'ClickFunnels': /clickfunnels|cfcdn\.com/gi,
    'Leadpages': /leadpages|lpusercontent/gi,
    'Unbounce': /unbounce|ub-assets/gi,
    'Custom/Unknown': null
  }

  // Check for platform - check Wix first as it's often misidentified
  console.log('🔧 Detecting platform...')

  for (const [platform, pattern] of Object.entries(platformDetection)) {
    if (pattern && pattern.test(html)) {
      info.platform = platform
      info.signals.push(`Platform: ${platform} detected`)
      console.log(`✅ Platform detected: ${platform}`)

      // Platform-specific assumptions
      if (platform === 'Shopify' || platform === 'WooCommerce' || platform === 'BigCommerce' || platform === 'Magento') {
        info.hasEcommerce = true
        info.signals.push(`E-commerce platform detected - likely selling products`)
        info.confidence += 30
      } else if (platform === 'ClickFunnels' || platform === 'Leadpages' || platform === 'Unbounce') {
        info.isLeadGen = true
        info.signals.push(`Landing page builder detected - likely focused on lead generation`)
        info.confidence += 25
      } else if (platform === 'Wix') {
        info.signals.push(`Wix site detected - checking for business features`)
        info.confidence += 20
      }
      break
    }
  }

  if (!info.platform) {
    info.platform = 'Custom/Unknown'
    console.log('❓ Platform: Custom or Unknown')
  }

  // Combine all text for analysis
  const combinedText = `${pageTitle} ${metaDescription} ${ogDescription} ${h1Text}`.toLowerCase()

  // Detect business type based on keywords with weighted scoring
  const businessTypeIndicators = {
    'homeimprovement': {
      pattern: /kitchen|bathroom|renovation|remodel|cabinet|countertop|flooring|construction|interior design|home improvement|fitting|installation/gi,
      weight: 12,
      description: 'Home improvement & renovation'
    },
    'ecommerce': {
      pattern: /shop|store|buy|cart|checkout|product|shipping|order|purchase|add to cart|shop now/gi,
      weight: 10,
      description: 'Selling products online'
    },
    'saas': {
      pattern: /software|app|platform|dashboard|api|subscription|pricing|trial|demo|features/gi,
      weight: 8,
      description: 'Software as a Service'
    },
    'service': {
      pattern: /service|consultation|appointment|book|schedule|hire|contact us|get quote/gi,
      weight: 7,
      description: 'Service-based business'
    },
    'agency': {
      pattern: /agency|marketing|design|development|creative|studio|clients|portfolio|case study/gi,
      weight: 6,
      description: 'Agency or consultancy'
    },
    'education': {
      pattern: /course|learn|training|tutorial|education|student|enroll|curriculum|certification/gi,
      weight: 5,
      description: 'Education or training'
    },
    'healthcare': {
      pattern: /health|medical|doctor|clinic|patient|appointment|treatment|therapy|wellness/gi,
      weight: 5,
      description: 'Healthcare services'
    },
    'realestate': {
      pattern: /property|real estate|home|house|apartment|rent|buy|sell|listing|agent/gi,
      weight: 3,
      description: 'Real estate'
    },
    'fitness': {
      pattern: /fitness|gym|workout|training|coach|nutrition|weight|muscle|exercise/gi,
      weight: 4,
      description: 'Fitness & wellness'
    },
    'beauty': {
      pattern: /beauty|salon|spa|hair|nail|makeup|skincare|cosmetic|treatment/gi,
      weight: 4,
      description: 'Beauty & cosmetics'
    },
    'restaurant': {
      pattern: /restaurant|food|menu|delivery|takeout|cuisine|dining|chef|reservation/gi,
      weight: 4,
      description: 'Food & dining'
    },
    'legal': {
      pattern: /law|legal|attorney|lawyer|consultation|case|court|justice|rights/gi,
      weight: 3,
      description: 'Legal services'
    },
    'finance': {
      pattern: /finance|loan|credit|investment|banking|mortgage|insurance|tax|accounting/gi,
      weight: 3,
      description: 'Financial services'
    }
  }

  // Score each business type
  const typeScores: {[key: string]: {score: number, matches: string[]}} = {}

  for (const [type, indicator] of Object.entries(businessTypeIndicators)) {
    const matches = combinedText.match(indicator.pattern) || []
    if (matches.length > 0) {
      const uniqueMatches = [...new Set(matches.map(m => m.toLowerCase()))]
      typeScores[type] = {
        score: uniqueMatches.length * indicator.weight,
        matches: uniqueMatches.slice(0, 3) // Keep top 3 matches for explanation
      }
    }
  }

  // Find the best match
  let bestType = ''
  let bestScore = 0
  let bestMatches: string[] = []

  for (const [type, data] of Object.entries(typeScores)) {
    if (data.score > bestScore) {
      bestScore = data.score
      bestType = type
      bestMatches = data.matches
    }
  }

  if (bestType) {
    info.businessType = bestType
    info.industry = businessTypeIndicators[bestType].description
    info.confidence += Math.min(30, bestScore * 2) // Add confidence based on score
    info.signals.push(`Detected ${bestMatches.length} ${bestType} keywords: ${bestMatches.join(', ')}`)
  }
  
  // Detect if it's ecommerce
  info.hasEcommerce = /add to cart|shop now|buy now|checkout|shopping cart|product|price|sale/gi.test(html)
  
  // Detect if it's booking/appointment based
  info.hasBooking = /book now|schedule|appointment|consultation|calendar|booking|reserve/gi.test(html)
  
  // Detect if it's lead generation
  info.isLeadGen = /get quote|free consultation|contact us|request demo|download|sign up|newsletter/gi.test(html)
  
  // Extract main offer - prefer meta description over random headlines
  if (metaDescription) {
    info.mainOffer = metaDescription.substring(0, 150)
  } else if (ogDescription) {
    info.mainOffer = ogDescription.substring(0, 150)
  } else if (pageTitle) {
    // Use page title as fallback
    info.mainOffer = pageTitle.substring(0, 150)
  } else {
    // Last resort - try headlines
    const headlines = html.match(/<h[12][^>]*>([^<]+)<\/h[12]>/gi) || []
    if (headlines.length > 0) {
      const cleanHeadline = headlines[0]
        .replace(/<[^>]+>/g, '')
        .trim()
        .substring(0, 100)
      info.mainOffer = cleanHeadline
    }
  }
  
  // Detect currency based on domain and content
  let currency = '$' // default
  if (domain.endsWith('.uk') || domain.endsWith('.co.uk')) {
    currency = '£'
  } else if (domain.endsWith('.eu') || domain.endsWith('.de') || domain.endsWith('.fr') || domain.endsWith('.es') || domain.endsWith('.it')) {
    currency = '€'
  } else if (domain.endsWith('.au')) {
    currency = 'A$'
  } else if (domain.endsWith('.ca')) {
    currency = 'C$'
  }
  // Also check content for currency symbols
  if (html.includes('£') || html.includes('GBP')) currency = '£'
  else if (html.includes('€') || html.includes('EUR')) currency = '€'

  // Extract price points if visible
  const pricePatterns = [
    /\$[\d,]+(?:\.\d{2})?/g,
    /£[\d,]+(?:\.\d{2})?/g,
    /€[\d,]+(?:\.\d{2})?/g,
    /USD\s*[\d,]+/gi,
    /GBP\s*[\d,]+/gi,
    /EUR\s*[\d,]+/gi,
    /from\s*[\$£€][\d,]+/gi
  ]

  const prices: string[] = []
  for (const pattern of pricePatterns) {
    const matches = html.match(pattern) || []
    prices.push(...matches.slice(0, 3))
  }

  // Only set price info if we actually found prices
  if (prices.length > 0) {
    info.pricePoint = prices[0]
    info.currency = currency
    // Only determine price tier if we have a real price
    const priceNum = parseInt(prices[0].replace(/\D/g, ''))
    if (priceNum > 0) {
      if (priceNum < 50) info.priceRange = 'budget'
      else if (priceNum < 200) info.priceRange = 'mid-range'
      else info.priceRange = 'premium'
    }
  } else {
    // Store currency for future use even if no prices found
    info.currency = currency
  }
  
  // Extract value propositions (benefits/features)
  const valuePatterns = [
    /(?:✓|✔|★|•)\s*([^<\n]{10,60})/g,
    /<li[^>]*>([^<]{10,60})<\/li>/g
  ]
  
  const valueProps = new Set<string>()
  for (const pattern of valuePatterns) {
    const matches = Array.from(html.matchAll(pattern))
    for (const match of matches) {
      const prop = match[1].trim()
      if (prop.length > 10 && prop.length < 60 && !prop.includes('cookie')) {
        valueProps.add(prop)
        if (valueProps.size >= 3) break
      }
    }
    if (valueProps.size >= 3) break
  }
  info.valueProps = Array.from(valueProps)
  
  // Try to identify target audience from content
  const audienceIndicators = {
    'b2b': /business|enterprise|company|organization|team|corporate|professional/gi,
    'b2c': /personal|individual|family|home|lifestyle|consumer/gi,
    'women': /women|female|ladies|girl|her|she/gi,
    'men': /men|male|guys|gentlemen|his|he/gi,
    'parents': /parent|mom|dad|family|kids|children|baby/gi,
    'seniors': /senior|elderly|retirement|aged|older/gi,
    'youth': /young|teen|student|youth|college|university/gi
  }
  
  const audiences = []
  for (const [audience, pattern] of Object.entries(audienceIndicators)) {
    if (pattern.test(combinedText)) {
      audiences.push(audience)
    }
  }
  info.targetAudience = audiences.slice(0, 2).join(', ') || 'general'
  
  // If we couldn't determine business type, make an educated guess
  if (!info.businessType) {
    if (info.hasEcommerce) {
      info.businessType = 'ecommerce'
      info.signals.push('Shopping features detected but unclear business focus')
      info.confidence += 15
    } else if (info.hasBooking) {
      info.businessType = 'service'
      info.signals.push('Booking/appointment features suggest service business')
      info.confidence += 15
    } else if (info.isLeadGen) {
      info.businessType = 'leadgen'
      info.signals.push('Lead capture forms suggest lead generation focus')
      info.confidence += 10
    } else {
      info.businessType = 'general'
      info.signals.push('Unable to determine specific business type from content')
      info.signals.push('This suggests your site may be too generic or unfocused for effective ads')
      info.confidence = 10 // Very low confidence
    }
  }

  // Build reasoning explanation
  const reasoningParts = []

  if (info.platform && info.platform !== 'Custom/Unknown') {
    reasoningParts.push(`I detected you're using ${info.platform}`)
  }

  if (info.businessType && info.businessType !== 'general') {
    reasoningParts.push(`Your site appears to be ${info.industry || info.businessType} based on the content and features I found`)
  }

  if (info.hasEcommerce) {
    reasoningParts.push(`Shopping cart and product features are present`)
  }

  if (info.hasBooking) {
    reasoningParts.push(`Booking or appointment scheduling detected`)
  }

  if (info.pricePoint) {
    reasoningParts.push(`Price points suggest ${info.priceRange || 'standard'} tier offerings`)
  }

  // Calculate final confidence
  info.confidence = Math.min(100, info.confidence)

  // Create the reasoning message
  if (reasoningParts.length > 0) {
    info.reasoning = reasoningParts.join('. ') + '.'

    if (info.confidence < 50) {
      info.reasoning += ' Note: My analysis confidence is low - please verify and correct if needed.'
    } else if (info.confidence < 75) {
      info.reasoning += ' This is my best guess based on what I can see.'
    } else {
      info.reasoning += ' This analysis should align with how Facebook and Google see your site.'
    }
  } else {
    info.reasoning = 'I had difficulty analyzing your site content. This might indicate SEO or content clarity issues.'
  }

  return info
}

function getRecommendations(issues: string[], ctaInfo: any, pixelFound: boolean): string[] {
  const recommendations = []
  
  if (issues.includes('no_pixel')) {
    recommendations.push('🚨 Critical: No Facebook Pixel detected - you\'re flying blind without conversion data')
    recommendations.push('💰 You\'re losing money: Can\'t retarget website visitors (70% cheaper than cold traffic)')
    recommendations.push('📊 Missing data on what\'s working - no way to optimize campaigns')
  }

  if (issues.includes('wix_pixel_not_configured')) {
    recommendations.push('🔧 Good news: Wix has Facebook Pixel ready - you just need to add your Pixel ID!')
    recommendations.push('📝 Go to: Wix Dashboard → Marketing Tools → Facebook Pixel → Add your ID')
    recommendations.push('⏱️ Takes 2 minutes to fix and you\'ll start collecting data immediately')
  }
  
  if (issues.includes('multiple_pixels')) {
    recommendations.push('⚠️ Multiple pixels detected - this causes data conflicts and inaccurate reporting')
    recommendations.push('🎯 Your conversion tracking is likely double-counting, making ROI look better than reality')
    recommendations.push('🔧 Quick fix: Remove duplicate pixels and use one master pixel across your site')
  }
  
  if (issues.includes('no_conversions_api')) {
    recommendations.push('📱 iOS users invisible: Without Conversions API, you\'re missing 30-50% of conversions')
    recommendations.push('🛡️ Your tracking is vulnerable to ad blockers and browser restrictions')
  }
  
  if (issues.includes('no_domain_verification')) {
    recommendations.push('🔐 Domain not verified - competitors can hijack your links in ads')
    recommendations.push('📈 Missing out on aggregated event measurement for iOS tracking')
  }
  
  if (issues.includes('pixel_misconfigured')) {
    recommendations.push('🔴 Pixel code detected but not firing properly - all your data is lost')
    recommendations.push('💡 Common cause: Pixel installed in wrong location or syntax errors')
  }
  
  // Add CTA-specific recommendations
  if (ctaInfo && ctaInfo.conversionType) {
    if (!pixelFound) {
      recommendations.push(`💸 You want visitors to "${ctaInfo.primaryCTA || 'convert'}" but can't track if they do!`)
    } else {
      if (ctaInfo.conversionType === 'purchase') {
        recommendations.push('🛒 Make sure you\'re tracking Purchase and AddToCart events')
      } else if (ctaInfo.conversionType === 'booking') {
        recommendations.push('📅 Track Schedule/CompleteRegistration events for bookings')
      } else if (ctaInfo.conversionType === 'quote') {
        recommendations.push('📝 Track Lead events when quotes are requested')
      } else if (ctaInfo.conversionType === 'contact') {
        recommendations.push('📞 Track Contact events for form submissions')
      }
    }
  } else {
    recommendations.push('⚠️ No clear CTA found - visitors won\'t know what action to take')
  }

  // Always add this if they have a pixel
  if (!issues.includes('no_pixel') && recommendations.length === 0) {
    recommendations.push('✅ Pixel detected - but is it tracking the right events?')
    recommendations.push('🎯 Most sites miss Purchase, AddToCart, and ViewContent events')
    recommendations.push('🚀 Proper event tracking can improve ROAS by 2-3x')
  }

  return recommendations.slice(0, 4) // Limit to top 4 most important
}