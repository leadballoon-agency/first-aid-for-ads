# Facebook Campaign Launch Checklist

## ✅ Pre-Launch Setup (COMPLETED)

### 1. Analytics & Tracking ✅
- [x] Facebook Pixel code added to site
- [x] Google Analytics integration ready
- [x] Conversion events configured:
  - `PageView` - When someone lands on the tool
  - `InitiateCheckout` - When assessment starts
  - `Search` - When URL is analyzed
  - `CompleteRegistration` - When reaching AI chat
  - `Lead` - When qualified lead reaches AI consultant

### 2. Technical Infrastructure ✅
- [x] Site deployed to app.firstaidforads.com
- [x] SSL certificate active (https)
- [x] Database configured (Neon PostgreSQL)
- [x] API integrations working (Oxylabs, Claude AI)
- [x] TypeScript errors fixed
- [x] Production build successful on Vercel

## 📋 TO DO BEFORE LAUNCHING ADS

### 1. Add Your Tracking IDs to Vercel Environment Variables
Go to Vercel Dashboard > Settings > Environment Variables and add:

```
NEXT_PUBLIC_FB_PIXEL_ID=YOUR_ACTUAL_PIXEL_ID
NEXT_PUBLIC_GA_ID=G-YOUR_GA_ID
```

### 2. Configure Facebook Pixel Events in Ads Manager
1. Go to Events Manager
2. Verify pixel is firing (use Facebook Pixel Helper Chrome extension)
3. Set up Custom Conversions:
   - **Quality Lead**: When user reaches AI chat (CompleteRegistration event)
   - **Hot Lead**: When spending £500+ with pixel installed
   - **URL Analyzed**: Search event

### 3. Campaign Setup Recommendations

#### Targeting
- **Interest targeting**: Facebook advertisers, digital marketers, ecommerce store owners
- **Lookalike audiences**: Create from your existing customer list
- **Behavioral**: Small business owners, online shopping engagement

#### Ad Copy Angles
- "3 Hidden Campaign Killers Destroying Your Facebook Ads"
- "Free Diagnostic: Why Your Facebook Ads Aren't Converting"
- "Is Your Pixel Sabotaging Your Campaigns? Find Out in 60 Seconds"

#### Landing Page Optimizations
The tool currently:
- ✅ Works on mobile
- ✅ Has clear value proposition
- ✅ Shows social proof (beta badge, professional design)
- ✅ Qualifies leads automatically

### 4. Lead Routing Logic (ALREADY CONFIGURED)
The AI automatically routes leads:
- **To Kerry**: £500+ monthly spend WITH pixel installed (warm leads for call conversion)
- **To Mark**: Technical issues, no pixel, or budget under £500 (needs landing page/setup)

### 5. Testing Before Launch
1. Test the full flow with Facebook Pixel Helper active
2. Verify events fire at each step
3. Check mobile responsiveness
4. Test with different URLs (with/without pixel)
5. Ensure AI chat loads and responds correctly

### 6. Campaign Budget Recommendations
- Start with £20-30/day for testing
- Use ABO (not CBO) initially for better control
- 3-5 ad sets with different audiences
- 2-3 ads per ad set

### 7. Expected Metrics
Based on the tool's qualification process:
- CPM: £15-25 (UK B2B audience)
- CTR: 1.5-2.5% (strong hook about campaign problems)
- Conversion Rate to Assessment: 40-60% (low friction, high value)
- Qualified Lead Rate: 15-25% (reach AI chat)
- Cost Per Qualified Lead: £8-15

## 🚀 Quick Launch Steps

1. **Add tracking IDs to Vercel** (5 minutes)
2. **Test with Pixel Helper** (10 minutes)
3. **Create Custom Conversions in Events Manager** (10 minutes)
4. **Launch campaign with recommended settings** (30 minutes)

## 📊 Post-Launch Monitoring

- Monitor Vercel for any errors
- Check database for lead storage
- Watch Facebook Events Manager for pixel issues
- Monitor site performance (Vercel Analytics)

## 🔥 IMPORTANT NOTES

1. **The tool is LIVE at app.firstaidforads.com** - ready for traffic
2. **All conversion tracking is coded** - just needs your Pixel ID
3. **AI qualification is working** - automatically routes to Kerry or Mark
4. **Currency detection is automatic** - based on business location

## Need Help?

- Vercel deployment issues: Check build logs in Vercel dashboard
- Pixel not firing: Use Facebook Pixel Helper extension
- Database issues: Check Neon dashboard for connection status
- AI not responding: Verify CLAUDE_API_KEY in environment variables

---

Ready to launch! Just add your tracking IDs and you're good to go! 🚀