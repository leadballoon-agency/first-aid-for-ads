'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-200 to-dark-300">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-sm text-gray-400 mb-8">Effective Date: 23 June 2025</p>

            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-300">
                  By accessing and using the First Aid for Ads website and services, you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Services Provided</h2>
                <p className="text-gray-300">
                  First Aid for Ads provides Facebook advertising consultation, campaign optimization, and business 
                  infrastructure setup services. Our services include:
                </p>
                <ul className="space-y-2 text-gray-300 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Campaign health diagnostics and assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Facebook Business Manager setup and optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Pixel implementation and tracking setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Campaign structure optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Lead Balloon Platform access and setup</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
                <p className="text-gray-300">You agree to:</p>
                <ul className="space-y-2 text-gray-300 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Maintain the security of your account credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Comply with all applicable laws and Facebook's terms of service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Not use our services for any illegal or unauthorized purpose</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Payment Terms</h2>
                <p className="text-gray-300">
                  Services are provided on a one-time setup fee plus monthly subscription basis:
                </p>
                <ul className="space-y-2 text-gray-300 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Setup fees are due upon service commencement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Monthly platform fees are billed in advance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>All fees are non-refundable unless otherwise stated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Prices are subject to change with 30 days notice</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-300">
                  All content, materials, and intellectual property on this website and in our services remain the 
                  property of First Aid for Ads. You may not reproduce, distribute, or create derivative works 
                  without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Disclaimers</h2>
                <p className="text-gray-300">
                  Our services are provided "as is" without warranties of any kind. We do not guarantee specific 
                  results from Facebook advertising campaigns. Success depends on many factors beyond our control, 
                  including your product, market, budget, and creative assets.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-300">
                  First Aid for Ads shall not be liable for any indirect, incidental, special, consequential, or 
                  punitive damages resulting from your use or inability to use our services. Our total liability 
                  shall not exceed the amount paid by you for the services in the past 3 months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">8. Termination</h2>
                <p className="text-gray-300">
                  Either party may terminate the service agreement with 30 days written notice. We reserve the right 
                  to terminate immediately for violation of these terms or non-payment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">9. Confidentiality</h2>
                <p className="text-gray-300">
                  Both parties agree to maintain the confidentiality of any proprietary information shared during 
                  the course of service delivery. This obligation survives termination of the agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">10. Indemnification</h2>
                <p className="text-gray-300">
                  You agree to indemnify and hold harmless First Aid for Ads from any claims, damages, or expenses 
                  arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">11. Governing Law</h2>
                <p className="text-gray-300">
                  These terms shall be governed by the laws of the United Kingdom. Any disputes shall be resolved 
                  in the courts of England and Wales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right to modify these terms at any time. Changes will be effective upon posting 
                  to this page with an updated effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Information</h2>
                <div className="bg-dark-400/50 rounded-lg p-4">
                  <p className="text-gray-300">
                    First Aid for Ads<br />
                    197 Peterborough Road<br />
                    Farcet, PE7 3BW<br />
                    United Kingdom<br /><br />
                    Email: <a href="mailto:support@firstaidforads.com" className="text-accent hover:text-accent-light">
                      support@firstaidforads.com
                    </a><br />
                    Phone: <a href="tel:01223752200" className="text-accent hover:text-accent-light">01223 752200</a>
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <Link href="/" className="text-accent hover:text-accent-light inline-flex items-center gap-2">
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}