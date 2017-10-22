import { Platform } from 'react-native';

class UIConstants {

  static get margins() {
    return {
      standard: 10,
      side: (Platform.OS === 'ios') ? 15 : 10,
      text: 10,
      tight: 7,
      navbarIcon: (Platform.OS === 'ios') ? 22 : 20,
    }
  }

  static get fontSizes() {
    return {
      largeTitle: 28,
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
      standard: (Platform.OS === 'ios') ? 5 : 3,
      large: (Platform.OS === 'ios') ? 10 : 6,
    }
  }

  static get iconSizes() {
    return {
      navbar: 22,
    }
  }
}

export default UIConstants;
