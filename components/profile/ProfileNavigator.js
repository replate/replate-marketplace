import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import {
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileScreen from './ProfileScreen';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';
import NavigationStyles from '../../constants/NavigationStyles';

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

const ProfileNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (Platform.OS === 'android') ? menuIcon(navigation) : null
    }),
  },
}, {
  navigationOptions: ({navigation}) => ({
    ...NavigationStyles.stackHeaderOptions(navigation),
  }),
  cardStyle: {
    backgroundColor: Colors.white,
  },
});

export default ProfileNavigator;
