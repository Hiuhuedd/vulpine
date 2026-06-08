'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';

export default function FloatingChat() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 15, 
        delay: 1 // Delay slightly so it slides in after the main content
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a 
        href="https://wa.me/254720999925"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center space-x-3 bg-accent hover:bg-white text-primary hover:text-primary px-6 py-4 border border-transparent hover:border-slate-200 shadow-2xl transition-colors duration-300 rounded-none cursor-pointer"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] hidden sm:block">
          WhatsApp Us
        </span>
        <MessageSquareText size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
      </a>
    </motion.div>
  );
}
