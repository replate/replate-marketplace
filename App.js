import React from 'react';
import {
  Animated,
  Easing,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Header } from 'react-navigation';

import BackboneEvents from 'backbone-events-standalone';

import Banner from './components/common/Banner';

import SplashNavigator from './components/splash/SplashNavigator';

import Colors from './constants/Colors';
import UIConstants from './constants/UIConstants';

// global event bus
window.EventBus = BackboneEvents.mixin({});

// Remove dynamic typing of text sizes (iOS only)
Text.defaultProps.allowFontScaling = false;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bannerType: '',
      bannerMessage: '',
      showerBanner: false,
    }

    this.animatedValue = new Animated.Value(0);
    window.showBanner = this.showBanner;
  }

  showBanner = (type, message) => {
    this.setState({
      bannerType: type,
      bannerMessage: message,
      showBanner: true,
    }, () => {
      this.animatedValue.setValue(0);
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: UIConstants.animations.normal,
          easing: Easing.linear,
        }
      ).start(() => {
        setTimeout(this._hideBanner, 5000);
      });
    });
  }

  _hideBanner = () => {
    this.animatedValue.setValue(1);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: UIConstants.animations.normal,
        easing: Easing.linear,
      }
    ).start(() => {
      this.setState({
        showBanner: false,
      });
    });
  }

  render() {
    const bannerTop = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0],
    });
    return (
      <View style={styles.container}>
        <SplashNavigator style={styles.splash}/>
        { this.state.showBanner ?
          <Animated.View
            style={[
              styles.bannerWrapper,
              {
                top: bannerTop,
                opacity: this.animatedValue,
              }
            ]}>
            <Banner
              style={styles.banner}
              type={this.state.bannerType}
              message={this.state.bannerMessage}
              onPress={this._hideBanner}
            />
          </Animated.View>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  splash: {
    flex: 1,
    paddingTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.main,
  },

  bannerWrapper: {
    position: 'absolute',
    padding: 10,
    marginTop: (Platform.OS === 'android') ? StatusBar.currentHeight + Header.HEIGHT : Header.HEIGHT,
    maxWidth: '100%',
  },
});
