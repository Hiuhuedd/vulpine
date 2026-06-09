'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProjectData } from '@/types/cms';
import { MapPin, FolderOpen } from 'lucide-react';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFeatured() {
      try {
        const q = query(
          collection(db, 'projects'),
          where('visible', '==', true),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const list: ProjectData[] = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data() as ProjectData);
        });
        setProjects(list);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setLoading(false);
      }
    }
    getFeatured();
  }, []);

  if (loading) {
    return (
      <div className="bg-surface py-24 text-center text-slate-500 font-sans">
        Loading featured projects...
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="bg-white py-32 relative border-t border-slate-100">
      <div className="w-full">
        {/* Section Header */}
        <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase mb-6 bg-primary text-white inline-block px-4 py-2">
              Portfolio
            </span>
            <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl text-primary font-black tracking-tighter leading-[0.9]">
              FEATURED <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-mid">PROJECTS</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-bold text-primary bg-surface border border-slate-200 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-sm"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="relative text-xs tracking-widest uppercase">View All Projects</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col border-t border-slate-100">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col lg:flex-row border-b border-slate-100 overflow-hidden min-h-[60vh]"
            >
              {/* Project Details */}
              <div className="w-full lg:w-5/12 p-10 sm:p-14 lg:p-20 flex flex-col justify-center bg-surface lg:border-r border-slate-100 z-10 transition-colors duration-500 relative">
                <div className="absolute top-0 right-0 p-8 text-[8rem] font-black leading-none text-slate-100 select-none pointer-events-none group-hover:text-accent/10 transition-colors duration-500">
                  0{index + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="text-[10px] font-black tracking-[0.2em] text-accent uppercase font-sans mb-8 border border-slate-200 bg-white inline-block px-4 py-2 shadow-sm">
                    {project.category}
                  </div>
                  <h3 className="font-sans text-4xl sm:text-5xl text-primary font-black tracking-tighter mb-6 group-hover:text-accent transition-colors leading-[0.95]">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 font-sans text-base leading-relaxed mb-10 max-w-lg font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col space-y-4 text-[10px] tracking-widest uppercase text-slate-400 font-sans pt-8 border-t border-slate-200 font-black relative z-10">
                  <div className="flex items-center space-x-6">
                    <span className="w-20">Location</span>
                    <span className="text-primary">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="w-20">Client</span>
                    <span className="text-primary">{project.client}</span>
                  </div>
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full lg:w-7/12 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-900">
                <img
                  src={project.images[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.33,1,0.68,1)] opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent w-32 hidden lg:block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
