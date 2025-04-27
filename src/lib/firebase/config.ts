import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration with only auth-related fields
const firebaseConfig = {
  apiKey: "AIzaSyA0raiTWLhzvG-qnKaKwCEMQjs6-a3Pf6Y",
  authDomain: "appraisily.firebaseapp.com",
  projectId: "appraisily",
  storageBucket: "appraisily.firebasestorage.app",
  messagingSenderId: "768257804794",
  appId: "1:768257804794:web:de9bbc399bd812048bbc43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app; 