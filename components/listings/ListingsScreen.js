import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';

import LoadingView from '../common/LoadingView';

import ListingItem from './ListingItem';

import ListingsRequester from '../../requesters/ListingsRequester';

import Events from '../../constants/Events';

import LocalStorage from '../../helpers/LocalStorage'

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
  }

  componentWillDismount() {
    window.EventBus.off(Events.claimCancelled, this._addListing);
  }

  _getListings = () => {
    ListingsRequester.getListings(this.state.region).then((listings) =>  {
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
