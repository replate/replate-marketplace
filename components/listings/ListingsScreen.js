import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Alert
} from 'react-native';

import LoadingView from '../common/LoadingView';

import ListingItem from './ListingItem';

import ListingsRequester from '../../requesters/ListingsRequester';

import Events from '../../constants/Events';

import LocalStorage from '../../helpers/LocalStorage';

import DistanceUtils from '../../helpers/DistanceUtils.js';

class ListingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title || '',
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      region: null,
      listings: [],
      isLoading: true,
      isRefreshing: false,
    }
  }

  componentDidMount() {
    LocalStorage.getUser().then((user) => {
      this.setState({ region: user.marketplace_region }, () => {
        this.props.navigation.setParams({ title: this.state.region.region + " Marketplace" });
        this._getListings();
      });
    }).catch((error) => {
      // TODO (jonmchu): handle error
    });
    window.EventBus.on(Events.claimCancelled, this._addListing);
    window.EventBus.on(Events.regionUpdated, this._updateRegion);
  }

  componentWillDismount() {
    window.EventBus.off(Events.claimCancelled, this._addListing);
    window.EventBus.off(Events.regionUpdated, this._updateRegion);
  }

  _sortListings = (lat, lng) => {
    ListingsRequester.getListings(this.state.region).then((listings) =>  {
      let sortedListings = listings.map((listing) => {
        listing.distance = DistanceUtils.getDistanceFromLatLonInMiles(lat, lng, listing.lat, listing.lng);
        return listing;
      });
      sortedListings.sort((listing1, listing2) => {
        return listing1.distance - listing2.distance;
      });
      this.setState({
          listings: sortedListings,
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

  _getListings = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._sortListings(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        Alert.alert(
        'Uh oh!',
        'Please turn on Location Services to allow Replate to determine your location and listings nearby.',
        )
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getListings();
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

  _updateRegion = (region) => {
    this.setState({
      region: region,
      isLoading: true,
    }, () => {
      this.props.navigation.setParams({ title: this.state.region.region + " Marketplace" });
      this._getListings();
    });
  }

  _keyExtractor = (item, index) => {
    return item.id;
  }

  _onPressItem = (listing) => {
    this.props.navigation.navigate('ListingDetail', {listing: listing, onClaim: this._removeListing});
  }

  render() {
    return (
      <LoadingView
        style={styles.container}
        isLoading={this.state.isLoading}>
        <FlatList
            data={this.state.listings}
            keyExtractor={this._keyExtractor}
            renderItem={ ({item}) =>
              <ListingItem
                listing={item}
                onPressItem={this._onPressItem}
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

export default ListingsScreen;
