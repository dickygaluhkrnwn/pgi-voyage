'use client';

import { ArrowRight, Compass, ShieldCheck, Ship, Users, Star, Quote, Anchor, HeartHandshake, MapPin, CheckCircle2 } from "lucide-react";
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
    transition: { staggerChildren: 0.15 }
  }
};

const offerings = [
  {
    category: "Sailing Experiences",
    items: [
      "Shared Expedition Trips",
      "Private Yacht Charters",
      "Standard & Deluxe Packages",
      "Premium Liveaboard Journeys",
      "Whale Shark Encounters",
      "Snorkeling & Marine Safaris"
    ]
  },
  {
    category: "Top Destinations",
    items: [
      "Padar Island Panorama",
      "Komodo Dragon Habitat",
      "The Majestic Pink Beach",
      "Manta Point Encounters",
      "Taka Makassar Sandbar",
      "Kelor & Kanawa Islands"
    ]
  }
];

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#B88E52]" />,
    title: "Trusted Expertise",
    desc: "Partnering strictly with verified, experienced maritime crews and meticulously maintained vessels for absolute safety."
  },
  {
    icon: <Ship className="w-8 h-8 text-[#B88E52]" />,
    title: "Curated Fleet",
    desc: "From comfortable standard boats to opulent luxury liveaboards, we match your unique travel style and budget."
  },
  {
    icon: <Compass className="w-8 h-8 text-[#B88E52]" />,
    title: "Transparent Journeys",
    desc: "Clear itineraries, honest pricing, and accurate facility details. We guarantee an experience without hidden surprises."
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-[#B88E52]" />,
    title: "Exceptional Hospitality",
    desc: "Our dedicated team ensures a seamless, warm, and highly personalized experience from your first inquiry to disembarkation."
  }
];

const testimonials = [
  { name: "Marco De Luca", origin: "Italy", text: "Snorkeling in Komodo was amazing. The water was clear, the marine life was beautiful, and PGI Voyage made the experience easy and memorable." },
  { name: "Hannah Fischer", origin: "Switzerland", text: "Seeing the Komodo dragons in their natural habitat was incredible. The crew was helpful, the guide was informative, and the whole journey felt very well planned." },
  { name: "Lucas Bennett", origin: "United Kingdom", text: "The trip was perfectly organized and full of beautiful moments. From the boat to the island stops, everything felt smooth, safe, and truly unforgettable." },
  { name: "Sofia Andersen", origin: "Denmark", text: "This was one of the best parts of our Indonesia trip. The boat was comfortable, the crew was helpful, and every island stop felt special and memorable." },
  { name: "Daniel Miller", origin: "Germany", text: "Everything was smooth from start to finish. PGI Voyage gave us a great sailing experience with beautiful destinations, good service, and amazing snorkeling spots." },
  { name: "Emily Carter", origin: "Australia", text: "Our Komodo sailing trip was absolutely unforgettable. The crew was friendly, the itinerary was well organized, and the view from Padar Island was beyond amazing." }
];

export default function AboutUsPage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20am%20interested%20in%20booking%20an%20unforgettable%20sailing%20adventure!`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#11223a]/60 to-transparent"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg uppercase tracking-widest">
            <Anchor className="h-4 w-4" />
            Our Story
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-md leading-tight">
            Redefining <br /> <span className="italic font-serif text-[#B88E52]">Ocean Adventures</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to PGI Voyage, a trusted maritime platform dedicated to orchestrating unforgettable liveaboard experiences across the majestic Indonesian archipelago.
          </motion.p>
        </motion.div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-[#f8f9fa] mt-[-60px] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col lg:flex-row gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6">Our Mission & Identity</h2>
              <div className="w-20 h-1 bg-[#B88E52] mb-8 rounded-full"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We are driven by a profound passion for the sea, tropical islands, and the art of crafting meaningful travel narratives. Our singular mission is to help global explorers discover the raw, untamed beauty of Indonesia's iconic islands through sailing journeys that prioritize ultimate safety and profound joy.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you are embarking on a solo quest, celebrating with a partner, or creating memories with family and friends, we curate the perfect equilibrium of adrenaline-fueled adventure and serene comfort, tailored specifically for you.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="w-full lg:w-1/2 relative">
              <div className="aspect-square rounded-[2.5rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sailing Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -left-8 bg-[#11223a] text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <Compass className="w-12 h-12 text-[#B88E52] mb-3" />
                <p className="font-bold text-xl leading-tight">Explore with<br/>Confidence</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY TRAVEL WITH US SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">The PGI Voyage Standard</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We elevate industry standards by merging meticulous planning with a deep respect for maritime safety.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-[#fdfaf5] border border-[#B88E52]/20 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-[#11223a] mb-4">{feat.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OFFER (INCLUSIONS/CATEGORIES) */}
      <section className="py-24 px-6 lg:px-12 bg-[#11223a] text-white border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24"
          >
            {offerings.map((offer, index) => (
              <motion.div key={index} variants={fadeInUp} className="space-y-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  {index === 0 ? <Ship className="w-8 h-8 text-[#B88E52]" /> : <MapPin className="w-8 h-8 text-[#B88E52]" />}
                  {offer.category}
                </h2>
                <ul className="space-y-4">
                  {offer.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-gray-300 text-lg">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#B88E52]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Voices of Our Explorers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Read authentic narratives from global travelers who trusted us with their Komodo liveaboard adventures.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testi, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden">
                <Quote className="absolute top-6 right-6 w-16 h-16 text-[#B88E52]/5 rotate-180 pointer-events-none" />
                <div className="flex gap-1 text-[#B88E52] mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed relative z-10">"{testi.text}"</p>
                <div className="flex items-center gap-3 mt-auto relative z-10 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-[#11223a] flex items-center justify-center text-[#B88E52] font-bold">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#11223a] text-sm">{testi.name}</h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{testi.origin}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 px-6 text-center bg-white border-t border-gray-100">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto bg-[#11223a] rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#B88E52]/20 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B88E52]/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Begin Your Epic Journey</h2>
           <p className="text-gray-300 mb-10 text-lg relative z-10 max-w-xl mx-auto">
              Explore breathtaking islands, crystal-clear waters, and unparalleled luxury aboard our curated fleet.
           </p>
           <a 
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(184,142,82,0.4)] transform hover:scale-105 relative z-10"
            >
              Consult an Expert <ArrowRight className="h-5 w-5" />
            </a>
        </motion.div>
      </section>

    </main>
  );
}