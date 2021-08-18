import firebase from "@firebase/app";
import "@firebase/storage";

// this comment should not exist...
// Replace these with your own :)
const firebaseConfig = {
  apiKey: "AIzaSyBGkEE3jARfpgWz8GK3nLcJ2WqoqVrRmeQ",
  authDomain: "eika-31a2e.firebaseapp.com",
  projectId: "eika-31a2e",
  storageBucket: "eika-31a2e.appspot.com",
  messagingSenderId: "379869340822",
  appId: "1:379869340822:web:7db36fd3e3c32f384b0eb7",
};

// Make sure it hasn't already been initialized
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
