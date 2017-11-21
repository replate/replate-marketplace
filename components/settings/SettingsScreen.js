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

const PROFILE = 'Profile';
const REGION = 'Region';
const PASSWORD = 'Password';
const HELP = 'Help';
const LOGOUT = 'Log Out';

class SettingsScreen extends React.Component {

  static navigationOptions = {
    title: 'Settings',
  }

  constructor(props) {
    super(props);
    this.state = {
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

  _handleEvent = (item) => {
    switch(item.title) {
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
