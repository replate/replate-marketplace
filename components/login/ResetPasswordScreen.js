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

class ResetPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.navigation.state.params.user.id,
      current_password: '',
      password: '',
      password_confirmation: '',
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

  _attemptUpdatePassword = () => {
    success = (response) => {
      this.props.navigation.navigate('Main');
    };

    failure = (error) => {
      window.showBanner('error', error.message);
      this.setState({
        isLoading: false,
      });
    };

    this.setState({
      isLoading: true,
    });

    LoginRequester.changePassword(this.state.user_id,
      this.state.password,
      this.state.password_confirmation).then(success).catch(failure);
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
              <View><Text style={styles.title}>Password Reset</Text></View>
              <TextInput
                style={[styles.input, {marginBottom: 15}]}
                placeholder='New Password'
                placeholderTextColor={Colors.alphaColor(Colors.white, 0.70)}
                onChangeText={(text) => this.setState({password: text})}
                underlineColorAndroid='transparent'
                secureTextEntry
              />
              <TextInput
                style={[styles.input, {marginBottom: 15}]}
                placeholder='Confirm New Password'
                placeholderTextColor={Colors.alphaColor(Colors.white, 0.70)}
                onChangeText={(text) => this.setState({password_confirmation: text})}
                underlineColorAndroid='transparent'
                secureTextEntry
              />
              <LoadingButton
                containerStyle={[ComponentStyles.buttonContainer, styles.buttonContainer]}
                style={[ComponentStyles.buttonText, styles.buttonText]}
                onPress={this._attemptUpdatePassword}
                isLoading={this.state.isLoading}
                title="Update Password" />
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

export default ResetPasswordScreen;
