'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SectionData } from '@/types/cms';

const SectionsContext = createContext<{
  sections: { [id: string]: SectionData };
  loading: boolean;
}>({ sections: {}, loading: true });

export function SectionsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<{ [id: string]: SectionData }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, 'sections');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data: { [id: string]: SectionData } = {};
      snapshot.forEach((doc) => {
        data[doc.id] = { ...doc.data(), sectionId: doc.id } as SectionData;
      });
      setSections(data);
      setLoading(false);
    }, (error) => {
      console.error("Failed to fetch sections:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SectionsContext.Provider value={{ sections, loading }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSection(sectionId: string): { section: SectionData | null; loading: boolean } {
  const { sections, loading } = useContext(SectionsContext);
  const section = sections[sectionId] || null;
  return { section, loading };
}

export function useAllSections() {
  return useContext(SectionsContext);
}


