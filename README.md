# First Aid for Ads - World-Class Facebook Ads Platform

## 🚀 Overview

A cutting-edge, mobile-first platform for diagnosing and fixing Facebook Ads campaigns. Features an innovative assessment tool, educational content system, pixel seasoning tracker, and admin dashboard.

## ✨ Key Features

### 1. **Innovative Assessment Tool**
- Interactive diagnostic system that identifies campaign issues
- Personalized recommendations based on assessment results
- Real-time health score calculation
- Dynamic package recommendations

### 2. **Educational Learning Center**
- Interactive modules teaching Facebook Ads mastery
- Topics include:
  - Why proven offers come before SEO/Ads
  - How to season Facebook pixels strategically
  - Using assessments as conversion events
  - Campaign optimization strategies
- Progress tracking and gamification
- Quiz system with instant feedback

### 3. **Pixel Seasoning Tracker**
- Real-time event monitoring
- Visual progress toward 50-conversion goal
- Strategic guidance for exiting learning phase
- Integration with assessment completions

### 4. **Database Persistence**
- PostgreSQL database for all user data
- Assessment history tracking
- Learning progress storage
- Campaign performance metrics

### 5. **Admin Dashboard** (Coming Soon)
- User management
- Assessment analytics
- Conversion tracking
- Campaign performance monitoring

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/first-aid-for-ads.git
cd first-aid-for-ads
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

5. Push database schema:
```bash
npx prisma db push
```

6. Run development server:
```bash
npm run dev
```

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit - World-class Facebook Ads platform"
git branch -M main
git remote add origin https://github.com/yourusername/first-aid-for-ads.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL

### Step 3: Set up Database

Vercel Postgres (Recommended):
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Storage" tab
4. Create a new Postgres database
5. Copy the connection string to `DATABASE_URL`

Alternative - Supabase:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings > Database

### Step 4: Initialize Database

After deployment, run:
```bash
npx prisma db push
```

## 🎯 Strategic Implementation

### Pixel Seasoning Strategy

The platform uses assessment completions as conversion events to season pixels:

1. **Week 1-2**: Drive traffic to free assessment
2. **Track Events**:
   - `StartAssessment` - Micro-conversion
   - `CompleteAssessment` - Standard event
   - `ViewEducationalContent` - Engagement
3. **Exit Learning Phase**: Achieve 50+ events quickly
4. **Retarget**: Create audiences from assessment takers

### Educational Flow

Users learn why fundamentals matter before tactics:
1. **Offer Development** → 2. **Pixel Setup** → 3. **Campaign Structure** → 4. **Optimization**

## 📊 Database Schema

Key models:
- `User` - Platform users
- `Assessment` - Diagnostic results
- `PixelEvent` - Conversion tracking
- `Campaign` - User campaigns
- `LearningProgress` - Educational progress
- `LearningModule` - Course content

## 🔒 Security

- Server-side rendering for sensitive data
- Secure authentication with NextAuth
- Input validation and sanitization
- HTTPS enforced in production
- Rate limiting on API endpoints

## 📈 Analytics & Tracking

The platform tracks:
- Assessment completions
- Learning module progress
- Pixel event conversions
- Campaign performance metrics
- User engagement patterns

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Proprietary - All Rights Reserved

## 🆘 Support

For support, email hello@firstaidforads.com

## 🎉 Next Steps

After deployment:
1. Configure custom domain in Vercel
2. Set up Google Analytics
3. Install Facebook Pixel
4. Configure email notifications
5. Create initial learning content
6. Test assessment flow end-to-end

---

Built with ❤️ for Facebook Advertisers who want to stop bleeding money and start converting.