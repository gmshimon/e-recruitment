// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFw68ffqo3-9Pz30scjEwNVd3iyCBXKaw",
  authDomain: "e-recruitment-b3a19.firebaseapp.com",
  projectId: "e-recruitment-b3a19",
  storageBucket: "e-recruitment-b3a19.firebasestorage.app",
  messagingSenderId: "105682740975",
  appId: "1:105682740975:web:0f706003c3fc7c8758dd1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
export default auth;