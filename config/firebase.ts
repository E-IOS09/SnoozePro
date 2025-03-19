// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore"; // ✅ Corrected import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU-oPaTI_lc7c72NL8vCd8w6WbHkhZNys",
  authDomain: "snoozepro-27c13.firebaseapp.com",
  projectId: "snoozepro-27c13",
  storageBucket: "snoozepro-27c13.appspot.com", // ✅ Corrected storage bucket
  messagingSenderId: "101141196804",
  appId: "1:101141196804:web:1609484d8468207d7f0551",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage Persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const firestore = getFirestore(app);
