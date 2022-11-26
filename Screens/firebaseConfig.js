// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { getFirestore ,collection, getDocs} from "firebase/firestore";

import React, { useEffect, useState } from 'react'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUCAAZnkxV8RKvaAvchihV7whf1v-aPzA",
  authDomain: "teamup-cacf6.firebaseapp.com",
  projectId: "teamup-cacf6",
  storageBucket: "teamup-cacf6.appspot.com",
  messagingSenderId: "445500623502",
  appId: "1:445500623502:web:b966402ebfaa7aef8717df",
  measurementId: "G-EKQ9WG59XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Create a GeoCollection reference
 const db = getFirestore(app);

 const auth = getAuth();

 export  { auth, db };

