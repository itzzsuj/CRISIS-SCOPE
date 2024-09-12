// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK_P1zSvkMbLd9ZIi2_IxBEYTU1r88zjk",
  authDomain: "login-auth-60ebb.firebaseapp.com",
  projectId: "login-auth-60ebb",
  storageBucket: "login-auth-60ebb.appspot.com",
  messagingSenderId: "402940395956",
  appId: "1:402940395956:web:cd3102948715779d2772e1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;