import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import FeedbackWidget from '@/components/FeedbackWidget'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'First Aid for Ads - Fix Your Facebook Campaign Issues',
  description: 'Diagnose and fix the 3 hidden campaign killers destroying your Facebook Ads. Get your FREE personalized diagnostic report.',
  keywords: 'Facebook ads, Meta ads, campaign optimization, pixel seasoning, ad management',
  openGraph: {
    title: 'First Aid for Ads - Fix Your Facebook Campaign Issues',
    description: 'Free diagnostic audit reveals the 3 hidden issues destroying your campaigns',
    images: ['https://storage.googleapis.com/msgsndr/WXMZ5ZnDrPRrT8ownPH8/media/6876b28383bdceb5360e5ce7.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
        <FeedbackWidget />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              padding: '12px 16px',
              fontSize: '14px',
              maxWidth: '90vw',
              marginTop: '70px', // Below fixed navigation
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#00ff88',
                secondary: '#1f2937',
              },
              style: {
                border: '1px solid rgba(0, 255, 136, 0.5)',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1f2937',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.5)',
              },
            },
          }}
        />
      </body>
    </html>
  )
}