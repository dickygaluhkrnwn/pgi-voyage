'use client';

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react"; // Pastikan lucide-react terinstall

export default function PublicHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const waNumber = "6287817865690";
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20PGI%20Voyage,%20I%20want%20to%20sign%20up%20and%20claim%20my%20IDR%20500k%20Welcome%20Voucher!`;

  // Logika Smart Header (Sembunyi saat scroll bawah, muncul saat scroll atas)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Ubah background jadi blur setelah scroll turun sedikit
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Sembunyikan header jika scroll ke bawah melewati 150px
    if (latest > 150 && latest > previous) {
      setHidden(true);
      setMobileMenuOpen(false); // Tutup menu mobile jika user scroll ke bawah
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled 
            ? "bg-[#11223a]/85 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-[#11223a]/20 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* LOGO & BRANDING */}
          <div className="flex items-center gap-3">
            <a href="/" className="group flex items-center gap-3">
              {/* Bulat Logo Wrapper */}
              <div className="bg-white/95 p-1 rounded-full backdrop-blur-sm shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#B88E52]/20 flex items-center justify-center overflow-hidden w-11 h-11 border border-white/20">
                <img 
                  src="/LOGO-KOMODO-GILI.png" 
                  alt="PMM Voyage Logo" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-[#11223a] font-bold text-xs">PMM</span>';
                  }}
                />
              </div>
              {/* Teks Branding PMM Voyage */}
              <span className="text-white font-bold text-lg tracking-wider group-hover:text-[#B88E52] transition-colors duration-300 font-sans">
                PMM Voyage
              </span>
            </a>
          </div>
          
          {/* DESKTOP NAVIGATION (Animasi Hover Garis Bawah) */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex gap-8 text-sm font-medium tracking-wide text-white/90">
              {[
                { name: 'Home', href: '/' },
                { name: 'Our Expedition', href: '/expedition' },
                { name: 'The Vessel & Safety', href: '/boat-details' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Blog', href: '/blog' }
              ].map((item) => (
                <a key={item.name} href={item.href} className="relative py-2 group">
                  <span className="group-hover:text-[#B88E52] transition-colors duration-300">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B88E52] transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </nav>
            
            <div className="w-px h-6 bg-white/20"></div>

            <a 
              href={b2cWaLink}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-gradient-to-r from-[#B88E52] to-[#a37c46] hover:from-[#a37c46] hover:to-[#8c693b] text-white px-7 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(184,142,82,0.4)] hover:shadow-[0_6px_25px_rgba(184,142,82,0.6)] transform hover:-translate-y-0.5"
            >
              Book Now
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE DROPDOWN MENU */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="fixed top-[70px] left-0 w-full bg-[#11223a]/95 backdrop-blur-xl border-b border-white/10 z-40 overflow-hidden lg:hidden"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          <a href="/" className="text-white/90 font-medium text-lg border-b border-white/10 pb-3">Home</a>
          <a href="/expedition" className="text-white/90 font-medium text-lg border-b border-white/10 pb-3">Our Expedition</a>
          <a href="/boat-details" className="text-white/90 font-medium text-lg border-b border-white/10 pb-3">The Vessel & Safety</a>
          <a href="/gallery" className="text-white/90 font-medium text-lg border-b border-white/10 pb-3">Gallery</a>
          <a href="/blog" className="text-white/90 font-medium text-lg border-b border-white/10 pb-3">Blog</a>
          <a 
            href={b2cWaLink} 
            className="mt-4 bg-[#B88E52] text-center text-white py-3 rounded-xl font-bold"
          >
            Book Now
          </a>
        </div>
      </motion.div>
    </>
  );
}