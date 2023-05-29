// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , collection, addDoc, doc, setDoc} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLQaVIi_O52Xswg-jvfNajrp5qz-fLhHU",
  authDomain: "login-page2-85c9a.firebaseapp.com",
  projectId: "login-page2-85c9a",
  storageBucket: "login-page2-85c9a.appspot.com",
  messagingSenderId: "587127194927",
  appId: "1:587127194927:web:2dc80d355bbcda2b1f8dda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, collection, addDoc, doc, setDoc};
