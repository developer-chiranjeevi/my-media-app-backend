const firebase = require('firebase-admin');
const ServiceAccount = require('./cred/private-key.json');

//initializing firebase application
firebase.initializeApp({
    credential:firebase.credential.cert(ServiceAccount)
});

//creating an instance of firestore database
const db = firebase.firestore();
module.exports.firestore = db;