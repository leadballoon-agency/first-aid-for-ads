// Test Facebook Ads Library scraping

async function testAdsLibrary() {
  const queries = [
    { query: 'nike', searchType: 'domain' },
    { query: 'shopify.com', searchType: 'domain' },
    { query: 'plumber london', searchType: 'keyword' },
    { query: 'fitness coach', searchType: 'keyword' }
  ];

  console.log('🧪 Testing Facebook Ads Library scraping...\n');

  for (const test of queries) {
    console.log(`\n📊 Testing: "${test.query}" (${test.searchType})`);
    console.log('─'.repeat(50));

    try {
      const response = await fetch('http://localhost:3000/api/analyze-competitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test)
      });

      const data = await response.json();

      if (data.error) {
        console.log('❌ Error:', data.error);
        if (data.details) {
          console.log('   Details:', data.details);
        }
      } else {
        console.log('✅ Success!');
        console.log(`📊 Ads found: ${data.adCount || 0}`);
        console.log(`🎯 Has active ads: ${data.hasActiveAds ? 'Yes' : 'No'}`);

        if (data.themes?.length > 0) {
          console.log(`📝 Themes detected: ${data.themes.join(', ')}`);
        }

        if (data.adTypes?.length > 0) {
          console.log(`📱 Ad types: ${data.adTypes.join(', ')}`);
        }

        if (data.insight) {
          console.log(`💡 Insight: ${data.insight}`);
        }

        if (data.adsLibraryUrl) {
          console.log(`🔗 Manual check: ${data.adsLibraryUrl}`);
        }

        if (data.fallback) {
          console.log('⚠️  Fallback mode - data may be limited');
        }
      }
    } catch (error) {
      console.log('❌ Request failed:', error.message);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✨ Test complete!\n');
}

testAdsLibrary().catch(console.error);