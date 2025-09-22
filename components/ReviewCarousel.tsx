'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  {
    id: 1,
    name: "Matthew Hopkins",
    initials: "MH",
    date: "Jul 23, 2025",
    text: "Mark has absolutely smashed it with our new ads and has been a pleasure to work with. Couldn't ask for a better experience from start to finish. Highly recommend working with him!"
  },
  {
    id: 2,
    name: "Conor Hardy",
    initials: "CH",
    date: "Jun 25, 2025",
    text: "Had an amazing experience with Mark. He was super helpful and went above and beyond to ensure we got the best possible results. Will definitely work with him again!"
  },
  {
    id: 3,
    name: "Simply Skin Liverpool",
    initials: "SS",
    date: "Jun 24, 2025",
    text: "Mark is brilliant at what he does. Our campaigns were transformed within days and we're now seeing consistent results. Couldn't be happier with the service!"
  },
  {
    id: 4,
    name: "Hada Aesthetics",
    initials: "HA",
    date: "Jun 24, 2025",
    text: "Professional, knowledgeable, and delivers on promises. Mark completely restructured our campaigns and the results speak for themselves. Highly recommended!"
  },
  {
    id: 5,
    name: "Kerry & Mark Client",
    initials: "KM",
    date: "Feb 20, 2025",
    text: "Absolutely fantastic service! Mark identified issues we didn't even know existed and fixed them quickly. Our ROI has never been better!"
  },
  {
    id: 6,
    name: "Lily Anderson",
    initials: "LA",
    date: "Sep 29, 2024",
    text: "Working with Mark was a game-changer for our business. He took the time to understand our goals and delivered beyond expectations. Truly exceptional!"
  }
]

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const getCardClass = (index: number) => {
    const diff = (index - currentIndex + reviews.length) % reviews.length
    
    if (diff === 0) return 'active'
    if (diff === 1) return 'next'
    if (diff === reviews.length - 1) return 'prev'
    return 'hidden'
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style jsx>{`
        .review-card {
          position: absolute;
          width: 450px;
          max-width: 90vw;
          height: 300px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
          cursor: pointer;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .review-card.active {
          transform: translate(-50%, -50%) translateZ(0) scale(1);
          opacity: 1;
          z-index: 10;
          border-color: var(--accent);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.2);
          background: linear-gradient(135deg, 
            rgba(26, 26, 46, 0.95) 0%, 
            rgba(22, 33, 62, 0.95) 50%, 
            rgba(15, 52, 96, 0.95) 100%);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
        }
        
        .review-card.prev {
          transform: translate(-50%, -50%) translateX(-200px) translateZ(-100px) scale(0.85);
          opacity: 0.3;
          z-index: 2;
        }
        
        .review-card.next {
          transform: translate(-50%, -50%) translateX(200px) translateZ(-100px) scale(0.85);
          opacity: 0.3;
          z-index: 2;
        }
        
        .review-card.hidden {
          transform: translate(-50%, -50%) translateZ(-200px) scale(0.7);
          opacity: 0;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .review-card {
            width: 320px;
            height: 280px;
            padding: 24px;
          }
          
          .review-card.prev {
            transform: translate(-50%, -50%) translateX(-140px) translateZ(-50px) scale(0.75);
          }
          
          .review-card.next {
            transform: translate(-50%, -50%) translateX(140px) translateZ(-50px) scale(0.75);
          }
        }

        @media (max-width: 480px) {
          .review-card {
            width: 280px;
            height: 240px;
            padding: 20px;
          }
          
          .review-card.prev {
            transform: translate(-50%, -50%) translateX(-100px) translateZ(-30px) scale(0.7);
            opacity: 0.15;
          }
          
          .review-card.next {
            transform: translate(-50%, -50%) translateX(100px) translateZ(-30px) scale(0.7);
            opacity: 0.15;
          }
        }
      `}</style>

      <div className="h-[400px] md:h-[350px] relative" style={{ perspective: '1000px' }}>
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`review-card ${getCardClass(index)}`}
            onClick={() => goToSlide(index)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-dark-400 font-bold">
                {review.initials}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{review.name}</div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-400">{review.date}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed line-clamp-5">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previous}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition z-20"
        aria-label="Previous review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition z-20"
        aria-label="Next review"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-accent' 
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}