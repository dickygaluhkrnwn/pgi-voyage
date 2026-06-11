'use client';

import { useState, useRef, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  ArrowRight, 
  Sun, 
  Anchor, 
  Droplets, 
  Camera, 
  MapPin, 
  Sunrise, 
  Sunset, 
  Moon, 
  BedDouble, 
  Users, 
  CheckCircle2, 
  Coffee, 
  Compass, 
  XCircle, 
  Star, 
  ChevronDown, 
  FileText, 
  Quote, 
  ChevronLeft, 
  Navigation, 
  Map,
  Loader2,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// --- ANIMATION CONFIGURATIONS ---
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

// --- DEFAULT FALLBACK MEDIA & ASSETS ---
const imgPadar = "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1973&auto=format&fit=crop";
const imgWhaleShark = "https://images.unsplash.com/photo-1580580297368-c782fb65d271?q=80&w=1974&auto=format&fit=crop";
const imgKomodo = "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=1970&auto=format&fit=crop";
const imgPinkBeach = "https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=1929&auto=format&fit=crop";
const imgVessel = "/images/Kapal_Pulau_Mas_88.png";

// --- ORIGINAL PREMIUM FALLBACK DATA ---
const defaultExpeditionData = {
  highlights: [
    {
      title: "Saleh Bay – Whale Sharks",
      desc: "Swim alongside majestic whale sharks in the calm waters of Sumbawa.",
      image: imgWhaleShark,
      span: "md:col-span-2 row-span-1"
    },
    {
      title: "Komodo Park",
      desc: "Explore the natural habitat of the legendary Komodo dragons.",
      image: imgKomodo,
      span: "md:col-span-1 row-span-2"
    },
    {
      title: "Padar Viewpoint",
      desc: "Hike to the famous panoramic viewpoint overlooking three spectacular bays.",
      image: imgPadar,
      span: "md:col-span-1 row-span-1"
    },
    {
      title: "Pink Beach",
      desc: "Relax on rare pink sands and snorkel in crystal-clear waters.",
      image: imgPinkBeach,
      span: "md:col-span-1 row-span-1"
    }
  ],
  itinerary: [
    {
      day: "DAY 1",
      title: "Departure & Secret Islands",
      image: imgVessel,
      activities: [
        { time: "Morning Pick-Up", text: "Lombok Hotel Pick-Up (08:00 - 10:00 AM) via Toyota Hiace/Elf to Kopang office. Gili Islands guests take the 07:30 AM slow boat to Bangsal Harbor for check-in.", iconName: "sunrise" },
        { time: "03:30 PM", text: "After registration at Kayangan Harbor, board the KM Pulau Mas 88 and depart towards the breathtaking islands of Komodo National Park.", iconName: "anchor" },
        { time: "Late Afternoon", text: "Arrive at Kenawa Island for a short hill trek, panoramic views, and a tropical sunset. Freshly prepared dinner served onboard.", iconName: "sunset" }
      ],
      meals: "Dinner Included",
      overnight: "Overnight onboard while sailing to the next destination."
    },
    {
      day: "DAY 2",
      title: "Whale Sharks & Tambora Waters",
      image: imgWhaleShark,
      activities: [
        { time: "Morning", text: "Start with an unforgettable experience swimming alongside majestic whale sharks in the calm waters of Saleh Bay, Sumbawa.", iconName: "sunrise" },
        { time: "Midday", text: "Sail across Tambora waters. Keep an eye out for playful dolphins and enjoy a refreshing swim in the crystal-clear ocean.", iconName: "sun" },
        { time: "Afternoon", text: "Enjoy a freshly prepared lunch onboard while cruising toward Komodo National Park. Relax on deck and take in the ocean views.", iconName: "sunset" }
      ],
      meals: "Breakfast, Lunch & Dinner",
      overnight: "Overnight onboard while sailing toward Komodo National Park."
    },
    {
      day: "DAY 3",
      title: "Komodo & Padar Excursion",
      image: imgKomodo,
      activities: [
        { time: "Morning", text: "Guided trekking at Loh Liang Village (Komodo Island). Explore the natural habitat of Komodo dragons and unique savannah landscapes.", iconName: "sunrise" },
        { time: "Midday", text: "Sail to the famous Pink Beach. Swim, snorkel, and relax on the rare pink sands meeting crystal-clear tropical waters.", iconName: "sun" },
        { time: "Afternoon & Evening", text: "Hike Padar Island for a breathtaking sunset over three-colored bays. Return for a relaxing dinner and fun boat party under the stars.", iconName: "moon" }
      ],
      meals: "Breakfast, Lunch & Dinner",
      overnight: "Overnight onboard near Padar Island."
    },
    {
      day: "DAY 4",
      title: "Majarite, Kelor & Return",
      image: imgPinkBeach,
      activities: [
        { time: "Morning", text: "Snorkeling session at Majarite Island. Explore colorful coral reefs and vibrant marine life, with chances to spot sea turtles.", iconName: "sunrise" },
        { time: "Midday", text: "Explore Kelor Island. Relax on white sandy beaches, snorkel in shallow turquoise waters, or hike to the hilltop for panoramic views.", iconName: "sun" },
        { time: "Afternoon", text: "Sail back to Labuan Bajo. Disembark and say farewell to the crew and fellow travelers as your unforgettable journey concludes.", iconName: "sunset" }
      ],
      meals: "Breakfast & Lunch",
      overnight: "Trip concludes upon arrival in Labuan Bajo."
    }
  ],
  cabinPackages: [
    {
      name: "Private Cabin Sea View",
      desc: "A premium cabin option with ocean views, perfect for a more relaxing and memorable liveaboard experience.",
      price: "4,600K",
      features: ["Sea view window", "Comfortable sleeping area", "Air-conditioned room"],
      image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop",
      popular: true
    },
    {
      name: "Private Cabin Standard",
      desc: "A comfortable private room option for guests who prefer more privacy during the journey.",
      price: "4,200K",
      features: ["Good option for extra privacy", "Comfortable bed setup", "Air-conditioned room"],
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      popular: false
    },
    {
      name: "Down Deck Cabin",
      desc: "A cozy lower-deck cabin with a comfortable sleeping area, perfect for resting after a full day of island hopping.",
      price: "3,800K",
      features: ["Cozy and quiet resting area", "Comfortable sleeping space", "AC Central"],
      image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop",
      popular: false
    },
    {
      name: "Sharing Deck Upstair",
      desc: "A spacious shared sleeping area on the upper deck, designed for a simple and social liveaboard experience.",
      price: "3,600K",
      features: ["Comfortable sleeping area", "Perfect for budget-friendly travelers", "Clean mattress & blanket"],
      image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
      popular: false
    }
  ],
  inclusions: [
    "Pick-up service from Bangsal harbor, Senggigi, Mataram, and Kuta",
    "Meals onboard during the trip",
    "Snacks, coffee, tea, and fruits",
    "Snorkeling equipment (mask and snorkel only)",
    "Safety equipment onboard, First aid kit",
    "Government tax & Entrance fees",
    "English-speaking guide"
  ],
  exclusions: [
    "Flight tickets",
    "Snorkeling suit & Fins",
    "Personal Towel",
    "Personal Expenses / Tipping"
  ],
  paymentMethods: [
    { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
    { name: "Mastercard", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" },
    { name: "Bank Transfer", logo: "https://placehold.co/200x80/f8f9fa/11223a?text=Bank+Transfer&font=Montserrat" },
    { name: "E-Wallet", logo: "https://placehold.co/200x80/f8f9fa/11223a?text=E-Wallets&font=Montserrat" }
  ],
  faqs: [
    { q: "What should I bring for my Komodo Island trip?", a: "Before joining your Komodo sailing adventure, we recommend preparing a few essentials to make your trip more comfortable and enjoyable. Please bring:\n\n• Valid ID or Passport: Required for registration, check-in, and security purposes.\n• Comfortable Travel Clothing: Light clothes, swimwear, a hat, sunglasses, and comfortable footwear for trekking and island activities.\n• Sun Protection: Sunscreen is highly recommended, as you will spend plenty of time outdoors under the tropical sun.\n• Personal Medication: Bring any personal medicine you may need, including motion sickness tablets if you are sensitive to boat movement.\n• Camera or Smartphone: Perfect for capturing beautiful moments, island views, Komodo dragons, whale sharks, and ocean scenery.\n• Basic Fitness Preparation: This trip includes activities such as trekking, snorkeling, swimming, and walking on islands, so guests should be in reasonably good physical condition." },
    { q: "When should I book my Komodo Island tour?", a: "We recommend booking your Komodo Island sailing trip at least one week before departure to secure your spot, especially during busy travel seasons.\n\nSeats and cabin options can fill up quickly, so booking early gives you a better chance to choose your preferred package, cabin type, and travel date.\n\nEarly booking also allows our team to send you important trip details, preparation tips, packing suggestions, meeting point information, and any schedule updates before your journey begins. The sooner you book, the easier it will be to prepare for a smooth and enjoyable Komodo sailing adventure." },
    { q: "How can I safely book my Komodo Island tour?", a: "To make sure your booking is safe, clear, and properly handled, we recommend booking only through the official channels of PGI Voyage or through our trusted travel partners.\n\nBooking through official channels helps ensure that you receive accurate trip information, correct cabin details, clear pricing, and direct support from our team.\n\nWe strongly recommend avoiding unverified third-party sellers to prevent issues such as incorrect prices, wrong cabin assignments, or possible scams." },
    { q: "Is the Komodo trip from Lombok safe?", a: "Yes. Safety is one of our main priorities throughout the entire Lombok to Komodo sailing trip. Our team takes several important steps to help ensure a safe and comfortable journey:\n\n• Boat Safety Checks: The boat is checked and maintained regularly to support safe sailing operations.\n• Port Authority Procedures: Before departure, sailing operations follow local harbor and maritime procedures.\n• Weather & Sea Conditions: Monitored constantly. If conditions are unsafe, the schedule or route may be adjusted.\n• Experienced Crew: Trained to assist guests and handle onboard safety procedures.\n• Safety Equipment Onboard: Equipped with life jackets, life rafts, and fire extinguishers." },
    { q: "Does the Komodo Island tour include return transport to Lombok?", a: "No. The trip ends in Labuan Bajo, Flores, where all guests will disembark. Return transportation to Lombok is not included in the tour package.\n\nIf you plan to return to Lombok after the trip, you will need to arrange your own transportation, such as a domestic flight or boat transfer from Labuan Bajo. Our team can help provide general guidance and travel suggestions to make your return journey easier." },
    { q: "What happens if the trip is canceled? Can I get a refund?", a: "If the trip must be canceled due to unavoidable situations such as extreme weather, unsafe sea conditions, safety concerns, or operational issues, our team will inform guests as soon as possible.\n\nDepending on the situation, guests may be offered options such as:\n• Rescheduling to another available departure date\n• Receiving a refund based on the applicable cancellation policy\n• Choosing an alternative solution agreed with our team\n\nPlease note that refund eligibility, processing time, and any non-refundable fees may depend on the reason for cancellation and the payment method used. For complete details, please read our Terms & Conditions page before booking." }
  ]
};

// --- ICON RESOLVER HELPERS ---
const getIcon = (name: string, className: string) => {
  switch (name) {
    case 'sunrise': return <Sunrise className={className} />;
    case 'sun': return <Sun className={className} />;
    case 'sunset': return <Sunset className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'anchor': return <Anchor className={className} />;
    default: return <Sun className={className} />;
  }
};

function FaqAccordion({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#B88E52]/50 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
      >
        <span className="font-bold text-[#11223a] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#B88E52] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-50 pt-4 whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExpeditionPage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PMM%20Voyage,%20I%20want%20to%20book%20the%204D3N%20Expedition!`;
  
  const [expData, setExpData] = useState(defaultExpeditionData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic content from firestore with robust, item-by-item schema merging
  useEffect(() => {
    const fetchExpeditionData = async () => {
      try {
        const docRef = doc(db, 'settings', 'expedition');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Ultra-secure fallbacks to prevent rendering failures when admin inputs are partial
          const mergedHighlights = data.highlights && Array.isArray(data.highlights) && data.highlights.length > 0
            ? data.highlights.map((h: any, i: number) => ({
                ...defaultExpeditionData.highlights[i % defaultExpeditionData.highlights.length],
                ...h,
                image: h.image || defaultExpeditionData.highlights[i % defaultExpeditionData.highlights.length].image
              }))
            : defaultExpeditionData.highlights;

          const mergedItinerary = data.itinerary && Array.isArray(data.itinerary) && data.itinerary.length > 0
            ? data.itinerary.map((it: any, i: number) => ({
                ...defaultExpeditionData.itinerary[i % defaultExpeditionData.itinerary.length],
                ...it,
                image: it.image || defaultExpeditionData.itinerary[i % defaultExpeditionData.itinerary.length].image,
                activities: Array.isArray(it.activities) 
                  ? it.activities.map((act: any) => ({
                      time: act.time || "00:00",
                      text: act.text || "",
                      iconName: act.iconName || "sun"
                    })) 
                  : []
              }))
            : defaultExpeditionData.itinerary;

          const mergedCabinPackages = data.cabinPackages && Array.isArray(data.cabinPackages) && data.cabinPackages.length > 0
            ? data.cabinPackages.map((c: any, i: number) => ({
                ...defaultExpeditionData.cabinPackages[i % defaultExpeditionData.cabinPackages.length],
                ...c,
                image: c.image || defaultExpeditionData.cabinPackages[i % defaultExpeditionData.cabinPackages.length].image,
                features: Array.isArray(c.features) ? c.features.filter(Boolean) : []
              }))
            : defaultExpeditionData.cabinPackages;

          const mergedInclusions = data.inclusions && Array.isArray(data.inclusions) && data.inclusions.length > 0 
            ? data.inclusions.filter(Boolean) 
            : defaultExpeditionData.inclusions;

          const mergedExclusions = data.exclusions && Array.isArray(data.exclusions) && data.exclusions.length > 0 
            ? data.exclusions.filter(Boolean) 
            : defaultExpeditionData.exclusions;

          const mergedPaymentMethods = data.paymentMethods && Array.isArray(data.paymentMethods) && data.paymentMethods.length > 0 
            ? data.paymentMethods 
            : defaultExpeditionData.paymentMethods;

          const mergedFaqs = data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0 
            ? data.faqs 
            : defaultExpeditionData.faqs;

          setExpData({
            highlights: mergedHighlights,
            itinerary: mergedItinerary,
            cabinPackages: mergedCabinPackages,
            inclusions: mergedInclusions,
            exclusions: mergedExclusions,
            paymentMethods: mergedPaymentMethods,
            faqs: mergedFaqs,
          });
        } else {
          // No doc found, load premium defaults safely
          setExpData(defaultExpeditionData);
        }
      } catch (error) {
        console.error("Error fetching expedition settings:", error);
        setExpData(defaultExpeditionData); // Clean fallback on database failure
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpeditionData();
  }, []);

  const getWaLink = (cabinName: string) => {
    return `https://wa.me/${waNumber}?text=Hi%20PMM%20Voyage,%20I%20am%20interested%20in%20booking%20the%20*${encodeURIComponent(cabinName || "Cabin")}*%20for%20the%204D3N%20Expedition.`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa]">
        <Loader2 className="w-12 h-12 text-[#B88E52] animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Preparing your ultimate voyage...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105" 
          style={{ backgroundImage: `url('${imgPadar}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/90 via-[#11223a]/40 to-[#11223a]"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto text-center mt-12"
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg uppercase tracking-widest">
            <Map className="w-4 h-4" /> The Grand Route
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
            4D3N Ultimate <br /> <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B88E52] to-[#eaddbd]">Sea Expedition</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            Experience an unforgettable sailing journey from Lombok to Labuan Bajo. Encounter whale sharks, trek with dragons, and discover breathtaking island panoramas.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#B88E52] to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. TRIP HIGHLIGHTS (Bento Grid) */}
      <section className="py-24 px-6 lg:px-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Expedition Highlights</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg">
              Witness the wonders of the Indonesian archipelago. A carefully curated journey combining wildlife, nature, and relaxation.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[800px] md:h-[600px]"
          >
            {expData.highlights.map((item, index) => {
              const gridSpan = item.span || (index === 0 ? "md:col-span-2 row-span-1" : index === 1 ? "md:col-span-1 row-span-2" : "md:col-span-1 row-span-1");
              return (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className={`relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer ${gridSpan}`}
                >
                  <img src={item.image || "/images/Kapal_Pulau_Mas_88.png"} alt={item.title || "Highlight"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. ITINERARY TIMELINE SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-y border-gray-100 relative">
        <div className="absolute top-40 left-0 w-96 h-96 bg-[#B88E52]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center mb-20 relative z-10">
          <span className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Day by Day</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">The Grand Itinerary</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Our trips are safe, well-organized, and perfectly paced. Follow the timeline of your upcoming adventure.</p>
        </div>

        <div className="space-y-24 max-w-6xl mx-auto relative z-10">
          {expData.itinerary.map((item, index) => (
            <motion.div 
              key={item.day || index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}
            >
              {/* Image Side - Sticky Position */}
              <motion.div variants={fadeInUp} className="w-full md:w-1/2">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] group sticky top-32 border border-gray-200">
                  <img 
                    src={item.image || "/images/Kapal_Pulau_Mas_88.png"} 
                    alt={item.title || "Day Image"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11223a] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#B88E52] text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
                      {item.day}
                    </span>
                    <h3 className="text-3xl font-bold leading-snug">{item.title}</h3>
                  </div>
                </div>
              </motion.div>

              {/* Text Side (Timeline content) */}
              <motion.div variants={fadeInUp} className="w-full md:w-1/2 flex flex-col justify-center pt-4 pb-10">
                <div className="space-y-10 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#B88E52] before:via-gray-300 before:to-transparent">
                  {item.activities && item.activities.map((act: any, i: number) => (
                    <div key={i} className="relative flex items-start gap-6 group">
                      <div className="absolute left-0 w-5 h-5 rounded-full border-[4px] border-white bg-[#B88E52] shadow-md z-10 mt-1 group-hover:scale-125 transition-transform"></div>
                      <div className="pl-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                             {getIcon(act.iconName || "sun", "w-5 h-5 text-[#B88E52]")}
                          </div>
                          <h4 className="text-lg font-bold text-[#11223a]">{act.time}</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {act.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Day Summary Box */}
                <div className="mt-12 bg-white border border-[#B88E52]/20 shadow-lg shadow-[#B88E52]/5 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[#B88E52]/5 rounded-bl-full pointer-events-none"></div>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="p-2.5 bg-[#fdfaf5] rounded-xl text-[#B88E52]">
                       <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-[#11223a] mb-1">Included Meals</span>
                      <span className="text-gray-600 text-sm">{item.meals}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-[#fdfaf5] rounded-xl text-[#B88E52]">
                       <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block font-bold text-[#11223a] mb-1">Accommodation</span>
                      <span className="text-gray-600 text-sm">{item.overnight}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. INCLUSIONS & EXCLUSIONS */}
      <section className="py-24 px-6 lg:px-12 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Inclusions */}
            <motion.div variants={fadeInUp} className="bg-[#fdfaf5] rounded-[2.5rem] p-10 lg:p-12 border border-[#B88E52]/20 shadow-xl shadow-[#B88E52]/5 relative overflow-hidden">
              <Compass className="absolute -bottom-10 -right-10 w-48 h-48 text-[#B88E52]/5 pointer-events-none" />
              <h3 className="text-3xl font-bold text-[#11223a] mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#B88E52]" /> What's Included?
              </h3>
              <ul className="space-y-5">
                {expData.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-700">
                    <CheckCircle2 className="w-6 h-6 text-[#B88E52] shrink-0" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Exclusions */}
            <motion.div variants={fadeInUp} className="bg-gray-50 rounded-[2.5rem] p-10 lg:p-12 border border-gray-200 relative overflow-hidden">
              <XCircle className="absolute -top-10 -right-10 w-48 h-48 text-gray-200/50 pointer-events-none" />
              <h3 className="text-3xl font-bold text-[#11223a] mb-8 flex items-center gap-3">
                <XCircle className="w-8 h-8 text-gray-400" /> Not Included
              </h3>
              <ul className="space-y-5">
                {expData.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-600">
                    <XCircle className="w-6 h-6 text-gray-400 shrink-0" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. CHOOSE CABIN SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#11223a] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Accommodation</motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-6">Choose Your Stay</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Select the perfect cabin for your journey. All sleeping areas are arranged to maximize space efficiency and comfort.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {expData.cabinPackages.map((cabin, index) => {
              const safeCabinName = cabin.name || `Cabin-${index + 1}`;
              const cabinWaId = `btn-wa-booking-cabin-${safeCabinName.replace(/\s+/g, '-').toLowerCase()}`;
              
              return (
                <motion.div 
                  key={index}
                  variants={fadeInUp} 
                  className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group hover:bg-white/10 transition-colors duration-300 shadow-xl"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img src={cabin.image || "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600"} alt={safeCabinName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11223a] to-transparent opacity-60"></div>
                    {cabin.popular && (
                      <div className="absolute top-4 right-4 bg-[#B88E52] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                       <h3 className="text-xl font-bold">{safeCabinName}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{cabin.desc || ""}</p>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {cabin.features && cabin.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#B88E52] shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-white/10">
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-sm font-semibold text-[#B88E52]">IDR</span>
                        <span className="text-4xl font-bold text-white tracking-tight">{cabin.price || "0K"}</span>
                        <span className="text-gray-400 text-sm">/pax</span>
                      </div>
                      
                      {/* GTM Tracking ID dynamically assigned per cabin package */}
                      <a 
                        id={cabinWaId}
                        href={getWaLink(safeCabinName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-[#11223a] font-bold hover:bg-[#B88E52] hover:text-white transition-colors shadow-lg hover:-translate-y-1"
                      >
                        Select Package
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 6. PAYMENT METHODS SECTION */}
      {expData.paymentMethods && expData.paymentMethods.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-b border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">
                Secure Transactions
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-[#11223a] mb-12">
                Trusted Global Partners
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {expData.paymentMethods.map((method: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer">
                    <div className="h-16 md:h-20 w-32 md:w-40 px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-2xl flex items-center justify-center transition-all duration-500 hover:shadow-md hover:border-[#B88E52]/40 hover:-translate-y-1">
                      <img 
                        src={method.logo || "https://placehold.co/200x80/f8f9fa/11223a?text=Bank&font=Montserrat"} 
                        alt={method.name} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-4 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 tracking-wide">
                      {method.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 7. HELPFUL GUIDES & FAQS SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          
          {/* Helpful Guides Sidebar */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full lg:w-1/3"
          >
            <div className="bg-[#fdfaf5] p-8 lg:p-10 rounded-[2.5rem] border border-[#B88E52]/20 sticky top-32 shadow-lg shadow-[#B88E52]/5">
              <h3 className="text-2xl font-bold text-[#11223a] mb-8 flex items-center gap-3">
                <FileText className="w-7 h-7 text-[#B88E52]" /> Helpful Guides
              </h3>
              <ul className="space-y-4">
                <li>
                  <a href="/terms-and-conditions" className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-[#B88E52]/20">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#B88E52] transition-colors"><span className="text-xs font-bold text-gray-500 group-hover:text-[#B88E52]">1</span></div>
                    <span className="font-semibold text-gray-700 group-hover:text-[#B88E52] transition-colors text-lg">Terms & Conditions</span>
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-[#B88E52]/20">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#B88E52] transition-colors"><span className="text-xs font-bold text-gray-500 group-hover:text-[#B88E52]">2</span></div>
                    <span className="font-semibold text-gray-700 group-hover:text-[#B88E52] transition-colors text-lg">Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="/faq" className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-[#B88E52]/20">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#B88E52] transition-colors"><span className="text-xs font-bold text-gray-500 group-hover:text-[#B88E52]">3</span></div>
                    <span className="font-semibold text-gray-700 group-hover:text-[#B88E52] transition-colors text-lg leading-snug">View Full FAQ Center</span>
                  </a>
                </li>
              </ul>
              
              <div className="mt-10 pt-8 border-t border-[#B88E52]/20 text-center">
                <p className="text-sm text-gray-600 mb-4">Have specific requests or concerns?</p>
                {/* GTM Tracking ID assigned to support button */}
                <a 
                  id="btn-wa-support"
                  href={b2cWaLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#11223a] text-white font-bold hover:bg-[#0f1f33] transition-colors shadow-md hover:-translate-y-1"
                >
                   Chat with Support
                </a>
              </div>
            </div>
          </motion.div>

          {/* FAQs Accordion */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-2/3"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-10">Trip FAQs</h2>
            <div className="space-y-4">
              {expData.faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <FaqAccordion question={faq.q || "FAQ?"} answer={faq.a || ""} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-24 px-6 text-center bg-[#f8f9fa] border-t border-gray-100">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto bg-[#11223a] rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#B88E52]/20 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B88E52]/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to set sail?</h2>
           <p className="text-gray-300 mb-10 text-lg md:text-xl relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
             Secure your cabin for the upcoming Saturday departure. Spots are strictly limited to 50 privileged guests.
           </p>
           {/* GTM Tracking ID assigned to main CTA button */}
           <a 
              id="btn-wa-booking"
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(184,142,82,0.4)] transform hover:scale-105 relative z-10"
           >
              Book Your Journey <ArrowRight className="h-5 w-5" />
           </a>
        </motion.div>
      </section>

    </main>
  );
}