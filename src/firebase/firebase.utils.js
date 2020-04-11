import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgkxW4XojrgGw3wcmspQt9EEqYPULrlwE",
  authDomain: "evernote-clone-app-91c9d.firebaseapp.com",
  databaseURL: "https://evernote-clone-app-91c9d.firebaseio.com",
  projectId: "evernote-clone-app-91c9d",
  storageBucket: "evernote-clone-app-91c9d.appspot.com",
  messagingSenderId: "302544928594",
  appId: "1:302544928594:web:9e6f7c6dee9a5330a7848b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
