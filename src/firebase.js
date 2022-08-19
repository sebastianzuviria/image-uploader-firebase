import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAMXwJnVrIP-MKUG6I_S9T1vzZfmZIkRoc",
  authDomain: "backend34695.firebaseapp.com",
  projectId: "backend34695",
  storageBucket: "backend34695.appspot.com",
  messagingSenderId: "25305929856",
  appId: "1:25305929856:web:cb3a27237f74014c58ae65"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)