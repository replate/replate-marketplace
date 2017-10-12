import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import ProfileScreen from './ProfileScreen';

const ProfileNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  }
});

export default ProfileNavigator;
