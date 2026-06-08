'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionData } from '@/types/cms';

interface CtaBannerProps {
  data: SectionData;
}

export default function CtaBanner({ data }: CtaBannerProps) {
  const heading = data?.heading || "Ready to Start Your Project?";
  const subheading = data?.subheading || "Contact us today for a free consultation and technical advice.";
  const ctaLabel = data?.ctaLabel || "Get in Touch";
  const ctaLink = data?.ctaLink || "/contact";

  return (
    <section className="bg-light-green py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white border border-slate-200 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Background accents inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary font-bold tracking-tight leading-tight"
            >
              {heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-primary/80 font-sans text-base sm:text-lg lg:text-xl max-w-2xl mx-auto"
            >
              {subheading}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6"
            >
              <Link
                href={ctaLink}
                className="architectural-btn text-lg shadow-xl shadow-accent/20"
              >
                {ctaLabel}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
