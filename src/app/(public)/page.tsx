'use client';

import { ArrowRight, Compass, Gift, Handshake, Ship, Star, Anchor, Users, CheckCircle2, ImageIcon, BookOpen } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1]
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function PublicHomepage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20want%20to%20sign%20up%20and%20claim%20my%20IDR%20500k%20Welcome%20Voucher!`;
  const b2bWaLink = `https://wa.me/${waNumber}?text=Hello%20PGI%20Voyage,%20I%20am%20a%20Travel%20Agent%20interested%20in%20joining%20the%20B2B%20Portal%20for%20the%20Allotment%20&%20Commission%20system.`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/90 via-[#11223a]/40 to-[#11223a]"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-8 backdrop-blur-md uppercase tracking-wider shadow-lg">
            <Star className="h-4 w-4 fill-[#B88E52]" />
            Premium 4D3N Liveaboard
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
            Discover Komodo in <br/>
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B88E52] to-[#eaddbd]">
              Unrivaled Elegance
            </span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            An intimate journey from Lombok to Flores. 
            Fixed departures every Saturday. Strictly limited to 50 privileged guests.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a 
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(184,142,82,0.4)] hover:shadow-[0_0_50px_rgba(184,142,82,0.6)] transform hover:scale-105"
            >
              Claim IDR 500k Voucher <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="/expedition"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-lg backdrop-blur-md border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              Explore The Route
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#B88E52] to-transparent"></div>
        </motion.div>
      </section>

      {/* DESTINATIONS TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16 flex flex-col items-center"
          >
            <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">The Route</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a] mb-6">4 Days of Wonder</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
              Embark on a carefully curated route traversing the pristine waters of the Indonesian archipelago. Witness prehistoric dragons, pink sands, and majestic mantas.
            </motion.p>
            <motion.a 
              variants={fadeInUp}
              href="/expedition" 
              className="inline-flex items-center gap-2 text-[#11223a] font-bold hover:text-[#B88E52] transition-colors border-b-2 border-transparent hover:border-[#B88E52] pb-1"
            >
              View Full Itinerary <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 block">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop" alt="Padar Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Padar Island</h3>
                  <p className="text-white/80 text-sm">Hike to the summit for a breathtaking panoramic view.</p>
                </div>
              </div>
            </motion.a>

            {/* Card 2 */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 block">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" alt="Komodo Dragon" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Komodo Park</h3>
                  <p className="text-white/80 text-sm">Encounter legendary dragons in their natural habitat.</p>
                </div>
              </div>
            </motion.a>

            {/* Card 3 */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 block">
              <div className="relative h-80 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Pink Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Pink Beach</h3>
                  <p className="text-white/80 text-sm">Relax on striking pink sands and crystal-clear waters.</p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* THE VESSEL TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#11223a] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" alt="Premium Liveaboard Vessel" className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 bg-[#B88E52] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                KM Pulau Mas 88
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-1/2"
          >
            <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Trust & Comfort</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">Built for the Ultimate Voyage</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg mb-8 leading-relaxed">
              As a direct operator, we guarantee the highest standards of safety and hospitality. Our vessel is meticulously designed to provide a spacious, luxurious retreat with strict compliance to national maritime regulations.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Users className="h-6 w-6 text-[#B88E52]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">46 Pax Capacity</h4>
                  <p className="text-sm text-gray-400">Strictly capped to ensure intimate service and ample space.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Anchor className="h-6 w-6 text-[#B88E52]" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Verified Safety</h4>
                  <p className="text-sm text-gray-400">Equipped with official legal certifications and life rafts.</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/boat-details"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold transition-all shadow-lg"
              >
                View Boat Specs & Legality
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Visual Journey
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a]">A Glimpse of Paradise</motion.h2>
            </div>
            <motion.a 
              variants={fadeInUp}
              href="/gallery" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-[#11223a] font-semibold hover:bg-[#11223a] hover:text-white transition-all whitespace-nowrap"
            >
              Explore Full Gallery <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[400px] md:h-[500px]"
          >
            <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" alt="Pink Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            </div>
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
              <img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop" alt="Kenawa Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            </div>
            <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer">
               <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" alt="Whale Shark" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
            </div>
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-lg group relative cursor-pointer bg-[#11223a] flex flex-col items-center justify-center text-center p-6 border border-gray-100">
               <a href="/gallery" className="text-white hover:text-[#B88E52] transition-colors">
                  <span className="block text-3xl font-bold mb-2">50+</span>
                  <span className="text-sm text-gray-300 uppercase tracking-wider font-semibold">More Photos</span>
               </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" /> Journal
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a] mb-8">Stories from the Sea</motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12"
          >
            <motion.a href="/blog" variants={fadeInUp} className="group bg-[#f8f9fa] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#11223a] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Travel Guide</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#11223a] mb-4 group-hover:text-[#B88E52] transition-colors">The Ultimate Guide to Exploring Komodo in 2026</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">Everything you need to know before setting sail. From encountering prehistoric dragons to swimming with majestic manta rays.</p>
                <span className="text-[#B88E52] font-semibold text-sm flex items-center gap-2">Read Article <ArrowRight className="w-4 h-4" /></span>
              </div>
            </motion.a>

            <motion.a href="/blog" variants={fadeInUp} className="group bg-[#f8f9fa] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="h-64 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" alt="Blog Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#11223a] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Wildlife</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#11223a] mb-4 group-hover:text-[#B88E52] transition-colors">A Close Encounter with the Gentle Giants</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">What it feels like to swim alongside the massive, yet incredibly peaceful Whale Sharks in Saleh Bay. A true bucket-list experience.</p>
                <span className="text-[#B88E52] font-semibold text-sm flex items-center gap-2">Read Article <ArrowRight className="w-4 h-4" /></span>
              </div>
            </motion.a>
          </motion.div>

          <div className="text-center">
             <a href="/blog" className="inline-flex items-center gap-2 text-[#11223a] font-bold hover:text-[#B88E52] transition-colors border-b-2 border-transparent hover:border-[#B88E52] pb-1">
                View All Journal Entries <ArrowRight className="w-5 h-5" />
             </a>
          </div>
        </div>
      </section>

      {/* PORTAL / ECOSYSTEM SECTION (B2C & B2B) */}
      <section id="ecosystem" className="py-24 px-6 lg:px-12 bg-[#f8f9fa] max-w-7xl mx-auto w-full relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Digital Ecosystem</motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Unlock Your Digital Privileges</motion.h2>
          <motion.p variants={fadeInUp} className="text-[#11223a]/70 max-w-2xl mx-auto text-lg">
            We are building a world-class booking platform. 
            Secure your early-bird benefits and tiers today by registering manually via our operators.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {/* Card B2C (Turis) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-[2rem] p-10 shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#B88E52]/10 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="h-16 w-16 rounded-2xl bg-[#fdfaf5] border border-[#B88E52]/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#B88E52] group-hover:text-white transition-all duration-500 text-[#B88E52]">
              <Gift className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-bold text-[#11223a] mb-4">For Explorers (B2C)</h3>
            <div className="space-y-4 mb-8 flex-grow">
              <p className="text-gray-600 text-lg">Join the <strong>Expedition Tiers</strong> program.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> Earn points for every cabin</li>
                <li className="flex items-center gap-2 text-gray-600"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> Unlock the VIP Rewards Store</li>
                <li className="flex items-center gap-2 text-gray-600"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> <strong>IDR 500.000 Welcome Voucher</strong></li>
              </ul>
            </div>
            <a 
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#11223a] text-white font-semibold hover:bg-[#0f1f33] transition-colors text-lg shadow-lg"
            >
              Claim B2C Voucher
            </a>
          </motion.div>

          {/* Card B2B (Travel Agent) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="group bg-[#11223a] rounded-[2rem] p-10 shadow-2xl shadow-[#11223a]/20 border border-[#1a3356] flex flex-col h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
              <Compass className="h-48 w-48 text-[#B88E52]" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="h-16 w-16 rounded-2xl bg-[#172c4a] border border-[#B88E52]/40 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#B88E52] group-hover:text-[#11223a] transition-all duration-500 text-[#B88E52]">
                <Handshake className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Travel Agent Portal (B2B)</h3>
              <div className="space-y-4 mb-8 flex-grow">
                <p className="text-gray-300 text-lg">Experience the future of B2B booking.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-300"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> Real-time Live Inventory sync</li>
                  <li className="flex items-center gap-2 text-gray-300"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> Smart Allotment & Auto-Nett Pricing</li>
                  <li className="flex items-center gap-2 text-gray-300"><CheckCircle2 className="h-5 w-5 text-[#B88E52]" /> Up to <strong>IDR 500k Commission/pax</strong></li>
                </ul>
              </div>
              <a 
                href={b2bWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#B88E52] text-white font-bold hover:bg-[#a37c46] transition-colors text-lg shadow-[0_4px_15px_rgba(184,142,82,0.3)]"
              >
                Register Your Agency
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}