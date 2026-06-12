'use client';

import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SeedPage() {
  const [status, setStatus] = useState<string>('Idle');
  const [loading, setLoading] = useState<boolean>(false);

  const runSeed = async () => {
    setLoading(true);
    setStatus('Seeding started...');
    try {
      // 1. Branding Settings
      setStatus('Writing branding settings...');
      await setDoc(doc(db, 'settings', 'branding'), {
        primary: '#004E3F',
        accent: '#A4CE31',
        accentMid: '#ACCE54',
        lightGreen: '#D1E59C',
        surface: '#E0E8D8',
        teal: '#4F8280',
        white: '#FFFFFF',
        dark: '#0D1A12'
      });

      // 2. Sections
      setStatus('Writing sections...');
      const sections = {
        hero: {
          visible: true,
          heading: "Building East Africa's Future, One Project at a Time",
          subheading: "Specialists in Electrical Systems, Security Fencing, Solar Solutions & Civil Infrastructure",
          body: "Delivering advanced electrical installations, intelligent perimeter security, sustainable solar energy, and general civil construction across East Africa with uncompromising integrity.",
          ctaLabel: "View Our Projects",
          ctaLink: "/projects",
          images: [
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"
          ]
        },
        stats: {
          visible: true,
          items: [
            { label: "Years in Operation", value: "8+", number: 8 },
            { label: "Projects Delivered", value: "150+", number: 150 },
            { label: "East African Countries", value: "3+", number: 3 },
            { label: "NCA Registered Category", value: "NCA6", number: 6 }
          ]
        },
        services: {
          visible: true,
          heading: "OUR CORE COMPETENCIES",
          subheading: "We offer comprehensive electrical infrastructure, electric fencing, solar energy, and general construction solutions across East Africa.",
          items: [
            { id: "electrical", title: "Electrical, Solar & Fencing", description: "Advanced electric fencing, robust solar systems, and core electrical infrastructure built to safety standards.", icon: "Zap" },
            { id: "building", title: "Building Works", description: "High-quality residential, commercial, and institutional projects delivered to standards.", icon: "Building2" },
            { id: "roads", title: "Road Construction Works", description: "Excavation, earthworks, paving, drainage systems, and professional pipe-laying.", icon: "Milestone" }
          ]
        },
        strengths: {
          visible: true,
          heading: "WHY CHOOSE US",
          subheading: "Pillars of strength that enable Vulpine to stand out as a reliable construction partner.",
          items: [
            { title: "Committed Management", description: "A leadership team dedicated to project success and transparency." },
            { title: "Innovation & Technology", description: "Adopting modern methods to optimize cost and time efficiency." },
            { title: "Integrity First", description: "We are honest, open, ethical, fair, and genuine. People trust our word." },
            { title: "Quality Adherence", "description": "Strict quality control matching NCA and international regulations." },
            { title: "Time-Bound Delivery", "description": "Honoring project deadlines with rigorous scheduling and tracking." },
            { title: "Client-Centric Collaboration", "description": "Aligning design, materials, and execution with client aspirations." },
            { title: "Safety & Health Policy", "description": "Deep commitment to the safety of our site crews, staff, and environment." },
            { title: "Value for Money", "description": "Optimized cost models without compromising building integrity." }
          ]
        },
        about: {
          visible: true,
          heading: "WHO WE ARE",
          subheading: "Registered building & civil contractor operating across East Africa.",
          body: "Vulpine Limited is an NCA6 certified construction firm incorporated on 20 Oct 2018. Over the years, we have built a reputation for professionalism, adherence to quality regulations, and delivering high value for money to public and private sector clients alike.",
          items: [
            { title: "Vision", content: "To be the most admired & sought after building & Civil Contractor in Africa and beyond." },
            { title: "Mission", content: "To undertake construction projects, in a very professional manner while maintaining the highest quality standards bearing in mind the factors of completing projects on time, ensuring that clients have value for money and laws governing construction industry as stipulated by Government bodies are adhered to." }
          ],
          ceoQuote: "Our journey to where we are today has been marked with many hurdles and challenges... Our hard work, determination and unbowed resolve to always deliver quality and on time, has been rewarded in more ways than we could imagine.",
          images: [
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
          ]
        },
        testimonials: {
          visible: true,
          heading: "WHAT OUR CLIENTS SAY",
          subheading: "Hear from our partners about our project execution and delivery."
        },
        clients: {
          visible: true,
          heading: "OUR CLIENT SECTORS & PARTNERS",
          subheading: "We collaborate with diverse institutions to shape the built environment.",
          items: [
            "Governments",
            "NGOs",
            "Financial Institutions",
            "County Governments",
            "Parastatals",
            "International Corporations",
            "Real Estate Developers"
          ]
        },
        cta: {
          visible: true,
          heading: "Ready to Start Your Project?",
          subheading: "Contact us today for a free consultation and technical advice.",
          ctaLabel: "Get in Touch",
          ctaLink: "/contact"
        }
      };

      for (const [id, data] of Object.entries(sections)) {
        await setDoc(doc(db, 'sections', id), data);
      }

      // 3. Projects
      setStatus('Writing projects...');
      const projects = [
        {
          id: "proj_001",
          title: "Nyahururu County Referral Hospital Outpatient",
          category: "Building Works",
          location: "Nyahururu, Kenya",
          client: "County Government",
          status: "Completed",
          description: "Construction of a modern outpatient department block, featuring clinical rooms, a pharmacy, and waiting bays.",
          images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"],
          visible: true
        },
        {
          id: "proj_002",
          title: "Standard Gauge Railway Development Support",
          category: "Water & Infrastructure",
          location: "Nairobi - Naivasha Section, Kenya",
          client: "National Government / EPC Contractor",
          status: "Completed",
          description: "We are proud to be associated with the development of the Standard Gauge Railway, offering earthworks, structural concrete, and auxiliary infrastructure.",
          images: ["https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80"],
          visible: true
        },
        {
          id: "proj_003",
          title: "Kangundo Road Drainage and Pipe-laying",
          category: "Road Construction Works",
          location: "Embakasi, Nairobi",
          client: "County Government / KURA",
          status: "Completed",
          description: "Installation of large diameter concrete pipes, drainage channels, and reinstatement of road shoulders along Kangundo Road.",
          images: ["https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80"],
          visible: true
        }
      ];

      for (const proj of projects) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }

      // 4. Team
      setStatus('Writing team members...');
      const team = [
        {
          id: "team_001",
          name: "Wilson Baru Wachira",
          title: "Managing Director / Director",
          bio: "Managing Director of Vulpine Limited, leading the strategic and operational vision of the company since its founding. Highly experienced in large-scale construction management and infrastructure initiatives across East Africa.",
          photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
          visible: true
        },
        {
          id: "team_002",
          name: "Technical Engineer",
          title: "Head of Technical & Engineering Services",
          bio: "Oversees engineering designs, site planning, quality assurance, and compliance with the National Construction Authority (NCA) guidelines.",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
          visible: true
        }
      ];

      for (const member of team) {
        await setDoc(doc(db, 'team', member.id), member);
      }

      // 5. Testimonials
      setStatus('Writing testimonials...');
      const testimonials = [
        {
          id: "test_001",
          quote: "Vulpine Limited demonstrated exceptional professionalism on the hospital outpatient block. Their commitment to completion timelines and quality was exemplary.",
          clientName: "Dr. James Kamau",
          clientTitle: "Director of Medical Services",
          company: "County Referral Hospital",
          visible: true
        },
        {
          id: "test_002",
          quote: "The engineering team at Vulpine is highly responsive and technically capable. Their execution of road drainage works along Kangundo Road was top tier.",
          clientName: "Eng. Sarah Wanjiku",
          clientTitle: "Supervising Road Engineer",
          company: "Urban Infrastructure Authority",
          visible: true
        }
      ];

      for (const t of testimonials) {
        await setDoc(doc(db, 'testimonials', t.id), t);
      }

      // 6. Clients
      setStatus('Writing client logos...');
      const clients = [
        { id: "c_1", name: "Governments", visible: true },
        { id: "c_2", name: "NGOs", visible: true },
        { id: "c_3", name: "Financial Institutions", visible: true },
        { id: "c_4", name: "County Governments", visible: true },
        { id: "c_5", name: "Parastatals", visible: true },
        { id: "c_6", name: "International Corporations", visible: true },
        { id: "c_7", name: "Real Estate Developers", visible: true }
      ];

      for (const c of clients) {
        await setDoc(doc(db, 'clients', c.id), c);
      }

      setStatus('Seeding completed successfully!');
    } catch (err: any) {
      console.error(err);
      setStatus(`Seeding failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Vulpine Limited Firestore Seeding Tool</h1>
      <p style={{ margin: '20px 0', fontSize: 18 }}>Status: <strong>{status}</strong></p>
      <button 
        onClick={runSeed} 
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#004E3F',
          color: '#fff',
          border: 'none',
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Seeding...' : 'Seed Database'}
      </button>
    </div>
  );
}
