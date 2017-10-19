import React from 'react';
import { 
  AsyncStorage,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import LoadingButton from '../common/LoadingButton';

import {
  StackRouter
} from 'react-navigation';

import Styles from '../../constants/Styles'
import ComponentStyles from '../../constants/ComponentStyles'
import Colors from '../../constants/Colors'
import StorageKeys from '../../constants/StorageKeys'
import LoginRequester from '../../requesters/LoginRequester'

class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Listings',
  }

  constructor(props) {
    super(props);
    this.state = {
      email: 'd@d.com',
      password: 'LQLwPwm1',
      isLoading: false,
    }
  }

  _attemptLogin = () => {
    success = (user_json) => {
      AsyncStorage.setItem(StorageKeys.user, JSON.stringify(user_json));
      this.props.navigation.navigate('Main');
    };

    failure = (errors) => {
      this.setState({
        isLoading: false,
      });
      console.log(errors)
      // TODO (amillman): show error banner
    };

    this.setState({
      isLoading: true,
    });

    LoginRequester.signIn(this.state.email, this.state.password, success, failure);
  }

  render() {
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.screen}>
          <StatusBar barStyle='light-content' />
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            <View style={styles.contentWrapper}>
              <Image style={styles.logo} source={require('../../assets/logo-white.png')} />
              <View><Text style={styles.title}>Replate Marketplace</Text></View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({email: text})}
              />
              <TextInput
                style={[styles.input, {marginBottom: 20}]}
                onChangeText={(text) => this.setState({password: text})}
              />
              <LoadingButton
                containerStyle={[ComponentStyles.buttonContainer, styles.buttonContainer]}
                style={[ComponentStyles.buttonText, styles.buttonText]}
                onPress={this._attemptLogin}
                isLoading={this.state.isLoading}
                title="Log in" />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

  screen: {
    backgroundColor: Colors.main,
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
    width: 75,
    height: 75,
    marginBottom: Styles.margins.standard,
  },

  title: {
    fontSize: 32,
    fontWeight: Styles.fontWeights.thin,
    color: Colors.white,
    marginBottom: 20,
  },

  input: {
    width: 280,
    marginBottom: Styles.margins.standard,
    color: Colors.white,
    padding: Styles.margins.standard,
    paddingBottom: Styles.margins.tight,
    borderBottomColor: Colors.alphaColor(Colors.white, 0.5),
    borderBottomWidth: 1
  },

  buttonContainer: {
    width: 280,
    backgroundColor: Colors.alphaColor(Colors.white, 0.3),
  },

  buttonText: {
    color: Colors.white,
  }
});

export default LoginScreen;
