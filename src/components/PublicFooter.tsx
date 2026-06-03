'use client';

import { MapPin, Ship, Compass, Mail, Phone } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-[#0b1728] pt-20 pb-10 border-t border-white/5 mt-auto relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
        <Compass className="w-96 h-96 text-[#B88E52]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Profile */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-white/95 p-1.5 rounded-xl shadow-md">
                  <img 
                    src="/LOGO-KOMODO-GILI.png" 
                    alt="PGI Voyage Logo" 
                    className="h-10 w-auto object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <span className="text-white font-bold text-xl tracking-widest uppercase">
                  PGI Voyage
                </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Redefining premium liveaboard experiences across the Indonesian archipelago. Explore Komodo in unrivaled elegance and supreme safety.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#B88E52] hover:border-[#B88E52] hover:bg-[#B88E52]/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#B88E52] hover:border-[#B88E52] hover:bg-[#B88E52]/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm">Home</a></li>
              <li><a href="/expedition" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm">Our Expedition (4D3N)</a></li>
              <li><a href="/boat-details" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm">The Vessel & Safety</a></li>
              <li><a href="/gallery" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm">Gallery & Experiences</a></li>
            </ul>
          </div>

          {/* Column 3: Digital Portal */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Ecosystem</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm flex items-center gap-2">Member Login (B2C)</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm flex items-center gap-2">Agent Portal (B2B)</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#B88E52] transition-colors text-sm flex items-center gap-2">Claim Welcome Voucher</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-[#B88E52] shrink-0" />
                <span>Labuan Bajo Port, East Nusa Tenggara, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-[#B88E52] shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-[#B88E52] shrink-0" />
                <span>hello@pgivoyage.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PGI Voyage. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}