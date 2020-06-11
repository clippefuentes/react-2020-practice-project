import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.components';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectionIsCollectionLoaded } from '../../redux/shop/shop.selector'

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    // collectionRef.get().then(snapshop => {
    //   const collectionsMap = convertCollectionSnapshopToMap(snapshop);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });

    // collectionRef.onSnapshot(async snapshop => {
    //   const collectionsMap = convertCollectionSnapshopToMap(snapshop);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={(props) =>
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching} {...props}
            />
          }
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) =>
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsCollectionsFetching,
  isCollectionLoaded: selectionIsCollectionLoaded,
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);
