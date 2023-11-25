// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr8hznFgvcR8g2z0JgP0wchBA5H5d2RXM",
  authDomain: "connect-47a88.firebaseapp.com",
  projectId: "connect-47a88",
  storageBucket: "connect-47a88.appspot.com",
  messagingSenderId: "412089726110",
  appId: "1:412089726110:web:a0d2a4fc36d5519c35f78f",
  measurementId: "G-40X3YNC8GF"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

