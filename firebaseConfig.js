// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqfKrWkemEdjzj1ar8ZmDtSrvvq7ClXCQ",
  authDomain: "balance-40f00.firebaseapp.com",
  projectId: "balance-40f00",
  storageBucket: "balance-40f00.appspot.com",
  messagingSenderId: "108809610562",
  appId: "1:108809610562:web:4eba752c6b3ae6497b94db",
  measurementId: "G-FDYBGBK8P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
