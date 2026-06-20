'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Handshake, HelpCircle, TrendingUp, CheckCircle, Quote, ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';

export default function PPPPage() {
  const reasons = [
    { title: "Accelerated Delivery", desc: "Allows critical infrastructure projects to be delivered on time by bypassing traditional public budgetary limitations." },
    { title: "Optimal Risk Allocation", desc: "Distributes project risks between the public agency and private developer where each party is best suited to manage it." },
    { title: "Enhanced Quality & Innovation", desc: "Leverages private sector design efficiencies, technical innovations, and operational methods." },
    { title: "Lifecycle Cost Efficiencies", desc: "Combines construction and long-term maintenance into a single contract to optimize total cost models." },
    { title: "Private Capital Mobilization", desc: "Unlocks global and domestic financing resources, reducing direct national debt burdens." }
  ];

  const steps = [
    { step: "01", name: "Project Conceptualization", desc: "Identifying viable public needs and mapping technical and commercial structures." },
    { step: "02", name: "Financing & Consortia", desc: "Arranging equity, debt, and building strategic consortium joint ventures." },
    { step: "03", name: "Presentation & Approvals", desc: "Guiding the project proposal through regulatory committees and public approvals." },
    { step: "04", name: "EPC Construction", desc: "Managing engineering design, material procurement, and physical construction." },
    { step: "05", name: "Operationalization", desc: "Handover, long-term asset management, and scheduled maintenance operations." }
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHero
        pageId="ppp"
        heading="Public Private Partnerships"
        fallbackImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
      />

      {/* 1. What is PPP */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-primary mx-auto w-12 h-12 flex items-center justify-center bg-surface border border-accent/20">
            <Handshake size={28} />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block">COLLABORATIVE INFRASTRUCTURE</span>
          <h2 className="font-serif text-3xl font-bold text-primary tracking-wide">What is PPP?</h2>
          <p className="text-slate-600 font-sans text-base leading-relaxed">
            Public-Private Partnerships (PPP) represent a long-term contractual agreement between a government agency and a private sector developer like Vulpine Limited. This model enables the development, financing, and maintenance of public assets—such as roads, water systems, and hospitals—without overwhelming public budgets, shifting project risks to private operational expertise.
          </p>
        </div>
      </section>

      {/* 2. SGR Highlight */}
      <section className="bg-primary text-primary py-16 relative overflow-hidden border-y border-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(164,206,49,0.05),transparent)]" />
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="text-accent/30 mx-auto w-12 h-12"><Quote size={40} /></div>
          <blockquote className="font-serif text-xl sm:text-2xl font-bold italic leading-relaxed text-white">
            "We are proud to be associated with the development of the Standard Gauge Railway."
          </blockquote>
          <p className="text-white/60 font-sans text-xs uppercase tracking-widest font-semibold">
            National Infrastructure support — Vulpine Limited
          </p>
        </div>
      </section>

      {/* 3. Why PPP is the Next Business Frontier */}
      <section className="bg-surface/20 py-20 border-b border-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">THE STRATEGIC OUTLOOK</span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">The Next Business Frontier</h2>
            <p className="text-slate-500 font-sans text-xs mt-2">Five reasons why Public Private Partnerships are shaping infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, idx) => (
              <div key={idx} className="bg-white border border-surface p-6 space-y-4 architectural-card">
                <div className="text-primary"><TrendingUp size={24} /></div>
                <h4 className="font-serif text-base font-bold text-primary tracking-wide">{r.title}</h4>
                <p className="text-slate-600 font-sans text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How Vulpine Helps (Process Steps) */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">OUR VALUE ADDITION</span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">How Vulpine Facilitates PPP</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {steps.map((s, idx) => (
              <div key={idx} className="flex items-start space-x-6 p-6 bg-surface/20 border border-surface architectural-card">
                <div className="font-serif text-3xl font-bold text-accent shrink-0 leading-none">{s.step}</div>
                <div className="space-y-2">
                  <h4 className="font-serif text-base font-bold text-primary tracking-wide">{s.name}</h4>
                  <p className="text-slate-600 font-sans text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="bg-surface text-primary py-20 text-center border-t border-accent/20">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <h2 className="font-serif text-3xl font-bold tracking-wide">Interested in PPP Partnerships?</h2>
          <p className="text-primary/60 font-sans text-sm max-w-xl mx-auto leading-relaxed">
            Collaborate with Vulpine Limited to structure, finance, and execute modern public infrastructure works.
          </p>
          <div className="pt-2">
            <Link
              href="/contact?type=ppp"
              className="architectural-btn inline-block bg-accent text-primary font-sans text-sm font-bold tracking-wider uppercase px-8 py-3.5 hover:bg-accent-mid transition-all"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
