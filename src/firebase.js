import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDGwBnfkwUnLV5cb8L8bw-rZrsWoQYWRs4",
  authDomain: "instagram-clone-806c0.firebaseapp.com",
  projectId: "instagram-clone-806c0",
  storageBucket: "instagram-clone-806c0.appspot.com",
  messagingSenderId: "832592527251",
  appId: "1:832592527251:web:77c0e07ca24cd862bf7266",
  measurementId: "G-C3L4EV19K9",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
