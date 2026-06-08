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
    <section className="bg-surface py-32 relative border-b border-slate-200">
      <div className="w-full">
        {/* Section Header */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-sm font-semibold tracking-widest text-accent uppercase block mb-4 font-sans">
              Portfolio
            </span>
            <h2 className="font-serif text-5xl sm:text-6xl text-primary font-bold tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="architectural-btn"
          >
            View All Projects
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col border-t border-slate-200">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col lg:flex-row border-b border-slate-200 overflow-hidden"
            >
              {/* Project Details */}
              <div className="w-full lg:w-1/3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between bg-light-green border-r border-slate-200 z-10 transition-colors duration-500">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-accent uppercase font-sans mb-8 border border-accent/30 inline-block px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-primary font-bold mb-6 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 font-sans text-base leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col space-y-4 text-sm text-slate-500 font-sans pt-8 border-t border-slate-200 font-medium">
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400 w-16">Location</span>
                    <span className="text-primary font-semibold">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-slate-400 w-16">Client</span>
                    <span className="text-primary font-semibold">{project.client}</span>
                  </div>
                </div>
              </div>

              {/* Project Image */}
              <div className="w-full lg:w-2/3 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-100">
                <img
                  src={project.images[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
