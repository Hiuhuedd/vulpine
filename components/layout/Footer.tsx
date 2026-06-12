'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white relative pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(164,206,49,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-12 right-8 lg:right-12 bg-white text-primary p-4 hover:bg-accent hover:text-primary transition-colors duration-300 shadow-xl cursor-pointer rounded-sm z-20"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

      {/* Massive Typography */}
      <div className="w-full overflow-hidden mb-16 pointer-events-none select-none px-4 sm:px-8 lg:px-12 flex justify-center">
        <h2 className="text-[8vw] font-bold leading-[0.8] tracking-tighter text-white/5 font-sans whitespace-nowrap">
          VULPINE LIMITED
        </h2>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-4 space-y-8 pr-8">
            <Link href="/" className="flex items-center text-white space-x-3">
              <div className="bg-white/10 p-2 rounded-sm">
                <Image
                  src="/vulpine-logo.png"
                  alt="Vulpine Limited Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <span className="font-sans text-2xl font-bold tracking-tighter">
                VULPINE<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-sans font-medium">
              "Design, Construction and Maintenance of Natural and Built Environment"
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center text-white/60 hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-8 font-sans">Our Services</h4>
            <ul className="space-y-4 text-sm text-white/70 font-sans font-medium">
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Electrical, Solar & Fencing Works</Link></li>
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Building Works</Link></li>
              <li><Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Road Construction Works</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-8 font-sans">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/70 font-sans font-medium">
              <li><Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">About Vulpine</Link></li>
              <li><Link href="/projects" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Our Portfolio</Link></li>
              <li><Link href="/team" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="lg:col-span-3 space-y-6 text-sm text-white/70 font-sans font-medium">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-8">Contact Info</h4>
            <div className="flex items-start space-x-4">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>Kangundo Road, Block 2/589, Embakasi, Nairobi</span>
            </div>
            <div className="flex items-start space-x-4">
              <Mail size={18} className="text-accent shrink-0 mt-0.5" />
              <span>vulpineltd@gmail.com</span>
            </div>
            <div className="flex items-start space-x-4">
              <Phone size={18} className="text-accent shrink-0 mt-0.5" />
              <span>+254 720 999 925</span>
            </div>
            <div className="flex items-start space-x-4 pt-4 border-t border-white/10">
              <div className="text-accent font-bold tracking-widest shrink-0 text-xs mt-0.5">P.O. BOX</div>
              <span>269-00400, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold tracking-widest uppercase text-white/40 font-sans gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center md:justify-start">
            <span>© 2025 Vulpine Ltd.</span>
            <span className="hidden md:inline">|</span>
            <span>NCA6 Reg: 85321/B/0423</span>
            <span className="hidden md:inline">|</span>
            <span>KRA PIN: P051737046N</span>
          </div>
          <div>
            ARCHITECTING PROGRESS
          </div>
        </div>
      </div>
    </footer>
  );
}


