import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateBranding = async () => {
  const brandingData = {
    primary: '#3E5A44',
    accent: '#D18F68',
    accentMid: '#DBA280',
    lightGreen: '#F4F6F3',
    surface: '#E8EBE5',
    teal: '#2A3F2F',
    white: '#FFFFFF',
    dark: '#1A261D',
  };

  try {
    await setDoc(doc(db, 'settings', 'branding'), brandingData);
    console.log('Branding updated successfully in Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating branding:', error);
    process.exit(1);
  }
};

updateBranding();
