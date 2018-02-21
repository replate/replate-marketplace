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

import IconInput from '../common/IconInput';

import UIConstants from '../../constants/UIConstants'
import ComponentStyles from '../../constants/ComponentStyles'
import Colors from '../../constants/Colors'
import LoginRequester from '../../requesters/LoginRequester'
import LocalStorage from '../../helpers/LocalStorage'

class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'd@d.com',
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

  _cancelReset = () => {
    this.props.navigation.navigate('Login');
  }

  _confirmEmail = () => {
    /* TODO: change to sending an email */
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
              /* TODO: change style */
              <Image style={styles.logo} source={require('../../assets/logo-white.png')} />
              <View><Text
                style={styles.subtitle}
                >
                Please enter the email address
                associated with your Replate account.
              </Text></View>
              <IconInput
                iconName={'person'}
                iconColor={Colors.white}
                textColor={Colors.white}
                containerStyle={styles.inputContainer}
                style={styles.inputText}
                placeholder='Enter Email'
                onChangeText={(text) => this.setState({email: text})}
              />
            <LoadingButton
              containerStyle={[ComponentStyles.buttonContainer, styles.updateButtonContainer]}
              style={[ComponentStyles.buttonText, styles.buttonText]}
              onPress={this._cancelReset}
              title="Cancel" />
            <LoadingButton
              containerStyle={[ComponentStyles.buttonContainer, styles.updateButtonContainer]}
              style={[ComponentStyles.buttonText, styles.buttonText]}
              onPress={this._confirmEmail}
              isLoading={this.state.isLoading}
              title="Confirm Email" />
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

  keyboardAvoiding: {
    flex: 1,
  },

  headerWrapper: {
    left: 0,
    right: 0,
    top: 0,
    margin: UIConstants.margins.large,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
    marginBottom: 14,
  },

  title: {
    fontSize: UIConstants.fontSizes.largeTitle,
    fontWeight: UIConstants.fontWeights.bold,
    color: Colors.white,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: UIConstants.fontSizes.title,
    fontWeight: UIConstants.fontWeights.normal,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 50,
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

  updateButtonContainer: {
    width: 280,
    backgroundColor: Colors.alphaColor(Colors.white, 0.3),
    marginBottom: UIConstants.margins.standard,
  },

  logoutButtonContainer: {
    width: 280,
    // Offset the amount the header pushes down the content...
    // needed for the KeyboardAvoidingView to function in
    // a simple way
    marginBottom: 120,
  },

  buttonText: {
    color: Colors.white,
  }
});

export default ForgotPasswordScreen;
