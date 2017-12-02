import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import {
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SettingsScreen from './SettingsScreen';
import EditProfileScreen from './EditProfileScreen';
import ResetPasswordScreen from './ResetPasswordScreen';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';
import NavigationStyles from '../../constants/NavigationStyles';

import NavigationHelper from '../../helpers/NavigationHelper';

let menuIcon = (navigation) => {
  return (
    <Icon
      name='menu'
      onPress={()=> navigation.navigate('DrawerOpen')}
      size={UIConstants.iconSizes.navbar}
      color={Colors.white}
      style={{padding: UIConstants.margins.navbarIcon}}
    />
  )
};

const SettingsDetailPages = {
  EditProfile: {
    screen: NavigationHelper.paramsToProps(EditProfileScreen),
  },
  ResetPassword: {
    screen: NavigationHelper.paramsToProps(ResetPasswordScreen),
  }
}

const SettingsNavigator = StackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (Platform.OS === 'android') ? menuIcon(navigation) : null
    }),
  },
  ...SettingsDetailPages,
}, {
  navigationOptions: ({navigation}) => ({
    ...NavigationStyles.stackHeaderOptions(navigation),
  }),
  cardStyle: {
    backgroundColor: Colors.white,
  },
});

SettingsNavigator.detailPages = SettingsDetailPages;

export default SettingsNavigator;
