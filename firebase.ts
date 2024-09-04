// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// import { getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const env = import.meta.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: env.VITE_apiKey,
  authDomain: env.VITE_authDomain,
  databaseURL: env.VITE_databaseURL,
  projectId: env.VITE_projectId,
  storageBucket: env.VITE_storageBucket,
  messagingSenderId: env.VITE_messagingSenderId,
  appId: env.VITE_appId,
  measurementId: env.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const database = firebase.database();
const auth = getAuth(app);

export { auth, database };
