import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

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
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // render={(props) =>
          //   <CollectionOverviewWithSpinner
          //     isLoading={isCollectionFetching} {...props}
          //   />
          // }
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
          // render={(props) =>
          //   <CollectionPageWithSpinner
          //     isLoading={!isCollectionLoaded}
          //     {...props}
          //   />
          // }
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
