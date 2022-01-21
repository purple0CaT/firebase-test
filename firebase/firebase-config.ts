// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
//
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREB_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREB_AUTHDOM,
  projectId: process.env.NEXT_PUBLIC_FIREB_PROJID,
  storageBucket: process.env.NEXT_PUBLIC_FIREB_STOR_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREB_MESS_SEND_ID,
  appId: process.env.NEXT_PUBLIC_FIREB_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREB_MEASURID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//
export const db = getFirestore(app);
