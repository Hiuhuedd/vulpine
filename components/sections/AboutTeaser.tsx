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
  const body = data?.body || "Vulpine Limited is an NCA6 certified engineering firm incorporated on 20 Oct 2018. Over the years, we have built a profound reputation for executing advanced electrical works, high-voltage electric fencing for wildlife and property security, custom solar setups, and building construction, delivering high-value solutions that power and sustain communities.";
  const ceoQuote = data?.ceoQuote || "Our journey to where we are today has been marked with many hurdles and challenges... Our hard work, determination and unbowed resolve to always deliver quality and on time, has been rewarded in more ways than we could imagine.";

  return (
    <section className="bg-white py-32 relative overflow-hidden border-t border-slate-100">
      <div className="absolute top-0 right-0 w-full lg:w-1/3 h-full bg-surface" />
      
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Main Typography Block */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-8 bg-primary text-accent inline-block px-4 py-2">
                {heading}
              </span>
              <h2 className="font-sans text-3xl sm:text-3xl lg:text-3xl font-bold text-primary tracking-tighter leading-[0.9]">
                ARCHITECTING <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-mid">PROGRESS</span> <br/>
                ACROSS EAST AFRICA
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-12 max-w-xl"
            >
              <p className="text-slate-500 font-sans text-lg lg:text-xl font-medium leading-relaxed">
                {body}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-sans font-bold text-2xl text-primary tracking-tighter">NCA6</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Reg No. 85321/B/0423</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="font-sans font-bold text-2xl text-primary tracking-tighter">KRA</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">PIN: P051737046N</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CEO Pull Quote Block */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-primary p-10 sm:p-14 relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent rounded-bl-[100px]" />
              
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent/80 uppercase block mb-8">
                MD'S MESSAGE
              </span>
              
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-3xl text-white font-medium italic leading-snug">
                "{ceoQuote}"
              </blockquote>
              
              <div className="mt-10 pt-10 border-t border-white/20 flex items-center justify-between">
                <div>
                  <cite className="block font-sans text-sm font-bold text-white uppercase tracking-widest not-italic">
                    Wilson Baru Wachira
                  </cite>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1 block">Managing Director</span>
                </div>
                <Award size={48} strokeWidth={1} className="text-accent opacity-50" />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


