// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "sicuaura-163e3.firebaseapp.com",
  projectId: "sicuaura-163e3",
  storageBucket: "sicuaura-163e3.appspot.com",
  messagingSenderId: "470820586895",
  appId: "1:470820586895:web:9fd090a02a2466993037fa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
