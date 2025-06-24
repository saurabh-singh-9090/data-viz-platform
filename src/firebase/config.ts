import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAqeV2jpL39uPA-kQt285emjVy_OymauJk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "answersai-b1e37.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "answersai-b1e37",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "answersai-b1e37.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "133424923417",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:133424923417:web:a10a10608bd85a85833b88",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-SJ03CPXQQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app; 