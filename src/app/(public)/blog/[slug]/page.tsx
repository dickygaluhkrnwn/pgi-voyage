'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ChevronLeft, Link as LinkIcon, Loader2, ArrowRight, Mail } from 'lucide-react';

export default function PublicBlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleBySlug = async () => {
      if (!slug) return;
      
      try {
        const blogsRef = collection(db, 'blogs');
        
        // 1. Fetch Artikel Utama
        const q = query(blogsRef, where('slug', '==', slug), where('status', '==', 'Published'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const dateObj = docData.createdAt?.toDate();
          const formattedDate = dateObj ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(dateObj) : 'Recently';
          
          setArticle({ ...docData, formattedDate });

          // 2. Fetch Artikel Terkait (Rekomendasi)
          const relatedQ = query(blogsRef, where('status', '==', 'Published'), limit(4));
          const relatedSnap = await getDocs(relatedQ);
          const relatedData: any[] = [];
          
          relatedSnap.forEach(d => {
            const data = d.data();
            // Jangan masukkan artikel yang sedang dibaca ke rekomendasi
            if (data.slug !== slug) {
              const dObj = data.createdAt?.toDate();
              data.formattedDate = dObj ? new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(dObj) : 'Recently';
              relatedData.push(data);
            }
          });
          
          // Ambil maksimal 3 artikel untuk sidebar
          setRelatedArticles(relatedData.slice(0, 3));
          
        } else {
          setArticle(null); // Not found
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleBySlug();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] pt-20">
        <Loader2 className="w-12 h-12 text-[#B88E52] animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Loading story...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f9fa] pt-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#11223a] mb-4">Article Not Found</h1>
        <p className="text-gray-500 text-lg mb-8">The story you are looking for does not exist or has been unpublished.</p>
        <a href="/blog" className="px-8 py-3 rounded-full bg-[#B88E52] text-white font-bold shadow-lg hover:bg-[#a37c46] transition-colors">Return to Journal</a>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen">
      
      {/* 1. CINEMATIC HERO SECTION (Fixed Padding Anti-Tabrak Header) */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end pt-48 pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${article.coverImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#11223a]/50 via-[#11223a]/70 to-[#11223a]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B88E52] text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg tracking-tight max-w-5xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#B88E52]" /> {article.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#B88E52]" /> {article.formattedDate}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#B88E52]" /> 5 min read</span>
          </div>
        </motion.div>
      </section>

      {/* 2. MAIN LAYOUT (2 COLUMNS) */}
      <section className="relative z-20 px-6 lg:px-12 -mt-10 pb-24 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* KIRI: KONTEN ARTIKEL & KOMENTAR */}
          <div className="w-full lg:w-2/3 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(17,34,58,0.05)] p-8 md:p-12 lg:p-16 border border-gray-100">
            
            {/* Top Action & Share (Sekarang di dalam card, lebih rapi) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100">
              <a href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#B88E52] transition-colors text-sm font-semibold">
                <ChevronLeft className="w-4 h-4" /> Back to Journal
              </a>
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Share:</span>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#11223a] hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#11223a] hover:bg-gray-50 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </button>
                <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#11223a] hover:bg-gray-50 transition-all" onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }}>
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Injeksi HTML dari TipTap Editor */}
            <div 
              className="article-content max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Author Signature & Tags */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#fdfaf5] border border-[#B88E52]/20 flex items-center justify-center text-[#B88E52] font-bold text-xl">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Written By</p>
                  <p className="font-bold text-[#11223a] text-lg">{article.author}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100">#{article.category.replace(/\s+/g, '')}</span>
                 <span className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100">#PGIVoyage</span>
              </div>
            </div>

            {/* KOMENTAR SECTION (NEW) */}
            <div className="mt-16 pt-12 border-t border-gray-100">
              <h3 className="text-2xl font-bold text-[#11223a] mb-8">Join the Conversation</h3>
              
              {/* Form Leave a Reply */}
              <div className="bg-[#fdfaf5] p-8 md:p-10 rounded-[2rem] border border-[#B88E52]/20 mb-12 shadow-sm">
                <h4 className="text-lg font-bold text-[#11223a] mb-2">Leave a Reply</h4>
                <p className="text-sm text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Feature coming soon!"); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name *" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] bg-white text-sm transition-all" required />
                    <input type="email" placeholder="Email *" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] bg-white text-sm transition-all" required />
                  </div>
                  <textarea placeholder="Your Comment *" rows={4} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] bg-white text-sm resize-none transition-all" required></textarea>
                  <button type="submit" className="px-8 py-3.5 rounded-xl bg-[#11223a] text-white font-bold text-sm hover:bg-[#0f1f33] transition-colors shadow-md">Post Comment</button>
                </form>
              </div>
              
              {/* Dummy Comments List */}
              <div className="space-y-10">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h5 className="font-bold text-[#11223a]">Michael V.</h5>
                      <span className="text-xs text-gray-400">June 14, 2026</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">This is incredibly helpful! I'm planning my trip for next month and was wondering about the trekking difficulty on the island. The details provided here are exactly what I needed to prepare.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 md:gap-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0 overflow-hidden shadow-sm">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" alt="User" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h5 className="font-bold text-[#11223a]">Sarah Jenkins</h5>
                      <span className="text-xs text-gray-400">June 10, 2026</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">Amazing photography! That sunset view is exactly why I booked my liveaboard trip. Can't wait to see it with my own eyes.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* KANAN: SIDEBAR (REKOMENDASI ARTIKEL) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8 pt-8 lg:pt-0">
            
            {/* Box Rekomendasi */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(17,34,58,0.03)]">
              <h3 className="text-xl font-bold text-[#11223a] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#B88E52] rounded-full inline-block"></span> Recommended
              </h3>
              
              <div className="space-y-6">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map((rel, idx) => (
                    <a key={idx} href={`/blog/${rel.slug}`} className="group flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#11223a] text-sm leading-snug line-clamp-2 group-hover:text-[#B88E52] transition-colors mb-1">{rel.title}</h4>
                        <span className="text-xs text-gray-400">{rel.formattedDate}</span>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No other articles found.</p>
                )}
              </div>
              
              <a href="/blog" className="mt-8 flex items-center justify-center w-full py-3 rounded-xl bg-gray-50 text-[#11223a] text-sm font-bold hover:bg-gray-100 transition-colors">
                View All Posts
              </a>
            </div>

            {/* Box Newsletter Subscribe */}
            <div className="bg-[#11223a] rounded-[2rem] p-8 border border-[#1a3356] shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B88E52]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Mail className="w-6 h-6 text-[#B88E52]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">Get Travel Updates</h3>
              <p className="text-gray-400 text-sm mb-6 relative z-10">Subscribe for secret destinations and early-bird promo codes.</p>
              
              <form className="relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#B88E52] mb-3" required />
                <button type="submit" className="w-full py-3 rounded-xl bg-[#B88E52] text-white text-sm font-bold hover:bg-[#a37c46] transition-colors">Subscribe</button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Global Style untuk TipTap HTML */}
      <style dangerouslySetInnerHTML={{__html: `
        .article-content {
          font-family: var(--font-geist-sans), sans-serif;
        }
        /* Drop cap effect for the first letter of the first paragraph */
        .article-content > p:first-of-type::first-letter {
          font-size: 3.5rem;
          font-weight: 800;
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          color: #11223a;
          margin-top: 0.2rem;
        }
        .article-content p {
          color: #374151;
          line-height: 1.8;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }
        .article-content h2 {
          font-size: 2rem;
          font-weight: 800;
          color: #11223a;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #11223a;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        .article-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        .article-content li { margin-bottom: 0.75rem; }
        .article-content blockquote {
          border-left-width: 4px;
          border-color: #B88E52;
          padding-left: 1.5rem;
          font-style: italic;
          color: #6b7280;
          margin: 2.5rem 0;
          background-color: #fdfaf5;
          padding: 1.5rem;
          border-radius: 0 1rem 1rem 0;
          font-size: 1.25rem;
          line-height: 1.7;
        }
        .article-content strong {
          font-weight: 700;
          color: #11223a;
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin: 3rem auto;
          display: block;
        }
      `}} />

    </main>
  );
}