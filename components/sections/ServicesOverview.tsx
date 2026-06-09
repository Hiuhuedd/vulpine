'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionData } from '@/types/cms';

interface ServicesOverviewProps {
  data: SectionData;
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={40} strokeWidth={1} />;
}

export default function ServicesOverview({ data }: ServicesOverviewProps) {
  const heading = data?.heading || "OUR CORE COMPETENCIES";
  const subheading = data?.subheading || "We offer comprehensive construction, infrastructure, and management solutions across East Africa.";
  const items = data?.items && data.items.length > 0 ? data.items : [
    {
      id: "building",
      title: "Building Construction Works",
      description: "Foundational marking, core concreting, precision masonry, and comprehensive interior finishing.",
      icon: "Building2"
    },
    {
      id: "roads",
      title: "Road Works & Infrastructure",
      description: "Large paved areas, highways, bulk earthworks, and specialized access routes for heavy civil engineering.",
      icon: "Milestone"
    },
    {
      id: "electrical",
      title: "Electrical Works",
      description: "Safe, smart, and sustainable electrical distribution networks and high-voltage substation installations.",
      icon: "Zap"
    }
  ];

  return (
    <section className="bg-surface py-32 relative overflow-hidden border-b border-slate-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase mb-6 bg-primary text-white inline-block px-4 py-2">
              {heading}
            </span>
            <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl text-primary font-black tracking-tighter leading-[0.9]">
              INFRASTRUCTURE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-mid">& CONSTRUCTION</span>
            </h2>
          </div>
          <p className="text-slate-500 font-sans text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((service: any, index: number) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white overflow-hidden p-10 lg:p-12 border border-slate-100 transition-all duration-500 hover:shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-4 text-[10rem] font-black leading-none text-slate-50 transition-colors duration-500 group-hover:text-accent/10 select-none pointer-events-none">
                0{index + 1}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-16">
                  <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-2xl mb-8 transform group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-lg">
                    <DynamicIcon name={service.icon || 'Building2'} />
                  </div>
                  <h3 className="font-sans text-2xl lg:text-3xl font-black text-primary tracking-tighter mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 font-sans font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-8 border-t border-slate-100">
                  <Link
                    href={`/services#${service.id || ''}`}
                    className="flex items-center justify-between text-primary font-sans text-[11px] font-black tracking-widest uppercase group/link"
                  >
                    <span>Explore Division</span>
                    <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center group-hover/link:bg-accent group-hover/link:border-accent group-hover/link:text-primary transition-all duration-300">
                      <Icons.ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
