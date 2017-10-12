import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LoginScreen from './LoginScreen';

const LoginNavigator = StackNavigator({  
  Login: {
    screen: LoginScreen
  }
}, {
  headerMode: 'none'
});

export default LoginNavigator;
