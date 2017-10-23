import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import {
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ListingsScreen from './ListingsScreen';
import ProfileScreen from '../profile/ProfileScreen';

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

const ListingsNavigator = StackNavigator({
  Listings: {
    screen: ListingsScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (Platform.OS === 'android') ? menuIcon(navigation) : null
    }),
  },
}, {
  navigationOptions: ({navigation}) => ({
    ...NavigationStyles.stackHeaderOptions(navigation),
  }),
});

export default ListingsNavigator;
