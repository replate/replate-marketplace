import React from 'react';
import { 
  Platform, 
  StatusBar,
} from 'react-native';

import Colors from './Colors';

class NavigationStyles {

  static stackHeaderOptions(navigation) {
    return {
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: Colors.main,
        borderBottomWidth: 0,
      },
      headerTintColor: Colors.white,
    }
  }
}

export default NavigationStyles;
