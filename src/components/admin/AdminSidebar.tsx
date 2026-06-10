'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Ship,
  ChevronLeft,
  ChevronRight,
  Map
} from 'lucide-react';

// Menu tersisa setelah B2C dan B2B dihapus
const sidebarLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Blog & Journal', href: '/admin/blog', icon: BookOpen },
  { name: 'Gallery Assets', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Expedition', href: '/admin/expedition', icon: Map },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export default function AdminSidebar({ 
  isMobileOpen, 
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      document.cookie = "admin_session=; path=/; max-age=0";
      router.push('/admin/login');
    } catch (error) {
      console.error("Gagal logout:", error);
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand & Logo Area */}
      <div className={`p-6 flex items-center gap-3 relative ${isCollapsed ? 'justify-center px-0' : ''} transition-all duration-300`}>
        <div className="w-10 h-10 rounded-xl bg-[#1a3356] border border-[#B88E52]/30 flex items-center justify-center shadow-inner shrink-0 relative z-10">
          <Ship className="w-6 h-6 text-[#B88E52]" />
        </div>
        
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="text-white font-bold tracking-widest leading-none">PGI VOYAGE</span>
              <span className="text-[#B88E52] text-[10px] font-mono uppercase tracking-widest mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Command Center
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {!isCollapsed && (
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 transition-opacity duration-300">
            Main Menu
          </p>
        )}
        
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          const Icon = link.icon;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              title={isCollapsed ? link.name : ""}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-[#B88E52] text-white shadow-lg shadow-[#B88E52]/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'group-hover:text-[#B88E52] transition-colors'}`} />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium text-sm whitespace-nowrap overflow-hidden"
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className={`p-4 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          title={isCollapsed ? "Log Out" : ""}
          className={`flex items-center gap-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group ${isCollapsed ? 'p-3 justify-center' : 'w-full px-4 py-3'}`}
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:rotate-180 transition-transform duration-300" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside 
        animate={{ width: isCollapsed ? 80 : 288 }} // 80px = w-20, 288px = w-72
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="hidden lg:flex flex-col bg-[#0b1728] border-r border-[#11223a] fixed h-full z-30 shadow-2xl"
      >
        <SidebarContent />

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-[#B88E52] text-white p-1 rounded-full shadow-lg border-2 border-[#f8f9fa] hover:scale-110 transition-transform z-40"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-[#0b1728]/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#0b1728] border-r border-[#11223a] z-50 flex flex-col shadow-2xl lg:hidden"
            >
              {/* Force expand on mobile view */}
              <div className="h-full w-72">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}