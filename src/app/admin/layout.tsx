'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ShieldCheck,
  Ship
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Daftar Menu Sidebar
const sidebarLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Blog & Journal', href: '/admin/blog', icon: BookOpen },
  { name: 'Gallery Assets', href: '/admin/gallery', icon: ImageIcon },
  { name: 'B2C Explorers', href: '/admin/b2c', icon: Users, disabled: true },
  { name: 'B2B Partners', href: '/admin/b2b', icon: Briefcase, disabled: true },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fungsi khusus untuk Admin Logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      // Hapus cookie sesi admin
      document.cookie = "admin_session=; path=/; max-age=0";
      router.push('/admin/login');
    } catch (error) {
      console.error("Gagal logout:", error);
      setIsLoggingOut(false);
    }
  };

  // Komponen Sidebar (Bisa dipanggil di Desktop maupun Mobile)
  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1a3356] border border-[#B88E52]/30 flex items-center justify-center shadow-inner shrink-0">
          <Ship className="w-6 h-6 text-[#B88E52]" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold tracking-widest leading-none">PGI VOYAGE</span>
          <span className="text-[#B88E52] text-[10px] font-mono uppercase tracking-widest mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Command Center
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const Icon = link.icon;
          
          return (
            <a
              key={link.name}
              href={link.disabled ? '#' : link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                link.disabled 
                  ? 'opacity-40 cursor-not-allowed' 
                  : isActive 
                    ? 'bg-[#B88E52] text-white shadow-lg shadow-[#B88E52]/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              onClick={(e) => {
                if (link.disabled) e.preventDefault();
                setIsMobileOpen(false);
              }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-[#B88E52] transition-colors'}`} />
              <span className="font-medium text-sm">{link.name}</span>
              
              {link.disabled && (
                <span className="ml-auto text-[9px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full">Soon</span>
              )}
            </a>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          <span className="font-medium text-sm">{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
        </button>
      </div>
    </>
  );

  // JIKA BERADA DI HALAMAN LOGIN, JANGAN TAMPILKAN LAYOUT INI
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0b1728] border-r border-[#11223a] fixed h-full z-20 shadow-2xl">
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-[#0b1728]/80 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#0b1728] border-r border-[#11223a] z-40 flex flex-col shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-72 min-h-screen">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-10 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar (Visual Only for now) */}
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#B88E52]/20 focus:border-[#B88E52] w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-[#11223a] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#11223a] leading-none mb-1">Administrator</p>
                <p className="text-[10px] text-[#B88E52] uppercase tracking-wider font-semibold">Super Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#11223a] text-white flex items-center justify-center font-bold border-2 border-white shadow-md">
                A
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}