// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection, addDoc, doc, setDoc} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "login-page2-85c9a.firebaseapp.com",
  projectId: "login-page2-85c9a",
  storageBucket: "login-page2-85c9a.appspot.com",
  messagingSenderId: "587127194927",
  appId: process.env.REACT_APP_FIREBASE_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, doc, setDoc};
