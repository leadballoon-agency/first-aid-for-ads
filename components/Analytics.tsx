'use client'

import Script from 'next/script'

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}

// Helper functions to track events
export const trackEvent = (eventName: string, parameters?: any) => {
  // Google Analytics Event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }

  // Facebook Pixel Event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters)
  }
}

export const trackLead = (value?: number, currency?: string) => {
  trackEvent('Lead', {
    value: value,
    currency: currency || 'GBP'
  })
}

export const trackStartAssessment = () => {
  trackEvent('InitiateCheckout')
}

export const trackCompleteAssessment = () => {
  trackEvent('CompleteRegistration')
}