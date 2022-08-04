import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDU6WzkuP4iEUBtrfnUP1tWvl57RTtPpfE",
  authDomain: "react-everyshare-app.firebaseapp.com",
  databaseURL: "https://react-everyshare-app.firebaseio.com",
  projectId: "react-everyshare-app",
  storageBucket: "react-everyshare-app.appspot.com",
  messagingSenderId: "745356446617",
  appId: "1:745356446617:web:b5191a2ece090f1201a108"
};
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.firestore();

export {
    storage, database, firebase as default
}
