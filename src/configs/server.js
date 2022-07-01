const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDgYfsAmCUh-wyCmja-2Se1PTACslWW7G0",
  authDomain: "memberapp-1d414.firebaseapp.com",
  projectId: "memberapp-1d414",
  storageBucket: "memberapp-1d414.appspot.com",
  messagingSenderId: "906855123992",
  appId: "1:906855123992:web:c58e5741b4a65811a5476d",
  measurementId: "G-W2RFDSNVKP",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

module.exports = {
  db,
};
