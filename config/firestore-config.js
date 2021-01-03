import firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig'

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
	firebase.app(); // if already initialized, use that one
}

const fire = firebase;
export default fire;