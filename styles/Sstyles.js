import { Platform } from 'react-native';

class Styles {

  static get margins() {
    return {
      standard: 10,
      side: (Platform.OS === 'ios') ? 15 : 10,
      text: 10,
      tight: 7,
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
}

export default Styles;
