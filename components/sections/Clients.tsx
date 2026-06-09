'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionData } from '@/types/cms';
import { 
  Building, Landmark, Briefcase, Globe, HelpCircle 
} from 'lucide-react';

interface ClientsProps {
  data: SectionData;
}

const clientIcons: { [key: string]: React.ComponentType<any> } = {
  "governments": Landmark,
  "ngos": Globe,
  "financial institutions": Landmark,
  "county governments": Building,
  "parastatals": Briefcase,
  "international corporations": Globe,
  "real estate developers": Building
};

export default function Clients({ data }: ClientsProps) {
  const heading = data?.heading || "OUR CLIENT SECTORS & PARTNERS";
  const subheading = data?.subheading || "We collaborate with diverse institutions to shape the built environment.";
  const items = data?.items || [];

  return (
    <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-sm mb-4">
            <span className="text-xs font-semibold tracking-widest text-accent uppercase font-sans">
              {heading}
            </span>
          </div>
          <p className="text-slate-600 font-sans text-sm sm:text-base">
            {subheading}
          </p>
        </div>

        {/* Categories Row - Pill style layout */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {items.map((name: string, index: number) => {
            const Icon = clientIcons[name.toLowerCase()] || HelpCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 px-6 py-4 rounded-sm flex items-center space-x-3 group transition-all duration-300 cursor-default"
              >
                <div className="w-8 h-8 rounded-sm bg-slate-100 text-slate-400 group-hover:bg-accent group-hover:text-primary flex items-center justify-center transition-colors duration-300">
                  <Icon size={16} />
                </div>
                <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wide text-slate-700 group-hover:text-primary transition-colors duration-300">
                  {name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


