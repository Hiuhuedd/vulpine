'use client';

import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PageHeroProps {
  /** The key used to look up the image in Firestore settings/pageHeroes, e.g. 'services' */
  pageId: string;
  /** The page title displayed in the h1 */
  heading: string;
  /** Fallback Unsplash image URL used before Firestore loads or if no doc exists */
  fallbackImage: string;
}

export default function PageHero({ pageId, heading, fallbackImage }: PageHeroProps) {
  const [bgImage, setBgImage] = useState(fallbackImage);

  useEffect(() => {
    const ref = doc(db, 'settings', 'pageHeroes');
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const img = data[pageId];
        if (img) setBgImage(img);
      }
    });
    return () => unsub();
  }, [pageId]);

  return (
    <section
      className="relative py-24 bg-surface bg-cover bg-center text-primary text-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url('${bgImage}')`, height: '320px' }}
    >
      <div className="absolute inset-0 bg-surface/75" />
      <div className="relative z-10 max-w-4xl px-4">
        <span className="text-lg font-bold tracking-[0.2em] text-primary uppercase block mb-3">
          VULPINE LIMITED
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide">
          {heading}
        </h1>
      </div>
    </section>
  );
}
