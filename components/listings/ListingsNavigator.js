import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import {
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ListingsScreen from './ListingsScreen';
import ListingDetailScreen from './ListingDetailScreen';

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

const ListingsNavigator = StackNavigator({
  Listings: {
    screen: ListingsScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (Platform.OS === 'android') ? menuIcon(navigation) : null
    }),
  },
  ListingDetail: {
    screen: NavigationHelper.paramsToProps(ListingDetailScreen),
  },
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}) => ({
    ...NavigationStyles.stackHeaderOptions(navigation),
  }),
  cardStyle: {
    backgroundColor: Colors.white,
  },
});

export default ListingsNavigator;
