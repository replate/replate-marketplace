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

  _confirmEmail = () => {
    success = () => {
      Alert.alert(
        'Email Sent',
        'Instructions to reset your password have been sent to your email.',
        [{text: 'Close', onPress: () => this.props.navigation.goBack()},]
      )
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

    LoginRequester.sendEmail(this.state.email).then(success).catch(failure);
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
              <View><Text
                style={styles.subtitle}
              >
                Please enter the email address {"\n"}
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
              containerStyle={[ComponentStyles.buttonContainer, styles.buttonContainer]}
              style={[ComponentStyles.buttonText, styles.buttonText]}
              onPress={() => this.props.navigation.goBack()}
              title="Cancel" />
            <LoadingButton
              containerStyle={[ComponentStyles.buttonContainer, styles.buttonContainer]}
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

  subtitle: {
    fontSize: UIConstants.fontSizes.title,
    fontWeight: UIConstants.fontWeights.normal,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 14,
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
    marginBottom: UIConstants.margins.standard,
  },

  buttonText: {
    color: Colors.white,
  }
});

export default ForgotPasswordScreen;
