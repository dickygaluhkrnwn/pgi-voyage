'use client';

import { ShieldCheck, Lock, FileText, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 4, 2026";

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a] to-[#0b1728]"></div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B88E52]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#B88E52] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4" />
            Legal Document
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
            Privacy <span className="italic font-serif text-[#B88E52] font-medium">Policy</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            We are committed to protecting your privacy and personal information. Learn how we collect, use, and safeguard your data.
          </motion.p>
        </motion.div>
      </section>

      {/* CONTENT SECTION */}
      <section className="px-6 lg:px-12 mt-[-60px] relative z-20 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_50px_rgba(17,34,58,0.05)] border border-gray-100"
          >
            <div className="mb-12 pb-8 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500 font-medium">Last Updated: <span className="text-[#11223a]">{lastUpdated}</span></p>
              <Lock className="w-5 h-5 text-gray-300" />
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="lead text-xl text-[#11223a] mb-8 leading-relaxed">
                At <strong>PGI Voyage</strong>, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website, make a booking, or use our services.
                <br /><br />
                By accessing our website and using our services, you agree to the terms of this Privacy Policy.
              </p>

              <div className="space-y-12">
                
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">1</span>
                    Information We Collect
                  </h2>
                  <p className="mb-4">We may collect the following types of information to provide and improve our services:</p>
                  <ul className="space-y-4">
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <strong className="text-[#11223a] block mb-1">Personal Information</strong>
                      This may include your name, email address, phone number, billing details, and payment information when you make a reservation or contact our team.
                    </li>
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <strong className="text-[#11223a] block mb-1">Booking Information</strong>
                      This may include your travel dates, selected package, number of guests, cabin preferences, special requests, and trip-related details.
                    </li>
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <strong className="text-[#11223a] block mb-1">Technical Data</strong>
                      We may collect technical information such as your IP address, browser type, device type, pages visited, and browsing behavior on our website.
                    </li>
                    <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <strong className="text-[#11223a] block mb-1">Cookies and Tracking Technologies</strong>
                      We may use cookies to improve user experience, analyze website traffic, remember preferences, and personalize content.
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">2</span>
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Process bookings and payments</li>
                    <li>Communicate with you about your reservation</li>
                    <li>Provide customer support</li>
                    <li>Improve our website, services, and customer experience</li>
                    <li>Send promotional offers or newsletters with your consent</li>
                    <li>Prevent fraud and protect website security</li>
                    <li>Comply with legal or regulatory obligations</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">3</span>
                    How We Share Your Information
                  </h2>
                  <p className="mb-4">We do not sell, rent, or trade your personal information. However, we may share your data with trusted third parties when necessary, including:</p>
                  <ul className="space-y-4">
                    <li>
                      <strong className="text-[#11223a]">Service Providers:</strong> Such as payment processors, booking systems, customer support tools, email services, and marketing partners that help us operate our services.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Legal Compliance:</strong> We may disclose your information if required by law, regulation, legal process, or government authority.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Business Transfers:</strong> If our business is involved in a merger, acquisition, sale, or transfer of assets, your information may be transferred as part of that transaction.
                    </li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">4</span>
                    Data Security
                  </h2>
                  <p>
                    We take reasonable steps to protect your personal information from unauthorized access, loss, misuse, or disclosure. However, no method of data transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security, and we encourage users to take appropriate precautions when using our website.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">5</span>
                    Your Rights and Choices
                  </h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                    <li>Access your personal information</li>
                    <li>Request correction or updates to your data</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt out of promotional emails</li>
                    <li>Disable cookies through your browser settings</li>
                  </ul>
                  <p>For privacy-related requests, please contact us through the official contact information provided on our website.</p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">6</span>
                    Third-Party Links
                  </h2>
                  <p>
                    Our website may contain links to third-party websites, booking platforms, payment providers, or travel-related services. We are not responsible for the privacy practices, content, or security of third-party websites. We recommend reviewing their privacy policies before providing any personal information.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">7</span>
                    Cookies Policy
                  </h2>
                  <p className="mb-4">
                    Cookies are small files stored on your device to help improve website functionality and user experience. We may use cookies to:
                  </p>
                  <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                    <li>Remember user preferences</li>
                    <li>Analyze website traffic</li>
                    <li>Improve website performance</li>
                    <li>Support marketing and advertising activities</li>
                  </ul>
                  <p>
                    You can choose to disable cookies through your browser settings. However, some website features may not function properly if cookies are disabled.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">8</span>
                    Data Retention
                  </h2>
                  <p>
                    We retain your personal information only as long as necessary to provide our services, complete bookings, comply with legal obligations, resolve disputes, and maintain business records. When your information is no longer needed, we will take reasonable steps to delete or securely store it.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#B88E52]/10 text-[#B88E52] text-sm">9</span>
                    Changes to This Privacy Policy
                  </h2>
                  <p>
                    PGI Voyage may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. We encourage visitors to review this page regularly to stay informed about how we protect personal information.
                  </p>
                </div>

                {/* Section 10 */}
                <div className="bg-[#fdfaf5] p-8 rounded-2xl border border-[#B88E52]/20 mt-12">
                  <h2 className="text-2xl font-bold text-[#11223a] mb-4 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#B88E52]" />
                    Contact Us
                  </h2>
                  <p>
                    If you have any questions about this Privacy Policy or how your personal information is handled, please contact us through the official contact details provided on our website.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}