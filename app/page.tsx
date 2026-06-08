'use client';

import React from 'react';
import { useAllSections } from '@/components/providers/SectionsProvider';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import ServicesOverview from '@/components/sections/ServicesOverview';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import AboutTeaser from '@/components/sections/AboutTeaser';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Testimonials from '@/components/sections/Testimonials';
import Clients from '@/components/sections/Clients';
import CtaBanner from '@/components/sections/CtaBanner';

export default function Home() {
  const { sections, loading } = useAllSections();

  if (loading) {
    return (
      <div className="min-h-screen bg-light-green flex flex-col items-center justify-center text-primary font-sans">
        <div className="relative w-12 h-12 flex items-center justify-center border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4">
          {/* Spinner changed to standard rounded instead of geometric brutalist */}
        </div>
        <span className="text-sm font-medium tracking-wide text-primary/60">Loading Vulpine Limited...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full -mt-24">
      {/* Hero Section */}
      {sections.hero?.visible && <HeroSection data={sections.hero} />}

      {/* Stats Bar */}
      {sections.stats?.visible && <StatsBar data={sections.stats} />}

      {/* Services Overview */}
      {sections.services?.visible && <ServicesOverview data={sections.services} />}

      {/* Why Choose Us */}
      {sections.strengths?.visible && <WhyChooseUs data={sections.strengths} />}

      {/* Featured Projects */}
      {sections.projects?.visible !== false && <FeaturedProjects />}

      {/* About Teaser */}
      {sections.about?.visible && <AboutTeaser data={sections.about} />}

      {/* Testimonials */}
      {sections.testimonials?.visible && <Testimonials data={sections.testimonials} />}

      {/* Clients Logos */}
      {sections.clients?.visible && <Clients data={sections.clients} />}

      {/* Call to Action Banner */}
      {sections.cta?.visible && <CtaBanner data={sections.cta} />}
    </div>
  );
}
