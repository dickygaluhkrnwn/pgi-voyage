'use client';

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND_NAME, CONTACT } from "@/lib/constants";

export default function PublicHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Format nomor WA otomatis dari constants (menghilangkan spasi dan karakter non-angka)
  const waNumber = CONTACT.PHONE_1.replace(/\D/g, '');
  const b2cWaLink = `https://wa.me/${waNumber}?text=Hi%20${encodeURIComponent(BRAND_NAME)},%20I%20want%20to%20sign%20up%20and%20claim%20my%20exclusive%20Welcome%20Voucher!`;

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
            ? "bg-[#0f172a]/90 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-[#0f172a]/20 py-3" 
            : "bg-transparent py-5 lg:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* LOGO & BRANDING */}
          <div className="flex items-center gap-3">
            <a href="/" className="group flex items-center gap-4">
              {/* Bulat Logo Wrapper */}
              <div className="bg-white/95 p-1 rounded-full backdrop-blur-sm shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(184,142,82,0.3)] flex items-center justify-center overflow-hidden w-11 h-11 lg:w-12 lg:h-12 border border-white/20">
                <img 
                  src="/LOGO-KOMODO-GILI.png" 
                  alt={`${BRAND_NAME} Logo`} 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Fallback inisial GIV (Golden Island Voyage)
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-[#0f172a] font-bold text-xs">GIV</span>';
                  }}
                />
              </div>
              {/* Teks Branding */}
              <span className="text-white font-heading font-semibold text-lg lg:text-xl tracking-wide group-hover:text-[#B88E52] transition-colors duration-300">
                {BRAND_NAME}
              </span>
            </a>
          </div>
          
          {/* DESKTOP NAVIGATION (Animasi Hover Garis Bawah) */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex gap-8 text-xs font-body font-medium uppercase tracking-widest text-white/90">
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
              className="flex items-center gap-2 bg-gradient-to-r from-[#B88E52] to-[#a37c46] hover:from-[#a37c46] hover:to-[#8c693b] text-white px-7 py-3 rounded-full font-body font-bold text-xs uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(184,142,82,0.4)] hover:shadow-[0_6px_25px_rgba(184,142,82,0.6)] transform hover:-translate-y-0.5"
            >
              Reserve Now
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
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
        className="fixed top-[70px] left-0 w-full bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/10 z-40 overflow-hidden lg:hidden"
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          <a href="/" className="text-white/90 font-body font-medium uppercase tracking-widest text-xs border-b border-white/10 pb-4">Home</a>
          <a href="/expedition" className="text-white/90 font-body font-medium uppercase tracking-widest text-xs border-b border-white/10 pb-4">Our Expedition</a>
          <a href="/boat-details" className="text-white/90 font-body font-medium uppercase tracking-widest text-xs border-b border-white/10 pb-4">The Vessel & Safety</a>
          <a href="/gallery" className="text-white/90 font-body font-medium uppercase tracking-widest text-xs border-b border-white/10 pb-4">Gallery</a>
          <a href="/blog" className="text-white/90 font-body font-medium uppercase tracking-widest text-xs border-b border-white/10 pb-4">Blog</a>
          <a 
            href={b2cWaLink} 
            className="mt-4 bg-gradient-to-r from-[#B88E52] to-[#a37c46] text-center text-white py-4 rounded-xl font-body font-bold uppercase tracking-widest text-xs shadow-lg"
          >
            Reserve Now
          </a>
        </div>
      </motion.div>
    </>
  );
}