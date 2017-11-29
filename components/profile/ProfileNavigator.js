import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import {
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from './ProfileScreen';
import ListingDetailScreen from '../listings/ListingDetailScreen';
import SettingsScreen from '../settings/SettingsScreen';
import SettingsNavigator from '../settings/SettingsNavigator';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';
import NavigationStyles from '../../constants/NavigationStyles';

import NavigationHelper from '../../helpers/NavigationHelper';

let menuIcon = (navigation) => {
  return (
    <Icon
      name='menu'
      onPress={()=> navigation.navigate('DrawerOpen')}
      size={UIConstants.iconSizes.navbar}
      color={Colors.white}
      style={{padding: UIConstants.margins.navbarIcon}}
    />
  )
};

const ProfileNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (Platform.OS === 'android') ? menuIcon(navigation) : null
    }),
  },

  ListingDetail: {
    screen: NavigationHelper.paramsToProps(ListingDetailScreen),
  },

  ...(Platform.OS === 'ios' ? {
    Settings: {
      screen: NavigationHelper.paramsToProps(SettingsScreen),
    }
  } : {}),

  ...SettingsNavigator.detailPages,
}, {
  navigationOptions: ({navigation}) => ({
    ...NavigationStyles.stackHeaderOptions(navigation),
  }),
  cardStyle: {
    backgroundColor: Colors.white,
  },
});

export default ProfileNavigator;
