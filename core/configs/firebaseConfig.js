import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import {initializeApp} from 'firebase/app'
import { getStorage,ref } from 'firebase/storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASwVmX3YGQ-RjITwwDLBn0LpBGa2tM9qU",
  authDomain: "colorssokssok.firebaseapp.com",
  databaseURL: "https://colorssokssok-default-rtdb.firebaseio.com",
  projectId: "colorssokssok",
  storageBucket: "colorssokssok.appspot.com",
  messagingSenderId: "363707042322",
  appId: "1:363707042322:web:7a49ff733072c1e32926cb"
};



// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};

const app=initializeApp(firebaseConfig)
export const storage=getStorage(app);