import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDBbcu9RMngo14fpiYlyehDSgoiZH14AZU",
  authDomain: "crwn-db-f2f60.firebaseapp.com",
  databaseURL: "https://crwn-db-f2f60.firebaseio.com",
  projectId: "crwn-db-f2f60",
  storageBucket: "crwn-db-f2f60.appspot.com",
  messagingSenderId: "873734089319",
  appId: "1:873734089319:web:1b987bff2cfac1574902c2",
  measurementId: "G-RTV7GP061F"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {
  prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;