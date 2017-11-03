import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Header } from 'react-navigation';

import MapView from 'react-native-maps';

import IconLabel from '../common/IconLabel';
import SectionBorder from '../common/SectionBorder';

import ListingsRequester from '../../requesters/ListingsRequester';

import Colors from '../../constants/Colors';
import NavigationStyles from '../../constants/NavigationStyles';
import ComponentStyles from '../../constants/ComponentStyles';
import UIConstants from '../../constants/UIConstants';

class ListingDetailScreen extends React.Component {

  static propTypes = {
    listing: PropTypes.object,
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: Colors.none,
      borderBottomWidth: 0,
      elevation: 0,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
    };
  }

  _claim = () => {
    ListingsRequester.getListings().then((r) => console.log(r)).catch((error) => console.log(error));
  }

  _onScroll = (event) => {
    this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={
          [ComponentStyles.listingItemContainer,
          {
            height: Math.max(Header.HEIGHT, UIConstants.device.width * 0.5 - this.state.scrollOffset)
          }]
        }>
          <View style={ComponentStyles.listingItemOverlay} />
          <Image
            style={ComponentStyles.listingItemImage}
            source={{uri: this.props.listing.image_url}}
          />
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContentContainer}
          onScroll={this._onScroll}
          scrollEventThrottle={15}
        >
          <Text style={styles.title}>Title</Text>
          <IconLabel
            iconName='list'
            text={'Description of food goes here'} 
            style={styles.label}
          />
          <IconLabel
            iconName='people'
            text={'Serves 100 meals'}
            style={styles.label}
          />
          <IconLabel
            iconName='pin-drop'
            text={this.props.listing.full_address}
            style={styles.label}
            selectable
          />
          <MapView
            scrollEnabled={false}
            style={styles.map}
            region={{
              latitude: parseFloat(this.props.listing.lat),
              longitude: parseFloat(this.props.listing.lng),
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(this.props.listing.lat),
                longitude: parseFloat(this.props.listing.lng),
              }}
            >
            </MapView.Marker>
          </MapView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    position: 'relative',
    marginTop: -Header.HEIGHT,
    flex: 1,
  },

  scroll: {
    position: 'absolute',
    zIndex: -100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },

  scrollContentContainer: {
    paddingTop: UIConstants.device.width * 0.5,
  },

  title: {
    backgroundColor: Colors.none,
    fontSize: UIConstants.fontSizes.largeTitle,
    color: Colors.primaryText,
    fontWeight: UIConstants.fontWeights.bold,
    marginLeft: UIConstants.margins.large + UIConstants.iconSizes.label + UIConstants.margins.side,
    marginRight: UIConstants.margins.large,
    marginTop: UIConstants.margins.large,
    marginBottom: UIConstants.margins.large,
  },

  label: {
    marginLeft: UIConstants.margins.large,
    marginRight: UIConstants.margins.large,
    marginBottom: UIConstants.margins.large,
  },

  map: {
    width: '100%',
    height: UIConstants.device.width * 0.4,
  },
})

export default ListingDetailScreen;
