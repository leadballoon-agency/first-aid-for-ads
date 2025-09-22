(()=>{var e={};e.id=219,e.ids=[219],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3963:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>b,originalPathname:()=>g,pages:()=>c,routeModule:()=>h,tree:()=>d});var i=s(482),a=s(9108),r=s(2563),n=s.n(r),o=s(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(t,l);let d=["",{children:["knowledge",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9266)),"/Users/marktaylor/Desktop/First-Aid-For-Ads/app/knowledge/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,269)),"/Users/marktaylor/Desktop/First-Aid-For-Ads/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9361,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/marktaylor/Desktop/First-Aid-For-Ads/app/knowledge/page.tsx"],g="/knowledge/page",b={require:s,loadChunk:()=>Promise.resolve()},h=new i.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/knowledge/page",pathname:"/knowledge",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},3638:(e,t,s)=>{Promise.resolve().then(s.bind(s,1685))},1685:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>m});var i=s(5344),a=s(7983),r=s.n(a),n=s(3729),o=s(9718),l=s(4669),d=s(783),c=s.n(d),g=s(4354);let b={"slo-strategy":{title:"S.L.O. Strategy",icon:"\uD83C\uDFAF",description:"The proven Seasoning, Laddering & Optimizing framework",articles:[{id:"slo-framework-overview",title:"The S.L.O. Framework: Your Path to Profitable Ads",readTime:"10 min",tags:["Strategy","Framework","Essential"],content:`
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
        `,relatedArticles:["pixel-seasoning-strategy","learning-phase-mastery"]},{id:"slo-implementation-guide",title:"Step-by-Step S.L.O. Implementation",readTime:"15 min",tags:["Implementation","Technical","Guide"],content:`
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
            <li>Budget: \xa350-100/day</li>
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
          Required Budget = (Target Conversions \xd7 Cost per Conversion) / 7 days
          Example: 50 conversions \xd7 \xa320 CPA = \xa31,000/week = \xa3143/day
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
        `,relatedArticles:["slo-framework-overview","conversion-tracking-setup"]},{id:"slo-calculator-tool",title:"\uD83C\uDFAF Interactive S.L.O. Calculator",readTime:"2 min",tags:["Tool","Calculator","Interactive"],content:`
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
        `,relatedArticles:["slo-framework-overview","slo-implementation-guide"]}]},"getting-started":{title:"Getting Started",icon:"\uD83D\uDE80",description:"Foundation concepts for Facebook Ads success",articles:[{id:"why-offer-first",title:"Why Your Offer Must Come Before Everything Else",readTime:"8 min",tags:["Strategy","Fundamentals"],content:`
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
            💡 <strong>Pro Tip:</strong> Before spending \xa31 on ads, get 10 people to say "yes" to your offer organically. If you can't, your ads won't work either.
          </div>
          
          <h3>The \xa3100 Offer Test</h3>
          <p>Take \xa3100 and try to get 10 people interested in your offer. If you can't convert at least 3 of them, don't scale - iterate on your offer first.</p>
          
          <h3>Why SEO Comes Last</h3>
          <p>SEO is a 6-12 month game. If your offer doesn't convert paid traffic (immediate feedback), it won't convert organic traffic either. Test with ads first, optimize for SEO later.</p>
        `,relatedArticles:["pixel-seasoning-strategy","learning-phase-mastery"]},{id:"pixel-seasoning-strategy",title:"The Art of Pixel Seasoning: From Cold to Hot",readTime:"12 min",tags:["Pixel","Technical","Strategy"],content:`
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
        `,relatedArticles:["learning-phase-mastery","conversion-tracking-setup"]},{id:"business-manager-setup",title:"Business Manager Setup: The Right Way",readTime:"15 min",tags:["Setup","Technical","Infrastructure"],content:`
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
        `,relatedArticles:["pixel-seasoning-strategy","ios-14-solutions"]}]},optimization:{title:"Campaign Optimization",icon:"⚡",description:"Advanced strategies for improving performance",articles:[{id:"learning-phase-mastery",title:"Mastering the Learning Phase",readTime:"10 min",tags:["Optimization","Strategy"],content:`
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
        `,relatedArticles:["pixel-seasoning-strategy","audience-overlap-fix"]},{id:"audience-overlap-fix",title:"Fixing Audience Overlap: Stop Your Campaigns Fighting",readTime:"8 min",tags:["Optimization","Troubleshooting"],content:`
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
        `,relatedArticles:["learning-phase-mastery","creative-testing-framework"]}]},troubleshooting:{title:"Troubleshooting",icon:"\uD83D\uDD27",description:"Solutions to common Facebook Ads problems",articles:[{id:"ios-14-solutions",title:"iOS 14.5+ Attribution: Working Around Apple's Changes",readTime:"12 min",tags:["Technical","iOS","Tracking"],content:`
          <h2>The iOS Apocalypse (And How We Survived)</h2>
          <p>Apple killed 50% of tracking. Here's how to get it back.</p>
          
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
        `,relatedArticles:["conversion-tracking-setup","pixel-seasoning-strategy"]},{id:"learning-limited-fix",title:"Stuck in Learning Limited? Here's Your Escape Plan",readTime:"10 min",tags:["Troubleshooting","Optimization"],content:`
          <h2>The Learning Limited Death Spiral</h2>
          <p>Your campaign says "Learning Limited" and performance sucks. Here's why and how to fix it.</p>
          
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
            <p>Need 50 conversions. If conversion costs \xa320, need \xa31,000/week minimum.</p>
            
            <h4>Step 2: Choose Right Optimization</h4>
            <p>Can't afford 50 purchases? Optimize for Initiate Checkout (cheaper) first.</p>
            
            <h4>Step 3: Implement Conversion Ladder</h4>
            <ol>
              <li>Week 1-2: Optimize for Add to Cart</li>
              <li>Week 3-4: Optimize for Initiate Checkout</li>
              <li>Week 5+: Optimize for Purchase</li>
            </ol>
          </div>
        `,relatedArticles:["learning-phase-mastery","pixel-seasoning-strategy"]}]},"case-studies":{title:"Case Studies",icon:"\uD83D\uDCCA",description:"Real campaign transformations and results",articles:[{id:"aesthetic-clinic-turnaround",title:"Aesthetic Clinic: From \xa3150 CAC to \xa345 in 14 Days",readTime:"8 min",tags:["Case Study","Healthcare","Success Story"],content:`
          <h2>The Situation</h2>
          <p>Liverpool aesthetic clinic burning \xa33,000/month with 20 leads. Cost per acquisition: \xa3150. They were 2 weeks from stopping ads completely.</p>
          
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
            <p>✅ Cost per lead: \xa3150 → \xa345 (-70%)</p>
            <p>✅ Monthly leads: 20 → 67 (+235%)</p>
            <p>✅ Ad spend: \xa33,000 (same budget)</p>
            <p>✅ ROI: Negative → 320% positive</p>
          </div>
        `,relatedArticles:["learning-limited-fix","pixel-seasoning-strategy"]}]}},h=e=>{let t=[];return Object.values(b).forEach(s=>{s.articles.forEach(i=>{(i.title.toLowerCase().includes(e.toLowerCase())||i.tags.some(t=>t.toLowerCase().includes(e.toLowerCase()))||i.content.toLowerCase().includes(e.toLowerCase()))&&t.push({...i,category:s.title})})}),t};function m(){let[e,t]=(0,n.useState)("getting-started"),[s,a]=(0,n.useState)(null),[d,m]=(0,n.useState)(""),[u,p]=(0,n.useState)([]),[x,f]=(0,n.useState)([]),[y,v]=(0,n.useState)([]);(0,n.useEffect)(()=>{let e=localStorage.getItem("kb-bookmarks");e&&f(JSON.parse(e));let t=localStorage.getItem("kb-read");t&&v(JSON.parse(t))},[]),(0,n.useEffect)(()=>{d.length>2?p(h(d)):p([])},[d]);let j=e=>{let t=x.includes(e)?x.filter(t=>t!==e):[...x,e];f(t),localStorage.setItem("kb-bookmarks",JSON.stringify(t)),l.default.success(x.includes(e)?"Removed from bookmarks":"Added to bookmarks")},k=e=>{if(!y.includes(e)){let t=[...y,e];v(t),localStorage.setItem("kb-read",JSON.stringify(t))}},w=e=>{a(e),k(e.id)};return(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300",children:[i.jsx(g.Z,{}),i.jsx("header",{className:"jsx-2127bc13db4b5b22 border-b border-accent/20 backdrop-blur-xl bg-dark-400/50 pt-20 pb-4",children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 container mx-auto px-4 py-4",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-2 text-sm mb-4",children:[i.jsx(c(),{href:"/",className:"text-gray-400 hover:text-accent transition",children:"Home"}),i.jsx("span",{className:"jsx-2127bc13db4b5b22 text-gray-600",children:"/"}),i.jsx("span",{className:"jsx-2127bc13db4b5b22 text-accent",children:"Knowledge Base"})]}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center justify-between",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22",children:[i.jsx("h1",{className:"jsx-2127bc13db4b5b22 text-2xl font-bold font-playfair",children:"Knowledge Base"}),i.jsx("p",{className:"jsx-2127bc13db4b5b22 text-sm text-gray-400",children:"Facebook Ads strategies, guides, and troubleshooting"})]}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 relative max-w-md flex-1 mx-8",children:[i.jsx("input",{type:"text",placeholder:"Search articles...",value:d,onChange:e=>m(e.target.value),className:"jsx-2127bc13db4b5b22 w-full px-4 py-2 bg-dark-400/50 border border-gray-600 rounded-lg focus:border-accent focus:outline-none pl-10"}),i.jsx("span",{className:"jsx-2127bc13db4b5b22 absolute left-3 top-2.5 text-gray-400",children:"\uD83D\uDD0D"}),u.length>0&&i.jsx(o.E.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},className:"absolute top-full mt-2 w-full bg-dark-100 border border-accent/30 rounded-lg shadow-xl max-h-96 overflow-y-auto",children:u.map(e=>(0,i.jsxs)("button",{onClick:()=>{w(e),m(""),p([])},className:"jsx-2127bc13db4b5b22 w-full text-left p-4 hover:bg-white/5 transition border-b border-gray-800 last:border-0",children:[i.jsx("div",{className:"jsx-2127bc13db4b5b22 font-medium",children:e.title}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 text-xs text-gray-400 mt-1",children:[e.category," • ",e.readTime]})]},e.id))})]}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-4",children:[(0,i.jsxs)("button",{className:"jsx-2127bc13db4b5b22 text-sm text-gray-400 hover:text-accent transition",children:["\uD83D\uDCDA ",y.length," read"]}),(0,i.jsxs)("button",{className:"jsx-2127bc13db4b5b22 text-sm text-gray-400 hover:text-accent transition",children:["⭐ ",x.length," saved"]})]})]})]})}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 container mx-auto px-4 py-8",children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 grid lg:grid-cols-4 gap-8",children:[i.jsx("aside",{className:"jsx-2127bc13db4b5b22 lg:col-span-1",children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 glass-card p-6 sticky top-24",children:[i.jsx("h2",{className:"jsx-2127bc13db4b5b22 text-lg font-semibold mb-4",children:"Categories"}),i.jsx("nav",{className:"jsx-2127bc13db4b5b22 space-y-2",children:Object.entries(b).map(([s,r])=>i.jsx("button",{onClick:()=>{t(s),a(null)},className:`jsx-2127bc13db4b5b22 w-full text-left p-3 rounded-lg transition-all ${e===s?"bg-accent/20 border-l-4 border-accent":"hover:bg-white/5"}`,children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-3",children:[i.jsx("span",{className:"jsx-2127bc13db4b5b22 text-2xl",children:r.icon}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22",children:[i.jsx("p",{className:"jsx-2127bc13db4b5b22 font-medium",children:r.title}),(0,i.jsxs)("p",{className:"jsx-2127bc13db4b5b22 text-xs text-gray-400",children:[r.articles.length," articles"]})]})]})},s))}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 mt-6 pt-6 border-t border-gray-700",children:[i.jsx("h3",{className:"jsx-2127bc13db4b5b22 text-sm font-semibold mb-3 text-gray-400",children:"Your Progress"}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 space-y-2",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex justify-between text-sm",children:[i.jsx("span",{className:"jsx-2127bc13db4b5b22",children:"Articles Read"}),(0,i.jsxs)("span",{className:"jsx-2127bc13db4b5b22 font-bold gradient-text",children:[y.length,"/",Object.values(b).reduce((e,t)=>e+t.articles.length,0)]})]}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 h-2 bg-white/10 rounded-full overflow-hidden",children:i.jsx("div",{style:{width:`${y.length/Object.values(b).reduce((e,t)=>e+t.articles.length,0)*100}%`},className:"jsx-2127bc13db4b5b22 h-full bg-gradient-to-r from-accent to-accent-light transition-all"})})]})]})]})}),i.jsx("main",{className:"jsx-2127bc13db4b5b22 lg:col-span-3",children:s?(0,i.jsxs)(o.E.div,{initial:{opacity:0},animate:{opacity:1},className:"glass-card p-8",children:[(0,i.jsxs)("button",{onClick:()=>a(null),className:"jsx-2127bc13db4b5b22 mb-4 text-accent hover:text-accent-light transition",children:["← Back to ",b[e].title]}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-start justify-between mb-6",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22",children:[i.jsx("h1",{className:"jsx-2127bc13db4b5b22 text-3xl font-bold font-playfair mb-2",children:s.title}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-4 text-sm text-gray-400",children:[(0,i.jsxs)("span",{className:"jsx-2127bc13db4b5b22",children:["\uD83D\uDCD6 ",s.readTime]}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 flex gap-2",children:s.tags.map(e=>i.jsx("span",{className:"jsx-2127bc13db4b5b22 px-2 py-1 bg-white/5 rounded",children:e},e))})]})]}),i.jsx("button",{onClick:()=>j(s.id),className:"jsx-2127bc13db4b5b22 text-3xl hover:scale-110 transition",children:x.includes(s.id)?"⭐":"☆"})]}),i.jsx("div",{dangerouslySetInnerHTML:{__html:s.content},style:{"--tw-prose-body":"rgb(229, 231, 235)","--tw-prose-headings":"rgb(255, 255, 255)","--tw-prose-links":"#00ff88","--tw-prose-bold":"rgb(255, 255, 255)","--tw-prose-code":"#00ff88"},className:"jsx-2127bc13db4b5b22 prose prose-invert max-w-none"}),s.relatedArticles&&s.relatedArticles.length>0&&(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 mt-12 pt-8 border-t border-gray-700",children:[i.jsx("h3",{className:"jsx-2127bc13db4b5b22 text-xl font-semibold mb-4",children:"Related Articles"}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 grid gap-3",children:s.relatedArticles.map(e=>{let t=Object.values(b).flatMap(e=>e.articles).find(t=>t.id===e);return t?(0,i.jsxs)("button",{onClick:()=>w(t),className:"jsx-2127bc13db4b5b22 text-left p-4 bg-white/5 rounded-lg hover:bg-white/10 transition",children:[i.jsx("div",{className:"jsx-2127bc13db4b5b22 font-medium",children:t.title}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 text-sm text-gray-400 mt-1",children:[t.readTime," • ",t.tags.join(", ")]})]},e):null})})]})]}):(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 space-y-6",children:[i.jsx("div",{className:"jsx-2127bc13db4b5b22 glass-card p-8",children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-4 mb-4",children:[i.jsx("span",{className:"jsx-2127bc13db4b5b22 text-4xl",children:b[e].icon}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22",children:[i.jsx("h2",{className:"jsx-2127bc13db4b5b22 text-3xl font-bold font-playfair",children:b[e].title}),i.jsx("p",{className:"jsx-2127bc13db4b5b22 text-gray-400",children:b[e].description})]})]})}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 grid gap-4",children:b[e].articles.map(e=>i.jsx(o.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"glass-card p-6 cursor-pointer hover:border-accent/40 transition-all",onClick:()=>w(e),children:(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-start justify-between",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex-1",children:[(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-2 mb-2",children:[y.includes(e.id)&&i.jsx("span",{className:"jsx-2127bc13db4b5b22 text-green-400 text-sm",children:"✓"}),i.jsx("h3",{className:"jsx-2127bc13db4b5b22 text-xl font-semibold",children:e.title})]}),(0,i.jsxs)("div",{className:"jsx-2127bc13db4b5b22 flex items-center gap-4 mb-3 text-sm text-gray-400",children:[(0,i.jsxs)("span",{className:"jsx-2127bc13db4b5b22",children:["\uD83D\uDCD6 ",e.readTime]}),i.jsx("div",{className:"jsx-2127bc13db4b5b22 flex gap-2",children:e.tags.map(e=>i.jsx("span",{className:"jsx-2127bc13db4b5b22 px-2 py-1 bg-white/5 rounded text-xs",children:e},e))})]}),(0,i.jsxs)("p",{className:"jsx-2127bc13db4b5b22 text-gray-400 line-clamp-2",children:[e.content.replace(/<[^>]*>/g,"").substring(0,150),"..."]})]}),i.jsx("button",{onClick:t=>{t.stopPropagation(),j(e.id)},className:"jsx-2127bc13db4b5b22 ml-4 text-2xl hover:scale-110 transition",children:x.includes(e.id)?"⭐":"☆"})]})},e.id))})]})})]})}),i.jsx(r(),{id:"2127bc13db4b5b22",children:".prose h2{color:white;font-size:1.8rem;margin-top:2rem;margin-bottom:1rem}.prose h3{color:#0f8;font-size:1.4rem;margin-top:1.5rem;margin-bottom:.75rem}.prose h4{color:white;font-size:1.2rem;margin-top:1rem;margin-bottom:.5rem}.prose p{margin-bottom:1rem;line-height:1.7}.prose ul,.prose ol{margin-bottom:1rem;padding-left:1.5rem}.prose li{margin-bottom:.5rem}.prose strong{color:white;font-weight:600}.tip{background:rgba(0,255,136,.1);border-left:4px solid#0f8;padding:1rem;margin:1.5rem 0;-webkit-border-radius:.5rem;-moz-border-radius:.5rem;border-radius:.5rem}.warning{background:rgba(255,153,68,.1);border-left:4px solid#f94;padding:1rem;margin:1.5rem 0;-webkit-border-radius:.5rem;-moz-border-radius:.5rem;border-radius:.5rem}.strategy-box{background:rgba(255,255,255,.05);border:1px solid rgba(0,255,136,.3);padding:1.5rem;margin:1.5rem 0;-webkit-border-radius:.75rem;-moz-border-radius:.75rem;border-radius:.75rem}.results-box{background:-webkit-linear-gradient(315deg,rgba(0,255,136,.1),rgba(0,255,136,.05));background:-moz-linear-gradient(315deg,rgba(0,255,136,.1),rgba(0,255,136,.05));background:-o-linear-gradient(315deg,rgba(0,255,136,.1),rgba(0,255,136,.05));background:linear-gradient(135deg,rgba(0,255,136,.1),rgba(0,255,136,.05));border:2px solid#0f8;padding:1.5rem;margin:1.5rem 0;-webkit-border-radius:.75rem;-moz-border-radius:.75rem;border-radius:.75rem}"})]})}},4354:(e,t,s)=>{"use strict";s.d(t,{Z:()=>b});var i=s(5344),a=s(783),r=s.n(a),n=s(2254),o=s(3729),l=s(4669),d=s(3644),c=s(9718);function g({isOpen:e,onClose:t,title:s="Book Your FREE 30-Minute Diagnostic Call",subtitle:a="Select your preferred time and date",calendarUrl:r="https://link.leadballoon.co.uk/widget/bookings/zoomwithmarkjw5z6g"}){let[n,g]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{let s=localStorage.getItem("assessmentCompleted");g(!!s),e&&!s&&(l.default.error("Please complete the assessment first to unlock your free diagnostic call!",{icon:"\uD83D\uDD12",duration:4e3}),t())},[e,t]),(0,o.useEffect)(()=>{let s=s=>{"Escape"===s.key&&e&&t()};return e&&(document.addEventListener("keydown",s),document.body.style.overflow="hidden"),()=>{document.removeEventListener("keydown",s),document.body.style.overflow="unset"}},[e,t]),i.jsx(d.M,{children:e&&n&&(0,i.jsxs)("div",{className:"fixed inset-0 z-[100] flex items-center justify-center",children:[i.jsx(c.E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:t,className:"absolute inset-0 bg-black/80 backdrop-blur-sm"}),i.jsx(c.E.div,{initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},className:"relative z-10 w-[90vw] max-w-4xl h-[85vh] max-h-[700px]",children:(0,i.jsxs)("div",{className:"glass-card p-6 md:p-8 h-full flex flex-col",children:[i.jsx("button",{onClick:t,className:"absolute top-4 right-4 text-3xl text-gray-400 hover:text-white transition","aria-label":"Close booking",children:"\xd7"}),(0,i.jsxs)("div",{className:"text-center mb-6",children:[i.jsx("h3",{className:"text-2xl md:text-3xl font-bold font-playfair mb-2",children:s}),i.jsx("p",{className:"text-gray-400",children:a})]}),i.jsx("div",{className:"flex-1 rounded-xl overflow-hidden bg-white/5",children:i.jsx("iframe",{src:r,className:"w-full h-full min-h-[500px]",frameBorder:"0",title:"Booking Calendar"})})]})})]})})}function b(){let e=(0,n.usePathname)(),[t,s]=(0,o.useState)(!1),[a,b]=(0,o.useState)("/"!==e),[h,m]=(0,o.useState)(0),[u,p]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{s(!!localStorage.getItem("assessmentCompleted")),b("/"!==e)},[e]),(0,o.useEffect)(()=>{let t=()=>{let t=window.scrollY;"/"===e?t>100?b(!0):0===t&&b(!1):b(!0),m(t)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[h,e]),(0,i.jsxs)(i.Fragment,{children:[i.jsx(d.M,{children:a&&(0,i.jsxs)(c.E.nav,{initial:{y:-100,opacity:0},animate:{y:0,opacity:1},exit:{y:-100,opacity:0},transition:{duration:.3,ease:"easeInOut"},className:"fixed top-0 left-0 right-0 z-50",children:[i.jsx("div",{className:"absolute inset-0 bg-dark-400/40 backdrop-blur-xl border-b border-white/10"}),i.jsx("div",{className:"relative container mx-auto px-4 py-3 md:py-4",children:(0,i.jsxs)("div",{className:"flex items-center justify-between",children:[i.jsx(r(),{href:"/",className:"flex items-center gap-2 hover:opacity-80 transition",children:i.jsx("img",{src:"/images/logo/Light background logo.png",alt:"First Aid For Ads",className:"h-8 md:h-10 w-auto"})}),(0,i.jsxs)("div",{className:"hidden md:flex items-center gap-6",children:[i.jsx(r(),{href:"/",className:`text-sm transition ${"/"===e?"text-accent font-semibold":"text-gray-300 hover:text-accent"}`,children:"Assessment"}),i.jsx(r(),{href:"/knowledge",className:`text-sm transition ${"/knowledge"===e?"text-accent font-semibold":"text-gray-300 hover:text-accent"}`,children:"Knowledge Base"}),(0,i.jsxs)(r(),{href:"/learn",onClick:e=>{t||(e.preventDefault(),l.default.error("Complete the assessment first to unlock the Learning Center!",{icon:"\uD83D\uDD12",duration:3e3}))},className:`text-sm transition flex items-center gap-1 ${"/learn"===e?"text-accent font-semibold":t?"text-gray-300 hover:text-accent":"text-gray-500 cursor-not-allowed"}`,children:["Learning Center",!t&&i.jsx("span",{className:"text-xs",children:"\uD83D\uDD12"})]}),i.jsx(r(),{href:"/admin",className:`text-sm transition ${"/admin"===e?"text-accent font-semibold":"text-gray-300 hover:text-accent"}`,children:"Admin"}),i.jsx("button",{onClick:()=>{if(t)p(!0);else if("/"===e){let e=document.getElementById("assessment-start");e&&(e.scrollIntoView({behavior:"smooth",block:"center"}),(0,l.default)("Complete the assessment to unlock your free diagnostic call!",{icon:"\uD83D\uDC47",duration:4e3,position:"top-center",style:{background:"#1f2937",color:"#fff",border:"1px solid #00ff88"}}))}else window.location.href="/#assessment-start",(0,l.default)("Complete the assessment first!",{icon:"\uD83D\uDC47",duration:4e3,position:"top-center"})},className:`text-sm px-4 py-2 transition ${t?"btn-primary":"bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30"}`,children:t?"Book Free Call":"Start Assessment First"})]}),i.jsx("button",{className:"md:hidden text-accent",children:i.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]})})]})}),i.jsx(g,{isOpen:u,onClose:()=>p(!1)})]})}},9266:(e,t,s)=>{"use strict";s.r(t),s.d(t,{$$typeof:()=>r,__esModule:()=>a,default:()=>n});let i=(0,s(6843).createProxy)(String.raw`/Users/marktaylor/Desktop/First-Aid-For-Ads/app/knowledge/page.tsx`),{__esModule:a,$$typeof:r}=i,n=i.default}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),i=t.X(0,[638,659,695,895],()=>s(3963));module.exports=i})();