'use client';

import { ArrowRight, FileText, Award, Ship, Flag, Users, Scale, Ruler, LifeBuoy, Flame, ShieldCheck, FileSignature, CheckCircle2, MapPin, BedDouble, Droplets, Wifi, Compass, Waves, PenTool, LayoutTemplate, Info, Map as MapIcon } from "lucide-react";
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

// URL Aset Asli dari Kamu
const imgPadar = "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=773&auto=format&fit=crop";
const imgWhaleShark = "https://images.unsplash.com/photo-1580580297368-c782fb65d271?q=80&w=774&auto=format&fit=crop";
const imgKomodo = "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=870&auto=format&fit=crop";
const imgPinkBeach = "https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=929&auto=format&fit=crop";
const imgVessel = "/images/Kapal_Pulau_Mas_88.png";

// --- DATA: LEGAL DOCUMENTS ---
const safetyDocuments = [
  {
    title: "Business Identification Number (NIB)",
    desc: "An official tourism business license registered through Indonesia’s OSS system, allowing us to operate legally in the tourism industry.",
    icon: <FileText className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1RkJcmdVgNFVH-0dthOwD5Xaah19SXmUD/view"
  },
  {
    title: "Legal Company Certification",
    desc: "An official certification from the Indonesian Ministry confirming that our company is legally registered and recognized.",
    icon: <Award className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1IgbQsB5Vpu1gXpFxyL4j_YQIgnUSsFs7/view"
  },
  {
    title: "Approved Vessel Operational Plan",
    desc: "Our vessels operate under officially approved plans (RPK), ensuring every route complies with maritime safety regulations.",
    icon: <Ship className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1UHNiZAqGEk-mHrcQ9T8P6nazVOizT8VE/view"
  },
  {
    title: "Certificate of Nationality",
    desc: "Officially registered under the Indonesian flag holding a valid Pas Besar, confirming its legal national status.",
    icon: <Flag className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1J22XEt4JlIrjt7FCteDVcc2Gs1aZQxZh/view"
  },
  {
    title: "Minimum Safe Manning",
    desc: "Confirms that our vessel operates with the minimum required number of qualified crew members for safe operations.",
    icon: <Users className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1_M2Aww95R78OlIoGUsfiTSPALtbYKuBz/view"
  },
  {
    title: "International Tonnage Certificate",
    desc: "Holds a valid certificate confirming its registered gross and net tonnage in accordance with international standards.",
    icon: <Scale className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1XIQo8EumXkT2s1f7CDiwwJBBQmqwwE7y/view"
  },
  {
    title: "Provisional Load Line",
    desc: "Confirms the approved safe loading limits and compliance with maritime safety regulations for secure vessel operations.",
    icon: <Ruler className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1pYUnezjP8slJYeBlLfPqYOtIutxBF6AW/view"
  },
  {
    title: "Inflatable Life Rafts",
    desc: "Equipped with inflatable life rafts that comply with international maritime safety standards to ensure passenger safety.",
    icon: <LifeBuoy className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1CJ5X187Qkf5zEGHq87K1tH1X6InUgyNh/view"
  },
  {
    title: "Passenger Boat Safety",
    desc: "Holds official Safety Certificates issued by Indonesia’s Harbor Master (KSOP) confirming seaworthiness.",
    icon: <ShieldCheck className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1Jy2ySWd9RixzFC9YBYFJ1jxd0p5gSZ2e/view"
  }
];

// --- DATA: TECHNICAL DRAWINGS ---
const technicalDocuments = [
  {
    title: "General Arrangement (GA)",
    desc: "A technical drawing showing the main layout of the vessel, including deck areas, cabins, engine room, access routes, and safety equipment locations.",
    icon: <LayoutTemplate className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/file/d/1-gIFxdAmo-2OoFXbHy6XVJZqIXH2U0pe/view"
  },
  {
    title: "Lines Plan",
    desc: "Shows the shape of the vessel’s hull, especially below the waterline. It helps determine the hull form, stability, water flow, and overall sailing efficiency.",
    icon: <PenTool className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/file/d/1ds-JESETJ5z507f60RCUZ0fRfzootjHT/view"
  },
  {
    title: "Fire Safety Plan",
    desc: "Shows the vessel’s fire prevention, detection, and emergency response arrangements including extinguishers, alarms, hoses, and emergency exits.",
    icon: <Flame className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/file/d/1xjdskzMfvuWT1mf4n9jDcn-J4h7NVUlE/view"
  },
  {
    title: "Midship",
    desc: "Refers to the central section of the vessel. It is an important reference point for checking balance, stability, load distribution, and structural strength.",
    icon: <Scale className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/file/d/1FzxeBd-XoULY4-FX6w--aWw6oxFGbTWj/view"
  },
  {
    title: "Preliminary Stability Calculation",
    desc: "A technical assessment used to evaluate the vessel’s initial stability in the water, estimating its ability to stay balanced and handle load distribution.",
    icon: <Ship className="w-8 h-8 text-blue-400" />,
    link: "https://drive.google.com/file/d/1hfkScwC2u8mKVFc3O9k8XaxvqLdi13Zl/view"
  }
];

// --- DATA: SPECIFICATIONS ---
const specifications = [
  {
    title: "Route & Schedule",
    icon: <MapPin className="w-6 h-6 text-[#B88E52]" />,
    items: ["Lombok (Kayangan) ➔ Labuan Bajo", "Fixed Departures: Every Saturday", "Adjustable to weather conditions"]
  },
  {
    title: "Capacity & Crew",
    icon: <Users className="w-6 h-6 text-[#B88E52]" />,
    items: ["Max 46 Passengers", "8 Professional Crew Members", "Trained in emergency handling"]
  },
  {
    title: "Cabins",
    icon: <BedDouble className="w-6 h-6 text-[#B88E52]" />,
    items: ["Private Cabins (Couples/Privacy)", "Shared Cabins (Backpackers)", "Space-efficient arrangement"]
  },
  {
    title: "Bathroom Facilities",
    icon: <Droplets className="w-6 h-6 text-[#B88E52]" />,
    items: ["Shared toilet & shower facilities", "Regular staff cleaning", "Efficient freshwater management"]
  },
  {
    title: "Onboard Amenities",
    icon: <Wifi className="w-6 h-6 text-[#B88E52]" />,
    items: ["Open deck lounge & Dining area", "Mobile charging stations", "WiFi (Subject to signal coverage)"]
  },
  {
    title: "Safety Gear",
    icon: <LifeBuoy className="w-6 h-6 text-[#B88E52]" />,
    items: ["Inflatable Life rafts & Jackets", "Rescue boat (Sekoci)", "Flares & Fire extinguishers"]
  },
  {
    title: "Navigation",
    icon: <Compass className="w-6 h-6 text-[#B88E52]" />,
    items: ["Marine Radar", "GPS Navigation", "AIS / Marine Radio"]
  },
  {
    title: "Medical & Snorkeling",
    icon: <Waves className="w-6 h-6 text-[#B88E52]" />,
    items: ["First aid kit (P3K) & Basics", "Motion sickness support", "Snorkeling masks included"]
  }
];

export default function BoatDetailsPage() {
  const waNumber = "6287817865690";
  const generalWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20want%20to%20know%20more%20about%20the%20KM%20Pulau%20Mas%2088%20boat%20details.`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] overflow-x-hidden">
      
      {/* 1. HERO SECTION (Cinematic Vessel Focus) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105" 
          style={{ backgroundImage: `url('${imgVessel}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/90 via-[#11223a]/40 to-[#11223a]"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg uppercase tracking-widest">
            <ShieldCheck className="h-4 w-4" />
            Verified Direct Operator
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            KM Pulau Mas 88
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            Built for adventure. Engineered for safety. <br className="hidden md:block" /> Explore the specifications, amenities, and official legalities of our flagship vessel.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll to Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#B88E52] to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. OVERVIEW & DESTINATIONS GALLERY */}
      <section className="py-24 px-6 lg:px-12 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B88E52]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center relative z-10">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">The Experience</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a] leading-tight">
                Designed for the <br /> Ultimate Voyage
              </motion.h2>
            </div>
            
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Experience the untamed beauty of Komodo National Park with an affordable yet premium sailing trip aboard <strong>KM Pulau Mas 88</strong>. We bridge the gap between backpacker adventure and essential comfort.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Sail through stunning archipelagos, swim alongside majestic whale sharks, encounter legendary prehistoric dragons, and relax on pristine pink sands. Our vessel is your floating sanctuary throughout this unforgettable 4D3N journey.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-6 border-t border-gray-100 flex items-center gap-6">
               <div className="flex -space-x-4">
                 <img src={imgWhaleShark} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="Wildlife" />
                 <img src={imgPadar} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="Landscapes" />
                 <img src={imgPinkBeach} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="Beaches" />
               </div>
               <p className="text-sm font-bold text-[#11223a]">Unlocking 10+ <br/><span className="text-gray-500 font-normal">Breathtaking Destinations</span></p>
            </motion.div>
          </motion.div>

          {/* Aesthetic Bento Collage of Destinations */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6 h-[500px] md:h-[600px]"
          >
            <div className="col-span-1 grid grid-rows-2 gap-4 md:gap-6 h-full">
              <div className="row-span-1 rounded-[2rem] overflow-hidden shadow-xl group">
                <img src={imgKomodo} alt="Komodo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="row-span-1 rounded-[2rem] overflow-hidden shadow-xl group relative">
                <img src={imgPinkBeach} alt="Pink Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold tracking-wide">Pink Beach</div>
              </div>
            </div>
            <div className="col-span-1 rounded-[2rem] overflow-hidden shadow-xl group relative h-full">
              <img src={imgPadar} alt="Padar Island" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white font-bold tracking-wide text-xl">Padar Island</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BOAT SPECIFICATIONS - TECHNICAL SHEET STYLE (REVISED) */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-y border-gray-200 relative">
        {/* Background Ornament */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B88E52]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          
          {/* Left Side: Sticky Title */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit"
          >
            <span className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Vessel Details
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#11223a] mb-6 leading-tight">Cruise <br className="hidden lg:block"/> Facilities</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Engineered for comfort and safety. Explore the full technical capabilities and onboard amenities of KM Pulau Mas 88.
            </p>
            
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Info className="w-6 h-6 text-[#B88E52] mb-3" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Important Note:</strong> WiFi availability depends on mobile signal coverage. Routes and activities may be adjusted to ensure passenger safety based on weather conditions.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Specs List */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
          >
            {specifications.map((spec, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="border-t border-gray-200 pt-6 group"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-white border border-[#B88E52]/20 flex items-center justify-center text-[#B88E52] shadow-sm group-hover:bg-[#B88E52] group-hover:text-white transition-colors duration-300">
                    {spec.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#11223a]">{spec.title}</h3>
                </div>
                <ul className="space-y-3">
                  {spec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-[#B88E52] mt-0.5 font-bold">•</span>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </section>

      {/* 4. TECHNICAL DRAWINGS (DARK ARCHITECTURAL THEME) */}
      <section className="py-24 px-6 lg:px-12 bg-[#0b1728] text-white relative overflow-hidden">
        {/* Blueprint Grid Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 md:flex justify-between items-end gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <MapIcon className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Architectural Blueprints</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Technical Drawings & Plans</h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Transparency is key to trust. Below are the structural arrangements, stability assessments, and emergency planning modules of KM Pulau Mas 88, engineered for maximum operational safety.
              </p>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {technicalDocuments.map((doc, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-[#11223a]/50 backdrop-blur-md border border-blue-900/50 p-8 rounded-[2rem] hover:bg-[#11223a] hover:border-blue-500/30 transition-all duration-300 group flex flex-col shadow-2xl"
              >
                <div className="mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 origin-left">
                  {doc.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-100 group-hover:text-blue-400 transition-colors">{doc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow font-light">{doc.desc}</p>
                <a 
                  href={doc.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 group-hover:text-blue-400 transition-colors mt-auto uppercase tracking-widest"
                >
                  See Blueprint <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. GRID LEGAL DOCUMENTS SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Compliance</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Official Legality & Licensing</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We operate in strict compliance with Indonesian maritime tourism regulations. We are a direct operator, not a middleman. Explore our verified certificates below.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {safetyDocuments.map((doc, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-[#fdfaf5] rounded-[2rem] p-8 border border-[#B88E52]/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                <div className="h-16 w-16 rounded-2xl bg-white border border-[#B88E52]/20 flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#B88E52] group-hover:border-[#B88E52] transition-colors duration-300">
                   <div className="group-hover:text-white transition-colors duration-300">
                     {doc.icon}
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#11223a] mb-4 group-hover:text-[#B88E52] transition-colors leading-snug">{doc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {doc.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-[#B88E52]/10">
                  <a 
                    href={doc.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#11223a] font-bold text-sm hover:text-[#B88E52] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B88E52]" /> View Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
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
           
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Sail With Peace of Mind</h2>
           <p className="text-gray-300 mb-10 text-lg md:text-xl relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
              Our verified vessels and expert crew are ready to guide you safely through the breathtaking landscapes of Komodo National Park.
           </p>
           <a 
              href={generalWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(184,142,82,0.4)] transform hover:scale-105 relative z-10"
            >
              Consult With Our Team <ArrowRight className="h-5 w-5" />
            </a>
        </motion.div>
      </section>

    </main>
  );
}