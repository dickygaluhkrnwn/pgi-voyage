'use client';

import { useState } from "react";
import { LifeBuoy, Wallet, Anchor, ChevronDown, Mail } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

const faqData = [
  {
    category: "General Information",
    icon: <Anchor className="w-6 h-6 text-[#B88E52]" />,
    desc: "Essential details to know before embarking on your liveaboard journey.",
    questions: [
      {
        q: "What does the expedition package cover?",
        a: "Our standard packages typically include accommodation onboard, daily meals, drinking water, coffee/tea, snorkeling gear (mask and snorkel), an English-speaking guide, and designated land transfers. Please review your specific itinerary for complete inclusions."
      },
      {
        q: "Where does the journey begin?",
        a: "Meeting points vary based on your selected route. For our Lombok departures, we arrange pick-ups from designated locations (Mataram, Senggigi, Kuta, or Bangsal for Gili Islands guests) before transferring to the departure harbor."
      },
      {
        q: "What essentials should I pack?",
        a: "Pack light and practical. Essentials include swimwear, a quick-dry towel, high SPF sunscreen, sunglasses, personal medications (especially motion sickness pills), a dry bag, a reliable power bank, and basic toiletries."
      },
      {
        q: "Is this trip family-friendly?",
        a: "Yes, children are welcome onboard! However, for their safety, they must remain under constant parental or guardian supervision, particularly during water activities, trekking, and while moving around the decks."
      },
      {
        q: "Can non-swimmers participate?",
        a: "Absolutely. While swimming enhances the experience, it is not mandatory. We provide life jackets for all guests, and our crew is always ready to assist you during water-based activities."
      },
      {
        q: "Are the itineraries fixed?",
        a: "Sailing is deeply connected to nature. While we aim to follow the planned route, the captain holds the final authority to modify the itinerary based on weather, sea conditions, or harbor regulations to ensure everyone's safety."
      }
    ]
  },
  {
    category: "The Vessel & Facilities",
    icon: <LifeBuoy className="w-6 h-6 text-[#B88E52]" />,
    desc: "Details regarding your comfort, safety, and amenities onboard.",
    questions: [
      {
        q: "What amenities can I expect onboard?",
        a: "Our vessels are equipped with standard liveaboard necessities: life-saving equipment, first-aid kits, shared bathrooms, a dining space, an open sun deck for relaxation, daily meals, and a dedicated service crew."
      },
      {
        q: "Are there proper bathrooms onboard?",
        a: "Yes, our vessels feature shared toilet and shower facilities. Freshwater is available but must be used mindfully, as supply is carefully managed during the multi-day crossing."
      },
      {
        q: "Do I need to bring my own snorkeling gear?",
        a: "We provide basic snorkeling masks and tubes. However, if you prefer a customized fit or require specific fins, we highly recommend bringing your personal equipment."
      },
      {
        q: "How do you ensure passenger safety?",
        a: "Safety is our absolute priority. Our boats comply with national maritime regulations and carry inflatable life rafts, life jackets, fire extinguishers, marine radios, and an experienced crew trained for emergencies."
      },
      {
        q: "Can I charge my devices onboard?",
        a: "Yes, the boat has electricity, primarily supplied by a generator. Charging stations are available, but since power can be intermittent, bringing a high-capacity power bank is highly advised."
      },
      {
        q: "Will I have Wi-Fi access?",
        a: "While some areas may have intermittent mobile signal, Wi-Fi is generally not provided or reliable. Consider this voyage a wonderful opportunity to disconnect and immerse yourself in nature."
      },
      {
        q: "What are the sleeping arrangements?",
        a: "Depending on your selected package, you can rest in a Private Cabin (ideal for couples) or a Shared Deck area (perfect for backpackers). All spaces are optimized for practical comfort during the crossing."
      }
    ]
  },
  {
    category: "Pricing & Reservations",
    icon: <Wallet className="w-6 h-6 text-[#B88E52]" />,
    desc: "Information regarding costs, deposits, and booking procedures.",
    questions: [
      {
        q: "How are the expedition rates determined?",
        a: "Pricing varies based on the chosen route, duration, cabin category, and seasonality. For the most accurate and up-to-date rates, please refer to our booking portal or contact our team directly."
      },
      {
        q: "Are rates per individual or per group?",
        a: "For our scheduled shared expeditions (Open Trips), prices are quoted per person. For Private Charters, the cost is calculated for the entire vessel based on the group size and itinerary."
      },
      {
        q: "Is National Park admission included?",
        a: "Inclusions differ by package. Some options cover government taxes and Komodo National Park entrance fees, while others do not. Please verify the 'Inclusions' section of your specific package before booking."
      },
      {
        q: "How do I secure my reservation?",
        a: "To confirm a booking, a 50% deposit is required. The remaining balance must be settled at least 7 days prior to the departure date, following our payment guidelines."
      },
      {
        q: "What is your refund policy?",
        a: "Refund eligibility is strictly tied to our cancellation timeline. Cancellations made well in advance may qualify for a refund, whereas last-minute cancellations are generally non-refundable. Please review our full Terms & Conditions for exact details."
      },
      {
        q: "Are there any hidden fees?",
        a: "We strive for transparency. However, personal expenses, travel insurance, crew gratuities (tips), and flights are not included. Any additional services requested outside the standard package will incur extra charges."
      },
      {
        q: "Can I charter the entire boat?",
        a: "Absolutely. We offer Private Charters tailored for families or private groups. Pricing and availability depend on your preferred dates and bespoke itinerary requests."
      }
    ]
  }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:border-[#B88E52]/40 hover:shadow-md transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white"
      >
        <span className={`font-bold pr-4 transition-colors ${isOpen ? 'text-[#B88E52]' : 'text-[#11223a]'}`}>
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-[#B88E52] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#fdfaf5]"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20have%20a%20question%20about%20the%20sailing%20trip.`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a] to-[#0b1728]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B88E52]/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#B88E52] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <LifeBuoy className="h-4 w-4" />
            Support Center
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
            Frequently Asked <span className="italic font-serif text-[#B88E52] font-medium">Questions</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            Find answers regarding our expedition routes, boat amenities, reservation process, and travel preparations.
          </motion.p>
        </motion.div>
      </section>

      {}
      <section className="px-6 lg:px-12 mt-[-60px] relative z-20 pb-24">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {faqData.map((section, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(17,34,58,0.05)] border border-gray-100"
            >
              <div className="flex items-start sm:items-center gap-4 mb-8 pb-8 border-b border-gray-100 flex-col sm:flex-row">
                <div className="w-14 h-14 rounded-2xl bg-[#fdfaf5] border border-[#B88E52]/20 flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#11223a]">{section.category}</h2>
                  <p className="text-sm text-gray-500 mt-1">{section.desc}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.questions.map((item, qIdx) => (
                  <FaqItem key={qIdx} question={item.q} answer={item.a} />
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {}
      <section className="py-20 px-6 lg:px-12 bg-white border-t border-gray-100 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-[#fdfaf5] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#B88E52]/20 shadow-sm">
            <Mail className="w-8 h-8 text-[#B88E52]" />
          </div>
          <h2 className="text-3xl font-bold text-[#11223a] mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Our voyage specialists are ready to help you plan the perfect Komodo adventure. Send us a message and we'll get back to you shortly.
          </p>
          <a 
            href={b2cWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#11223a] hover:bg-[#0f1f33] text-white font-bold transition-all shadow-lg hover:-translate-y-1"
          >
            Contact Support
          </a>
        </motion.div>
      </section>

    </main>
  );
}