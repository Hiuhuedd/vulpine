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
  const subheading = data?.subheading || "SPECIALISTS IN WATER & ELECTRICAL INFRASTRUCTURE";
  const body = data?.body || "Unbowed resolve to deliver quality. Engineering the natural and built environment with precision, scale, and uncompromising integrity.";
  const ctaLabel = data?.ctaLabel || "INITIALIZE PROJECT";
  const ctaLink = data?.ctaLink || "/projects";
  const heroImage = data?.images?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Grayscale & High Contrast Masking */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />

        {/* Soft Technical Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-5" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 mt-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-4 mb-8"
            >
              <div className="w-12 h-0.5 bg-accent" />
              <span className="text-sm font-semibold tracking-widest text-accent font-sans uppercase">
                {subheading}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#ffffff] font-bold leading-tight tracking-tight mb-6"
            >
              {heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-300 font-sans text-lg sm:text-xl max-w-2xl leading-relaxed"
            >
              {body}
            </motion.p>
          </div>


        </div>
      </div>
    </section>
  );
}
