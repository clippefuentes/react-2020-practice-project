import { takeEvery, call, put } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { firestore, convertCollectionSnapshopToMap } from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions'

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshopToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err));
  }
  // collectionRef
  //   .get()
  //   .then(snapshop => {
  //     const collectionsMap = convertCollectionSnapshopToMap(snapshop);
  //     fetchCollectionsSuccess(collectionsMap)
  //   // this.setState({ loading: false });
  //   })
  //   .catch(err => fetchCollectionsFailure(err));
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}