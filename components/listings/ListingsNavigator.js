import React from 'react';
import {
  StackNavigator,
} from 'react-navigation';

import ListingsScreen from './ListingsScreen';

const ListingsNavigator = StackNavigator({
  Listings: {
    screen: ListingsScreen,
  }
});

export default ListingsNavigator;
