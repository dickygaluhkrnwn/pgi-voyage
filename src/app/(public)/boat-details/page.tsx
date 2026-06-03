'use client';

import { ArrowRight, FileText, Award, Ship, Flag, Users, Scale, Ruler, LifeBuoy, Flame, ShieldCheck, FileSignature, CheckCircle2, MapPin, BedDouble, Droplets, Wifi, Compass, HeartPulse, Waves, PenTool, LayoutTemplate, Info } from "lucide-react";
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

// --- DATA: LEGAL DOCUMENTS ---
const safetyDocuments = [
  {
    title: "Business Identification Number (NIB)",
    desc: "An official tourism business license registered through Indonesia’s OSS (Online Single Submission) system, allowing us to operate legally and professionally in the tourism industry.",
    icon: <FileText className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1RkJcmdVgNFVH-0dthOwD5Xaah19SXmUD/view"
  },
  {
    title: "Legal Company Certification",
    desc: "An official certification from the Indonesian Ministry confirming that our company is legally registered and recognized as a licensed business entity in Indonesia.",
    icon: <Award className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1IgbQsB5Vpu1gXpFxyL4j_YQIgnUSsFs7/view"
  },
  {
    title: "Approved Vessel Operational Plan (RPK)",
    desc: "Our vessels operate under officially approved Vessel Operational Plans (RPK), ensuring every sailing route and schedule complies with Indonesian maritime safety and transport regulations.",
    icon: <Ship className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1UHNiZAqGEk-mHrcQ9T8P6nazVOizT8VE/view"
  },
  {
    title: "Certificate of Nationality (Pas Besar)",
    desc: "Our vessel is officially registered under the Indonesian flag and holds a valid Pas Besar (Certificate of Nationality), confirming its legal registration and recognized national status.",
    icon: <Flag className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1J22XEt4JlIrjt7FCteDVcc2Gs1aZQxZh/view"
  },
  {
    title: "Minimum Safe Manning Certification",
    desc: "This official maritime certification confirms that our vessel operates with the minimum required number of qualified crew members to ensure safe and proper vessel operations.",
    icon: <Users className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1_M2Aww95R78OlIoGUsfiTSPALtbYKuBz/view"
  },
  {
    title: "International Tonnage Certificate",
    desc: "Our vessel holds a valid International Tonnage Certificate, confirming its registered gross and net tonnage in accordance with international maritime standards and regulations.",
    icon: <Scale className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1XIQo8EumXkT2s1f7CDiwwJBBQmqwwE7y/view"
  },
  {
    title: "Provisional Load Line Certificate",
    desc: "Our vessel holds a valid Provisional Load Line Certificate, confirming the approved safe loading limits and compliance with maritime safety regulations for secure vessel operations.",
    icon: <Ruler className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1pYUnezjP8slJYeBlLfPqYOtIutxBF6AW/view"
  },
  {
    title: "Inflatable Life Rafts",
    desc: "Each of our vessels is equipped with inflatable life rafts that comply with international maritime safety standards to ensure passenger safety during every journey.",
    icon: <LifeBuoy className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1CJ5X187Qkf5zEGHq87K1tH1X6InUgyNh/view"
  },
  {
    title: "Fire Extinguishers",
    desc: "All of our vessels are equipped with certified fire extinguishers strategically placed throughout the boat to ensure quick access and enhanced safety during emergencies.",
    icon: <Flame className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/17ovZTYJVgSEuFrm8iKlutvHgMfJL-Pt6/view"
  },
  {
    title: "Traditional Passenger Boat Safety",
    desc: "Our vessels hold official Safety Certificates issued by Indonesia’s Harbor Master (KSOP), confirming compliance with national maritime safety standards and seaworthiness regulations.",
    icon: <ShieldCheck className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1Jy2ySWd9RixzFC9YBYFJ1jxd0p5gSZ2e/view"
  },
  {
    title: "Operational Appointment Letter",
    desc: "An official company letter from CV. Pulau Mas Mulia confirming that KM. Pulau Mas 88 is appointed and authorized for company operations, including vessel identity, ownership, and details.",
    icon: <FileSignature className="w-8 h-8 text-[#B88E52]" />,
    link: "https://drive.google.com/file/d/1XZSzecpSoWVr5S9w-nu79WB_D8zjMW8N/view"
  }
];

// --- DATA: TECHNICAL DRAWINGS ---
const technicalDocuments = [
  {
    title: "General Arrangement (GA)",
    desc: "A technical drawing showing the main layout of the vessel, including deck areas, cabins, engine room, access routes, and safety equipment locations.",
    icon: <LayoutTemplate className="w-8 h-8 text-[#B88E52]" />
  },
  {
    title: "Lines Plan",
    desc: "Shows the shape of the vessel’s hull, especially below the waterline. It helps determine the hull form, stability, water flow, and overall sailing efficiency.",
    icon: <PenTool className="w-8 h-8 text-[#B88E52]" />
  },
  {
    title: "Fire Safety Plan",
    desc: "Shows the vessel’s fire prevention, detection, and emergency response arrangements including extinguishers, alarms, hoses, and emergency exits.",
    icon: <Flame className="w-8 h-8 text-[#B88E52]" />
  },
  {
    title: "Midship",
    desc: "Refers to the central section of the vessel. It is an important reference point for checking balance, stability, load distribution, and structural strength.",
    icon: <Scale className="w-8 h-8 text-[#B88E52]" />
  },
  {
    title: "Preliminary Stability Calculation",
    desc: "A technical assessment used to evaluate the vessel’s initial stability in the water, estimating its ability to stay balanced and handle load distribution.",
    icon: <Ship className="w-8 h-8 text-[#B88E52]" />
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
    items: ["Max 46 Passengers", "8 Professional Crew Members", "Trained in emergency & guest service"]
  },
  {
    title: "Cabins",
    icon: <BedDouble className="w-6 h-6 text-[#B88E52]" />,
    items: ["Private Cabins (Couples/Privacy)", "Shared Cabins (Solo/Backpackers)", "Space-efficient arrangement"]
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
    items: ["First aid kit (P3K) & Basics", "Motion sickness support", "Snorkeling masks & tubes included"]
  }
];

export default function BoatDetailsPage() {
  const waNumber = "6287817865690";
  const generalWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20want%20to%20know%20more%20about%20the%20KM%20Pulau%20Mas%2088%20boat%20details.`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa]">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#11223a]/60 to-transparent"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
            <Ship className="h-4 w-4" />
            The Vessel
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            KM Pulau Mas 88 <br />
            <span className="italic font-serif text-[#B88E52] text-3xl md:text-5xl">Specifications & Legality</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            A budget-friendly liveaboard offering essential comfort, reliable safety, and practical onboard facilities for your ultimate Lombok to Komodo adventure.
          </motion.p>
        </motion.div>
      </section>

      {/* OVERVIEW & GALLERY SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-1/2 space-y-6"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#11223a]">
              Overview: The Sailing Experience
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Experience the beauty of Komodo National Park with an affordable and adventurous sailing trip aboard <strong>KM Pulau Mas 88</strong>.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Our Boat Komodo Tour is designed for backpackers, adventurous travelers, and budget-conscious guests who want to enjoy a complete Lombok to Komodo sailing experience without compromising safety and essential comfort.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg leading-relaxed">
              Sail through stunning islands, swim with whale sharks in Sumbawa, visit Komodo dragons, hike Padar Island, relax at Pink Beach, and explore more breathtaking destinations. This package is perfect for first-time Komodo travelers looking for a fun and well-organized adventure.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 grid grid-cols-2 gap-4 h-[500px]"
          >
            <div className="col-span-1 h-full rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" alt="KM Pulau Mas 88" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4 h-full">
              <div className="row-span-1 rounded-3xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" alt="Cabin Preview" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="row-span-1 rounded-3xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop" alt="Deck Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOAT SPECIFICATIONS BENTO GRID */}
      <section className="py-20 px-6 lg:px-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-4">Cruise Information & Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about the amenities and capabilities of KM Pulau Mas 88.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {specifications.map((spec, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                  {spec.icon}
                </div>
                <h3 className="text-lg font-bold text-[#11223a] mb-4">{spec.title}</h3>
                <ul className="space-y-3">
                  {spec.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B88E52] shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-10 bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900/80 leading-relaxed">
              <strong>Important Notes:</strong> WiFi availability depends on mobile signal coverage across the islands and may not be available in remote areas. Routes, schedules, and activities may change depending on weather, sea conditions, and safety considerations. Guest safety will always be our top priority.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNICAL DRAWINGS (NEW) */}
      <section className="py-24 px-6 lg:px-12 bg-[#11223a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-px bg-[#B88E52]"></div>
                <span className="text-[#B88E52] font-semibold text-sm uppercase tracking-wider">Vessel Blueprints</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Drawings & Plans</h2>
              <p className="text-gray-300 text-lg">Documents detailing the structural arrangement, stability, and emergency planning of the vessel to ensure maximum operational safety.</p>
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col"
              >
                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {doc.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{doc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{doc.desc}</p>
                <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 text-sm font-semibold text-[#B88E52] group-hover:text-white transition-colors mt-auto">
                  See The Document <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GRID LEGAL DOCUMENTS SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#11223a]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6">Official Legality & Licensing</h2>
            <p className="text-gray-600 text-lg">
              We operate in strict compliance with Indonesian maritime tourism regulations. Explore our verified certificates below.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {safetyDocuments.map((doc, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/40 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
              >
                <div className="h-16 w-16 rounded-2xl bg-[#fdfaf5] border border-[#B88E52]/20 flex items-center justify-center mb-6 group-hover:bg-[#B88E52] group-hover:border-[#B88E52] transition-colors duration-300">
                   <div className="group-hover:text-white transition-colors duration-300">
                     {doc.icon}
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#11223a] mb-4 group-hover:text-[#B88E52] transition-colors">{doc.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {doc.desc}
                </p>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <a 
                    href={doc.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#11223a] font-semibold text-sm hover:text-[#B88E52] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B88E52]" /> View Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
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
           
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Sail With Peace of Mind</h2>
           <p className="text-gray-300 mb-10 text-lg relative z-10 max-w-xl mx-auto">
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