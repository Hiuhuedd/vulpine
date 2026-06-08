'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Sparkles, ShieldCheck, Award, 
  Clock, HeartHandshake, Eye, ShieldAlert, CheckSquare
} from 'lucide-react';
import { SectionData } from '@/types/cms';

interface WhyChooseUsProps {
  data: SectionData;
}

// Strengths icons mapper
const strengthIcons: { [key: string]: React.ComponentType<any> } = {
  "committed management": Users,
  "innovation": Sparkles,
  "innovation & technology": Sparkles,
  "integrity": ShieldCheck,
  "integrity first": ShieldCheck,
  "quality adherence": Award,
  "time-bound delivery": Clock,
  "client-centric collaboration": HeartHandshake,
  "safety & health policy": ShieldAlert,
  "value for money": CheckSquare
};

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const heading = data?.heading || "WHY CHOOSE US";
  const subheading = data?.subheading || "Pillars of strength that enable Vulpine to stand out as a reliable construction partner.";
  const items = data?.items || [];

  return (
    <section className="bg-light-green text-primary py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Header */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <div className="inline-block bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-full mb-6">
              <span className="text-xs font-semibold tracking-widest text-accent uppercase font-sans">
                {heading}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-primary">
              Our Pillars of Strength
            </h2>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed mb-8">
              {subheading}
            </p>
          </div>

          {/* Right Column: Bento Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((strength: any, index: number) => {
                const labelLower = strength.title.toLowerCase();
                const Icon = strengthIcons[labelLower] || CheckSquare;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-surface border border-slate-200 p-8 rounded-3xl hover:shadow-lg hover:border-slate-300 hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-accent flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-tight text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                      {strength.title}
                    </h3>
                    <p className="text-slate-600 font-sans text-sm leading-relaxed">
                      {strength.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
