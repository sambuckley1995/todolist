import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeZAleMHbt8WfhtvDe6AsFnhSZe9N6cgM",
  authDomain: "todo-29843.firebaseapp.com",
  databaseURL: "https://todo-29843.firebaseio.com",
  projectId: "todo-29843",
  storageBucket: "todo-29843.appspot.com",
  messagingSenderId: "515243542647",
  appId: "1:515243542647:web:7891ea29e04a68c4735e72",
  measurementId: "G-D9T65QV6C6"
};

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to provider for google signin
export const provider = new firebase.auth.GoogleAuthProvider();

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
