import {
  Platform,
  StyleSheet,
} from 'react-native';
import UIConstants from './UIConstants';
import Colors from './Colors';

const ComponentStyles = StyleSheet.create({

  buttonContainer: {
    borderRadius: UIConstants.cornerRadii.standard,
    padding: UIConstants.margins.standard,
  },

  buttonText: {
    color: Colors.white,
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
  },

  title: {
    fontWeight: (Platform.OS === 'ios') ? UIConstants.fontWeights.bold : UIConstants.fontWeights.normal,
  },

  listingItemContainer: {
    height: UIConstants.device.width * 0.5,
  },

  listingItemOverlay: {
    position: 'absolute',
    zIndex:-1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.alphaColor(Colors.offBlack, 0.5),
  },

  listingItemImage: {
    position: 'absolute',
    zIndex: -10,
    width: '100%',
    height: '100%'
  }
});

export default ComponentStyles;
