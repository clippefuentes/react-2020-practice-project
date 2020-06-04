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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.loog('error creating user', err.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( {
  prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;