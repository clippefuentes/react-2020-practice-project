import ShopActionTypes from './shop.types';

// import { firestore, convertCollectionSnapshopToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  // return dispatch => {
  //   const collectionRef = firestore.collection('collections');
  //   dispatch(fetchCollectionsStart());
  //   collectionRef
  //     .get()
  //     .then(snapshop => {
  //       const collectionsMap = convertCollectionSnapshopToMap(snapshop);
  //       dispatch(fetchCollectionsSuccess(collectionsMap))
  //     // this.setState({ loading: false });
  //     })
  //     .catch(err => dispatch(fetchCollectionsFailure(err)));
  // };
};