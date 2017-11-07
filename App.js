import React from 'react';

import {
  Platform,
  StatusBar,
  Text,
} from 'react-native';

import BackboneEvents from 'backbone-events-standalone';

import SplashNavigator from './components/splash/SplashNavigator';

import Colors from './constants/Colors';

// global event bus
window.EventBus = BackboneEvents.mixin({});

// Remove dynamic typing of text sizes (iOS only)
Text.defaultProps.allowFontScaling = false;

export default class App extends React.Component {
  render() {
    var topPadding = 0;
    if (Platform.OS === 'android') {
      topPadding = StatusBar.currentHeight;
    }
    return <SplashNavigator style={{paddingTop: topPadding, backgroundColor: Colors.main}}/>;
  }
}
