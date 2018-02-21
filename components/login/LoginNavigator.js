import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import LoginScreen from './LoginScreen';
import MainNavigator from '../MainNavigator';
import ResetPasswordScreen from './ResetPasswordScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'


import NavigationHelper from '../../helpers/NavigationHelper'


const LoginNavigator = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  ResetPassword: {
    screen: NavigationHelper.paramsToProps(ResetPasswordScreen)
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen
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
