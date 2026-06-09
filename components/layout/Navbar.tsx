'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4">
        <nav
          className={`transition-all duration-500 rounded-sm bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] ${
            isScrolled ? 'py-3 px-6 w-[95%] md:w-[85%]' : 'py-4 px-8 w-full md:w-[90%]'
          } max-w-7xl flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 space-x-3 group">
            <div className="bg-primary/5 p-2 rounded-sm group-hover:bg-accent/10 transition-colors">
              <Image
                src="/vulpine-logo.png"
                alt="Vulpine Limited"
                width={36}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <span className="font-sans font-bold text-xl tracking-tighter text-primary">
              VULPINE<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-surface p-1 rounded-sm border border-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-[13px] font-bold uppercase tracking-wider transition-all duration-300 px-5 py-2.5 rounded-sm ${
                    isActive
                      ? 'text-white bg-primary shadow-md'
                      : 'text-slate-500 hover:text-primary hover:bg-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/contact" className="font-sans text-xs font-bold uppercase tracking-widest text-primary hover:text-accent flex items-center space-x-2">
              <span>Let's Talk</span>
              <div className="w-8 h-px bg-primary/30" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary bg-surface p-2.5 rounded-sm shadow-sm"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer - Redesigned */}
      <div
        className={`fixed inset-0 z-40 bg-primary transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center px-8 relative overflow-hidden">
          {/* Decorative huge text */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 opacity-5 rotate-90 origin-center pointer-events-none">
            <span className="font-sans font-bold text-[6rem] text-white">VULPINE</span>
          </div>

          <div className="flex flex-col space-y-6 relative z-10">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={isOpen ? { y: 0 } : { y: "100%" }}
                    transition={{ delay: 0.1 * idx, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-sans text-3xl sm:text-3xl font-bold uppercase tracking-tighter flex items-center space-x-4 ${
                        isActive ? 'text-accent' : 'text-white hover:text-surface'
                      }`}
                    >
                      <span className="text-sm font-medium opacity-50 tracking-widest mr-4">0{idx + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}


