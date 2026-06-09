'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TestimonialData, SectionData } from '@/types/cms';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsProps {
  data: SectionData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const heading = data?.heading || "WHAT OUR CLIENTS SAY";
  const subheading = data?.subheading || "Hear from our partners about our project execution and delivery.";
  
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const q = query(collection(db, 'testimonials'), where('visible', '==', true));
        const snap = await getDocs(q);
        const list: TestimonialData[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as TestimonialData);
        });
        setTestimonials(list);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="bg-surface py-24 text-center text-slate-500 font-sans">
        Loading testimonials...
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="bg-surface text-primary py-24 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-surface to-surface pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-sm mb-6">
            <span className="text-xs font-semibold tracking-widest text-accent uppercase font-sans">
              {heading}
            </span>
          </div>
          <p className="text-slate-600 font-sans text-sm sm:text-base max-w-lg mx-auto">
            {subheading}
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative min-h-[300px] flex flex-col items-center justify-center bg-white border border-slate-200 rounded-sm p-8 sm:p-16 shadow-xl">
          <div className="text-accent/20 absolute top-8 left-8 pointer-events-none">
            <Quote size={80} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 max-w-2xl px-6 relative z-10"
            >
              <p className="font-serif text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-primary">
                "{current.quote}"
              </p>
              
              <div className="space-y-1">
                <h4 className="font-sans text-sm font-bold text-accent uppercase tracking-wider">
                  {current.clientName}
                </h4>
                <p className="font-sans text-xs text-slate-500 font-medium">
                  {current.clientTitle}, {current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center space-x-6 mt-12 relative z-10">
              <button
                onClick={handlePrev}
                className="bg-white hover:bg-accent hover:text-primary border border-slate-200 text-slate-500 p-3 rounded-sm transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs font-sans font-bold text-slate-500 tracking-widest bg-slate-100 px-4 py-1.5 rounded-sm">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="bg-white hover:bg-accent hover:text-primary border border-slate-200 text-slate-500 p-3 rounded-sm transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


