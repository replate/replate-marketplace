import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Platform,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';

import Border from '../common/Border';
import GroupedSectionHeader from '../common/GroupedSectionHeader';
import IconLabel from '../common/IconLabel';
import ListRow from '../common/ListRow';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

import LocalStorage from '../../helpers/LocalStorage';

const PROFILE = 'Profile';
const REGION = 'Region';
const PASSWORD = 'Password';
const HELP = 'Help';
const LOGOUT = 'Log Out';

class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Settings',
  }

  static propTypes = {
    user: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      personal_items: [
        {title: PROFILE, icon: 'person'},
        {title: REGION, icon: 'pin-drop'},
        {title: PASSWORD, icon: 'lock'},
      ],
      more_items: [
        {title: HELP, icon: 'help'},
        {title: LOGOUT, icon: 'exit-to-app'}
      ],
    };
  }

  componentWillMount() {
    if (this.props.user == null) {
      LocalStorage.getUser().then((user) => {
        this.setState({
          user: user,
        });
      }).catch((error) => {});
    }
  }

  _updateUser = (user) => {
    this.setState({
      user: user,
    });
  }

  _handleEvent = (item) => {
    switch(item.title) {
      case PROFILE:
        this.props.navigation.navigate('EditProfile', {
          user: this.state.user,
          onUserUpdate: this._updateUser,
        });
        break;
      case REGION:
        this.props.navigation.navigate('EditRegion', {
          user: this.state.user,
          onUserUpdate: this._updateUser,
        });
        break;
      case PASSWORD:
        this.props.navigation.navigate('ResetPassword', {
          user: this.state.user,
        });
        break;
      case LOGOUT:
        Alert.alert(
          'Logout',
          'Are you sure you would like to logout?',
          [{text: 'Close'},
          {text: 'Confirm', onPress: () => this.props.navigation.navigate('Login')},]
        )
    }
  }

  _keyExtractor = (item, index) => {
    return item.title;
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {data: this.state.personal_items, title: 'Personal'},
            {data: this.state.more_items, title: 'More'}
          ]}
          keyExtractor={this._keyExtractor}
          renderItem={ ({item}) =>
            <ListRow
              style={styles.row}
              showCaret={item.title !== LOGOUT}
              onPress={() => this._handleEvent(item)}
            >
              <IconLabel
                iconName={item.icon}
                text={item.title}
              />
            </ListRow>
          }
          ItemSeparatorComponent={() => <Border />}
          renderSectionHeader={({section}) => <GroupedSectionHeader text={section.title} />}
          renderSectionFooter={() => <Border />}
          stickySectionHeadersEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? Colors.white : Colors.offWhite,
  },

  row: {
    backgroundColor: Colors.white,
  }
})

export default SettingsScreen;
