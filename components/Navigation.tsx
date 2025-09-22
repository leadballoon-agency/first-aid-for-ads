'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import BookingModal from './BookingModal'

export default function Navigation() {
  const pathname = usePathname()
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false)
  // Navigation should always be visible on pages other than home
  const [isVisible, setIsVisible] = useState(pathname !== '/')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    // Check if assessment has been completed
    const assessmentData = localStorage.getItem('assessmentCompleted')
    setHasCompletedAssessment(!!assessmentData)
    
    // Set visibility based on pathname
    setIsVisible(pathname !== '/')
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // On home page, show/hide based on scroll
      if (pathname === '/') {
        // Show nav when scrolling down past 100px
        if (currentScrollY > 100) {
          setIsVisible(true)
        } else if (currentScrollY === 0) {
          // Hide when at the very top
          setIsVisible(false)
        }
      } else {
        // On other pages, always show nav
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, pathname])

  const handleLearningCenterClick = (e: React.MouseEvent) => {
    if (!hasCompletedAssessment) {
      e.preventDefault()
      toast.error('Complete the assessment first to unlock the Learning Center!', {
        icon: '🔒',
        duration: 3000,
      })
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-dark-400/40 backdrop-blur-xl border-b border-white/10" />
            
            {/* Content */}
            <div className="relative container mx-auto px-4 py-3 md:py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                  <img 
                    src="/images/logo/Light background logo.png" 
                    alt="First Aid For Ads" 
                    className="h-8 md:h-10 w-auto"
                  />
                </Link>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                  <Link 
                    href="/"
                    className={`text-sm transition ${
                      pathname === '/' ? 'text-accent font-semibold' : 'text-gray-300 hover:text-accent'
                    }`}
                  >
                    Assessment
                  </Link>
                  
                  <Link 
                    href="/knowledge"
                    className={`text-sm transition ${
                      pathname === '/knowledge' ? 'text-accent font-semibold' : 'text-gray-300 hover:text-accent'
                    }`}
                  >
                    Knowledge Base
                  </Link>
                  
                  <Link 
                    href="/learn"
                    onClick={handleLearningCenterClick}
                    className={`text-sm transition flex items-center gap-1 ${
                      pathname === '/learn' ? 'text-accent font-semibold' : 
                      hasCompletedAssessment ? 'text-gray-300 hover:text-accent' : 'text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Learning Center
                    {!hasCompletedAssessment && (
                      <span className="text-xs">🔒</span>
                    )}
                  </Link>
                  
                  <Link 
                    href="/admin"
                    className={`text-sm transition ${
                      pathname === '/admin' ? 'text-accent font-semibold' : 'text-gray-300 hover:text-accent'
                    }`}
                  >
                    Admin
                  </Link>
                  
                  <button 
                    onClick={() => {
                      if (!hasCompletedAssessment) {
                        // Scroll to assessment on home page
                        if (pathname === '/') {
                          const assessmentSection = document.getElementById('assessment-start')
                          if (assessmentSection) {
                            assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            toast('Complete the assessment to unlock your free diagnostic call!', {
                              icon: '👇',
                              duration: 4000,
                              position: 'top-center',
                              style: {
                                background: '#1f2937',
                                color: '#fff',
                                border: '1px solid #00ff88',
                              }
                            })
                          }
                        } else {
                          // Navigate to home page
                          window.location.href = '/#assessment-start'
                          toast('Complete the assessment first!', {
                            icon: '👇',
                            duration: 4000,
                            position: 'top-center'
                          })
                        }
                      } else {
                        setShowBookingModal(true)
                      }
                    }}
                    className={`text-sm px-4 py-2 transition ${
                      hasCompletedAssessment 
                        ? 'btn-primary' 
                        : 'bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30'
                    }`}
                  >
                    {hasCompletedAssessment ? 'Book Free Call' : 'Start Assessment First'}
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  )
}