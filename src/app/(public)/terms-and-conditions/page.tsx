'use client';

import { ShieldCheck, FileText, AlertTriangle, Scale } from "lucide-react";
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

export default function TermsAndConditionsPage() {
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
            <Scale className="h-4 w-4" />
            Legal Agreement
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
            Terms & <span className="italic font-serif text-[#B88E52] font-medium">Conditions</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            Please read these terms carefully before booking your sailing adventure with us.
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
            <div className="mb-12 pb-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm text-gray-500 font-medium">Last Updated: <span className="text-[#11223a]">{lastUpdated}</span></p>
              <div className="flex items-center gap-2 text-sm text-[#B88E52] bg-[#fdfaf5] px-4 py-2 rounded-lg border border-[#B88E52]/20">
                <AlertTriangle className="w-4 h-4" /> Binding Contract
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="lead text-xl text-[#11223a] mb-8 leading-relaxed">
                Welcome to <strong>PGI Voyage</strong>. We are excited to have you join us for an unforgettable sailing adventure to Komodo National Park. By booking and participating in our tour, you confirm that you have read, understood, and agreed to the following Terms & Conditions.
              </p>

              <div className="space-y-12">
                
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4">1. Booking and Payment</h2>
                  
                  <h3 className="text-lg font-bold text-[#11223a] mt-6 mb-2">Booking Process</h3>
                  <p className="mb-4">
                    Bookings can be made through our official website, direct communication with our team, or through our authorized partners. We encourage guests to book directly with PGI Voyage so our team can personally assist with booking details, trip information, special requests, and any questions before departure. A booking confirmation will be sent after your reservation and payment have been successfully received.
                  </p>

                  <h3 className="text-lg font-bold text-[#11223a] mt-6 mb-2">Payment Terms</h3>
                  <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                    <li>To secure a booking, a deposit of 50% of the total trip price is required.</li>
                    <li>The remaining balance must be paid at least 7 days before the departure date.</li>
                    <li>We accept payment through bank transfer and other available payment methods confirmed by our team.</li>
                  </ul>

                  <h3 className="text-lg font-bold text-[#11223a] mt-6 mb-2">Pricing</h3>
                  <p className="mb-2">The tour price includes accommodation as described, meals onboard, selected activities, and facilities mentioned in the trip package.</p>
                  <p className="mb-2 font-semibold text-[#11223a]">The price does not include:</p>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Flights to or from the departure point</li>
                    <li>Personal expenses</li>
                    <li>Travel insurance</li>
                    <li>Optional activities not stated in the itinerary</li>
                    <li>Additional services outside the package</li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4">2. Cancellation and Amendment Policy</h2>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                    <h3 className="text-lg font-bold text-[#11223a] mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#B88E52]" /> Cancellation by Guest
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-[#B88E52] font-bold mt-1">•</span>
                        <span>Cancellations made <strong>60 days or more</strong> before departure may be eligible for a full refund, excluding administrative fees, transaction fees, and bank charges.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B88E52] font-bold mt-1">•</span>
                        <span>Cancellations made <strong>within 30 days</strong> before departure may be subject to a 50% cancellation fee.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B88E52] font-bold mt-1">•</span>
                        <span>Cancellations made <strong>less than 30 days</strong> before departure are generally non-refundable.</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-500 italic">Booking changes are subject to availability and may involve additional administrative or operational fees.</p>
                  </div>

                  <h3 className="text-lg font-bold text-[#11223a] mt-6 mb-2">Cancellation or Amendment by PGI Voyage</h3>
                  <p className="mb-4">
                    We reserve the right to cancel, delay, or amend tours due to unforeseen circumstances, including but not limited to: severe weather, rough sea conditions, safety concerns, technical issues, port authority regulations, or logistical matters.
                  </p>
                  <p className="mb-4">
                    If a tour is cancelled by our team, guests may be offered a refund or the option to reschedule to another available date. PGI Voyage is not responsible for additional costs or losses caused by tour cancellations, delays, or itinerary changes, including flights, hotels, transport, or other personal arrangements.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4">3. Travel and Participation</h2>
                  
                  <h3 className="text-lg font-bold text-[#11223a] mt-4 mb-2">Health and Fitness</h3>
                  <p className="mb-4">
                    Our Komodo sailing trips are best suited for adventurous travelers in good physical and mental condition. Activities require a reasonable level of fitness. Guests with health concerns, medical conditions, pregnancy, physical limitations, or special needs should consult a doctor before booking and inform our team in advance.
                  </p>

                  <h3 className="text-lg font-bold text-[#11223a] mt-4 mb-2">Travel Insurance</h3>
                  <p className="mb-4">
                    We strongly recommend that all guests purchase comprehensive travel insurance covering medical expenses, trip cancellation, travel delays, personal liability, and emergency evacuation. Travel insurance is the responsibility of each guest.
                  </p>

                  <h3 className="text-lg font-bold text-[#11223a] mt-4 mb-2">Guest Conduct & Safety Regulations</h3>
                  <p className="mb-4">
                    Guests are expected to respect local culture, fellow travelers, crew, wildlife, and the environment. Disruptive or unsafe behavior may result in removal from the tour without refund.
                  </p>
                  <p>
                    Guests must follow all safety instructions provided by the captain and crew, including instructions related to life jackets, snorkeling equipment, boat movement, and wildlife interaction. Failure to follow safety instructions may put yourself and others at risk. Guest safety will always be our top priority.
                  </p>
                </div>

                {/* Section 4 & 5 Combined for flow */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4">4. Accommodation, Meals & Risks</h2>
                  
                  <p className="mb-4">
                    <strong>Accommodation & Meals:</strong> Accommodation onboard depends on the selected boat and package. Private cabins are limited and subject to availability. Meals are provided onboard, simple, freshly prepared, and designed to provide enough energy. Guests with dietary restrictions or food allergies should inform our team before departure; however, special requests cannot always be guaranteed due to remote sailing routes.
                  </p>
                  
                  <p className="mb-4">
                    <strong>Adventure Risks & Wildlife:</strong> Guests understand that sailing trips involve natural risks (weather, sea conditions, trekking). By joining, guests participate voluntarily. Wildlife sightings (dragons, manta rays, etc.) are not guaranteed as they live freely in their natural habitat. Guests are responsible for assessing their own swimming ability.
                  </p>
                </div>

                {/* Section 6 to 12 Summarized */}
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a] mb-6 border-b border-gray-100 pb-4">5. General Provisions</h2>
                  
                  <ul className="space-y-4">
                    <li>
                      <strong className="text-[#11223a]">Limitation of Liability:</strong> PGI Voyage shall not be held responsible for injury, illness, loss, damage, or delay caused by weather, natural disasters, government regulations, third-party services, or events beyond our control. Our liability is limited to the amount paid for the tour package.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Personal Belongings:</strong> Guests are responsible for their own personal belongings. We are not liable for lost, stolen, or damaged items.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Environmental Responsibility:</strong> Guests are expected to help protect Komodo National Park. Do not throw trash into the sea, touch coral reefs, or disturb wildlife.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Intellectual Property:</strong> All content on our website belongs to PGI Voyage and may not be copied or used for commercial purposes without permission.
                    </li>
                    <li>
                      <strong className="text-[#11223a]">Governing Law:</strong> These Terms & Conditions are governed by the laws of the Republic of Indonesia.
                    </li>
                  </ul>
                </div>

                {/* Final Agreement */}
                <div className="bg-[#11223a] p-8 rounded-2xl border border-[#11223a] mt-12 text-center">
                  <ShieldCheck className="w-10 h-10 text-[#B88E52] mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">Final Agreement</h2>
                  <p className="text-gray-300">
                    By completing your booking and joining our tour, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
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