'use client';

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { 
  ArrowRight, 
  Compass, 
  Gift, 
  Handshake, 
  Ship, 
  Star, 
  Anchor, 
  Users, 
  CheckCircle2, 
  ImageIcon, 
  BookOpen, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  Loader2 
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// --- ANIMATION CONFIGURATIONS ---
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
    transition: { staggerChildren: 0.15 }
  }
};

// --- DEFAULT FALLBACK MEDIA & ASSETS ---
const defaultGallery = [
  { id: 'f-g1', src: "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=870&auto=format&fit=crop", title: "Komodo Archipelago" },
  { id: 'f-g2', src: "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1973&auto=format&fit=crop", title: "Padar Lookout" },
  { id: 'f-g3', src: "https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=929&auto=format&fit=crop", title: "Pink Beach" },
];

const defaultBlogs = [
  {
    id: "f-b1",
    slug: "guide-exploring-komodo",
    category: "Travel Guide",
    coverImage: "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1973&auto=format&fit=crop",
    title: "The Ultimate Guide to Exploring Komodo in 2026",
    excerpt: "Everything you need to know before setting sail. From encountering prehistoric dragons to hiking Padar Island.",
    formattedDate: "June 10, 2026",
    readTime: "5 min read"
  },
  {
    id: "f-b2",
    slug: "close-encounter-komodo-dragons",
    category: "Wildlife",
    coverImage: "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=870&auto=format&fit=crop",
    title: "A Close Encounter with the Komodo Dragons",
    excerpt: "Discover the thrill of walking among the world's largest living lizards in their natural, protected habitat.",
    formattedDate: "May 28, 2026",
    readTime: "4 min read"
  },
  {
    id: "f-b3",
    slug: "why-liveaboard-is-best-way",
    category: "Lifestyle",
    coverImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    title: "Why Liveaboard is the Best Way to Travel",
    excerpt: "Forget traditional hotels. Waking up to a new island sunrise every day from your private cabin window is an unmatched luxury.",
    formattedDate: "April 15, 2026",
    readTime: "5 min read"
  }
];

// Helper to strip HTML tags from content to make excerpts safely
const stripHtml = (html: string) => {
  if (typeof window === 'undefined') return html;
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function PublicHomepage() {
  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PMM%20Voyage,%20I%20want%20to%20sign%20up%20and%20claim%20my%20IDR%20500k%20Welcome%20Voucher!`;
  const b2bWaLink = `https://wa.me/${waNumber}?text=Hello%20PMM%20Voyage,%20I%20am%20a%20Travel%20Agent%20interested%20in%20joining%20the%20B2B%20Portal%20for%20the%20Allotment%20&%20Commission%20system.`;

  // Dynamic States
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);

  // Fetch published blogs (Limit 3)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, 'blogs');
        const q = query(blogsRef, where('status', '==', 'Published'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const fetchedBlogs: any[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const dateObj = data.createdAt?.toDate();
          const formattedDate = dateObj ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateObj) : 'Recently';
          const plainText = stripHtml(data.content || "");
          const excerpt = plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;

          fetchedBlogs.push({
            id: doc.id,
            ...data,
            formattedDate,
            excerpt,
            readTime: data.readTime || "5 min read"
          });
        });

        // Defensive merging: gabungkan data hasil fetch database dengan default fallback agar slot grid selalu penuh (3 buah)
        const mergedBlogs = [...defaultBlogs];
        fetchedBlogs.forEach((item, index) => {
          if (index < 3) {
            mergedBlogs[index] = item;
          }
        });

        setBlogs(mergedBlogs);
      } catch (err) {
        console.error("Error fetching homepage blogs:", err);
        setBlogs(defaultBlogs);
      } finally {
        setIsLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch recent gallery assets (Limit 3 images)
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, 'galleries'), where('type', '==', 'image'), orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        const fetchedGallery: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedGallery.push({
            id: doc.id,
            src: data.src,
            title: data.title
          });
        });

        // Defensive merging untuk galeri: timpa fallback dengan data asli Firebase jika tersedia
        const mergedGallery = [...defaultGallery];
        fetchedGallery.forEach((item, index) => {
          if (index < 3) {
            mergedGallery[index] = item;
          }
        });

        setGallery(mergedGallery);
      } catch (err) {
        console.error("Error fetching homepage gallery:", err);
        setGallery(defaultGallery);
      } finally {
        setIsLoadingGallery(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="flex flex-col w-full bg-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=1973&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/90 via-[#11223a]/50 to-[#11223a]"></div>
        
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
              id="btn-wa-hero-voucher"
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

      {/* 2. WELCOME & STATS SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-[#11223a] mb-6 leading-tight">Sail to the Wonders of the Archipelago</h2>
              <div className="w-20 h-1 bg-[#B88E52] mb-8 rounded-full"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                <strong>PMM Voyage (Pulau Mas Mulia)</strong> is a premier travel platform offering extraordinary sailing expeditions to Komodo, departing from Lombok. We provide unforgettable sea adventures with meticulously curated routes to Komodo Island, Pink Beach, Padar Island, Manta Point, and other stunning destinations.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Enjoy a comfortable and secure journey aboard our selected vessels, accompanied by breathtaking ocean views and professional hospitality for a truly memorable holiday experience.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div variants={fadeInUp} className="bg-[#fdfaf5] p-8 rounded-[2rem] border border-[#B88E52]/20 text-center shadow-lg shadow-[#B88E52]/5 hover:-translate-y-2 transition-transform">
                <span className="block text-5xl font-bold text-[#11223a] mb-2">5+</span>
                <span className="text-sm font-semibold text-[#B88E52] uppercase tracking-wider">Flagship Vessels</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[#fdfaf5] p-8 rounded-[2rem] border border-[#B88E52]/20 text-center shadow-lg shadow-[#B88E52]/5 hover:-translate-y-2 transition-transform">
                <span className="block text-5xl font-bold text-[#11223a] mb-2">98%</span>
                <span className="text-sm font-semibold text-[#B88E52] uppercase tracking-wider">Client Satisfaction</span>
              </motion.div>
              <motion.div variants={fadeInUp} className="bg-[#fdfaf5] p-8 rounded-[2rem] border border-[#B88E52]/20 text-center shadow-lg shadow-[#B88E52]/5 hover:-translate-y-2 transition-transform">
                <span className="block text-5xl font-bold text-[#11223a] mb-2">15+</span>
                <span className="text-sm font-semibold text-[#B88E52] uppercase tracking-wider">Years Excellence</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE VESSEL TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-[#f8f9fa] relative border-y border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 group cursor-pointer aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              <img src="/images/Kapal_Pulau_Mas_88.png" alt="KM Pulau Mas 88" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                 <div className="inline-block bg-[#B88E52] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider mb-3">
                  Flagship Vessel
                </div>
                <h3 className="text-3xl font-bold">KM Pulau Mas 88</h3>
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
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a] mb-6 leading-tight">Built for the <br/> Ultimate Voyage</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-10 leading-relaxed font-light">
              As a direct operator of Pulau Mas Mulia, we guarantee the highest standards of safety and hospitality. Our vessel is meticulously designed to provide a spacious, luxurious retreat with strict compliance to national maritime regulations.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#B88E52]/20 shadow-sm">
                  <Users className="h-7 w-7 text-[#B88E52]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#11223a] mb-1">46 Pax Capacity</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Strictly capped to ensure intimate service and ample deck space.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#B88E52]/20 shadow-sm">
                  <Anchor className="h-7 w-7 text-[#B88E52]" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#11223a] mb-1">Verified Safety</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Equipped with official legal certifications, modern nav, and life rafts.</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/boat-details"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#B88E52] hover:bg-[#a37c46] text-white font-bold transition-all shadow-[0_4px_20px_rgba(184,142,82,0.3)] hover:-translate-y-1"
              >
                View Boat Specs <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. DESTINATIONS TEASER SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white relative">
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
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
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
            {/* Card 1: Padar Island */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-100 block">
              <div className="relative h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop" alt="Padar Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[#B88E52] text-xs font-bold uppercase tracking-wider mb-2 block">Iconic Viewpoint</span>
                  <h3 className="text-3xl font-bold text-white mb-2">Padar Island</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Hike to the summit for a breathtaking panoramic view of the three-colored bays.</p>
                </div>
              </div>
            </motion.a>

            {/* Card 2: Komodo Park */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-100 block">
              <div className="relative h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop" alt="Komodo Dragon" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[#B88E52] text-xs font-bold uppercase tracking-wider mb-2 block">Jurassic Experience</span>
                  <h3 className="text-3xl font-bold text-white mb-2">Komodo Park</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Encounter the legendary prehistoric dragons safely in their natural habitat.</p>
                </div>
              </div>
            </motion.a>

            {/* Card 3: Pink Beach */}
            <motion.a href="/expedition" variants={fadeInUp} className="group rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-100 block">
              <div className="relative h-96 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=929&auto=format&fit=crop" alt="Pink Beach" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11223a]/90 via-[#11223a]/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[#B88E52] text-xs font-bold uppercase tracking-wider mb-2 block">Pristine Waters</span>
                  <h3 className="text-3xl font-bold text-white mb-2">Pink Beach</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Relax on striking pink sands and snorkel in crystal-clear tropical waters.</p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-24 px-6 lg:px-12 bg-[#11223a] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">The PMM Difference</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">Why Choose PMM Voyage?</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience a safe, comfortable, and unforgettable journey under Pulau Mas Mulia’s fleet with professional crews and the best routes to Komodo's most stunning destinations.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <Ship className="w-10 h-10 text-[#B88E52] mb-6" />
              <h3 className="text-xl font-bold mb-3">Comfortable Cruises</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Choose from well-maintained standard to luxury boats built for comfort, featuring spacious lounges and relaxing sailing experiences.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <MapPin className="w-10 h-10 text-[#B88E52] mb-6" />
              <h3 className="text-xl font-bold mb-3">Amazing Destinations</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Discover the highlights of the National Park, from whale sharks and pink beaches to crystal-clear waters and breathtaking viewpoints.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-10 h-10 text-[#B88E52] mb-6" />
              <h3 className="text-xl font-bold mb-3">Clear Information</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We provide transparent details on prices, itineraries, and facilities. No hidden charges, just clear information from the beginning.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <HeartHandshake className="w-10 h-10 text-[#B88E52] mb-6" />
              <h3 className="text-xl font-bold mb-3">Great Experience</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Friendly crews, a relaxed atmosphere, fun activities, and warm hospitality make every trip enjoyable from start to finish.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. GALLERY TEASER SECTION */}
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-[#11223a] font-semibold hover:bg-[#11223a] hover:text-white transition-all whitespace-nowrap bg-white"
            >
              Explore Full Gallery <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {isLoadingGallery ? (
            <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <Loader2 className="w-10 h-10 text-[#B88E52] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading Visual Masterpieces...</p>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 h-[400px] md:h-[500px]"
            >
              {/* Gallery Item 1 */}
              <a href="/gallery" className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden shadow-lg group relative cursor-pointer block bg-gray-100">
                <img 
                  src={gallery[0]?.src || "https://images.unsplash.com/photo-1717238977683-5f06a9e60694?q=80&w=870"} 
                  alt={gallery[0]?.title || "Komodo"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {gallery[0]?.title || "Explore"}
                </div>
              </a>
              
              {/* Gallery Item 2 */}
              <a href="/gallery" className="col-span-1 row-span-1 rounded-[2rem] overflow-hidden shadow-lg group relative cursor-pointer block bg-gray-100">
                <img 
                  src={gallery[1]?.src || "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=600"} 
                  alt={gallery[1]?.title || "Padar"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {gallery[1]?.title || "Explore"}
                </div>
              </a>
              
              {/* Gallery Item 3 */}
              <a href="/gallery" className="col-span-1 row-span-2 rounded-[2rem] overflow-hidden shadow-lg group relative cursor-pointer block bg-gray-100">
                 <img 
                   src={gallery[2]?.src || "https://images.unsplash.com/photo-1724127722795-96efb9caffbc?q=80&w=600"} 
                   alt={gallery[2]?.title || "Pink Beach"} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                 <div className="absolute bottom-4 left-4 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                   {gallery[2]?.title || "Explore"}
                 </div>
              </a>
              
              {/* Gallery CTA */}
              <div className="col-span-1 row-span-1 rounded-[2rem] overflow-hidden shadow-lg group relative cursor-pointer bg-[#11223a] flex flex-col items-center justify-center text-center p-6 border border-gray-100 transition-transform hover:-translate-y-1">
                 <a href="/gallery" className="text-white hover:text-[#B88E52] transition-colors w-full h-full flex flex-col items-center justify-center">
                    <span className="block text-4xl font-bold mb-2">50+</span>
                    <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">More Photos</span>
                 </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 7. BLOG TEASER SECTION */}
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

          {isLoadingBlogs ? (
            <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner">
              <Loader2 className="w-10 h-10 text-[#B88E52] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading Editorial stories...</p>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {blogs.map((post) => (
                <motion.a 
                  href={`/blog/${post.slug}`} 
                  key={post.id}
                  variants={fadeInUp} 
                  className="group bg-[#f8f9fa] rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="h-60 overflow-hidden relative bg-gray-200">
                    <img 
                      src={post.coverImage || "https://images.unsplash.com/photo-1604560929658-bbc3c2ba6a36?q=80&w=600"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#11223a] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm">
                      {post.category || "Expedition"}
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#B88E52]"/> {post.formattedDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#B88E52]"/> {post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#11223a] mb-4 group-hover:text-[#B88E52] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-8 line-clamp-2 leading-relaxed flex-grow text-sm">
                      {post.excerpt}
                    </p>
                    <span className="text-[#B88E52] font-bold text-sm flex items-center gap-2 mt-auto uppercase tracking-wider">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}

          <div className="text-center">
             <a href="/blog" className="inline-flex items-center gap-2 text-[#11223a] font-bold hover:text-[#B88E52] transition-colors border-b-2 border-transparent hover:border-[#B88E52] pb-1">
                View All Journal Entries <ArrowRight className="w-5 h-5" />
             </a>
          </div>
        </div>
      </section>

      {/* 8. PORTAL / ECOSYSTEM SECTION (B2C & B2B) */}
      <section id="ecosystem" className="py-24 px-6 lg:px-12 bg-[#f8f9fa] max-w-7xl mx-auto w-full relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-[#B88E52] font-semibold tracking-wider uppercase text-sm mb-3 block">Digital Ecosystem</motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-[#11223a] mb-6">Unlock Your Privileges</motion.h2>
          <motion.p variants={fadeInUp} className="text-[#11223a]/70 max-w-2xl mx-auto text-lg leading-relaxed">
            We are building a world-class booking platform. 
            Secure your early-bird benefits and tiers today by registering manually via our operators.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {/* Card B2C */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-2xl shadow-gray-200 border border-gray-100 flex flex-col h-full relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#B88E52]/10 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="h-20 w-20 rounded-[1.5rem] bg-[#fdfaf5] border border-[#B88E52]/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#B88E52] group-hover:text-white transition-all duration-500 text-[#B88E52]">
              <Gift className="h-10 w-10" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-[#11223a] mb-4">For Explorers</h3>
            <div className="space-y-6 mb-10 flex-grow">
              <p className="text-gray-600 text-lg">Join the <strong>Expedition Tiers</strong> program.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> Earn points for every cabin</li>
                <li className="flex items-center gap-3 text-gray-700 font-medium"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> Unlock the VIP Rewards Store</li>
                <li className="flex items-center gap-3 text-[#11223a] font-bold bg-[#fdfaf5] p-3 rounded-xl border border-[#B88E52]/20"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> IDR 500.000 Welcome Voucher</li>
              </ul>
            </div>
            <a 
              id="btn-wa-explorer-voucher"
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 lg:py-5 rounded-2xl bg-[#11223a] text-white font-bold hover:bg-[#0f1f33] transition-colors text-lg shadow-xl hover:shadow-2xl"
            >
              Claim Welcome Voucher
            </a>
          </motion.div>

          {/* Card B2B */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            className="group bg-[#11223a] rounded-[2.5rem] p-10 lg:p-12 shadow-2xl shadow-[#11223a]/20 border border-[#1a3356] flex flex-col h-full relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
              <Compass className="h-64 w-64 text-[#B88E52]" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="h-20 w-20 rounded-[1.5rem] bg-[#172c4a] border border-[#B88E52]/40 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#B88E52] group-hover:text-[#11223a] transition-all duration-500 text-[#B88E52]">
                <Handshake className="h-10 w-10" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Travel Partners</h3>
              <div className="space-y-6 mb-10 flex-grow">
                <p className="text-gray-300 text-lg">Experience the future of B2B booking.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> Real-time Live Inventory sync</li>
                  <li className="flex items-center gap-3 text-gray-300 font-medium"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> Smart Allotment & Auto-Nett Pricing</li>
                  <li className="flex items-center gap-3 text-white font-bold bg-[#172c4a] p-3 rounded-xl border border-[#B88E52]/20"><CheckCircle2 className="h-6 w-6 text-[#B88E52]" /> Up to IDR 500k Commission/pax</li>
                </ul>
              </div>
              <a 
                id="btn-wa-b2b-register"
                href={b2bWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 lg:py-5 rounded-2xl bg-[#B88E52] text-white font-bold hover:bg-[#a37c46] transition-colors text-lg shadow-[0_10px_30px_rgba(184,142,82,0.3)] hover:shadow-[0_15px_40px_rgba(184,142,82,0.4)]"
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