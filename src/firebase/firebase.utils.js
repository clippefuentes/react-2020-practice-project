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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshopToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};
//---------------------------------------
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
//---------------------------------------
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//---------------------------------------

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

//---------------------------------------
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;