# AI Triage Logic & Routing System

## Overview
The AI analyzes multiple data points to route users to one of 3 main outcomes:
1. **Mark's Technical Triage** (30-min call for setup/technical issues)
2. **Kerry's Conversion Service** (7-day trial for lead conversion)
3. **Landing Page Offer** (£295-495 custom landing pages)

## Data Collection Flow

### Step 1: Site Analysis (Automatic)
- **Domain & URL**
- **Pixel Detection** (found/not found, IDs)
- **Platform** (Shopify, WordPress, etc.)
- **Business Info** (type, location, currency)
- **Contact Info** (emails, phones)
- **CTA Analysis** (conversion types)

### Step 2: Qualification Questions
- **Whose website** (mine/client/competitor/testing)
- **Monthly spend** (£0/under £500/£500-2000/£2000-5000/over £5000)
- **Why not spending** (if £0)
- **Who manages ads** (myself/team/agency/boosting)
- **Pixel awareness** (didn't know/thought installed/tried couldn't/chose not)
- **Business age** (startup/new/established/mature)
- **Advertising duration** (just started/1-3mo/3-6mo/6mo+)
- **Conversions per week** (0/under 10/10-50/50+)
- **Main problem** (no sales/too expensive/learning limited/don't understand)

### Step 3: AI Analysis & Chat
- Combines all data
- Identifies priority issue
- 2-3 message conversation
- Routes to appropriate solution

## Triage Decision Tree

```
┌─────────────────────────┐
│   START: Analyze Data   │
└────────┬────────────────┘
         │
         ├─► No Pixel + Spending Money?
         │   └─► YES: **EMERGENCY** → Mark's Technical Fix
         │
         ├─► Has Pixel + Learning Limited (10-50 conv/week)?
         │   └─► YES: **Kerry's Sweet Spot** → 7-day Trial
         │
         ├─► Has Pixel + 50+ Conv/Week + £500+ Spend?
         │   └─► YES: **Perfect for Kerry** → Conversion Optimization
         │
         ├─► Pixel Issues (partial/confused)?
         │   └─► YES: **Technical** → Mark's Triage
         │
         ├─► New Business + No Foundation?
         │   └─► YES: **Setup Needed** → Mark's Foundation
         │
         └─► Mature + Still Struggling?
             └─► YES: **Complete Overhaul** → Mark's Audit
```

## The 3 Main Outcomes

### 1. Mark's Technical Triage (30-min Zoom)
**WHO GETS ROUTED HERE:**
- No pixel installed (emergency)
- Pixel partially working
- Technical tracking issues
- New businesses needing foundation
- Mature businesses needing overhaul
- Learning Limited (technical fix approach)

**WHAT MARK FIXES:**
- Pixel installation & configuration
- Conversion tracking setup
- Campaign structure problems
- Technical optimization issues
- Complete account audits

### 2. Kerry's Conversion Service (7-day Trial)
**WHO GETS ROUTED HERE:**
- Has working pixel ✓
- Spending £500+ per month ✓
- Getting FRESH leads from ads ✓
- Conversion rate is the problem
- Wants more appointments/sales from same traffic

**WHAT KERRY DELIVERS:**
- 5-15 minute response to FRESH leads
- 15-20% conversion rate (vs 2-5% average)
- 8-12 appointments per month
- Doubles conversions without increasing ad spend

### 3. Landing Page Offer
**WHO GETS ROUTED HERE:**
- No pixel + needs complete setup
- Poor landing page identified
- Wants done-for-you solution

**OPTIONS:**
- £295: Template-based proven design
- £495: Custom from scratch
- Includes targeting audit

## Priority Ranking System

### Priority 1: EMERGENCY (Route immediately)
- No pixel + spending money = Hemorrhaging cash
- **Route:** Mark's technical fix

### Priority 2: CRITICAL (Major opportunity)
- Pixel works but no conversions
- **Route:** Mark for diagnosis

### Priority 3: OPTIMIZATION (Kerry's zone)
- Learning Limited (10-50 conv/week)
- Has pixel, needs better conversion
- **Route:** Kerry's 7-day trial

### Priority 4: IMPROVEMENT
- Working but could be better
- Poor ROAS but functioning
- **Route:** Kerry for optimization

### Priority 5: EXPLORATION
- Just testing the tool
- Competitor analysis
- **Route:** Soft education, competitive insights

## Segment Classification

### HOT (Priority 1-2)
- £500-5000 monthly spend
- Self-managed or boosting only
- Clear pain point
- Ready to invest in solution

### WARM (Priority 3)
- Under £500 spend
- Tried and failed before
- Has pixel but struggling
- Needs education + solution

### COLD (Priority 4-5)
- Not spending (no budget)
- Just exploring
- Using an agency already
- Testing the tool

## AI Conversation Flow

### Message 1: Identify Issue
"Hi! I see you're spending £500-2000 on Facebook Ads. How's that working out for you?"

### Message 2: Give ONE Tip
"Learning Limited is killing your results. Quick tip: try optimizing for Add to Cart instead of Purchase."

### Message 3: Route to Solution
"This is exactly what Kerry fixes. She doubles conversions in 7 days without changing your ads. Want details?"

## Success Metrics

### Successful Routing Indicators:
- User books call/trial
- User gets specific solution for their problem
- Conversation stays under 3 messages
- No information overload

### Failed Routing Indicators:
- User abandons after first message
- AI goes into technical rabbit hole
- User confused about next step
- Wrong solution offered for problem

## Key Insights

1. **Speed is critical**: Route within 3 messages
2. **One problem at a time**: Don't overwhelm
3. **Clear next step**: Always end with specific CTA
4. **Match problem to solution**:
   - Technical → Mark
   - Conversion → Kerry
   - Complete setup → Landing page

## The Learning System

Every conversation is tracked with:
- Session ID
- All qualification data
- Messages exchanged
- Whether they booked
- Which outcome they chose

This data helps identify:
- What questions work
- Which routes convert
- Where people drop off
- Successful patterns to repeat