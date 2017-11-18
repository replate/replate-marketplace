import React from 'react';
import { 
  Button,
  Platform
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ListingsNavigator from './listings/ListingsNavigator';
import ProfileNavigator from './profile/ProfileNavigator';
import SettingsNavigator from './settings/SettingsNavigator';

import BaseRequester from '../requesters/BaseRequester';

import Colors from '../constants/Colors';
import UIConstants from '../constants/UIConstants';

let navIcon = (name, tintColor) => {
  return (
    <Icon
      name={name}
      size={(Platform.OS === 'android') ? UIConstants.iconSizes.drawer : UIConstants.iconSizes.tabbar} 
      color={tintColor}
    />
  )
};

let PlatformSpecificNavigator = TabNavigator;

if (Platform.OS === 'android') {
  PlatformSpecificNavigator = DrawerNavigator;
}

const MainNavigator = PlatformSpecificNavigator({
  Listings: {
    screen: ListingsNavigator,
    navigationOptions: {
      tabBarLabel: 'Listings',
      tabBarIcon: ({ tintColor }) => (
        navIcon('view-stream', tintColor)
      ),
      drawerLabel: 'Listings',
      drawerIcon: ({ tintColor }) => (
        navIcon('view-stream', tintColor)
      ),
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        navIcon('person', tintColor)
      ),
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor }) => (
        navIcon('person', tintColor)
      ),
    },
  },
  ...(Platform.OS === 'android' ? { 
    Settings: { 
      screen: SettingsNavigator,
      navigationOptions: {
        drawerLabel: 'Settings',
        drawerIcon: ({ tintColor }) => (
          navIcon('settings', tintColor)
        ),
      },
    } 
  } : {})
}, {
  // iOS tabbar
  tabBarOptions: {
    style: {
      backgroundColor: Colors.white,
      borderTopColor: Colors.lightGray,
    },
    labelStyle: {
      bottom: 2,
    },
    activeTintColor: Colors.main,
    inactiveTintColor: Colors.darkGray,
  },

  // Android drawer
  contentOptions: {
    activeTintColor: Colors.main,
    inactiveTintColor: Colors.offBlack,
    activeBackgroundColor: Colors.offWhite,
  },

  lazy: true,
});

export default MainNavigator;
