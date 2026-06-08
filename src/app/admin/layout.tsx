'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  Menu, 
  Search,
  Bell
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // State navigasi & layout
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State user
  const [adminEmail, setAdminEmail] = useState('Administrator');
  const [adminInitial, setAdminInitial] = useState('A');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const namePart = user.email.split('@')[0];
        setAdminEmail(namePart);
        setAdminInitial(namePart.charAt(0).toUpperCase());
      }
    });
    return () => unsubscribe();
  }, []);

  // JIKA BERADA DI HALAMAN LOGIN, JANGAN TAMPILKAN LAYOUT INI
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      
      {/* SIDEBAR COMPONENT */}
      <AdminSidebar 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-400 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-10 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
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
                <p className="text-sm font-bold text-[#11223a] leading-none mb-1 capitalize">{adminEmail}</p>
                <p className="text-[10px] text-[#B88E52] uppercase tracking-wider font-semibold">Super Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#11223a] text-white flex items-center justify-center font-bold border-2 border-white shadow-md">
                {adminInitial}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}