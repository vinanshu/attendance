// Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBRXYXL466PMfOcCh3cc4EJApUjglyX-w",
  authDomain: "attendance-project-d4d05.firebaseapp.com",
  databaseURL: "https://attendance-project-d4d05-default-rtdb.firebaseio.com",
  projectId: "attendance-project-d4d05",
  storageBucket: "attendance-project-d4d05.firebasestorage.app",
  messagingSenderId: "36550452134",
  appId: "1:36550452134:web:c1abe5d36dc61dc91ee567",
  measurementId: "G-V75S791MGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const realtimeDatabase = getDatabase(app);

export { firestore, realtimeDatabase };
