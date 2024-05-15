// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBGPEQIq0uY5a1F4TH7aJ698Y1kTZMHZXs",
	authDomain: "to-do-app-d5109.firebaseapp.com",
	projectId: "to-do-app-d5109",
	storageBucket: "to-do-app-d5109.appspot.com",
	messagingSenderId: "213642179791",
	appId: "1:213642179791:web:2eb17bdac2ff0bcf8433ba",
	measurementId: "G-VJK4ETK4Z0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
