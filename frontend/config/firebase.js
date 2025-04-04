// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import credential from "./credential.json";
// Your web app's Firebase configuration
const firebaseConfig = credential;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
