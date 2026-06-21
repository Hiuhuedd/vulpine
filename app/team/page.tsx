'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamMemberData } from '@/types/cms';
import { ChevronDown, ChevronRight, User, Award, Users } from 'lucide-react';
import PageHero from '@/components/PageHero';

// Default members seeded to Firestore on first load if collection is empty.
// After seeding, ALL content is managed exclusively via the admin CMS.
const SEED_TEAM = [
  {
    id: 'wilson-baru-wachira',
    name: 'Wilson Baru Wachira',
    title: 'Managing Director / Director',
    bio: 'Managing Director of Vulpine Limited, leading the strategic and operational vision of the company since its founding. Highly experienced in large-scale construction management and PPP initiatives across East Africa.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    visible: true,
  },
  {
    id: 'technical-engineer',
    name: 'Technical Engineer',
    title: 'Head of Technical & Engineering Services',
    bio: 'Oversees engineering designs, site planning, quality assurance, and compliance with the National Construction Authority (NCA) guidelines.',
    photo: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
    visible: true,
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMemberData[]>([]);
  const [loading, setLoading] = useState(true);

  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({
    md: true,
    gm: false,
    acc: false,
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'team'), async (snap) => {
      const list: TeamMemberData[] = [];
      snap.forEach((d) => {
        const data = { ...d.data(), id: d.id } as TeamMemberData;
        if (data.visible !== false) list.push(data);
      });

      if (list.length === 0) {
        // First-time setup: seed Firestore with default members so admin can manage them
        try {
          await Promise.all(
            SEED_TEAM.map((m) => setDoc(doc(db, 'team', m.id), m))
          );
          // onSnapshot will fire again with the seeded data
        } catch (err) {
          console.error('Failed to seed team:', err);
          // Fall back to showing seed data locally if write fails
          setTeam(SEED_TEAM as TeamMemberData[]);
          setLoading(false);
        }
      } else {
        setTeam(list);
        setLoading(false);
      }
    }, (err) => {
      console.error('Team fetch error:', err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleNode = (node: string) => {
    setExpandedNodes((prev) => ({ ...prev, [node]: !prev[node] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-primary/60 text-sm">
        Loading Vulpine Team...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <PageHero
        pageId="team"
        heading="Our Leadership"
        fallbackImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"
      />

      {/* Leadership Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">EXECUTIVE TEAM</span>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <p className="text-slate-600 font-sans text-sm sm:text-base">
              Vulpine is steered by dedicated, licensed experts who align project deliverables with strict quality standard codes.
            </p>
          </div>

          {team.length === 0 ? (
            <div className="text-center text-slate-400 font-sans text-sm py-12">
              No team members found. Add members via the admin CMS.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="architectural-card bg-surface/20 border border-surface p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:border-accent/50 transition-all duration-300"
                >
                  {/* Photo */}
                  <div className="w-32 h-40 bg-surface shrink-0 relative overflow-hidden">
                    <img
                      src={member.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-accent text-primary p-1">
                      <Award size={14} />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-center sm:text-left flex-grow">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-primary">{member.name}</h3>
                      <p className="text-[11px] font-bold text-accent uppercase tracking-wider">{member.title}</p>
                    </div>
                    <p className="text-slate-600 font-sans text-xs leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Organizational Structure Chart */}
      <section className="bg-surface/20 py-24 border-t border-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase block mb-3">INTERNAL ROSTER</span>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
            <h2 className="font-serif text-3xl font-bold tracking-wide text-primary">Organizational Chart</h2>
            <p className="text-slate-500 font-sans text-xs mt-2">Explore the chain of command and departments in Vulpine Limited.</p>
          </div>

          <div className="bg-white border border-surface p-6 sm:p-8 space-y-4 shadow-sm architectural-card">
            {/* Level 1: MD */}
            <div className="border border-primary bg-primary text-primary p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-accent text-primary p-1.5"><User size={18} /></div>
                <div>
                  <h4 className="font-serif text-sm font-bold">Managing Director</h4>
                  <p className="text-[10px] text-accent font-sans uppercase font-semibold">
                    {team.find(m => m.title?.toLowerCase().includes('managing director'))?.name || 'Wilson Baru Wachira'}
                  </p>
                </div>
              </div>
              <button onClick={() => toggleNode('md')} className="text-primary hover:text-accent p-1.5 cursor-pointer">
                {expandedNodes.md ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            </div>

            {/* Level 2: Directors */}
            <AnimatePresence>
              {expandedNodes.md && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-6 sm:pl-8 border-l border-primary/20 space-y-4 overflow-hidden pt-2"
                >
                  <div className="bg-surface/50 border border-surface p-3 text-primary text-xs font-sans font-bold uppercase tracking-wider flex items-center space-x-2">
                    <Users size={16} className="text-primary" />
                    <span>Board of Directors</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Branch A: General Manager */}
                    <div className="border border-surface p-4 space-y-3 bg-surface/10">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-primary">General Manager</span>
                        <button onClick={() => toggleNode('gm')} className="text-primary hover:text-accent cursor-pointer">
                          {expandedNodes.gm ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedNodes.gm && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 pl-3 border-l border-accent/40 text-[11px] font-sans text-slate-600 overflow-hidden pt-1.5"
                          >
                            <li>Technical Engineer</li>
                            <li>Site Agent</li>
                            <li>Environmental Expert</li>
                            <li>Personnel Department</li>
                            <li>Procurement &amp; Supply</li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Branch B: Transport Manager */}
                    <div className="border border-surface p-4 bg-surface/10 flex flex-col justify-between">
                      <span className="font-serif text-xs font-bold text-primary block">Transport Manager</span>
                      <span className="text-[10px] font-sans text-slate-500 mt-4 uppercase tracking-widest">Fleet &amp; Logistics</span>
                    </div>

                    {/* Branch C: Chief Accountant */}
                    <div className="border border-surface p-4 space-y-3 bg-surface/10">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-xs font-bold text-primary">Chief Accountant</span>
                        <button onClick={() => toggleNode('acc')} className="text-primary hover:text-accent cursor-pointer">
                          {expandedNodes.acc ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedNodes.acc && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 pl-3 border-l border-accent/40 text-[11px] font-sans text-slate-600 overflow-hidden pt-1.5"
                          >
                            <li>Accounts Dept</li>
                            <li>Operations Cost Controller</li>
                            <li>Admin Manager</li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
