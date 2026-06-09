'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader'; // Komponen baru yang kita buat

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // State navigasi & layout sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* SMART HEADER COMPONENT */}
        <AdminHeader setIsMobileOpen={setIsMobileOpen} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto overflow-x-hidden relative">
          {children}
        </main>
      </div>
      
    </div>
  );
}