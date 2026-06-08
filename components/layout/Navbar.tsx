'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
    { name: 'PPP', href: '/ppp' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-surface/95 backdrop-blur-md border-b border-slate-200 shadow-sm ${
          isScrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 space-x-3">
              <Image
                src="/vulpine-logo.png"
                alt="Vulpine Limited"
                width={40}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain"
                priority
              />
              <span className="font-serif text-xl font-bold text-primary tracking-tight">
                Vulpine Limited
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center h-full space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-sans text-sm font-medium transition-colors duration-300 px-3 py-1.5 rounded-md ${
                      isActive
                        ? 'text-accent bg-slate-50'
                        : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>


            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary hover:text-accent p-2 rounded-md transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-surface transform transition-transform duration-500 ease-in-out md:hidden border-b border-slate-200 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center px-8 mx-4 relative">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 pointer-events-none" />

          <div className="flex flex-col space-y-0 relative z-10 divide-y divide-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-serif text-2xl font-bold py-6 transition-colors ${
                    isActive ? 'text-accent' : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
