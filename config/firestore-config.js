import firebase from 'firebase';
const {firebaseConfig} = require('./firebaseConfig')

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    firebase.app(); // if already initialized, use that one
}

firebase.auth().signInAnonymously()

const fire = firebase;
export default fire;