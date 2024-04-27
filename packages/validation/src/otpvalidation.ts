// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA3vGUCRwj5AjBbwDJmQyJTzApcdPCANaU",
  authDomain: "paytm-b0326.firebaseapp.com",
  projectId: "paytm-b0326",
  storageBucket: "paytm-b0326.appspot.com",
  messagingSenderId: "718405542621",
  appId: "1:718405542621:web:f24b7c89b972868e98b134",
  measurementId: "G-BL5HCJY5LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};