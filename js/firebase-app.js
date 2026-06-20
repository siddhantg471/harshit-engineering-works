// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeqTtV1J3PMg0TOwQ80tgoZN25noneKcE",
  authDomain: "harshit-engineering-work-9ffc5.firebaseapp.com",
  projectId: "harshit-engineering-work-9ffc5",
  storageBucket: "harshit-engineering-work-9ffc5.firebasestorage.app",
  messagingSenderId: "907079045554",
  appId: "1:907079045554:web:b7fa82faf3816c59c194ab",
  measurementId: "G-P1H46VSFGW"
};

// Initialize Firebase only once so deferred or repeated loads stay safe.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
