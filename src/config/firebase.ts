// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbr5b0m1auZx3KEgEaLFwDXjPsFH41v9I",
  authDomain: "metatickets-7b486.firebaseapp.com",
  projectId: "metatickets-7b486",
  storageBucket: "metatickets-7b486.firebasestorage.app",
  messagingSenderId: "390701691641",
  appId: "1:390701691641:web:b8b1f5483725898588a828",
  measurementId: "G-SR8S91T65Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export default app;
