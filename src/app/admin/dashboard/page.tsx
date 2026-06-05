'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Briefcase, 
  ArrowRight, 
  Activity, 
  PlusCircle,
  Ship
} from 'lucide-react';

// Perbaikan: ease menggunakan array bezier agar tidak ditolak TypeScript
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
  // Dummy data untuk statistik awal (Nanti akan dihubungkan dengan Firebase)
  const stats = [
    { 
      title: 'Published Blogs', 
      value: '12', 
      icon: <FileText className="w-6 h-6 text-blue-500" />, 
      bg: 'bg-blue-50', 
      link: '/admin/blog',
      status: 'Active'
    },
    { 
      title: 'Gallery Assets', 
      value: '48', 
      icon: <ImageIcon className="w-6 h-6 text-emerald-500" />, 
      bg: 'bg-emerald-50', 
      link: '/admin/gallery',
      status: 'Active'
    },
    { 
      title: 'B2C Explorers', 
      value: '0', 
      icon: <Users className="w-6 h-6 text-purple-500" />, 
      bg: 'bg-purple-50', 
      link: '#',
      status: 'Coming Soon'
    },
    { 
      title: 'B2B Partners', 
      value: '0', 
      icon: <Briefcase className="w-6 h-6 text-amber-500" />, 
      bg: 'bg-amber-50', 
      link: '#',
      status: 'Coming Soon'
    },
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

      {/* 2. Key Metrics (Stats) */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.a
            href={stat.status === 'Active' ? stat.link : '#'}
            key={index}
            variants={fadeInUp}
            className={`block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all ${stat.status === 'Coming Soon' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:-translate-y-1'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
              {stat.status === 'Coming Soon' && (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                  Soon
                </span>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-[#11223a]">{stat.value}</h3>
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
              <h2 className="text-xl font-bold mb-2">Phase 1: Content Management</h2>
              <p className="text-gray-400 text-sm mb-6 max-w-md leading-relaxed">
                The current system focuses on establishing the digital storefront. Blog and Gallery modules are active. The booking engine and B2B/B2C portals will be activated in the next development phase.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#B88E52]/20 text-[#B88E52] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4" /> Development in Progress
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
            {/* Dummy Log Items */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-[#11223a]">Admin logged in successfully</p>
                <p className="text-xs text-gray-400 mt-1">Just now • IP: 192.168.1.1</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-[#11223a]">System framework initialized</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago • Automated</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-[#11223a]">Security rules updated</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago • Super Admin</p>
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