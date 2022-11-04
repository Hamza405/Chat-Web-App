import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKUzXswqnOZNILZCXb5Jm6sp4JW7waABg",
  authDomain: "tishreen-62882.firebaseapp.com",
  databaseURL: "https://tishreen-62882-default-rtdb.firebaseio.com",
  projectId: "tishreen-62882",
  storageBucket: "tishreen-62882.appspot.com",
  messagingSenderId: "936898727421",
  appId: "1:936898727421:web:5be6ea3735f647a81cdd94",
  measurementId: "G-DRFYNGCQE6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
