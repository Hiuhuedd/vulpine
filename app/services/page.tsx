'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useSection } from '@/hooks/useSection';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';

interface ServiceDetail {
  id: string;
  title: string;
  icon: any;
  description: string;
  image?: string;
  details?: string[];
  processSteps?: string[];
  contracts?: string[];
}

export default function ServicesPage() {
  const { section: servicesData, loading } = useSection('services');

  const fallbackServices: ServiceDetail[] = [
    {
      id: "electrical",
      title: "Electrical Works",
      icon: Icons.Zap,
      description: "We handle foundational electrical infrastructure, advanced solar power systems, and high-security fencing with a strict focus on safety and international engineering standards. Our team designs and installs high-performance systems for residential, commercial, and industrial facilities.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      details: [
        "High-voltage & low-voltage wiring for facilities",
        "Power Distribution & main switchboards",
        "Automated Backup Generators & UPS integration",
        "Hybrid solar systems with battery storage",
        "Advanced Electric Fencing & wildlife security",
        "Smart security alarm systems & monitoring",
        "Safety Inspections, grounding & surge protection",
        "Energy Audits to identify power wastage"
      ]
    },
    {
      id: "building",
      title: "Building Works",
      icon: Icons.Building2,
      description: "Our comprehensive building works division handles everything from foundational stages of marking, excavation, and core concreting, moving into precision brick masonry and robust roof laying.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      details: ["Foundational marking & excavation", "Core concreting & brick masonry", "Robust roof laying", "Drywall & acoustic ceilings", "Floor panels & fitted carpets", "Professional painting & wallpapering", "Custom joinery & modern kitchen furniture", "Attic adaptations"]
    },
    {
      id: "roads",
      title: "Road Works",
      icon: Icons.Milestone,
      description: "We design and build large paved areas, highways, and durable access roads finished with robust asphalt surfacing and reinforced by heavy concrete retaining structures.",
      image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80",
      details: ["Bulk earthworks & site grading", "Piled foundations & deep soil stabilization", "Robust asphalt surfacing", "Concrete retaining structures", "Well pads & specialized access routes", "Equipped construction camps"]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-light-green flex flex-col items-center justify-center text-primary font-sans">
        <div className="relative w-12 h-12 flex items-center justify-center border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
        <span className="text-sm font-medium tracking-wide text-primary/60">Loading Services...</span>
      </div>
    );
  }

  const heading = servicesData?.heading || "OUR CORE COMPETENCIES";
  const subheading = servicesData?.subheading || "We provide full-spectrum engineering, procurement, construction, and development services. We place a primary emphasis on building works, civil infrastructure, road works, and electrical installations tailored for residential, commercial, and industrial environments.";

  const services: ServiceDetail[] = servicesData?.items && servicesData.items.length > 0
    ? servicesData.items.map((item: any) => ({
      id: item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: item.title,
      icon: item.icon,
      description: item.description,
      image: item.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
      details: item.details || (
        (item.id === 'electrical' || item.title.toLowerCase().includes('electrical')) ? [
          "High-voltage & low-voltage wiring for facilities",
          "Power Distribution & main switchboards",
          "Automated Backup Generators & UPS integration",
          "Hybrid solar systems with battery storage",
          "Advanced Electric Fencing & wildlife security",
          "Smart security alarm systems & monitoring",
          "Safety Inspections, grounding & surge protection",
          "Energy Audits to identify power wastage"
        ] :
          (item.id === 'building' || item.title.toLowerCase().includes('building') || item.title.toLowerCase().includes('fencing') || item.title.toLowerCase().includes('construction')) ? [
            "Foundational marking & excavation",
            "Core concreting & brick masonry",
            "Robust roof laying",
            "Drywall & acoustic ceilings",
            "Floor panels & fitted carpets",
            "Professional painting & wallpapering",
            "Custom joinery & modern kitchen furniture",
            "Attic adaptations"
          ] :
            (item.id === 'roads' || item.title.toLowerCase().includes('road') || item.title.toLowerCase().includes('water') || item.title.toLowerCase().includes('infrastructure')) ? [
              "Bulk earthworks & site grading",
              "Piled foundations & deep soil stabilization",
              "Robust asphalt surfacing",
              "Concrete retaining structures",
              "Well pads & specialized access routes",
              "Equipped construction camps"
            ] : [
              "Full lifecycle engineering design & execution",
              "Regulatory compliance & permitting approvals",
              "Site construction supervisor supervision",
              "Quality assurance & control verification"
            ]
      ),
      processSteps: item.processSteps || (
        (item.id === 'electrical' || item.title.toLowerCase().includes('electrical')) ? ['Consultation', 'Engineering & Design', 'Installation & Testing', 'Support'] :
          (item.id === 'building' || item.title.toLowerCase().includes('building') || item.title.toLowerCase().includes('construction') || item.title.toLowerCase().includes('fencing')) ? ['Excavation', 'Foundation', 'Masonry', 'Finishing'] :
            (item.id === 'roads' || item.title.toLowerCase().includes('road') || item.title.toLowerCase().includes('water') || item.title.toLowerCase().includes('infrastructure')) ? ['Site Grading', 'Base Stabilization', 'Asphalt Laying', 'Handover'] :
              ['Planning', 'Procurement', 'Execution', 'Handover']
      ),
      contracts: item.contracts || ['Fixed Price', 'Design-Build', 'Unit Price']
    }))
    : fallbackServices;

  return (
    <div className="flex flex-col w-full">
      <PageHero
        pageId="services"
        heading="Our Services"
        fallbackImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Services List */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">{heading}</span>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-slate-600 font-sans text-base sm:text-lg">
              {subheading}
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {services.map((service, idx) => {
              const IconComponent = typeof service.icon === 'string'
                ? ((Icons as any)[service.icon] || Icons.HelpCircle)
                : service.icon;
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
