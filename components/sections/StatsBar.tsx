'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionData } from '@/types/cms';

interface StatsBarProps {
  data: SectionData;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const totalDuration = 1500; // 1.5s
      const incrementTime = Math.max(Math.floor(totalDuration / end), 15);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {isInView ? `${count}${suffix}` : `0${suffix}`}
    </span>
  );
}

export default function StatsBar({ data }: StatsBarProps) {
  const items = data?.items || [
    { label: "Years in Operation", value: "8+", number: 8 },
    { label: "Projects Delivered", value: "150+", number: 150 },
    { label: "East African Countries", value: "3+", number: 3 },
    { label: "NCA Registered", value: "NCA6", number: 6 }
  ];

  return (
    <section className="bg-surface border-b border-slate-200 z-20 relative">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item: any, idx: number) => {
            const numVal = parseInt(item.value) || item.number || 0;
            const suffix = item.value.replace(/[0-9]/g, '') || '';
            const isNca = item.label.toLowerCase().includes('nca');

            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx} 
                className="bg-white rounded-sm shadow-sm border border-slate-100 p-8 sm:p-10 flex flex-col items-center justify-center space-y-4 hover:shadow-md hover:border-slate-200 transition-all duration-300"
              >
                <div className="font-serif text-3xl sm:text-3xl font-bold text-accent">
                  {isNca ? (
                    <span>{item.value}</span>
                  ) : (
                    <Counter value={numVal} suffix={suffix} />
                  )}
                </div>
                <div className="text-sm text-slate-500 font-medium text-center">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


