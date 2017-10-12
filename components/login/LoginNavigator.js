import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LoginScreen from './LoginScreen';
import ProfileScreen from '../profile/ProfileScreen';


const LoginNavigator = StackNavigator({  
  Login: {
    screen: LoginScreen
  },
  Profile: {
    screen: ProfileScreen
  }
}, {
  headerMode: 'none'
});

export default LoginNavigator;
