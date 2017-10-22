import React from 'react';

import { 
  Platform,
  StatusBar,
} from 'react-native';

import SplashNavigator from './components/splash/SplashNavigator';

import Colors from './constants/Colors';

export default class App extends React.Component {
  render() {
    var topPadding = 0;
    if (Platform.OS === 'android') {
      topPadding = StatusBar.currentHeight;
    }
    return <SplashNavigator style={{paddingTop: topPadding, backgroundColor: Colors.main}}/>;
  }
}
