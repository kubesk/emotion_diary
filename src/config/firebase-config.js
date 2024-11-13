// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZpTlvpCnTHq2BQDhnPvZHkgg3Dhqe_7E",
    authDomain: "emotion-diary-49741.firebaseapp.com",
    projectId: "emotion-diary-49741",
    storageBucket: "emotion-diary-49741.firebasestorage.app",
    messagingSenderId: "206683306244",
    appId: "1:206683306244:web:dfd35a8fedf483d2373851",
    measurementId: "G-PQ78HCYSHD"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const diaryDb = getFirestore(app);
  