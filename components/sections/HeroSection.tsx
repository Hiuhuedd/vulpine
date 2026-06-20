'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionData } from '@/types/cms';

interface HeroSectionProps {
  data: SectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const heading = data?.heading || "BUILDING EAST AFRICA'S FUTURE";
  const subheading = data?.subheading || "SPECIALISTS IN ELECTRICAL, BUILDING & ROAD WORKS";
  const body = data?.body || "Unbowed resolve to deliver quality. Engineering the natural and built environment with precision, scale, and uncompromising integrity.";
  const ctaLabel = data?.ctaLabel || "INITIALIZE PROJECT";
  const ctaLink = data?.ctaLink || "/projects";
  const heroImage = data?.images?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative min-h-[90vh] bg-dark flex items-center pt-32 pb-12 overflow-hidden border-b border-white/10">
      {/* Background Image with a premium animation scale effect */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />

      {/* Multi-layered dark forest/pine overlay for maximum text legibility and premium depth */}
      <div className="absolute inset-0 bg-dark/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />

      {/* Decorative large background text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-[8vw] font-sans font-bold text-white/[0.03] whitespace-nowrap pointer-events-none select-none">
        EAST AFRICA
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-1.5 bg-accent mb-10"
        />

        <div className="w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-accent mb-8"
          >
            {subheading}
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight font-bold text-white"
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
          className="text-white/80 font-sans text-lg sm:text-xl max-w-2xl leading-relaxed font-medium mt-10"
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center space-y-10 pt-16"
        >
          <Link
            href={ctaLink}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-sans font-bold text-primary bg-accent rounded-sm overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-accent/25"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-sm opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="relative text-[11px] tracking-widest uppercase">{ctaLabel}</span>
          </Link>

          <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span className="w-16 h-px bg-white/20" />
            <span>Scroll to Explore</span>
            <span className="w-16 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}



