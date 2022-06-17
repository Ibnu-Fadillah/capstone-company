// Import the functions you need from the SDKs you need
// var initializeApp = require("firebase/app");
var firebase = require("firebase/app");
var { database, ref, push, set } = require ("firebase/database");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// function initializeApp() {
  const firebaseConfig = {
    apiKey: "AIzaSyDgPGCEJ4bHNGISL3KJcwkL7VAE7ZLJr9Q",
    authDomain: "bangkit-po.firebaseapp.com",
    projectId: "bangkit-po",
    storageBucket: "bangkit-po.appspot.com",
    messagingSenderId: "186984091817",
    appId: "1:186984091817:web:48d0a189c57d0fdcbd99b8",
    measurementId: "G-XMHQPQ4WLW"
  };

// Initialize Firebase
// const cek = initializeApp(firebaseConfig);
// const db = getDatabase();
// const postListRef = ref(db, 'posts');
const postListRef = firebase.database().ref('posts');
const newPostRef = postListRef.push();
newPostRef.set({

});
// const rootRef = db.ref();
// const analytics = getAnalytics(cek);

module.exports = { 
  set,
};
// }