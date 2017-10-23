import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LoginScreen from './LoginScreen';
import MainNavigator from '../MainNavigator';


const LoginNavigator = StackNavigator({  
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainNavigator
  }
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  }
});

export default LoginNavigator;
