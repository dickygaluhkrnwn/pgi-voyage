'use client';

import { motion, Variants } from "framer-motion";
import { ArrowRight, Calendar, User, BookOpen, Clock, Star, Mail } from "lucide-react";

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

const featuredPost = {
  title: "The Ultimate Guide to Exploring Komodo National Park in 2026",
  excerpt: "Everything you need to know before setting sail. From encountering the prehistoric Komodo dragons to swimming with majestic manta rays in crystal clear waters.",
  category: "Travel Guide",
  date: "Jun 12, 2026",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=2070&auto=format&fit=crop"
};

const blogPosts = [
  {
    id: 1,
    title: "5 Hidden Gems in Sumbawa You Must Visit",
    excerpt: "Discover the untouched beauty of Sumbawa island. From the golden savannas of Kenawa to the majestic waterfalls hidden in the jungle.",
    category: "Destinations",
    date: "May 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "A Close Encounter with the Gentle Giants",
    excerpt: "What it feels like to swim alongside the massive, yet incredibly peaceful Whale Sharks in Saleh Bay. A true bucket-list experience.",
    category: "Wildlife",
    date: "May 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Why Liveaboard is the Best Way to Travel",
    excerpt: "Forget traditional hotels. Waking up to a new island sunrise every day from your private cabin window is an unmatched luxury.",
    category: "Lifestyle",
    date: "Apr 02, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Essential Packing List for a 4D3N Sea Expedition",
    excerpt: "Don't overpack! Here is the curated list of absolute essentials you need to bring for a comfortable and adventurous sailing trip.",
    category: "Tips & Tricks",
    date: "Mar 18, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "The Mystery of the Pink Sands",
    excerpt: "How does the famous Pink Beach get its vibrant color? We dive into the science behind one of the world's most unique shorelines.",
    category: "Nature",
    date: "Feb 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Savoring the Archipelago: Dining on PGI Voyage",
    excerpt: "A look into the culinary masterpieces crafted by our onboard chefs, blending authentic Indonesian spices with international fine dining.",
    category: "Culinary",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {}
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

      {}
      <section className="px-6 lg:px-12 mt-[-60px] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(17,34,58,0.1)] border border-gray-100 flex flex-col lg:flex-row group cursor-pointer"
          >
            <div className="w-full lg:w-3/5 h-80 lg:h-[500px] relative overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#11223a]/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                <Star className="w-3 h-3 text-[#B88E52]" /> Featured
              </div>
            </div>
            
            <div className="w-full lg:w-2/5 p-10 lg:p-16 flex flex-col justify-center">
              <div className="text-[#B88E52] text-sm font-bold uppercase tracking-wider mb-4">
                {featuredPost.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-6 leading-tight group-hover:text-[#B88E52] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B88E52]"/> {featuredPost.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B88E52]"/> {featuredPost.readTime}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#11223a] text-white flex items-center justify-center shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-[#11223a]">Editorial Team</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#B88E52] group-hover:border-[#B88E52] group-hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-[#11223a]">Latest Articles</h3>
            <div className="hidden md:flex gap-2">
              <button className="px-6 py-2.5 rounded-full bg-[#11223a] text-white text-sm font-semibold shadow-md">All</button>
              <button className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors">Guides</button>
              <button className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-colors">Destinations</button>
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.article 
                key={post.id}
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-60 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#11223a] text-xs font-bold uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#B88E52]"/> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#B88E52]"/> {post.readTime}</span>
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
              </motion.article>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-[#11223a] text-[#11223a] font-bold hover:bg-[#11223a] hover:text-white transition-all shadow-sm hover:shadow-lg">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {}
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