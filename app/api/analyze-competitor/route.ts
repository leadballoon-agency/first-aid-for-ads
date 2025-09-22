import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { query, searchType, userDomain } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    console.log(`\n🔍 Analyzing competitor: ${query} (${searchType})`)

    // Construct Facebook Ads Library URL
    // The URL structure for ads library search
    const baseUrl = 'https://www.facebook.com/ads/library/'
    const searchParams = new URLSearchParams({
      active_status: 'active',  // Only active ads
      ad_type: 'all',           // All ad types
      country: 'ALL',           // All countries (or could use 'GB', 'US', etc)
      q: query,                 // Search query
      media_type: 'all'         // All media types
    })

    const adsLibraryUrl = `${baseUrl}?${searchParams.toString()}`
    console.log(`📚 Ads Library URL: ${adsLibraryUrl}`)

    // Use Oxylabs to scrape the Ads Library
    const useOxylabs = process.env.OXYLABS_USERNAME && process.env.OXYLABS_PASSWORD

    if (!useOxylabs) {
      console.warn('⚠️ Oxylabs not configured for competitor analysis')
      return NextResponse.json({
        query,
        adCount: 0,
        message: 'Competitor analysis requires Oxylabs configuration',
        fallback: true
      })
    }

    try {
      console.log('🔧 Using Oxylabs to scrape Facebook Ads Library...')

      const oxylabsResponse = await fetch('https://realtime.oxylabs.io/v1/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`).toString('base64')
        },
        body: JSON.stringify({
          source: 'universal',
          url: adsLibraryUrl,
          render: 'html',
          javascript: true,
          timeout: 30000,
          wait_for_selector: '[role="feed"]',  // Wait for the feed to load
          parse: true,
          parsing_instructions: {
            // Count of ads (look for the results text)
            results_text: {
              _fns: [
                {
                  _fn: "xpath",
                  _args: ["//div[contains(text(),'results') or contains(text(),'ads')]/text()"]
                }
              ]
            },
            // Ad cards (each ad is in a specific container)
            ad_count: {
              _fns: [
                {
                  _fn: "xpath",
                  _args: ["count(//div[@role='article'])"]
                }
              ]
            },
            // Ad text content
            ad_texts: {
              _fns: [
                {
                  _fn: "css",
                  _args: ["[role='article'] span"]
                }
              ]
            },
            // Page names/advertisers
            advertisers: {
              _fns: [
                {
                  _fn: "xpath",
                  _args: ["//a[contains(@href,'/ads/library/')]/text()"]
                }
              ]
            }
          }
        }),
        signal: AbortSignal.timeout(35000)
      })

      if (oxylabsResponse.ok) {
        const oxylabsData = await oxylabsResponse.json()
        const parsedData = oxylabsData.results?.[0]?.parsed || {}
        const contentRaw = oxylabsData.results?.[0]?.content || ''
        const content = typeof contentRaw === 'string' ? contentRaw : JSON.stringify(contentRaw)

        console.log('✅ Oxylabs extraction successful')
        console.log('📊 Content length:', content.length)
        console.log('📊 Parsed data:', {
          results_text: parsedData.results_text,
          ad_count: parsedData.ad_count,
          advertisers: parsedData.advertisers?.slice(0, 3)
        })

        // Log a snippet of content to see what we're getting
        if (content.length > 0) {
          console.log('📄 Content snippet:', content.substring(0, 200))
        }

        // Analyze the content
        const adCount = parseInt(parsedData.ad_count) || 0
        const contentStr = String(content)
        const hasAds = adCount > 0 || contentStr.includes('active ad') || contentStr.includes('Active ads')

        // Detect ad types from content
        const adTypes = []
        if (contentStr.includes('video') || contentStr.includes('Video')) adTypes.push('video')
        if (contentStr.includes('carousel') || contentStr.includes('Carousel')) adTypes.push('carousel')
        if (contentStr.includes('image') || contentStr.includes('Image')) adTypes.push('image')
        if (contentStr.includes('collection')) adTypes.push('collection')

        // Extract themes from ad texts if available
        const themes = extractThemes(parsedData.ad_texts || content)

        // Generate insights
        let insight = ''
        if (adCount === 0) {
          insight = 'No active Facebook ads found. Great opportunity to be first!'
        } else if (adCount < 5) {
          insight = 'Light advertising presence. Room to dominate with aggressive campaigns.'
        } else if (adCount < 20) {
          insight = 'Moderate advertising activity. Focus on unique value props to stand out.'
        } else {
          insight = 'Heavy advertiser! Study their strategy and find gaps to exploit.'
        }

        return NextResponse.json({
          query,
          searchType,
          adCount: adCount || (hasAds ? '1+' : 0),
          hasActiveAds: hasAds,
          adTypes: adTypes.length > 0 ? adTypes : null,
          themes,
          advertisers: parsedData.advertisers?.slice(0, 5),
          insight,
          adsLibraryUrl  // So users can check manually if they want
        })

      } else {
        const errorText = await oxylabsResponse.text()
        console.error('Oxylabs error:', oxylabsResponse.status, errorText.substring(0, 200))
        throw new Error(`Oxylabs request failed with status ${oxylabsResponse.status}`)
      }

    } catch (oxylabsError) {
      console.error('⚠️ Failed to analyze competitor:', oxylabsError)

      // Fallback response
      return NextResponse.json({
        query,
        searchType,
        adCount: 0,
        message: 'Could not access Facebook Ads Library',
        adsLibraryUrl,
        fallback: true,
        error: oxylabsError instanceof Error ? oxylabsError.message : 'Unknown error'
      })
    }

  } catch (error: any) {
    console.error('Competitor analysis error:', error)
    return NextResponse.json({
      error: 'Could not analyze competitor',
      details: error.message
    }, { status: 500 })
  }
}

function extractThemes(adTexts: any): string[] {
  const themes: string[] = []
  const textContent = typeof adTexts === 'string' ? adTexts : JSON.stringify(adTexts)

  // Common ad themes to look for
  const themePatterns = {
    'Sale/Discount': /sale|discount|off|save|promo|deal/gi,
    'Free Shipping': /free shipping|free delivery/gi,
    'Limited Time': /limited|hurry|ends|last chance|today only/gi,
    'New Arrival': /new|just arrived|latest|fresh/gi,
    'Best Seller': /best seller|popular|trending|top rated/gi,
    'Guarantee': /guarantee|warranty|money back|risk free/gi,
    'Social Proof': /reviews|customers|trusted by|loved by/gi,
    'Call to Action': /shop now|buy now|get started|learn more|sign up/gi,
  }

  for (const [theme, pattern] of Object.entries(themePatterns)) {
    if (pattern.test(textContent)) {
      themes.push(theme)
    }
  }

  return themes.slice(0, 5) // Return top 5 themes
}