// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, uploadString } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGYVZSg1ZjLfz7mY97XUHA48AQtJKzNpo",
  authDomain: "fir-auth-3b827.firebaseapp.com",
  projectId: "fir-auth-3b827",
  storageBucket: "fir-auth-3b827.appspot.com",
  messagingSenderId: "368771310137",
  appId: "1:368771310137:web:0799331abf5a9e37fca3e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const userRef = collection(db, "users");
export const postsRef = collection(db, "posts");
