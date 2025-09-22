'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  calendarUrl?: string
}

export default function BookingModal({ 
  isOpen, 
  onClose, 
  title = "Book Your FREE 30-Minute Diagnostic Call",
  subtitle = "Select your preferred time and date",
  calendarUrl = "https://link.leadballoon.co.uk/widget/bookings/zoomwithmarkjw5z6g"
}: BookingModalProps) {
  const [hasAssessment, setHasAssessment] = useState(false)
  
  useEffect(() => {
    // Check if assessment is completed
    const assessmentData = localStorage.getItem('assessmentCompleted')
    setHasAssessment(!!assessmentData)
    
    // If modal opens without assessment, show error and close
    if (isOpen && !assessmentData) {
      toast.error('Please complete the assessment first to unlock your free diagnostic call!', {
        icon: '🔒',
        duration: 4000,
      })
      onClose()
    }
  }, [isOpen, onClose])
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && hasAssessment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-[90vw] max-w-4xl h-[85vh] max-h-[700px]"
          >
            <div className="glass-card p-6 md:p-8 h-full flex flex-col">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white transition"
                aria-label="Close booking"
              >
                ×
              </button>
              
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
                  {title}
                </h3>
                <p className="text-gray-400">
                  {subtitle}
                </p>
              </div>
              
              {/* Calendar iframe */}
              <div className="flex-1 rounded-xl overflow-hidden bg-white/5">
                <iframe
                  src={calendarUrl}
                  className="w-full h-full min-h-[500px]"
                  frameBorder="0"
                  title="Booking Calendar"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}