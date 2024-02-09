// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbayEsSI9NgzFiRI8WfDxDvuGzl2w7or4",
  authDomain: "firecode-56ca4.firebaseapp.com",
  databaseURL: "https://firecode-56ca4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "firecode-56ca4",
  storageBucket: "firecode-56ca4.appspot.com",
  messagingSenderId: "398013977867",
  appId: "1:398013977867:web:ef0f05631dc74360137e0e",
  measurementId: "G-0R1FMX49FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
