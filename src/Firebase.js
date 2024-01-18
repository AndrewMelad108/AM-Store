// Import the functions you need from the SDKs you need

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// require("firebase/auth");
import "firebase/storage";
import "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC2ho-AfgdslA3O1p3-McbLU04F4KMraYU",
  authDomain: "e-comerce-f9e20.firebaseapp.com",
  projectId: "e-comerce-f9e20",
  storageBucket: "e-comerce-f9e20.appspot.com",
  messagingSenderId: "370095664084",
  appId: "1:370095664084:web:5365c6777dfa88c845c441",
  measurementId: "G-2JVMZRNL6F",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
