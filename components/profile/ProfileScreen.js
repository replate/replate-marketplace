import React from 'react';
import PropTypes from 'prop-types';
import {
  BackHandler,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Header } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import PastListingItem from './PastListingItem';

import Border from '../common/Border';
import SectionBorder from '../common/SectionBorder';
import SectionHeader from '../common/SectionHeader';
import LoadingView from '../common/LoadingView';
import IconLabel from '../common/IconLabel';

import Colors from '../../constants/Colors';
import Events from '../../constants/Events';
import UIConstants from '../../constants/UIConstants';

import UserRequester from '../../requesters/UserRequester';

const headerHeight = 2 * Header.HEIGHT;

let settingsIcon = (navigation) => {

  if (Platform.OS === 'android') {
    return null;
  }

  return (
    <Icon
      name='settings'
      onPress={()=> {navigation.navigate('Settings', {user: navigation.state.params.user})}}
      size={UIConstants.iconSizes.navbar}
      color={Colors.white}
      style={{padding: UIConstants.margins.navbarIcon}}
    />
  )
};

class ProfileScreen extends React.Component {

  static propTypes = {
    onUserUpdate: PropTypes.func,
  }

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: Colors.none,
      borderBottomWidth: 0,
      elevation: 0,
      zIndex: 10,
    },
    headerRight: settingsIcon(navigation)
  });

  constructor(props) {
    super(props);
    this.state = {
      user: {
        active_listings: [],
        completed_listings: [],
        marketplace_region: {}
      },
      scrollOffset: 0,
      isRefreshing: true,
      isLoading: true,
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
       user: this.state.user,
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
    window.EventBus.on(Events.listingClaimed, this._addActiveListing);
    window.EventBus.on(Events.userUpdated, this._updateUser);
    this._getCurrentUser();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
    window.EventBus.off(Events.listingClaimed, this._addActiveListing);
    window.EventBus.off(Events.userUpdated, this._updateUser);
  }

  _handleBackButton() {
    return true;
  }

  _getCurrentUser = () => {
    UserRequester.getCurrentUser().then((user) =>  {
      this.setState({
        user: user,
        isRefreshing: false,
        isLoading: false,
      });
      this.props.navigation.setParams({
        user: user
      });
    }).catch((error) => {
      this.setState({
        isRefreshing: false,
        isLoading: false,
      });
    });
  }

  _onScroll = (event) => {
    this.setState({scrollOffset: event.nativeEvent.contentOffset.y});
  }

  _refresh = () => {
    this.setState({isRefreshing: true}, () => {
      this._getCurrentUser();
    });
  }

  _keyExtractor = (item, index) => {
    return item.id;
  }

  _addActiveListing = (listing) => {
    this.state.user.active_listings.splice(0, 0, listing);
    this.setState({
      user: this.state.user,
    });
    this.props.navigation.setParams({
      user: user,
    });
  }

  _updateUser = (user) => {
    this.setState({
      user: user,
    });
    this.props.navigation.setParams({
      user: user,
    });
  }

  _onPressItem = (listing) => {
    this.props.navigation.navigate('ListingDetail', {listing: listing, onClaim: this._removeListing});
  }

  _headerComponent = () => {
    if (Object.keys(this.state.user).length === 0) {
      return (<View></View>);
    }
    return (
      <View>
        <IconLabel
          iconName='business'
          text={this.state.user.company_name}
          style={styles.label}
        />
        <IconLabel
          iconName='pin-drop'
          text={this.state.user.marketplace_region.region}
          style={styles.label}
        />
        <IconLabel
          iconName='email'
          text={this.state.user.email}
          style={styles.label}
        />
        <IconLabel
          iconName='phone'
          text={this.state.user.phone}
          style={styles.label}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={
          [styles.header,
          {
            height: Math.max(headerHeight, UIConstants.device.width * 0.5 - this.state.scrollOffset)
          }]
        }>
          <Text style={styles.name}>{this.state.user.full_name}</Text>
        </View>
        <LoadingView
          style={
            (this.state.isLoading)
            ? [styles.headerPadding, styles.loadingContainer]
            : styles.loadingContainer
          }
          isLoading={this.state.isLoading}>
          <SectionList
            sections={[
              {data: this.state.user.active_listings, title: 'Active Listings'},
              {data: this.state.user.completed_listings, title: 'Completed Listings'}
            ]}
            keyExtractor={this._keyExtractor}
            renderItem={ ({item}) =>
              <PastListingItem
                listing={item}
                onPressItem={this._onPressItem}
              />
            }
            ListHeaderComponent={this._headerComponent()}
            ItemSeparatorComponent={() => <Border />}
            renderSectionHeader={({section}) => {
              return (<View>
                <SectionBorder />
                <SectionHeader text={section.title} />
              </View>)
            }}
            style={styles.scroll}
            contentContainerStyle={styles.headerPadding}
            onScroll={this._onScroll}
            scrollEventThrottle={15}
            refreshing={this.state.isRefreshing}
            onRefresh={this._refresh}
          />
        </LoadingView>
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
    backgroundColor: Colors.main,
  },

  container: {
    marginTop: -Header.HEIGHT,
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  headerPadding: {
    paddingTop: UIConstants.device.width * 0.5 + UIConstants.margins.large,
  },

  name: {
    position: 'absolute',
    backgroundColor: Colors.none,
    fontSize: UIConstants.fontSizes.largeTitle,
    color: Colors.white,
    fontWeight: UIConstants.fontWeights.bold,
    left: UIConstants.margins.large + UIConstants.iconSizes.label + UIConstants.margins.side,
    right: UIConstants.margins.large + UIConstants.iconSizes.label + UIConstants.margins.side,
    bottom: UIConstants.margins.large,
  },

  label: {
    marginLeft: UIConstants.margins.large,
    marginRight: UIConstants.margins.large,
    marginBottom: UIConstants.margins.large,
  },
})

export default ProfileScreen;
