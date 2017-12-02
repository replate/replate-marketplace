import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import LoadingView from '../common/LoadingView';

import ListingItem from '../listings/ListingItem';

import ListingsRequester from '../../requesters/ListingsRequester';

import Events from '../../constants/Events';

import ListingsScreen from '../listings/ListingsScreen';

class ActivePickupsScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Active Pickups',
  });

  constructor(props) {
    super(props);

    this.state = {
      region: {id: 1}, // TODO: make dependent on user region
      listings: [],
      isLoading: true,
      isRefreshing: false,
    }
  }

  componentDidMount() {
    this._getActiveListings();
    window.EventBus.on(Events.listingClaimed, this._addListing);
  }

  componentWillDismount() {
    window.EventBus.off(Events.listingClaimed, this._addListing);
  }

  _getActiveListings = () => {
    ListingsRequester.getActiveListings().then((listings) =>  {
      this.setState({
        listings: listings,
        isRefreshing: false,
        isLoading: false,
      });
    }).catch((error) => {
      this.setState({
        isRefreshing: false,
        isLoading: false,
      });
    });

  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getActiveListings();
    });
  }

  _addListing = (listing) => {
    allListings = this.state.listings;
    addListing = allListings.slice()
    addListing.push(listing);
    this.setState({
      listings: addListing,
    });
  }

  _removeListing = (listing) => {
    allListings = this.state.listings;
    newListings = allListings.filter((l) => l.id !== listing.id);
    this.setState({
      listings: newListings,
    });
  }

  _keyExtractor = (item, index) => {
    return item.id;
  }

  _onPressItem = (listing) => {
    this.props.navigation.navigate('ActiveDetail', {listing: listing, onCancel: this._removeListing});
  }

  render() {
    return (
      <LoadingView style={styles.container} isLoading={this.state.isLoading}>
        <FlatList
            data={this.state.listings}
            keyExtractor={this._keyExtractor}
            renderItem={ ({item}) =>
              <ListingItem
                listing={item}
                onPressItem={this._onPressItem}
                active
              />
            }
            refreshing={this.state.isRefreshing}
            onRefresh={this._refresh}
          />
      </LoadingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ActivePickupsScreen;