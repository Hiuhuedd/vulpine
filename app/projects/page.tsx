'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProjectData } from '@/types/cms';
import { MapPin, FolderOpen, X, Info, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Electrical Works');
  const [loading, setLoading] = useState(true);

  // Modal / Lightbox State
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, 'projects'), where('visible', '==', true));
        const snap = await getDocs(q);
        const list: ProjectData[] = [];
        const catsSet = new Set<string>(['Electrical Works']);
        snap.forEach((doc) => {
          const data = doc.data() as ProjectData;
          list.push(data);
          if (data.category) {
            const catLower = data.category.toLowerCase();
            if (catLower === 'electrical' || catLower === 'electrical works' || catLower === 'electrical, solar & fencing') {
              catsSet.add('Electrical Works');
            } else {
              catsSet.add(data.category);
            }
          }
        });
        setProjects(list);
        
        // Initial filter: only show electrical projects
        const electricalList = list.filter(p => 
          p.category?.toLowerCase() === 'electrical works' || 
          p.category?.toLowerCase() === 'electrical, solar & fencing' ||
          p.category?.toLowerCase() === 'electrical'
        );
        setFilteredProjects(electricalList);
        setCategories(Array.from(catsSet));
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const selectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'Electrical Works') {
      setFilteredProjects(projects.filter(p => 
        p.category?.toLowerCase() === 'electrical works' || 
        p.category?.toLowerCase() === 'electrical, solar & fencing' ||
        p.category?.toLowerCase() === 'electrical'
      ));
    } else {
      setFilteredProjects(projects.filter(p => p.category === cat));
    }
  };

  const openProjectDetails = (proj: ProjectData) => {
    setSelectedProject(proj);
    setActiveImageIdx(0);
  };

  const nextImage = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        Loading Vulpine Portfolio...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section 
        className="relative py-24 bg-surface bg-cover bg-center text-primary text-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80')`, height: '320px' }}
      >
        <div className="absolute inset-0 bg-surface/75" />
        <div className="relative z-10 max-w-4xl px-4">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">VULPINE LIMITED</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-wide">Our Projects</h1>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-surface pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`font-sans text-xs font-bold uppercase tracking-wider px-5 py-3 transition-all duration-200 architectural-btn cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-accent text-primary border-2 border-accent'
                    : 'bg-surface/20 text-slate-600 border-2 border-transparent hover:border-surface hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openProjectDetails(project)}
                  className="architectural-card bg-surface/10 border border-surface flex flex-col h-full hover:shadow-lg hover:border-accent/50 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <img
                      src={project.images[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-primary font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-primary font-bold tracking-wide mb-3 leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed line-clamp-3 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 font-sans pt-4 border-t border-surface/50 mt-auto">
                      <div className="flex items-center space-x-1.5">
                        <MapPin size={14} className="text-primary" />
                        <span>{project.location}</span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-accent bg-primary px-2.5 py-0.5">
                        {project.status}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500 font-sans">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-surface/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border-t-4 border-accent shadow-2xl architectural-card"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-surface text-primary p-2 hover:bg-accent hover:text-primary transition-all z-10 cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
                
                {/* Left side: Images gallery / slider */}
                <div className="md:col-span-7 space-y-4">
                  <div className="relative aspect-video bg-surface flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedProject.images[activeImageIdx]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setLightboxImage(selectedProject.images[activeImageIdx])}
                    />
                    
                    {/* Image navigation inside modal */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => prevImage(e, selectedProject.images)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface/70 text-primary p-1.5 hover:bg-accent hover:text-primary transition-all cursor-pointer"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={(e) => nextImage(e, selectedProject.images)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface/70 text-primary p-1.5 hover:bg-accent hover:text-primary transition-all cursor-pointer"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIdx(idx)}
                          className={`w-16 h-12 border-2 relative overflow-hidden transition-all ${
                            activeImageIdx === idx ? 'border-accent' : 'border-transparent'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side: Information Details */}
                <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-primary px-3 py-1">
                      {selectedProject.category}
                    </span>
                    <h2 className="font-serif text-2xl font-bold tracking-wide text-primary leading-tight pt-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-slate-600 font-sans text-xs leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Spec Metadata */}
                  <div className="border-t border-surface pt-6 space-y-3.5 text-xs text-primary/80 font-sans mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-500">
                        <MapPin size={14} />
                        <span>Location</span>
                      </div>
                      <span className="font-bold">{selectedProject.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-500">
                        <FolderOpen size={14} />
                        <span>Client</span>
                      </div>
                      <span className="font-bold">{selectedProject.client}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-slate-500">
                        <Calendar size={14} />
                        <span>Status</span>
                      </div>
                      <span className="text-accent bg-primary font-bold px-2 py-0.5 uppercase text-[10px] tracking-wide">
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox full-screen Image Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <div 
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 bg-slate-50 text-primary p-2 hover:bg-accent hover:text-primary transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            <img 
              src={lightboxImage} 
              alt="Lightbox" 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl" 
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
