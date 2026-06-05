'use client';

import { motion, Variants } from "framer-motion";
import { ArrowRight, Camera, Star, Quote, MapPin, Ship, Waves, Mountain, Compass } from "lucide-react";

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

// --- ASET GAMBAR DARI PIMPINAN ---
const imgVessel = "/images/Kapal_Pulau_Mas_88.png";
const imgPadar = "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=773&auto=format&fit=crop";
const imgWhaleShark = "https://images.unsplash.com/photo-1580580297368-c782fb65d271?q=80&w=774&auto=format&fit=crop";
const imgKomodo = "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=870&auto=format&fit=crop";
const imgPinkBeach = "https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=929&auto=format&fit=crop";

// --- STRUKTUR DATA GALERI BERDASARKAN KELOMPOK ---
// Catatan: Gambar diduplikasi sementara agar grid terlihat penuh saat presentasi.
const galleryCollections = [
  {
    id: "vessel",
    title: "KM Pulau Mas 88",
    subtitle: "The Flagship Vessel",
    desc: "Engineered for adventure, designed for comfort. Explore the exterior and interior of our trusted sailing companion.",
    icon: <Ship className="w-6 h-6 text-[#B88E52]" />,
    images: [
      { src: imgVessel, span: "md:col-span-2 md:row-span-2" },
      { src: imgVessel, span: "col-span-1 row-span-1" },
      { src: imgVessel, span: "col-span-1 row-span-1" },
    ]
  },
  {
    id: "padar",
    title: "Padar Island",
    subtitle: "The Iconic Viewpoint",
    desc: "A breathtaking hike leading to a panoramic view of three uniquely colored bays. The crown jewel of the archipelago.",
    icon: <Mountain className="w-6 h-6 text-[#B88E52]" />,
    images: [
      { src: imgPadar, span: "col-span-1 row-span-1" },
      { src: imgPadar, span: "col-span-1 row-span-1" },
      { src: imgPadar, span: "md:col-span-2 row-span-1" },
    ]
  },
  {
    id: "komodo",
    title: "Komodo National Park",
    subtitle: "The Jurassic Realm",
    desc: "Step into the wild and encounter the legendary Komodo dragons in their natural, protected habitat.",
    icon: <Compass className="w-6 h-6 text-[#B88E52]" />,
    images: [
      { src: imgKomodo, span: "md:col-span-2 row-span-1" },
      { src: imgKomodo, span: "col-span-1 row-span-2" },
      { src: imgKomodo, span: "col-span-1 row-span-1" },
    ]
  },
  {
    id: "whaleshark",
    title: "Saleh Bay",
    subtitle: "Gentle Giants",
    desc: "An unforgettable underwater experience swimming alongside the majestic and peaceful whale sharks.",
    icon: <Waves className="w-6 h-6 text-[#B88E52]" />,
    images: [
      { src: imgWhaleShark, span: "col-span-1 row-span-2" },
      { src: imgWhaleShark, span: "md:col-span-2 row-span-1" },
      { src: imgWhaleShark, span: "col-span-1 row-span-1" },
    ]
  },
  {
    id: "pinkbeach",
    title: "The Pink Beach",
    subtitle: "Pristine Shores",
    desc: "Relax on striking pink sands and snorkel in the crystal-clear turquoise waters teeming with marine life.",
    icon: <MapPin className="w-6 h-6 text-[#B88E52]" />,
    images: [
      { src: imgPinkBeach, span: "col-span-1 row-span-1" },
      { src: imgPinkBeach, span: "col-span-1 row-span-1" },
      { src: imgPinkBeach, span: "md:col-span-2 row-span-2" },
      { src: imgPinkBeach, span: "col-span-1 row-span-1" },
      { src: imgPinkBeach, span: "col-span-1 row-span-1" },
    ]
  }
];

export default function GalleryPage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20saw%20your%20amazing%20gallery%20and%20want%20to%20book%20a%20trip!`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105" 
          style={{ backgroundImage: `url('${imgPadar}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#11223a]/60 to-transparent"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg uppercase tracking-widest">
            <Camera className="h-4 w-4" />
            The Visual Journey
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Moments Captured, <br />
            <span className="italic font-serif text-[#B88E52]">Memories Made</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light">
            A visual journey through the untamed beauty of the Indonesian archipelago. Explore our curated collections below.
          </motion.p>
        </motion.div>
      </section>

      {/* COLLECTIONS SECTION (GROUPED GALLERY) */}
      <section className="py-20 px-6 lg:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {galleryCollections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20`}
            >
              
              {/* Collection Header (Sticky Sidebar) */}
              <div className="w-full lg:w-1/3">
                <motion.div variants={fadeInUp} className="sticky top-32">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#B88E52]/20 flex items-center justify-center mb-6 shadow-sm">
                    {collection.icon}
                  </div>
                  <span className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-2 block">
                    {collection.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6">
                    {collection.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {collection.desc}
                  </p>
                  <div className="w-12 h-1 bg-gray-200 rounded-full"></div>
                </motion.div>
              </div>

              {/* Collection Grid Images */}
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px] grid-flow-dense">
                  {collection.images.map((image, imgIdx) => (
                    <motion.div
                      key={imgIdx}
                      variants={fadeInUp}
                      className={`relative overflow-hidden rounded-[2rem] group cursor-pointer bg-gray-200 shadow-md ${image.span}`}
                    >
                      <img
                        src={image.src}
                        alt={`${collection.title} ${imgIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark Overlay on Hover */}
                      <div className="absolute inset-0 bg-[#11223a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* View Text */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="bg-white/90 backdrop-blur-sm text-[#11223a] font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          View
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIAL BANNER */}
      <section className="py-24 px-6 lg:px-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto bg-[#fdfaf5] rounded-[3rem] p-10 md:p-16 border border-[#B88E52]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
          <Quote className="absolute top-8 right-10 md:right-16 w-24 h-24 text-[#B88E52]/10 rotate-180 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-[#B88E52] rounded-full blur-md opacity-30 transform translate-y-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Happy Guest" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white relative z-10"
              />
            </div>
            <div>
              <div className="flex gap-1 text-[#B88E52] mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <h4 className="text-2xl md:text-3xl font-serif italic text-[#11223a] mb-6 leading-relaxed font-light">
                "The most incredible 4 days of my life. The crew was impeccable, the food was gourmet, and waking up to the Komodo sunrise from our cabin was pure magic."
              </h4>
              <p className="font-bold text-[#11223a] text-lg">— Marcus & Elena</p>
              <p className="text-[#B88E52] font-semibold text-sm uppercase tracking-wider mt-1">Explored in August 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="py-24 px-6 text-center bg-[#f8f9fa]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
             <Camera className="w-8 h-8 text-[#B88E52]" />
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Create Your Own Memories</h2>
           <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto">
              Follow our latest voyages, get inspired for your next adventure, or secure your cabin today before we are fully booked.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
                href={b2cWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(184,142,82,0.3)] transform hover:-translate-y-1"
              >
                Book Your Voyage <ArrowRight className="h-5 w-5" />
              </a>
           </div>
        </motion.div>
      </section>

    </main>
  );
}