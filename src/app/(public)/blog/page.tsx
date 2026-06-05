'use client';

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, User, BookOpen, Clock, Star, Mail, Loader2 } from "lucide-react";

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

// Fungsi helper untuk membersihkan tag HTML dari isi artikel (mendapatkan teks murni untuk excerpt)
const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      setIsLoading(true);
      try {
        const blogsRef = collection(db, 'blogs');
        // Hanya ambil yang Published, urutkan dari yang terbaru
        const q = query(blogsRef, where('status', '==', 'Published'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedBlogs: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Format tanggal
          const dateObj = data.createdAt?.toDate();
          const formattedDate = dateObj ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(dateObj) : 'Recently';
          
          // Buat excerpt (ringkasan 150 karakter) dari konten HTML
          const plainText = stripHtml(data.content || "");
          const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;

          fetchedBlogs.push({
            id: doc.id,
            ...data,
            formattedDate,
            excerpt
          });
        });
        
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  // Pisahkan artikel pertama sebagai Featured, sisanya masuk ke Grid
  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const gridPosts = blogs.length > 1 ? blogs.slice(1) : [];

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-[#11223a] overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/90 via-[#11223a]/70 to-[#11223a]"></div>
        
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B88E52]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#B88E52] text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5" />
            Journal & Stories
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md tracking-tight">
            The Voyager's <br className="md:hidden" /><span className="italic font-serif text-[#B88E52] font-medium">Chronicles</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed font-light">
            Immerse yourself in our curated tales of the sea. Discover travel tips, destination guides, and stories from the Indonesian archipelago.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="px-6 lg:px-12 mt-[-60px] relative z-20 pb-24 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-[3rem] shadow-xl border border-gray-100 p-20">
              <Loader2 className="w-12 h-12 text-[#B88E52] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading stories...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-[3rem] shadow-xl border border-gray-100 p-20 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold text-[#11223a] mb-2">No Stories Yet</h2>
              <p className="text-gray-500">Check back later for new travel guides and stories.</p>
            </div>
          ) : (
            <>
              {/* FEATURED POST (Artikel Paling Baru) */}
              {featuredPost && (
                <motion.a 
                  href={`/blog/${featuredPost.slug}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(17,34,58,0.1)] border border-gray-100 flex flex-col lg:flex-row group cursor-pointer mb-20 block"
                >
                  <div className="w-full lg:w-3/5 h-80 lg:h-[500px] relative overflow-hidden bg-gray-100">
                    {featuredPost.coverImage && (
                      <img 
                        src={featuredPost.coverImage} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#11223a]/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      <Star className="w-3 h-3 text-[#B88E52]" /> Featured
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
                    <div className="text-[#B88E52] text-sm font-bold uppercase tracking-wider mb-4">
                      {featuredPost.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6 leading-tight group-hover:text-[#B88E52] transition-colors line-clamp-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B88E52]"/> {featuredPost.formattedDate}</div>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B88E52]"/> 5 min read</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#11223a] text-white flex items-center justify-center shadow-md font-bold">
                          {featuredPost.author?.charAt(0) || 'U'}
                        </div>
                        <span className="font-semibold text-[#11223a]">{featuredPost.author || 'Editorial Team'}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#B88E52] group-hover:border-[#B88E52] group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              )}

              {/* GRID POSTS (Artikel Kedua dst) */}
              {gridPosts.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-bold text-[#11223a]">Latest Articles</h3>
                    <div className="hidden md:flex gap-2">
                      <button className="px-6 py-2.5 rounded-full bg-[#11223a] text-white text-sm font-semibold shadow-md">All</button>
                    </div>
                  </div>

                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {gridPosts.map((post) => (
                      <motion.a 
                        href={`/blog/${post.slug}`}
                        key={post.id}
                        variants={fadeInUp}
                        className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-300 block"
                      >
                        <div className="h-60 relative overflow-hidden bg-gray-100">
                          {post.coverImage && (
                            <img 
                              src={post.coverImage} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}
                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#11223a] text-xs font-bold uppercase tracking-wider shadow-sm">
                            {post.category}
                          </div>
                        </div>
                        
                        <div className="p-8 flex flex-col flex-grow">
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#B88E52]"/> {post.formattedDate}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#B88E52]"/> 4 min read</span>
                          </div>
                          
                          <h4 className="text-xl font-bold text-[#11223a] mb-4 leading-snug group-hover:text-[#B88E52] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-6 border-t border-gray-100 flex items-center text-[#B88E52] font-semibold text-sm group-hover:text-[#a37c46] transition-colors">
                            Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </motion.div>
                </>
              )}
            </>
          )}
          
        </div>
      </section>

      {/* 3. NEWSLETTER SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto bg-[#fdfaf5] rounded-[3rem] p-10 md:p-16 border border-[#B88E52]/20 text-center relative overflow-hidden shadow-sm">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B88E52]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#11223a]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-gray-100">
              <Mail className="w-8 h-8 text-[#B88E52]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-4">Join The Voyager's Club</h2>
            <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
              Subscribe to our newsletter and receive exclusive travel guides, secret island destinations, and early-bird promotional offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] text-sm" 
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-full bg-[#11223a] hover:bg-[#0f1f33] text-white font-bold transition-all whitespace-nowrap shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}