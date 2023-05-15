import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDpzgydJY0MPlfSm0P-AXZ06XSMH82eh0w",
    authDomain: "proyectopractica2-de352.firebaseapp.com",
    projectId: "proyectopractica2-de352",
    storageBucket: "proyectopractica2-de352.appspot.com",
    messagingSenderId: "486843477325",
    appId: "1:486843477325:web:e60655d8f8e8f8bfb09b04"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };