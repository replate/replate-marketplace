import React from 'react';
import {
  Alert,
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

import IconInput from '../common/IconInput';
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
    LocalStorage.clearUser();
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  _handleBackButton() {
    return true;
  }

  _attemptLogin = () => {
    success = (user) => {
      if (user.has_reset_password) {
        window.showBanner('success', 'Welcome!');
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.navigate('ResetPassword', { user })
      }
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
              <IconInput
                iconName={'person'}
                iconColor={Colors.white}
                textColor={Colors.white}
                containerStyle={styles.inputContainer}
                style={styles.inputText}
                placeholder='Email'
                onChangeText={(text) => this.setState({email: text})}
              />
              <IconInput
                iconName={'lock'}
                iconColor={Colors.white}
                textColor={Colors.white}
                containerStyle={[styles.inputContainer, {marginBottom: 25}]}
                style={styles.inputText}
                placeholder='Password'
                onChangeText={(text) => this.setState({password: text})}
                secureTextEntry
              />
              <LoadingButton
                containerStyle={[ComponentStyles.buttonContainer, styles.buttonContainer]}
                style={[ComponentStyles.buttonText, styles.buttonText]}
                onPress={this._attemptLogin}
                isLoading={this.state.isLoading}
                title="Log In" />
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

  inputContainer: {
    width: 280,
    marginBottom: UIConstants.margins.standard,
    padding: 10,
    borderBottomColor: Colors.alphaColor(Colors.white, 0.5),
    borderBottomWidth: 1,
  },

  inputText: {
    fontSize: UIConstants.fontSizes.title,
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
