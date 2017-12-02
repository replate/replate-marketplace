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
      onPress={params.updateProfile}
      isLoading={params.isUpdating}
    />
  )
};


class EditProfileScreen  extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Edit Profile',
    headerRight: doneIcon(navigation)
  })

  static propTypes = {
    user: PropTypes.object,
    onUserUpdate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      company_name: this.props.user.company_name,
      email: this.props.user.email,
      phone: this.props.user.phone,
      isUpdating: false,
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      updateProfile: this._updateProfile,
      isUpdating: false,
    });
  }

  _updateProfile = () => {
    success = (user) => {
      window.EventBus.trigger(Events.userUpdated, user);
      window.showBanner('success', 'Updated profile');
      this.props.onUserUpdate(user);
      this.setState({
        isUpdating: false,
      });
      this.props.navigation.setParams({
        isUpdating: false,
      });
      this.props.navigation.goBack();
    };

    failure = (error) => {
      window.showBanner('error', error.message);
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

    updatedUser = this.state;
    UserRequester.updateUser(updatedUser).then(success).catch(failure);
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
                iconName={'person'}
                defaultValue={this.state.first_name}
                placeholder={'First Name'}
                onChangeText={(text) => this.setState({first_name: text})}
                editable={!this.state.isUpdating}
              />
            </ListRow>
            <Border style={styles.nameBorder} />
            <ListRow>
              <IconInput
                iconName={'person'}
                iconColor={Colors.white}
                defaultValue={this.state.last_name}
                placeholder={'Last Name'}
                onChangeText={(text) => this.setState({last_name: text})}
                editable={!this.state.isUpdating}
              />
            </ListRow>
            <Border/>
            <ListRow>
              <IconInput
                iconName={'business'}
                defaultValue={this.state.company_name}
                placeholder={'Company Name'}
                onChangeText={(text) => this.setState({company_name: text})}
                editable={!this.state.isUpdating}
              />
            </ListRow>
            <Border/>
            <ListRow>
              <IconInput
                iconName={'email'}
                defaultValue={this.state.email}
                placeholder={'Email'}
                onChangeText={(text) => this.setState({email: text})}
                editable={!this.state.isUpdating}
              />
            </ListRow>
            <Border/>
            <ListRow>
              <IconInput
                iconName={'phone'}
                defaultValue={this.state.phone}
                placeholder={'Phone'}
                onChangeText={(text) => this.setState({phone: text})}
                editable={!this.state.isUpdating}
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

  nameBorder: {
    marginLeft: 2 * UIConstants.margins.side + UIConstants.iconSizes.label,
  }
})

export default EditProfileScreen;