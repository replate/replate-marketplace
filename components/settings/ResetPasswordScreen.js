import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Header } from 'react-navigation';

import Border from '../common/Border';
import IconInput from '../common/IconInput';
import ListRow from '../common/ListRow';
import LoadingButton from '../common/LoadingButton';

import Colors from '../../constants/Colors';
import ComponentStyles from '../../constants/ComponentStyles';
import Events from '../../constants/Events';
import UIConstants from '../../constants/UIConstants';

import UserRequester from '../../requesters/UserRequester';

let doneIcon = (navigation) => {
  params = navigation.state.params;
  return (
    <LoadingButton
      title='Done'
      containerStyle={ComponentStyles.navButtonContainer}
      style={ComponentStyles.navButtonText}
      onPress={params.resetPassword}
      isLoading={params.isUpdating}
    />
  )
};


class EditProfileScreen  extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Reset Password',
    headerRight: doneIcon(navigation)
  })

  static propTypes = {
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user.id,
      current_password: '',
      new_password: '',
      confirm_password: '',
      isUpdating: false,
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      resetPassword: this._resetPassword,
      isUpdating: false,
    });
  }

  _resetPassword = () => {
    success = () => {
      this.setState({
        isUpdating: false,
      });
      this.props.navigation.setParams({
        isUpdating: false,
      });
      this.props.navigation.goBack();
    };

    failure = (error) => {
      this.setState({
        isUpdating: false,
      });
      this.props.navigation.setParams({
        isUpdating: false,
      });
    }

    this.setState({
      isUpdating: true,
    });
    this.props.navigation.setParams({
      isUpdating: true,
    });

    UserRequester.updatePassword(
      this.state.user_id,
      this.state.current_password,
      this.state.new_password,
      this.state.confirm_password
    ).then(success).catch(failure);
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
        keyboardVerticalOffset={Header.HEIGHT}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <ScrollView style={styles.scroll}>
            <ListRow>
              <IconInput
                iconName={'lock-outline'}
                defaultValue={this.state.first_name}
                placeholder={'Current Password'}
                onChangeText={(text) => this.setState({current_password: text})}
                editable={!this.state.isUpdating}
                secureTextEntry
              />
            </ListRow>
            <Border />
            <ListRow>
              <IconInput
                iconName={'lock'}
                defaultValue={this.state.last_name}
                placeholder={'New Password'}
                onChangeText={(text) => this.setState({new_password: text})}
                editable={!this.state.isUpdating}
                secureTextEntry
              />
            </ListRow>
            <Border style={styles.marginBorder} />
            <ListRow>
              <IconInput
                iconName={'lock'}
                iconColor={Colors.white}
                defaultValue={this.state.company_name}
                placeholder={'Confirm Password'}
                onChangeText={(text) => this.setState({confirm_password: text})}
                editable={!this.state.isUpdating}
                secureTextEntry
              />
            </ListRow>
            <Border />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  marginBorder: {
    marginLeft: 2 * UIConstants.margins.side + UIConstants.iconSizes.label,
  }
})

export default EditProfileScreen;