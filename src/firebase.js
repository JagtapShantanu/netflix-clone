import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCsTQyTzLKe13XQ8NOO5va7hw7Ryf-8E10",
    authDomain: "netflix-clone-d33c0.firebaseapp.com",
    projectId: "netflix-clone-d33c0",
    storageBucket: "netflix-clone-d33c0.appspot.com",
    messagingSenderId: "76036448317",
    appId: "1:76036448317:web:b304e382894f956ffa8a54"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();

 export { auth };
export default db;
