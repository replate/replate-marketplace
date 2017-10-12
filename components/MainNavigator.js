import React from 'react';
import { 
  Platform
} from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from 'react-navigation';

import ListingsNavigator from './listings/ListingsNavigator';
import ProfileNavigator from './profile/ProfileNavigator';

import BaseRequester from '../requesters/BaseRequester';


let PlatformNavigator = TabNavigator;

if (Platform.OS === 'android') {
  PlatformNavigator = DrawerNavigator;
}

const MainNavigator = PlatformNavigator({
  Listings: {
    screen: ListingsNavigator,
  },
  Profile: {
    screen: ProfileNavigator,
  }
});

export default MainNavigator;
