import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzTKrPiXSWa8Hjeb8u2P0GeH6yOIB8DoE",
  authDomain: "ecommerce-fsc.firebaseapp.com",
  projectId: "ecommerce-fsc",
  storageBucket: "ecommerce-fsc.firebasestorage.app",
  messagingSenderId: "184467831175",
  appId: "1:184467831175:web:67826ae07327d6e7f2fb22"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();