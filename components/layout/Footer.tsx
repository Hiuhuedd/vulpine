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
    <footer className="bg-surface text-primary border-t-4 border-accent relative pt-16 pb-8">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-accent text-primary p-3 rounded-full hover:bg-accent-mid transition-colors duration-200 shadow-lg cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center text-primary space-x-3">
              <Image
                src="/vulpine-logo.png"
                alt="Vulpine Limited Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain "
              />
              <span className="font-serif text-xl font-bold tracking-tight">
                Vulpine Limited
              </span>
            </Link>
            <p className="text-primary/60 text-sm leading-relaxed font-sans">
              "Design, Construction and Maintenance of Natural and Built Environment"
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary/60 hover:text-accent transition-colors duration-200" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-primary/60 hover:text-accent transition-colors duration-200" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-primary/60 hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest text-accent uppercase mb-6 font-sans">Our Services</h4>
            <ul className="space-y-3 text-sm text-primary/60 font-sans">
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Water & Infrastructure</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Electrical Works</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Building Works</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Road Construction Works</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Project Management (EPCM)</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors duration-200">Public Private Partnerships</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest text-accent uppercase mb-6 font-sans">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary/60 font-sans">
              <li><Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors duration-200">About Vulpine</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors duration-200">Our Portfolio</Link></li>
              <li><Link href="/team" className="hover:text-accent transition-colors duration-200">Our Team</Link></li>
              <li><Link href="/ppp" className="hover:text-accent transition-colors duration-200">PPP Engagement</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4 text-sm text-primary/60 font-sans">
            <h4 className="text-sm font-semibold tracking-widest text-accent uppercase mb-6 text-primary">Contact Info</h4>
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
              <span>Kangundo Road, Block 2/589, Embakasi, Nairobi</span>
            </div>
            <div className="flex items-start space-x-3">
              <Mail size={18} className="text-accent shrink-0 mt-0.5" />
              <span>vulpineltd@gmail.com</span>
            </div>
            <div className="flex items-start space-x-3">
              <Phone size={18} className="text-accent shrink-0 mt-0.5" />
              <span>+254 720 999 925</span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-accent font-bold shrink-0 text-xs mt-0.5">P.O. Box</div>
              <span>269-00400, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-sans gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center md:justify-start">
            <span>© 2025 Vulpine Limited. All Rights Reserved.</span>
            <span className="hidden md:inline">|</span>
            <span>NCA6 Reg: 85321/B/0423</span>
            <span className="hidden md:inline">|</span>
            <span>KRA PIN: P051737046N</span>
          </div>
          <div>
            Built with architectural precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
