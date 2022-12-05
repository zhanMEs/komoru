// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8-BhTUFZMvNoAWXnNhF91lS-DXgKaF7o",
  authDomain: "komoru-729e8.firebaseapp.com",
  projectId: "komoru-729e8",
  storageBucket: "komoru-729e8.appspot.com",
  messagingSenderId: "1028043022413",
  appId: "1:1028043022413:web:b16d043d02cb47dda37c04",
  measurementId: "G-JC7XEZJRBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)