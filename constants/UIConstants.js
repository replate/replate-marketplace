import {
  Dimensions,
  Platform
} from 'react-native';

class UIConstants {

  static get margins() {
    return {
      large: 20,
      side: 15,
      standard: 10,
      text: 10,
      tight: 7,
      navbarIcon: (Platform.OS === 'ios') ? 22 : 20,
    }
  }

  static get fontSizes() {
    return {
      largeTitle: 25,
      title: 17,
      normal: 14,
      meta: 12,
    }
  }

  static get fontWeights() {
    return {
      bold: '700',
      normal: '400',
      thin: '300',
    }
  }

  static get cornerRadii() {
    return {
      standard: (Platform.OS === 'ios') ? 5 : 2,
      large: (Platform.OS === 'ios') ? 10 : 5,
    }
  }

  static get iconSizes() {
    return {
      navbar: 22,
      tabbar: 28,
      drawer: 24,
      label: 22,
    }
  }

  static get device() {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  }
}

export default UIConstants;
