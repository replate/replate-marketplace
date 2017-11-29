import {
  Platform,
  StyleSheet,
} from 'react-native';
import UIConstants from './UIConstants';
import Colors from './Colors';

const ComponentStyles = StyleSheet.create({

  buttonContainer: {
    borderRadius: UIConstants.cornerRadii.standard,
    padding: UIConstants.margins.tight,
  },

  buttonText: {
    color: Colors.white,
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
  },

  navButtonContainer: {
    height: UIConstants.iconSizes.navbar,
    paddingHorizontal: UIConstants.margins.navbarIcon,
  },

  navButtonText: {
    color: Colors.white,
    fontSize: Platform.OS === 'android' ? UIConstants.fontSizes.normal : UIConstants.fontSizes.title,
    fontWeight: UIConstants.fontWeights.bold,
  },

  listingItemContainer: {
    height: UIConstants.device.width * 0.5,
  },

  listingItemOverlay: {
    position: 'absolute',
    zIndex:-1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.alphaColor(Colors.offBlack, 0.6),
  },

  listingItemImage: {
    zIndex: -10,
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ComponentStyles;
