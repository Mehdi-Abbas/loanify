import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBSX2h60SLAj5bpW6XZ4yom2R5ZA9iV3Q0",
    authDomain: "the-loanify.firebaseapp.com",
    databaseURL: "https://the-loanify-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "the-loanify",
    storageBucket: "the-loanify.appspot.com",
    messagingSenderId: "417745655392",
    appId: "1:417745655392:web:7b9208d129c17e292e9505"
  };
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;