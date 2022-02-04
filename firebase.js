import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDRbIqEPfu5kyQbahm_XG1vPClBkjQQJus",
    authDomain: "clone-937af.firebaseapp.com",
    projectId: "clone-937af",
    storageBucket: "clone-937af.appspot.com",
    messagingSenderId: "938680109204",
    appId: "1:938680109204:web:544bc0a3ab0d7ff7ec0c81"
  };

  // setting up a firebase file in the frontend..initializing the firebase.

  // we're gonna double check if there is any 1 or more firebase initialization.
  
  const app = !firebase.apps.length
   ? firebase.initializeApp(firebaseConfig) 
   : firebase.app();

  const db = app.firestore();

  export default db;
