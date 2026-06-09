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
  image?: string;
  details?: string[];
  processSteps?: string[];
  contracts?: string[];
}

export default function ServicesPage() {
  const services: ServiceDetail[] = [
    {
      id: "building",
      title: "Building Construction Works",
      icon: Building2,
      description: "Our comprehensive building works division handles everything from foundational stages of marking, excavation, and core concreting, moving into precision brick masonry and robust roof laying.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      details: ["Foundational marking & excavation", "Core concreting & brick masonry", "Robust roof laying", "Drywall & acoustic ceilings", "Floor panels & fitted carpets", "Professional painting & wallpapering", "Custom joinery & modern kitchen furniture", "Attic adaptations"]
    },
    {
      id: "roads",
      title: "Road Works & Civil Infrastructure",
      icon: Milestone,
      description: "We design and build large paved areas, highways, and durable access roads finished with robust asphalt surfacing and reinforced by heavy concrete retaining structures.",
      image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80",
      details: ["Bulk earthworks & site grading", "Piled foundations & deep soil stabilization", "Robust asphalt surfacing", "Concrete retaining structures", "Well pads & specialized access routes", "Equipped construction camps"]
    },
    {
      id: "electrical",
      title: "Electrical Works",
      icon: Zap,
      description: "Integrating safe, smart, and sustainable electrical distribution networks, from high/medium voltage power to structured building telecom cabling.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      details: ["High, medium & low voltage distribution", "Substation & transformer servicing", "Smart building automation", "Internal wiring & telecom cabling", "Solar PV & industrial generators", "Advanced fire detection & lighting"]
    },
    {
      id: "general",
      title: "General Contracting",
      icon: FileText,
      description: "We offer professional, client-centered general contracting services tailored to individual project needs.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      contracts: ["Negotiated Contracts", "Lump Sum Contracts", "Cost Reimbursement Contracts"]
    },
    {
      id: "epcm",
      title: "Project Management (EPCM)",
      icon: Briefcase,
      description: "Engineering, Procurement, Construction & Management services ensuring project execution fits budget and timeline goals.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
      processSteps: ["Engineering", "Procurement", "Planning", "Construction", "Commissioning"]
    },
    {
      id: "ppp",
      title: "Public Private Partnerships (PPP)",
      icon: Handshake,
      description: "Structuring project conceptualization, securing private/public finance, and managing operations for public infrastructure.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      processSteps: ["Project Conceptualization", "Financing Structure", "Presentation & Approvals", "Implementation", "Management & Operationalization"]
    },
    {
      id: "concrete",
      title: "Ready Mix Concrete & Bulk Cement",
      icon: Layers,
      description: "High-grade concrete batching plant capabilities to supply large-scale projects directly at site location.",
      image: "https://images.unsplash.com/photo-1504917595217-d4bf80504bb4?auto=format&fit=crop&w=1200&q=80",
      details: ["Concrete plant supply capability", "Bulk cement procurement & logistics", "On-site mixing & quality testing"]
    },
    {
      id: "realestate",
      title: "Real Estate Development",
      icon: Home,
      description: "Specialized in structured properties, residential joint ventures, and sustainable housing systems.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      details: ["Joint venture property development", "Residential estate mapping", "Asset management & sales support"]
    },
    {
      id: "jointventures",
      title: "Joint Ventures",
      icon: Users,
      description: "Partnering with global and local developers to finance, build, and deliver complex high-value civil projects.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
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

          <div className="flex flex-col gap-24">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
                >
                  {/* Pictorial Display */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] w-full bg-surface overflow-hidden group">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 bg-accent text-dark p-4">
                        <IconComponent size={32} />
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Breakdown */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-wide mb-4">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 font-sans text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-surface space-y-6">
                      {/* Standard details lists */}
                      {service.details && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-3">Service Scope Breakdown</span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-xs text-primary/80 font-sans font-medium">
                            {service.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-accent mt-1 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contract Types */}
                      {service.contracts && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-3">Available Contract Formats</span>
                          <div className="flex flex-wrap gap-2">
                            {service.contracts.map((c, cIdx) => (
                              <span key={cIdx} className="bg-surface text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-slate-200">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Process Flow Diagram */}
                      {service.processSteps && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-3">Project Execution Pathway</span>
                          <div className="flex flex-wrap items-center gap-2">
                            {service.processSteps.map((step, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                                  {step}
                                </div>
                                {sIdx < service.processSteps!.length - 1 && (
                                  <ArrowRight size={14} className="text-slate-400 shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6">
                      <a
                        href={`/contact?service=${service.id}`}
                        className="architectural-btn inline-flex items-center space-x-2 bg-accent text-dark font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 hover:bg-accent-mid transition-all"
                      >
                        <span>Inquire About Service</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
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
