'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award } from 'lucide-react';
import { SectionData } from '@/types/cms';

interface AboutTeaserProps {
  data: SectionData;
}

export default function AboutTeaser({ data }: AboutTeaserProps) {
  const heading = data?.heading || "WHO WE ARE";
  const body = data?.body || "Vulpine Limited is an NCA6 certified engineering firm incorporated on 20 Oct 2018. Over the years, we have built a profound reputation for executing complex Water Infrastructure and Electrical Works, delivering high-value solutions that power and sustain communities.";
  const ceoQuote = data?.ceoQuote || "Our journey to where we are today has been marked with many hurdles and challenges... Our hard work, determination and unbowed resolve to always deliver quality and on time, has been rewarded in more ways than we could imagine.";

  return (
    <section className="bg-light-green py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: CEO Note Pull Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-sm font-semibold tracking-widest text-accent uppercase block mb-4 font-sans">
              A Letter From Our MD
            </span>
            <div className="border-l-4 border-accent pl-6 py-2">
              <blockquote className="font-serif text-xl sm:text-2xl text-primary font-bold italic leading-relaxed tracking-wide">
                "{ceoQuote}"
              </blockquote>
              <cite className="block font-sans text-sm font-medium text-slate-500 mt-4 not-italic">
                — Wilson Baru Wachira, Managing Director
              </cite>
            </div>
          </motion.div>

          {/* Right Column: Company intro and badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <span className="text-sm font-semibold tracking-widest text-accent uppercase block mb-3">
                {heading}
              </span>
              <div className="w-12 h-0.5 bg-accent mb-6" />
              <h2 className="font-serif text-3xl font-bold tracking-wide mb-6 text-primary">
                Architecting Progress Across East Africa
              </h2>
              <p className="text-slate-600 font-sans text-base leading-relaxed">
                {body}
              </p>
            </div>

            {/* NCA Trust Signal Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center space-x-3.5 bg-surface p-4 border border-slate-200 rounded-lg shadow-sm">
                <div className="text-accent shrink-0">
                  <Award size={32} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary tracking-wide">NCA6 Contractor</h4>
                  <p className="text-slate-500 font-sans text-xs font-medium">Reg No. 85321/B/0423</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 bg-surface p-4 border border-slate-200 rounded-lg shadow-sm">
                <div className="text-accent shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary tracking-wide">KRA Compliant</h4>
                  <p className="text-slate-500 font-sans text-xs font-medium">PIN: P051737046N</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
