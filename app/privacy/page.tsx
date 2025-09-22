'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function PrivacyPage() {
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-sm text-gray-400 mb-8">Effective Date: 23 June 2025</p>

            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <p className="text-gray-300 leading-relaxed">
                  At First Aid for Ads, we are committed to protecting your privacy and ensuring your personal 
                  information is handled in a safe and responsible manner. This policy outlines how we collect, 
                  use, and protect your data when you visit our website, submit a form, or interact with our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Who We Are</h2>
                <p className="text-gray-300">This website is operated by First Aid for Ads. Our registered business address is:</p>
                <div className="bg-dark-400/50 rounded-lg p-4 my-4">
                  <p className="text-gray-300">
                    197 Peterborough Road<br />
                    Farcet<br />
                    PE7 3BW<br />
                    United Kingdom
                  </p>
                  <p className="text-gray-300 mt-3">
                    Phone: <a href="tel:01223752200" className="text-accent hover:text-accent-light">01223 752200</a><br />
                    Website: <Link href="/" className="text-accent hover:text-accent-light">firstaidforads.com</Link>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Business name and website URL (if submitted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>IP address and browser/device details (via tracking tools)</span>
                  </li>
                </ul>
                <p className="text-gray-300 mt-4">
                  We do not collect sensitive personal data such as health information or payment details via this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Data</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Respond to your enquiries or requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Send follow-up communications by email, SMS or phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Customise and improve our website and marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Track ad performance (via Meta Pixel and Google Analytics)</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">4. Legal Basis for Processing (GDPR)</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Consent</strong> – when you voluntarily provide your details via a form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Legitimate interest</strong> – to follow up on your request or improve our services</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">5. Cookies & Tracking Technologies</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Meta Pixel</strong> – to track interactions with our Facebook and Instagram ads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Google Analytics</strong> – to understand website performance and user behaviour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>CRM and email tools</strong> – to manage your enquiry and follow-up</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">6. Data Sharing</h2>
                <p className="text-gray-300">
                  We do not sell or rent your personal data to third parties.
                </p>
                <p className="text-gray-300 mt-3">
                  We may share your data with trusted service providers that help us operate our website, CRM, 
                  and communications (e.g., hosting platforms, email tools, automation systems).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
                <p className="text-gray-300">
                  We use appropriate technical and organisational measures to safeguard your data. However, 
                  no internet transmission is 100% secure. You provide your data at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">8. Data Retention</h2>
                <p className="text-gray-300">
                  We retain your data for as long as necessary to fulfil the purposes we collected it for, 
                  including legal, accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">9. Your Rights</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Access the personal data we hold about you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Request correction or deletion of your data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Withdraw consent at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Object to processing based on legitimate interest</span>
                  </li>
                </ul>
                <p className="text-gray-300 mt-3">
                  Email us at <a href="mailto:support@firstaidforads.com" className="text-accent hover:text-accent-light">
                    support@firstaidforads.com
                  </a> to exercise these rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">10. Third-Party Links</h2>
                <p className="text-gray-300">
                  Our website may include links to other sites. We are not responsible for their privacy practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-300">
                  We may update this Privacy Policy from time to time. The updated version will be posted on this 
                  page with a revised effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Us</h2>
                <div className="bg-dark-400/50 rounded-lg p-4">
                  <p className="text-gray-300">
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