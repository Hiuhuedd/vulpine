import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Read .env.local manually to get Firebase credentials
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateHero = async () => {
  const heroData = {
    sectionId: 'hero',
    visible: true,
    heading: "Building East Africa's Future",
    subheading: "Design, Construction and Maintenance of Natural and Built Environment",
    body: "Our journey to where we are today has been marked with many hurdles and challenges. Our hard work, determination and unbowed resolve to always deliver quality and on time, has been rewarded in more ways than we could imagine.",
    ctaLabel: "View Our Projects",
    ctaLink: "/projects",
    images: [
      "https://res.cloudinary.com/dpu3sdksr/image/upload/v1781561309/enviromate/pj2bnxojd4vkly0skwr2.jpg"
    ]
  };

  try {
    await setDoc(doc(db, 'sections', 'hero'), heroData);
    console.log('Hero section updated successfully in Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating hero section:', error);
    process.exit(1);
  }
};

updateHero();
