'use client';

import { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, Send, Loader2, CheckCircle2, User, Globe, MessageSquareQuote, Camera, X, UploadCloud } from "lucide-react";

// --- ANIMATION CONFIGURATIONS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    rating: 0,
    text: "",
    image: "", // Menampung URL gambar dari Cloudinary
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- CLOUDINARY UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi sederhana ukuran file (Max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Ukuran foto terlalu besar. Maksimal 10MB.");
      return;
    }

    setIsUploadingImage(true);
    setErrorMsg("");
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'pgi_voyage_preset'); 

    try {
      // Ganti danyx7uny dengan cloud name milikmu jika berbeda
      const res = await fetch(`https://api.cloudinary.com/v1_1/danyx7uny/image/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, image: data.secure_url }));
      } else {
        setErrorMsg("Gagal mengunggah foto. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg("Gagal mengunggah foto. Pastikan koneksi internet stabil.");
    } finally {
      setIsUploadingImage(false);
      // Reset input file agar bisa memilih file yang sama jika dihapus
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validasi Sederhana
    if (!formData.name.trim() || !formData.origin.trim() || !formData.text.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }
    if (formData.rating === 0) {
      setErrorMsg("Please select a star rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simpan ke Firestore (Koleksi 'reviews')
      await addDoc(collection(db, 'reviews'), {
        ...formData,
        status: 'pending', // Default status, butuh persetujuan admin untuk tampil
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setErrorMsg("An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col w-full bg-[#f8f9fa] min-h-screen items-center justify-center relative overflow-hidden py-32 px-6">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B88E52]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#11223a]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-[#11223a]/10 p-8 md:p-12 relative z-10 border border-gray-100"
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
              
              <div className="text-center mb-10">
                <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdfaf5] text-[#B88E52] border border-[#B88E52]/20 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                   Share Your Experience
                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#11223a] mb-3">How was your voyage?</motion.h1>
                <motion.p variants={fadeInUp} className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
                  Thank you for sailing with PMM Voyage! Your feedback helps us improve and inspires future explorers.
                </motion.p>
              </div>

              {errorMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 mb-8 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 text-center">
                  {errorMsg}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Star Rating Interactive */}
                <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                   <span className="text-sm font-semibold text-gray-700 mb-4 block">Rate Your Experience</span>
                   <div className="flex gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <button
                         key={star}
                         type="button"
                         onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                         onMouseEnter={() => setHoveredStar(star)}
                         onMouseLeave={() => setHoveredStar(0)}
                         className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                       >
                         <Star 
                           className={`w-10 h-10 transition-colors duration-200 ${
                             star <= (hoveredStar || formData.rating) 
                               ? "fill-[#B88E52] text-[#B88E52] drop-shadow-md" 
                               : "fill-transparent text-gray-300 hover:text-gray-400"
                           }`} 
                         />
                       </button>
                     ))}
                   </div>
                </motion.div>

                {/* 2. Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-[#11223a] mb-2 pl-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange} 
                        placeholder="John Doe" 
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#11223a]"
                        required 
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label className="block text-sm font-semibold text-[#11223a] mb-2 pl-1">Country of Origin</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Globe className="h-5 w-5 text-gray-400" /></div>
                      <input 
                        type="text" name="origin" value={formData.origin} onChange={handleInputChange} 
                        placeholder="e.g., Australia, Germany" 
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#11223a]"
                        required 
                      />
                    </div>
                  </motion.div>
                </div>

                {/* 3. Review Text Area */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-semibold text-[#11223a] mb-2 pl-1">Your Story</label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none"><MessageSquareQuote className="h-5 w-5 text-gray-400" /></div>
                    <textarea 
                      name="text" value={formData.text} onChange={handleInputChange} 
                      rows={5}
                      placeholder="Tell us about the highlights of your trip, the crew, the food, or the amazing islands you visited..." 
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#B88E52] focus:ring-1 focus:ring-[#B88E52] transition-all text-[#11223a] resize-none leading-relaxed"
                      required 
                    />
                  </div>
                </motion.div>

                {/* 4. Photo Upload (Optional) */}
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-semibold text-[#11223a] mb-2 pl-1 flex items-center justify-between">
                    <span>Share Your Best Moment</span>
                    <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <div 
                    className={`relative border-2 border-dashed rounded-2xl transition-all text-center overflow-hidden ${
                      formData.image 
                        ? 'border-gray-200 bg-gray-50 p-2' 
                        : 'border-gray-300 hover:bg-gray-50 hover:border-[#B88E52]/50 cursor-pointer p-6'
                    }`}
                    onClick={() => !formData.image && !isUploadingImage && fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center justify-center space-y-3 py-6">
                        <Loader2 className="w-8 h-8 animate-spin text-[#B88E52]" />
                        <p className="text-sm font-medium text-gray-500">Uploading your moment...</p>
                      </div>
                    ) : formData.image ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                        <img src={formData.image} alt="Review moment" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, image: "" })); }}
                            className="px-5 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg transform hover:scale-105"
                          >
                            <X className="w-4 h-4" /> Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2 py-4 pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                          <Camera className="w-6 h-6" />
                        </div>
                        <p className="text-[#11223a] font-bold text-sm">Click to upload a photo</p>
                        <p className="text-gray-500 text-xs">Show us your favorite memory (JPG, PNG)</p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* 5. Submit Button */}
                <motion.div variants={fadeInUp} className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || isUploadingImage}
                    className="w-full flex items-center justify-center gap-2 bg-[#B88E52] hover:bg-[#a37c46] text-white px-8 py-4.5 rounded-xl font-bold text-lg transition-all shadow-[0_4px_20px_rgba(184,142,82,0.3)] hover:shadow-[0_6px_25px_rgba(184,142,82,0.4)] disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Review <Send className="w-5 h-5 ml-1" /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed max-w-sm mx-auto">
                    By submitting, you allow PMM Voyage to feature your review and photo on our website.
                  </p>
                </motion.div>

              </form>
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border border-emerald-100 shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#11223a] mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-10 max-w-sm text-lg leading-relaxed">
                Your review has been successfully submitted. We deeply appreciate your feedback and hope to sail with you again soon!
              </p>
              <a href="/" className="px-8 py-3.5 bg-[#11223a] text-white rounded-full font-bold hover:bg-[#0f1f33] transition-all shadow-md hover:-translate-y-0.5">
                Return to Homepage
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}