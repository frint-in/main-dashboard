// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_REACT_FIREBASE_URL}`,
  authDomain: "frint-main.firebaseapp.com",
  projectId: "frint-main",
  storageBucket: "frint-main.appspot.com",
  messagingSenderId: "898271244009",
  appId: `${import.meta.env.VITE_REACT_FIREBASE_APPID}`,
  measurementId: "G-1QN12GXW14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
