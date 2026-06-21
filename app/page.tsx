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
  const { sections } = useAllSections();

  return (
    <div className="flex flex-col w-full -mt-24">
      {/* Hero Section */}
      {sections.hero?.visible !== false && sections.hero && <HeroSection data={sections.hero} />}

      {/* Stats Bar */}
      {sections.stats?.visible !== false && sections.stats && <StatsBar data={sections.stats} />}

      {/* Services Overview */}
      {sections.services?.visible !== false && sections.services && <ServicesOverview data={sections.services} />}

      {/* Why Choose Us */}
      {sections.strengths?.visible !== false && sections.strengths && <WhyChooseUs data={sections.strengths} />}

      {/* Featured Projects */}
      {sections.projects?.visible !== false && <FeaturedProjects />}

      {/* About Teaser */}
      {sections.about?.visible !== false && sections.about && <AboutTeaser data={sections.about} />}

      {/* Testimonials */}
      {sections.testimonials?.visible !== false && sections.testimonials && <Testimonials data={sections.testimonials} />}

      {/* Clients Logos */}
      {sections.clients?.visible !== false && sections.clients && <Clients data={sections.clients} />}

      {/* Call to Action Banner */}
      {sections.cta?.visible !== false && sections.cta && <CtaBanner data={sections.cta} />}
    </div>
  );
}
