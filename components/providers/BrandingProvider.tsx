'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BrandingSettings } from '@/types/cms';

const defaultBranding: BrandingSettings = {
  primary: '#3E5A44',
  accent: '#D18F68',
  accentMid: '#DBA280',
  lightGreen: '#F4F6F3',
  surface: '#E8EBE5',
  teal: '#2A3F2F',
  white: '#FFFFFF',
  dark: '#1A261D',
};

const BrandingContext = createContext<BrandingSettings>(defaultBranding);

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<BrandingSettings>(defaultBranding);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'branding');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as BrandingSettings;
        setBranding(data);
        // Force bypassing Firestore CSS injection to display the new hardcoded creative theme
      }
    }, (error) => {
      console.error("Failed to load branding from Firestore, using defaults:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrandingContext.Provider value={branding}>
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  return useContext(BrandingContext);
}


