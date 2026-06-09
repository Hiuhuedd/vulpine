'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionData } from '@/types/cms';

interface HeroSectionProps {
  data: SectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const heading = data?.heading || "BUILDING EAST AFRICA'S FUTURE";
  const subheading = data?.subheading || "SPECIALISTS IN BUILDING, ROADS & ELECTRICAL INFRASTRUCTURE";
  const body = data?.body || "Unbowed resolve to deliver quality. Engineering the natural and built environment with precision, scale, and uncompromising integrity.";
  const ctaLabel = data?.ctaLabel || "INITIALIZE PROJECT";
  const ctaLink = data?.ctaLink || "/projects";
  const heroImage = data?.images?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative min-h-screen bg-surface flex items-center pt-32 pb-12 overflow-hidden">
      {/* Decorative large background text */}
      <div className="absolute top-1/4 -left-10 text-[15vw] font-sans font-black text-slate-200/50 whitespace-nowrap pointer-events-none select-none">
        EAST AFRICA
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-8 z-20">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-24 h-1.5 bg-accent origin-left"
            />
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-slate-500 mb-6"
              >
                {subheading}
              </motion.h2>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-sans text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1] tracking-tighter font-black text-primary"
              >
                {heading.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-accent' : ''}>{word} </span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-slate-600 font-sans text-lg sm:text-xl max-w-lg leading-relaxed font-medium"
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center space-x-6 pt-4"
            >
              <Link href={ctaLink} className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-white bg-primary rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                <span className="relative text-xs tracking-widest uppercase">{ctaLabel}</span>
              </Link>
              
              <div className="hidden sm:flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-primary">
                <span className="w-12 h-px bg-slate-300" />
                <span>Scroll to Explore</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-6 relative h-[50vh] lg:h-[80vh] w-full mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative w-full h-full rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-[2s] ease-out"
                style={{ backgroundImage: `url('${heroImage}')` }}
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </motion.div>

            {/* Floating geometric accent */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20 pointer-events-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
