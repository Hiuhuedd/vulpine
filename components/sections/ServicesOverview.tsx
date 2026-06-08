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
      id: "water",
      title: "Water & Infrastructure",
      description: "Clean water supply, municipal pipelines, and large-scale sanitation projects providing sustainable resilience.",
      icon: "Droplet"
    },
    {
      id: "electrical",
      title: "Electrical Works",
      description: "Professional high-voltage installations, smart grid integrations, and enterprise-grade electrical maintenance.",
      icon: "Zap"
    },
    {
      id: "building",
      title: "Building & Civil Works",
      description: "Residential, commercial, and institutional structures built to uncompromised engineering standards.",
      icon: "Building2"
    }
  ];

  return (
    <section className="bg-light-green py-32 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-24 max-w-4xl border-l-4 border-accent pl-8">
          <span className="text-sm font-semibold tracking-widest text-accent uppercase block mb-6 font-sans">
            {heading}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold tracking-tight mb-8">
            WATER <span className="text-slate-400">&</span> ELECTRICAL INFRASTRUCTURE
          </h2>
          <p className="text-slate-600 font-sans text-lg max-w-2xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service: any, index: number) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface rounded-xl p-10 border border-slate-200 flex flex-col justify-between h-full hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div className="text-slate-400 group-hover:text-accent transition-colors duration-300">
                    <DynamicIcon name={service.icon || 'Building2'} />
                  </div>
                  <span className="text-slate-300 font-sans text-xl font-bold">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl text-primary font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-slate-600 font-sans text-base leading-relaxed mb-10">
                  {service.description}
                </p>
              </div>
              
              <Link
                href={`/services#${service.id || ''}`}
                className="inline-flex items-center space-x-2 text-accent font-sans text-sm font-semibold tracking-wide transition-colors duration-300"
              >
                <span>Learn More</span>
                <Icons.ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
