'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Camera, 
  Play, 
  X, 
  MapPin, 
  Compass, 
  Ship,
  Waves,
  Mountain,
  Calendar,
  Loader2,
  Images
} from "lucide-react";

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

// --- CATEGORY DATA (Editorial View) ---
const categories = [
  { id: 'all', label: 'All Destinations', icon: Compass, subtitle: '', desc: '' },
  { id: 'vessel', label: 'KM Pulau Mas 88', icon: Ship, subtitle: 'The Flagship Vessel', desc: 'Engineered for adventure, designed for comfort. Explore the exterior and interior of our trusted sailing companion.' },
  { id: 'kenawa', label: 'Kenawa Island', icon: Mountain, subtitle: 'The Hidden Savannah', desc: 'A breathtaking hike leading to a panoramic view of golden grasslands and a tropical sunset.' },
  { id: 'whaleshark', label: 'Whale Sharks', icon: Waves, subtitle: 'Gentle Giants', desc: 'An unforgettable underwater experience swimming alongside the majestic and peaceful whale sharks.' },
  { id: 'komodo', label: 'Komodo Island', icon: MapPin, subtitle: 'The Jurassic Realm', desc: 'Step into the wild and encounter the legendary Komodo dragons in their natural, protected habitat.' },
  { id: 'pinkbeach', label: 'Pink Beach', icon: MapPin, subtitle: 'Pristine Shores', desc: 'Relax on striking pink sands and snorkel in the crystal-clear turquoise waters teeming with marine life.' },
  { id: 'padar', label: 'Padar Island', icon: Mountain, subtitle: 'The Iconic Viewpoint', desc: 'A breathtaking hike leading to a panoramic view of three uniquely colored bays. The crown jewel of the archipelago.' },
  { id: 'majarite', label: 'Majarite & Kelor', icon: Waves, subtitle: 'Snorkeling Paradise', desc: 'Explore colorful coral reefs, vibrant marine life, and relax on untouched white sandy beaches.' },
];

type MediaType = 'image' | 'reel';

interface MediaItem {
  id: string;
  categoryId: string;
  tripId?: string;
  tripName?: string;
  type: MediaType;
  src: string;
  title: string;
  location: string;
  createdAt?: any;
}

// Helper untuk menghasilkan pola grid yang dinamis
const getGridSpanClass = (index: number) => {
  const patternIndex = index % 7;
  switch (patternIndex) {
    case 0: return "col-span-2 md:col-span-2 row-span-2"; // Item besar
    case 3: return "col-span-1 md:col-span-2 row-span-1"; // Item melebar
    case 6: return "col-span-1 md:col-span-1 row-span-2"; // Item meninggi
    default: return "col-span-1 row-span-1";              // Item standar
  }
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  
  // States for fetching data from Firestore
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PMM%20Voyage,%20I%20saw%20your%20amazing%20gallery%20and%20want%20to%20book%20a%20trip!`;

  // Ambil data galeri dari Firestore "galleries"
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'galleries'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const data: MediaItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as MediaItem);
        });
        
        setMediaList(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Filter media based on active tab
  const filteredMedia = activeTab === 'all' 
    ? mediaList 
    : mediaList.filter(m => m.categoryId === activeTab);

  const reels = filteredMedia.filter(m => m.type === 'reel');
  const images = filteredMedia.filter(m => m.type === 'image');

  // Categories excluding 'all' for the editorial mapping (Tab ALL)
  const editorialCategories = categories.filter(c => c.id !== 'all');

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen overflow-x-hidden select-none">
      
      {/* 1. HERO SECTION (FRESH: EXHIBITION STYLE) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex items-center min-h-[70vh] lg:min-h-[85vh]">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#B88E52]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Side: Text Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 text-center lg:text-left pt-12 lg:pt-0"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#B88E52] text-xs font-bold mb-6 backdrop-blur-md uppercase tracking-widest shadow-sm">
              <Images className="h-4 w-4" />
              Exhibition Gallery
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Moments Captured, <br />
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B88E52] to-[#eaddbd]">
                Memories Made
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-10">
              A curated visual journey through the untamed beauty of the Indonesian archipelago. Explore the pristine waters, majestic wildlife, and unforgettable voyages.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold text-lg transition-all shadow-[0_4px_20px_rgba(184,142,82,0.3)] hover:-translate-y-1"
               >
                  Explore Collection
               </button>
            </motion.div>
          </motion.div>

          {/* Right Side: Floating Photo Stack */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] hidden sm:block pointer-events-none"
          >
            {/* Back Photo (Padar) */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-6, -6, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[10%] right-[20%] w-64 md:w-72 lg:w-80 h-80 md:h-96 bg-white p-3 pb-12 rounded-lg shadow-2xl z-10"
            >
              <img src="https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=600" className="w-full h-full object-cover rounded shadow-inner" alt="Padar" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            </motion.div>

            {/* Middle Photo (Whale Shark) */}
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [8, 8, 8] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-[20%] left-[10%] w-56 md:w-64 lg:w-72 h-72 md:h-80 bg-white p-3 pb-12 rounded-lg shadow-2xl z-20"
            >
              <img src="https://images.unsplash.com/photo-1580580297368-c782fb65d271?q=80&w=600" className="w-full h-full object-cover rounded shadow-inner" alt="Whale Shark" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            </motion.div>

            {/* Front Photo (Pink Beach) */}
            <motion.div 
              animate={{ y: [0, -10, 0], rotate: [-2, -2, -2] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[5%] right-[10%] lg:right-[30%] w-64 md:w-80 lg:w-96 h-64 md:h-80 bg-white p-3 pb-12 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-30"
            >
              <img src="https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=600" className="w-full h-full object-cover rounded shadow-inner" alt="Pink Beach" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. CATEGORY TABS (FILTER) */}
      <section className="sticky top-20 z-40 bg-[#f8f9fa]/90 backdrop-blur-md border-b border-gray-200 py-4 px-6 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex overflow-x-auto hide-scrollbar gap-3 pb-2 pt-1 snap-x">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 snap-center font-medium text-sm ${
                  isActive 
                    ? 'bg-[#11223a] text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#B88E52] hover:text-[#B88E52]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B88E52]' : ''}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="w-full flex flex-col min-h-[50vh]">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
             <Loader2 className="w-12 h-12 text-[#B88E52] animate-spin mb-4" />
             <p className="text-gray-500 font-medium">Loading Visual Masterpieces...</p>
          </div>
        ) : (
          <>
            {/* 3. REELS / STORY HIGHLIGHTS */}
            {reels.length > 0 && (
              <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-16 pb-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#11223a] flex items-center gap-3">
                      Trip Stories
                      <span className="bg-red-500 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse">Hot</span>
                    </h2>
                    <p className="text-gray-500 mt-2">Breathtaking vertical moments from our recent voyages.</p>
                  </div>
                </div>
                
                <div className="flex overflow-x-auto hide-scrollbar gap-6 pb-8 snap-x scroll-smooth">
                  <AnimatePresence>
                    {reels.map((reel) => (
                      <motion.div
                        key={reel.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setLightboxItem(reel)}
                        className="relative shrink-0 w-64 h-[420px] rounded-3xl overflow-hidden cursor-pointer group snap-center shadow-lg bg-gray-200"
                        onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Div
                      >
                        <video 
                          src={reel.src} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" 
                          muted 
                          loop 
                          playsInline 
                          autoPlay 
                          onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Video
                          controlsList="nodownload" // Sembunyikan tombol download native
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform shadow-xl">
                            <Play className="w-6 h-6 ml-1 fill-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                          <h3 className="text-white font-bold text-lg leading-tight mb-1">{reel.title}</h3>
                          <p className="text-white/80 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {reel.location}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            )}

            {/* 4. MAIN CONTENT AREA */}
            
            {/* SCENARIO A: 'ALL' TAB */}
            {activeTab === 'all' && (
              <div className="w-full flex flex-col">
                {editorialCategories
                  .filter((cat) => mediaList.some((m) => m.categoryId === cat.id && m.type === 'image'))
                  .map((cat, index) => {
                    const catImages = mediaList.filter(m => m.categoryId === cat.id && m.type === 'image').slice(0, 4); 
                    const isEven = index % 2 === 0;
                    const sectionBg = isEven ? 'bg-white' : 'bg-[#f8f9fa] border-y border-gray-100';

                    return (
                      <motion.section 
                        key={cat.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className={`w-full py-20 lg:py-32 px-6 lg:px-12 transition-colors duration-500 ${sectionBg}`}
                      >
                        <div className={`max-w-7xl mx-auto flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20`}>
                          <div className="w-full lg:w-1/3">
                            <motion.div variants={fadeInUp} className="sticky top-40">
                              <div className="w-14 h-14 rounded-2xl bg-white border border-[#B88E52]/20 flex items-center justify-center mb-6 shadow-sm">
                                <cat.icon className="w-6 h-6 text-[#B88E52]" />
                              </div>
                              <span className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-2 block">
                                {cat.subtitle}
                              </span>
                              <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6">
                                {cat.label}
                              </h2>
                              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {cat.desc}
                              </p>
                              <button 
                                onClick={() => {
                                  setActiveTab(cat.id);
                                  window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
                                }}
                                className="group inline-flex items-center gap-2 text-[#11223a] font-bold border-b-2 border-[#11223a] pb-1 hover:text-[#B88E52] hover:border-[#B88E52] transition-colors"
                              >
                                Explore More Photos <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          </div>

                          <div className="w-full lg:w-2/3">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px] grid-flow-dense">
                              {catImages.map((image, imgIdx) => {
                                const spanClass = getGridSpanClass(imgIdx);

                                return (
                                  <motion.div
                                    key={image.id}
                                    variants={fadeInUp}
                                    onClick={() => setLightboxItem(image)}
                                    onContextMenu={(e) => e.preventDefault()} // Anti Right-Click
                                    className={`relative overflow-hidden rounded-[2rem] group cursor-pointer bg-gray-200 shadow-md ${spanClass}`}
                                  >
                                    <img
                                      src={image.src}
                                      alt={image.title}
                                      draggable={false} // Anti Drag-and-Drop
                                      onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Image
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                                    />
                                    <div className="absolute inset-0 bg-[#11223a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-center pointer-events-none">
                                      <span className="bg-white/90 backdrop-blur-sm text-[#11223a] font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        Expand
                                      </span>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.section>
                    );
                })}
              </div>
            )}

            {/* SCENARIO B: SPECIFIC CATEGORY TAB */}
            {activeTab !== 'all' && images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16 space-y-12"
              >
                <div className="mb-8 border-b border-gray-200 pb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#11223a]">
                    {categories.find(c => c.id === activeTab)?.label} Gallery
                  </h2>
                  <p className="text-gray-500 mt-2 text-lg">Browse all captured moments for this destination.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[250px] grid-flow-dense">
                  {images.map((image, index) => {
                    const spanClass = getGridSpanClass(index);

                    return (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setLightboxItem(image)}
                        onContextMenu={(e) => e.preventDefault()} // Anti Right-Click
                        className={`break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-gray-200 ${spanClass}`}
                      >
                        <img 
                          src={image.src} 
                          alt={image.title} 
                          draggable={false} // Anti Drag-and-Drop
                          onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Image
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#11223a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{image.title}</h3>
                            <div className="flex flex-col gap-1">
                              <p className="text-[#B88E52] text-sm flex items-center gap-1 font-medium">
                                <MapPin className="w-3.5 h-3.5" /> {image.location}
                              </p>
                              {image.tripName && (
                                <p className="text-gray-300 text-xs flex items-center gap-1 line-clamp-1">
                                  <Calendar className="w-3 h-3 shrink-0" /> {image.tripName}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {filteredMedia.length === 0 && (
              <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-32 text-center">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-400">Moments are being prepared...</h3>
                <p className="text-gray-500 mt-2">Our crew is currently capturing amazing moments for this destination.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* NEW INSTAGRAM / CINEMATIC CTA */}
      <section className="relative py-32 px-6 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1920&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-[#11223a]/80 backdrop-blur-sm"></div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-16 rounded-[3rem] shadow-2xl pointer-events-auto"
        >
          <div className="w-16 h-16 bg-[#B88E52] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Be Part of the Story</h2>
          <p className="text-white/80 mb-10 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            These pictures could be you. Join our next departure and experience the authentic Komodo & Sumbawa adventure. Your masterpiece awaits.
          </p>
          <a 
            id="btn-wa-booking"
            href={b2cWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#11223a] font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Book Your Voyage <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </section>

      {/* 5. FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxItem(null)}
            onContextMenu={(e) => e.preventDefault()} // Anti Right-Click overlay Lightbox
          >
            <button 
              className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-h-[90vh] flex flex-col items-center justify-center ${lightboxItem.type === 'reel' ? 'max-w-md' : 'max-w-5xl'}`}
              onClick={(e) => e.stopPropagation()} 
            >
              {lightboxItem.type === 'reel' ? (
                 <div className="relative w-full aspect-[9/16] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                   <video 
                     src={lightboxItem.src} 
                     className="w-full h-full object-cover" 
                     controls 
                     autoPlay 
                     playsInline 
                     controlsList="nodownload" // Anti Download Button Native
                     onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Video Lightbox
                   />
                   <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
                   <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                     <h3 className="text-white text-2xl font-bold mb-2">{lightboxItem.title}</h3>
                     <p className="text-white/80 flex items-center gap-1"><MapPin className="w-4 h-4"/> {lightboxItem.location}</p>
                   </div>
                 </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center">
                  <img 
                    src={lightboxItem.src} 
                    alt={lightboxItem.title} 
                    draggable={false} // Anti Drag
                    onContextMenu={(e) => e.preventDefault()} // Anti Right-Click Image Lightbox
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-white text-2xl font-bold">{lightboxItem.title}</h3>
                    <p className="text-[#B88E52] mt-2 flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4"/> {lightboxItem.location}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );  
}