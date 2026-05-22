// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPPj8h5gUX26u1i0if5kJRrz9SviKlAgE",
  authDomain: "harshit-engineering-work-efd27.firebaseapp.com",
  projectId: "harshit-engineering-work-efd27",
  storageBucket: "harshit-engineering-work-efd27.firebasestorage.app",
  messagingSenderId: "1250561178",
  appId: "1:1250561178:web:e4afa1c0321ac030432323",
  measurementId: "G-B1SEWFNG23"
};

// Initialize Firebase only once so deferred or repeated loads stay safe.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
