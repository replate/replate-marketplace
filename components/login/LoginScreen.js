import React from 'react';
import { 
  BackHandler,
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

import UIConstants from '../../constants/UIConstants'
import ComponentStyles from '../../constants/ComponentStyles'
import Colors from '../../constants/Colors'
import LoginRequester from '../../requesters/LoginRequester'
import LocalStorage from '../../helpers/LocalStorage'

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'd@d.com',
      password: 'LQLwPwm1',
      isLoading: false,
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton() {
    return true;
  }

  _attemptLogin = () => {
    success = (user_json) => {
      LocalStorage.storeUser(user_json);
      this.props.navigation.navigate('Main');
    };

    failure = (error) => {
      this.setState({
        isLoading: false,
      });
    };

    this.setState({
      isLoading: true,
    });

    LoginRequester.signIn(this.state.email, this.state.password).then(success).catch(failure);
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='light-content' />
        <KeyboardAvoidingView behavior='padding' style={styles.screen}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
          >
            <View style={styles.contentWrapper}>
              <Image style={styles.logo} source={require('../../assets/logo-white.png')} />
              <View><Text style={styles.title}>Replate Marketplace</Text></View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({email: text})}
                underlineColorAndroid='transparent'
              />
              <TextInput
                style={[styles.input, {marginBottom: 25}]}
                onChangeText={(text) => this.setState({password: text})}
                underlineColorAndroid='transparent'
                secureTextEntry
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
      </View>
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
    marginBottom: UIConstants.margins.standard,
  },

  title: {
    fontSize: 32,
    fontWeight: UIConstants.fontWeights.thin,
    color: Colors.white,
    marginBottom: UIConstants.margins.standard,
  },

  input: {
    width: 280,
    marginBottom: UIConstants.margins.standard,
    color: Colors.white,
    padding: UIConstants.margins.standard,
    paddingBottom: UIConstants.margins.tight,
    borderBottomColor: Colors.alphaColor(Colors.white, 0.5),
    borderBottomWidth: 1,
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
