import {
  StackNavigator,
} from 'react-navigation';

import SplashScreen from './SplashScreen';
import LoginNavigator from '../login/LoginNavigator';
import ResetPasswordScreen from '../login/ResetPasswordScreen';
import MainNavigator from '../MainNavigator';

import NavigationHelper from '../../helpers/NavigationHelper';


const SplashNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginNavigator
  },

  ResetPassword: {
    screen: NavigationHelper.paramsToProps(ResetPasswordScreen)
  },

  Main: {
    screen: MainNavigator
  }
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
  mode: 'modal',
});

export default SplashNavigator;
