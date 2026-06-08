'use client';

import { useState } from 'react';
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
  Quote,
  Star,
  Calendar,
  ChevronRight
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
  { id: 'whaleshark', label: 'Saleh Bay', icon: Waves, subtitle: 'Gentle Giants', desc: 'An unforgettable underwater experience swimming alongside the majestic and peaceful whale sharks.' },
  { id: 'komodo', label: 'Komodo Island', icon: MapPin, subtitle: 'The Jurassic Realm', desc: 'Step into the wild and encounter the legendary Komodo dragons in their natural, protected habitat.' },
  { id: 'pinkbeach', label: 'Pink Beach', icon: MapPin, subtitle: 'Pristine Shores', desc: 'Relax on striking pink sands and snorkel in the crystal-clear turquoise waters teeming with marine life.' },
  { id: 'padar', label: 'Padar Island', icon: Mountain, subtitle: 'The Iconic Viewpoint', desc: 'A breathtaking hike leading to a panoramic view of three uniquely colored bays. The crown jewel of the archipelago.' },
  { id: 'majarite', label: 'Majarite & Kelor', icon: Waves, subtitle: 'Snorkeling Paradise', desc: 'Explore colorful coral reefs, vibrant marine life, and relax on untouched white sandy beaches.' },
];

// --- TRIPS / VOYAGES DATA (Weekly Deployments) ---
const trips = [
  { id: 't3', name: 'Voyage Chapter 42', date: 'August 15 - 18, 2025' },
  { id: 't2', name: 'Voyage Chapter 41', date: 'August 08 - 11, 2025' },
  { id: 't1', name: 'Voyage Chapter 40', date: 'August 01 - 04, 2025' },
];

// --- DUMMY DATA MEDIA ---
type MediaType = 'image' | 'reel';

interface MediaItem {
  id: string;
  categoryId: string;
  tripId?: string; // Tautan ke perjalanan mingguan
  type: MediaType;
  src: string;
  title: string;
  location: string;
}

const dummyMedia: MediaItem[] = [
  // REELS / VERTICAL SCROLL
  { id: 'r1', categoryId: 'vessel', type: 'reel', src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop', title: 'Sunset Boat Party', location: 'Onboard KM Pulau Mas 88' },
  { id: 'r2', categoryId: 'whaleshark', type: 'reel', src: 'https://images.unsplash.com/photo-1544776192-c8fa8b78a042?q=80&w=600&auto=format&fit=crop', title: 'Swimming with Giants', location: 'Saleh Bay' },
  { id: 'r3', categoryId: 'padar', type: 'reel', src: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=600&auto=format&fit=crop', title: 'The Great Hike', location: 'Padar Island' },
  { id: 'r4', categoryId: 'pinkbeach', type: 'reel', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop', title: 'Crystal Clear Water', location: 'Pink Beach' },
  { id: 'r5', categoryId: 'komodo', type: 'reel', src: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=600&auto=format&fit=crop', title: 'Footsteps of the Dragon', location: 'Komodo Island' },
  { id: 'r6', categoryId: 'kenawa', type: 'reel', src: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop', title: 'Morning Savannah', location: 'Kenawa Island' },
  { id: 'r7', categoryId: 'majarite', type: 'reel', src: 'https://images.unsplash.com/photo-1518182170546-076616fd6dc7?q=80&w=600&auto=format&fit=crop', title: 'Snorkeling Fun', location: 'Majarite' },

  // IMAGES (Assigned to different trips to show grouping)
  // Voyage Chapter 42 (Latest)
  { id: 'i1', tripId: 't3', categoryId: 'vessel', type: 'image', src: '/images/Kapal_Pulau_Mas_88.png', title: 'The Flagship Exterior', location: 'Sailing the Archipelago' },
  { id: 'i2', tripId: 't3', categoryId: 'padar', type: 'image', src: 'https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=800&auto=format&fit=crop', title: 'Three Colored Bays', location: 'Padar Island' },
  { id: 'i3', tripId: 't3', categoryId: 'whaleshark', type: 'image', src: 'https://images.unsplash.com/photo-1580580297368-c782fb65d271?q=80&w=800&auto=format&fit=crop', title: 'Whale Shark Encounter', location: 'Saleh Bay' },
  { id: 'i4', tripId: 't3', categoryId: 'komodo', type: 'image', src: 'https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=800&auto=format&fit=crop', title: 'The Jurassic Dragon', location: 'Loh Liang Village' },
  { id: 'i13', tripId: 't3', categoryId: 'padar', type: 'image', src: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop', title: 'Hiking Trail', location: 'Padar Island' },

  // Voyage Chapter 41
  { id: 'i5', tripId: 't2', categoryId: 'pinkbeach', type: 'image', src: 'https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=800&auto=format&fit=crop', title: 'Pink Sands', location: 'Pink Beach' },
  { id: 'i6', tripId: 't2', categoryId: 'kenawa', type: 'image', src: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=800&auto=format&fit=crop', title: 'Kenawa Hill Trek', location: 'Kenawa Island' },
  { id: 'i7', tripId: 't2', categoryId: 'majarite', type: 'image', src: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=800&auto=format&fit=crop', title: 'Snorkeling Paradise', location: 'Majarite Island' },
  { id: 'i14', tripId: 't2', categoryId: 'komodo', type: 'image', src: 'https://images.unsplash.com/photo-1621251392686-22441dbf022c?q=80&w=800&auto=format&fit=crop', title: 'Wild Sunset', location: 'Komodo Island' },
  { id: 'i15', tripId: 't2', categoryId: 'vessel', type: 'image', src: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800&auto=format&fit=crop', title: 'Dinner Onboard', location: 'Flores Sea' },

  // Voyage Chapter 40
  { id: 'i8', tripId: 't1', categoryId: 'padar', type: 'image', src: 'https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=800&auto=format&fit=crop', title: 'Summit View', location: 'Padar Island' },
  { id: 'i9', tripId: 't1', categoryId: 'whaleshark', type: 'image', src: 'https://images.unsplash.com/photo-1620063229712-1e9d1a3ed9d9?q=80&w=800&auto=format&fit=crop', title: 'Into the Deep', location: 'Saleh Bay' },
  { id: 'i10', tripId: 't1', categoryId: 'pinkbeach', type: 'image', src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop', title: 'Calm Waves', location: 'Pink Beach' },
  { id: 'i11', tripId: 't1', categoryId: 'majarite', type: 'image', src: 'https://images.unsplash.com/photo-1590523264285-a55d491038cc?q=80&w=800&auto=format&fit=crop', title: 'Kelor Hilltop', location: 'Kelor Island' },
  { id: 'i12', tripId: 't1', categoryId: 'vessel', type: 'image', src: 'https://images.unsplash.com/photo-1562281302-809108df5e47?q=80&w=800&auto=format&fit=crop', title: 'Cabin Comfort', location: 'Interior' },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20saw%20your%20amazing%20gallery%20and%20want%20to%20book%20a%20trip!`;

  // Filter media based on active tab
  const filteredMedia = activeTab === 'all' 
    ? dummyMedia 
    : dummyMedia.filter(m => m.categoryId === activeTab);

  const reels = filteredMedia.filter(m => m.type === 'reel');
  const images = filteredMedia.filter(m => m.type === 'image');

  // Categories excluding 'all' for the editorial mapping (Tab ALL)
  const editorialCategories = categories.filter(c => c.id !== 'all');

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1920&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/80 via-[#11223a]/50 to-[#f8f9fa]"></div>
        
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
                  window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
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

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 space-y-24">
        
        {/* 3. REELS / STORY HIGHLIGHTS (Always visible at the top, filtered by tab) */}
        {reels.length > 0 && (
          <section>
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
                  >
                    <img src={reel.src} alt={reel.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform shadow-xl">
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
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
        
        {/* SCENARIO A: 'ALL' TAB (Editorial Layout grouped by destination) */}
        {activeTab === 'all' && (
          <div className="space-y-32">
            {editorialCategories.map((cat, index) => {
              // Grab up to 3 images for the preview bento grid
              const catImages = dummyMedia.filter(m => m.categoryId === cat.id && m.type === 'image').slice(0, 3);
              if (catImages.length === 0) return null;

              return (
                <motion.section 
                  key={cat.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20`}
                >
                  {/* Sticky Sidebar Text */}
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

                  {/* Bento Grid Layout */}
                  <div className="w-full lg:w-2/3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px] grid-flow-dense">
                      {catImages.map((image, imgIdx) => {
                        // Create a premium bento box structure
                        const spanClass = imgIdx === 0 
                          ? "col-span-2 md:col-span-2 row-span-2" 
                          : "col-span-1 row-span-1";

                        return (
                          <motion.div
                            key={image.id}
                            variants={fadeInUp}
                            onClick={() => setLightboxItem(image)}
                            className={`relative overflow-hidden rounded-[2rem] group cursor-pointer bg-gray-200 shadow-md ${spanClass}`}
                          >
                            <img
                              src={image.src}
                              alt={image.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-[#11223a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-center">
                              <span className="bg-white/90 backdrop-blur-sm text-[#11223a] font-bold text-sm uppercase tracking-widest px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                Expand
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </div>
        )}

        {/* SCENARIO B: SPECIFIC CATEGORY TAB (Voyage Chapters Layout) */}
        {activeTab !== 'all' && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-16"
          >
            <div className="mb-12 border-b border-gray-200 pb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#11223a]">Expedition Archives</h2>
              <p className="text-gray-500 mt-2 text-lg">Browse moments captured from our weekly voyages.</p>
            </div>

            {/* Loop through each trip and only show if they have images in this category */}
            {trips.map((trip) => {
              const tripImages = images.filter(img => img.tripId === trip.id);
              if (tripImages.length === 0) return null;

              return (
                <div key={trip.id} className="relative">
                  <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                    
                    {/* Trip Info Sidebar */}
                    <div className="w-full xl:w-1/4 shrink-0">
                      <div className="sticky top-48">
                        <div className="inline-flex items-center gap-2 text-[#B88E52] mb-3">
                          <Calendar className="w-4 h-4" />
                          <span className="font-bold text-xs uppercase tracking-wider">{trip.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#11223a] mb-2">{trip.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {tripImages.length} memories captured
                        </p>
                      </div>
                    </div>

                    {/* Trip Photos - Horizontal Scroll for modern premium look */}
                    <div className="w-full xl:w-3/4 flex overflow-x-auto hide-scrollbar gap-4 pb-8 snap-x scroll-smooth">
                      {tripImages.map((image) => (
                        <div
                          key={image.id}
                          onClick={() => setLightboxItem(image)}
                          className="relative shrink-0 w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group snap-center shadow-md bg-gray-200"
                        >
                          <img 
                            src={image.src} 
                            alt={image.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#11223a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                              <p className="text-[#B88E52] text-sm flex items-center gap-1 font-medium">
                                <MapPin className="w-3.5 h-3.5" /> {image.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Decorative "End of Album" Card */}
                      <div className="relative shrink-0 w-32 h-80 sm:h-96 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center snap-center opacity-50">
                        <Camera className="w-6 h-6 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold rotate-90 mt-8">End of Album</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">Moments are being prepared...</h3>
            <p className="text-gray-500 mt-2">Our crew is currently capturing amazing moments for this destination.</p>
          </div>
        )}

      </div>

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
      <section className="py-24 px-6 text-center bg-[#f8f9fa] mt-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-200">
            <Camera className="w-8 h-8 text-[#B88E52]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6">Be Part of the Story</h2>
          <p className="text-gray-600 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            These pictures could be you. Join our next departure and experience the authentic Komodo & Sumbawa adventure.
          </p>
          <a 
            href={b2cWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#11223a] hover:bg-[#0f1f33] text-white font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxItem(null)}
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
                   <img src={lightboxItem.src} alt={lightboxItem.title} className="w-full h-full object-cover" />
                   <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent"></div>
                   <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                     <h3 className="text-white text-2xl font-bold mb-2">{lightboxItem.title}</h3>
                     <p className="text-white/80 flex items-center gap-1"><MapPin className="w-4 h-4"/> {lightboxItem.location}</p>
                   </div>
                 </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center">
                  <img 
                    src={lightboxItem.src} 
                    alt={lightboxItem.title} 
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
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