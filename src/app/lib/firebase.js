// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ MISSING import

const firebaseConfig = {
  apiKey: "AIzaSyBp0UQIdni7IEoECiIkX0lV32Vjcl8tJ90",
  authDomain: "gamehost-101b8.firebaseapp.com",
  projectId: "gamehost-101b8",
  storageBucket: "gamehost-101b8.firebasestorage.app",
  messagingSenderId: "971890509022",
  appId: "1:971890509022:web:1f2fc87cdd9340c26f6e4f",
  measurementId: "G-G48M0N1GB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore initialized

// ✅ Export both auth and db
export { auth, db };
