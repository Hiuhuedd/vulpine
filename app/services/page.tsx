'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Milestone, Droplet, Zap, Briefcase,
  Handshake, FileText, Construction, Layers, Home,
  Users, ArrowRight, ArrowUpRight
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  details?: string[];
  processSteps?: string[];
  contracts?: string[];
}

export default function ServicesPage() {
  const services: ServiceDetail[] = [
    {
      id: "water",
      title: "Water & Infrastructure (Core Specialty)",
      icon: Droplet,
      description: "Our premier division specializing in comprehensive clean water supply, wastewater management, and large-scale sanitation projects designed to provide sustainable and resilient water access across the region.",
      details: ["Advanced Sanitation infrastructure", "High-capacity pipeline routing & connection", "Municipal water supply networks", "Deep borehole & massive storage setup", "Water purification systems"]
    },
    {
      id: "electrical",
      title: "Electrical Works (Core Specialty)",
      icon: Zap,
      description: "A flagship engineering department providing professional high-voltage and low-voltage installations, smart grid integrations, and enterprise-grade electrical maintenance.",
      details: ["Power grid infrastructure & distribution", "Industrial and commercial cabling", "Substation installations & upgrades", "24/7 maintenance & support services", "Renewable energy integrations"]
    },
    {
      id: "general",
      title: "General Contracting",
      icon: FileText,
      description: "We offer professional, client-centered general contracting services tailored to individual project needs.",
      contracts: ["Negotiated Contracts", "Lump Sum Contracts", "Cost Reimbursement Contracts"]
    },
    {
      id: "roads",
      title: "Road Construction Works",
      icon: Milestone,
      description: "Complete road infrastructure development from excavation and base preparation to final asphalt paving.",
      details: ["Earthworks & excavation", "Road paving (asphalt & concrete)", "Drainage systems", "Subsurface pipe-laying"]
    },
    {
      id: "building",
      title: "Building Works",
      icon: Building2,
      description: "Residential, commercial, and institutional structure construction. Our signature work includes reference healthcare systems.",
      details: ["Residential complexes", "Commercial towers", "Institutional offices", "Nyahururu County Referral Hospital Outpatient Block reference"]
    },
    {
      id: "epcm",
      title: "Project Management (EPCM)",
      icon: Briefcase,
      description: "Engineering, Procurement, Construction & Management services ensuring project execution fits budget and timeline goals.",
      processSteps: ["Engineering", "Procurement", "Planning", "Construction", "Commissioning"]
    },
    {
      id: "ppp",
      title: "Public Private Partnerships (PPP)",
      icon: Handshake,
      description: "Structuring project conceptualization, securing private/public finance, and managing operations for public infrastructure.",
      processSteps: ["Project Conceptualization", "Financing Structure", "Presentation & Approvals", "Implementation", "Management & Operationalization"]
    },
    {
      id: "concrete",
      title: "Ready Mix Concrete & Bulk Cement",
      icon: Layers,
      description: "High-grade concrete batching plant capabilities to supply large-scale projects directly at site location.",
      details: ["Concrete plant supply capability", "Bulk cement procurement & logistics", "On-site mixing & quality testing"]
    },
    {
      id: "realestate",
      title: "Real Estate Development",
      icon: Home,
      description: "Specialized in structured properties, residential joint ventures, and sustainable housing systems.",
      details: ["Joint venture property development", "Residential estate mapping", "Asset management & sales support"]
    },
    {
      id: "jointventures",
      title: "Joint Ventures",
      icon: Users,
      description: "Partnering with global and local developers to finance, build, and deliver complex high-value civil projects.",
      details: ["Consortium styling", "Financial asset packaging", "Shared risk & resource allocation"]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section
        className="relative py-24 bg-surface bg-cover bg-center text-primary text-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80')`, height: '320px' }}
      >
        <div className="absolute inset-0 bg-surface/75" />
        <div className="relative z-10 max-w-4xl px-4">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">VULPINE LIMITED</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">Our Services</h1>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">WHAT WE DO</span>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-slate-600 font-sans text-base sm:text-lg">
              We provide full-spectrum engineering, procurement, construction, and development services under strict compliance with Kenyan and East African regulatory authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-surface/20 border border-surface p-8 relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 group hover:border-accent/50 transition-all duration-300"
                >
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center space-x-3.5">
                      <div className="bg-primary text-accent p-3 border border-accent/20">
                        <IconComponent size={24} />
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary tracking-wide">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-primary/75 font-sans text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    {/* Standard details lists */}
                    {service.details && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-sans mt-4">
                        {service.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Contract Types */}
                    {service.contracts && (
                      <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-2">Available Contract Formats</span>
                        <div className="flex flex-wrap gap-2">
                          {service.contracts.map((c, cIdx) => (
                            <span key={cIdx} className="bg-white border border-surface text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Process Flow Diagram */}
                    {service.processSteps && (
                      <div className="pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-3">Project Execution Pathway</span>
                        <div className="flex flex-wrap items-center gap-2">
                          {service.processSteps.map((step, sIdx) => (
                            <React.Fragment key={sIdx}>
                              <div className="bg-white border border-accent/30 text-primary text-[11px] font-bold uppercase tracking-wider px-3.5 py-2">
                                {step}
                              </div>
                              {sIdx < service.processSteps!.length - 1 && (
                                <ArrowRight size={14} className="text-primary shrink-0" />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lg:self-end">
                    <a
                      href={`/contact?service=${service.id}`}
                      className="architectural-btn inline-flex items-center space-x-2 bg-primary text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-3 border border-primary hover:bg-transparent hover:text-primary transition-colors"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
