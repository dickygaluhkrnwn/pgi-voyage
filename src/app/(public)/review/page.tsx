'use client';

import { useState, useRef, useEffect, useMemo } from "react";
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BRAND_NAME } from "@/lib/constants";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, Send, Loader2, CheckCircle2, User, Globe, MessageSquareQuote, X, ArrowRight, Ship, UploadCloud, ChevronDown, ChevronUp, Filter, MessageSquare } from "lucide-react";

// --- ANIMATION CONFIGURATIONS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// --- KOMPONEN BANTUAN UNTUK BALASAN ADMIN (COLLAPSIBLE) ---
function AdminReply({ replyText }: { replyText: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 bg-[#fdfaf5] border border-[#B88E52]/20 rounded-xl relative overflow-hidden transition-all duration-300">
      <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#B88E52] rounded-r-full"></div>
      
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 focus:outline-none group"
      >
        <div className="flex items-center gap-2">
          <Ship className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B88E52]" />
          <span className="font-bold text-[#0f172a] text-[10px] md:text-xs uppercase tracking-widest">{BRAND_NAME}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 group-hover:text-[#B88E52] transition-colors">
          <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider">
            {isExpanded ? 'Hide Reply' : 'Read Reply'}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light pl-6">
                {replyText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewPage() {
  // State untuk Data Reviews & Filter
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("All");

  // State untuk Form Data
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    rating: 0,
    text: "",
    image: "", 
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Reviews on Component Mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const reviewData: any[] = [];
        querySnapshot.forEach((doc) => {
          reviewData.push({ id: doc.id, ...doc.data() });
        });
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  // Ekstrak daftar negara unik untuk Filter
  const uniqueOrigins = useMemo(() => {
    const origins = reviews.map(r => r.origin?.trim() || "Unknown").filter(Boolean);
    const unique = Array.from(new Set(origins)).sort();
    return ["All", ...unique];
  }, [reviews]);

  // Eksekusi filter
  const filteredReviews = useMemo(() => {
    if (selectedOrigin === "All") return reviews;
    return reviews.filter(r => (r.origin?.trim() || "Unknown") === selectedOrigin);
  }, [reviews, selectedOrigin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('write-review-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // --- CLOUDINARY UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Image size is too large. Maximum 10MB allowed.");
      return;
    }

    setIsUploadingImage(true);
    setErrorMsg("");
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'pgi_voyage_preset'); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/danyx7uny/image/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, image: data.secure_url }));
      } else {
        setErrorMsg("Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg("Failed to upload image. Please ensure a stable internet connection.");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.origin.trim() || !formData.text.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    if (formData.rating === 0) {
      setErrorMsg("Please select a star rating to describe your experience.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'reviews'), {
        ...formData,
        status: 'pending', 
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
      
      // Optimistic Update (hanya di memori lokal agar user senang)
      const optimisticReview = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        status: 'pending' 
      };
      setReviews(prev => [optimisticReview, ...prev]);
      
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setErrorMsg("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen relative overflow-x-hidden font-body">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-32 md:pt-40 md:pb-48 lg:pt-48 lg:pb-56 px-5 md:px-12 bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity scale-105" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-[#0f172a]/80 to-[#0f172a]/50"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B88E52]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center mt-6 md:mt-0"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 text-[#B88E52] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md shadow-sm">
            <MessageSquareQuote className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Guestbook
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-[1.15] px-2 drop-shadow-sm">
            Voices of Our <br className="hidden sm:block" />
            <span className="italic font-serif text-[#B88E52]">Explorers</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light px-4 md:px-0 mb-8 md:mb-12">
            Read authentic experiences from travelers who joined {BRAND_NAME} and explored unforgettable liveaboard adventures.
          </motion.p>
          
          <motion.button 
            variants={fadeInUp}
            onClick={scrollToForm}
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#B88E52] to-[#a37c46] hover:from-[#a37c46] hover:to-[#8c693b] text-white font-bold uppercase tracking-widest text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(184,142,82,0.3)] transform hover:-translate-y-1"
          >
            Share Your Experience <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </motion.button>
        </motion.div>
      </section>

      {/* 2. REVIEWS WALL (TWITTER-STYLE FEED) */}
      <section className="px-5 md:px-6 lg:px-12 mt-[-60px] md:mt-[-100px] relative z-20 pb-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR / FILTERS */}
          <div className="w-full lg:w-1/4">
            {/* Desktop: Sticky Sidebar */}
            <div className="hidden lg:block sticky top-32 bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-[#0f172a]/5 border border-gray-100">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Filter className="w-5 h-5 text-[#B88E52]" />
                <h3 className="font-heading font-bold text-[#0f172a] text-lg">Filter by Origin</h3>
              </div>
              <div className="flex flex-col gap-2">
                {uniqueOrigins.map((origin, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${
                      selectedOrigin === origin 
                        ? 'bg-[#fdfaf5] text-[#B88E52] border border-[#B88E52]/20' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#0f172a] border border-transparent'
                    }`}
                  >
                    {origin}
                    {selectedOrigin === origin && <CheckCircle2 className="w-4 h-4 text-[#B88E52]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile: Horizontal Scroll Pills */}
            <div className="lg:hidden sticky top-[72px] md:top-[88px] z-40 bg-[#f8f9fa]/95 backdrop-blur-md pt-2 pb-4 -mx-5 px-5 border-b border-gray-200/50 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar snap-x">
              <div className="flex items-center justify-center p-2.5 rounded-full bg-white border border-gray-200 shadow-sm shrink-0">
                 <Filter className="w-4 h-4 text-[#B88E52]" />
              </div>
              {uniqueOrigins.map((origin, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOrigin(origin)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest whitespace-nowrap snap-center transition-all duration-300 border shadow-sm ${
                    selectedOrigin === origin 
                      ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                      : 'bg-white text-gray-500 border-gray-200 hover:text-[#B88E52] hover:border-[#B88E52]/50'
                  }`}
                >
                  {origin}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN FEED (TWITTER STYLE) */}
          <div className="w-full lg:w-3/4 flex flex-col gap-5 md:gap-6">
            {isLoadingReviews ? (
              <div className="flex flex-col items-center justify-center h-[300px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 p-8">
                <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-[#B88E52] animate-spin mb-4" />
                <p className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-widest">Loading Stories...</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 p-8 text-center">
                <MessageSquare className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mb-4" />
                <h2 className="font-heading text-xl md:text-2xl font-bold text-[#0f172a] mb-2">No reviews found</h2>
                <p className="text-gray-500 text-xs md:text-sm font-light mb-6">There are no reviews from {selectedOrigin} yet.</p>
                {selectedOrigin !== "All" && (
                  <button 
                    onClick={() => setSelectedOrigin("All")}
                    className="px-6 py-3 rounded-full bg-gray-100 text-[#0f172a] font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    View All Reviews
                  </button>
                )}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review, idx) => (
                  <motion.div 
                    key={review.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-5 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#B88E52]/20 transition-all duration-300 flex gap-4 sm:gap-5"
                  >
                    {/* Avatar Column (Left) */}
                    <div className="shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#fdfaf5] border border-[#B88E52]/20 text-[#B88E52] flex items-center justify-center font-heading font-bold text-lg sm:text-xl shadow-sm">
                        {review.name?.charAt(0).toUpperCase() || "G"}
                      </div>
                    </div>

                    {/* Content Column (Right) */}
                    <div className="flex-1 min-w-0 pt-1">
                      
                      {/* Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-2 md:mb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 truncate">
                          <h4 className="font-bold text-[#0f172a] text-sm md:text-base leading-tight truncate">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-semibold truncate hidden sm:inline">•</span>
                            <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-semibold truncate">{review.origin}</span>
                            {review.status === 'pending' && (
                              <span className="text-[8px] bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold ml-1">Awaiting Approval</span>
                            )}
                          </div>
                        </div>
                        {/* Rating Stars */}
                        <div className="flex gap-0.5 shrink-0">
                          {[...Array(review.rating || 5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#B88E52] text-[#B88E52]" />)}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed font-light whitespace-pre-wrap mb-4">
                        {review.review || review.text}
                      </p>

                      {/* Attached Image */}
                      {review.image && (
                        <div className="w-full rounded-[1rem] overflow-hidden mt-3 md:mt-4 shadow-sm border border-gray-100 cursor-pointer">
                          <img 
                            src={review.image} 
                            alt="Guest Moment" 
                            className="w-full max-h-72 object-cover hover:scale-105 transition-transform duration-700" 
                            loading="lazy" 
                          />
                        </div>
                      )}

                      {/* Admin Reply */}
                      {review.reply && (
                        <AdminReply replyText={review.reply} />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      {/* 3. DEDICATED WRITE REVIEW SECTION (NO MODAL) */}
      <section id="write-review-section" className="py-16 md:py-24 px-5 md:px-12 bg-white border-t border-gray-100 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B88E52]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0f172a]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl shadow-[#0f172a]/5 border border-gray-100">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  
                  <div className="text-center mb-8 md:mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdfaf5] text-[#B88E52] border border-[#B88E52]/20 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                        Submit Your Story
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-4">How was your voyage?</h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
                      Thank you for choosing to explore with {BRAND_NAME}! Your genuine feedback helps us perfect the art of maritime hospitality.
                    </p>
                  </div>

                  {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 mb-8 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
                      {errorMsg}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center justify-center p-8 bg-[#fdfaf5] rounded-2xl border border-[#B88E52]/10">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#0f172a] mb-5 block">Rate Your Experience</span>
                        <div className="flex gap-2 sm:gap-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              className="focus:outline-none transition-transform hover:scale-125 active:scale-95"
                            >
                              <Star 
                                className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${
                                  star <= (hoveredStar || formData.rating) 
                                    ? "fill-[#B88E52] text-[#B88E52] drop-shadow-md" 
                                    : "fill-transparent text-gray-300 hover:text-gray-400"
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                    </div>

                    {/* Personal Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">Full Name *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-4 w-4 text-gray-400" /></div>
                          <input 
                            type="text" name="name" value={formData.name} onChange={handleInputChange} 
                            placeholder="E.g. James Bond" 
                            className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#0f172a] text-sm md:text-base font-medium shadow-sm"
                            required 
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">Origin Country *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Globe className="h-4 w-4 text-gray-400" /></div>
                          <input 
                            type="text" name="origin" value={formData.origin} onChange={handleInputChange} 
                            placeholder="E.g. United Kingdom" 
                            className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#0f172a] text-sm md:text-base font-medium shadow-sm"
                            required 
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Review Text Area */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1">Your Story *</label>
                      <div className="relative">
                        <div className="absolute top-5 left-4 pointer-events-none"><MessageSquareQuote className="h-4 w-4 text-gray-400" /></div>
                        <textarea 
                          name="text" value={formData.text} onChange={handleInputChange} 
                          rows={6}
                          placeholder="Tell us about the highlights of your trip, the crew, the food, or the amazing islands you visited..." 
                          className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#0f172a] text-sm md:text-base resize-none leading-relaxed font-light shadow-sm"
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 pl-1 flex items-center justify-between">
                        <span>Share a Moment</span>
                        <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <div 
                        className={`relative border-2 border-dashed rounded-2xl transition-all text-center overflow-hidden ${
                          formData.image 
                            ? 'border-gray-200 bg-gray-50 p-2' 
                            : 'border-gray-300 hover:bg-[#fdfaf5] hover:border-[#B88E52]/50 cursor-pointer p-8 md:p-12'
                        }`}
                        onClick={() => !formData.image && !isUploadingImage && fileInputRef.current?.click()}
                      >
                        <input 
                          type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden"
                        />
                        
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center justify-center space-y-3 py-6">
                            <Loader2 className="w-8 h-8 animate-spin text-[#B88E52]" />
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Uploading image...</p>
                          </div>
                        ) : formData.image ? (
                          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden group">
                            <img src={formData.image} alt="Review moment" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                              <button 
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, image: "" })); }}
                                className="px-6 py-3 bg-red-500 text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg uppercase tracking-widest transform hover:scale-105"
                              >
                                <X className="w-4 h-4" /> Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-3 py-4 pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                              <UploadCloud className="w-8 h-8" />
                            </div>
                            <p className="text-[#0f172a] font-bold text-sm md:text-base">Click here to upload a photo</p>
                            <p className="text-gray-500 text-xs">Supported formats: JPG, PNG (Max 10MB)</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 md:pt-6">
                      <button 
                        type="submit" 
                        disabled={isSubmitting || isUploadingImage}
                        className="w-full flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                        ) : (
                          <>Submit Experience <Send className="w-5 h-5 ml-2" /></>
                        )}
                      </button>
                      <p className="text-center text-[10px] md:text-xs text-gray-400 mt-5 leading-relaxed max-w-sm mx-auto">
                        By submitting, you allow {BRAND_NAME} to feature your review and photo across our platforms.
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* SUCCESS STATE */
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 md:py-24 text-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[#fdfaf5] rounded-full flex items-center justify-center mb-8 md:mb-10 border border-[#B88E52]/20 shadow-inner">
                    <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-[#B88E52]" />
                  </div>
                  <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 md:mb-6">Thank You!</h2>
                  <p className="text-gray-600 mb-10 md:mb-12 max-w-md mx-auto text-base md:text-lg leading-relaxed font-light">
                    Your story has been successfully submitted and is awaiting brief review. We deeply appreciate your feedback and hope to sail with you again soon!
                  </p>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", origin: "", rating: 0, text: "", image: "" });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-[#0f172a] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1e293b] transition-all shadow-xl hover:-translate-y-1"
                  >
                    Read Other Reviews
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}