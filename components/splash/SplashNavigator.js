import {
  StackNavigator,
} from 'react-navigation';

import SplashScreen from './SplashScreen';
import LoginNavigator from '../login/LoginNavigator';
import MainNavigator from '../MainNavigator';


const SplashNavigator = StackNavigator({  
  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginNavigator
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
