// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyARlhVWuBJAlYH3s9xFWI20L-Aemn9drzY",
	authDomain: "food-ordering-management.firebaseapp.com",
	projectId: "food-ordering-management",
	storageBucket: "food-ordering-management.appspot.com",
	messagingSenderId: "282241268507",
	appId: "1:282241268507:web:96fff1393816b1cfb171be",
	measurementId: "G-T359PZFYQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
export { app, auth, provider, analytics };
