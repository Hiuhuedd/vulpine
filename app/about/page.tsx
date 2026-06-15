'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSection } from '@/hooks/useSection';
import { Shield, Target, Eye, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { section: aboutData, loading } = useSection('about');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        Loading About Vulpine...
      </div>
    );
  }

  const ceoLetter = aboutData?.ceoQuote || "Our journey to where we are today has been marked with many hurdles and challenges... Our hard work, determination and unbowed resolve to always deliver quality and on time, has been rewarded in more ways than we could imagine.";
  const vision = "To be the most admired & sought after building & Civil Contractor in Africa and beyond.";
  const mission = "To undertake construction projects, in a very professional manner while maintaining the highest quality standards bearing in mind the factors of completing projects on time, ensuring that clients have value for money and laws governing construction industry as stipulated by Government bodies are adhered to.";

  const pillars = [
    { num: "01", title: "Operational Excellence", text: "Maintain world-class quality standards and zero-accident site records." },
    { num: "02", title: "Regional Footprint", text: "Expand active projects and offices across all East African countries." },
    { num: "03", title: "PPP Development", text: "Structure and finance Public-Private Partnerships for infrastructure development." },
    { num: "04", title: "Joint Venture Collaborations", text: "Forge strategic partnerships to handle multi-billion Shilling infrastructure projects." }
  ];

  const cultureBubbles = [
    "Well-developed technical ventures",
    "Deep understanding of construction",
    "Demonstrable experience",
    "Collaborative ventures",
    "Ability to arrange finance"
  ];

  const certifications = [
    { title: "Certificate of Incorporation", ref: "PVT-3QUAJMR", date: "20 October 2018" },
    { title: "NCA Registration", ref: "85321/B/0423", detail: "NCA6 - Building Works Contractor" },
    { title: "KRA PIN Certificate", ref: "P051737046N", detail: "Tax Compliant Status" },
    { title: "KRA PIN Certificate", ref: "P051737046N", detail: "Approved Tax Payer" }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Banner */}
      <section
        className="relative py-24 bg-surface bg-cover bg-center text-primary text-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80')`, height: '320px' }}
      >
        <div className="absolute inset-0 bg-surface/75" />
        <div className="relative z-10 max-w-4xl px-4">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">VULPINE LIMITED</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">Who We Are</h1>
        </div>
      </section>

      {/* 2. CEO Note & Letter */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-48 h-56 bg-surface/50 border border-surface flex items-center justify-center text-primary relative">
                <span className="font-serif text-sm italic font-bold">Photo Placeholder</span>
                {/* 1px sharp architectural border details */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent" />
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Managing Director</p>
            </div>
            <div className="md:col-span-8 space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block">Executive Note</span>
              <div className="w-12 h-0.5 bg-accent mb-6" />
              <h2 className="font-serif text-2xl sm:text-3xl text-primary font-bold italic leading-relaxed">
                "{ceoLetter}"
              </h2>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                We believe that building sustainable environments requires absolute integrity and technical precision. Vulpine was founded to serve as a catalyst for infrastructure development in East Africa, delivering value for money and technical excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Overview & Badges */}
      <section className="bg-surface/20 py-20 border-y border-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Corporate Profile</span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">Company Overview</h2>
            <p className="text-slate-600 font-sans text-base leading-relaxed">
              Vulpine Limited is a premier construction firm incorporated in Nairobi, Kenya on October 20, 2018. Over the years, we have scaled our services to meet the growing need for robust road networks, modern public buildings, and large-scale water and electrical distribution networks. Licensed by the National Construction Authority (NCA), we operate under category NCA6, enabling us to handle major building contracting.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Vision & Mission Cards */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="architectural-card bg-surface/30 p-8 border border-surface flex flex-col items-start space-y-4">
              <div className="text-primary"><Eye size={36} /></div>
              <h3 className="font-serif text-2xl font-bold tracking-wide text-primary">Our Vision</h3>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">{vision}</p>
            </div>

            <div className="architectural-card bg-surface/30 p-8 border border-surface flex flex-col items-start space-y-4">
              <div className="text-primary"><Target size={36} /></div>
              <h3 className="font-serif text-2xl font-bold tracking-wide text-primary">Our Mission</h3>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Policy Statements & Safety */}
      <section className="bg-surface text-primary py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Operational Policy</span>
              <h3 className="font-serif text-xl font-bold text-primary tracking-wide">Operation Policy</h3>
              <p className="text-primary/60 font-sans text-sm leading-relaxed">
                Vulpine is committed to delivering projects that respect environmental frameworks, comply fully with governing construction legislation, and support local community empowerment through local hiring and material sourcing.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Health & Environmental Safety</span>
              <h3 className="font-serif text-xl font-bold text-primary tracking-wide">Safety, Health & Environmental Policy</h3>
              <p className="text-primary/60 font-sans text-sm leading-relaxed">
                Our primary commitment is a zero-accident site policy. We ensure that all workers wear personal protective equipment (PPE), sites undergo regular risk assessments, and environmental impact audits are consistently integrated before launching.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200/10 pt-10 space-y-4">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">Company Culture</span>
            <h3 className="font-serif text-xl font-bold text-primary tracking-wide">Integrity Statement</h3>
            <p className="text-primary/70 font-serif text-lg italic max-w-3xl">
              "We are honest, open, ethical, fair and genuine. People trust us to adhere to our word."
            </p>
          </div>
        </div>
      </section>

      {/* 6. Long Term Vision Pillars */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">OUR STRATEGIC PLAN</span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">Long Term Vision</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div key={idx} className="architectural-card bg-surface/20 border border-surface p-6 space-y-4 relative">
                <div className="font-serif text-4xl font-bold text-accent">{p.num}</div>
                <h4 className="font-serif text-base font-bold text-primary tracking-wide">{p.title}</h4>
                <p className="text-slate-600 font-sans text-xs leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Organizational Culture (5 bubbles) */}
      <section className="bg-surface/20 py-20 border-t border-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">OUR CAPABILITIES</span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">Organizational Culture</h2>
            <p className="text-slate-500 font-sans text-xs">Value-added pillars defining Vulpine's approach to complex challenges.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {cultureBubbles.map((bubble, idx) => (
              <div
                key={idx}
                className="bg-white border border-surface text-primary font-sans text-xs font-bold uppercase tracking-wider px-6 py-4 shadow-sm hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {bubble}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Certifications Strip */}

    </div>
  );
}
