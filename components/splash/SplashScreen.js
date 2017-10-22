import React from 'react';
import { 
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import LoadingButton from '../common/LoadingButton';

import {
  StackRouter
} from 'react-navigation';

import ComponentStyles from '../../constants/ComponentStyles'
import Colors from '../../constants/Colors'
import LoginRequester from '../../requesters/LoginRequester'
import LocalStorage from '../../helpers/LocalStorage'

class SplashScreen extends React.Component {

  componentDidMount() {
    LocalStorage.getUser((user) => {
      setTimeout(() => {
        if (user !== null) {
          this.props.navigation.navigate('Main');
        } else {
          this.props.navigation.navigate('Login');
        }
      }, 2000);
    }); 
  }

  render() {
    return (
      <View style={[styles.screen, styles.contentWrapper]}>
        <StatusBar barStyle='light-content' />
        <Image style={styles.logo} source={require('../../assets/logo-color.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  screen: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
  },

  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 90,
    height: 90,
  },
});

export default SplashScreen;
