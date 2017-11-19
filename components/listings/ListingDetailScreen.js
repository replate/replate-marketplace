import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

import { Header } from 'react-navigation';

import MapView from 'react-native-maps';

import IconLabel from '../common/IconLabel';
import Border from '../common/Border';
import LoadingButton from '../common/LoadingButton';
import ListingsRequester from '../../requesters/ListingsRequester';

import Colors from '../../constants/Colors';
import NavigationStyles from '../../constants/NavigationStyles';
import ComponentStyles from '../../constants/ComponentStyles';
import UIConstants from '../../constants/UIConstants';
import Events from '../../constants/Events';
import ModelConstants from '../../constants/ModelConstants';

class ListingDetailScreen extends React.Component {

  static propTypes = {
    listing: PropTypes.object,
    onClaim: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: Colors.none,
      borderBottomWidth: 0,
      elevation: 0,
      zIndex: 10,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
      isClaiming: false,
    };
  }

  _claim = () => {
    this.setState({isClaiming: true});
    ListingsRequester.claimListing(this.props.listing).then((listing) => {
      window.EventBus.trigger(Events.listingClaimed, listing);
      this.props.onClaim(listing);
      this.props.navigation.goBack();
    }).catch((error) => {
      this.setState({isClaiming: false});
    });
  }

  _cancel = () => {
    this.setState({isClaiming: true});
    ListingsRequester.cancelClaim(this.props.listing).then((listing) => {
      window.EventBus.trigger(Events.claimCancelled, listing);
      this.props.onCancel(listing);
      this.props.navigation.goBack();
    }).catch((error) => {
      this.setState({isClaiming: false});
    });
  }

  _onScroll = (event) => {
    this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
  }

  render() {
    let button = (
      <LoadingButton
      containerStyle={[ComponentStyles.buttonContainer, styles.claimButtonContainer]}
      style={[ComponentStyles.buttonText, styles.claimButtonText]}
      onPress={this._claim}
      isLoading={this.state.isClaiming}
      title="Claim" />)
    if (this.props.listing.state == ModelConstants.listing.state.CLAIMED) {
      button = (
        <LoadingButton
        containerStyle={[ComponentStyles.buttonContainer, styles.cancelButtonContainer]}
        style={[ComponentStyles.buttonText, styles.claimButtonText]}
        onPress={this._cancel}
        isLoading={this.state.isClaiming}
        title="Cancel" />)
    }
    return (
      <View style={styles.container}>
        <View style={
          [ComponentStyles.listingItemContainer,
          styles.header,
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
          <Text style={styles.title}>{this.props.listing.business_name}</Text>
          <IconLabel
            iconName='list'
            text={this.props.listing.details}
            style={styles.label}
          />
          <IconLabel
            iconName='people'
            text={'Serves ' +  this.props.listing.num_meals + ' meals'}
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
        <Border />
        <View style={styles.actionsContainer}>
          {button}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
  },

  container: {
    marginTop: -Header.HEIGHT,
    flex: 1,
    backgroundColor: Colors.white,
  },

  scroll: {
    flex: 1,
  },

  scrollContentContainer: {
    paddingTop: UIConstants.device.width * 0.5,
    paddingBottom: UIConstants.margins.large,
  },

  title: {
    backgroundColor: Colors.none,
    fontSize: UIConstants.fontSizes.largeTitle,
    color: Colors.primaryText,
    fontWeight: UIConstants.fontWeights.bold,
    marginHorizontal: UIConstants.margins.large + UIConstants.iconSizes.label + UIConstants.margins.side,
    marginVertical: UIConstants.margins.large,
  },

  label: {
    marginLeft: UIConstants.margins.large,
    marginRight: UIConstants.margins.large,
    marginBottom: UIConstants.margins.large,
  },

  map: {
    width: '100%',
    height: UIConstants.device.width,
  },

  actionsContainer: {
    padding: UIConstants.margins.text,
  },

  claimButtonContainer: {
    backgroundColor: Colors.main,
  },

  cancelButtonContainer: {
    backgroundColor: Colors.red,
  },

  claimButtonText: {
    color: Colors.white,
  }
})

export default ListingDetailScreen;
