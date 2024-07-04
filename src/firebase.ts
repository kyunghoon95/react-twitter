// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIFJW7hOFR_VS2e7RranNgP0kSwI4UFB8",
  authDomain: "twitter-2282f.firebaseapp.com",
  projectId: "twitter-2282f",
  storageBucket: "twitter-2282f.appspot.com",
  messagingSenderId: "839761432347",
  appId: "1:839761432347:web:b551b3b886aaba179b0dbe",
  measurementId: "G-75W79QZMJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);