'use client';

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Camera, Star, Quote, MapPin } from "lucide-react";

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

const categories = ["All", "The Vessel", "Destinations", "Wildlife"];

// Kumpulan URL gambar yang dijamin 100% berhasil dimuat untuk presentasi
const imgVessel = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop";
const imgPinkBeach = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop";
const imgKenawa = "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop";
const imgWildlife = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop";
const imgHero = "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop";
const imgCabin = "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop";

const galleryData = [
  {
    id: 1,
    category: "The Vessel",
    src: imgVessel,
    title: "KM Pulau Mas 88",
    desc: "Our elegant phinisi cruising through the calm waters of the archipelago.",
    span: "md:col-span-2 md:row-span-2" 
  },
  {
    id: 2,
    category: "Destinations",
    src: imgKenawa,
    title: "Padar Island Summit",
    desc: "The breathtaking tri-colored beaches viewed from the top.",
    span: "col-span-1 row-span-1" 
  },
  {
    id: 3,
    category: "Wildlife",
    src: imgWildlife,
    title: "Majestic Manta Rays",
    desc: "Swimming alongside the gentle giants at Manta Point.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 4,
    category: "Destinations",
    src: imgPinkBeach,
    title: "The Pink Beach",
    desc: "Pristine pink sands meeting crystal clear turquoise waters.",
    span: "col-span-1 row-span-1" 
  },
  {
    id: 5,
    category: "The Vessel",
    src: imgCabin,
    title: "Premium Cabin",
    desc: "Rest in absolute comfort with ocean views directly from your bed.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 6,
    category: "Wildlife",
    src: imgKenawa,
    title: "Komodo Dragons",
    desc: "A rare encounter with the world's largest living lizards.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 7,
    category: "Destinations",
    src: imgKenawa,
    title: "Kenawa Island",
    desc: "Golden savannas perfectly contrasting the deep blue sea.",
    span: "col-span-1 row-span-1" 
  },
  {
    id: 8,
    category: "Wildlife",
    src: imgWildlife,
    title: "Sea Turtles",
    desc: "Vibrant marine life thrives in the coral reefs of Komodo.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 9,
    category: "The Vessel",
    src: imgHero,
    title: "Sundeck Lounging",
    desc: "Soak in the tropical sun and enjoy panoramic ocean views.",
    span: "col-span-1 row-span-1"
  },
  {
    id: 10,
    category: "Destinations",
    src: imgPinkBeach,
    title: "Kelor Island",
    desc: "A short but steep hike offering a magical view of the surrounding islands.",
    span: "md:col-span-2 row-span-1" 
  },
  {
    id: 11,
    category: "Destinations",
    src: imgCabin,
    title: "Kalong Island",
    desc: "Witness thousands of flying foxes filling the sky at sunset.",
    span: "col-span-1 row-span-1" 
  },
  {
    id: 12,
    category: "Wildlife",
    src: imgWildlife,
    title: "Whale Sharks",
    desc: "A majestic encounter with the gentle giants in Saleh Bay.",
    span: "md:col-span-3 row-span-1" 
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = galleryData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const waNumber = "6281234567890";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20saw%20your%20amazing%20gallery%20and%20want%20to%20book%20a%20trip!`;

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#11223a]/50 to-transparent"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-12"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#B88E52]/60 text-[#B88E52] text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
            <Camera className="h-4 w-4" />
            Social Proof
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Moments Captured, <br />
            <span className="italic font-serif text-[#B88E52]">Memories Made</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            A visual journey through the untamed beauty of the Indonesian archipelago. See what awaits you on our premium liveaboard expedition.
          </motion.p>
        </motion.div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="py-8 px-6 sticky top-[72px] lg:top-[88px] z-40 bg-[#f8f9fa]/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#11223a] text-white shadow-lg shadow-[#11223a]/20 scale-105"
                  : "bg-white text-gray-500 hover:text-[#11223a] hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] grid-flow-dense"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  key={image.id}
                  className={`relative overflow-hidden rounded-3xl group cursor-pointer bg-gray-200 ${image.span}`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Elegant Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B88E52] text-white text-xs font-bold uppercase tracking-wider mb-3">
                       <MapPin className="w-3 h-3" /> {image.category}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{image.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIAL BANNER */}
      <section className="py-20 px-6 lg:px-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto bg-[#fdfaf5] rounded-[3rem] p-10 md:p-16 border border-[#B88E52]/20 relative">
          <Quote className="absolute top-8 right-10 md:right-16 w-20 h-20 text-[#B88E52]/10 rotate-180" />
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="Happy Guest" 
              className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
            />
            <div>
              <div className="flex gap-1 text-[#B88E52] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <h4 className="text-2xl md:text-3xl font-serif italic text-[#11223a] mb-6 leading-relaxed">
                "The most incredible 4 days of my life. The crew was impeccable, the food was gourmet, and waking up to the Komodo sunrise from our cabin was pure magic."
              </h4>
              <p className="font-bold text-[#11223a]">— Marcus & Elena</p>
              <p className="text-gray-500 text-sm">Explored in August 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
           <Camera className="w-12 h-12 text-[#B88E52] mx-auto mb-6" />
           <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6">Join Our Community</h2>
           <p className="text-gray-600 mb-10 text-lg">
              Follow our latest voyages and get inspired for your next adventure.
           </p>
           <a 
              href={b2cWaLink} // Ganti dengan link IG asli nanti
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#11223a] hover:bg-[#0f1f33] text-white font-bold text-lg transition-all shadow-xl transform hover:scale-105"
            >
              Follow @PGIVoyage <ArrowRight className="h-5 w-5" />
            </a>
        </motion.div>
      </section>

    </main>
  );
}