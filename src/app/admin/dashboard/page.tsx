'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  ArrowRight, 
  Activity, 
  PlusCircle,
  Ship
} from 'lucide-react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState<number | string>('...');
  // Set default ke 0 karena koleksi gallery belum ada di database
  const [galleryCount, setGalleryCount] = useState<number | string>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchDashboardStats = async () => {
          setIsLoading(true);
          
          // 1. Fetch Blog Count
          try {
            const blogSnap = await getCountFromServer(collection(db, 'blogs'));
            setBlogCount(blogSnap.data().count);
          } catch (error) {
            console.error("Error fetching blog stats:", error);
            setBlogCount(0);
          }

          // 2. Fetch Gallery Count (Sementara dimatikan)
          /*
          try {
            const gallerySnap = await getCountFromServer(collection(db, 'gallery'));
            setGalleryCount(gallerySnap.data().count);
          } catch (error) {
            console.error("Error fetching gallery stats:", error);
            setGalleryCount(0);
          } 
          */
          
          setIsLoading(false);
        };

        fetchDashboardStats();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Data Statistik Utama
  const stats = [
    { 
      title: 'Published Blogs', 
      value: blogCount, 
      icon: <FileText className="w-6 h-6 text-blue-500" />, 
      bg: 'bg-blue-50', 
      link: '/admin/blog',
      status: 'Active'
    },
    { 
      title: 'Gallery Assets', 
      value: galleryCount, 
      icon: <ImageIcon className="w-6 h-6 text-emerald-500" />, 
      bg: 'bg-emerald-50', 
      link: '/admin/gallery',
      status: 'Active'
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* 1. Header Section */}
      <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#11223a] mb-2">Command Center</h1>
          <p className="text-gray-500">Welcome back, Administrator. Here is your system overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          <Activity className="w-4 h-4 text-emerald-500" /> System Online & Secure
        </div>
      </motion.div>

      {/* 2. Key Metrics (Stats) - Ubah ke grid-cols-2 agar lebih lebar */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.a
            href={stat.status === 'Active' ? stat.link : '#'}
            key={index}
            variants={fadeInUp}
            className="block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-[#11223a]">
                {isLoading ? (
                  <span className="inline-block w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#B88E52] animate-spin"></span>
                ) : (
                  stat.value
                )}
              </h3>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* 3. Main Dashboard Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions (Kiri) */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#11223a] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/admin/blog/create" className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#B88E52]/30 hover:bg-[#fdfaf5] transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-[#B88E52] group-hover:text-white transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#11223a] group-hover:text-[#B88E52] transition-colors">Write New Article</h4>
                  <p className="text-xs text-gray-500 mt-1">Publish a new journal or guide for SEO.</p>
                </div>
              </a>
              <a href="/admin/gallery" className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-[#B88E52]/30 hover:bg-[#fdfaf5] transition-colors">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-[#B88E52] group-hover:text-white transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#11223a] group-hover:text-[#B88E52] transition-colors">Upload Gallery</h4>
                  <p className="text-xs text-gray-500 mt-1">Add new visual assets to the portfolio.</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-[#11223a] p-8 rounded-3xl border border-[#1a3356] shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Ship className="w-48 h-48 text-[#B88E52]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Pusat Kendali Konten</h2>
              <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
                Sistem ini dikhususkan untuk mengelola halaman publik website PGI Voyage. Pastikan artikel blog memiliki keyword SEO yang tepat dan foto galeri diunggah dengan resolusi tinggi namun ukuran file yang optimal.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#B88E52]/20 text-[#B88E52] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Live Web Manager
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity / Logs (Kanan) */}
        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#11223a]">System Logs</h2>
            <button className="text-sm text-[#B88E52] font-semibold hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-[#11223a]">Admin authenticated</p>
                <p className="text-xs text-gray-400 mt-1">Status: Secure Session Active</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-[#11223a]">Firebase connection established</p>
                <p className="text-xs text-gray-400 mt-1">Automated System Check</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <a href="/" target="_blank" className="flex items-center justify-between w-full p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-600 group">
              Preview Live Website
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}